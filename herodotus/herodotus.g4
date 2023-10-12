grammar herodotus;

prog: stmt+ ;

stmt: symbolName=IDENTIFIER '->' symbolExpr ('|' symbolExpr)* '\n';

symbolExpr: symbol+ ;

symbol: '"' .*? '"' # terminalSymbol
      | IDENTIFIER  # nonTerminalSymbol
      ;

IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_]* ;

WS: [ \t\r\f] -> skip;
COMMENT: '//' .*? '\n' -> skip;
