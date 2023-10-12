# Generated from herodotus.g4 by ANTLR 4.13.1
from antlr4 import *
if "." in __name__:
    from .herodotusParser import herodotusParser
else:
    from herodotusParser import herodotusParser

# This class defines a complete listener for a parse tree produced by herodotusParser.
class herodotusListener(ParseTreeListener):

    # Enter a parse tree produced by herodotusParser#prog.
    def enterProg(self, ctx:herodotusParser.ProgContext):
        pass

    # Exit a parse tree produced by herodotusParser#prog.
    def exitProg(self, ctx:herodotusParser.ProgContext):
        pass


    # Enter a parse tree produced by herodotusParser#stmt.
    def enterStmt(self, ctx:herodotusParser.StmtContext):
        pass

    # Exit a parse tree produced by herodotusParser#stmt.
    def exitStmt(self, ctx:herodotusParser.StmtContext):
        pass


    # Enter a parse tree produced by herodotusParser#symbolExpr.
    def enterSymbolExpr(self, ctx:herodotusParser.SymbolExprContext):
        pass

    # Exit a parse tree produced by herodotusParser#symbolExpr.
    def exitSymbolExpr(self, ctx:herodotusParser.SymbolExprContext):
        pass


    # Enter a parse tree produced by herodotusParser#terminalSymbol.
    def enterTerminalSymbol(self, ctx:herodotusParser.TerminalSymbolContext):
        pass

    # Exit a parse tree produced by herodotusParser#terminalSymbol.
    def exitTerminalSymbol(self, ctx:herodotusParser.TerminalSymbolContext):
        pass


    # Enter a parse tree produced by herodotusParser#nonTerminalSymbol.
    def enterNonTerminalSymbol(self, ctx:herodotusParser.NonTerminalSymbolContext):
        pass

    # Exit a parse tree produced by herodotusParser#nonTerminalSymbol.
    def exitNonTerminalSymbol(self, ctx:herodotusParser.NonTerminalSymbolContext):
        pass



del herodotusParser