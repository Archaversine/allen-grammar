"""
Context-free grammar definition.

Basic implementation that uses string literals for all purposes. No regex
support. Terminal and non-terminal symbols exist in a single vocabulary.

Symbols in both the terminal and non-terminal states must not include:
    ->
    |
    [space]

->          defines a rule
|           separates productions
[space]     separates symbols in a production
[newline]   separates rules
"""

from typing import Set, List

class CFGRule:
    """An individual context-free grammar rule.
    """
    def __init__(self, rulename: str, productions):
        """Initializes a CFG rule.

        rulename: Str
            Non-terminal symbol for rule

        productions: Set[Tuple[str]]
            A set of productions, where each production is a list of
            non-terminal and terminal symbols, represented as strings.
        """
        self._name = rulename
        self._productions = productions

    def name(self):
        return self._name

    def productions(self):
        return self._productions

    def all_symbols(self):
        """Returns a set of all symbols used in this rule.
        """
        # TODO: make this more efficient or store if we use multiple times.
        symbols = [self._name]
        for prod in self._productions:
            for symbol in prod:
                symbols.append(symbol)
        return set(symbols)

    def from_string(rule_string: str):
        """Generates a CFGRule instance from a rule string of the format:
        
        Rule -> [production] | [production] | [production] | ...
        """
        rule_prods = rule_string.split("->")
        rule = rule_prods[0].strip()
        prod_strs = [prod.strip()
                     for prod
                     in "->".join(rule_prods[1:]).split("|")]
        prods = [tuple(prod_str.split(" ")) for prod_str in prod_strs]
        return CFGRule(rule, set(prods))


class CFG:
    """Context-Free Grammar definition.

    A set of CFG Rules.
    """
    def __init__(self, root: str, rules: Set[CFGRule]):
        """Initialize a context free grammar.

        root: str
            The non-terminal symbol that forms the root of the grammar.

        rules: Set[CFGRule]
            The set of the CFG rules that make up the grammar.
        """
        self._root = root
        self._rules = rules
            
        # Compute terminal and nonterminal symbols.
        self._nonterminals = set([r.name() for r in self._rules])
        all_symbols = set()
        for rule in self._rules:
            all_symbols |= rule.all_symbols()
        self._terminals = all_symbols - self._nonterminals

    def root(self):
        return self._root

    def rules(self):
        return self._rules

    def nonterminals(self):
        return self._nonterminals

    def terminals(self):
        return self._terminals

    def from_string(cfg_string: str):
        """Generates a CFG from a string of the format:

        [root cfg rule]
        [cfg rule]
        [cfg rule]
        ...

        The first rule is assumed to be the root.
        """
        rules = [CFGRule.from_string(rulestr)
                 for rulestr
                 in cfg_string.splitlines()]
        root = rules[0].name()
        return CFG(root, set(rules))

