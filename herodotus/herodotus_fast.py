from typing import List, Tuple, Dict
from random import choices, choice

from pattern.en import conjugate, lemma

# General structure of a symbol:
# S -> 0.00 A B "C" | 0.00 D E F G | 0.00 "H" | 0.00 I
test_sentence = 'S -> 0.00 A B "C" | 0.00 D E F G | 0.00 "H" | 0.00 I'

class Symbol:
    def __init__(self, symbol_name: str, is_terminal: bool):
        self.symbol_name = symbol_name
        self.is_terminal = is_terminal

    def __repr__(self) -> str:
        return f"Symbol({self.symbol_name}, terminal={self.is_terminal})"

# Type alias for a symbol expression
SymbolExpr = Tuple[Symbol, ...]

class WeightedList:
    def __init__(self, items: List[SymbolExpr], weights: List[float]):
        if len(items) != len(weights):
            raise ValueError("Items and weights must be the same length!")

        self.items = items
        self.weights = weights

    def __repr__(self) -> str:
        return f"<{list(zip(self.weights, self.items))}>"

    def __iter__(self):
        return iter(self.items)

    def random_symbol_expr(self, mask=None) -> SymbolExpr:
        choice_weights = self.weights
        if mask is not None:
            choice_weights = [w*m for w, m in zip(self.weights, mask)]
        return choices(self.items, weights=choice_weights)[0]

    def exp_random_symbol_expr(self, exp, mask=None) -> SymbolExpr:
        choice_weights = self.weights
        if mask is not None:
            choice_weights = [w*m for w, m in zip(self.weights, mask)]
        return choices(self.items, weights=[w ** exp for w in self.weights])[0]

def parse_line(line: str) -> Tuple[str, WeightedList]:
    name, rest = line.split('->', 1)

    # Remove whitespace from split
    name = name.strip()
    rest = rest.strip()

    symbol_exprs: List[SymbolExpr] = []
    symbol_expr_weights: List[float] = []

    for symbol_product in rest.split(' | '):
        curr_expr = []

        tokens = symbol_product.split(' ')

        for token in tokens[1:]:
            if token[0] == '"':
                curr_expr.append(Symbol(token[1:-1], is_terminal=True))
            else:
                curr_expr.append(Symbol(token, is_terminal=False))

        # Convert to tuple once expression is complete
        symbol_exprs.append(tuple(curr_expr))
        symbol_expr_weights.append(float(tokens[0]))

    return (name, WeightedList(symbol_exprs, symbol_expr_weights))

class GrammarTree:

    def __init__(self):
        self.symbols: Dict[str, WeightedList] = {}
        # Minimum generation sizes in terms of number of terminals.
        self.min_symbol_sizes: Dict[str, int] = {}
        # Store expression sizes as well to optimize generation speed.
        self.min_expr_sizes: Dict[SymbolExpr, int] = {}

    def __repr__(self) -> str:
        return f"GrammarTree({self.symbols})"

    def generate_from_symbol(self,
                             symbol_name: str,
                             max_rec=10,
                             _curr_rec=0,
                             error=False,
                             max_size=-1) -> (str, int):

        if symbol_name not in self.symbols:
            if error:
                raise ValueError(f"Symbol '{symbol_name}' not found in grammar tree!")
            else:
                print(f"ERROR: Symbol '{symbol_name}' not found in grammar tree!")
                return '', 0

        if _curr_rec >= max_rec:
            return '(recursion max)', 0

        output = ""
        size_mask = None
        if max_size > 0:
            size_mask = [self.expr_min_size(s) <= max_size
                         for s
                         in self.symbols[symbol_name].items]
            if sum(size_mask) == 0:
                raise ValueError(f"Symbol '{symbol_name}' cannot generate a sentence with maximum size {max_size}.")
        symbol_expr = self.symbols[symbol_name].random_symbol_expr(size_mask)

        # Keep track of generated size.
        # Will use this and minimum remaining requirements to compute current
        # size availability.
        min_list = [
            (
                self.symbol_min_size(s.symbol_name)
                if not s.is_terminal
                else 1
            )
            for s
            in symbol_expr
        ]
        gen_size = 0
        for i, symbol in enumerate(symbol_expr):
            min_left = sum(min_list[i+1:]) # minimum requirements for following symbols

            if symbol.is_terminal:
                output += symbol.symbol_name + ' '
                gen_size += 1

            else:
                if max_size > 0:
                    available_size = max_size - gen_size - min_left # current availability
                else:
                    available_size = -1
                recres, recsize = self.generate_from_symbol(symbol.symbol_name,
                                                            max_rec,
                                                            _curr_rec + 1,
                                                            error,
                                                            available_size)
                output += recres
                gen_size += recsize

        return output, gen_size

    def generate_from_sentence(self, symbol_names: List[str], max_rec=10, error=False) -> str:
        return ''.join([self.generate_from_symbol(name, max_rec, error) for name in symbol_names])

    def generate_tree_from_symbol(self, symbol_name: str, max_rec=10, _curr_rec=0, error=False, exp=1) -> str:
        if symbol_name not in self.symbols:
            if error:
                raise ValueError(f"Symbol '{symbol_name}' not found in grammar tree!")
            else:
                print(f"ERROR: Symbol '{symbol_name}' not found in grammar tree!")
                return ''

        if _curr_rec >= max_rec:
            return '(recursion max)'

        outputs = []
        if exp != 1:
            symbol_expr = self.symbols[symbol_name].exp_random_symbol_expr(exp)
        else:
            symbol_expr = self.symbols[symbol_name].random_symbol_expr()

        for symbol in symbol_expr:
            if symbol.is_terminal:
                outputs.append(symbol.symbol_name)
            else:
                recres = self.generate_tree_from_symbol(symbol.symbol_name, max_rec, _curr_rec + 1, error)
                outputs.append('({} {})'.format(symbol.symbol_name, recres))

        return "({} {})".format(symbol_name, " ".join(outputs))

    # Example: V|1#3sgp V|1
    # This generates the same verb twice. The first specifies a conjugation for
    # both instances, and the second does not.
    # Conjugation syntax: https://github.com/clips/pattern/wiki/pattern-en#verb-conjugation
    # Using a ' in front of a word will make it a terminal symbol
    def generate_from_format(self, format: str, error=False) -> str:
        tokens = format.split(' ')
        reused_symbols = {}

        output = ""

        # Load reused symbols into dictionary
        for token in tokens:
            if token.startswith("'"):
                continue

            token_identifier = token.split('#')[0]

            if token_identifier in reused_symbols:
                continue

            if '|' in token:
                [name, tag] = token.split('|')

                generated = self.generate_from_symbol(name, error=error)

                if '#' in tag:
                    conjugation = tag.split('#')[1]
                    generated = conjugate(lemma(generated.rstrip()), conjugation) + ' '

                reused_symbols[token_identifier] = generated

        # Construct the actual sentence
        for token in tokens:
            if token.startswith("'"):
                output += token[1:] + ' '
                continue

            token_identifier = token.split('#')[0]

            if token_identifier in reused_symbols:
                output += reused_symbols[token_identifier]
            else:
                output += self.generate_from_symbol(token_identifier, error=error)

        return output

    def expr_min_size(self, symbol_expr, seen=None):
        """Compute minimum size of a symbol expression.

        Args:
            symbol_expr: Tuple of symbols in the expression.
            seen: List of expressions that have already been seen in the
            computation of minimum sizes. Used to avoid infinite recursion.
        """
        if seen is not None and symbol_expr in seen:
            return -1
        if symbol_expr not in self.min_expr_sizes:
            # Avoid infinite recursion by setting a large min size for now.
            #self.min_expr_sizes[symbol_expr] = 1000000

            min_size = 0
            for symbol in symbol_expr:
                if symbol.is_terminal:
                    min_size += 1
                else:
                    if seen is None:
                        seen = []
                    new_seen = seen + [symbol_expr]
                    symbol_size = self.symbol_min_size(symbol.symbol_name, new_seen)
                    if symbol_size > 0:
                        min_size += symbol_size
                    else:
                        min_size = -1
                        break
            if min_size > 0:
                self.min_expr_sizes[symbol_expr] = min_size
        if symbol_expr in self.min_expr_sizes:
            return self.min_expr_sizes[symbol_expr]
        else:
            return -1

    def symbol_min_size(self, symbol_name, seen=None):
        """Compute minimum size of a symbol.

        Args:
            symbol_name: Name of the symbol (string).
            seen: List of symbol names that have already been seen in the
            computation of minimum sizes. Used to avoid infinite recursion.
        """
        if seen is not None and symbol_name in seen:
            return -1
        # Compute minimum size if not already computed.
        if symbol_name not in self.min_symbol_sizes:
            # Avoid infinite recursion by setting a large min size for now.
            #self.min_symbol_sizes[symbol_name] = 1000000

            # Find symbol_expr with minimum size.
            if symbol_name not in self.symbols:
                raise ValueError(f"Symbol '{symbol_name}' not found in grammar tree! {self.symbols.keys()}")
            symbol_exprs = self.symbols[symbol_name].items
            min_expr_size = None
            if seen is None:
                seen = []
            new_seen = seen + [symbol_name]
            for symbol_expr in symbol_exprs:
                cur_size = self.expr_min_size(symbol_expr, new_seen)
                if symbol_name == 'SINV' and cur_size > 0:
                    print(f"Symbol Expression: {symbol_expr}, Size: {cur_size}")
                if cur_size > 0 and (min_expr_size is None or cur_size < min_expr_size):
                    min_expr_size = cur_size
            self.min_symbol_sizes[symbol_name] = min_expr_size

        return self.min_symbol_sizes[symbol_name]

    def compute_min_sizes(self):
        min_sizes = {}
        for symbol_name in self.symbols:
            min_sizes[symbol_name] = self.symbol_min_size(symbol_name)
        return min_sizes

def parse_file(file_path: str) -> GrammarTree:
    tree = GrammarTree()

    with open(file_path, 'r') as f:
        for line in f:
            name, expr = parse_line(line)
            tree.symbols[name] = expr

    return tree

# There seems to be some internal problem with the internal pattern.en library
# The first time you run conjugate(), it will throw an error. But after that,
# it will execute as expected.
def init_conjugation():
    try: # Random conjugation to execute
        conjugate('talk', '3sg')
    except:
        pass

if __name__ == '__main__':
    init_conjugation()

    #tree = parse_file('cfg-test.cfg')
    #tree = parse_file('verb-test.cfg')
    #tree = parse_file('test_cfgs/simple_sentence.cfg')
    tree = parse_file('../pcfg/brown-all-20240213-104843.pcfg')
    final_min_sizes = tree.compute_min_sizes()
    import pprint
    #pprint.pp(tree.min_symbol_sizes)
    #pprint.pp(tree.min_expr_sizes)
    ##sentence = tree.generate_from_format("V|1#3sgp V V|1")
    ##sentence = tree.generate_from_format("S")
    for size in [5, 10, 15, 50]:
        print("Max {}".format(size))
        for i in range(50):
            sentence = tree.generate_from_symbol("S", max_size=size, max_rec=30)
            #sentence = tree.generate_from_symbol("S", max_rec=30)
            print(f"Sentence: {sentence}")

