from typing import List, Tuple, Dict
from random import choices, choice

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
SymbolExpr = List[Symbol]

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

    def random_symbol_expr(self) -> SymbolExpr:
        return choices(self.items, weights=self.weights)[0]

    def exp_random_symbol_expr(self, exp) -> SymbolExpr:
        return choices(self.items, weights=[w ** exp for w in self.weights])[0]

def parse_line(line: str) -> Tuple[str, WeightedList]:
    name, rest = line.split('->', 1)

    # Remove whitespace from split
    name = name.strip()
    rest = rest.strip()

    symbol_exprs: List[SymbolExpr] = []
    symbol_expr_weights: List[float] = []

    curr_expr: SymbolExpr = []

    for symbol_product in rest.split(' | '):
        curr_expr = []

        tokens = symbol_product.split(' ')

        for token in tokens[1:]:
            if token[0] == '"':
                curr_expr.append(Symbol(token[1:-1], is_terminal=True))
            else:
                curr_expr.append(Symbol(token, is_terminal=False))

        symbol_exprs.append(curr_expr)
        symbol_expr_weights.append(float(tokens[0]))

    return (name, WeightedList(symbol_exprs, symbol_expr_weights))

class GrammarTree:

    def __init__(self):
        self.symbols: Dict[str, WeightedList] = {}

    def __repr__(self) -> str:
        return f"GrammarTree({self.symbols})"

    def generate_from_symbol(self, symbol_name: str, max_rec=10, _curr_rec=0, error=False) -> str:
        if symbol_name not in self.symbols:
            if error:
                raise ValueError(f"Symbol '{symbol_name}' not found in grammar tree!")
            else:
                print(f"ERROR: Symbol '{symbol_name}' not found in grammar tree!")
                return ''

        if _curr_rec >= max_rec:
            return '(recursion max)'

        output = ""
        symbol_expr = self.symbols[symbol_name].random_symbol_expr()

        for symbol in symbol_expr:
            if symbol.is_terminal:
                output += symbol.symbol_name + ' '
            else:
                output += self.generate_from_symbol(symbol.symbol_name, max_rec, _curr_rec + 1, error)

        return output

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


def parse_file(file_path: str) -> GrammarTree:
    tree = GrammarTree()

    with open(file_path, 'r') as f:
        for line in f:
            name, expr = parse_line(line)
            tree.symbols[name] = expr

    return tree
