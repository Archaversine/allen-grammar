grammar herodotus;

prog: stmt+ ;

stmt: symbolName=IDENTIFIER '->' symbolExpr ('|' symbolExpr)* '\n'                  # unweightedStmt
    | symbolName=IDENTIFIER '->' weightedSymbolExpr ('|' weightedSymbolExpr)* '\n'  # weightedStmt
    ;

symbolExpr: symbol+ ;
weightedSymbolExpr: weight=WEIGHT symbol+ ;

symbol: '"' .*? '"' # terminalSymbol
      | IDENTIFIER  # nonTerminalSymbol
      ;

WEIGHT: [0-9] '.' [0-9]+ ;
IDENTIFIER: [a-zA-Z_\-!@#$%^&*:;'<>,.?()][a-zA-Z0-9_\-!@#$%^&*:;'<>,.?()]* ;

WS: [ \t\r\f] -> skip;
COMMENT: '//' .*? '\n' -> skip;
