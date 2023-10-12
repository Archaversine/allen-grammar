# Generated from herodotus.g4 by ANTLR 4.13.1
from antlr4 import *
from io import StringIO
import sys
if sys.version_info[1] > 5:
    from typing import TextIO
else:
    from typing.io import TextIO


def serializedATN():
    return [
        4,0,7,48,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,
        6,7,6,1,0,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,5,4,27,8,4,10,
        4,12,4,30,9,4,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,6,5,6,40,8,6,10,6,12,
        6,43,9,6,1,6,1,6,1,6,1,6,1,41,0,7,1,1,3,2,5,3,7,4,9,5,11,6,13,7,
        1,0,3,3,0,65,90,95,95,97,122,4,0,48,57,65,90,95,95,97,122,3,0,9,
        9,12,13,32,32,49,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,
        0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,1,15,1,0,0,0,3,18,1,0,0,0,
        5,20,1,0,0,0,7,22,1,0,0,0,9,24,1,0,0,0,11,31,1,0,0,0,13,35,1,0,0,
        0,15,16,5,45,0,0,16,17,5,62,0,0,17,2,1,0,0,0,18,19,5,124,0,0,19,
        4,1,0,0,0,20,21,5,10,0,0,21,6,1,0,0,0,22,23,5,34,0,0,23,8,1,0,0,
        0,24,28,7,0,0,0,25,27,7,1,0,0,26,25,1,0,0,0,27,30,1,0,0,0,28,26,
        1,0,0,0,28,29,1,0,0,0,29,10,1,0,0,0,30,28,1,0,0,0,31,32,7,2,0,0,
        32,33,1,0,0,0,33,34,6,5,0,0,34,12,1,0,0,0,35,36,5,47,0,0,36,37,5,
        47,0,0,37,41,1,0,0,0,38,40,9,0,0,0,39,38,1,0,0,0,40,43,1,0,0,0,41,
        42,1,0,0,0,41,39,1,0,0,0,42,44,1,0,0,0,43,41,1,0,0,0,44,45,5,10,
        0,0,45,46,1,0,0,0,46,47,6,6,0,0,47,14,1,0,0,0,3,0,28,41,1,6,0,0
    ]

class herodotusLexer(Lexer):

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    T__0 = 1
    T__1 = 2
    T__2 = 3
    T__3 = 4
    IDENTIFIER = 5
    WS = 6
    COMMENT = 7

    channelNames = [ u"DEFAULT_TOKEN_CHANNEL", u"HIDDEN" ]

    modeNames = [ "DEFAULT_MODE" ]

    literalNames = [ "<INVALID>",
            "'->'", "'|'", "'\\n'", "'\"'" ]

    symbolicNames = [ "<INVALID>",
            "IDENTIFIER", "WS", "COMMENT" ]

    ruleNames = [ "T__0", "T__1", "T__2", "T__3", "IDENTIFIER", "WS", "COMMENT" ]

    grammarFileName = "herodotus.g4"

    def __init__(self, input=None, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.13.1")
        self._interp = LexerATNSimulator(self, self.atn, self.decisionsToDFA, PredictionContextCache())
        self._actions = None
        self._predicates = None


