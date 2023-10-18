import random
import antlr4 as antlr

from herodotusLexer import herodotusLexer
from herodotusParser import herodotusParser
from herodotusVisitor import herodotusVisitor

class Symbol:
    def __init__(self, symbol_name: str, is_terminal: bool):
        self.symbol_name = symbol_name
        self.is_terminal = is_terminal

    def __repr__(self) -> str: 
        return f"Symbol({self.symbol_name}, terminal={self.is_terminal})"

class herodotusInterpreter(herodotusVisitor):

    def __init__(self):
        self.symbol_table = {}

    # Visit a parse tree produced by herodotusParser#prog.
    def visitProg(self, ctx: herodotusParser.ProgContext):
        self.visitChildren(ctx)


    # Visit a parse tree produced by herodotusParser#stmt.
    def visitStmt(self, ctx:herodotusParser.StmtContext):
        symbol_name = ctx.symbolName.text # type: ignore
        symbol_exprs = []

        for child in list(ctx.getChildren())[2:-1:2]:
            symbol_exprs.append(self.visit(child))

        self.symbol_table[symbol_name] = symbol_exprs

    # Visit a parse tree produced by herodotusParser#symbolExpr.
    def visitSymbolExpr(self, ctx:herodotusParser.SymbolExprContext):
        return [self.visit(child) for child in ctx.getChildren()]


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
        symbol_expr = random.choice(self.symbol_table[symbol])

        for s in symbol_expr: 
            if s.is_terminal:
                output += s.symbol_name + ' '
            else:
                output += self.generate_from_symbol(s.symbol_name, max_rec, curr_rec+1)

        return output

if __name__ == "__main__":
    #cfg_name      = "simple_sentence.cfg"
    #cfg_name      = "../pcfg/brown-tiny-20231017-211551.cfg"
    cfg_name      = "../pcfg/brown-20231017-211731.cfg"
    target_symbol = 'S'

    input_stream = antlr.FileStream(cfg_name)
    lexer = herodotusLexer(input_stream) 
    stream = antlr.CommonTokenStream(lexer) 
    parser = herodotusParser(stream) 
    tree = parser.prog() 
    visitor = herodotusInterpreter() 
    visitor.visit(tree) 

    print(f"Result: {visitor.generate_from_symbol(target_symbol)}")

