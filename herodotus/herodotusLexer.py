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
        4,0,8,57,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,
        6,7,6,2,7,7,7,1,0,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,4,4,
        4,30,8,4,11,4,12,4,31,1,5,1,5,5,5,36,8,5,10,5,12,5,39,9,5,1,6,1,
        6,1,6,1,6,1,7,1,7,1,7,1,7,5,7,49,8,7,10,7,12,7,52,9,7,1,7,1,7,1,
        7,1,7,1,50,0,8,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,1,0,4,1,0,48,57,
        8,0,33,33,35,39,42,42,44,46,58,60,62,90,94,95,97,122,8,0,33,33,35,
        39,42,42,44,46,48,60,62,90,94,95,97,122,3,0,9,9,12,13,32,32,59,0,
        1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,
        0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,1,17,1,0,0,0,3,20,1,0,0,0,5,22,1,
        0,0,0,7,24,1,0,0,0,9,26,1,0,0,0,11,33,1,0,0,0,13,40,1,0,0,0,15,44,
        1,0,0,0,17,18,5,45,0,0,18,19,5,62,0,0,19,2,1,0,0,0,20,21,5,124,0,
        0,21,4,1,0,0,0,22,23,5,10,0,0,23,6,1,0,0,0,24,25,5,34,0,0,25,8,1,
        0,0,0,26,27,7,0,0,0,27,29,5,46,0,0,28,30,7,0,0,0,29,28,1,0,0,0,30,
        31,1,0,0,0,31,29,1,0,0,0,31,32,1,0,0,0,32,10,1,0,0,0,33,37,7,1,0,
        0,34,36,7,2,0,0,35,34,1,0,0,0,36,39,1,0,0,0,37,35,1,0,0,0,37,38,
        1,0,0,0,38,12,1,0,0,0,39,37,1,0,0,0,40,41,7,3,0,0,41,42,1,0,0,0,
        42,43,6,6,0,0,43,14,1,0,0,0,44,45,5,47,0,0,45,46,5,47,0,0,46,50,
        1,0,0,0,47,49,9,0,0,0,48,47,1,0,0,0,49,52,1,0,0,0,50,51,1,0,0,0,
        50,48,1,0,0,0,51,53,1,0,0,0,52,50,1,0,0,0,53,54,5,10,0,0,54,55,1,
        0,0,0,55,56,6,7,0,0,56,16,1,0,0,0,4,0,31,37,50,1,6,0,0
    ]

class herodotusLexer(Lexer):

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    T__0 = 1
    T__1 = 2
    T__2 = 3
    T__3 = 4
    WEIGHT = 5
    IDENTIFIER = 6
    WS = 7
    COMMENT = 8

    channelNames = [ u"DEFAULT_TOKEN_CHANNEL", u"HIDDEN" ]

    modeNames = [ "DEFAULT_MODE" ]

    literalNames = [ "<INVALID>",
            "'->'", "'|'", "'\\n'", "'\"'" ]

    symbolicNames = [ "<INVALID>",
            "WEIGHT", "IDENTIFIER", "WS", "COMMENT" ]

    ruleNames = [ "T__0", "T__1", "T__2", "T__3", "WEIGHT", "IDENTIFIER", 
                  "WS", "COMMENT" ]

    grammarFileName = "herodotus.g4"

    def __init__(self, input=None, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.13.1")
        self._interp = LexerATNSimulator(self, self.atn, self.decisionsToDFA, PredictionContextCache())
        self._actions = None
        self._predicates = None


