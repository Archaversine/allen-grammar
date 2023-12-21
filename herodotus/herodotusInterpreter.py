import antlr4 as antlr
import argparse
import dill as pickle
import os
import pdb
import random
import sys

from herodotusLexer import herodotusLexer
from herodotusParser import herodotusParser
from herodotusVisitor import herodotusVisitor

from typing import List

# Trigger debugging interpreter on exception.
class ExceptionHook:
    instance = None
    def __call__(self, *args, **kwargs):
        if self.instance is None:
            from IPython.core import ultratb
            self.instance = ultratb.FormattedTB(mode="Plain", color_scheme="Linux", call_pdb=1)
        return self.instance(*args, **kwargs)

sys.excepthook = ExceptionHook()

class Symbol:
    def __init__(self, symbol_name: str, is_terminal: bool):
        self.symbol_name = symbol_name
        self.is_terminal = is_terminal

    def __repr__(self) -> str:
        return f"Symbol({self.symbol_name}, terminal={self.is_terminal})"

class WeightedList:
    def __init__(self, items: list, weights: List[float]):
        if len(items) != len(weights):
            raise ValueError("Items and weights must be the same length!")

        self.items = items
        self.weights = weights

    def __repr__(self) -> str:
        return f"<{list(zip(self.weights, self.items))}>"

    def __iter__(self):
        return iter(self.items)

def random_list_item(items):
    if isinstance(items, WeightedList):
        return random.choices(items.items, weights=items.weights, k=1)[0]

    return random.choice(items)

class herodotusInterpreter(herodotusVisitor):

    def __init__(self):
        self.symbol_table = {}

    # Visit a parse tree produced by herodotusParser#prog.
    def visitProg(self, ctx: herodotusParser.ProgContext):
        self.visitChildren(ctx)


    # Visit a parse tree produced by herodotusParser#unweightedStmt.
    def visitUnweightedStmt(self, ctx:herodotusParser.UnweightedStmtContext):
        symbol_name = ctx.symbolName.text # type: ignore
        symbol_exprs = []

        for child in list(ctx.getChildren())[2:-1:2]:
            symbol_exprs.append(self.visit(child))

        self.symbol_table[symbol_name] = symbol_exprs

    # Visit a parse tree produced by herodotusParser#weightedStmt.
    def visitWeightedStmt(self, ctx:herodotusParser.WeightedStmtContext):
        symbol_name = ctx.symbolName.text # type: ignore
        symbol_exprs = []
        weights = []

        for child in list(ctx.getChildren())[2:-1:2]:
            weight, expr = self.visit(child)
            symbol_exprs.append(expr)
            weights.append(weight)
            #symbol_exprs.append(self.visit(child))

        #self.symbol_table[symbol_name] = symbol_exprs
        self.symbol_table[symbol_name] = WeightedList(symbol_exprs, weights)


    # Visit a parse tree produced by herodotusParser#symbolExpr.
    def visitSymbolExpr(self, ctx:herodotusParser.SymbolExprContext):
        return [self.visit(child) for child in ctx.getChildren()]


    # Visit a parse tree produced by herodotusParser#weightedSymbolExpr.
    def visitWeightedSymbolExpr(self, ctx:herodotusParser.WeightedSymbolExprContext):
        values = []
        weight = float(ctx.weight.text) # type: ignore

        for child in list(ctx.getChildren())[1::2]:
            values.append(self.visit(child))

        return weight, values


    # Visit a parse tree produced by herodotusParser#nonTerminalSymbol.
    def visitNonTerminalSymbol(self, ctx:herodotusParser.NonTerminalSymbolContext):
        return Symbol(ctx.getText(), is_terminal=False)


    # Visit a parse tree produced by herodotusParser#terminalSymbol.
    def visitTerminalSymbol(self, ctx:herodotusParser.TerminalSymbolContext):
        return Symbol(ctx.getText()[1:-1], is_terminal=True)

    def generate_from_symbol(self, symbol: str, max_rec=10, curr_rec=0, error=False) -> str:
        if symbol not in self.symbol_table:
            if error:
                raise ValueError(f"Symbol {symbol} does not exist!")
            else:
                print(f"ERROR: Symbol {symbol} does not exist!")
                return ''

        if curr_rec >= max_rec:
            return "(recursion max)"

        output = ""
        symbol_expr = random_list_item(self.symbol_table[symbol])

        for s in symbol_expr:
            if s.is_terminal:
                output += s.symbol_name + ' '
            else:
                output += self.generate_from_symbol(s.symbol_name, max_rec, curr_rec+1)

        return output

def build_tree(cfg_path):
    """Build a parse tree from a CFG/PCFG file.
    """
    print("Building parse tree from {}...".format(cfg_path))
    input_stream = antlr.FileStream(cfg_path)
    print("Building Lexer...")
    lexer = herodotusLexer(input_stream)
    print("Building Parser...")
    stream = antlr.CommonTokenStream(lexer)
    parser = herodotusParser(stream)
    print("Building Tree...")
    tree = parser.prog()
    print("Tree built!")
    return tree

def save_tree(tree, tree_path):
    """Save a parse tree to a file.
    """
    print("Saving tree to {}...".format(tree_path))
    # Make directory if it doesn't exist.
    directory = os.path.dirname(tree_path)
    if not os.path.exists(directory):
        os.makedirs(directory)
    # Write to file.
    with open(tree_path, 'wb') as f:
        pickle.dump(tree, f)
    print("Tree saved!")

def load_tree(tree_path):
    """Load a parse tree from a pickle file.
    """
    print("Loading tree from {}...".format(tree_path))
    with open(tree_path, 'rb') as f:
        tree = pickle.load(f)
    print("Tree loaded!")
    return tree


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="""Generate sentences from a CFG/PCFG.

This script will generate a new CFG/PCFG tree from the given CFG/PCFG file and then use that to generate sentences. The CFG/PCFG tree will be loaded from tree_path if it exists, otherwise it will be created from cfg_path and saved to tree_path.""")
    parser.add_argument('--cfg_path', type=str, help='The path to the CFG/PCFG file to use in constructing a new herodotus interpreter.')
    parser.add_argument('--tree_path', type=str, help='The path to the tree pickle file. If it exists, the tree will be loaded from this file. If it does not exist, the tree will be constructed from cfg_path and saved to this file.')
    parser.add_argument('--error', action='store_true', help='Whether to raise an error if the symbol does not exist in the symbol table.')
    args = parser.parse_args()

    cfg_path = args.cfg_path
    tree_path = args.tree_path
    error = args.error

    # Debugging arguments.
    #cfg_path      = "cfg_tests/simple_sentence.cfg"
    #cfg_path      = "cfg_tests/test.cfg"
    #cfg_path      = "cfg_tests/numbered_symbols.cfg"
    #cfg_path      = "cfg_tests/scientific_notation.cfg"
    #cfg_path      = "../pcfg/brown-20231017-211731.cfg"
    #cfg_path      = "../pcfg/brown-tiny-20231017-211551.pcfg"
    #cfg_path      = "../pcfg/brown-a-20231110-135456.cfg"
    #cfg_path      = "../pcfg/brown-a-20231212-134952.pcfg"
    target_symbol = 'S'

    if tree_path is not None and os.path.isfile(tree_path):
        tree = load_tree(tree_path)
    elif cfg_path is not None and os.path.isfile(cfg_path):
        tree = build_tree(cfg_path)
    else:
        raise ValueError("Must specify an existing cfg_path or tree_path!")
        exit(1)

    if tree_path is not None and not os.path.isfile(tree_path):
        save_tree(tree, tree_path)

    print("Visiting Tree...")
    visitor = herodotusInterpreter()
    visitor.visit(tree)

    print("Sampling Sentence...")
    print(f"Result: {visitor.generate_from_symbol(target_symbol, max_rec=10, error=error)}")

