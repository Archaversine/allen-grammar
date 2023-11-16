import random
import antlr4 as antlr

from herodotusLexer import herodotusLexer
from herodotusParser import herodotusParser
from herodotusVisitor import herodotusVisitor

from typing import List

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

    def generate_from_symbol(self, symbol: str, max_rec=10, curr_rec=0) -> str:
        if symbol not in self.symbol_table:
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

if __name__ == "__main__":
    #cfg_name      = "simple_sentence.cfg"
    #cfg_name      = "test.cfg"
    cfg_name      = "hard_question_mark_test.cfg"
    #cfg_name      = "../pcfg/brown-20231017-211731.cfg"
    #cfg_name      = "../pcfg/brown-tiny-20231017-211551.pcfg"
    #cfg_name      = "../pcfg/brown-a-20231110-135456.cfg"
    target_symbol = 'S'

    input_stream = antlr.FileStream(cfg_name)
    print("Building Lexer...")
    lexer = herodotusLexer(input_stream) 
    print("Building Parser...")
    stream = antlr.CommonTokenStream(lexer) 
    parser = herodotusParser(stream) 
    print("Building Tree...")
    tree = parser.prog() 
    visitor = herodotusInterpreter() 
    print("Visiting Tree...")
    visitor.visit(tree) 

    print("Sampling Sentence...")
    print(f"Result: {visitor.generate_from_symbol(target_symbol, max_rec=5)}")

