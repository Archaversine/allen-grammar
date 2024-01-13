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
        4,1,8,64,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,1,0,4,0,12,8,0,
        11,0,12,0,13,1,1,1,1,1,1,1,1,1,1,5,1,21,8,1,10,1,12,1,24,9,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,5,1,33,8,1,10,1,12,1,36,9,1,1,1,1,1,3,1,
        40,8,1,1,2,4,2,43,8,2,11,2,12,2,44,1,3,1,3,4,3,49,8,3,11,3,12,3,
        50,1,4,1,4,5,4,55,8,4,10,4,12,4,58,9,4,1,4,1,4,3,4,62,8,4,1,4,1,
        56,0,5,0,2,4,6,8,0,0,66,0,11,1,0,0,0,2,39,1,0,0,0,4,42,1,0,0,0,6,
        46,1,0,0,0,8,61,1,0,0,0,10,12,3,2,1,0,11,10,1,0,0,0,12,13,1,0,0,
        0,13,11,1,0,0,0,13,14,1,0,0,0,14,1,1,0,0,0,15,16,5,6,0,0,16,17,5,
        1,0,0,17,22,3,4,2,0,18,19,5,2,0,0,19,21,3,4,2,0,20,18,1,0,0,0,21,
        24,1,0,0,0,22,20,1,0,0,0,22,23,1,0,0,0,23,25,1,0,0,0,24,22,1,0,0,
        0,25,26,5,3,0,0,26,40,1,0,0,0,27,28,5,6,0,0,28,29,5,1,0,0,29,34,
        3,6,3,0,30,31,5,2,0,0,31,33,3,6,3,0,32,30,1,0,0,0,33,36,1,0,0,0,
        34,32,1,0,0,0,34,35,1,0,0,0,35,37,1,0,0,0,36,34,1,0,0,0,37,38,5,
        3,0,0,38,40,1,0,0,0,39,15,1,0,0,0,39,27,1,0,0,0,40,3,1,0,0,0,41,
        43,3,8,4,0,42,41,1,0,0,0,43,44,1,0,0,0,44,42,1,0,0,0,44,45,1,0,0,
        0,45,5,1,0,0,0,46,48,5,5,0,0,47,49,3,8,4,0,48,47,1,0,0,0,49,50,1,
        0,0,0,50,48,1,0,0,0,50,51,1,0,0,0,51,7,1,0,0,0,52,56,5,4,0,0,53,
        55,9,0,0,0,54,53,1,0,0,0,55,58,1,0,0,0,56,57,1,0,0,0,56,54,1,0,0,
        0,57,59,1,0,0,0,58,56,1,0,0,0,59,62,5,4,0,0,60,62,5,6,0,0,61,52,
        1,0,0,0,61,60,1,0,0,0,62,9,1,0,0,0,8,13,22,34,39,44,50,56,61
    ]

class herodotusParser ( Parser ):

    grammarFileName = "herodotus.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "'->'", "'|'", "'\\n'", "'\"'" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "WEIGHT", "IDENTIFIER", "WS", "COMMENT" ]

    RULE_prog = 0
    RULE_stmt = 1
    RULE_symbolExpr = 2
    RULE_weightedSymbolExpr = 3
    RULE_symbol = 4

    ruleNames =  [ "prog", "stmt", "symbolExpr", "weightedSymbolExpr", "symbol" ]

    EOF = Token.EOF
    T__0=1
    T__1=2
    T__2=3
    T__3=4
    WEIGHT=5
    IDENTIFIER=6
    WS=7
    COMMENT=8

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
            self.state = 11 
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while True:
                self.state = 10
                self.stmt()
                self.state = 13 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if not (_la==6):
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


        def getRuleIndex(self):
            return herodotusParser.RULE_stmt

     
        def copyFrom(self, ctx:ParserRuleContext):
            super().copyFrom(ctx)



    class UnweightedStmtContext(StmtContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a herodotusParser.StmtContext
            super().__init__(parser)
            self.symbolName = None # Token
            self.copyFrom(ctx)

        def symbolExpr(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(herodotusParser.SymbolExprContext)
            else:
                return self.getTypedRuleContext(herodotusParser.SymbolExprContext,i)

        def IDENTIFIER(self):
            return self.getToken(herodotusParser.IDENTIFIER, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterUnweightedStmt" ):
                listener.enterUnweightedStmt(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitUnweightedStmt" ):
                listener.exitUnweightedStmt(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitUnweightedStmt" ):
                return visitor.visitUnweightedStmt(self)
            else:
                return visitor.visitChildren(self)


    class WeightedStmtContext(StmtContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a herodotusParser.StmtContext
            super().__init__(parser)
            self.symbolName = None # Token
            self.copyFrom(ctx)

        def weightedSymbolExpr(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(herodotusParser.WeightedSymbolExprContext)
            else:
                return self.getTypedRuleContext(herodotusParser.WeightedSymbolExprContext,i)

        def IDENTIFIER(self):
            return self.getToken(herodotusParser.IDENTIFIER, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterWeightedStmt" ):
                listener.enterWeightedStmt(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitWeightedStmt" ):
                listener.exitWeightedStmt(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitWeightedStmt" ):
                return visitor.visitWeightedStmt(self)
            else:
                return visitor.visitChildren(self)



    def stmt(self):

        localctx = herodotusParser.StmtContext(self, self._ctx, self.state)
        self.enterRule(localctx, 2, self.RULE_stmt)
        self._la = 0 # Token type
        try:
            self.state = 39
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,3,self._ctx)
            if la_ == 1:
                localctx = herodotusParser.UnweightedStmtContext(self, localctx)
                self.enterOuterAlt(localctx, 1)
                self.state = 15
                localctx.symbolName = self.match(herodotusParser.IDENTIFIER)
                self.state = 16
                self.match(herodotusParser.T__0)
                self.state = 17
                self.symbolExpr()
                self.state = 22
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                while _la==2:
                    self.state = 18
                    self.match(herodotusParser.T__1)
                    self.state = 19
                    self.symbolExpr()
                    self.state = 24
                    self._errHandler.sync(self)
                    _la = self._input.LA(1)

                self.state = 25
                self.match(herodotusParser.T__2)
                pass

            elif la_ == 2:
                localctx = herodotusParser.WeightedStmtContext(self, localctx)
                self.enterOuterAlt(localctx, 2)
                self.state = 27
                localctx.symbolName = self.match(herodotusParser.IDENTIFIER)
                self.state = 28
                self.match(herodotusParser.T__0)
                self.state = 29
                self.weightedSymbolExpr()
                self.state = 34
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                while _la==2:
                    self.state = 30
                    self.match(herodotusParser.T__1)
                    self.state = 31
                    self.weightedSymbolExpr()
                    self.state = 36
                    self._errHandler.sync(self)
                    _la = self._input.LA(1)

                self.state = 37
                self.match(herodotusParser.T__2)
                pass


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
            self.state = 42 
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while True:
                self.state = 41
                self.symbol()
                self.state = 44 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if not (_la==4 or _la==6):
                    break

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class WeightedSymbolExprContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser
            self.weight = None # Token

        def WEIGHT(self):
            return self.getToken(herodotusParser.WEIGHT, 0)

        def symbol(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(herodotusParser.SymbolContext)
            else:
                return self.getTypedRuleContext(herodotusParser.SymbolContext,i)


        def getRuleIndex(self):
            return herodotusParser.RULE_weightedSymbolExpr

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterWeightedSymbolExpr" ):
                listener.enterWeightedSymbolExpr(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitWeightedSymbolExpr" ):
                listener.exitWeightedSymbolExpr(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitWeightedSymbolExpr" ):
                return visitor.visitWeightedSymbolExpr(self)
            else:
                return visitor.visitChildren(self)




    def weightedSymbolExpr(self):

        localctx = herodotusParser.WeightedSymbolExprContext(self, self._ctx, self.state)
        self.enterRule(localctx, 6, self.RULE_weightedSymbolExpr)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 46
            localctx.weight = self.match(herodotusParser.WEIGHT)
            self.state = 48 
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while True:
                self.state = 47
                self.symbol()
                self.state = 50 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if not (_la==4 or _la==6):
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
        self.enterRule(localctx, 8, self.RULE_symbol)
        try:
            self.state = 61
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [4]:
                localctx = herodotusParser.TerminalSymbolContext(self, localctx)
                self.enterOuterAlt(localctx, 1)
                self.state = 52
                self.match(herodotusParser.T__3)
                self.state = 56
                self._errHandler.sync(self)
                _alt = self._interp.adaptivePredict(self._input,6,self._ctx)
                while _alt!=1 and _alt!=ATN.INVALID_ALT_NUMBER:
                    if _alt==1+1:
                        self.state = 53
                        self.matchWildcard() 
                    self.state = 58
                    self._errHandler.sync(self)
                    _alt = self._interp.adaptivePredict(self._input,6,self._ctx)

                self.state = 59
                self.match(herodotusParser.T__3)
                pass
            elif token in [6]:
                localctx = herodotusParser.NonTerminalSymbolContext(self, localctx)
                self.enterOuterAlt(localctx, 2)
                self.state = 60
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





