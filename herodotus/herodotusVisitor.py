# Generated from herodotus.g4 by ANTLR 4.13.1
from antlr4 import *
if "." in __name__:
    from .herodotusParser import herodotusParser
else:
    from herodotusParser import herodotusParser

# This class defines a complete generic visitor for a parse tree produced by herodotusParser.

class herodotusVisitor(ParseTreeVisitor):

    # Visit a parse tree produced by herodotusParser#prog.
    def visitProg(self, ctx:herodotusParser.ProgContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by herodotusParser#stmt.
    def visitStmt(self, ctx:herodotusParser.StmtContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by herodotusParser#symbolExpr.
    def visitSymbolExpr(self, ctx:herodotusParser.SymbolExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by herodotusParser#terminalSymbol.
    def visitTerminalSymbol(self, ctx:herodotusParser.TerminalSymbolContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by herodotusParser#nonTerminalSymbol.
    def visitNonTerminalSymbol(self, ctx:herodotusParser.NonTerminalSymbolContext):
        return self.visitChildren(ctx)



del herodotusParser