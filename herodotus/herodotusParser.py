# Generated from herodotus.g4 by ANTLR 4.13.1
# encoding: utf-8
from antlr4 import *
from io import StringIO
import sys
if sys.version_info[1] > 5:
	from typing import TextIO
else:
	from typing.io import TextIO

def serializedATN():
    return [
        4,1,7,42,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,1,0,4,0,10,8,0,11,0,12,
        0,11,1,1,1,1,1,1,1,1,1,1,5,1,19,8,1,10,1,12,1,22,9,1,1,1,1,1,1,2,
        4,2,27,8,2,11,2,12,2,28,1,3,1,3,5,3,33,8,3,10,3,12,3,36,9,3,1,3,
        1,3,3,3,40,8,3,1,3,1,34,0,4,0,2,4,6,0,0,42,0,9,1,0,0,0,2,13,1,0,
        0,0,4,26,1,0,0,0,6,39,1,0,0,0,8,10,3,2,1,0,9,8,1,0,0,0,10,11,1,0,
        0,0,11,9,1,0,0,0,11,12,1,0,0,0,12,1,1,0,0,0,13,14,5,5,0,0,14,15,
        5,1,0,0,15,20,3,4,2,0,16,17,5,2,0,0,17,19,3,4,2,0,18,16,1,0,0,0,
        19,22,1,0,0,0,20,18,1,0,0,0,20,21,1,0,0,0,21,23,1,0,0,0,22,20,1,
        0,0,0,23,24,5,3,0,0,24,3,1,0,0,0,25,27,3,6,3,0,26,25,1,0,0,0,27,
        28,1,0,0,0,28,26,1,0,0,0,28,29,1,0,0,0,29,5,1,0,0,0,30,34,5,4,0,
        0,31,33,9,0,0,0,32,31,1,0,0,0,33,36,1,0,0,0,34,35,1,0,0,0,34,32,
        1,0,0,0,35,37,1,0,0,0,36,34,1,0,0,0,37,40,5,4,0,0,38,40,5,5,0,0,
        39,30,1,0,0,0,39,38,1,0,0,0,40,7,1,0,0,0,5,11,20,28,34,39
    ]

class herodotusParser ( Parser ):

    grammarFileName = "herodotus.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "'->'", "'|'", "'\\n'", "'\"'" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "IDENTIFIER", "WS", "COMMENT" ]

    RULE_prog = 0
    RULE_stmt = 1
    RULE_symbolExpr = 2
    RULE_symbol = 3

    ruleNames =  [ "prog", "stmt", "symbolExpr", "symbol" ]

    EOF = Token.EOF
    T__0=1
    T__1=2
    T__2=3
    T__3=4
    IDENTIFIER=5
    WS=6
    COMMENT=7

    def __init__(self, input:TokenStream, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.13.1")
        self._interp = ParserATNSimulator(self, self.atn, self.decisionsToDFA, self.sharedContextCache)
        self._predicates = None




    class ProgContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def stmt(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(herodotusParser.StmtContext)
            else:
                return self.getTypedRuleContext(herodotusParser.StmtContext,i)


        def getRuleIndex(self):
            return herodotusParser.RULE_prog

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterProg" ):
                listener.enterProg(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitProg" ):
                listener.exitProg(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitProg" ):
                return visitor.visitProg(self)
            else:
                return visitor.visitChildren(self)




    def prog(self):

        localctx = herodotusParser.ProgContext(self, self._ctx, self.state)
        self.enterRule(localctx, 0, self.RULE_prog)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 9 
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while True:
                self.state = 8
                self.stmt()
                self.state = 11 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if not (_la==5):
                    break

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class StmtContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser
            self.symbolName = None # Token

        def symbolExpr(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(herodotusParser.SymbolExprContext)
            else:
                return self.getTypedRuleContext(herodotusParser.SymbolExprContext,i)


        def IDENTIFIER(self):
            return self.getToken(herodotusParser.IDENTIFIER, 0)

        def getRuleIndex(self):
            return herodotusParser.RULE_stmt

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterStmt" ):
                listener.enterStmt(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitStmt" ):
                listener.exitStmt(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitStmt" ):
                return visitor.visitStmt(self)
            else:
                return visitor.visitChildren(self)




    def stmt(self):

        localctx = herodotusParser.StmtContext(self, self._ctx, self.state)
        self.enterRule(localctx, 2, self.RULE_stmt)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 13
            localctx.symbolName = self.match(herodotusParser.IDENTIFIER)
            self.state = 14
            self.match(herodotusParser.T__0)
            self.state = 15
            self.symbolExpr()
            self.state = 20
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==2:
                self.state = 16
                self.match(herodotusParser.T__1)
                self.state = 17
                self.symbolExpr()
                self.state = 22
                self._errHandler.sync(self)
                _la = self._input.LA(1)

            self.state = 23
            self.match(herodotusParser.T__2)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class SymbolExprContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def symbol(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(herodotusParser.SymbolContext)
            else:
                return self.getTypedRuleContext(herodotusParser.SymbolContext,i)


        def getRuleIndex(self):
            return herodotusParser.RULE_symbolExpr

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterSymbolExpr" ):
                listener.enterSymbolExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitSymbolExpr" ):
                listener.exitSymbolExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitSymbolExpr" ):
                return visitor.visitSymbolExpr(self)
            else:
                return visitor.visitChildren(self)




    def symbolExpr(self):

        localctx = herodotusParser.SymbolExprContext(self, self._ctx, self.state)
        self.enterRule(localctx, 4, self.RULE_symbolExpr)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 26 
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while True:
                self.state = 25
                self.symbol()
                self.state = 28 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if not (_la==4 or _la==5):
                    break

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class SymbolContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser


        def getRuleIndex(self):
            return herodotusParser.RULE_symbol

     
        def copyFrom(self, ctx:ParserRuleContext):
            super().copyFrom(ctx)



    class TerminalSymbolContext(SymbolContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a herodotusParser.SymbolContext
            super().__init__(parser)
            self.copyFrom(ctx)


        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterTerminalSymbol" ):
                listener.enterTerminalSymbol(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitTerminalSymbol" ):
                listener.exitTerminalSymbol(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitTerminalSymbol" ):
                return visitor.visitTerminalSymbol(self)
            else:
                return visitor.visitChildren(self)


    class NonTerminalSymbolContext(SymbolContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a herodotusParser.SymbolContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def IDENTIFIER(self):
            return self.getToken(herodotusParser.IDENTIFIER, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterNonTerminalSymbol" ):
                listener.enterNonTerminalSymbol(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitNonTerminalSymbol" ):
                listener.exitNonTerminalSymbol(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitNonTerminalSymbol" ):
                return visitor.visitNonTerminalSymbol(self)
            else:
                return visitor.visitChildren(self)



    def symbol(self):

        localctx = herodotusParser.SymbolContext(self, self._ctx, self.state)
        self.enterRule(localctx, 6, self.RULE_symbol)
        try:
            self.state = 39
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [4]:
                localctx = herodotusParser.TerminalSymbolContext(self, localctx)
                self.enterOuterAlt(localctx, 1)
                self.state = 30
                self.match(herodotusParser.T__3)
                self.state = 34
                self._errHandler.sync(self)
                _alt = self._interp.adaptivePredict(self._input,3,self._ctx)
                while _alt!=1 and _alt!=ATN.INVALID_ALT_NUMBER:
                    if _alt==1+1:
                        self.state = 31
                        self.matchWildcard() 
                    self.state = 36
                    self._errHandler.sync(self)
                    _alt = self._interp.adaptivePredict(self._input,3,self._ctx)

                self.state = 37
                self.match(herodotusParser.T__3)
                pass
            elif token in [5]:
                localctx = herodotusParser.NonTerminalSymbolContext(self, localctx)
                self.enterOuterAlt(localctx, 2)
                self.state = 38
                self.match(herodotusParser.IDENTIFIER)
                pass
            else:
                raise NoViableAltException(self)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx





