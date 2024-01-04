grammar herodotus;

prog: stmt ('\n' stmt)* '\n'? EOF? ;

stmt: symbolName=IDENTIFIER '->' symbolExpr ('|' symbolExpr)*                  # unweightedStmt
    | symbolName=IDENTIFIER '->' weightedSymbolExpr ('|' weightedSymbolExpr)*  # weightedStmt
    ;

symbolExpr: symbol+ ;
weightedSymbolExpr: weight=WEIGHT symbol+ ;

symbol: QUOTED_STRING # terminalSymbol
      | IDENTIFIER  # nonTerminalSymbol
      ;

QUOTED_STRING: '"' ( '\\' ~[\r\n] | ~[\\"\r\n] )* '"' ;
WEIGHT: [0-9] '.' [0-9]+ ('e' '-'? [0-9]+)? ;
IDENTIFIER: [a-zA-Z_\-!@#$%^&*:;'<>,.?()][a-zA-Z0-9_\-!@#$%^&*:;'<>,.?()]* ;

WS: [ \t\r\f] -> skip;
COMMENT: '//' .*? '\n' -> skip;
