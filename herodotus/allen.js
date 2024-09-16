#!/usr/bin/env node
class IdrisError extends Error { }

function __prim_js2idris_array(x){
  let acc = { h:0 };

  for (let i = x.length-1; i>=0; i--) {
      acc = { a1:x[i], a2:acc };
  }
  return acc;
}

function __prim_idris2js_array(x){
  const result = Array();
  while (x.h === undefined) {
    result.push(x.a1); x = x.a2;
  }
  return result;
}

function __lazy(thunk) {
  let res;
  return function () {
    if (thunk === undefined) return res;
    res = thunk();
    thunk = undefined;
    return res;
  };
};

function __prim_stringIteratorNew(_str) {
  return 0
}

function __prim_stringIteratorToString(_, str, it, f) {
  return f(str.slice(it))
}

function __prim_stringIteratorNext(str, it) {
  if (it >= str.length)
    return {h: 0};
  else
    return {a1: str.charAt(it), a2: it + 1};
}

function __tailRec(f,ini) {
  let obj = ini;
  while(true){
    switch(obj.h){
      case 0: return obj.a1;
      default: obj = f(obj);
    }
  }
}

const _idrisworld = Symbol('idrisworld')

const _crashExp = x=>{throw new IdrisError(x)}

const _bigIntOfString = s=> {
  try {
    const idx = s.indexOf('.')
    return idx === -1 ? BigInt(s) : BigInt(s.slice(0, idx))
  } catch (e) { return 0n }
}

const _numberOfString = s=> {
  try {
    const res = Number(s);
    return isNaN(res) ? 0 : res;
  } catch (e) { return 0 }
}

const _intOfString = s=> Math.trunc(_numberOfString(s))

const _truncToChar = x=> String.fromCodePoint(
  (x >= 0 && x <= 55295) || (x >= 57344 && x <= 1114111) ? x : 0
)

// Int8
const _truncInt8 = x => {
  const res = x & 0xff;
  return res >= 0x80 ? res - 0x100 : res;
}

const _truncBigInt8 = x => Number(BigInt.asIntN(8, x))

// Euclidian Division
const _div = (a,b) => {
  const q = Math.trunc(a / b)
  const r = a % b
  return r < 0 ? (b > 0 ? q - 1 : q + 1) : q
}

const _divBigInt = (a,b) => {
  const q = a / b
  const r = a % b
  return r < 0n ? (b > 0n ? q - 1n : q + 1n) : q
}

// Euclidian Modulo
const _mod = (a,b) => {
  const r = a % b
  return r < 0 ? (b > 0 ? r + b : r - b) : r
}

const _modBigInt = (a,b) => {
  const r = a % b
  return r < 0n ? (b > 0n ? r + b : r - b) : r
}

const _add8s = (a,b) => _truncInt8(a + b)
const _sub8s = (a,b) => _truncInt8(a - b)
const _mul8s = (a,b) => _truncInt8(a * b)
const _div8s = (a,b) => _truncInt8(_div(a,b))
const _shl8s = (a,b) => _truncInt8(a << b)
const _shr8s = (a,b) => _truncInt8(a >> b)

// Int16
const _truncInt16 = x => {
  const res = x & 0xffff;
  return res >= 0x8000 ? res - 0x10000 : res;
}

const _truncBigInt16 = x => Number(BigInt.asIntN(16, x))

const _add16s = (a,b) => _truncInt16(a + b)
const _sub16s = (a,b) => _truncInt16(a - b)
const _mul16s = (a,b) => _truncInt16(a * b)
const _div16s = (a,b) => _truncInt16(_div(a,b))
const _shl16s = (a,b) => _truncInt16(a << b)
const _shr16s = (a,b) => _truncInt16(a >> b)

//Int32
const _truncInt32 = x => x & 0xffffffff

const _truncBigInt32 = x => Number(BigInt.asIntN(32, x))

const _add32s = (a,b) => _truncInt32(a + b)
const _sub32s = (a,b) => _truncInt32(a - b)
const _div32s = (a,b) => _truncInt32(_div(a,b))

const _mul32s = (a,b) => {
  const res = a * b;
  if (res <= Number.MIN_SAFE_INTEGER || res >= Number.MAX_SAFE_INTEGER) {
    return _truncInt32((a & 0xffff) * b + (b & 0xffff) * (a & 0xffff0000))
  } else {
    return _truncInt32(res)
  }
}

//Int64
const _truncBigInt64 = x => BigInt.asIntN(64, x)

const _add64s = (a,b) => _truncBigInt64(a + b)
const _sub64s = (a,b) => _truncBigInt64(a - b)
const _mul64s = (a,b) => _truncBigInt64(a * b)
const _shl64s = (a,b) => _truncBigInt64(a << b)
const _div64s = (a,b) => _truncBigInt64(_divBigInt(a,b))
const _shr64s = (a,b) => _truncBigInt64(a >> b)

//Bits8
const _truncUInt8 = x => x & 0xff

const _truncUBigInt8 = x => Number(BigInt.asUintN(8, x))

const _add8u = (a,b) => (a + b) & 0xff
const _sub8u = (a,b) => (a - b) & 0xff
const _mul8u = (a,b) => (a * b) & 0xff
const _div8u = (a,b) => Math.trunc(a / b)
const _shl8u = (a,b) => (a << b) & 0xff
const _shr8u = (a,b) => (a >> b) & 0xff

//Bits16
const _truncUInt16 = x => x & 0xffff

const _truncUBigInt16 = x => Number(BigInt.asUintN(16, x))

const _add16u = (a,b) => (a + b) & 0xffff
const _sub16u = (a,b) => (a - b) & 0xffff
const _mul16u = (a,b) => (a * b) & 0xffff
const _div16u = (a,b) => Math.trunc(a / b)
const _shl16u = (a,b) => (a << b) & 0xffff
const _shr16u = (a,b) => (a >> b) & 0xffff

//Bits32
const _truncUBigInt32 = x => Number(BigInt.asUintN(32, x))

const _truncUInt32 = x => {
  const res = x & -1;
  return res < 0 ? res + 0x100000000 : res;
}

const _add32u = (a,b) => _truncUInt32(a + b)
const _sub32u = (a,b) => _truncUInt32(a - b)
const _mul32u = (a,b) => _truncUInt32(_mul32s(a,b))
const _div32u = (a,b) => Math.trunc(a / b)

const _shl32u = (a,b) => _truncUInt32(a << b)
const _shr32u = (a,b) => _truncUInt32(a <= 0x7fffffff ? a >> b : (b == 0 ? a : (a >> b) ^ ((-0x80000000) >> (b-1))))
const _and32u = (a,b) => _truncUInt32(a & b)
const _or32u = (a,b)  => _truncUInt32(a | b)
const _xor32u = (a,b) => _truncUInt32(a ^ b)

//Bits64
const _truncUBigInt64 = x => BigInt.asUintN(64, x)

const _add64u = (a,b) => BigInt.asUintN(64, a + b)
const _mul64u = (a,b) => BigInt.asUintN(64, a * b)
const _div64u = (a,b) => a / b
const _shl64u = (a,b) => BigInt.asUintN(64, a << b)
const _shr64u = (a,b) => BigInt.asUintN(64, a >> b)
const _sub64u = (a,b) => BigInt.asUintN(64, a - b)

//String
const _strReverse = x => x.split('').reverse().join('')

const _substr = (o,l,x) => x.slice(o, o + l)

const _sysos = ((o => o === 'linux'?'unix':o==='win32'?'windows':o)(require('os').platform()));
const support_system_file_fs = require('fs')
const support_system_file_child_process = require('child_process')

function support_system_file_fileErrno(){
  const n = process.__lasterr===undefined?0:process.__lasterr.errno || 0
  if (process.platform == 'win32') {
    // TODO: Add the error codes for the other errors
    switch(n) {
      case -4058: return 2
      case -4075: return 4
      default: return -n
    }
  } else {
    switch(n){
      case -17: return 4
      default: return -n
    }
  }
}

// like `readLine` without the overhead of copying characters.
// returns int (success 0, failure -1) to align with the C counterpart.
function support_system_file_seekLine (file_ptr) {
  const LF = 0x0a
  const readBuf = Buffer.alloc(1)
  let lineEnd = file_ptr.buffer.indexOf(LF)
  while (lineEnd === -1) {
    const bytesRead = support_system_file_fs.readSync(file_ptr.fd, readBuf, 0, 1, null)
    if (bytesRead === 0) {
      file_ptr.eof = true
      file_ptr.buffer = Buffer.alloc(0)
      return 0
    }
    file_ptr.buffer = Buffer.concat([file_ptr.buffer, readBuf.slice(0, bytesRead)])
    lineEnd = file_ptr.buffer.indexOf(LF)
  }
  file_ptr.buffer = file_ptr.buffer.slice(lineEnd + 1)
  return 0
}

function support_system_file_readLine (file_ptr) {
  const LF = 0x0a
  const readBuf = Buffer.alloc(1)
  let lineEnd = file_ptr.buffer.indexOf(LF)
  while (lineEnd === -1) {
    const bytesRead = support_system_file_fs.readSync(file_ptr.fd, readBuf, 0, 1, null)
    if (bytesRead === 0) {
      file_ptr.eof = true
      const line = file_ptr.buffer.toString('utf-8')
      file_ptr.buffer = Buffer.alloc(0)
      return line
    }
    file_ptr.buffer = Buffer.concat([file_ptr.buffer, readBuf.slice(0, bytesRead)])
    lineEnd = file_ptr.buffer.indexOf(LF)
  }
  const line = file_ptr.buffer.slice(0, lineEnd + 1).toString('utf-8')
  file_ptr.buffer = file_ptr.buffer.slice(lineEnd + 1)
  return line
}

function support_system_file_getStr () {
  return support_system_file_readLine({ fd: 0, buffer: Buffer.alloc(0), name: '<stdin>', eof: false })
}

function support_system_file_getChar() {
  const readBuf = Buffer.alloc(1);
  if (support_system_file_fs.readSync(process.stdin.fd, readBuf, 0, 1) === 0) {
    // No bytes read, getChar from libc returns -1 in this case.
    return String.fromCharCode(-1)
  } else {
    return readBuf.toString('utf-8')
  }
}

function support_system_file_parseMode(mode) {
  return mode.replace('b', '')
}

function support_system_file_openFile (n, m) {
  try {
    const fd = support_system_file_fs.openSync(n, support_system_file_parseMode(m))
    return { fd: fd, buffer: Buffer.alloc(0), name: n, eof: false }
  } catch (e) {
    process.__lasterr = e
    return null
  }
}

function support_system_file_chmod (filename, mode) {
  try {
    support_system_file_fs.chmodSync(filename, mode)
    return 0
  } catch (e) {
    process.__lasterr = e
    return 1
  }
}

function support_system_file_removeFile (filename) {
  try {
    support_system_file_fs.unlinkSync(filename)
    return 0
  } catch (e) {
    process.__lasterr = e
    return 1
  }
}

// IMPLEMENTATION NOTE:
// If in the future Idris's NodeJS backend supports executing async code, the
// far superior and more true-to-C way to implement popen/pclose would be to
// spawn in popen (instead of spawnSync) and then in pclose await the processes
// completion.
//
// Note doing the above makes it impossible to support the use-case for popen of
// writing to the child process's stdin between popen and pclose.
function support_system_file_popen (cmd, m) {
  const mode = support_system_file_parseMode(m)
  if (mode != 'r') {
    process.__lasterr = 'The NodeJS popen FFI only supports opening for reading currently.'
    return null
  }

  const tmp_file = require('os').tmpdir() + "/" + require('crypto').randomBytes(15).toString('hex')
  const write_fd = support_system_file_fs.openSync(
    tmp_file,
    'w'
  )

  var io_setting
  switch (mode) {
    case "r":
      io_setting = ['ignore', write_fd, 2]
      break
    case "w": 
    case "a":
      io_setting = [write_fd, 'ignore', 2]
      break
    default:
      process.__lasterr = 'The popen function cannot be used for reading and writing simultaneously.'
      return null
  }

  const { status, error  } = support_system_file_child_process.spawnSync(
    cmd,
    [],
    { stdio: io_setting, shell: true }
  )

  support_system_file_fs.closeSync(write_fd)

  if (error) {
    process.__lasterr = error
    return null
  }

  const read_ptr = support_system_file_openFile(
    tmp_file,
    'r'
  )

  return { ...read_ptr, exit_code: status }
}

function support_system_file_pclose (file_ptr) {
  const { fd, name, exit_code } = file_ptr
  support_system_file_fs.closeSync(fd)
  support_system_file_removeFile(name)
  return exit_code
}

function support_system_file_filetime(file_ptr) {
  const {fd, name, exit_code} = file_ptr
  const st = support_system_file_fs.fstatSync(fd)
  const ft = {
    atime_sec : _truncInt32(Math.trunc(st.atimeMs / 1000)),
    atime_nsec : st.atimeMs * 1000000 % 1000000000,
    mtime_sec : _truncInt32(Math.trunc(st.mtimeMs / 1000)),
    mtime_nsec : st.mtimeMs * 1000000 % 1000000000,
    ctime_sec : _truncInt32(Math.trunc(st.ctimeMs / 1000)),
    ctime_nsec : st.mtimeMs * 1000000 % 1000000000
  };
  return ft
}

const System_File_ReadWrite_prim__writeLine = ((filePtr, line) => require('fs').writeSync(filePtr.fd, line, undefined, 'utf-8'));
const System_File_ReadWrite_prim__seekLine = support_system_file_seekLine;
const System_File_ReadWrite_prim__readLine = support_system_file_readLine;
const System_File_ReadWrite_prim__eof = (f=>(f.eof?1:0));
const System_FFI_prim__free = (()=>undefined);
const Prelude_Types_fastUnpack = ((str)=>__prim_js2idris_array(Array.from(str)));
const Prelude_Types_fastPack = ((xs)=>__prim_idris2js_array(xs).join(''));
const Prelude_Types_fastConcat = ((xs)=>__prim_idris2js_array(xs).join(''));
const Prelude_IO_prim__putStr = (x=>process.stdout.write(x));
const Prelude_IO_prim__getString = (x=>x);
const PrimIO_prim__nullAnyPtr = (x=>x===undefined||x===null?1:0);
const System_File_Error_prim__fileErrno = support_system_file_fileErrno;
const System_File_Error_prim__error = (x=>(x===1?1:0));
const System_Errno_prim__strerror = (errno=>'Error code: '+errno);
const System_File_Handle_prim__open = support_system_file_openFile;
const System_File_Handle_prim__close = ((fp) => require('fs').closeSync(fp.fd));
const System_prim__getArgCount = (() => process.argv.length - 1);
const System_prim__getArg = (n => process.argv[n + 1]);
/* {$tcOpt:1} */
function x24tcOpt_1($0) {
 switch($0.a4.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:1} */, a1: $0.a3};
  case undefined: /* cons */ {
   switch($0.a4.a2.h) {
    case 0: /* nil */ return {h: 0 /* {TcDone:1} */, a1: ($0.a3+$0.a1.a1($0.a4.a1))};
    default: return {h: 1 /* {TcContinue1:1} */, a1: $0.a1, a2: $0.a2, a3: ($0.a3+($0.a1.a1($0.a4.a1)+', ')), a4: $0.a4.a2};
   }
  }
 }
}

/* Prelude.Show.3221:12652:show' */
function Prelude_Show_n__3221_12652_showx27($0, $1, $2, $3) {
 return __tailRec(x24tcOpt_1, {h: 1 /* {TcContinue1:1} */, a1: $0, a2: $1, a3: $2, a4: $3});
}

/* {$tcOpt:2} */
function x24tcOpt_2($0) {
 switch($0.a1) {
  case 0n: _crashExp('Nat case not covered');
  default: {
   const $3 = ($0.a1-1n);
   return {h: 1 /* {TcContinue2:1} */, a1: $3};
  }
 }
}

/* Data.List.Suffix.uninhabited */
function Data_List_Suffix_uninhabited_Uninhabited_x28x28x28Suffixx20x24bx29x20x28x28x3ax3ax20x24hx29x20x24tx29x29x20Nilx29($0) {
 return __tailRec(x24tcOpt_2, {h: 1 /* {TcContinue2:1} */, a1: $0});
}

/* {$tcOpt:3} */
function x24tcOpt_3($0) {
 switch($0.a2.h) {
  case 0: /* Leaf */ return {h: 0 /* {TcDone:3} */, a1: $0.a1({a1: $0.a2.a1, a2: $0.a2.a2})};
  case 1: /* Branch2 */ return {h: 1 /* {TcContinue3:1} */, a1: $9 => ({a1: $9, a2: Data_SortedMap_Dependent_n__6841_6801_treeToListx27($0.a1, $0.a2.a3)}), a2: $0.a2.a1};
  case 2: /* Branch3 */ return {h: 1 /* {TcContinue3:1} */, a1: $11 => ({a1: $11, a2: Data_SortedMap_Dependent_n__6841_6801_treeToListx27($16 => ({a1: $16, a2: Data_SortedMap_Dependent_n__6841_6801_treeToListx27($0.a1, $0.a2.a5)}), $0.a2.a3)}), a2: $0.a2.a1};
 }
}

/* Data.SortedMap.Dependent.6841:6801:treeToList' */
function Data_SortedMap_Dependent_n__6841_6801_treeToListx27($0, $1) {
 return __tailRec(x24tcOpt_3, {h: 1 /* {TcContinue3:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:4} */
function x24tcOpt_4($0) {
 switch($0.a3.h) {
  case undefined: /* cons */ {
   switch($0.a3.a1) {
    case '\u{5c}': {
     switch($0.a3.a2.h) {
      case undefined: /* cons */ {
       switch($0.a3.a2.a1) {
        case '\"': return {h: 1 /* {TcContinue4:1} */, a1: {a1: $0.a1, a2: '\"'}, a2: $0.a2, a3: $0.a3.a2.a2, a4: (($0.a4+1n)+1n)};
        case 'n': return {h: 1 /* {TcContinue4:1} */, a1: {a1: $0.a1, a2: '\n'}, a2: $0.a2, a3: $0.a3.a2.a2, a4: (($0.a4+1n)+1n)};
        case 'f': return {h: 1 /* {TcContinue4:1} */, a1: {a1: $0.a1, a2: '\u{c}'}, a2: $0.a2, a3: $0.a3.a2.a2, a4: (($0.a4+1n)+1n)};
        case 'b': return {h: 1 /* {TcContinue4:1} */, a1: {a1: $0.a1, a2: '\u{8}'}, a2: $0.a2, a3: $0.a3.a2.a2, a4: (($0.a4+1n)+1n)};
        case 'r': return {h: 1 /* {TcContinue4:1} */, a1: {a1: $0.a1, a2: '\r'}, a2: $0.a2, a3: $0.a3.a2.a2, a4: (($0.a4+1n)+1n)};
        case 't': return {h: 1 /* {TcContinue4:1} */, a1: {a1: $0.a1, a2: '\u{9}'}, a2: $0.a2, a3: $0.a3.a2.a2, a4: (($0.a4+1n)+1n)};
        case '\u{5c}': return {h: 1 /* {TcContinue4:1} */, a1: {a1: $0.a1, a2: '\u{5c}'}, a2: $0.a2, a3: $0.a3.a2.a2, a4: (($0.a4+1n)+1n)};
        case '/': return {h: 1 /* {TcContinue4:1} */, a1: {a1: $0.a1, a2: '/'}, a2: $0.a2, a3: $0.a3.a2.a2, a4: (($0.a4+1n)+1n)};
        case 'u': {
         switch($0.a3.a2.a2.h) {
          case undefined: /* cons */ {
           switch($0.a3.a2.a2.a2.h) {
            case undefined: /* cons */ {
             switch($0.a3.a2.a2.a2.a2.h) {
              case undefined: /* cons */ {
               switch($0.a3.a2.a2.a2.a2.a2.h) {
                case undefined: /* cons */ {
                 let $5a;
                 switch(Prelude_Types_isHexDigit($0.a3.a2.a2.a1)) {
                  case 1: {
                   switch(Prelude_Types_isHexDigit($0.a3.a2.a2.a2.a1)) {
                    case 1: {
                     switch(Prelude_Types_isHexDigit($0.a3.a2.a2.a2.a2.a1)) {
                      case 1: {
                       $5a = Prelude_Types_isHexDigit($0.a3.a2.a2.a2.a2.a2.a1);
                       break;
                      }
                      case 0: {
                       $5a = 0;
                       break;
                      }
                     }
                     break;
                    }
                    case 0: {
                     $5a = 0;
                     break;
                    }
                   }
                   break;
                  }
                  case 0: {
                   $5a = 0;
                   break;
                  }
                 }
                 switch($5a) {
                  case 1: {
                   const $66 = _truncToChar(Number(((((Text_Lex_Manual_hexDigit($0.a3.a2.a2.a1)*4096n)+(Text_Lex_Manual_hexDigit($0.a3.a2.a2.a2.a1)*256n))+(Text_Lex_Manual_hexDigit($0.a3.a2.a2.a2.a2.a1)*16n))+Text_Lex_Manual_hexDigit($0.a3.a2.a2.a2.a2.a2.a1))));
                   return {h: 1 /* {TcContinue4:1} */, a1: {a1: $0.a1, a2: $66}, a2: $0.a2, a3: $0.a3.a2.a2.a2.a2.a2.a2, a4: (((((($0.a4+1n)+1n)+1n)+1n)+1n)+1n)};
                  }
                  case 0: return {h: 0 /* {TcDone:4} */, a1: {h: 1 /* Fail */, a1: $0.a2, a2: {a1: '\u{5c}', a2: {a1: 'u', a2: {a1: $0.a3.a2.a2.a1, a2: {a1: $0.a3.a2.a2.a2.a1, a2: {a1: $0.a3.a2.a2.a2.a2.a1, a2: {a1: $0.a3.a2.a2.a2.a2.a2.a1, a2: $0.a3.a2.a2.a2.a2.a2.a2}}}}}}, a3: $0.a4, a4: 6n, a5: {h: 6 /* InvalidEscape */}}};
                 }
                }
                default: return {h: 0 /* {TcDone:4} */, a1: {h: 1 /* Fail */, a1: $0.a2, a2: {a1: '\u{5c}', a2: {a1: 'u', a2: $0.a3.a2.a2}}, a3: $0.a4, a4: 2n, a5: {h: 6 /* InvalidEscape */}}};
               }
              }
              default: return {h: 0 /* {TcDone:4} */, a1: {h: 1 /* Fail */, a1: $0.a2, a2: {a1: '\u{5c}', a2: {a1: 'u', a2: $0.a3.a2.a2}}, a3: $0.a4, a4: 2n, a5: {h: 6 /* InvalidEscape */}}};
             }
            }
            default: return {h: 0 /* {TcDone:4} */, a1: {h: 1 /* Fail */, a1: $0.a2, a2: {a1: '\u{5c}', a2: {a1: 'u', a2: $0.a3.a2.a2}}, a3: $0.a4, a4: 2n, a5: {h: 6 /* InvalidEscape */}}};
           }
          }
          default: return {h: 0 /* {TcDone:4} */, a1: {h: 1 /* Fail */, a1: $0.a2, a2: {a1: '\u{5c}', a2: {a1: 'u', a2: $0.a3.a2.a2}}, a3: $0.a4, a4: 2n, a5: {h: 6 /* InvalidEscape */}}};
         }
        }
        default: return {h: 0 /* {TcDone:4} */, a1: {h: 1 /* Fail */, a1: $0.a2, a2: {a1: '\u{5c}', a2: {a1: $0.a3.a2.a1, a2: $0.a3.a2.a2}}, a3: $0.a4, a4: 2n, a5: {h: 6 /* InvalidEscape */}}};
       }
      }
      default: {
       switch(Prelude_Types_isControl($0.a3.a1)) {
        case 1: return {h: 0 /* {TcDone:4} */, a1: {h: 1 /* Fail */, a1: $0.a2, a2: {a1: $0.a3.a1, a2: $0.a3.a2}, a3: $0.a4, a4: 1n, a5: {h: 5 /* InvalidControl */, a1: $0.a3.a1}}};
        case 0: return {h: 1 /* {TcContinue4:1} */, a1: {a1: $0.a1, a2: $0.a3.a1}, a2: $0.a2, a3: $0.a3.a2, a4: ($0.a4+1n)};
       }
      }
     }
    }
    case '\"': return {h: 0 /* {TcDone:4} */, a1: {h: 0 /* Succ */, a1: JSON_Parser_strLit($0.a1), a2: $0.a3.a2, a3: ($0.a4+1n)}};
    default: {
     switch(Prelude_Types_isControl($0.a3.a1)) {
      case 1: return {h: 0 /* {TcDone:4} */, a1: {h: 1 /* Fail */, a1: $0.a2, a2: {a1: $0.a3.a1, a2: $0.a3.a2}, a3: $0.a4, a4: 1n, a5: {h: 5 /* InvalidControl */, a1: $0.a3.a1}}};
      case 0: return {h: 1 /* {TcContinue4:1} */, a1: {a1: $0.a1, a2: $0.a3.a1}, a2: $0.a2, a3: $0.a3.a2, a4: ($0.a4+1n)};
     }
    }
   }
  }
  case 0: /* nil */ return {h: 0 /* {TcDone:4} */, a1: {h: 1 /* Fail */, a1: $0.a2, a2: {h: 0}, a3: $0.a4, a4: 0n, a5: {h: 1 /* EOI */}}};
 }
}

/* JSON.Parser.str : SnocList Char -> AutoTok e JSToken */
function JSON_Parser_str($0, $1, $2, $3) {
 return __tailRec(x24tcOpt_4, {h: 1 /* {TcContinue4:1} */, a1: $0, a2: $1, a3: $2, a4: $3});
}

/* {$tcOpt:5} */
function x24tcOpt_5($0) {
 switch($0.a2.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:5} */, a1: {a1: $0.a1, a2: '}'}};
  case undefined: /* cons */ {
   const $6 = JSON_Parser_showPair({a1: $0.a1, a2: ','}, $0.a2.a1);
   return {h: 1 /* {TcContinue5:1} */, a1: $6, a2: $0.a2.a2};
  }
 }
}

/* JSON.Parser.showObject : SnocList String -> List (String, JSON) -> SnocList String */
function JSON_Parser_showObject($0, $1) {
 return __tailRec(x24tcOpt_5, {h: 1 /* {TcContinue5:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:6} */
function x24tcOpt_6($0) {
 switch($0.a2.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:6} */, a1: {a1: $0.a1, a2: ']'}};
  case undefined: /* cons */ {
   const $6 = JSON_Parser_showValue({a1: $0.a1, a2: ','}, $0.a2.a1);
   return {h: 1 /* {TcContinue6:1} */, a1: $6, a2: $0.a2.a2};
  }
 }
}

/* JSON.Parser.showArray : SnocList String -> List JSON -> SnocList String */
function JSON_Parser_showArray($0, $1) {
 return __tailRec(x24tcOpt_6, {h: 1 /* {TcContinue6:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:7} */
function x24tcOpt_7($0) {
 switch($0.h) {
  case 1: /* {TcContinue7:1} */ {
   switch($0.a3.h) {
    case undefined: /* cons */ {
     switch($0.a3.a1.h) {
      case undefined: /* cons */ {
       switch($0.a3.a1.a1.h) {
        case 1: /* Lit */ {
         switch($0.a3.a1.a1.a1.h) {
          case 4: /* JString */ {
           switch($0.a3.a2.h) {
            case undefined: /* cons */ {
             switch($0.a3.a2.a1.h) {
              case undefined: /* cons */ {
               switch($0.a3.a2.a1.a1.h) {
                case 0: /* Symbol */ {
                 switch($0.a3.a2.a1.a1.a1) {
                  case ':': return {h: 2 /* {TcContinue7:2} */, a1: $0.a3.a2.a1.a2, a2: $0.a3.a1.a2, a3: $0.a3.a1.a1.a1.a1, a4: $0.a3.a2.a2, a5: $0.a2, a6: $0.a1, a7: JSON_Parser_value($0.a3.a2.a2)};
                  default: return {h: 0 /* {TcDone:7} */, a1: {h: 1 /* Fail0 */, a1: {a1: {h: 2 /* Expected */, a1: {h: 1 /* Right */, a1: {h: 0 /* Symbol */, a1: ':'}}}, a2: $0.a3.a2.a1.a2}}};
                 }
                }
                default: return {h: 0 /* {TcDone:7} */, a1: {h: 1 /* Fail0 */, a1: {a1: {h: 2 /* Expected */, a1: {h: 1 /* Right */, a1: {h: 0 /* Symbol */, a1: ':'}}}, a2: $0.a3.a2.a1.a2}}};
               }
              }
              default: return {h: 0 /* {TcDone:7} */, a1: {h: 1 /* Fail0 */, a1: {a1: {h: 2 /* Expected */, a1: {h: 1 /* Right */, a1: {h: 0 /* Symbol */, a1: ':'}}}, a2: $0.a3.a2.a1.a2}}};
             }
            }
            default: return {h: 0 /* {TcDone:7} */, a1: {h: 1 /* Fail0 */, a1: {a1: {h: 0 /* Custom */, a1: 0}, a2: $0.a3.a1.a2}}};
           }
          }
          default: return {h: 0 /* {TcDone:7} */, a1: {h: 1 /* Fail0 */, a1: {a1: {h: 0 /* Custom */, a1: 0}, a2: $0.a3.a1.a2}}};
         }
        }
        default: return {h: 0 /* {TcDone:7} */, a1: {h: 1 /* Fail0 */, a1: {a1: {h: 0 /* Custom */, a1: 0}, a2: $0.a3.a1.a2}}};
       }
      }
      default: return {h: 0 /* {TcDone:7} */, a1: {h: 1 /* Fail0 */, a1: {a1: {h: 0 /* Custom */, a1: 0}, a2: $0.a3.a1.a2}}};
     }
    }
    case 0: /* nil */ return {h: 0 /* {TcDone:7} */, a1: {h: 1 /* Fail0 */, a1: {a1: {h: 1 /* EOI */}, a2: {h: 0}}}};
   }
  }
  case 2: /* {TcContinue7:2} */ {
   switch($0.a7.h) {
    case 0: /* Succ0 */ {
     switch($0.a7.a2.h) {
      case undefined: /* cons */ {
       switch($0.a7.a2.a1.h) {
        case undefined: /* cons */ {
         switch($0.a7.a2.a1.a1.h) {
          case 0: /* Symbol */ {
           switch($0.a7.a2.a1.a1.a1) {
            case ',': return {h: 1 /* {TcContinue7:1} */, a1: $0.a6, a2: {a1: $0.a5, a2: {a1: $0.a3, a2: $0.a7.a1}}, a3: $0.a7.a2.a2};
            case '}': return {h: 0 /* {TcDone:7} */, a1: {h: 0 /* Succ0 */, a1: {h: 6 /* JObject */, a1: Prelude_Types_SnocList_x3cx3ex3e($0.a5, {a1: {a1: $0.a3, a2: $0.a7.a1}, a2: {h: 0}})}, a2: $0.a7.a2.a2}};
            default: return {h: 0 /* {TcDone:7} */, a1: Text_ParseError_failInParenEOI($0.a6, {h: 0 /* Symbol */, a1: '{'}, csegen_215(), $0.a7)};
           }
          }
          default: return {h: 0 /* {TcDone:7} */, a1: Text_ParseError_failInParenEOI($0.a6, {h: 0 /* Symbol */, a1: '{'}, csegen_215(), $0.a7)};
         }
        }
        default: return {h: 0 /* {TcDone:7} */, a1: Text_ParseError_failInParenEOI($0.a6, {h: 0 /* Symbol */, a1: '{'}, csegen_215(), $0.a7)};
       }
      }
      default: return {h: 0 /* {TcDone:7} */, a1: Text_ParseError_failInParenEOI($0.a6, {h: 0 /* Symbol */, a1: '{'}, csegen_215(), $0.a7)};
     }
    }
    default: return {h: 0 /* {TcDone:7} */, a1: Text_ParseError_failInParenEOI($0.a6, {h: 0 /* Symbol */, a1: '{'}, csegen_215(), $0.a7)};
   }
  }
 }
}

/* JSON.Parser.object : Bounds -> SnocList (String, JSON) -> Rule True JSON */
function JSON_Parser_object($0, $1, $2) {
 return __tailRec(x24tcOpt_7, {h: 1 /* {TcContinue7:1} */, a1: $0, a2: $1, a3: $2});
}

/* JSON.Parser.case block in object */
function JSON_Parser_case__object_6858($0, $1, $2, $3, $4, $5, $6) {
 return __tailRec(x24tcOpt_7, {h: 2 /* {TcContinue7:2} */, a1: $0, a2: $1, a3: $2, a4: $3, a5: $4, a6: $5, a7: $6});
}

/* {$tcOpt:8} */
function x24tcOpt_8($0) {
 switch($0.a3.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:8} */, a1: {h: 0}};
  case undefined: /* cons */ {
   switch($0.a1($0.a2)($0.a3.a1.a1)) {
    case 1: return {h: 0 /* {TcDone:8} */, a1: {a1: $0.a3.a1.a2}};
    case 0: return {h: 1 /* {TcContinue8:1} */, a1: $0.a1, a2: $0.a2, a3: $0.a3.a2};
   }
  }
 }
}

/* Data.List.lookupBy : (a -> b -> Bool) -> a -> List (b, v) -> Maybe v */
function Data_List_lookupBy($0, $1, $2) {
 return __tailRec(x24tcOpt_8, {h: 1 /* {TcContinue8:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:9} */
function x24tcOpt_9($0) {
 switch($0.a3.h) {
  case 0: /* Leaf */ {
   switch($0.a1.a1.a1($0.a2)($0.a3.a1)) {
    case 1: return {h: 0 /* {TcDone:9} */, a1: {a1: {a1: $0.a3.a1, a2: $0.a3.a2}}};
    case 0: return {h: 0 /* {TcDone:9} */, a1: {h: 0}};
   }
  }
  case 1: /* Branch2 */ {
   switch($0.a1.a5($0.a2)($0.a3.a2)) {
    case 1: return {h: 1 /* {TcContinue9:1} */, a1: $0.a1, a2: $0.a2, a3: $0.a3.a1};
    case 0: return {h: 1 /* {TcContinue9:1} */, a1: $0.a1, a2: $0.a2, a3: $0.a3.a3};
   }
  }
  case 2: /* Branch3 */ {
   switch($0.a1.a5($0.a2)($0.a3.a2)) {
    case 1: return {h: 1 /* {TcContinue9:1} */, a1: $0.a1, a2: $0.a2, a3: $0.a3.a1};
    case 0: {
     switch($0.a1.a5($0.a2)($0.a3.a4)) {
      case 1: return {h: 1 /* {TcContinue9:1} */, a1: $0.a1, a2: $0.a2, a3: $0.a3.a3};
      case 0: return {h: 1 /* {TcContinue9:1} */, a1: $0.a1, a2: $0.a2, a3: $0.a3.a5};
     }
    }
   }
  }
 }
}

/* Data.SortedMap.Dependent.treeLookup : Ord k => k -> Tree n k v o -> Maybe (y : k ** v y) */
function Data_SortedMap_Dependent_treeLookup($0, $1, $2) {
 return __tailRec(x24tcOpt_9, {h: 1 /* {TcContinue9:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:10} */
function x24tcOpt_10($0) {
 switch($0.a3.h) {
  case undefined: /* cons */ return {h: 1 /* {TcContinue10:1} */, a1: {a1: $0.a1, a2: $0.a2($0.a3.a1)}, a2: $0.a2, a3: $0.a3.a2};
  case 0: /* nil */ return {h: 0 /* {TcDone:10} */, a1: Prelude_Types_SnocList_x3cx3ex3e($0.a1, {h: 0})};
 }
}

/* Prelude.Types.List.mapAppend : SnocList b -> (a -> b) -> List a -> List b */
function Prelude_Types_List_mapAppend($0, $1, $2) {
 return __tailRec(x24tcOpt_10, {h: 1 /* {TcContinue10:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:11} */
function x24tcOpt_11($0) {
 switch($0.a2.h) {
  case undefined: /* cons */ {
   switch(Prelude_Types_isAlpha($0.a2.a1)) {
    case 1: return {h: 1 /* {TcContinue11:1} */, a1: $0.a1, a2: $0.a2.a2, a3: ($0.a3+1n)};
    case 0: return {h: 0 /* {TcDone:11} */, a1: {h: 1 /* Fail */, a1: $0.a1, a2: $0.a1, a3: 0n, a4: $0.a3, a5: {h: 10 /* Unknown */, a1: {h: 0 /* Left */, a1: Prelude_Types_fastPack(Data_List_Suffix_takePrefix($0.a1, $0.a3))}}}};
   }
  }
  case 0: /* nil */ return {h: 0 /* {TcDone:11} */, a1: {h: 1 /* Fail */, a1: $0.a1, a2: $0.a1, a3: 0n, a4: $0.a3, a5: {h: 10 /* Unknown */, a1: {h: 0 /* Left */, a1: Prelude_Types_fastPack(Data_List_Suffix_takePrefix($0.a1, $0.a3))}}}};
 }
}

/* JSON.Parser.invalidKey : StrictTok e JSToken */
function JSON_Parser_invalidKey($0, $1, $2) {
 return __tailRec(x24tcOpt_11, {h: 1 /* {TcContinue11:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:12} */
function x24tcOpt_12($0) {
 switch($0.a1) {
  case 0n: return {h: 0 /* {TcDone:12} */, a1: $0.a2.a1};
  default: {
   const $5 = ($0.a1-1n);
   return {h: 1 /* {TcContinue12:1} */, a1: $5, a2: $0.a2.a2};
  }
 }
}

/* Data.List.index : (n : Nat) -> (xs : List a) -> {auto 0 _ : InBounds n xs} -> a */
function Data_List_index($0, $1) {
 return __tailRec(x24tcOpt_12, {h: 1 /* {TcContinue12:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:13} */
function x24tcOpt_13($0) {
 switch($0.a3.h) {
  case undefined: /* cons */ {
   switch($0.a3.a1) {
    case '\n': return {h: 1 /* {TcContinue13:1} */, a1: $0.a1, a2: {a1: ($0.a2.a1+1n), a2: 0n}, a3: $0.a3.a2};
    default: {
     switch(Prelude_Types_isSpace($0.a3.a1)) {
      case 1: return {h: 1 /* {TcContinue13:1} */, a1: $0.a1, a2: {a1: $0.a2.a1, a2: ($0.a2.a2+1n)}, a3: $0.a3.a2};
      case 0: {
       const $17 = JSON_Parser_term({a1: $0.a3.a1, a2: $0.a3.a2});
       switch($17.h) {
        case 0: /* Succ */ {
         const $1c = {a1: $0.a2.a1, a2: ($0.a2.a2+$17.a3)};
         const $22 = Text_Bounds_bounded($17.a1, $0.a2, $1c);
         return {h: 1 /* {TcContinue13:1} */, a1: {a1: $0.a1, a2: $22}, a2: $1c, a3: $17.a2};
        }
        case 1: /* Fail */ return {h: 0 /* {TcDone:13} */, a1: {h: 0 /* Left */, a1: Text_Bounds_boundedErr({a1: $0.a3.a1, a2: $0.a3.a2}, $17.a2, $0.a2, $17.a3, $17.a4, $17.a5)}};
       }
      }
     }
    }
   }
  }
  case 0: /* nil */ return {h: 0 /* {TcDone:13} */, a1: {h: 1 /* Right */, a1: Prelude_Types_SnocList_x3cx3ex3e($0.a1, {a1: {a1: {h: 2 /* EOI */}, a2: {a1: $0.a2, a2: {a1: $0.a2.a1, a2: ($0.a2.a2+1n)}}}, a2: {h: 0}})}};
 }
}

/* JSON.Parser.go : SnocList (Bounded JSToken) -> Position -> (cs : List Char) ->
(0 _ : SuffixAcc cs) -> Either (Bounded ParseErr) (List (Bounded JSToken)) */
function JSON_Parser_go($0, $1, $2) {
 return __tailRec(x24tcOpt_13, {h: 1 /* {TcContinue13:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:14} */
function x24tcOpt_14($0) {
 switch($0.a1) {
  case 0n: {
   switch($0.a2.h) {
    case undefined: /* cons */ return {h: 0 /* {TcDone:14} */, a1: {a1: $0.a2.a1}};
    default: return {h: 0 /* {TcDone:14} */, a1: {h: 0}};
   }
  }
  default: {
   const $8 = ($0.a1-1n);
   switch($0.a2.h) {
    case undefined: /* cons */ return {h: 1 /* {TcContinue14:1} */, a1: $8, a2: $0.a2.a2};
    default: return {h: 0 /* {TcDone:14} */, a1: {h: 0}};
   }
  }
 }
}

/* Prelude.Types.getAt : Nat -> List a -> Maybe a */
function Prelude_Types_getAt($0, $1) {
 return __tailRec(x24tcOpt_14, {h: 1 /* {TcContinue14:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:15} */
function x24tcOpt_15($0) {
 switch($0.a2.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:15} */, a1: {h: 0}};
  case undefined: /* cons */ {
   switch($0.a1($0.a2.a2)) {
    case 1: return {h: 0 /* {TcDone:15} */, a1: {a1: $0.a2.a2}};
    case 0: return {h: 1 /* {TcContinue15:1} */, a1: $0.a1, a2: $0.a2.a1};
   }
  }
 }
}

/* Data.SnocList.find : (a -> Bool) -> SnocList a -> Maybe a */
function Data_SnocList_find($0, $1) {
 return __tailRec(x24tcOpt_15, {h: 1 /* {TcContinue15:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:16} */
function x24tcOpt_16($0) {
 switch($0.a2.h) {
  case 0: /* nil */ {
   switch($0.a3.h) {
    case 0: /* nil */ return {h: 0 /* {TcDone:16} */, a1: 1};
    default: return {h: 0 /* {TcDone:16} */, a1: 0};
   }
  }
  case undefined: /* cons */ {
   switch($0.a3.h) {
    case undefined: /* cons */ {
     switch($0.a1.a1($0.a2.a1)($0.a3.a1)) {
      case 1: return {h: 1 /* {TcContinue16:1} */, a1: $0.a1, a2: $0.a2.a2, a3: $0.a3.a2};
      case 0: return {h: 0 /* {TcDone:16} */, a1: 0};
     }
    }
    default: return {h: 0 /* {TcDone:16} */, a1: 0};
   }
  }
  default: return {h: 0 /* {TcDone:16} */, a1: 0};
 }
}

/* Prelude.Types.== */
function Prelude_Types_x3dx3d_Eq_x28Listx20x24ax29($0, $1, $2) {
 return __tailRec(x24tcOpt_16, {h: 1 /* {TcContinue16:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:17} */
function x24tcOpt_17($0) {
 switch($0.a1) {
  case 0n: return {h: 0 /* {TcDone:17} */, a1: $0.a2};
  default: {
   const $4 = ($0.a1-1n);
   switch($0.a2.h) {
    case 0: /* nil */ return {h: 0 /* {TcDone:17} */, a1: {h: 0}};
    case undefined: /* cons */ return {h: 1 /* {TcContinue17:1} */, a1: $4, a2: $0.a2.a2};
   }
  }
 }
}

/* Data.List.drop : Nat -> List a -> List a */
function Data_List_drop($0, $1) {
 return __tailRec(x24tcOpt_17, {h: 1 /* {TcContinue17:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:18} */
function x24tcOpt_18($0) {
 switch($0.a3.h) {
  case undefined: /* cons */ {
   switch(Prelude_Types_isDigit($0.a3.a1)) {
    case 1: return {h: 1 /* {TcContinue18:1} */, a1: $0.a1, a2: {a1: $0.a2, a2: $0.a3.a1}, a3: $0.a3.a2, a4: ($0.a4+1n)};
    case 0: return {h: 0 /* {TcDone:18} */, a1: Text_Lex_Shift_rest($0.a1, $0.a2, {a1: $0.a3.a1, a2: $0.a3.a2}, $0.a4)};
   }
  }
  case 0: /* nil */ return {h: 0 /* {TcDone:18} */, a1: {h: 0 /* Succ */, a1: $0.a2, a2: {h: 0}, a3: $0.a4}};
 }
}

/* Text.Lex.Shift.digs : AutoShift False */
function Text_Lex_Shift_digs($0, $1, $2, $3) {
 return __tailRec(x24tcOpt_18, {h: 1 /* {TcContinue18:1} */, a1: $0, a2: $1, a3: $2, a4: $3});
}

/* {$tcOpt:19} */
function x24tcOpt_19($0) {
 switch($0.a3.h) {
  case undefined: /* cons */ {
   switch(Prelude_Types_isDigit($0.a3.a1)) {
    case 1: return {h: 1 /* {TcContinue19:1} */, a1: $0.a1, a2: {a1: $0.a2, a2: $0.a3.a1}, a3: $0.a3.a2, a4: ($0.a4+1n)};
    case 0: return {h: 0 /* {TcDone:19} */, a1: Text_Lex_Shift_exp($0.a1, $0.a2, {a1: $0.a3.a1, a2: $0.a3.a2}, $0.a4)};
   }
  }
  case 0: /* nil */ return {h: 0 /* {TcDone:19} */, a1: {h: 0 /* Succ */, a1: $0.a2, a2: {h: 0}, a3: $0.a4}};
 }
}

/* Text.Lex.Shift.dot : AutoShift False */
function Text_Lex_Shift_dot($0, $1, $2, $3) {
 return __tailRec(x24tcOpt_19, {h: 1 /* {TcContinue19:1} */, a1: $0, a2: $1, a3: $2, a4: $3});
}

/* {$tcOpt:20} */
function x24tcOpt_20($0) {
 switch($0.a3.h) {
  case undefined: /* cons */ {
   switch(Prelude_Types_isDigit($0.a3.a1)) {
    case 1: return {h: 1 /* {TcContinue20:1} */, a1: $0.a1, a2: {a1: $0.a2, a2: $0.a3.a1}, a3: $0.a3.a2, a4: ($0.a4+1n)};
    case 0: return {h: 0 /* {TcDone:20} */, a1: {h: 0 /* Succ */, a1: $0.a2, a2: {a1: $0.a3.a1, a2: $0.a3.a2}, a3: $0.a4}};
   }
  }
  case 0: /* nil */ return {h: 0 /* {TcDone:20} */, a1: {h: 0 /* Succ */, a1: $0.a2, a2: {h: 0}, a3: $0.a4}};
 }
}

/* Text.Lex.Shift.digits : AutoShift False */
function Text_Lex_Shift_digits($0, $1, $2, $3) {
 return __tailRec(x24tcOpt_20, {h: 1 /* {TcContinue20:1} */, a1: $0, a2: $1, a3: $2, a4: $3});
}

/* {$tcOpt:21} */
function x24tcOpt_21($0) {
 switch($0.a3.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:21} */, a1: Prelude_Types_List_reverse($0.a2)};
  case undefined: /* cons */ return {h: 1 /* {TcContinue21:1} */, a1: $0.a1, a2: Prelude_Types_List_reverseOnto($0.a2, $0.a1($0.a3.a1)), a3: $0.a3.a2};
 }
}

/* Prelude.Types.listBindOnto : (a -> List b) -> List b -> List a -> List b */
function Prelude_Types_listBindOnto($0, $1, $2) {
 return __tailRec(x24tcOpt_21, {h: 1 /* {TcContinue21:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:22} */
function x24tcOpt_22($0) {
 switch($0.a2.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:22} */, a1: $0.a1};
  case undefined: /* cons */ return {h: 1 /* {TcContinue22:1} */, a1: {a1: $0.a2.a1, a2: $0.a1}, a2: $0.a2.a2};
 }
}

/* Prelude.Types.List.reverseOnto : List a -> List a -> List a */
function Prelude_Types_List_reverseOnto($0, $1) {
 return __tailRec(x24tcOpt_22, {h: 1 /* {TcContinue22:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:23} */
function x24tcOpt_23($0) {
 switch($0.a4) {
  case 0n: return {h: 0 /* {TcDone:23} */, a1: {a1: $0.a1, a2: $0.a2}};
  default: {
   switch($0.a3.h) {
    case undefined: /* cons */ {
     switch($0.a3.a1) {
      case '\n': {
       switch($0.a4) {
        case 0n: {
         switch($0.a4) {
          case 0n: _crashExp('Nat case not covered');
          default: {
           const $a = ($0.a4-1n);
           return {h: 1 /* {TcContinue23:1} */, a1: $0.a1, a2: ($0.a2+1n), a3: $0.a3.a2, a4: $a};
          }
         }
        }
        default: {
         const $13 = ($0.a4-1n);
         return {h: 1 /* {TcContinue23:1} */, a1: ($0.a1+1n), a2: 0n, a3: $0.a3.a2, a4: $13};
        }
       }
      }
      default: {
       switch($0.a4) {
        case 0n: _crashExp('Nat case not covered');
        default: {
         const $1d = ($0.a4-1n);
         return {h: 1 /* {TcContinue23:1} */, a1: $0.a1, a2: ($0.a2+1n), a3: $0.a3.a2, a4: $1d};
        }
       }
      }
     }
    }
    case 0: /* nil */ {
     switch($0.a4) {
      case 0n: _crashExp('Nat case not covered');
      default: {
       const $27 = ($0.a4-1n);
       return {h: 0 /* {TcDone:23} */, a1: Prelude_Uninhabited_absurd($2d => Data_List_Suffix_uninhabited_Uninhabited_x28x28x28Suffixx20x24bx29x20x28x28x3ax3ax20x24hx29x20x24tx29x29x20Nilx29($2d), $27)};
      }
     }
    }
   }
  }
 }
}

/* Text.Bounds.calcEnd : Nat -> Nat -> (cs : List Char) -> Suffix b ys cs -> Position */
function Text_Bounds_calcEnd($0, $1, $2, $3) {
 return __tailRec(x24tcOpt_23, {h: 1 /* {TcContinue23:1} */, a1: $0, a2: $1, a3: $2, a4: $3});
}

/* {$tcOpt:24} */
function x24tcOpt_24($0) {
 switch($0.h) {
  case 1: /* {TcContinue24:1} */ return {h: 2 /* {TcContinue24:2} */, a1: $0.a3, a2: $0.a2, a3: $0.a1, a4: JSON_Parser_value($0.a3)};
  case 2: /* {TcContinue24:2} */ {
   switch($0.a4.h) {
    case 0: /* Succ0 */ {
     switch($0.a4.a2.h) {
      case undefined: /* cons */ {
       switch($0.a4.a2.a1.h) {
        case undefined: /* cons */ {
         switch($0.a4.a2.a1.a1.h) {
          case 0: /* Symbol */ {
           switch($0.a4.a2.a1.a1.a1) {
            case ',': return {h: 1 /* {TcContinue24:1} */, a1: $0.a3, a2: {a1: $0.a2, a2: $0.a4.a1}, a3: $0.a4.a2.a2};
            case ']': return {h: 0 /* {TcDone:24} */, a1: {h: 0 /* Succ0 */, a1: {h: 5 /* JArray */, a1: Prelude_Types_SnocList_x3cx3ex3e($0.a2, {a1: $0.a4.a1, a2: {h: 0}})}, a2: $0.a4.a2.a2}};
            default: return {h: 0 /* {TcDone:24} */, a1: Text_ParseError_failInParenEOI($0.a3, {h: 0 /* Symbol */, a1: '['}, csegen_215(), $0.a4)};
           }
          }
          default: return {h: 0 /* {TcDone:24} */, a1: Text_ParseError_failInParenEOI($0.a3, {h: 0 /* Symbol */, a1: '['}, csegen_215(), $0.a4)};
         }
        }
        default: return {h: 0 /* {TcDone:24} */, a1: Text_ParseError_failInParenEOI($0.a3, {h: 0 /* Symbol */, a1: '['}, csegen_215(), $0.a4)};
       }
      }
      default: return {h: 0 /* {TcDone:24} */, a1: Text_ParseError_failInParenEOI($0.a3, {h: 0 /* Symbol */, a1: '['}, csegen_215(), $0.a4)};
     }
    }
    default: return {h: 0 /* {TcDone:24} */, a1: Text_ParseError_failInParenEOI($0.a3, {h: 0 /* Symbol */, a1: '['}, csegen_215(), $0.a4)};
   }
  }
 }
}

/* JSON.Parser.array : Bounds -> SnocList JSON -> Rule True JSON */
function JSON_Parser_array($0, $1, $2) {
 return __tailRec(x24tcOpt_24, {h: 1 /* {TcContinue24:1} */, a1: $0, a2: $1, a3: $2});
}

/* JSON.Parser.case block in array */
function JSON_Parser_case__array_6680($0, $1, $2, $3) {
 return __tailRec(x24tcOpt_24, {h: 2 /* {TcContinue24:2} */, a1: $0, a2: $1, a3: $2, a4: $3});
}

/* {$tcOpt:25} */
function x24tcOpt_25($0) {
 switch($0.a3.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:25} */, a1: $0.a2};
  case undefined: /* cons */ return {h: 1 /* {TcContinue25:1} */, a1: $0.a1, a2: $0.a1($0.a2)($0.a3.a1), a3: $0.a3.a2};
 }
}

/* Prelude.Types.foldl */
function Prelude_Types_foldl_Foldable_List($0, $1, $2) {
 return __tailRec(x24tcOpt_25, {h: 1 /* {TcContinue25:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:26} */
function x24tcOpt_26($0) {
 switch($0.a1.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:26} */, a1: $0.a2};
  case undefined: /* cons */ return {h: 1 /* {TcContinue26:1} */, a1: $0.a1.a1, a2: {a1: $0.a1.a2, a2: $0.a2}};
 }
}

/* Prelude.Types.SnocList.(<>>) : SnocList a -> List a -> List a */
function Prelude_Types_SnocList_x3cx3ex3e($0, $1) {
 return __tailRec(x24tcOpt_26, {h: 1 /* {TcContinue26:1} */, a1: $0, a2: $1});
}

/* {__mainExpression:0} */
function __mainExpression_0() {
 return PrimIO_unsafePerformIO($2 => Main_main($2));
}

/* {csegen:1} */
const csegen_1 = __lazy(function () {
 return {a1: x => Prelude_Show_show_Show_String(x), a2: d => x => Prelude_Show_showPrec_Show_String(d, x)};
});

/* {csegen:3} */
const csegen_3 = __lazy(function () {
 return $0 => $1 => $2 => Allen_JSON_toJsonNetworkJSON($1, $2);
});

/* {csegen:6} */
const csegen_6 = __lazy(function () {
 return Language_Reflection_Derive_mkShowPrec($2 => $3 => JSON_FromJSON_showPrecDecodingErr($2, $3));
});

/* {csegen:9} */
const csegen_9 = __lazy(function () {
 return {a1: $1 => $2 => Prelude_EqOrd_x3dx3d_Eq_String($1, $2), a2: $7 => $8 => Prelude_EqOrd_x2fx3d_Eq_String($7, $8)};
});

/* {csegen:17} */
const csegen_17 = __lazy(function () {
 return {a1: csegen_9(), a2: $3 => $4 => Prelude_EqOrd_compare_Ord_String($3, $4), a3: $9 => $a => Prelude_EqOrd_x3c_Ord_String($9, $a), a4: $f => $10 => Prelude_EqOrd_x3e_Ord_String($f, $10), a5: $15 => $16 => Prelude_EqOrd_x3cx3d_Ord_String($15, $16), a6: $1b => $1c => Prelude_EqOrd_x3ex3d_Ord_String($1b, $1c), a7: $21 => $22 => Prelude_EqOrd_max_Ord_String($21, $22), a8: $27 => $28 => Prelude_EqOrd_min_Ord_String($27, $28)};
});

/* {csegen:31} */
const csegen_31 = __lazy(function () {
 const $c = b => a => $d => $e => $f => {
  const $10 = $d($f);
  const $13 = $e($f);
  return $10($13);
 };
 const $1 = {a1: b => a => func => $3 => $4 => Prelude_IO_map_Functor_IO(func, $3, $4), a2: a => $a => $b => $a, a3: $c};
 const $18 = b => a => $19 => $1a => $1b => {
  const $1c = $19($1b);
  return $1a($1c)($1b);
 };
 const $23 = a => $24 => $25 => {
  const $26 = $24($25);
  return $26($25);
 };
 const $0 = {a1: $1, a2: $18, a3: $23};
 return {a1: $0, a2: a => $2c => $2c};
});

/* {csegen:58} */
const csegen_58 = __lazy(function () {
 return $0 => $1 => ({a1: $0, a2: $1});
});

/* {csegen:116} */
const csegen_116 = __lazy(function () {
 return {a1: acc => elem => func => init => input => Prelude_Types_foldr_Foldable_List(func, init, input), a2: elem => acc => func => init => input => Prelude_Types_foldl_Foldable_List(func, init, input), a3: elem => $b => Prelude_Types_null_Foldable_List($b), a4: elem => acc => m => $f => funcM => init => input => Prelude_Types_foldlM_Foldable_List($f, funcM, init, input), a5: elem => $16 => $16, a6: a => m => $18 => f => $19 => Prelude_Types_foldMap_Foldable_List($18, f, $19)};
});

/* {csegen:123} */
const csegen_123 = __lazy(function () {
 return {a1: $1 => $2 => _add32s($1, $2), a2: $6 => $7 => _mul32s($6, $7), a3: $b => Number(_truncBigInt32($b))};
});

/* {csegen:146} */
const csegen_146 = __lazy(function () {
 return $0 => $1 => ($0|$1);
});

/* {csegen:165} */
const csegen_165 = __lazy(function () {
 return b => a => func => $0 => func($0);
});

/* {csegen:168} */
const csegen_168 = __lazy(function () {
 return b => a => func => $0 => $1 => Control_Monad_State_State_map_Functor_x28x28StateTx20x24stateTypex29x20x24fx29(csegen_165(), func, $0, $1);
});

/* {csegen:171} */
const csegen_171 = __lazy(function () {
 return b => a => func => $0 => Control_Monad_Error_Either_map_Functor_x28x28EitherTx20x24ex29x20x24mx29(csegen_168(), func, $0);
});

/* {csegen:179} */
const csegen_179 = __lazy(function () {
 return {a1: {a1: csegen_165(), a2: a => $4 => $4, a3: b => a => $6 => $7 => $6($7)}, a2: b => a => $b => $c => $c($b), a3: a => $10 => $10};
});

/* {csegen:185} */
const csegen_185 = __lazy(function () {
 return {a1: csegen_168(), a2: a => $3 => $4 => Control_Monad_State_State_pure_Applicative_x28x28StateTx20x24stateTypex29x20x24fx29(csegen_179(), $3, $4), a3: b => a => $b => $c => $d => Control_Monad_State_State_x3cx2ax3e_Applicative_x28x28StateTx20x24stateTypex29x20x24fx29(csegen_179(), $b, $c, $d)};
});

/* {csegen:191} */
const csegen_191 = __lazy(function () {
 return {a1: csegen_171(), a2: a => $3 => Control_Monad_Error_Either_pure_Applicative_x28x28EitherTx20x24ex29x20x24mx29(csegen_185(), $3), a3: b => a => $9 => $a => Control_Monad_Error_Either_x3cx2ax3e_Applicative_x28x28EitherTx20x24ex29x20x24mx29(csegen_185(), $9, $a)};
});

/* {csegen:204} */
const csegen_204 = __lazy(function () {
 return {a1: {a1: b => a => func => $2 => Prelude_Types_List_mapAppend({h: 0}, func, $2), a2: a => $8 => Prelude_Types_pure_Applicative_List($8), a3: b => a => $c => $d => Prelude_Types_x3cx2ax3e_Applicative_List($c, $d)}, a2: a => ({h: 0}), a3: a => $13 => $14 => Prelude_Types_List_tailRecAppend($13, $14())};
});

/* {csegen:213} */
const csegen_213 = __lazy(function () {
 return Control_Monad_Error_Either_pure_Applicative_x28x28EitherTx20x24ex29x20x24mx29(csegen_185(), undefined);
});

/* {csegen:215} */
const csegen_215 = __lazy(function () {
 return $0 => JSON_Parser_eqJSToken({h: 2 /* EOI */}, $0);
});

/* {csegen:218} */
const csegen_218 = __lazy(function () {
 return {a1: x => Prelude_Show_show_Show_Char(x), a2: d => x => Prelude_Show_showPrec_Show_Char(d, x)};
});

/* {csegen:224} */
const csegen_224 = __lazy(function () {
 const $6 = a => b => {
  switch(JSON_Parser_eqJSON(a, b)) {
   case 1: return 0;
   case 0: return 1;
  }
 };
 return {a1: $1 => $2 => JSON_Parser_eqJSON($1, $2), a2: $6};
});

/* {csegen:235} */
const csegen_235 = __lazy(function () {
 const $0 = a => $1 => $2 => ({h: 1 /* Fail0 */, a1: {a1: $2, a2: $1}});
 return $6 => $7 => $0(undefined)($6)($7);
});

/* {csegen:243} */
const csegen_243 = __lazy(function () {
 return Language_Reflection_Derive_mkShowPrec($2 => $3 => Text_Bounds_showPrecPosition($2, $3));
});

/* {csegen:245} */
const csegen_245 = __lazy(function () {
 return {a1: $1 => $2 => ($1+$2), a2: ''};
});

/* {csegen:250} */
const csegen_250 = __lazy(function () {
 return Language_Reflection_Derive_mkShowPrec($2 => $3 => JSON_FromJSON_showPrecJSONPathElement($2, $3));
});

/* {csegen:254} */
const csegen_254 = __lazy(function () {
 return {a1: {a1: x => Prelude_Show_show_Show_x28Listx20x24ax29(csegen_250(), x), a2: d => x => Prelude_Show_showPrec_Show_x28Listx20x24ax29(csegen_250(), d, x)}, a2: csegen_1()};
});

/* {csegen:266} */
const csegen_266 = __lazy(function () {
 return {a1: Language_Reflection_Derive_mkShowPrec($3 => $4 => Text_FC_showPrecFileContext($3, $4)), a2: Language_Reflection_Derive_mkShowPrec($b => $c => Text_ParseError_showPrecParseError(Language_Reflection_Derive_mkShowPrec($11 => $12 => JSON_Parser_showPrecJSErr($11, $12)), Language_Reflection_Derive_mkShowPrec($19 => $1a => JSON_Parser_showPrecJSToken($19, $1a)), $b, $c))};
});

/* {csegen:439} */
const csegen_439 = __lazy(function () {
 return $0 => {
  let $3;
  switch($0.a2) {
   case 0: {
    $3 = 1;
    break;
   }
   case 1: {
    $3 = 2;
    break;
   }
   case 2: {
    $3 = 4;
    break;
   }
   case 3: {
    $3 = 8;
    break;
   }
   case 4: {
    $3 = 16;
    break;
   }
   case 5: {
    $3 = 32;
    break;
   }
   case 6: {
    $3 = 64;
    break;
   }
   case 7: {
    $3 = 128;
    break;
   }
   case 8: {
    $3 = 256;
    break;
   }
   case 9: {
    $3 = 512;
    break;
   }
   case 10: {
    $3 = 1024;
    break;
   }
   case 11: {
    $3 = 2048;
    break;
   }
   case 12: {
    $3 = 4096;
    break;
   }
  }
  return Prelude_Types_pure_Applicative_List($3);
 };
});

/* {csegen:440} */
const csegen_440 = __lazy(function () {
 const $0 = Allen_Relation_allRelations();
 switch($0.h) {
  case 0: /* nil */ return {h: 0};
  case undefined: /* cons */ {
   let $3;
   switch($0.a2.h) {
    case 0: /* nil */ {
     $3 = {h: 0};
     break;
    }
    case undefined: /* cons */ {
     let $6;
     switch($0.a2.a2.h) {
      case 0: /* nil */ {
       $6 = {h: 0};
       break;
      }
      case undefined: /* cons */ {
       let $9;
       switch($0.a2.a2.a2.h) {
        case 0: /* nil */ {
         $9 = {h: 0};
         break;
        }
        case undefined: /* cons */ {
         let $c;
         switch($0.a2.a2.a2.a2.h) {
          case 0: /* nil */ {
           $c = {h: 0};
           break;
          }
          case undefined: /* cons */ {
           let $f;
           switch($0.a2.a2.a2.a2.a2.h) {
            case 0: /* nil */ {
             $f = {h: 0};
             break;
            }
            case undefined: /* cons */ {
             let $12;
             switch($0.a2.a2.a2.a2.a2.a2.h) {
              case 0: /* nil */ {
               $12 = {h: 0};
               break;
              }
              case undefined: /* cons */ {
               let $15;
               switch($0.a2.a2.a2.a2.a2.a2.a2.h) {
                case 0: /* nil */ {
                 $15 = {h: 0};
                 break;
                }
                case undefined: /* cons */ {
                 let $18;
                 switch($0.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                  case 0: /* nil */ {
                   $18 = {h: 0};
                   break;
                  }
                  case undefined: /* cons */ {
                   let $1b;
                   switch($0.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                    case 0: /* nil */ {
                     $1b = {h: 0};
                     break;
                    }
                    case undefined: /* cons */ {
                     let $1e;
                     switch($0.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                      case 0: /* nil */ {
                       $1e = {h: 0};
                       break;
                      }
                      case undefined: /* cons */ {
                       let $21;
                       switch($0.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                        case 0: /* nil */ {
                         $21 = {h: 0};
                         break;
                        }
                        case undefined: /* cons */ {
                         let $24;
                         switch($0.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                          case 0: /* nil */ {
                           $24 = {h: 0};
                           break;
                          }
                          case undefined: /* cons */ {
                           let $27;
                           switch($0.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                            case 0: /* nil */ {
                             $27 = {h: 0};
                             break;
                            }
                            case undefined: /* cons */ {
                             $27 = {a1: $0.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: Allen_Relation_asList($0.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2)};
                             break;
                            }
                           }
                           $24 = {a1: $0.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $27};
                           break;
                          }
                         }
                         $21 = {a1: $0.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $24};
                         break;
                        }
                       }
                       $1e = {a1: $0.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $21};
                       break;
                      }
                     }
                     $1b = {a1: $0.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $1e};
                     break;
                    }
                   }
                   $18 = {a1: $0.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $1b};
                   break;
                  }
                 }
                 $15 = {a1: $0.a2.a2.a2.a2.a2.a2.a2.a1, a2: $18};
                 break;
                }
               }
               $12 = {a1: $0.a2.a2.a2.a2.a2.a2.a1, a2: $15};
               break;
              }
             }
             $f = {a1: $0.a2.a2.a2.a2.a2.a1, a2: $12};
             break;
            }
           }
           $c = {a1: $0.a2.a2.a2.a2.a1, a2: $f};
           break;
          }
         }
         $9 = {a1: $0.a2.a2.a2.a1, a2: $c};
         break;
        }
       }
       $6 = {a1: $0.a2.a2.a1, a2: $9};
       break;
      }
     }
     $3 = {a1: $0.a2.a1, a2: $6};
     break;
    }
   }
   return {a1: $0.a1, a2: $3};
  }
 }
});

/* {csegen:462} */
const csegen_462 = __lazy(function () {
 return {a1: csegen_185(), a2: b => a => $3 => $4 => $5 => Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_179(), $3, $4, $5), a3: a => $d => $e => Control_Monad_State_State_join_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_179(), $d, $e)};
});

/* {csegen:468} */
const csegen_468 = __lazy(function () {
 return {a1: csegen_191(), a2: b => a => $3 => $4 => Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29(csegen_462(), $3, $4), a3: a => $b => Control_Monad_Error_Either_join_Monad_x28x28EitherTx20x24ex29x20x24mx29(csegen_462(), $b)};
});

/* {csegen:473} */
const csegen_473 = __lazy(function () {
 return {a1: csegen_468(), a2: Control_Monad_Error_Either_lift_MonadTrans_x28EitherTx20x24ex29(csegen_462(), x => ({a1: x, a2: x})), a3: $a => Control_Monad_Error_Either_lift_MonadTrans_x28EitherTx20x24ex29(csegen_462(), y => ({a1: $a, a2: undefined})), a4: a => $12 => Control_Monad_Error_Either_lift_MonadTrans_x28EitherTx20x24ex29(csegen_462(), $17 => $12($17))};
});

/* {csegen:487} */
const csegen_487 = __lazy(function () {
 return {a1: b => a => func => $1 => $2 => Control_Monad_State_State_map_Functor_x28x28StateTx20x24stateTypex29x20x24fx29(csegen_171(), func, $1, $2), a2: a => $a => $b => Control_Monad_State_State_pure_Applicative_x28x28StateTx20x24stateTypex29x20x24fx29(csegen_468(), $a, $b), a3: b => a => $12 => $13 => $14 => Control_Monad_State_State_x3cx2ax3e_Applicative_x28x28StateTx20x24stateTypex29x20x24fx29(csegen_468(), $12, $13, $14)};
});

/* {csegen:488} */
const csegen_488 = __lazy(function () {
 return $0 => $1 => Prelude_Interfaces_traverse_(csegen_487(), csegen_116(), $0, $1);
});

/* {csegen:495} */
const csegen_495 = __lazy(function () {
 return x => Control_Monad_Error_Either_pure_Applicative_x28x28EitherTx20x24ex29x20x24mx29(csegen_185(), {a1: x, a2: x});
});

/* {csegen:499} */
const csegen_499 = __lazy(function () {
 return {a1: {a1: csegen_487(), a2: b => a => $4 => $5 => $6 => Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $4, $5, $6), a3: a => $e => $f => Control_Monad_State_State_join_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $e, $f)}, a2: csegen_495(), a3: $18 => y => Control_Monad_Error_Either_pure_Applicative_x28x28EitherTx20x24ex29x20x24mx29(csegen_185(), {a1: $18, a2: undefined}), a4: a => $20 => $21 => Control_Monad_Error_Either_pure_Applicative_x28x28EitherTx20x24ex29x20x24mx29(csegen_185(), $20($21))};
});

/* {csegen:508} */
const csegen_508 = __lazy(function () {
 return Control_Monad_State_Interface_gets(csegen_473(), $4 => Data_SortedMap_keys($4));
});

/* prim__sub_Integer : Integer -> Integer -> Integer */
function prim__sub_Integer($0, $1) {
 return ($0-$1);
}

/* Main.case block in case block in case block in handleFile */
function Main_case__casex20blockx20inx20casex20blockx20inx20handleFile_1066($0, $1, $2, $3, $4, $5, $6) {
 switch($6.a2.h) {
  case 0: /* Left */ return $0.a2(undefined)($e => Prelude_IO_prim__putStr((('ERR '+Allen_Types_show_Show_x28AllenErrorx20x24kx29(csegen_1(), $6.a2.a1))+'\n'), $e));
  case 1: /* Right */ {
   const $2d = $2e => {
    switch($2e.h) {
     case 0: /* Left */ return $0.a2(undefined)($35 => Prelude_IO_prim__putStr((('ERR '+System_File_Error_show_Show_FileError($2e.a1))+'\n'), $35));
     case 1: /* Right */ return $0.a2(undefined)($44 => Prelude_IO_prim__putStr('OK\n', $44));
    }
   };
   return $0.a1.a2(undefined)(undefined)(System_File_ReadWrite_writeFile($0, $1, JSON_ToJSON_encode(csegen_3(), Allen_JSON_graphToNetwork($6.a1))))($2d);
  }
 }
}

/* Main.case block in case block in handleFile */
function Main_case__casex20blockx20inx20handleFile_1015($0, $1, $2, $3, $4, $5) {
 switch($5.h) {
  case 0: /* Left */ {
   const $b = $c => {
    const $12 = csegen_6();
    const $11 = $12.a1($5.a1);
    const $f = ('ERR '+$11);
    const $e = ($f+'\n');
    return Prelude_IO_prim__putStr($e, $c);
   };
   return $0.a2(undefined)($b);
  }
  case 1: /* Right */ return Main_case__casex20blockx20inx20casex20blockx20inx20handleFile_1066($0, $1, $2, $3, $4, $5.a1, Allen_Types_runAllen(csegen_17(), Allen_JSON_loadNetwork($5.a1)));
 }
}

/* Main.case block in handleInput */
function Main_case__handleInput_849($0, $1, $2) {
 switch($2.h) {
  case 0: /* Left */ {
   const $8 = $9 => {
    const $f = csegen_6();
    const $e = $f.a1($2.a1);
    const $c = ('ERR '+$e);
    const $b = ($c+'\n');
    return Prelude_IO_prim__putStr($b, $9);
   };
   return $0.a2(undefined)($8);
  }
  case 1: /* Right */ {
   const $15 = Allen_Types_runAllen(csegen_17(), Allen_JSON_loadNetwork($2.a1));
   switch($15.a2.h) {
    case 0: /* Left */ return $0.a2(undefined)($22 => Prelude_IO_prim__putStr((('ERR '+Allen_Types_show_Show_x28AllenErrorx20x24kx29(csegen_1(), $15.a2.a1))+'\n'), $22));
    case 1: /* Right */ return $0.a2(undefined)($33 => Prelude_IO_prim__putStr((('OK '+JSON_ToJSON_encode(csegen_3(), Allen_JSON_graphToNetwork($15.a1)))+'\n'), $33));
   }
  }
 }
}

/* Main.main : IO () */
function Main_main($0) {
 const $1 = System_getArgs(csegen_31())($0);
 switch($1.h) {
  case undefined: /* cons */ {
   switch($1.a2.h) {
    case undefined: /* cons */ {
     switch($1.a2.a1) {
      case 'input': {
       switch($1.a2.a2.h) {
        case undefined: /* cons */ {
         switch($1.a2.a2.a2.h) {
          case 0: /* nil */ return Main_handleInput(csegen_31(), $1.a2.a2.a1)($0);
          default: {
           const $12 = Prelude_IO_prim__putStr('Usage: allen input <json> | allen file <input json> <output json>\n', $0);
           return Prelude_IO_prim__putStr((Prelude_Show_show_Show_x28Listx20x24ax29(csegen_1(), $1)+'\n'), $0);
          }
         }
        }
        default: {
         const $1f = Prelude_IO_prim__putStr('Usage: allen input <json> | allen file <input json> <output json>\n', $0);
         return Prelude_IO_prim__putStr((Prelude_Show_show_Show_x28Listx20x24ax29(csegen_1(), $1)+'\n'), $0);
        }
       }
      }
      case 'file': {
       switch($1.a2.a2.h) {
        case undefined: /* cons */ {
         switch($1.a2.a2.a2.h) {
          case undefined: /* cons */ {
           switch($1.a2.a2.a2.a2.h) {
            case 0: /* nil */ return Main_handleFile(csegen_31(), $1.a2.a2.a1, $1.a2.a2.a2.a1)($0);
            default: {
             const $36 = Prelude_IO_prim__putStr('Usage: allen input <json> | allen file <input json> <output json>\n', $0);
             return Prelude_IO_prim__putStr((Prelude_Show_show_Show_x28Listx20x24ax29(csegen_1(), $1)+'\n'), $0);
            }
           }
          }
          default: {
           const $43 = Prelude_IO_prim__putStr('Usage: allen input <json> | allen file <input json> <output json>\n', $0);
           return Prelude_IO_prim__putStr((Prelude_Show_show_Show_x28Listx20x24ax29(csegen_1(), $1)+'\n'), $0);
          }
         }
        }
        default: {
         const $50 = Prelude_IO_prim__putStr('Usage: allen input <json> | allen file <input json> <output json>\n', $0);
         return Prelude_IO_prim__putStr((Prelude_Show_show_Show_x28Listx20x24ax29(csegen_1(), $1)+'\n'), $0);
        }
       }
      }
      default: {
       const $5d = Prelude_IO_prim__putStr('Usage: allen input <json> | allen file <input json> <output json>\n', $0);
       return Prelude_IO_prim__putStr((Prelude_Show_show_Show_x28Listx20x24ax29(csegen_1(), $1)+'\n'), $0);
      }
     }
    }
    default: {
     const $6a = Prelude_IO_prim__putStr('Usage: allen input <json> | allen file <input json> <output json>\n', $0);
     return Prelude_IO_prim__putStr((Prelude_Show_show_Show_x28Listx20x24ax29(csegen_1(), $1)+'\n'), $0);
    }
   }
  }
  default: {
   const $77 = Prelude_IO_prim__putStr('Usage: allen input <json> | allen file <input json> <output json>\n', $0);
   return Prelude_IO_prim__putStr((Prelude_Show_show_Show_x28Listx20x24ax29(csegen_1(), $1)+'\n'), $0);
  }
 }
}

/* Main.handleInput : HasIO io => String -> io () */
function Main_handleInput($0, $1) {
 return Main_case__handleInput_849($0, $1, Allen_JSON_parseNetwork($1));
}

/* Main.handleFile : HasIO io => String -> String -> io () */
function Main_handleFile($0, $1, $2) {
 const $f = $10 => {
  switch($10.h) {
   case 0: /* Left */ return $0.a2(undefined)($17 => Prelude_IO_prim__putStr((('ERR '+System_File_Error_show_Show_FileError($10.a1))+'\n'), $17));
   case 1: /* Right */ {
    const $21 = {h: 1 /* Right */, a1: $10.a1};
    return Main_case__casex20blockx20inx20handleFile_1015($0, $2, $1, $10.a1, $21, Allen_JSON_parseNetwork($10.a1));
   }
  }
 };
 return $0.a1.a2(undefined)(undefined)(System_File_ReadWrite_readFile($0, $1))($f);
}

/* System.File.ReadWrite.writeFile : HasIO io => String -> String -> io (Either FileError ()) */
function System_File_ReadWrite_writeFile($0, $1, $2) {
 return System_File_Handle_withFile($0, $1, 1, $8 => $0.a1.a1.a2(undefined)($8), $11 => Prelude_Basics_flip($14 => $15 => System_File_ReadWrite_fPutStr($0, $14, $15), $2, $11));
}

/* System.File.ReadWrite.readLinesOnto : HasIO io => List String -> Nat -> Fuel -> File -> io (Either FileError (Bool,
List String)) */
function System_File_ReadWrite_readLinesOnto($0, $1, $2, $3, $4) {
 switch($3.h) {
  case 0: /* nothing */ return $0.a1.a1.a2(undefined)({h: 1 /* Right */, a1: {a1: 0, a2: Prelude_Types_List_reverse($1)}});
  case undefined: /* just */ {
   const $1e = $1f => {
    switch($1f) {
     case 0: {
      switch($2) {
       case 0n: {
        const $27 = b => a => func => $28 => {
         switch($28.h) {
          case 0: /* Left */ return {h: 0 /* Left */, a1: $28.a1};
          case 1: /* Right */ return {h: 1 /* Right */, a1: func($28.a1)};
         }
        };
        const $31 = b => a => $32 => $33 => {
         switch($32.h) {
          case 0: /* Left */ return {h: 0 /* Left */, a1: $32.a1};
          case 1: /* Right */ {
           switch($33.h) {
            case 1: /* Right */ return {h: 1 /* Right */, a1: $32.a1($33.a1)};
            case 0: /* Left */ return {h: 0 /* Left */, a1: $33.a1};
           }
          }
         }
        };
        const $26 = {a1: $27, a2: a => $2f => ({h: 1 /* Right */, a1: $2f}), a3: $31};
        const $25 = {a1: $26, a2: b => a => $3c => $3d => Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29($3c, $3d), a3: a => $42 => Prelude_Types_join_Monad_x28Eitherx20x24ex29($42)};
        const $46 = b => a => func => $47 => {
         switch($47.h) {
          case 0: /* Left */ return {h: 0 /* Left */, a1: $47.a1};
          case 1: /* Right */ return {h: 1 /* Right */, a1: func($47.a1)};
         }
        };
        const $45 = {a1: $46, a2: {a1: acc => elem => func => init => input => Prelude_Types_foldr_Foldable_x28Eitherx20x24ex29(func, init, input), a2: elem => acc => func => init => input => Prelude_Types_foldl_Foldable_x28Eitherx20x24ex29(func, init, input), a3: elem => $59 => Prelude_Types_null_Foldable_x28Eitherx20x24ex29($59), a4: elem => acc => m => $5d => funcM => init => input => Prelude_Types_foldlM_Foldable_x28Eitherx20x24ex29($5d, funcM, init, input), a5: elem => $64 => Prelude_Types_toList_Foldable_x28Eitherx20x24ex29($64), a6: a => m => $68 => f => $69 => Prelude_Types_foldMap_Foldable_x28Eitherx20x24ex29($68, f, $69)}, a3: b => a => f => $6f => $70 => $71 => Prelude_Types_traverse_Traversable_x28Eitherx20x24ex29($6f, $70, $71)};
        return Prelude_Interfaces_Monad_x3ex3ex3d_Monad_Composex28x28x2ex20x24mx29x20x24tx29($0.a1, $25, $45, System_File_ReadWrite_fGetLine($0, $4), str => System_File_ReadWrite_readLinesOnto($0, {a1: str, a2: $1}, 0n, $3.a1(), $4));
       }
       default: {
        const $84 = ($2-1n);
        const $89 = b => a => func => $8a => {
         const $90 = $91 => $92 => $93 => $94 => {
          switch($94.h) {
           case 0: /* Left */ return {h: 0 /* Left */, a1: $94.a1};
           case 1: /* Right */ return {h: 1 /* Right */, a1: $93($94.a1)};
          }
         };
         return Prelude_Interfaces_Functor_map_Functor_Composex28x28x2ex20x24fx29x20x24gx29($0.a1.a1.a1, $90, func, $8a);
        };
        const $9c = a => $9d => {
         const $a3 = b => $a4 => func => $a5 => {
          switch($a5.h) {
           case 0: /* Left */ return {h: 0 /* Left */, a1: $a5.a1};
           case 1: /* Right */ return {h: 1 /* Right */, a1: func($a5.a1)};
          }
         };
         const $af = b => $b0 => $b1 => $b2 => {
          switch($b1.h) {
           case 0: /* Left */ return {h: 0 /* Left */, a1: $b1.a1};
           case 1: /* Right */ {
            switch($b2.h) {
             case 1: /* Right */ return {h: 1 /* Right */, a1: $b1.a1($b2.a1)};
             case 0: /* Left */ return {h: 0 /* Left */, a1: $b2.a1};
            }
           }
          }
         };
         const $a2 = {a1: $a3, a2: $ac => $ad => ({h: 1 /* Right */, a1: $ad}), a3: $af};
         return Prelude_Interfaces_Applicative_pure_Applicative_Composex28x28x2ex20x24fx29x20x24gx29($0.a1.a1, $a2, $9d);
        };
        const $bb = b => a => $bc => $bd => {
         const $c3 = $c4 => $c5 => func => $c6 => {
          switch($c6.h) {
           case 0: /* Left */ return {h: 0 /* Left */, a1: $c6.a1};
           case 1: /* Right */ return {h: 1 /* Right */, a1: func($c6.a1)};
          }
         };
         const $d0 = $d1 => $d2 => $d3 => $d4 => {
          switch($d3.h) {
           case 0: /* Left */ return {h: 0 /* Left */, a1: $d3.a1};
           case 1: /* Right */ {
            switch($d4.h) {
             case 1: /* Right */ return {h: 1 /* Right */, a1: $d3.a1($d4.a1)};
             case 0: /* Left */ return {h: 0 /* Left */, a1: $d4.a1};
            }
           }
          }
         };
         const $c2 = {a1: $c3, a2: $cd => $ce => ({h: 1 /* Right */, a1: $ce}), a3: $d0};
         return Prelude_Interfaces_Applicative_x3cx2ax3e_Applicative_Composex28x28x2ex20x24fx29x20x24gx29($0.a1.a1, $c2, $bc, $bd);
        };
        const $88 = {a1: $89, a2: $9c, a3: $bb};
        return Prelude_Interfaces_x2ax3e($88, System_File_ReadWrite_fSeekLine($0, $4), System_File_ReadWrite_readLinesOnto($0, $1, $84, {a1: $3.a1}, $4));
       }
      }
     }
     case 1: return $0.a1.a1.a2(undefined)({h: 1 /* Right */, a1: {a1: 1, a2: Prelude_Types_List_reverse($1)}});
    }
   };
   return $0.a1.a2(undefined)(undefined)(System_File_ReadWrite_fEOF($0, $4))($1e);
  }
 }
}

/* System.File.ReadWrite.readFilePage : HasIO io => Nat -> Fuel -> String -> io (Either FileError (Bool, List String)) */
function System_File_ReadWrite_readFilePage($0, $1, $2, $3) {
 return System_File_Handle_withFile($0, $3, 0, $9 => $0.a1.a1.a2(undefined)($9), $12 => System_File_ReadWrite_readLinesOnto($0, {h: 0}, $1, $2, $12));
}

/* System.File.ReadWrite.readFile : HasIO io => String -> io (Either FileError String) */
function System_File_ReadWrite_readFile($0, $1) {
 const $b = $c => {
  switch($c.h) {
   case 0: /* Left */ return {h: 0 /* Left */, a1: $c.a1};
   case 1: /* Right */ return {h: 1 /* Right */, a1: Prelude_Types_fastConcat(Builtin_snd($c.a1))};
  }
 };
 const $5 = $0.a1.a1.a1(undefined)(undefined)($b);
 return $5(System_File_ReadWrite_readFilePage($0, 0n, Data_Fuel_forever(), $1));
}

/* System.File.ReadWrite.getStringAndFree : HasIO io => File -> Ptr String -> io (Either FileError String) */
function System_File_ReadWrite_getStringAndFree($0, $1, $2) {
 switch(Prelude_EqOrd_x2fx3d_Eq_Int(PrimIO_prim__nullAnyPtr($2), Number(_truncBigInt32(0n)))) {
  case 1: {
   const $16 = $17 => {
    switch($17) {
     case 1: return System_File_Error_returnError($0);
     case 0: {
      const $20 = b => a => func => $21 => {
       switch($21.h) {
        case 0: /* Left */ return {h: 0 /* Left */, a1: $21.a1};
        case 1: /* Right */ return {h: 1 /* Right */, a1: func($21.a1)};
       }
      };
      const $2a = b => a => $2b => $2c => {
       switch($2b.h) {
        case 0: /* Left */ return {h: 0 /* Left */, a1: $2b.a1};
        case 1: /* Right */ {
         switch($2c.h) {
          case 1: /* Right */ return {h: 1 /* Right */, a1: $2b.a1($2c.a1)};
          case 0: /* Left */ return {h: 0 /* Left */, a1: $2c.a1};
         }
        }
       }
      };
      const $1f = {a1: $20, a2: a => $28 => ({h: 1 /* Right */, a1: $28}), a3: $2a};
      return Prelude_Interfaces_Applicative_pure_Applicative_Composex28x28x2ex20x24fx29x20x24gx29($0.a1.a1, $1f, '');
     }
    }
   };
   return $0.a1.a2(undefined)(undefined)(System_File_Error_fileError($0, $1))($16);
  }
  case 0: {
   const $35 = Prelude_IO_prim__getString($2);
   return $0.a1.a2(undefined)(undefined)(System_FFI_free($0, $2))($45 => System_File_Support_ok($0, $35));
  }
 }
}

/* System.File.ReadWrite.fSeekLine : HasIO io => File -> io (Either FileError ()) */
function System_File_ReadWrite_fSeekLine($0, $1) {
 const $14 = res => {
  switch(Prelude_EqOrd_x2fx3d_Eq_Int(res, Number(_truncBigInt32(0n)))) {
   case 1: return System_File_Error_returnError($0);
   case 0: return System_File_Support_ok($0, undefined);
  }
 };
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($10 => System_File_ReadWrite_prim__seekLine($1, $10)))($14);
}

/* System.File.ReadWrite.fPutStr : HasIO io => File -> String -> io (Either FileError ()) */
function System_File_ReadWrite_fPutStr($0, $1, $2) {
 const $16 = res => {
  switch(Prelude_EqOrd_x3dx3d_Eq_Int(res, Number(_truncBigInt32(0n)))) {
   case 1: return System_File_Error_returnError($0);
   case 0: return System_File_Support_ok($0, undefined);
  }
 };
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($11 => System_File_ReadWrite_prim__writeLine($1, $2, $11)))($16);
}

/* System.File.ReadWrite.fGetLine : HasIO io => File -> io (Either FileError String) */
function System_File_ReadWrite_fGetLine($0, $1) {
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($10 => System_File_ReadWrite_prim__readLine($1, $10)))(res => System_File_ReadWrite_getStringAndFree($0, $1, res));
}

/* System.File.ReadWrite.fEOF : HasIO io => File -> io Bool */
function System_File_ReadWrite_fEOF($0, $1) {
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($10 => System_File_ReadWrite_prim__eof($1, $10)))(res => $0.a1.a1.a2(undefined)(Prelude_EqOrd_x2fx3d_Eq_Int(res, Number(_truncBigInt32(0n)))));
}

/* System.FFI.free : HasIO io => AnyPtr -> io () */
function System_FFI_free($0, $1) {
 return $0.a2(undefined)($7 => System_FFI_prim__free($1, $7));
}

/* Prelude.Uninhabited.void : (0 _ : Void) -> a */
function Prelude_Uninhabited_void$($0) {
 return _crashExp('Error: Executed \'void\'');
}

/* Prelude.Uninhabited.absurd : Uninhabited t => t -> a */
function Prelude_Uninhabited_absurd($0, $1) {
 return Prelude_Uninhabited_void$(undefined);
}

/* Prelude.Basics.uncurry : (a -> b -> c) -> (a, b) -> c */
function Prelude_Basics_uncurry($0, $1) {
 return $0($1.a1)($1.a2);
}

/* Prelude.Basics.flip : (a -> b -> c) -> b -> a -> c */
function Prelude_Basics_flip($0, $1, $2) {
 return $0($2)($1);
}

/* Builtin.snd : (a, b) -> b */
function Builtin_snd($0) {
 return $0.a2;
}

/* Builtin.idris_crash : String -> a */
function Builtin_idris_crash($0) {
 return _crashExp($0);
}

/* Builtin.fst : (a, b) -> a */
function Builtin_fst($0) {
 return $0.a1;
}

/* Prelude.Types.traverse */
function Prelude_Types_traverse_Traversable_List($0, $1, $2) {
 switch($2.h) {
  case 0: /* nil */ return $0.a2(undefined)({h: 0});
  case undefined: /* cons */ return $0.a3(undefined)(undefined)($0.a3(undefined)(undefined)($0.a2(undefined)(csegen_58()))($1($2.a1)))(Prelude_Types_traverse_Traversable_List($0, $1, $2.a2));
 }
}

/* Prelude.Types.traverse */
function Prelude_Types_traverse_Traversable_x28Eitherx20x24ex29($0, $1, $2) {
 switch($2.h) {
  case 0: /* Left */ return $0.a2(undefined)({h: 0 /* Left */, a1: $2.a1});
  case 1: /* Right */ return $0.a1(undefined)(undefined)($12 => ({h: 1 /* Right */, a1: $12}))($1($2.a1));
 }
}

/* Prelude.Types.toList */
function Prelude_Types_toList_Foldable_x28Eitherx20x24ex29($0) {
 return Prelude_Types_foldr_Foldable_x28Eitherx20x24ex29(csegen_58(), {h: 0}, $0);
}

/* Prelude.Types.rangeFromTo */
function Prelude_Types_rangeFromTo_Range_x24a($0, $1, $2) {
 const $4 = Builtin_fst(Builtin_snd($0));
 const $3 = $4.a2($1)($2);
 switch($3) {
  case 0: {
   const $e = $f => {
    const $10 = Builtin_fst(Builtin_snd($0));
    return $10.a6($f)($2);
   };
   const $1c = $1d => {
    const $1e = Builtin_snd(Builtin_snd($0));
    const $28 = Builtin_snd(Builtin_snd($0));
    const $27 = $28.a1.a3(1n);
    return $1e.a1.a1($1d)($27);
   };
   const $19 = Prelude_Types_countFrom($1, $1c);
   return Prelude_Types_takeUntil($e, $19);
  }
  case 1: return Prelude_Types_pure_Applicative_List($1);
  case 2: {
   const $33 = $34 => {
    const $35 = Builtin_fst(Builtin_snd($0));
    return $35.a5($34)($2);
   };
   const $41 = x => {
    const $42 = Builtin_snd(Builtin_snd($0));
    const $4b = Builtin_snd(Builtin_snd($0));
    const $4a = $4b.a1.a3(1n);
    return $42.a3(x)($4a);
   };
   const $3e = Prelude_Types_countFrom($1, $41);
   return Prelude_Types_takeUntil($33, $3e);
  }
 }
}

/* Prelude.Types.pure */
function Prelude_Types_pure_Applicative_List($0) {
 return {a1: $0, a2: {h: 0}};
}

/* Prelude.Types.null */
function Prelude_Types_null_Foldable_List($0) {
 switch($0.h) {
  case 0: /* nil */ return 1;
  case undefined: /* cons */ return 0;
 }
}

/* Prelude.Types.null */
function Prelude_Types_null_Foldable_x28Eitherx20x24ex29($0) {
 switch($0.h) {
  case 0: /* Left */ return 1;
  case 1: /* Right */ return 0;
 }
}

/* Prelude.Types.map */
function Prelude_Types_map_Functor_Maybe($0, $1) {
 switch($1.h) {
  case undefined: /* just */ return {a1: $0($1.a1)};
  case 0: /* nothing */ return {h: 0};
 }
}

/* Prelude.Types.join */
function Prelude_Types_join_Monad_x28Eitherx20x24ex29($0) {
 return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29($0, $4 => $4);
}

/* Prelude.Types.foldr */
function Prelude_Types_foldr_Foldable_List($0, $1, $2) {
 switch($2.h) {
  case 0: /* nil */ return $1;
  case undefined: /* cons */ return $0($2.a1)(Prelude_Types_foldr_Foldable_List($0, $1, $2.a2));
 }
}

/* Prelude.Types.foldr */
function Prelude_Types_foldr_Foldable_x28Eitherx20x24ex29($0, $1, $2) {
 switch($2.h) {
  case 0: /* Left */ return $1;
  case 1: /* Right */ return $0($2.a1)($1);
 }
}

/* Prelude.Types.foldl */
function Prelude_Types_foldl_Foldable_x28Eitherx20x24ex29($0, $1, $2) {
 return Prelude_Types_foldr_Foldable_x28Eitherx20x24ex29($6 => $7 => Prelude_Basics_flip($a => $b => $c => $a($b($c)), $12 => Prelude_Basics_flip($0, $6, $12), $7), $19 => $19, $2)($1);
}

/* Prelude.Types.foldlM */
function Prelude_Types_foldlM_Foldable_List($0, $1, $2, $3) {
 return Prelude_Types_foldl_Foldable_List(ma => b => $0.a2(undefined)(undefined)(ma)($f => Prelude_Basics_flip($1, b, $f)), $0.a1.a2(undefined)($2), $3);
}

/* Prelude.Types.foldlM */
function Prelude_Types_foldlM_Foldable_x28Eitherx20x24ex29($0, $1, $2, $3) {
 return Prelude_Types_foldl_Foldable_x28Eitherx20x24ex29(ma => b => $0.a2(undefined)(undefined)(ma)($f => Prelude_Basics_flip($1, b, $f)), $0.a1.a2(undefined)($2), $3);
}

/* Prelude.Types.foldMap */
function Prelude_Types_foldMap_Foldable_List($0, $1, $2) {
 return Prelude_Types_foldl_Foldable_List(acc => elem => $0.a1(acc)($1(elem)), $0.a2, $2);
}

/* Prelude.Types.foldMap */
function Prelude_Types_foldMap_Foldable_x28Eitherx20x24ex29($0, $1, $2) {
 return Prelude_Types_foldr_Foldable_x28Eitherx20x24ex29($5 => $6 => $0.a1($1($5))($6), $0.a2, $2);
}

/* Prelude.Types.>>= */
function Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29($0, $1) {
 switch($0.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $0.a1};
  case 1: /* Right */ return $1($0.a1);
 }
}

/* Prelude.Types.<*> */
function Prelude_Types_x3cx2ax3e_Applicative_List($0, $1) {
 return Prelude_Types_listBind($0, f => Prelude_Types_List_mapAppend({h: 0}, f, $1));
}

/* Prelude.Types.toLower : Char -> Char */
function Prelude_Types_toLower($0) {
 switch(Prelude_Types_isUpper($0)) {
  case 1: return _truncToChar(_add32s(_truncInt32($0.codePointAt(0)), 32));
  case 0: return $0;
 }
}

/* Prelude.Types.takeUntil : (n -> Bool) -> Stream n -> List n */
function Prelude_Types_takeUntil($0, $1) {
 switch($0($1.a1)) {
  case 1: return {a1: $1.a1, a2: {h: 0}};
  case 0: return {a1: $1.a1, a2: Prelude_Types_takeUntil($0, $1.a2())};
 }
}

/* Prelude.Types.List.tailRecAppend : List a -> List a -> List a */
function Prelude_Types_List_tailRecAppend($0, $1) {
 return Prelude_Types_List_reverseOnto($1, Prelude_Types_List_reverse($0));
}

/* Prelude.Types.List.reverse : List a -> List a */
function Prelude_Types_List_reverse($0) {
 return Prelude_Types_List_reverseOnto({h: 0}, $0);
}

/* Prelude.Types.prim__integerToNat : Integer -> Nat */
function Prelude_Types_prim__integerToNat($0) {
 switch(((0n<=$0)?1:0)) {
  case 0: return 0n;
  default: return $0;
 }
}

/* Prelude.Types.listBind : List a -> (a -> List b) -> List b */
function Prelude_Types_listBind($0, $1) {
 return Prelude_Types_listBindOnto($1, {h: 0}, $0);
}

/* Prelude.Types.isUpper : Char -> Bool */
function Prelude_Types_isUpper($0) {
 switch(Prelude_EqOrd_x3ex3d_Ord_Char($0, 'A')) {
  case 1: return Prelude_EqOrd_x3cx3d_Ord_Char($0, 'Z');
  case 0: return 0;
 }
}

/* Prelude.Types.isSpace : Char -> Bool */
function Prelude_Types_isSpace($0) {
 switch($0) {
  case ' ': return 1;
  case '\u{9}': return 1;
  case '\r': return 1;
  case '\n': return 1;
  case '\u{c}': return 1;
  case '\u{b}': return 1;
  case '\u{a0}': return 1;
  default: return 0;
 }
}

/* Prelude.Types.isLower : Char -> Bool */
function Prelude_Types_isLower($0) {
 switch(Prelude_EqOrd_x3ex3d_Ord_Char($0, 'a')) {
  case 1: return Prelude_EqOrd_x3cx3d_Ord_Char($0, 'z');
  case 0: return 0;
 }
}

/* Prelude.Types.isHexDigit : Char -> Bool */
function Prelude_Types_isHexDigit($0) {
 switch(Prelude_Types_isDigit($0)) {
  case 1: return 1;
  case 0: {
   let $4;
   switch(Prelude_EqOrd_x3cx3d_Ord_Char('a', $0)) {
    case 1: {
     $4 = Prelude_EqOrd_x3cx3d_Ord_Char($0, 'f');
     break;
    }
    case 0: {
     $4 = 0;
     break;
    }
   }
   switch($4) {
    case 1: return 1;
    case 0: {
     switch(Prelude_EqOrd_x3cx3d_Ord_Char('A', $0)) {
      case 1: return Prelude_EqOrd_x3cx3d_Ord_Char($0, 'F');
      case 0: return 0;
     }
    }
   }
  }
 }
}

/* Prelude.Types.isDigit : Char -> Bool */
function Prelude_Types_isDigit($0) {
 switch(Prelude_EqOrd_x3ex3d_Ord_Char($0, '0')) {
  case 1: return Prelude_EqOrd_x3cx3d_Ord_Char($0, '9');
  case 0: return 0;
 }
}

/* Prelude.Types.isControl : Char -> Bool */
function Prelude_Types_isControl($0) {
 let $1;
 switch(Prelude_EqOrd_x3ex3d_Ord_Char($0, '\0')) {
  case 1: {
   $1 = Prelude_EqOrd_x3cx3d_Ord_Char($0, '\u{1f}');
   break;
  }
  case 0: {
   $1 = 0;
   break;
  }
 }
 switch($1) {
  case 1: return 1;
  case 0: {
   switch(Prelude_EqOrd_x3ex3d_Ord_Char($0, '\u{7f}')) {
    case 1: return Prelude_EqOrd_x3cx3d_Ord_Char($0, '\u{9f}');
    case 0: return 0;
   }
  }
 }
}

/* Prelude.Types.isAlpha : Char -> Bool */
function Prelude_Types_isAlpha($0) {
 switch(Prelude_Types_isUpper($0)) {
  case 1: return 1;
  case 0: return Prelude_Types_isLower($0);
 }
}

/* Prelude.Types.elemBy : Foldable t => (a -> a -> Bool) -> a -> t a -> Bool */
function Prelude_Types_elemBy($0, $1, $2, $3) {
 return $0.a6(undefined)(undefined)({a1: $e => $f => Prelude_Interfaces_Bool_Semigroup_x3cx2bx3e_Semigroup_AnyBool($e, $f), a2: 0})($1($2))($3);
}

/* Prelude.Types.elem : Foldable t => Eq a => a -> t a -> Bool */
function Prelude_Types_elem($0, $1, $2, $3) {
 return Prelude_Types_elemBy($0, $7 => $8 => $1.a1($7)($8), $2, $3);
}

/* Prelude.Types.either : Lazy (a -> c) -> Lazy (b -> c) -> Either a b -> c */
function Prelude_Types_either($0, $1, $2) {
 switch($2.h) {
  case 0: /* Left */ return $0()($2.a1);
  case 1: /* Right */ return $1()($2.a1);
 }
}

/* Prelude.Types.countFrom : n -> (n -> n) -> Stream n */
function Prelude_Types_countFrom($0, $1) {
 return {a1: $0, a2: () => Prelude_Types_countFrom($1($0), $1)};
}

/* Prelude.Num.mod */
function Prelude_Num_mod_Integral_Integer($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Integer($1, 0n)) {
  case 0: return _modBigInt($0, $1);
  default: return _crashExp('Unhandled input for Prelude.Num.case block in mod at Prelude.Num:94:3--96:44');
 }
}

/* Prelude.Num.mod */
function Prelude_Num_mod_Integral_Int($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Int($1, Number(_truncBigInt32(0n)))) {
  case 0: return _mod($0, $1);
  default: return _crashExp('Unhandled input for Prelude.Num.case block in mod at Prelude.Num:131:3--133:40');
 }
}

/* Prelude.Num.div */
function Prelude_Num_div_Integral_Integer($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Integer($1, 0n)) {
  case 0: return _divBigInt($0, $1);
  default: return _crashExp('Unhandled input for Prelude.Num.case block in div at Prelude.Num:91:3--93:44');
 }
}

/* Prelude.Num.div */
function Prelude_Num_div_Integral_Int($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Int($1, Number(_truncBigInt32(0n)))) {
  case 0: return _div32s($0, $1);
  default: return _crashExp('Unhandled input for Prelude.Num.case block in div at Prelude.Num:128:3--130:40');
 }
}

/* Prelude.EqOrd.min */
function Prelude_EqOrd_min_Ord_String($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_String($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

/* Prelude.EqOrd.min */
function Prelude_EqOrd_min_Ord_Int($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_Int($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

/* Prelude.EqOrd.max */
function Prelude_EqOrd_max_Ord_String($0, $1) {
 switch(Prelude_EqOrd_x3e_Ord_String($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

/* Prelude.EqOrd.max */
function Prelude_EqOrd_max_Ord_Int($0, $1) {
 switch(Prelude_EqOrd_x3e_Ord_Int($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

/* Prelude.EqOrd.compare */
function Prelude_EqOrd_compare_Ord_String($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_String($0, $1)) {
  case 1: return 0;
  case 0: {
   switch(Prelude_EqOrd_x3dx3d_Eq_String($0, $1)) {
    case 1: return 1;
    case 0: return 2;
   }
  }
 }
}

/* Prelude.EqOrd.compare */
function Prelude_EqOrd_compare_Ord_Integer($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_Integer($0, $1)) {
  case 1: return 0;
  case 0: {
   switch(Prelude_EqOrd_x3dx3d_Eq_Integer($0, $1)) {
    case 1: return 1;
    case 0: return 2;
   }
  }
 }
}

/* Prelude.EqOrd.compare */
function Prelude_EqOrd_compare_Ord_Int($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_Int($0, $1)) {
  case 1: return 0;
  case 0: {
   switch(Prelude_EqOrd_x3dx3d_Eq_Int($0, $1)) {
    case 1: return 1;
    case 0: return 2;
   }
  }
 }
}

/* Prelude.EqOrd.> */
function Prelude_EqOrd_x3e_Ord_String($0, $1) {
 switch((($0>$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.> */
function Prelude_EqOrd_x3e_Ord_Int($0, $1) {
 switch((($0>$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.> */
function Prelude_EqOrd_x3e_Ord_Char($0, $1) {
 switch((($0>$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.>= */
function Prelude_EqOrd_x3ex3d_Ord_String($0, $1) {
 switch((($0>=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.>= */
function Prelude_EqOrd_x3ex3d_Ord_Int($0, $1) {
 switch((($0>=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.>= */
function Prelude_EqOrd_x3ex3d_Ord_Char($0, $1) {
 switch((($0>=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_String($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Ordering($0, $1) {
 switch($0) {
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  case 2: {
   switch($1) {
    case 2: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Integer($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Int($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Double($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Char($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Bool($0, $1) {
 switch($0) {
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Bits16($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_x28x7cx28x28Builtinx2ePairx20x24ax29x20x24bx29x2cx28x28Builtinx2eMkPairx20x24ax29x20x24bx29x7cx29($0, $1, $2, $3) {
 switch($0.a1($2.a1)($3.a1)) {
  case 1: return $1.a1($2.a2)($3.a2);
  case 0: return 0;
 }
}

/* Prelude.EqOrd.< */
function Prelude_EqOrd_x3c_Ord_String($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.< */
function Prelude_EqOrd_x3c_Ord_Integer($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.< */
function Prelude_EqOrd_x3c_Ord_Int($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.< */
function Prelude_EqOrd_x3c_Ord_Bits16($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.<= */
function Prelude_EqOrd_x3cx3d_Ord_String($0, $1) {
 switch((($0<=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.<= */
function Prelude_EqOrd_x3cx3d_Ord_Int($0, $1) {
 switch((($0<=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.<= */
function Prelude_EqOrd_x3cx3d_Ord_Char($0, $1) {
 switch((($0<=$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd./= */
function Prelude_EqOrd_x2fx3d_Eq_String($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_String($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Prelude.EqOrd./= */
function Prelude_EqOrd_x2fx3d_Eq_Ordering($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Ordering($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Prelude.EqOrd./= */
function Prelude_EqOrd_x2fx3d_Eq_Int($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Int($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Prelude.EqOrd./= */
function Prelude_EqOrd_x2fx3d_Eq_Bits16($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Bits16($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Prelude.EqOrd./= */
function Prelude_EqOrd_x2fx3d_Eq_x28x7cx28x28Builtinx2ePairx20x24ax29x20x24bx29x2cx28x28Builtinx2eMkPairx20x24ax29x20x24bx29x7cx29($0, $1, $2, $3) {
 switch(Prelude_EqOrd_x3dx3d_Eq_x28x7cx28x28Builtinx2ePairx20x24ax29x20x24bx29x2cx28x28Builtinx2eMkPairx20x24ax29x20x24bx29x7cx29($0, $1, $2, $3)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Prelude.EqOrd.compareInteger : Integer -> Integer -> Ordering */
function Prelude_EqOrd_compareInteger($0, $1) {
 return Prelude_EqOrd_compare_Ord_Integer($0, $1);
}

/* Prelude.Interfaces.Applicative.pure */
function Prelude_Interfaces_Applicative_pure_Applicative_Composex28x28x2ex20x24fx29x20x24gx29($0, $1, $2) {
 return $0.a2(undefined)($1.a2(undefined)($2));
}

/* Prelude.Interfaces.Functor.map */
function Prelude_Interfaces_Functor_map_Functor_Composex28x28x2ex20x24fx29x20x24gx29($0, $1, $2, $3) {
 return $0(undefined)(undefined)($b => $1(undefined)(undefined)($2)($b))($3);
}

/* Prelude.Interfaces.Monad.>>= */
function Prelude_Interfaces_Monad_x3ex3ex3d_Monad_Composex28x28x2ex20x24mx29x20x24tx29($0, $1, $2, $3, $4) {
 const $d = $e => {
  const $11 = $0.a1.a1;
  const $10 = $14 => $15 => $11(undefined)(undefined)($14)($15);
  const $f = $10($1f => $1.a3(undefined)($1f));
  return $f($2.a3(undefined)(undefined)(undefined)($0.a1)($4)($e));
 };
 return $0.a2(undefined)(undefined)($3)($d);
}

/* Prelude.Interfaces.Bool.Semigroup.<+> */
function Prelude_Interfaces_Bool_Semigroup_x3cx2bx3e_Semigroup_AnyBool($0, $1) {
 switch($0) {
  case 1: return 1;
  case 0: return $1;
 }
}

/* Prelude.Interfaces.Applicative.<*> */
function Prelude_Interfaces_Applicative_x3cx2ax3e_Applicative_Composex28x28x2ex20x24fx29x20x24gx29($0, $1, $2, $3) {
 return $0.a3(undefined)(undefined)($0.a3(undefined)(undefined)($0.a2(undefined)($19 => $1a => $1.a3(undefined)(undefined)($19)($1a)))($2))($3);
}

/* Prelude.Interfaces.when : Applicative f => Bool -> Lazy (f ()) -> f () */
function Prelude_Interfaces_when($0, $1, $2) {
 switch($1) {
  case 1: return $2();
  case 0: return $0.a2(undefined)(undefined);
 }
}

/* Prelude.Interfaces.traverse_ : Applicative f => Foldable t => (a -> f b) -> t a -> f () */
function Prelude_Interfaces_traverse_($0, $1, $2, $3) {
 return $1.a1(undefined)(undefined)($d => $e => Prelude_Interfaces_x2ax3e($0, $2($d), $e))($0.a2(undefined)(undefined))($3);
}

/* Prelude.Interfaces.guard : Alternative f => Bool -> f () */
function Prelude_Interfaces_guard($0, $1) {
 switch($1) {
  case 1: return $0.a1.a2(undefined)(undefined);
  case 0: return $0.a2(undefined);
 }
}

/* Prelude.Interfaces.(*>) : Applicative f => f a -> f b -> f b */
function Prelude_Interfaces_x2ax3e($0, $1, $2) {
 const $d = $0.a1;
 const $c = $f => $10 => $d(undefined)(undefined)($f)($10);
 const $b = $c($1a => $1b => $1b);
 const $a = $b($1);
 const $4 = $0.a3(undefined)(undefined)($a);
 return $4($2);
}

/* Prelude.Show.2439:11931:asciiTab */
function Prelude_Show_n__2439_11931_asciiTab($0) {
 return {a1: 'NUL', a2: {a1: 'SOH', a2: {a1: 'STX', a2: {a1: 'ETX', a2: {a1: 'EOT', a2: {a1: 'ENQ', a2: {a1: 'ACK', a2: {a1: 'BEL', a2: {a1: 'BS', a2: {a1: 'HT', a2: {a1: 'LF', a2: {a1: 'VT', a2: {a1: 'FF', a2: {a1: 'CR', a2: {a1: 'SO', a2: {a1: 'SI', a2: {a1: 'DLE', a2: {a1: 'DC1', a2: {a1: 'DC2', a2: {a1: 'DC3', a2: {a1: 'DC4', a2: {a1: 'NAK', a2: {a1: 'SYN', a2: {a1: 'ETB', a2: {a1: 'CAN', a2: {a1: 'EM', a2: {a1: 'SUB', a2: {a1: 'ESC', a2: {a1: 'FS', a2: {a1: 'GS', a2: {a1: 'RS', a2: {a1: 'US', a2: {h: 0}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}};
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_String($0) {
 return ('\"'+Prelude_Show_showLitString(Prelude_Types_fastUnpack($0))('\"'));
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Nat($0) {
 return Prelude_Show_show_Show_Integer($0);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Integer($0) {
 return Prelude_Show_showPrec_Show_Integer({h: 0 /* Open */}, $0);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Int($0) {
 return Prelude_Show_showPrec_Show_Int({h: 0 /* Open */}, $0);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Double($0) {
 return Prelude_Show_showPrec_Show_Double({h: 0 /* Open */}, $0);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Char($0) {
 switch($0) {
  case '\'': return '\'\u{5c}\'\'';
  default: return ('\''+Prelude_Show_showLitChar($0)('\''));
 }
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Bits32($0) {
 return Prelude_Show_showPrec_Show_Bits32({h: 0 /* Open */}, $0);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_x28x7cx28x28Builtinx2ePairx20x24ax29x20x24bx29x2cx28x28Builtinx2eMkPairx20x24ax29x20x24bx29x7cx29($0, $1) {
 const $6 = Builtin_fst($0);
 const $5 = $6.a1($1.a1);
 const $f = Builtin_snd($0);
 const $e = $f.a1($1.a2);
 const $d = ($e+')');
 const $b = (', '+$d);
 const $4 = ($5+$b);
 return ('('+$4);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_x28Listx20x24ax29($0, $1) {
 return ('['+(Prelude_Show_n__3221_12652_showx27($0, $1, '', $1)+']'));
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_x28x28Eitherx20x24ax29x20x24bx29($0, $1) {
 return Prelude_Show_showPrec_Show_x28x28Eitherx20x24ax29x20x24bx29($0, {h: 0 /* Open */}, $1);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_String($0, $1) {
 return Prelude_Show_show_Show_String($1);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_Integer($0, $1) {
 return Prelude_Show_primNumShow($4 => (''+$4), $0, $1);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_Int($0, $1) {
 return Prelude_Show_primNumShow($4 => (''+$4), $0, $1);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_Double($0, $1) {
 return Prelude_Show_primNumShow($4 => (''+$4), $0, $1);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_Char($0, $1) {
 return Prelude_Show_show_Show_Char($1);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_Bits32($0, $1) {
 return Prelude_Show_primNumShow($4 => (''+$4), $0, $1);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_x28x7cx28x28Builtinx2ePairx20x24ax29x20x24bx29x2cx28x28Builtinx2eMkPairx20x24ax29x20x24bx29x7cx29($0, $1, $2) {
 return Prelude_Show_show_Show_x28x7cx28x28Builtinx2ePairx20x24ax29x20x24bx29x2cx28x28Builtinx2eMkPairx20x24ax29x20x24bx29x7cx29($0, $2);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_x28Listx20x24ax29($0, $1, $2) {
 return Prelude_Show_show_Show_x28Listx20x24ax29($0, $2);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_x28x28Eitherx20x24ax29x20x24bx29($0, $1, $2) {
 switch($2.h) {
  case 0: /* Left */ return Prelude_Show_showCon($1, 'Left', Prelude_Show_showArg(Builtin_fst($0), $2.a1));
  case 1: /* Right */ return Prelude_Show_showCon($1, 'Right', Prelude_Show_showArg(Builtin_snd($0), $2.a1));
 }
}

/* Prelude.Show.compare */
function Prelude_Show_compare_Ord_Prec($0, $1) {
 switch($0.h) {
  case 4: /* User */ {
   switch($1.h) {
    case 4: /* User */ return Prelude_EqOrd_compare_Ord_Integer($0.a1, $1.a1);
    default: return Prelude_EqOrd_compare_Ord_Integer(Prelude_Show_precCon($0), Prelude_Show_precCon($1));
   }
  }
  default: return Prelude_EqOrd_compare_Ord_Integer(Prelude_Show_precCon($0), Prelude_Show_precCon($1));
 }
}

/* Prelude.Show.>= */
function Prelude_Show_x3ex3d_Ord_Prec($0, $1) {
 return Prelude_EqOrd_x2fx3d_Eq_Ordering(Prelude_Show_compare_Ord_Prec($0, $1), 0);
}

/* Prelude.Show.showParens : Bool -> String -> String */
function Prelude_Show_showParens($0, $1) {
 switch($0) {
  case 0: return $1;
  case 1: return ('('+($1+')'));
 }
}

/* Prelude.Show.showLitString : List Char -> String -> String */
function Prelude_Show_showLitString($0) {
 return $1 => {
  switch($0.h) {
   case 0: /* nil */ return $1;
   case undefined: /* cons */ {
    switch($0.a1) {
     case '\"': return ('\u{5c}\"'+Prelude_Show_showLitString($0.a2)($1));
     default: return Prelude_Show_showLitChar($0.a1)(Prelude_Show_showLitString($0.a2)($1));
    }
   }
  }
 };
}

/* Prelude.Show.showLitChar : Char -> String -> String */
function Prelude_Show_showLitChar($0) {
 switch($0) {
  case '\u{7}': return $2 => ('\u{5c}a'+$2);
  case '\u{8}': return $5 => ('\u{5c}b'+$5);
  case '\u{c}': return $8 => ('\u{5c}f'+$8);
  case '\n': return $b => ('\u{5c}n'+$b);
  case '\r': return $e => ('\u{5c}r'+$e);
  case '\u{9}': return $11 => ('\u{5c}t'+$11);
  case '\u{b}': return $14 => ('\u{5c}v'+$14);
  case '\u{e}': return $17 => Prelude_Show_protectEsc($1a => Prelude_EqOrd_x3dx3d_Eq_Char($1a, 'H'), '\u{5c}SO', $17);
  case '\u{7f}': return $20 => ('\u{5c}DEL'+$20);
  case '\u{5c}': return $23 => ('\u{5c}\u{5c}'+$23);
  default: {
   return $26 => {
    const $27 = Prelude_Types_getAt(Prelude_Types_prim__integerToNat(BigInt($0.codePointAt(0))), Prelude_Show_n__2439_11931_asciiTab($0));
    switch($27.h) {
     case undefined: /* just */ return ('\u{5c}'+($27.a1+$26));
     case 0: /* nothing */ {
      switch(Prelude_EqOrd_x3e_Ord_Char($0, '\u{7f}')) {
       case 1: return ('\u{5c}'+Prelude_Show_protectEsc($3c => Prelude_Types_isDigit($3c), Prelude_Show_show_Show_Int(_truncInt32($0.codePointAt(0))), $26));
       case 0: return ($0+$26);
      }
     }
    }
   };
  }
 }
}

/* Prelude.Show.showCon : Prec -> String -> String -> String */
function Prelude_Show_showCon($0, $1, $2) {
 return Prelude_Show_showParens(Prelude_Show_x3ex3d_Ord_Prec($0, {h: 6 /* App */}), ($1+$2));
}

/* Prelude.Show.showArg : Show a => a -> String */
function Prelude_Show_showArg($0, $1) {
 return (' '+$0.a2({h: 6 /* App */})($1));
}

/* Prelude.Show.protectEsc : (Char -> Bool) -> String -> String -> String */
function Prelude_Show_protectEsc($0, $1, $2) {
 let $5;
 switch(Prelude_Show_firstCharIs($0, $2)) {
  case 1: {
   $5 = '\u{5c}&';
   break;
  }
  case 0: {
   $5 = '';
   break;
  }
 }
 const $4 = ($5+$2);
 return ($1+$4);
}

/* Prelude.Show.primNumShow : (a -> String) -> Prec -> a -> String */
function Prelude_Show_primNumShow($0, $1, $2) {
 const $3 = $0($2);
 let $7;
 switch(Prelude_Show_x3ex3d_Ord_Prec($1, {h: 5 /* PrefixMinus */})) {
  case 1: {
   $7 = Prelude_Show_firstCharIs($e => Prelude_EqOrd_x3dx3d_Eq_Char($e, '-'), $3);
   break;
  }
  case 0: {
   $7 = 0;
   break;
  }
 }
 return Prelude_Show_showParens($7, $3);
}

/* Prelude.Show.precCon : Prec -> Integer */
function Prelude_Show_precCon($0) {
 switch($0.h) {
  case 0: /* Open */ return 0n;
  case 1: /* Equal */ return 1n;
  case 2: /* Dollar */ return 2n;
  case 3: /* Backtick */ return 3n;
  case 4: /* User */ return 4n;
  case 5: /* PrefixMinus */ return 5n;
  case 6: /* App */ return 6n;
 }
}

/* Prelude.Show.firstCharIs : (Char -> Bool) -> String -> Bool */
function Prelude_Show_firstCharIs($0, $1) {
 switch($1) {
  case '': return 0;
  default: return $0(($1.charAt(0)));
 }
}

/* Prelude.IO.map */
function Prelude_IO_map_Functor_IO($0, $1, $2) {
 const $3 = $1($2);
 return $0($3);
}

/* PrimIO.unsafePerformIO : IO a -> a */
function PrimIO_unsafePerformIO($0) {
 const $2 = w => {
  const $3 = $0(w);
  return $3;
 };
 return PrimIO_unsafeCreateWorld($2);
}

/* PrimIO.unsafeCreateWorld : (1 _ : ((1 _ : %World) -> a)) -> a */
function PrimIO_unsafeCreateWorld($0) {
 return $0(_idrisworld);
}

/* System.File.Support.ok : HasIO io => a -> io (Either err a) */
function System_File_Support_ok($0, $1) {
 return $0.a1.a1.a2(undefined)({h: 1 /* Right */, a1: $1});
}

/* System.File.Error.show */
function System_File_Error_show_Show_FileError($0) {
 switch($0.h) {
  case 0: /* GenericFileError */ return System_Errno_strerror($0.a1);
  case 1: /* FileReadError */ return 'File Read Error';
  case 2: /* FileWriteError */ return 'File Write Error';
  case 3: /* FileNotFound */ return 'File Not Found';
  case 4: /* PermissionDenied */ return 'Permission Denied';
  case 5: /* FileExists */ return 'File Exists';
 }
}

/* System.File.Error.returnError : HasIO io => io (Either FileError a) */
function System_File_Error_returnError($0) {
 const $12 = err => {
  let $1a;
  switch(err) {
   case 0: {
    $1a = {h: 1 /* FileReadError */};
    break;
   }
   case 1: {
    $1a = {h: 2 /* FileWriteError */};
    break;
   }
   case 2: {
    $1a = {h: 3 /* FileNotFound */};
    break;
   }
   case 3: {
    $1a = {h: 4 /* PermissionDenied */};
    break;
   }
   case 4: {
    $1a = {h: 5 /* FileExists */};
    break;
   }
   default: $1a = {h: 0 /* GenericFileError */, a1: _sub32s(err, 5)};
  }
  const $19 = {h: 0 /* Left */, a1: $1a};
  return $0.a1.a1.a2(undefined)($19);
 };
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($f => System_File_Error_prim__fileErrno($f)))($12);
}

/* System.File.Error.fileError : HasIO io => File -> io Bool */
function System_File_Error_fileError($0, $1) {
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($10 => System_File_Error_prim__error($1, $10)))(x => $0.a1.a1.a2(undefined)(Prelude_EqOrd_x2fx3d_Eq_Int(x, Number(_truncBigInt32(0n)))));
}

/* System.Errno.strerror : Int -> String */
function System_Errno_strerror($0) {
 return PrimIO_unsafePerformIO($3 => System_Errno_prim__strerror($0, $3));
}

/* System.File.Handle.withFile : HasIO io =>
String -> Mode -> (FileError -> io a) -> (File -> io (Either a b)) -> io (Either a b) */
function System_File_Handle_withFile($0, $1, $2, $3, $4) {
 const $12 = $13 => {
  switch($13.h) {
   case 1: /* Right */ return $0.a1.a2(undefined)(undefined)($4($13.a1))(res => $0.a1.a2(undefined)(undefined)(System_File_Handle_closeFile($0, $13.a1))($2e => $0.a1.a1.a2(undefined)(res)));
   case 0: /* Left */ return $0.a1.a1.a1(undefined)(undefined)($40 => ({h: 0 /* Left */, a1: $40}))($3($13.a1));
  }
 };
 return $0.a1.a2(undefined)(undefined)(System_File_Handle_openFile($0, $1, $2))($12);
}

/* System.File.Handle.openFile : HasIO io => String -> Mode -> io (Either FileError File) */
function System_File_Handle_openFile($0, $1, $2) {
 const $18 = res => {
  switch(Prelude_EqOrd_x2fx3d_Eq_Int(PrimIO_prim__nullAnyPtr(res), Number(_truncBigInt32(0n)))) {
   case 1: return System_File_Error_returnError($0);
   case 0: return System_File_Support_ok($0, res);
  }
 };
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($11 => System_File_Handle_prim__open($1, System_File_Mode_modeStr($2), $11)))($18);
}

/* System.File.Handle.closeFile : HasIO io => File -> io () */
function System_File_Handle_closeFile($0, $1) {
 return $0.a2(undefined)($7 => System_File_Handle_prim__close($1, $7));
}

/* System.File.Mode.modeStr : Mode -> String */
function System_File_Mode_modeStr($0) {
 switch($0) {
  case 0: {
   switch(System_Info_isWindows()) {
    case 1: return 'rb';
    case 0: return 'r';
   }
  }
  case 1: {
   switch(System_Info_isWindows()) {
    case 1: return 'wb';
    case 0: return 'w';
   }
  }
  case 2: {
   switch(System_Info_isWindows()) {
    case 1: return 'ab';
    case 0: return 'a';
   }
  }
  case 3: {
   switch(System_Info_isWindows()) {
    case 1: return 'rb+';
    case 0: return 'r+';
   }
  }
  case 4: {
   switch(System_Info_isWindows()) {
    case 1: return 'wb+';
    case 0: return 'w+';
   }
  }
  case 5: {
   switch(System_Info_isWindows()) {
    case 1: return 'ab+';
    case 0: return 'a+';
   }
  }
 }
}

/* System.Info.os : String */
const System_Info_os = __lazy(function () {
 return _sysos;
});

/* System.Info.isWindows : Bool */
const System_Info_isWindows = __lazy(function () {
 return Prelude_Types_elem(csegen_116(), csegen_9(), System_Info_os(), {a1: 'windows', a2: {a1: 'mingw32', a2: {a1: 'cygwin32', a2: {h: 0}}}});
});

/* Data.List.with block in inBounds */
function Data_List_with__inBounds_4772($0, $1, $2, $3, $4) {
 switch($3.h) {
  case 0: /* Yes */ return {h: 0 /* Yes */, a1: ($3.a1+1n)};
  case 1: /* No */ {
   const $9 = $a => {
    switch($a) {
     case 0n: _crashExp('Nat case not covered');
     default: {
      const $c = ($a-1n);
      return $3.a1($c);
     }
    }
   };
   return {h: 1 /* No */, a1: $9};
  }
 }
}

/* Data.List.uninhabited */
function Data_List_uninhabited_Uninhabited_x28x28InBoundsx20x24kx29x20Nilx29($0) {
 _crashExp('No clauses');
}

/* Data.List.mergeReplicate : a -> List a -> List a */
function Data_List_mergeReplicate($0, $1) {
 switch($1.h) {
  case 0: /* nil */ return {h: 0};
  case undefined: /* cons */ return {a1: $0, a2: {a1: $1.a1, a2: Data_List_mergeReplicate($0, $1.a2)}};
 }
}

/* Data.List.lookup : Eq a => a -> List (a, b) -> Maybe b */
function Data_List_lookup($0, $1, $2) {
 return Data_List_lookupBy($5 => $6 => $0.a1($5)($6), $1, $2);
}

/* Data.List.intersperse : a -> List a -> List a */
function Data_List_intersperse($0, $1) {
 switch($1.h) {
  case 0: /* nil */ return {h: 0};
  case undefined: /* cons */ return {a1: $1.a1, a2: Data_List_mergeReplicate($0, $1.a2)};
 }
}

/* Data.List.inBounds : (k : Nat) -> (xs : List a) -> Dec (InBounds k xs) */
function Data_List_inBounds($0, $1) {
 switch($1.h) {
  case 0: /* nil */ return {h: 1 /* No */, a1: $4 => Data_List_uninhabited_Uninhabited_x28x28InBoundsx20x24kx29x20Nilx29($4)};
  default: {
   switch($0) {
    case 0n: return {h: 0 /* Yes */, a1: 0n};
    default: {
     const $a = ($0-1n);
     return Data_List_with__inBounds_4772(undefined, $a, $1.a2, Data_List_inBounds($a, $1.a2), $1.a1);
    }
   }
  }
 }
}

/* Data.Fuel.forever : Fuel */
const Data_Fuel_forever = __lazy(function () {
 return {a1: () => Data_Fuel_forever()};
});

/* System.getArgs : HasIO io => io (List String) */
function System_getArgs($0) {
 const $12 = n => {
  switch(Prelude_EqOrd_x3e_Ord_Int(n, Number(_truncBigInt32(0n)))) {
   case 1: return Prelude_Basics_flip($1a => $1b => Prelude_Types_traverse_Traversable_List($0.a1.a1, $1a, $1b), Prelude_Types_rangeFromTo_Range_x24a({a1: {a1: csegen_123(), a2: $29 => $2a => Prelude_Num_div_Integral_Int($29, $2a), a3: $2f => $30 => Prelude_Num_mod_Integral_Int($2f, $30)}, a2: {a1: {a1: {a1: $38 => $39 => Prelude_EqOrd_x3dx3d_Eq_Int($38, $39), a2: $3e => $3f => Prelude_EqOrd_x2fx3d_Eq_Int($3e, $3f)}, a2: $44 => $45 => Prelude_EqOrd_compare_Ord_Int($44, $45), a3: $4a => $4b => Prelude_EqOrd_x3c_Ord_Int($4a, $4b), a4: $50 => $51 => Prelude_EqOrd_x3e_Ord_Int($50, $51), a5: $56 => $57 => Prelude_EqOrd_x3cx3d_Ord_Int($56, $57), a6: $5c => $5d => Prelude_EqOrd_x3ex3d_Ord_Int($5c, $5d), a7: $62 => $63 => Prelude_EqOrd_max_Ord_Int($62, $63), a8: $68 => $69 => Prelude_EqOrd_min_Ord_Int($68, $69)}, a2: {a1: csegen_123(), a2: $71 => _sub32s(0, $71), a3: $75 => $76 => _sub32s($75, $76)}}}, 0, _sub32s(n, 1)), $7e => $0.a2(undefined)($84 => System_prim__getArg($7e, $84)));
   case 0: return $0.a1.a1.a2(undefined)({h: 0});
  }
 };
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($f => System_prim__getArgCount($f)))($12);
}

/* Allen.JSON.with block in charToBits */
function Allen_JSON_with__charToBits_6763($0, $1) {
 switch($1.h) {
  case 0: /* Yes */ {
   let $3;
   switch($1.a1) {
    case 0: {
     $3 = 1;
     break;
    }
    case 1: {
     $3 = 2;
     break;
    }
    case 2: {
     $3 = 4;
     break;
    }
    case 3: {
     $3 = 8;
     break;
    }
    case 4: {
     $3 = 16;
     break;
    }
    case 5: {
     $3 = 32;
     break;
    }
    case 6: {
     $3 = 64;
     break;
    }
    case 7: {
     $3 = 128;
     break;
    }
    case 8: {
     $3 = 256;
     break;
    }
    case 9: {
     $3 = 512;
     break;
    }
    case 10: {
     $3 = 1024;
     break;
    }
    case 11: {
     $3 = 2048;
     break;
    }
    case 12: {
     $3 = 4096;
     break;
    }
   }
   return {h: 1 /* Right */, a1: $3};
  }
  case 1: /* No */ return {h: 0 /* Left */, a1: $0};
 }
}

/* Allen.JSON.toJsonRelationJSON : Encoder v => RelationJSON -> v */
function Allen_JSON_toJsonRelationJSON($0, $1) {
 return $0.a7({a1: {a1: 'from', a2: JSON_ToJSON_toJSON_ToJSON_String($0, $1.a1)}, a2: {a1: {a1: 'to', a2: JSON_ToJSON_toJSON_ToJSON_String($0, $1.a2)}, a2: {a1: {a1: 'rels', a2: JSON_ToJSON_toJSON_ToJSON_String($0, $1.a3)}, a2: {h: 0}}}});
}

/* Allen.JSON.toJsonNetworkJSON : Encoder v => NetworkJSON -> v */
function Allen_JSON_toJsonNetworkJSON($0, $1) {
 return $0.a7({a1: {a1: 'intervals', a2: JSON_ToJSON_toJSON_ToJSON_x28Listx20x24ax29($b => $c => $d => JSON_ToJSON_toJSON_ToJSON_String($c, $d), $0, $1.a1)}, a2: {a1: {a1: 'relations', a2: JSON_ToJSON_toJSON_ToJSON_x28Listx20x24ax29($19 => $1a => $1b => Allen_JSON_toJsonRelationJSON($1a, $1b), $0, $1.a2)}, a2: {h: 0}}});
}

/* Allen.JSON.stringToBits : String -> Either Char RelationBits */
function Allen_JSON_stringToBits($0) {
 const $5 = b => a => func => $6 => {
  switch($6.h) {
   case 0: /* Left */ return {h: 0 /* Left */, a1: $6.a1};
   case 1: /* Right */ return {h: 1 /* Right */, a1: func($6.a1)};
  }
 };
 const $f = b => a => $10 => $11 => {
  switch($10.h) {
   case 0: /* Left */ return {h: 0 /* Left */, a1: $10.a1};
   case 1: /* Right */ {
    switch($11.h) {
     case 1: /* Right */ return {h: 1 /* Right */, a1: $10.a1($11.a1)};
     case 0: /* Left */ return {h: 0 /* Left */, a1: $11.a1};
    }
   }
  }
 };
 const $4 = {a1: $5, a2: a => $d => ({h: 1 /* Right */, a1: $d}), a3: $f};
 const $2 = Prelude_Types_traverse_Traversable_List($4, $1a => Allen_JSON_charToBits($1a), Prelude_Types_fastUnpack($0));
 return Prelude_Types_x3ex3ex3d_Monad_x28Eitherx20x24ex29($2, thing => ({h: 1 /* Right */, a1: Prelude_Types_foldl_Foldable_List(csegen_146(), 0, thing)}));
}

/* Allen.JSON.parseNetwork : String -> Either DecodingErr NetworkJSON */
function Allen_JSON_parseNetwork($0) {
 const $e = $f => {
  switch($f.h) {
   case 0: /* JNull */ return 'Null';
   case 3: /* JBool */ return 'Boolean';
   case 2: /* JDouble */ return 'Double';
   case 1: /* JInteger */ return 'Integer';
   case 4: /* JString */ return 'String';
   case 5: /* JArray */ return 'Array';
   case 6: /* JObject */ return 'Object';
  }
 };
 const $17 = $18 => {
  switch($18.h) {
   case 6: /* JObject */ return {a1: $18.a1};
   default: return {h: 0};
  }
 };
 const $1b = $1c => {
  switch($1c.h) {
   case 5: /* JArray */ return {a1: $1c.a1};
   default: return {h: 0};
  }
 };
 const $1f = $20 => {
  switch($20.h) {
   case 3: /* JBool */ return {a1: $20.a1};
   default: return {h: 0};
  }
 };
 const $23 = $24 => {
  switch($24.h) {
   case 2: /* JDouble */ return {a1: $24.a1};
   case 1: /* JInteger */ return {a1: Number($24.a1)};
   default: return {h: 0};
  }
 };
 const $29 = $2a => {
  switch($2a.h) {
   case 1: /* JInteger */ return {a1: $2a.a1};
   default: return {h: 0};
  }
 };
 const $2d = $2e => {
  switch($2e.h) {
   case 4: /* JString */ return {a1: $2e.a1};
   default: return {h: 0};
  }
 };
 const $31 = $32 => {
  switch($32.h) {
   case 0: /* JNull */ return 1;
   default: return 0;
  }
 };
 const $2 = {a1: {a1: $5 => $6 => Data_List_lookup(csegen_9(), $5, $6), a2: $d => $d}, a2: $e, a3: $12 => $13 => JSON_Parser_parseJSON($12, $13), a4: $17, a5: $1b, a6: $1f, a7: $23, a8: $29, a9: $2d, a10: $31};
 return JSON_FromJSON_case__decodeVia_4634($2, $35 => $36 => $37 => $38 => Allen_JSON_fromJsonNetworkJSON($37, $38), $0, JSON_Parser_parseJSON({h: 0}, $0));
}

/* Allen.JSON.loadNetwork : NetworkJSON -> Allen String () */
function Allen_JSON_loadNetwork($0) {
 return Prelude_Interfaces_x2ax3e(csegen_191(), Allen_JSON_addIntervals(csegen_17(), $0.a1), Allen_JSON_addRelations($0.a2));
}

/* Allen.JSON.intervalToRelations : Interval String -> List RelationJSON */
function Allen_JSON_intervalToRelations($0) {
 const $6 = $7 => {
  const $14 = Allen_Relation_allRelations();
  let $13;
  switch($14.h) {
   case 0: /* nil */ {
    $13 = {h: 0};
    break;
   }
   case undefined: /* cons */ {
    let $17;
    switch($14.a2.h) {
     case 0: /* nil */ {
      $17 = {h: 0};
      break;
     }
     case undefined: /* cons */ {
      let $1a;
      switch($14.a2.a2.h) {
       case 0: /* nil */ {
        $1a = {h: 0};
        break;
       }
       case undefined: /* cons */ {
        let $1d;
        switch($14.a2.a2.a2.h) {
         case 0: /* nil */ {
          $1d = {h: 0};
          break;
         }
         case undefined: /* cons */ {
          let $20;
          switch($14.a2.a2.a2.a2.h) {
           case 0: /* nil */ {
            $20 = {h: 0};
            break;
           }
           case undefined: /* cons */ {
            let $23;
            switch($14.a2.a2.a2.a2.a2.h) {
             case 0: /* nil */ {
              $23 = {h: 0};
              break;
             }
             case undefined: /* cons */ {
              let $26;
              switch($14.a2.a2.a2.a2.a2.a2.h) {
               case 0: /* nil */ {
                $26 = {h: 0};
                break;
               }
               case undefined: /* cons */ {
                let $29;
                switch($14.a2.a2.a2.a2.a2.a2.a2.h) {
                 case 0: /* nil */ {
                  $29 = {h: 0};
                  break;
                 }
                 case undefined: /* cons */ {
                  let $2c;
                  switch($14.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                   case 0: /* nil */ {
                    $2c = {h: 0};
                    break;
                   }
                   case undefined: /* cons */ {
                    let $2f;
                    switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                     case 0: /* nil */ {
                      $2f = {h: 0};
                      break;
                     }
                     case undefined: /* cons */ {
                      let $32;
                      switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                       case 0: /* nil */ {
                        $32 = {h: 0};
                        break;
                       }
                       case undefined: /* cons */ {
                        let $35;
                        switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                         case 0: /* nil */ {
                          $35 = {h: 0};
                          break;
                         }
                         case undefined: /* cons */ {
                          let $38;
                          switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                           case 0: /* nil */ {
                            $38 = {h: 0};
                            break;
                           }
                           case undefined: /* cons */ {
                            let $3b;
                            switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                             case 0: /* nil */ {
                              $3b = {h: 0};
                              break;
                             }
                             case undefined: /* cons */ {
                              let $3e;
                              switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                               case 0: /* nil */ {
                                $3e = {h: 0};
                                break;
                               }
                               case undefined: /* cons */ {
                                let $41;
                                switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                 case 0: /* nil */ {
                                  $41 = {h: 0};
                                  break;
                                 }
                                 case undefined: /* cons */ {
                                  let $44;
                                  switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                   case 0: /* nil */ {
                                    $44 = {h: 0};
                                    break;
                                   }
                                   case undefined: /* cons */ {
                                    let $47;
                                    switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                     case 0: /* nil */ {
                                      $47 = {h: 0};
                                      break;
                                     }
                                     case undefined: /* cons */ {
                                      let $4a;
                                      switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                       case 0: /* nil */ {
                                        $4a = {h: 0};
                                        break;
                                       }
                                       case undefined: /* cons */ {
                                        let $4d;
                                        switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                         case 0: /* nil */ {
                                          $4d = {h: 0};
                                          break;
                                         }
                                         case undefined: /* cons */ {
                                          let $50;
                                          switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                           case 0: /* nil */ {
                                            $50 = {h: 0};
                                            break;
                                           }
                                           case undefined: /* cons */ {
                                            let $53;
                                            switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                             case 0: /* nil */ {
                                              $53 = {h: 0};
                                              break;
                                             }
                                             case undefined: /* cons */ {
                                              let $56;
                                              switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                               case 0: /* nil */ {
                                                $56 = {h: 0};
                                                break;
                                               }
                                               case undefined: /* cons */ {
                                                let $59;
                                                switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                 case 0: /* nil */ {
                                                  $59 = {h: 0};
                                                  break;
                                                 }
                                                 case undefined: /* cons */ {
                                                  let $5c;
                                                  switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                   case 0: /* nil */ {
                                                    $5c = {h: 0};
                                                    break;
                                                   }
                                                   case undefined: /* cons */ {
                                                    let $5f;
                                                    switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                     case 0: /* nil */ {
                                                      $5f = {h: 0};
                                                      break;
                                                     }
                                                     case undefined: /* cons */ {
                                                      let $62;
                                                      switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                       case 0: /* nil */ {
                                                        $62 = {h: 0};
                                                        break;
                                                       }
                                                       case undefined: /* cons */ {
                                                        let $65;
                                                        switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                         case 0: /* nil */ {
                                                          $65 = {h: 0};
                                                          break;
                                                         }
                                                         case undefined: /* cons */ {
                                                          let $68;
                                                          switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                           case 0: /* nil */ {
                                                            $68 = {h: 0};
                                                            break;
                                                           }
                                                           case undefined: /* cons */ {
                                                            let $6b;
                                                            switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                             case 0: /* nil */ {
                                                              $6b = {h: 0};
                                                              break;
                                                             }
                                                             case undefined: /* cons */ {
                                                              let $6e;
                                                              switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                               case 0: /* nil */ {
                                                                $6e = {h: 0};
                                                                break;
                                                               }
                                                               case undefined: /* cons */ {
                                                                let $71;
                                                                switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                 case 0: /* nil */ {
                                                                  $71 = {h: 0};
                                                                  break;
                                                                 }
                                                                 case undefined: /* cons */ {
                                                                  let $74;
                                                                  switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                   case 0: /* nil */ {
                                                                    $74 = {h: 0};
                                                                    break;
                                                                   }
                                                                   case undefined: /* cons */ {
                                                                    let $77;
                                                                    switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                     case 0: /* nil */ {
                                                                      $77 = {h: 0};
                                                                      break;
                                                                     }
                                                                     case undefined: /* cons */ {
                                                                      let $7a;
                                                                      switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                       case 0: /* nil */ {
                                                                        $7a = {h: 0};
                                                                        break;
                                                                       }
                                                                       case undefined: /* cons */ {
                                                                        let $7d;
                                                                        switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                         case 0: /* nil */ {
                                                                          $7d = {h: 0};
                                                                          break;
                                                                         }
                                                                         case undefined: /* cons */ {
                                                                          let $80;
                                                                          switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                           case 0: /* nil */ {
                                                                            $80 = {h: 0};
                                                                            break;
                                                                           }
                                                                           case undefined: /* cons */ {
                                                                            let $83;
                                                                            switch($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                             case 0: /* nil */ {
                                                                              $83 = {h: 0};
                                                                              break;
                                                                             }
                                                                             case undefined: /* cons */ {
                                                                              $83 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: Allen_Relation_asList($14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2)};
                                                                              break;
                                                                             }
                                                                            }
                                                                            $80 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $83};
                                                                            break;
                                                                           }
                                                                          }
                                                                          $7d = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $80};
                                                                          break;
                                                                         }
                                                                        }
                                                                        $7a = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $7d};
                                                                        break;
                                                                       }
                                                                      }
                                                                      $77 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $7a};
                                                                      break;
                                                                     }
                                                                    }
                                                                    $74 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $77};
                                                                    break;
                                                                   }
                                                                  }
                                                                  $71 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $74};
                                                                  break;
                                                                 }
                                                                }
                                                                $6e = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $71};
                                                                break;
                                                               }
                                                              }
                                                              $6b = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $6e};
                                                              break;
                                                             }
                                                            }
                                                            $68 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $6b};
                                                            break;
                                                           }
                                                          }
                                                          $65 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $68};
                                                          break;
                                                         }
                                                        }
                                                        $62 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $65};
                                                        break;
                                                       }
                                                      }
                                                      $5f = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $62};
                                                      break;
                                                     }
                                                    }
                                                    $5c = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $5f};
                                                    break;
                                                   }
                                                  }
                                                  $59 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $5c};
                                                  break;
                                                 }
                                                }
                                                $56 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $59};
                                                break;
                                               }
                                              }
                                              $53 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $56};
                                              break;
                                             }
                                            }
                                            $50 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $53};
                                            break;
                                           }
                                          }
                                          $4d = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $50};
                                          break;
                                         }
                                        }
                                        $4a = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $4d};
                                        break;
                                       }
                                      }
                                      $47 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $4a};
                                      break;
                                     }
                                    }
                                    $44 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $47};
                                    break;
                                   }
                                  }
                                  $41 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $44};
                                  break;
                                 }
                                }
                                $3e = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $41};
                                break;
                               }
                              }
                              $3b = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $3e};
                              break;
                             }
                            }
                            $38 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $3b};
                            break;
                           }
                          }
                          $35 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $38};
                          break;
                         }
                        }
                        $32 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $35};
                        break;
                       }
                      }
                      $2f = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $32};
                      break;
                     }
                    }
                    $2c = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $2f};
                    break;
                   }
                  }
                  $29 = {a1: $14.a2.a2.a2.a2.a2.a2.a2.a1, a2: $2c};
                  break;
                 }
                }
                $26 = {a1: $14.a2.a2.a2.a2.a2.a2.a1, a2: $29};
                break;
               }
              }
              $23 = {a1: $14.a2.a2.a2.a2.a2.a1, a2: $26};
              break;
             }
            }
            $20 = {a1: $14.a2.a2.a2.a2.a1, a2: $23};
            break;
           }
          }
          $1d = {a1: $14.a2.a2.a2.a1, a2: $20};
          break;
         }
        }
        $1a = {a1: $14.a2.a2.a1, a2: $1d};
        break;
       }
      }
      $17 = {a1: $14.a2.a1, a2: $1a};
      break;
     }
    }
    $13 = {a1: $14.a1, a2: $17};
    break;
   }
  }
  const $89 = $8a => {
   let $94;
   switch($8a.a2) {
    case 0: {
     $94 = 1;
     break;
    }
    case 1: {
     $94 = 2;
     break;
    }
    case 2: {
     $94 = 4;
     break;
    }
    case 3: {
     $94 = 8;
     break;
    }
    case 4: {
     $94 = 16;
     break;
    }
    case 5: {
     $94 = 32;
     break;
    }
    case 6: {
     $94 = 64;
     break;
    }
    case 7: {
     $94 = 128;
     break;
    }
    case 8: {
     $94 = 256;
     break;
    }
    case 9: {
     $94 = 512;
     break;
    }
    case 10: {
     $94 = 1024;
     break;
    }
    case 11: {
     $94 = 2048;
     break;
    }
    case 12: {
     $94 = 4096;
     break;
    }
   }
   const $93 = ($94&$7.a2);
   const $91 = Prelude_EqOrd_x2fx3d_Eq_Bits16($93, 0);
   const $8d = Prelude_Interfaces_guard(csegen_204(), $91);
   return Prelude_Types_listBind($8d, $99 => Prelude_Types_pure_Applicative_List($8a));
  };
  const $11 = Prelude_Types_listBind($13, $89);
  const $b = Prelude_Types_List_mapAppend({h: 0}, $f => $f.a1, $11);
  const $9 = Prelude_Types_fastPack($b);
  return Prelude_Types_pure_Applicative_List({a1: $0.a1, a2: $7.a1, a3: $9});
 };
 return Prelude_Types_listBind(Data_SortedMap_toList($0.a2), $6);
}

/* Allen.JSON.graphToNetwork : IntervalGraph String -> NetworkJSON */
function Allen_JSON_graphToNetwork($0) {
 return {a1: Data_SortedMap_keys($0), a2: Prelude_Types_foldMap_Foldable_List({a1: $8 => $9 => Prelude_Types_List_tailRecAppend($8, $9), a2: {h: 0}}, $f => Allen_JSON_intervalToRelations($f), Prelude_Types_List_mapAppend({h: 0}, $16 => Builtin_snd($16), Data_SortedMap_toList($0)))};
}

/* Allen.JSON.fromJsonRelationJSON : Value v obj => Parser v RelationJSON */
function Allen_JSON_fromJsonRelationJSON($0, $1) {
 const $b = $c => {
  const $d = JSON_FromJSON_explicitParseField($0.a1, $0, $13 => JSON_FromJSON_fromJSON_FromJSON_String($0, $13), $c, 'from');
  switch($d.h) {
   case 1: /* Right */ {
    const $19 = JSON_FromJSON_explicitParseField($0.a1, $0, $1f => JSON_FromJSON_fromJSON_FromJSON_String($0, $1f), $c, 'to');
    switch($19.h) {
     case 1: /* Right */ {
      const $25 = JSON_FromJSON_explicitParseField($0.a1, $0, $2b => JSON_FromJSON_fromJSON_FromJSON_String($0, $2b), $c, 'rels');
      switch($25.h) {
       case 1: /* Right */ return {h: 1 /* Right */, a1: {a1: $d.a1, a2: $19.a1, a3: $25.a1}};
       case 0: /* Left */ return {h: 0 /* Left */, a1: $25.a1};
      }
     }
     case 0: /* Left */ return {h: 0 /* Left */, a1: $19.a1};
    }
   }
   case 0: /* Left */ return {h: 0 /* Left */, a1: $d.a1};
  }
 };
 return JSON_FromJSON_withValue($0, 'Object', $6 => $0.a4($6), () => 'RelationJSON', $b, $1);
}

/* Allen.JSON.fromJsonNetworkJSON : Value v obj => Parser v NetworkJSON */
function Allen_JSON_fromJsonNetworkJSON($0, $1) {
 const $b = $c => {
  const $d = JSON_FromJSON_explicitParseField($0.a1, $0, $13 => JSON_FromJSON_fromJSON_FromJSON_x28Listx20x24ax29($16 => $17 => $18 => $19 => JSON_FromJSON_fromJSON_FromJSON_String($18, $19), $0, $13), $c, 'intervals');
  switch($d.h) {
   case 1: /* Right */ {
    const $21 = JSON_FromJSON_explicitParseField($0.a1, $0, $27 => JSON_FromJSON_fromJSON_FromJSON_x28Listx20x24ax29($2a => $2b => $2c => $2d => Allen_JSON_fromJsonRelationJSON($2c, $2d), $0, $27), $c, 'relations');
    switch($21.h) {
     case 1: /* Right */ return {h: 1 /* Right */, a1: {a1: $d.a1, a2: $21.a1}};
     case 0: /* Left */ return {h: 0 /* Left */, a1: $21.a1};
    }
   }
   case 0: /* Left */ return {h: 0 /* Left */, a1: $d.a1};
  }
 };
 return JSON_FromJSON_withValue($0, 'Object', $6 => $0.a4($6), () => 'NetworkJSON', $b, $1);
}

/* Allen.JSON.charToBits : Char -> Either Char RelationBits */
function Allen_JSON_charToBits($0) {
 return Allen_JSON_with__charToBits_6763($0, Allen_Relation_isRelation($0));
}

/* Allen.JSON.addRelations : List RelationJSON -> Allen String () */
function Allen_JSON_addRelations($0) {
 switch($0.h) {
  case 0: /* nil */ return csegen_213();
  case undefined: /* cons */ {
   const $3 = Allen_JSON_stringToBits($0.a1.a3);
   switch($3.h) {
    case 0: /* Left */ return $7 => Control_Monad_State_State_pure_Applicative_x28x28StateTx20x24stateTypex29x20x24fx29(csegen_179(), {h: 0 /* Left */, a1: {h: 3 /* InvalidRelation */, a1: $3.a1}}, $7);
    case 1: /* Right */ return Prelude_Interfaces_x2ax3e(csegen_191(), Allen_Interval_assumeBits(csegen_9(), $0.a1.a1, $3.a1, $0.a1.a2), Allen_JSON_addRelations($0.a2));
   }
  }
 }
}

/* Allen.JSON.addIntervals : Ord k => List k -> Allen k () */
function Allen_JSON_addIntervals($0, $1) {
 switch($1.h) {
  case 0: /* nil */ return csegen_213();
  case undefined: /* cons */ return Prelude_Interfaces_x2ax3e(csegen_191(), Allen_Interval_interval_($0, $1.a1), Allen_JSON_addIntervals($0, $1.a2));
 }
}

/* JSON.ToJSON.toJSON */
function JSON_ToJSON_toJSON_ToJSON_String($0, $1) {
 return $0.a2($1);
}

/* JSON.ToJSON.toJSON */
function JSON_ToJSON_toJSON_ToJSON_x28Listx20x24ax29($0, $1, $2) {
 return $1.a6(Prelude_Types_List_mapAppend({h: 0}, $9 => $0(undefined)($1)($9), $2));
}

/* JSON.ToJSON.encodeVia : (0 v : Type) -> Encoder v => ToJSON a => a -> String */
function JSON_ToJSON_encodeVia($0, $1, $2) {
 return $0.a1($1(undefined)($0)($2));
}

/* JSON.ToJSON.encode : ToJSON a => a -> String */
function JSON_ToJSON_encode($0, $1) {
 return JSON_ToJSON_encodeVia({a1: $5 => JSON_Parser_showImpl($5), a2: $9 => ({h: 4 /* JString */, a1: $9}), a3: $c => ({h: 2 /* JDouble */, a1: $c}), a4: $f => ({h: 1 /* JInteger */, a1: $f}), a5: $12 => ({h: 3 /* JBool */, a1: $12}), a6: $15 => ({h: 5 /* JArray */, a1: $15}), a7: $18 => ({h: 6 /* JObject */, a1: $18}), a8: {h: 0 /* JNull */}}, $0, $1);
}

/* JSON.Parser.case block in case block in parseJSON */
function JSON_Parser_case__casex20blockx20inx20parseJSON_7115($0, $1, $2, $3) {
 switch($3.h) {
  case 1: /* Fail0 */ return {h: 0 /* Left */, a1: {a1: {a1: $1, a2: $3.a1.a2}, a2: $3.a1.a1}};
  case 0: /* Succ0 */ {
   switch($3.a2.h) {
    case undefined: /* cons */ {
     switch($3.a2.a1.h) {
      case undefined: /* cons */ {
       switch($3.a2.a1.a1.h) {
        case 2: /* EOI */ {
         switch($3.a2.a2.h) {
          case 0: /* nil */ return {h: 1 /* Right */, a1: $3.a1};
          default: {
           const $11 = Text_Bounds_map_Functor_Bounded($14 => ({h: 9 /* Unexpected */, a1: {h: 1 /* Right */, a1: $14}}), $3.a2.a1);
           const $10 = {a1: {a1: $1, a2: $11.a2}, a2: $11.a1};
           return {h: 0 /* Left */, a1: $10};
          }
         }
        }
        default: {
         const $1d = Text_Bounds_map_Functor_Bounded($20 => ({h: 9 /* Unexpected */, a1: {h: 1 /* Right */, a1: $20}}), $3.a2.a1);
         const $1c = {a1: {a1: $1, a2: $1d.a2}, a2: $1d.a1};
         return {h: 0 /* Left */, a1: $1c};
        }
       }
      }
      default: {
       const $29 = Text_Bounds_map_Functor_Bounded($2c => ({h: 9 /* Unexpected */, a1: {h: 1 /* Right */, a1: $2c}}), $3.a2.a1);
       const $28 = {a1: {a1: $1, a2: $29.a2}, a2: $29.a1};
       return {h: 0 /* Left */, a1: $28};
      }
     }
    }
    case 0: /* nil */ return {h: 1 /* Right */, a1: $3.a1};
   }
  }
 }
}

/* JSON.Parser.case block in parseJSON */
function JSON_Parser_case__parseJSON_7095($0, $1, $2) {
 switch($2.h) {
  case 1: /* Right */ return JSON_Parser_case__casex20blockx20inx20parseJSON_7115($0, $1, $2.a1, JSON_Parser_value($2.a1));
  case 0: /* Left */ return {h: 0 /* Left */, a1: {a1: {a1: $1, a2: $2.a1.a2}, a2: $2.a1.a1}};
 }
}

/* JSON.Parser.value : Rule True JSON */
function JSON_Parser_value($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   switch($0.a1.h) {
    case undefined: /* cons */ {
     switch($0.a1.a1.h) {
      case 1: /* Lit */ return {h: 0 /* Succ0 */, a1: $0.a1.a1.a1, a2: $0.a2};
      case 0: /* Symbol */ {
       switch($0.a1.a1.a1) {
        case '[': {
         switch($0.a2.h) {
          case undefined: /* cons */ {
           switch($0.a2.a1.h) {
            case undefined: /* cons */ {
             switch($0.a2.a1.a1.h) {
              case 0: /* Symbol */ {
               switch($0.a2.a1.a1.a1) {
                case ']': return {h: 0 /* Succ0 */, a1: {h: 5 /* JArray */, a1: {h: 0}}, a2: $0.a2.a2};
                default: return JSON_Parser_array($0.a1.a2, {h: 0}, $0.a2);
               }
              }
              default: return JSON_Parser_array($0.a1.a2, {h: 0}, $0.a2);
             }
            }
            default: return JSON_Parser_array($0.a1.a2, {h: 0}, $0.a2);
           }
          }
          default: return JSON_Parser_array($0.a1.a2, {h: 0}, $0.a2);
         }
        }
        case '{': {
         switch($0.a2.h) {
          case undefined: /* cons */ {
           switch($0.a2.a1.h) {
            case undefined: /* cons */ {
             switch($0.a2.a1.a1.h) {
              case 0: /* Symbol */ {
               switch($0.a2.a1.a1.a1) {
                case '}': return {h: 0 /* Succ0 */, a1: {h: 6 /* JObject */, a1: {h: 0}}, a2: $0.a2.a2};
                default: return JSON_Parser_object($0.a1.a2, {h: 0}, $0.a2);
               }
              }
              default: return JSON_Parser_object($0.a1.a2, {h: 0}, $0.a2);
             }
            }
            default: return JSON_Parser_object($0.a1.a2, {h: 0}, $0.a2);
           }
          }
          default: return JSON_Parser_object($0.a1.a2, {h: 0}, $0.a2);
         }
        }
        default: return Text_ParseError_fail($0);
       }
      }
      default: return Text_ParseError_fail($0);
     }
    }
    default: return Text_ParseError_fail($0);
   }
  }
  default: return Text_ParseError_fail($0);
 }
}

/* JSON.Parser.toToken : Cast String a => (a -> JSON) -> SnocList Char -> JSToken */
function JSON_Parser_toToken($0, $1, $2) {
 return {h: 1 /* Lit */, a1: $1($0(Prelude_Types_fastPack(Prelude_Types_SnocList_x3cx3ex3e($2, {h: 0}))))};
}

/* JSON.Parser.term : Tok True e JSToken */
function JSON_Parser_term($0) {
 switch($0.h) {
  case undefined: /* cons */ {
   switch($0.a1) {
    case ',': return {h: 0 /* Succ */, a1: {h: 0 /* Symbol */, a1: ','}, a2: $0.a2, a3: 1n};
    case '\"': return JSON_Parser_str({h: 0}, {a1: '\"', a2: $0.a2}, $0.a2, 1n);
    case ':': return {h: 0 /* Succ */, a1: {h: 0 /* Symbol */, a1: ':'}, a2: $0.a2, a3: 1n};
    case '[': return {h: 0 /* Succ */, a1: {h: 0 /* Symbol */, a1: '['}, a2: $0.a2, a3: 1n};
    case ']': return {h: 0 /* Succ */, a1: {h: 0 /* Symbol */, a1: ']'}, a2: $0.a2, a3: 1n};
    case '{': return {h: 0 /* Succ */, a1: {h: 0 /* Symbol */, a1: '{'}, a2: $0.a2, a3: 1n};
    case '}': return {h: 0 /* Succ */, a1: {h: 0 /* Symbol */, a1: '}'}, a2: $0.a2, a3: 1n};
    case 'n': {
     switch($0.a2.h) {
      case undefined: /* cons */ {
       switch($0.a2.a1) {
        case 'u': {
         switch($0.a2.a2.h) {
          case undefined: /* cons */ {
           switch($0.a2.a2.a1) {
            case 'l': {
             switch($0.a2.a2.a2.h) {
              case undefined: /* cons */ {
               switch($0.a2.a2.a2.a1) {
                case 'l': return {h: 0 /* Succ */, a1: {h: 1 /* Lit */, a1: {h: 0 /* JNull */}}, a2: $0.a2.a2.a2.a2, a3: 4n};
                default: return JSON_Parser_invalidKey({a1: 'n', a2: $0.a2}, {a1: 'n', a2: $0.a2}, 0n);
               }
              }
              default: return JSON_Parser_invalidKey({a1: 'n', a2: $0.a2}, {a1: 'n', a2: $0.a2}, 0n);
             }
            }
            default: return JSON_Parser_invalidKey({a1: 'n', a2: $0.a2}, {a1: 'n', a2: $0.a2}, 0n);
           }
          }
          default: return JSON_Parser_invalidKey({a1: 'n', a2: $0.a2}, {a1: 'n', a2: $0.a2}, 0n);
         }
        }
        default: return JSON_Parser_invalidKey({a1: 'n', a2: $0.a2}, {a1: 'n', a2: $0.a2}, 0n);
       }
      }
      default: return JSON_Parser_invalidKey({a1: 'n', a2: $0.a2}, {a1: 'n', a2: $0.a2}, 0n);
     }
    }
    case 't': {
     switch($0.a2.h) {
      case undefined: /* cons */ {
       switch($0.a2.a1) {
        case 'r': {
         switch($0.a2.a2.h) {
          case undefined: /* cons */ {
           switch($0.a2.a2.a1) {
            case 'u': {
             switch($0.a2.a2.a2.h) {
              case undefined: /* cons */ {
               switch($0.a2.a2.a2.a1) {
                case 'e': return {h: 0 /* Succ */, a1: {h: 1 /* Lit */, a1: {h: 3 /* JBool */, a1: 1}}, a2: $0.a2.a2.a2.a2, a3: 4n};
                default: return JSON_Parser_invalidKey({a1: 't', a2: $0.a2}, {a1: 't', a2: $0.a2}, 0n);
               }
              }
              default: return JSON_Parser_invalidKey({a1: 't', a2: $0.a2}, {a1: 't', a2: $0.a2}, 0n);
             }
            }
            default: return JSON_Parser_invalidKey({a1: 't', a2: $0.a2}, {a1: 't', a2: $0.a2}, 0n);
           }
          }
          default: return JSON_Parser_invalidKey({a1: 't', a2: $0.a2}, {a1: 't', a2: $0.a2}, 0n);
         }
        }
        default: return JSON_Parser_invalidKey({a1: 't', a2: $0.a2}, {a1: 't', a2: $0.a2}, 0n);
       }
      }
      default: return JSON_Parser_invalidKey({a1: 't', a2: $0.a2}, {a1: 't', a2: $0.a2}, 0n);
     }
    }
    case 'f': {
     switch($0.a2.h) {
      case undefined: /* cons */ {
       switch($0.a2.a1) {
        case 'a': {
         switch($0.a2.a2.h) {
          case undefined: /* cons */ {
           switch($0.a2.a2.a1) {
            case 'l': {
             switch($0.a2.a2.a2.h) {
              case undefined: /* cons */ {
               switch($0.a2.a2.a2.a1) {
                case 's': {
                 switch($0.a2.a2.a2.a2.h) {
                  case undefined: /* cons */ {
                   switch($0.a2.a2.a2.a2.a1) {
                    case 'e': return {h: 0 /* Succ */, a1: {h: 1 /* Lit */, a1: {h: 3 /* JBool */, a1: 0}}, a2: $0.a2.a2.a2.a2.a2, a3: 5n};
                    default: return JSON_Parser_invalidKey({a1: 'f', a2: $0.a2}, {a1: 'f', a2: $0.a2}, 0n);
                   }
                  }
                  default: return JSON_Parser_invalidKey({a1: 'f', a2: $0.a2}, {a1: 'f', a2: $0.a2}, 0n);
                 }
                }
                default: return JSON_Parser_invalidKey({a1: 'f', a2: $0.a2}, {a1: 'f', a2: $0.a2}, 0n);
               }
              }
              default: return JSON_Parser_invalidKey({a1: 'f', a2: $0.a2}, {a1: 'f', a2: $0.a2}, 0n);
             }
            }
            default: return JSON_Parser_invalidKey({a1: 'f', a2: $0.a2}, {a1: 'f', a2: $0.a2}, 0n);
           }
          }
          default: return JSON_Parser_invalidKey({a1: 'f', a2: $0.a2}, {a1: 'f', a2: $0.a2}, 0n);
         }
        }
        default: return JSON_Parser_invalidKey({a1: 'f', a2: $0.a2}, {a1: 'f', a2: $0.a2}, 0n);
       }
      }
      default: return JSON_Parser_invalidKey({a1: 'f', a2: $0.a2}, {a1: 'f', a2: $0.a2}, 0n);
     }
    }
    default: {
     const $e4 = Text_Lex_Shift_number({h: 0}, {a1: $0.a1, a2: $0.a2});
     switch($e4.h) {
      case 0: /* Succ */ return {h: 0 /* Succ */, a1: JSON_Parser_numberToken($e4.a1), a2: $e4.a2, a3: $e4.a3};
      case 1: /* Stop */ return {h: 1 /* Fail */, a1: $e4.a1, a2: $e4.a2, a3: $e4.a3, a4: $e4.a4, a5: $e4.a5};
     }
    }
   }
  }
  case 0: /* nil */ return {h: 1 /* Fail */, a1: {h: 0}, a2: {h: 0}, a3: 0n, a4: 0n, a5: {h: 1 /* EOI */}};
 }
}

/* JSON.Parser.strLit : SnocList Char -> JSToken */
function JSON_Parser_strLit($0) {
 return {h: 1 /* Lit */, a1: {h: 4 /* JString */, a1: Prelude_Types_fastPack(Prelude_Types_SnocList_x3cx3ex3e($0, {h: 0}))}};
}

/* JSON.Parser.showValue : SnocList String -> JSON -> SnocList String */
function JSON_Parser_showValue($0, $1) {
 switch($1.h) {
  case 0: /* JNull */ return {a1: $0, a2: 'null'};
  case 1: /* JInteger */ return {a1: $0, a2: Prelude_Show_show_Show_Integer($1.a1)};
  case 2: /* JDouble */ return {a1: $0, a2: Prelude_Show_show_Show_Double($1.a1)};
  case 3: /* JBool */ {
   switch($1.a1) {
    case 1: return {a1: $0, a2: 'true'};
    case 0: return {a1: $0, a2: 'false'};
   }
  }
  case 4: /* JString */ return {a1: $0, a2: JSON_Parser_encode($1.a1)};
  case 5: /* JArray */ {
   switch($1.a1.h) {
    case 0: /* nil */ return {a1: $0, a2: '[]'};
    case undefined: /* cons */ {
     const $19 = JSON_Parser_showValue({a1: $0, a2: '['}, $1.a1.a1);
     return JSON_Parser_showArray($19, $1.a1.a2);
    }
   }
  }
  case 6: /* JObject */ {
   switch($1.a1.h) {
    case 0: /* nil */ return {a1: $0, a2: '{}'};
    case undefined: /* cons */ {
     const $25 = JSON_Parser_showPair({a1: $0, a2: '{'}, $1.a1.a1);
     return JSON_Parser_showObject($25, $1.a1.a2);
    }
   }
  }
 }
}

/* JSON.Parser.showPrecJSToken : Prec -> JSToken -> String */
function JSON_Parser_showPrecJSToken($0, $1) {
 switch($1.h) {
  case 0: /* Symbol */ return Derive_Show_conWithArgs($0, 'Symbol', {a1: Prelude_Show_showArg(csegen_218(), $1.a1), a2: {h: 0}});
  case 1: /* Lit */ return Derive_Show_conWithArgs($0, 'Lit', {a1: Prelude_Show_showArg({a1: x => JSON_Parser_showImpl(x), a2: d => x => JSON_Parser_showImpl(x)}, $1.a1), a2: {h: 0}});
  case 2: /* EOI */ return 'EOI';
 }
}

/* JSON.Parser.showPrecJSErr : Prec -> JSErr -> String */
function JSON_Parser_showPrecJSErr($0, $1) {
 switch($1) {
  case 0: return 'ExpectedString';
  case 1: return 'InvalidEscape';
 }
}

/* JSON.Parser.showPair : SnocList String -> (String, JSON) -> SnocList String */
function JSON_Parser_showPair($0, $1) {
 return JSON_Parser_showValue({a1: {a1: $0, a2: JSON_Parser_encode($1.a1)}, a2: ':'}, $1.a2);
}

/* JSON.Parser.showImpl : JSON -> String */
function JSON_Parser_showImpl($0) {
 return Prelude_Types_fastConcat(Prelude_Types_SnocList_x3cx3ex3e(JSON_Parser_showValue({h: 0}, $0), {h: 0}));
}

/* JSON.Parser.parseJSON : Origin -> String -> Either (FileContext, ParseErr) JSON */
function JSON_Parser_parseJSON($0, $1) {
 return JSON_Parser_case__parseJSON_7095($1, $0, JSON_Parser_lexJSON($1));
}

/* JSON.Parser.numberToken : SnocList Char -> JSToken */
function JSON_Parser_numberToken($0) {
 const $3 = c => {
  switch(Prelude_EqOrd_x3dx3d_Eq_Char(c, '.')) {
   case 1: return 1;
   case 0: {
    switch(Prelude_EqOrd_x3dx3d_Eq_Char(c, 'e')) {
     case 1: return 1;
     case 0: return Prelude_EqOrd_x3dx3d_Eq_Char(c, 'E');
    }
   }
  }
 };
 const $1 = Data_SnocList_find($3, $0);
 switch($1.h) {
  case undefined: /* just */ return JSON_Parser_toToken($12 => _numberOfString($12), $15 => ({h: 2 /* JDouble */, a1: $15}), $0);
  case 0: /* nothing */ return JSON_Parser_toToken($1a => _bigIntOfString($1a), $1d => ({h: 1 /* JInteger */, a1: $1d}), $0);
 }
}

/* JSON.Parser.lexJSON : String -> Either (Bounded ParseErr) (List (Bounded JSToken)) */
function JSON_Parser_lexJSON($0) {
 return JSON_Parser_go({h: 0}, Text_Bounds_begin(), Prelude_Types_fastUnpack($0));
}

/* JSON.Parser.hexChar : Integer -> Char */
function JSON_Parser_hexChar($0) {
 switch($0) {
  case 0n: return '0';
  case 1n: return '1';
  case 2n: return '2';
  case 3n: return '3';
  case 4n: return '4';
  case 5n: return '5';
  case 6n: return '6';
  case 7n: return '7';
  case 8n: return '8';
  case 9n: return '9';
  case 10n: return 'a';
  case 11n: return 'b';
  case 12n: return 'c';
  case 13n: return 'd';
  case 14n: return 'e';
  default: return 'f';
 }
}

/* JSON.Parser.escape : SnocList Char -> Char -> SnocList Char */
function JSON_Parser_escape($0, $1) {
 switch($1) {
  case '\"': return {a1: {a1: $0, a2: '\u{5c}'}, a2: '\"'};
  case '\n': return {a1: {a1: $0, a2: '\u{5c}'}, a2: 'n'};
  case '\u{c}': return {a1: {a1: $0, a2: '\u{5c}'}, a2: 'f'};
  case '\u{8}': return {a1: {a1: $0, a2: '\u{5c}'}, a2: 'b'};
  case '\r': return {a1: {a1: $0, a2: '\u{5c}'}, a2: 'r'};
  case '\u{9}': return {a1: {a1: $0, a2: '\u{5c}'}, a2: 't'};
  case '\u{5c}': return {a1: {a1: $0, a2: '\u{5c}'}, a2: '\u{5c}'};
  case '/': return {a1: {a1: $0, a2: '\u{5c}'}, a2: '/'};
  default: {
   switch(Prelude_Types_isControl($1)) {
    case 1: {
     const $26 = BigInt($1.codePointAt(0));
     const $28 = JSON_Parser_hexChar(Prelude_Num_div_Integral_Integer($26, 4096n));
     const $2e = JSON_Parser_hexChar(Prelude_Num_div_Integral_Integer(Prelude_Num_mod_Integral_Integer($26, 4096n), 256n));
     const $37 = JSON_Parser_hexChar(Prelude_Num_div_Integral_Integer(Prelude_Num_mod_Integral_Integer($26, 256n), 16n));
     const $40 = JSON_Parser_hexChar(Prelude_Num_mod_Integral_Integer($26, 16n));
     return {a1: {a1: {a1: {a1: {a1: {a1: $0, a2: '\u{5c}'}, a2: 'u'}, a2: $28}, a2: $2e}, a2: $37}, a2: $40};
    }
    case 0: return {a1: $0, a2: $1};
   }
  }
 }
}

/* JSON.Parser.eqJSToken : JSToken -> JSToken -> Bool */
function JSON_Parser_eqJSToken($0, $1) {
 switch($0.h) {
  case 0: /* Symbol */ {
   switch($1.h) {
    case 0: /* Symbol */ return Prelude_EqOrd_x3dx3d_Eq_Char($0.a1, $1.a1);
    default: return 0;
   }
  }
  case 1: /* Lit */ {
   switch($1.h) {
    case 1: /* Lit */ return JSON_Parser_eqJSON($0.a1, $1.a1);
    default: return 0;
   }
  }
  case 2: /* EOI */ {
   switch($1.h) {
    case 2: /* EOI */ return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* JSON.Parser.eqJSON : JSON -> JSON -> Bool */
function JSON_Parser_eqJSON($0, $1) {
 switch($0.h) {
  case 0: /* JNull */ {
   switch($1.h) {
    case 0: /* JNull */ return 1;
    default: return 0;
   }
  }
  case 1: /* JInteger */ {
   switch($1.h) {
    case 1: /* JInteger */ return Prelude_EqOrd_x3dx3d_Eq_Integer($0.a1, $1.a1);
    default: return 0;
   }
  }
  case 2: /* JDouble */ {
   switch($1.h) {
    case 2: /* JDouble */ return Prelude_EqOrd_x3dx3d_Eq_Double($0.a1, $1.a1);
    default: return 0;
   }
  }
  case 3: /* JBool */ {
   switch($1.h) {
    case 3: /* JBool */ return Prelude_EqOrd_x3dx3d_Eq_Bool($0.a1, $1.a1);
    default: return 0;
   }
  }
  case 4: /* JString */ {
   switch($1.h) {
    case 4: /* JString */ return Prelude_EqOrd_x3dx3d_Eq_String($0.a1, $1.a1);
    default: return 0;
   }
  }
  case 5: /* JArray */ {
   switch($1.h) {
    case 5: /* JArray */ return Prelude_Types_x3dx3d_Eq_x28Listx20x24ax29(csegen_224(), $0.a1, $1.a1);
    default: return 0;
   }
  }
  case 6: /* JObject */ {
   switch($1.h) {
    case 6: /* JObject */ return Prelude_Types_x3dx3d_Eq_x28Listx20x24ax29({a1: $1e => $1f => Prelude_EqOrd_x3dx3d_Eq_x28x7cx28x28Builtinx2ePairx20x24ax29x20x24bx29x2cx28x28Builtinx2eMkPairx20x24ax29x20x24bx29x7cx29(csegen_9(), csegen_224(), $1e, $1f), a2: $28 => $29 => Prelude_EqOrd_x2fx3d_Eq_x28x7cx28x28Builtinx2ePairx20x24ax29x20x24bx29x2cx28x28Builtinx2eMkPairx20x24ax29x20x24bx29x7cx29(csegen_9(), csegen_224(), $28, $29)}, $0.a1, $1.a1);
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* JSON.Parser.encode : String -> String */
function JSON_Parser_encode($0) {
 return Prelude_Types_fastPack(Prelude_Types_SnocList_x3cx3ex3e(Prelude_Types_foldl_Foldable_List($7 => $8 => JSON_Parser_escape($7, $8), {a1: {h: 0}, a2: '\"'}, Prelude_Types_fastUnpack($0)), {a1: '\"', a2: {h: 0}}));
}

/* Text.Lex.Shift.weakens : ShiftRes True st ts -> ShiftRes x st ts */
function Text_Lex_Shift_weakens($0) {
 switch($0.h) {
  case 0: /* Succ */ return {h: 0 /* Succ */, a1: $0.a1, a2: $0.a2, a3: Data_List_Shift_weakens($0.a3)};
  case 1: /* Stop */ return {h: 1 /* Stop */, a1: $0.a1, a2: $0.a2, a3: $0.a3, a4: $0.a4, a5: $0.a5};
 }
}

/* Text.Lex.Shift.rest : AutoShift False */
function Text_Lex_Shift_rest($0, $1, $2, $3) {
 switch($2.h) {
  case undefined: /* cons */ {
   switch($2.a1) {
    case '.': {
     switch($2.a2.h) {
      case undefined: /* cons */ {
       switch(Prelude_Types_isDigit($2.a2.a1)) {
        case 1: return Text_Lex_Shift_dot($0, {a1: {a1: $1, a2: '.'}, a2: $2.a2.a1}, $2.a2.a2, (($3+1n)+1n));
        case 0: return {h: 1 /* Stop */, a1: $0, a2: {a1: $2.a2.a1, a2: $2.a2.a2}, a3: ($3+1n), a4: 1n, a5: {h: 3 /* ExpectedChar */, a1: {h: 1 /* Digit */, a1: 2}}};
       }
      }
      case 0: /* nil */ return Text_Lex_Shift_eoiAt($0, ($3+1n));
      default: return Text_Lex_Shift_exp($0, $1, $2, $3);
     }
    }
    default: return Text_Lex_Shift_exp($0, $1, $2, $3);
   }
  }
  default: return Text_Lex_Shift_exp($0, $1, $2, $3);
 }
}

/* Text.Lex.Shift.number : Shifter True */
function Text_Lex_Shift_number($0, $1) {
 switch($1.h) {
  case undefined: /* cons */ {
   switch($1.a1) {
    case '-': {
     switch($1.a2.h) {
      case undefined: /* cons */ {
       switch($1.a2.a1) {
        case '0': return Text_Lex_Shift_rest({a1: '-', a2: {a1: '0', a2: $1.a2.a2}}, {a1: {a1: $0, a2: '-'}, a2: '0'}, $1.a2.a2, 2n);
        default: {
         switch(Prelude_Types_isDigit($1.a2.a1)) {
          case 1: return Text_Lex_Shift_digs({a1: '-', a2: {a1: $1.a2.a1, a2: $1.a2.a2}}, {a1: {a1: $0, a2: '-'}, a2: $1.a2.a1}, $1.a2.a2, 2n);
          case 0: return {h: 1 /* Stop */, a1: {a1: '-', a2: {a1: $1.a2.a1, a2: $1.a2.a2}}, a2: {a1: $1.a2.a1, a2: $1.a2.a2}, a3: 1n, a4: 1n, a5: {h: 3 /* ExpectedChar */, a1: {h: 1 /* Digit */, a1: 2}}};
         }
        }
       }
      }
      default: {
       switch(Prelude_Types_isDigit($1.a1)) {
        case 1: return Text_Lex_Shift_digs({a1: $1.a1, a2: $1.a2}, {a1: $0, a2: $1.a1}, $1.a2, 1n);
        case 0: return {h: 1 /* Stop */, a1: {a1: $1.a1, a2: $1.a2}, a2: {a1: $1.a1, a2: $1.a2}, a3: 0n, a4: 1n, a5: {h: 10 /* Unknown */, a1: {h: 0 /* Left */, a1: Prelude_Types_fastPack(Data_List_Suffix_takePrefix({a1: $1.a1, a2: $1.a2}, 1n))}}};
       }
      }
     }
    }
    case '0': return Text_Lex_Shift_rest({a1: '0', a2: $1.a2}, {a1: $0, a2: '0'}, $1.a2, 1n);
    default: {
     switch(Prelude_Types_isDigit($1.a1)) {
      case 1: return Text_Lex_Shift_digs({a1: $1.a1, a2: $1.a2}, {a1: $0, a2: $1.a1}, $1.a2, 1n);
      case 0: return {h: 1 /* Stop */, a1: {a1: $1.a1, a2: $1.a2}, a2: {a1: $1.a1, a2: $1.a2}, a3: 0n, a4: 1n, a5: {h: 10 /* Unknown */, a1: {h: 0 /* Left */, a1: Prelude_Types_fastPack(Data_List_Suffix_takePrefix({a1: $1.a1, a2: $1.a2}, 1n))}}};
     }
    }
   }
  }
  case 0: /* nil */ return Text_Lex_Shift_eoiAt({h: 0}, 0n);
 }
}

/* Text.Lex.Shift.intPlus : AutoShift True */
function Text_Lex_Shift_intPlus($0, $1, $2, $3) {
 switch($2.h) {
  case undefined: /* cons */ {
   switch($2.a1) {
    case '+': return Text_Lex_Shift_digits1($0, {a1: $1, a2: '+'}, $2.a2, ($3+1n));
    default: return Text_Lex_Shift_int($0, $1, $2, $3);
   }
  }
  default: return Text_Lex_Shift_int($0, $1, $2, $3);
 }
}

/* Text.Lex.Shift.int : AutoShift True */
function Text_Lex_Shift_int($0, $1, $2, $3) {
 switch($2.h) {
  case undefined: /* cons */ {
   switch($2.a1) {
    case '-': return Text_Lex_Shift_digits1($0, {a1: $1, a2: '-'}, $2.a2, ($3+1n));
    default: return Text_Lex_Shift_digits1($0, $1, $2, $3);
   }
  }
  default: return Text_Lex_Shift_digits1($0, $1, $2, $3);
 }
}

/* Text.Lex.Shift.exp : AutoShift False */
function Text_Lex_Shift_exp($0, $1, $2, $3) {
 switch($2.h) {
  case undefined: /* cons */ {
   switch($2.a1) {
    case 'e': return Text_Lex_Shift_weakens(Text_Lex_Shift_intPlus($0, {a1: $1, a2: 'e'}, $2.a2, ($3+1n)));
    case 'E': return Text_Lex_Shift_weakens(Text_Lex_Shift_intPlus($0, {a1: $1, a2: 'E'}, $2.a2, ($3+1n)));
    default: {
     switch(Prelude_Types_isDigit($2.a1)) {
      case 1: return {h: 1 /* Stop */, a1: $0, a2: $0, a3: 0n, a4: ($3+1n), a5: {h: 10 /* Unknown */, a1: {h: 0 /* Left */, a1: Prelude_Types_fastPack(Data_List_Suffix_takePrefix($0, ($3+1n)))}}};
      case 0: return {h: 0 /* Succ */, a1: $1, a2: {a1: $2.a1, a2: $2.a2}, a3: $3};
     }
    }
   }
  }
  case 0: /* nil */ return {h: 0 /* Succ */, a1: $1, a2: {h: 0}, a3: $3};
 }
}

/* Text.Lex.Shift.eoiAt : Shift b1 Char ruc [] giro orig -> ShiftRes b2 giro orig */
function Text_Lex_Shift_eoiAt($0, $1) {
 return {h: 1 /* Stop */, a1: $0, a2: {h: 0}, a3: $1, a4: 0n, a5: {h: 1 /* EOI */}};
}

/* Text.Lex.Shift.digits1 : AutoShift True */
function Text_Lex_Shift_digits1($0, $1, $2, $3) {
 switch($2.h) {
  case undefined: /* cons */ {
   switch(Prelude_Types_isDigit($2.a1)) {
    case 1: return Text_Lex_Shift_digits($0, {a1: $1, a2: $2.a1}, $2.a2, ($3+1n));
    case 0: return {h: 1 /* Stop */, a1: $0, a2: {a1: $2.a1, a2: $2.a2}, a3: $3, a4: 1n, a5: {h: 3 /* ExpectedChar */, a1: {h: 1 /* Digit */, a1: 2}}};
   }
  }
  case 0: /* nil */ return Text_Lex_Shift_eoiAt($0, $3);
 }
}

/* Data.List.Shift.weakens : Shift True t sx xs sy ys -> Shift b t sx xs sy ys */
function Data_List_Shift_weakens($0) {
 switch($0) {
  case 0n: _crashExp('Nat case not covered');
  default: {
   const $2 = ($0-1n);
   return ($2+1n);
  }
 }
}

/* Data.List.Suffix.takePrefix : (ys : List t) -> Suffix b xs ys -> List t */
function Data_List_Suffix_takePrefix($0, $1) {
 switch($1) {
  case 0n: return {h: 0};
  default: {
   switch($0.h) {
    case undefined: /* cons */ {
     switch($1) {
      case 0n: _crashExp('Nat case not covered');
      default: {
       const $5 = ($1-1n);
       return {a1: $0.a1, a2: Data_List_Suffix_takePrefix($0.a2, $5)};
      }
     }
    }
    case 0: /* nil */ {
     switch($1) {
      case 0n: _crashExp('Nat case not covered');
      default: {
       const $e = ($1-1n);
       return Prelude_Uninhabited_absurd($13 => Data_List_Suffix_uninhabited_Uninhabited_x28x28x28Suffixx20x24bx29x20x28x28x3ax3ax20x24hx29x20x24tx29x29x20Nilx29($13), $e);
      }
     }
    }
   }
  }
 }
}

/* Text.Lex.Manual.case block in hexDigit */
function Text_Lex_Manual_case__hexDigit_4164($0, $1) {
 switch($1) {
  case 'a': return 10n;
  case 'b': return 11n;
  case 'c': return 12n;
  case 'd': return 13n;
  case 'e': return 14n;
  case 'f': return 15n;
  default: return Text_Lex_Manual_digit($1);
 }
}

/* Text.Lex.Manual.octDigit : Char -> Nat */
function Text_Lex_Manual_octDigit($0) {
 switch($0) {
  case '0': return 0n;
  case '1': return 1n;
  case '2': return 2n;
  case '3': return 3n;
  case '4': return 4n;
  case '5': return 5n;
  case '6': return 6n;
  default: return 7n;
 }
}

/* Text.Lex.Manual.hexDigit : Char -> Nat */
function Text_Lex_Manual_hexDigit($0) {
 return Text_Lex_Manual_case__hexDigit_4164($0, Prelude_Types_toLower($0));
}

/* Text.Lex.Manual.digit : Char -> Nat */
function Text_Lex_Manual_digit($0) {
 switch($0) {
  case '8': return 8n;
  case '9': return 9n;
  default: return Text_Lex_Manual_octDigit($0);
 }
}

/* Text.ParseError.showPrecParseError : Show err => Show token => Prec -> ParseError token err -> String */
function Text_ParseError_showPrecParseError($0, $1, $2, $3) {
 switch($3.h) {
  case 0: /* Custom */ return Derive_Show_recordWithArgs($2, 'Custom', {a1: {a1: 'err', a2: $0.a1($3.a1)}, a2: {h: 0}});
  case 1: /* EOI */ return 'EOI';
  case 2: /* Expected */ return Derive_Show_conWithArgs($2, 'Expected', {a1: Prelude_Show_showArg({a1: x => Prelude_Show_show_Show_x28x28Eitherx20x24ax29x20x24bx29({a1: csegen_1(), a2: $1}, x), a2: d => x => Prelude_Show_showPrec_Show_x28x28Eitherx20x24ax29x20x24bx29({a1: csegen_1(), a2: $1}, d, x)}, $3.a1), a2: {h: 0}});
  case 3: /* ExpectedChar */ return Derive_Show_conWithArgs($2, 'ExpectedChar', {a1: Prelude_Show_showArg(Language_Reflection_Derive_mkShowPrec($31 => $32 => Text_ParseError_showPrecCharClass($31, $32)), $3.a1), a2: {h: 0}});
  case 4: /* ExpectedEOI */ return 'ExpectedEOI';
  case 5: /* InvalidControl */ return Derive_Show_conWithArgs($2, 'InvalidControl', {a1: Prelude_Show_showArg(csegen_218(), $3.a1), a2: {h: 0}});
  case 6: /* InvalidEscape */ return 'InvalidEscape';
  case 7: /* OutOfBounds */ return Derive_Show_conWithArgs($2, 'OutOfBounds', {a1: Prelude_Show_showArg({a1: x => Prelude_Show_show_Show_x28x28Eitherx20x24ax29x20x24bx29({a1: csegen_1(), a2: $1}, x), a2: d => x => Prelude_Show_showPrec_Show_x28x28Eitherx20x24ax29x20x24bx29({a1: csegen_1(), a2: $1}, d, x)}, $3.a1), a2: {h: 0}});
  case 8: /* Unclosed */ return Derive_Show_conWithArgs($2, 'Unclosed', {a1: Prelude_Show_showArg({a1: x => Prelude_Show_show_Show_x28x28Eitherx20x24ax29x20x24bx29({a1: csegen_1(), a2: $1}, x), a2: d => x => Prelude_Show_showPrec_Show_x28x28Eitherx20x24ax29x20x24bx29({a1: csegen_1(), a2: $1}, d, x)}, $3.a1), a2: {h: 0}});
  case 9: /* Unexpected */ return Derive_Show_conWithArgs($2, 'Unexpected', {a1: Prelude_Show_showArg({a1: x => Prelude_Show_show_Show_x28x28Eitherx20x24ax29x20x24bx29({a1: csegen_1(), a2: $1}, x), a2: d => x => Prelude_Show_showPrec_Show_x28x28Eitherx20x24ax29x20x24bx29({a1: csegen_1(), a2: $1}, d, x)}, $3.a1), a2: {h: 0}});
  case 10: /* Unknown */ return Derive_Show_conWithArgs($2, 'Unknown', {a1: Prelude_Show_showArg({a1: x => Prelude_Show_show_Show_x28x28Eitherx20x24ax29x20x24bx29({a1: csegen_1(), a2: $1}, x), a2: d => x => Prelude_Show_showPrec_Show_x28x28Eitherx20x24ax29x20x24bx29({a1: csegen_1(), a2: $1}, d, x)}, $3.a1), a2: {h: 0}});
 }
}

/* Text.ParseError.showPrecDigitType : Prec -> DigitType -> String */
function Text_ParseError_showPrecDigitType($0, $1) {
 switch($1) {
  case 0: return 'Bin';
  case 1: return 'Oct';
  case 2: return 'Dec';
  case 3: return 'Hex';
 }
}

/* Text.ParseError.showPrecCharClass : Prec -> CharClass -> String */
function Text_ParseError_showPrecCharClass($0, $1) {
 switch($1.h) {
  case 0: /* Space */ return 'Space';
  case 1: /* Digit */ return Derive_Show_conWithArgs($0, 'Digit', {a1: Prelude_Show_showArg(Language_Reflection_Derive_mkShowPrec($c => $d => Text_ParseError_showPrecDigitType($c, $d)), $1.a1), a2: {h: 0}});
  case 2: /* Upper */ return 'Upper';
  case 3: /* Lower */ return 'Lower';
  case 4: /* Alpha */ return 'Alpha';
  case 5: /* AlphaNum */ return 'AlphaNum';
 }
}

/* Text.ParseError.failInParenEOI : Bounds -> t -> (t -> Bool) -> Result0 b1 (Bounded t) ts (Bounded (ParseError t y)) a -> Result0 b2 (Bounded t) ts (Bounded (ParseError t y)) x */
function Text_ParseError_failInParenEOI($0, $1, $2, $3) {
 switch($3.h) {
  case 1: /* Fail0 */ {
   switch($3.a1.h) {
    case undefined: /* cons */ {
     switch($3.a1.a1.h) {
      case 9: /* Unexpected */ {
       switch($3.a1.a1.a1.h) {
        case 1: /* Right */ {
         const $8 = {h: 1 /* Fail0 */, a1: {a1: {h: 9 /* Unexpected */, a1: {h: 1 /* Right */, a1: $3.a1.a1.a1.a1}}, a2: $3.a1.a2}};
         switch($2($3.a1.a1.a1.a1)) {
          case 1: return csegen_235()($0)({h: 8 /* Unclosed */, a1: {h: 1 /* Right */, a1: $1}});
          case 0: return Text_ParseError_failInParen($0, $1, $8);
         }
        }
        default: return Text_ParseError_failInParen($0, $1, $3);
       }
      }
      default: return Text_ParseError_failInParen($0, $1, $3);
     }
    }
    default: return Text_ParseError_failInParen($0, $1, $3);
   }
  }
  case 0: /* Succ0 */ {
   switch($3.a2.h) {
    case undefined: /* cons */ {
     switch($3.a2.a1.h) {
      case undefined: /* cons */ {
       const $2a = {h: 0 /* Succ0 */, a1: $3.a1, a2: {a1: {a1: $3.a2.a1.a1, a2: $3.a2.a1.a2}, a2: $3.a2.a2}};
       switch($2($3.a2.a1.a1)) {
        case 1: return csegen_235()($0)({h: 8 /* Unclosed */, a1: {h: 1 /* Right */, a1: $1}});
        case 0: return Text_ParseError_failInParen($0, $1, $2a);
       }
      }
      default: return Text_ParseError_failInParen($0, $1, $3);
     }
    }
    default: return Text_ParseError_failInParen($0, $1, $3);
   }
  }
  default: return Text_ParseError_failInParen($0, $1, $3);
 }
}

/* Text.ParseError.failInParen : Bounds -> t -> Result0 b1 (Bounded t) ts (Bounded (ParseError t y)) a -> Result0 b2 (Bounded t) ts (Bounded (ParseError t y)) x */
function Text_ParseError_failInParen($0, $1, $2) {
 switch($2.h) {
  case 1: /* Fail0 */ {
   switch($2.a1.h) {
    case undefined: /* cons */ {
     switch($2.a1.a1.h) {
      case 1: /* EOI */ return csegen_235()($0)({h: 8 /* Unclosed */, a1: {h: 1 /* Right */, a1: $1}});
      default: return {h: 1 /* Fail0 */, a1: $2.a1};
     }
    }
    default: return {h: 1 /* Fail0 */, a1: $2.a1};
   }
  }
  case 0: /* Succ0 */ {
   switch($2.a2.h) {
    case 0: /* nil */ return csegen_235()($0)({h: 8 /* Unclosed */, a1: {h: 1 /* Right */, a1: $1}});
    case undefined: /* cons */ return csegen_235()($2.a2.a1.a2)({h: 9 /* Unexpected */, a1: {h: 1 /* Right */, a1: $2.a2.a1.a1}});
   }
  }
 }
}

/* Text.ParseError.fail : List (Bounded t) -> Result0 b (Bounded t) ts (Bounded (ParseError t y)) a */
function Text_ParseError_fail($0) {
 switch($0.h) {
  case undefined: /* cons */ return csegen_235()($0.a1.a2)({h: 9 /* Unexpected */, a1: {h: 1 /* Right */, a1: $0.a1.a1}});
  case 0: /* nil */ return csegen_235()({h: 0})({h: 1 /* EOI */});
 }
}

/* Text.FC.showPrecOrigin : Prec -> Origin -> String */
function Text_FC_showPrecOrigin($0, $1) {
 switch($1.h) {
  case undefined: /* just */ return Derive_Show_recordWithArgs($0, 'FileSrc', {a1: {a1: 'path', a2: Prelude_Show_show_Show_String($1.a1)}, a2: {h: 0}});
  case 0: /* nothing */ return 'Virtual';
 }
}

/* Text.FC.showPrecFileContext : Prec -> FileContext -> String */
function Text_FC_showPrecFileContext($0, $1) {
 const $a = Language_Reflection_Derive_mkShowPrec($d => $e => Text_FC_showPrecOrigin($d, $e));
 const $9 = $a.a1($1.a1);
 const $7 = {a1: 'origin', a2: $9};
 const $18 = Language_Reflection_Derive_mkShowPrec($1b => $1c => Text_Bounds_showPrecBounds($1b, $1c));
 const $17 = $18.a1($1.a2);
 const $15 = {a1: 'bounds', a2: $17};
 const $14 = {a1: $15, a2: {h: 0}};
 const $6 = {a1: $7, a2: $14};
 return Derive_Show_recordWithArgs($0, 'FC', $6);
}

/* Text.Bounds.map */
function Text_Bounds_map_Functor_Bounded($0, $1) {
 return {a1: $0($1.a1), a2: $1.a2};
}

/* Text.Bounds.showPrecPosition : Prec -> Position -> String */
function Text_Bounds_showPrecPosition($0, $1) {
 return Derive_Show_recordWithArgs($0, 'P', {a1: {a1: 'line', a2: Prelude_Show_show_Show_Nat($1.a1)}, a2: {a1: {a1: 'col', a2: Prelude_Show_show_Show_Nat($1.a2)}, a2: {h: 0}}});
}

/* Text.Bounds.showPrecBounds : Prec -> Bounds -> String */
function Text_Bounds_showPrecBounds($0, $1) {
 switch($1.h) {
  case undefined: /* cons */ {
   const $a = csegen_243();
   const $9 = $a.a1($1.a1);
   const $7 = {a1: 'start', a2: $9};
   const $12 = csegen_243();
   const $11 = $12.a1($1.a2);
   const $f = {a1: 'end', a2: $11};
   const $e = {a1: $f, a2: {h: 0}};
   const $6 = {a1: $7, a2: $e};
   return Derive_Show_recordWithArgs($0, 'BS', $6);
  }
  case 0: /* nil */ return 'NoBounds';
 }
}

/* Text.Bounds.boundedErr : Position -> Suffix False errStart ts -> (0 errEnd : List Char) ->
Suffix False errEnd errStart => e -> Bounded e */
function Text_Bounds_boundedErr($0, $1, $2, $3, $4, $5) {
 const $6 = Text_Bounds_calcEnd($2.a1, $2.a2, $0, $3);
 const $e = Text_Bounds_calcEnd($6.a1, $6.a2, $1, $4);
 return Text_Bounds_bounded($5, $6, $e);
}

/* Text.Bounds.bounded : a -> Position -> Position -> Bounded a */
function Text_Bounds_bounded($0, $1, $2) {
 return {a1: $0, a2: {a1: $1, a2: $2}};
}

/* Text.Bounds.begin : Position */
const Text_Bounds_begin = __lazy(function () {
 return {a1: 0n, a2: 0n};
});

/* Language.Reflection.Derive.mkShowPrec : (Prec -> a -> String) -> Show a */
function Language_Reflection_Derive_mkShowPrec($0) {
 return {a1: $0({h: 0 /* Open */}), a2: $0};
}

/* Derive.Show.recordWithArgs : Prec -> String -> List (String, String) -> String */
function Derive_Show_recordWithArgs($0, $1, $2) {
 switch($2.h) {
  case 0: /* nil */ return $1;
  default: {
   const $4 = Prelude_Types_foldMap_Foldable_List(csegen_245(), $9 => $9, Data_List_intersperse(', ', Prelude_Types_List_mapAppend({h: 0}, $11 => Prelude_Types_foldMap_Foldable_List(csegen_245(), $17 => $17, {a1: $11.a1, a2: {a1: ' = ', a2: {a1: $11.a2, a2: {h: 0}}}}), $2)));
   return Prelude_Show_showCon($0, $1, Prelude_Types_foldMap_Foldable_List(csegen_245(), $28 => $28, {a1: ' {', a2: {a1: $4, a2: {a1: '}', a2: {h: 0}}}}));
  }
 }
}

/* Derive.Show.conWithArgs : Prec -> String -> List String -> String */
function Derive_Show_conWithArgs($0, $1, $2) {
 switch($2.h) {
  case 0: /* nil */ return $1;
  default: return Prelude_Show_showCon($0, $1, Prelude_Types_foldMap_Foldable_List(csegen_245(), $c => $c, $2));
 }
}

/* JSON.FromJSON.case block in decodeVia */
function JSON_FromJSON_case__decodeVia_4634($0, $1, $2, $3) {
 switch($3.h) {
  case 1: /* Right */ {
   const $5 = $1(undefined)(undefined)($0)($3.a1);
   switch($5.h) {
    case 1: /* Right */ return {h: 1 /* Right */, a1: $5.a1};
    case 0: /* Left */ return {h: 0 /* Left */, a1: {h: 0 /* JErr */, a1: $5.a1}};
   }
  }
  case 0: /* Left */ return {h: 0 /* Left */, a1: {h: 1 /* JParseErr */, a1: $3.a1}};
 }
}

/* JSON.FromJSON.fromJSON */
function JSON_FromJSON_fromJSON_FromJSON_String($0, $1) {
 return JSON_FromJSON_withValue($0, 'String', $6 => $0.a9($6), () => 'String', $c => ({h: 1 /* Right */, a1: $c}), $1);
}

/* JSON.FromJSON.fromJSON */
function JSON_FromJSON_fromJSON_FromJSON_x28Listx20x24ax29($0, $1, $2) {
 const $c = $d => {
  const $10 = b => a => func => $11 => {
   switch($11.h) {
    case 0: /* Left */ return {h: 0 /* Left */, a1: $11.a1};
    case 1: /* Right */ return {h: 1 /* Right */, a1: func($11.a1)};
   }
  };
  const $1a = b => a => $1b => $1c => {
   switch($1b.h) {
    case 0: /* Left */ return {h: 0 /* Left */, a1: $1b.a1};
    case 1: /* Right */ {
     switch($1c.h) {
      case 1: /* Right */ return {h: 1 /* Right */, a1: $1b.a1($1c.a1)};
      case 0: /* Left */ return {h: 0 /* Left */, a1: $1c.a1};
     }
    }
   }
  };
  const $f = {a1: $10, a2: a => $18 => ({h: 1 /* Right */, a1: $18}), a3: $1a};
  return Prelude_Types_traverse_Traversable_List($f, $0(undefined)(undefined)($1), $d);
 };
 return JSON_FromJSON_withValue($1, 'Array', $7 => $1.a5($7), () => 'List', $c, $2);
}

/* JSON.FromJSON.withValue : Value v obj =>
String -> (v -> Maybe t) -> Lazy String -> Parser t a -> Parser v a */
function JSON_FromJSON_withValue($0, $1, $2, $3, $4, $5) {
 const $6 = $2($5);
 switch($6.h) {
  case undefined: /* just */ return $4($6.a1);
  case 0: /* nothing */ {
   const $b = JSON_FromJSON_typeMismatch($0, $1, $5);
   switch($b.h) {
    case 0: /* Left */ return {h: 0 /* Left */, a1: {a1: $b.a1.a1, a2: (Prelude_Types_foldMap_Foldable_List(csegen_245(), $19 => $19, {a1: 'parsing ', a2: {a1: $3(), a2: {a1: ' failed, ', a2: {h: 0}}}})+$b.a1.a2)}};
    case 1: /* Right */ return {h: 1 /* Right */, a1: $b.a1};
   }
  }
 }
}

/* JSON.FromJSON.typeMismatch : Value v obj => String -> Parser v a */
function JSON_FromJSON_typeMismatch($0, $1, $2) {
 return {h: 0 /* Left */, a1: {a1: {h: 0}, a2: Prelude_Types_foldMap_Foldable_List(csegen_245(), $a => $a, {a1: 'expected ', a2: {a1: $1, a2: {a1: ', but encountered ', a2: {a1: $0.a2($2), a2: {h: 0}}}}})}};
}

/* JSON.FromJSON.showPrecJSONPathElement : Prec -> JSONPathElement -> String */
function JSON_FromJSON_showPrecJSONPathElement($0, $1) {
 switch($1.h) {
  case 0: /* Key */ return Derive_Show_conWithArgs($0, 'Key', {a1: Prelude_Show_showArg(csegen_1(), $1.a1), a2: {h: 0}});
  case 1: /* Index */ return Derive_Show_conWithArgs($0, 'Index', {a1: Prelude_Show_showArg({a1: x => Prelude_Show_show_Show_Bits32(x), a2: d => x => Prelude_Show_showPrec_Show_Bits32(d, x)}, $1.a1), a2: {h: 0}});
 }
}

/* JSON.FromJSON.showPrecDecodingErr : Prec -> DecodingErr -> String */
function JSON_FromJSON_showPrecDecodingErr($0, $1) {
 switch($1.h) {
  case 0: /* JErr */ return Derive_Show_conWithArgs($0, 'JErr', {a1: Prelude_Show_showArg({a1: x => Prelude_Show_show_Show_x28x7cx28x28Builtinx2ePairx20x24ax29x20x24bx29x2cx28x28Builtinx2eMkPairx20x24ax29x20x24bx29x7cx29(csegen_254(), x), a2: d => x => Prelude_Show_showPrec_Show_x28x7cx28x28Builtinx2ePairx20x24ax29x20x24bx29x2cx28x28Builtinx2eMkPairx20x24ax29x20x24bx29x7cx29(csegen_254(), d, x)}, $1.a1), a2: {h: 0}});
  case 1: /* JParseErr */ return Derive_Show_conWithArgs($0, 'JParseErr', {a1: Prelude_Show_showArg({a1: x => Prelude_Show_show_Show_x28x7cx28x28Builtinx2ePairx20x24ax29x20x24bx29x2cx28x28Builtinx2eMkPairx20x24ax29x20x24bx29x7cx29(csegen_266(), x), a2: d => x => Prelude_Show_showPrec_Show_x28x7cx28x28Builtinx2ePairx20x24ax29x20x24bx29x2cx28x28Builtinx2eMkPairx20x24ax29x20x24bx29x7cx29(csegen_266(), d, x)}, $1.a1), a2: {h: 0}});
 }
}

/* JSON.FromJSON.explicitParseField : Object obj v => Value v obj => Parser v a -> obj -> Parser String a */
function JSON_FromJSON_explicitParseField($0, $1, $2, $3, $4) {
 const $6 = $0.a1($4)($3);
 switch($6.h) {
  case 0: /* nothing */ return {h: 0 /* Left */, a1: {a1: {h: 0}, a2: Prelude_Types_foldMap_Foldable_List(csegen_245(), $12 => $12, {a1: 'key ', a2: {a1: Prelude_Show_show_Show_String($4), a2: {a1: ' not found', a2: {h: 0}}}})}};
  case undefined: /* just */ {
   const $1c = $2($6.a1);
   switch($1c.h) {
    case 0: /* Left */ return {h: 0 /* Left */, a1: {a1: {a1: {h: 0 /* Key */, a1: $4}, a2: $1c.a1.a1}, a2: $1c.a1.a2}};
    case 1: /* Right */ return {h: 1 /* Right */, a1: $1c.a1};
   }
  }
 }
}

/* Allen.Relation.with block in with block in composeR */
function Allen_Relation_with__withx20blockx20inx20composeR_14103($0, $1, $2, $3, $4, $5) {
 switch($1.h) {
  case 0: /* Yes */ {
   const $9 = Allen_Relation_allRelations();
   let $8;
   switch($9.h) {
    case 0: /* nil */ {
     $8 = {h: 0};
     break;
    }
    case undefined: /* cons */ {
     let $c;
     switch($9.a2.h) {
      case 0: /* nil */ {
       $c = {h: 0};
       break;
      }
      case undefined: /* cons */ {
       let $f;
       switch($9.a2.a2.h) {
        case 0: /* nil */ {
         $f = {h: 0};
         break;
        }
        case undefined: /* cons */ {
         let $12;
         switch($9.a2.a2.a2.h) {
          case 0: /* nil */ {
           $12 = {h: 0};
           break;
          }
          case undefined: /* cons */ {
           let $15;
           switch($9.a2.a2.a2.a2.h) {
            case 0: /* nil */ {
             $15 = {h: 0};
             break;
            }
            case undefined: /* cons */ {
             let $18;
             switch($9.a2.a2.a2.a2.a2.h) {
              case 0: /* nil */ {
               $18 = {h: 0};
               break;
              }
              case undefined: /* cons */ {
               let $1b;
               switch($9.a2.a2.a2.a2.a2.a2.h) {
                case 0: /* nil */ {
                 $1b = {h: 0};
                 break;
                }
                case undefined: /* cons */ {
                 let $1e;
                 switch($9.a2.a2.a2.a2.a2.a2.a2.h) {
                  case 0: /* nil */ {
                   $1e = {h: 0};
                   break;
                  }
                  case undefined: /* cons */ {
                   let $21;
                   switch($9.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                    case 0: /* nil */ {
                     $21 = {h: 0};
                     break;
                    }
                    case undefined: /* cons */ {
                     let $24;
                     switch($9.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                      case 0: /* nil */ {
                       $24 = {h: 0};
                       break;
                      }
                      case undefined: /* cons */ {
                       let $27;
                       switch($9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                        case 0: /* nil */ {
                         $27 = {h: 0};
                         break;
                        }
                        case undefined: /* cons */ {
                         let $2a;
                         switch($9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                          case 0: /* nil */ {
                           $2a = {h: 0};
                           break;
                          }
                          case undefined: /* cons */ {
                           let $2d;
                           switch($9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                            case 0: /* nil */ {
                             $2d = {h: 0};
                             break;
                            }
                            case undefined: /* cons */ {
                             let $30;
                             switch($9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                              case 0: /* nil */ {
                               $30 = {h: 0};
                               break;
                              }
                              case undefined: /* cons */ {
                               let $33;
                               switch($9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                case 0: /* nil */ {
                                 $33 = {h: 0};
                                 break;
                                }
                                case undefined: /* cons */ {
                                 let $36;
                                 switch($9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                  case 0: /* nil */ {
                                   $36 = {h: 0};
                                   break;
                                  }
                                  case undefined: /* cons */ {
                                   $36 = {a1: $9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: Allen_Relation_asList($9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2)};
                                   break;
                                  }
                                 }
                                 $33 = {a1: $9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $36};
                                 break;
                                }
                               }
                               $30 = {a1: $9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $33};
                               break;
                              }
                             }
                             $2d = {a1: $9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $30};
                             break;
                            }
                           }
                           $2a = {a1: $9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $2d};
                           break;
                          }
                         }
                         $27 = {a1: $9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $2a};
                         break;
                        }
                       }
                       $24 = {a1: $9.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $27};
                       break;
                      }
                     }
                     $21 = {a1: $9.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $24};
                     break;
                    }
                   }
                   $1e = {a1: $9.a2.a2.a2.a2.a2.a2.a2.a1, a2: $21};
                   break;
                  }
                 }
                 $1b = {a1: $9.a2.a2.a2.a2.a2.a2.a1, a2: $1e};
                 break;
                }
               }
               $18 = {a1: $9.a2.a2.a2.a2.a2.a1, a2: $1b};
               break;
              }
             }
             $15 = {a1: $9.a2.a2.a2.a2.a1, a2: $18};
             break;
            }
           }
           $12 = {a1: $9.a2.a2.a2.a1, a2: $15};
           break;
          }
         }
         $f = {a1: $9.a2.a2.a1, a2: $12};
         break;
        }
       }
       $c = {a1: $9.a2.a1, a2: $f};
       break;
      }
     }
     $8 = {a1: $9.a1, a2: $c};
     break;
    }
   }
   const $3c = $3d => {
    let $47;
    switch($3d.a2) {
     case 0: {
      $47 = 1;
      break;
     }
     case 1: {
      $47 = 2;
      break;
     }
     case 2: {
      $47 = 4;
      break;
     }
     case 3: {
      $47 = 8;
      break;
     }
     case 4: {
      $47 = 16;
      break;
     }
     case 5: {
      $47 = 32;
      break;
     }
     case 6: {
      $47 = 64;
      break;
     }
     case 7: {
      $47 = 128;
      break;
     }
     case 8: {
      $47 = 256;
      break;
     }
     case 9: {
      $47 = 512;
      break;
     }
     case 10: {
      $47 = 1024;
      break;
     }
     case 11: {
      $47 = 2048;
      break;
     }
     case 12: {
      $47 = 4096;
      break;
     }
    }
    const $46 = ($47&Data_List_index($0, Allen_Relation_ComposeLookup()));
    const $44 = Prelude_EqOrd_x2fx3d_Eq_Bits16($46, 0);
    const $40 = Prelude_Interfaces_guard(csegen_204(), $44);
    return Prelude_Types_listBind($40, $50 => Prelude_Types_pure_Applicative_List($3d));
   };
   return Prelude_Types_listBind($8, $3c);
  }
  case 1: /* No */ return {h: 0};
 }
}

/* Allen.Relation.with block in composeR */
function Allen_Relation_with__composeR_14088($0, $1, $2, $3, $4) {
 return Allen_Relation_with__withx20blockx20inx20composeR_14103($4, Data_List_inBounds($4, Allen_Relation_ComposeLookup()), undefined, undefined, $3, $2);
}

/* Allen.Relation.7354:9413:table */
const Allen_Relation_n__7354_9413_table = __lazy(function () {
 return {a1: 'p', a2: {a1: 'p', a2: {a1: 'p', a2: {a1: 'p', a2: {a1: 'p', a2: {a1: 'p', a2: {a1: 'p', a2: {a1: 'p', a2: {a1: 'pmosd', a2: {a1: 'pmosd', a2: {a1: 'pmosd', a2: {a1: 'pmosd', a2: {a1: 'pmoFDseSdfOMP', a2: {a1: 'p', a2: {a1: 'p', a2: {a1: 'p', a2: {a1: 'p', a2: {a1: 'p', a2: {a1: 'm', a2: {a1: 'm', a2: {a1: 'm', a2: {a1: 'osd', a2: {a1: 'osd', a2: {a1: 'osd', a2: {a1: 'Fef', a2: {a1: 'DSOMP', a2: {a1: 'p', a2: {a1: 'p', a2: {a1: 'pmo', a2: {a1: 'pmo', a2: {a1: 'pmoFD', a2: {a1: 'o', a2: {a1: 'o', a2: {a1: 'oFD', a2: {a1: 'osd', a2: {a1: 'osd', a2: {a1: 'oFDseSdfO', a2: {a1: 'DSO', a2: {a1: 'DSOMP', a2: {a1: 'p', a2: {a1: 'm', a2: {a1: 'o', a2: {a1: 'F', a2: {a1: 'D', a2: {a1: 'o', a2: {a1: 'F', a2: {a1: 'D', a2: {a1: 'osd', a2: {a1: 'Fef', a2: {a1: 'DSO', a2: {a1: 'DSO', a2: {a1: 'DSOMP', a2: {a1: 'pmoFD', a2: {a1: 'oFD', a2: {a1: 'oFD', a2: {a1: 'D', a2: {a1: 'D', a2: {a1: 'oFD', a2: {a1: 'D', a2: {a1: 'D', a2: {a1: 'oFDseSdfO', a2: {a1: 'DSO', a2: {a1: 'DSO', a2: {a1: 'DSO', a2: {a1: 'DSOMP', a2: {a1: 'p', a2: {a1: 'p', a2: {a1: 'pmo', a2: {a1: 'pmo', a2: {a1: 'pmoFD', a2: {a1: 's', a2: {a1: 's', a2: {a1: 'seS', a2: {a1: 'd', a2: {a1: 'd', a2: {a1: 'dfO', a2: {a1: 'M', a2: {a1: 'P', a2: {a1: 'p', a2: {a1: 'm', a2: {a1: 'o', a2: {a1: 'F', a2: {a1: 'D', a2: {a1: 's', a2: {a1: 'e', a2: {a1: 'S', a2: {a1: 'd', a2: {a1: 'f', a2: {a1: 'O', a2: {a1: 'M', a2: {a1: 'P', a2: {a1: 'pmoFD', a2: {a1: 'oFD', a2: {a1: 'oFD', a2: {a1: 'D', a2: {a1: 'D', a2: {a1: 'seS', a2: {a1: 'S', a2: {a1: 'S', a2: {a1: 'dfO', a2: {a1: 'O', a2: {a1: 'O', a2: {a1: 'M', a2: {a1: 'P', a2: {a1: 'p', a2: {a1: 'p', a2: {a1: 'pmosd', a2: {a1: 'pmosd', a2: {a1: 'pmoFDseSdfOMP', a2: {a1: 'd', a2: {a1: 'd', a2: {a1: 'dfOMP', a2: {a1: 'd', a2: {a1: 'd', a2: {a1: 'dfOMP', a2: {a1: 'P', a2: {a1: 'P', a2: {a1: 'p', a2: {a1: 'm', a2: {a1: 'osd', a2: {a1: 'Fef', a2: {a1: 'DSOMP', a2: {a1: 'd', a2: {a1: 'f', a2: {a1: 'OMP', a2: {a1: 'd', a2: {a1: 'f', a2: {a1: 'OMP', a2: {a1: 'P', a2: {a1: 'P', a2: {a1: 'pmoFD', a2: {a1: 'oFD', a2: {a1: 'oFDseSdfO', a2: {a1: 'DSO', a2: {a1: 'DSOMP', a2: {a1: 'dfO', a2: {a1: 'O', a2: {a1: 'OMP', a2: {a1: 'dfO', a2: {a1: 'O', a2: {a1: 'OMP', a2: {a1: 'P', a2: {a1: 'P', a2: {a1: 'pmoFD', a2: {a1: 'seS', a2: {a1: 'dfO', a2: {a1: 'M', a2: {a1: 'P', a2: {a1: 'dfO', a2: {a1: 'M', a2: {a1: 'P', a2: {a1: 'dfO', a2: {a1: 'M', a2: {a1: 'P', a2: {a1: 'P', a2: {a1: 'P', a2: {a1: 'pmoFDseSdfOMP', a2: {a1: 'dfOMP', a2: {a1: 'dfOMOP', a2: {a1: 'P', a2: {a1: 'P', a2: {a1: 'dfOMP', a2: {a1: 'P', a2: {a1: 'P', a2: {a1: 'dfOMP', a2: {a1: 'P', a2: {a1: 'P', a2: {a1: 'P', a2: {a1: 'P', a2: {h: 0}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}};
});

/* Allen.Relation.relationNumber : Relation c -> Nat */
function Allen_Relation_relationNumber($0) {
 switch($0) {
  case 0: return 0n;
  case 1: return 1n;
  case 2: return 2n;
  case 3: return 3n;
  case 4: return 4n;
  case 5: return 5n;
  case 6: return 6n;
  case 7: return 7n;
  case 8: return 8n;
  case 9: return 9n;
  case 10: return 10n;
  case 11: return 11n;
  case 12: return 12n;
 }
}

/* Allen.Relation.isRelation : (c : Char) -> Dec (Relation c) */
function Allen_Relation_isRelation($0) {
 switch($0) {
  case 'p': return {h: 0 /* Yes */, a1: 0};
  case 'm': return {h: 0 /* Yes */, a1: 1};
  case 'o': return {h: 0 /* Yes */, a1: 2};
  case 'F': return {h: 0 /* Yes */, a1: 3};
  case 'D': return {h: 0 /* Yes */, a1: 4};
  case 's': return {h: 0 /* Yes */, a1: 5};
  case 'e': return {h: 0 /* Yes */, a1: 6};
  case 'S': return {h: 0 /* Yes */, a1: 7};
  case 'd': return {h: 0 /* Yes */, a1: 8};
  case 'f': return {h: 0 /* Yes */, a1: 9};
  case 'O': return {h: 0 /* Yes */, a1: 10};
  case 'M': return {h: 0 /* Yes */, a1: 11};
  case 'P': return {h: 0 /* Yes */, a1: 12};
  default: {
   const $f = $10 => {
    _crashExp('No clauses');
   };
   return {h: 1 /* No */, a1: $f};
  }
 }
}

/* Allen.Relation.composeRBits : Relation c1 -> Relation c2 -> RelationBits */
function Allen_Relation_composeRBits($0, $1) {
 return Prelude_Types_foldl_Foldable_List(csegen_146(), 0, Prelude_Types_listBind(Allen_Relation_composeR($0, $1), csegen_439()));
}

/* Allen.Relation.composeR : Relation c1 -> Relation c2 -> List (c : Char ** Relation c) */
function Allen_Relation_composeR($0, $1) {
 return Allen_Relation_with__composeR_14088(undefined, undefined, $1, $0, ((Allen_Relation_relationNumber($0)*13n)+Allen_Relation_relationNumber($1)));
}

/* Allen.Relation.compose : RelationBits -> RelationBits -> RelationBits */
function Allen_Relation_compose($0, $1) {
 const $c = $d => {
  let $17;
  switch($d.a2) {
   case 0: {
    $17 = 1;
    break;
   }
   case 1: {
    $17 = 2;
    break;
   }
   case 2: {
    $17 = 4;
    break;
   }
   case 3: {
    $17 = 8;
    break;
   }
   case 4: {
    $17 = 16;
    break;
   }
   case 5: {
    $17 = 32;
    break;
   }
   case 6: {
    $17 = 64;
    break;
   }
   case 7: {
    $17 = 128;
    break;
   }
   case 8: {
    $17 = 256;
    break;
   }
   case 9: {
    $17 = 512;
    break;
   }
   case 10: {
    $17 = 1024;
    break;
   }
   case 11: {
    $17 = 2048;
    break;
   }
   case 12: {
    $17 = 4096;
    break;
   }
  }
  const $16 = ($17&$0);
  const $14 = Prelude_EqOrd_x2fx3d_Eq_Bits16($16, 0);
  const $10 = Prelude_Interfaces_guard(csegen_204(), $14);
  return Prelude_Types_listBind($10, $1c => Prelude_Types_pure_Applicative_List($d));
 };
 const $8 = Prelude_Types_listBind(csegen_440(), $c);
 const $1f = $20 => {
  const $27 = $28 => {
   let $32;
   switch($28.a2) {
    case 0: {
     $32 = 1;
     break;
    }
    case 1: {
     $32 = 2;
     break;
    }
    case 2: {
     $32 = 4;
     break;
    }
    case 3: {
     $32 = 8;
     break;
    }
    case 4: {
     $32 = 16;
     break;
    }
    case 5: {
     $32 = 32;
     break;
    }
    case 6: {
     $32 = 64;
     break;
    }
    case 7: {
     $32 = 128;
     break;
    }
    case 8: {
     $32 = 256;
     break;
    }
    case 9: {
     $32 = 512;
     break;
    }
    case 10: {
     $32 = 1024;
     break;
    }
    case 11: {
     $32 = 2048;
     break;
    }
    case 12: {
     $32 = 4096;
     break;
    }
   }
   const $31 = ($32&$1);
   const $2f = Prelude_EqOrd_x2fx3d_Eq_Bits16($31, 0);
   const $2b = Prelude_Interfaces_guard(csegen_204(), $2f);
   return Prelude_Types_listBind($2b, $37 => Prelude_Types_pure_Applicative_List($28));
  };
  const $23 = Prelude_Types_listBind(csegen_440(), $27);
  return Prelude_Types_listBind($23, $3b => Prelude_Types_pure_Applicative_List(Allen_Relation_composeRBits($20.a2, $3b.a2)));
 };
 const $6 = Prelude_Types_listBind($8, $1f);
 return Prelude_Types_foldl_Foldable_List(csegen_146(), 0, $6);
}

/* Allen.Relation.charToRelation : (c : Char) -> {auto 0 _ : Relation c} -> Relation c */
function Allen_Relation_charToRelation($0) {
 switch($0) {
  case 'p': return 0;
  case 'm': return 1;
  case 'o': return 2;
  case 'F': return 3;
  case 'D': return 4;
  case 's': return 5;
  case 'e': return 6;
  case 'S': return 7;
  case 'd': return 8;
  case 'f': return 9;
  case 'O': return 10;
  case 'M': return 11;
  case 'P': return 12;
  default: return Builtin_idris_crash('impossible');
 }
}

/* Allen.Relation.bitsFromTable : (xs : List String) -> {auto 0 _ : All (\x => All Relation (unpack x)) xs} ->
List RelationBits */
function Allen_Relation_bitsFromTable($0) {
 switch($0.h) {
  case 0: /* nil */ return {h: 0};
  case undefined: /* cons */ return {a1: Allen_Relation_bitsFromString($0.a1), a2: Allen_Relation_bitsFromTable($0.a2)};
 }
}

/* Allen.Relation.bitsFromString : (s : String) -> {auto 0 _ : All Relation (unpack s)} -> RelationBits */
function Allen_Relation_bitsFromString($0) {
 return Allen_Relation_bitsFromChars(Prelude_Types_fastUnpack($0));
}

/* Allen.Relation.bitsFromChars : (xs : List Char) -> {auto 0 _ : All Relation xs} -> RelationBits */
function Allen_Relation_bitsFromChars($0) {
 switch($0.h) {
  case 0: /* nil */ return 0;
  case undefined: /* cons */ {
   let $2;
   switch(Allen_Relation_charToRelation($0.a1)) {
    case 0: {
     $2 = 1;
     break;
    }
    case 1: {
     $2 = 2;
     break;
    }
    case 2: {
     $2 = 4;
     break;
    }
    case 3: {
     $2 = 8;
     break;
    }
    case 4: {
     $2 = 16;
     break;
    }
    case 5: {
     $2 = 32;
     break;
    }
    case 6: {
     $2 = 64;
     break;
    }
    case 7: {
     $2 = 128;
     break;
    }
    case 8: {
     $2 = 256;
     break;
    }
    case 9: {
     $2 = 512;
     break;
    }
    case 10: {
     $2 = 1024;
     break;
    }
    case 11: {
     $2 = 2048;
     break;
    }
    case 12: {
     $2 = 4096;
     break;
    }
   }
   return ($2|Allen_Relation_bitsFromChars($0.a2));
  }
 }
}

/* Allen.Relation.asList : Vect n a -> List a */
function Allen_Relation_asList($0) {
 switch($0.h) {
  case 0: /* nil */ return {h: 0};
  case undefined: /* cons */ {
   let $3;
   switch($0.a2.h) {
    case 0: /* nil */ {
     $3 = {h: 0};
     break;
    }
    case undefined: /* cons */ {
     let $6;
     switch($0.a2.a2.h) {
      case 0: /* nil */ {
       $6 = {h: 0};
       break;
      }
      case undefined: /* cons */ {
       let $9;
       switch($0.a2.a2.a2.h) {
        case 0: /* nil */ {
         $9 = {h: 0};
         break;
        }
        case undefined: /* cons */ {
         let $c;
         switch($0.a2.a2.a2.a2.h) {
          case 0: /* nil */ {
           $c = {h: 0};
           break;
          }
          case undefined: /* cons */ {
           let $f;
           switch($0.a2.a2.a2.a2.a2.h) {
            case 0: /* nil */ {
             $f = {h: 0};
             break;
            }
            case undefined: /* cons */ {
             let $12;
             switch($0.a2.a2.a2.a2.a2.a2.h) {
              case 0: /* nil */ {
               $12 = {h: 0};
               break;
              }
              case undefined: /* cons */ {
               let $15;
               switch($0.a2.a2.a2.a2.a2.a2.a2.h) {
                case 0: /* nil */ {
                 $15 = {h: 0};
                 break;
                }
                case undefined: /* cons */ {
                 $15 = {a1: $0.a2.a2.a2.a2.a2.a2.a2.a1, a2: Allen_Relation_asList($0.a2.a2.a2.a2.a2.a2.a2.a2)};
                 break;
                }
               }
               $12 = {a1: $0.a2.a2.a2.a2.a2.a2.a1, a2: $15};
               break;
              }
             }
             $f = {a1: $0.a2.a2.a2.a2.a2.a1, a2: $12};
             break;
            }
           }
           $c = {a1: $0.a2.a2.a2.a2.a1, a2: $f};
           break;
          }
         }
         $9 = {a1: $0.a2.a2.a2.a1, a2: $c};
         break;
        }
       }
       $6 = {a1: $0.a2.a2.a1, a2: $9};
       break;
      }
     }
     $3 = {a1: $0.a2.a1, a2: $6};
     break;
    }
   }
   return {a1: $0.a1, a2: $3};
  }
 }
}

/* Allen.Relation.allRelations : Vect 13 (c : Char ** Relation c) */
const Allen_Relation_allRelations = __lazy(function () {
 return {a1: {a1: 'p', a2: 0}, a2: {a1: {a1: 'm', a2: 1}, a2: {a1: {a1: 'o', a2: 2}, a2: {a1: {a1: 'F', a2: 3}, a2: {a1: {a1: 'D', a2: 4}, a2: {a1: {a1: 's', a2: 5}, a2: {a1: {a1: 'e', a2: 6}, a2: {a1: {a1: 'S', a2: 7}, a2: {a1: {a1: 'd', a2: 8}, a2: {a1: {a1: 'f', a2: 9}, a2: {a1: {a1: 'O', a2: 10}, a2: {a1: {a1: 'M', a2: 11}, a2: {a1: {a1: 'P', a2: 12}, a2: {h: 0}}}}}}}}}}}}}};
});

/* Allen.Relation.ComposeLookup : List RelationBits */
const Allen_Relation_ComposeLookup = __lazy(function () {
 return Allen_Relation_bitsFromTable(Allen_Relation_n__7354_9413_table());
});

/* Allen.Relation.AllRelationBits : RelationBits */
const Allen_Relation_AllRelationBits = __lazy(function () {
 const $7 = Allen_Relation_allRelations();
 let $6;
 switch($7.h) {
  case 0: /* nil */ {
   $6 = {h: 0};
   break;
  }
  case undefined: /* cons */ {
   let $a;
   switch($7.a2.h) {
    case 0: /* nil */ {
     $a = {h: 0};
     break;
    }
    case undefined: /* cons */ {
     let $d;
     switch($7.a2.a2.h) {
      case 0: /* nil */ {
       $d = {h: 0};
       break;
      }
      case undefined: /* cons */ {
       let $10;
       switch($7.a2.a2.a2.h) {
        case 0: /* nil */ {
         $10 = {h: 0};
         break;
        }
        case undefined: /* cons */ {
         let $13;
         switch($7.a2.a2.a2.a2.h) {
          case 0: /* nil */ {
           $13 = {h: 0};
           break;
          }
          case undefined: /* cons */ {
           let $16;
           switch($7.a2.a2.a2.a2.a2.h) {
            case 0: /* nil */ {
             $16 = {h: 0};
             break;
            }
            case undefined: /* cons */ {
             let $19;
             switch($7.a2.a2.a2.a2.a2.a2.h) {
              case 0: /* nil */ {
               $19 = {h: 0};
               break;
              }
              case undefined: /* cons */ {
               $19 = {a1: $7.a2.a2.a2.a2.a2.a2.a1, a2: Allen_Relation_asList($7.a2.a2.a2.a2.a2.a2.a2)};
               break;
              }
             }
             $16 = {a1: $7.a2.a2.a2.a2.a2.a1, a2: $19};
             break;
            }
           }
           $13 = {a1: $7.a2.a2.a2.a2.a1, a2: $16};
           break;
          }
         }
         $10 = {a1: $7.a2.a2.a2.a1, a2: $13};
         break;
        }
       }
       $d = {a1: $7.a2.a2.a1, a2: $10};
       break;
      }
     }
     $a = {a1: $7.a2.a1, a2: $d};
     break;
    }
   }
   $6 = {a1: $7.a1, a2: $a};
   break;
  }
 }
 const $4 = Prelude_Types_listBind($6, csegen_439());
 return Prelude_Types_foldl_Foldable_List(csegen_146(), 0, $4);
});

/* Allen.Types.show */
function Allen_Types_show_Show_x28AllenErrorx20x24kx29($0, $1) {
 switch($1.h) {
  case 0: /* MissingInterval */ return ('Missing interval: '+$0.a1($1.a1));
  case 1: /* MissingRelations */ return ('Missing interval relations: '+($0.a1($1.a1)+(' & '+$0.a1($1.a2))));
  case 2: /* DuplicateInterval */ return ('Duplicate interval: '+$0.a1($1.a1));
  case 3: /* InvalidRelation */ return ('Invalid relation: '+Prelude_Show_show_Show_Char($1.a1));
 }
}

/* Allen.Types.runAllen : Ord k => Allen k a -> (IntervalGraph k, Either (AllenError k) a) */
function Allen_Types_runAllen($0, $1) {
 return $1(Data_SortedMap_empty($0));
}

/* Allen.Types.fromID : k -> Allen k (Interval k) */
function Allen_Types_fromID($0) {
 const $d = $e => {
  switch($e.h) {
   case 0: /* nothing */ return $10 => Control_Monad_State_State_pure_Applicative_x28x28StateTx20x24stateTypex29x20x24fx29(csegen_179(), {h: 0 /* Left */, a1: {h: 0 /* MissingInterval */, a1: $0}}, $10);
   case undefined: /* just */ return Control_Monad_Error_Either_pure_Applicative_x28x28EitherTx20x24ex29x20x24mx29(csegen_185(), $e.a1);
  }
 };
 return Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29(csegen_462(), Control_Monad_State_Interface_gets(csegen_473(), $9 => Data_SortedMap_lookup($0, $9)), $d);
}

/* Data.SortedMap.map */
function Data_SortedMap_map_Functor_x28SortedMapx20x24kx29($0, $1) {
 return Data_SortedMap_Dependent_map($4 => $0, $1);
}

/* Data.SortedMap.unDPair : (x : a ** const b x) -> (a, b) */
function Data_SortedMap_unDPair($0) {
 return {a1: $0.a1, a2: $0.a2};
}

/* Data.SortedMap.toList : SortedMap k v -> List (k, v) */
function Data_SortedMap_toList($0) {
 return Prelude_Types_List_mapAppend({h: 0}, $4 => Data_SortedMap_unDPair($4), Data_SortedMap_Dependent_toList($0));
}

/* Data.SortedMap.lookup : k -> SortedMap k v -> Maybe v */
function Data_SortedMap_lookup($0, $1) {
 return Prelude_Types_map_Functor_Maybe($4 => $4.a2, Data_SortedMap_Dependent_lookup($0, $1));
}

/* Data.SortedMap.keys : SortedMap k v -> List k */
function Data_SortedMap_keys($0) {
 return Prelude_Types_List_mapAppend({h: 0}, $4 => Builtin_fst($4), Data_SortedMap_toList($0));
}

/* Data.SortedMap.insertFrom : Foldable f => f (k, v) -> SortedMap k v -> SortedMap k v */
function Data_SortedMap_insertFrom($0, $1, $2) {
 return Prelude_Basics_flip($5 => $6 => $0.a2(undefined)(undefined)($10 => $11 => Prelude_Basics_flip($14 => Prelude_Basics_uncurry($17 => $18 => $19 => Data_SortedMap_insert($17, $18, $19), $14), $10, $11))($5)($6), $1, $2);
}

/* Data.SortedMap.insert : k -> v -> SortedMap k v -> SortedMap k v */
function Data_SortedMap_insert($0, $1, $2) {
 return Data_SortedMap_Dependent_insert($0, $1, $2);
}

/* Data.SortedMap.fromList : Ord k => List (k, v) -> SortedMap k v */
function Data_SortedMap_fromList($0, $1) {
 return Prelude_Basics_flip($4 => $5 => Data_SortedMap_insertFrom(csegen_116(), $4, $5), Data_SortedMap_empty($0), $1);
}

/* Data.SortedMap.empty : Ord k => SortedMap k v */
function Data_SortedMap_empty($0) {
 return Data_SortedMap_Dependent_empty($0);
}

/* Data.SortedMap.Dependent.treeToList : Tree n k v o -> List (x : k ** v x) */
function Data_SortedMap_Dependent_treeToList($0) {
 return Data_SortedMap_Dependent_n__6841_6801_treeToListx27($3 => ({a1: $3, a2: {h: 0}}), $0);
}

/* Data.SortedMap.Dependent.treeMap : (a x -> b x) -> Tree n k a o -> Tree n k b o */
function Data_SortedMap_Dependent_treeMap($0, $1) {
 switch($1.h) {
  case 0: /* Leaf */ return {h: 0 /* Leaf */, a1: $1.a1, a2: $0($1.a1)($1.a2)};
  case 1: /* Branch2 */ return {h: 1 /* Branch2 */, a1: Data_SortedMap_Dependent_treeMap($c => $0($c), $1.a1), a2: $1.a2, a3: Data_SortedMap_Dependent_treeMap($14 => $0($14), $1.a3)};
  case 2: /* Branch3 */ return {h: 2 /* Branch3 */, a1: Data_SortedMap_Dependent_treeMap($1b => $0($1b), $1.a1), a2: $1.a2, a3: Data_SortedMap_Dependent_treeMap($23 => $0($23), $1.a3), a4: $1.a4, a5: Data_SortedMap_Dependent_treeMap($2b => $0($2b), $1.a5)};
 }
}

/* Data.SortedMap.Dependent.treeInsert' : Ord k => (x : k) -> v x -> Tree n k v o -> Either (Tree n k v o) (Tree n k v o,
(k, Tree n k v o)) */
function Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3) {
 switch($3.h) {
  case 0: /* Leaf */ {
   switch($0.a2($1)($3.a1)) {
    case 0: return {h: 1 /* Right */, a1: {a1: {h: 0 /* Leaf */, a1: $1, a2: $2}, a2: {a1: $1, a2: {h: 0 /* Leaf */, a1: $3.a1, a2: $3.a2}}}};
    case 1: return {h: 0 /* Left */, a1: {h: 0 /* Leaf */, a1: $1, a2: $2}};
    case 2: return {h: 1 /* Right */, a1: {a1: {h: 0 /* Leaf */, a1: $3.a1, a2: $3.a2}, a2: {a1: $3.a1, a2: {h: 0 /* Leaf */, a1: $1, a2: $2}}}};
   }
  }
  case 1: /* Branch2 */ {
   switch($0.a5($1)($3.a2)) {
    case 1: {
     const $26 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a1);
     switch($26.h) {
      case 0: /* Left */ return {h: 0 /* Left */, a1: {h: 1 /* Branch2 */, a1: $26.a1, a2: $3.a2, a3: $3.a3}};
      case 1: /* Right */ return {h: 0 /* Left */, a1: {h: 2 /* Branch3 */, a1: $26.a1.a1, a2: $26.a1.a2.a1, a3: $26.a1.a2.a2, a4: $3.a2, a5: $3.a3}};
     }
    }
    case 0: {
     const $38 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a3);
     switch($38.h) {
      case 0: /* Left */ return {h: 0 /* Left */, a1: {h: 1 /* Branch2 */, a1: $3.a1, a2: $3.a2, a3: $38.a1}};
      case 1: /* Right */ return {h: 0 /* Left */, a1: {h: 2 /* Branch3 */, a1: $3.a1, a2: $3.a2, a3: $38.a1.a1, a4: $38.a1.a2.a1, a5: $38.a1.a2.a2}};
     }
    }
   }
  }
  case 2: /* Branch3 */ {
   switch($0.a5($1)($3.a2)) {
    case 1: {
     const $50 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a1);
     switch($50.h) {
      case 0: /* Left */ return {h: 0 /* Left */, a1: {h: 2 /* Branch3 */, a1: $50.a1, a2: $3.a2, a3: $3.a3, a4: $3.a4, a5: $3.a5}};
      case 1: /* Right */ return {h: 1 /* Right */, a1: {a1: {h: 1 /* Branch2 */, a1: $50.a1.a1, a2: $50.a1.a2.a1, a3: $50.a1.a2.a2}, a2: {a1: $3.a2, a2: {h: 1 /* Branch2 */, a1: $3.a3, a2: $3.a4, a3: $3.a5}}}};
     }
    }
    case 0: {
     switch($0.a5($1)($3.a4)) {
      case 1: {
       const $6f = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a3);
       switch($6f.h) {
        case 0: /* Left */ return {h: 0 /* Left */, a1: {h: 2 /* Branch3 */, a1: $3.a1, a2: $3.a2, a3: $6f.a1, a4: $3.a4, a5: $3.a5}};
        case 1: /* Right */ return {h: 1 /* Right */, a1: {a1: {h: 1 /* Branch2 */, a1: $3.a1, a2: $3.a2, a3: $6f.a1.a1}, a2: {a1: $6f.a1.a2.a1, a2: {h: 1 /* Branch2 */, a1: $6f.a1.a2.a2, a2: $3.a4, a3: $3.a5}}}};
       }
      }
      case 0: {
       const $88 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3.a5);
       switch($88.h) {
        case 0: /* Left */ return {h: 0 /* Left */, a1: {h: 2 /* Branch3 */, a1: $3.a1, a2: $3.a2, a3: $3.a3, a4: $3.a4, a5: $88.a1}};
        case 1: /* Right */ return {h: 1 /* Right */, a1: {a1: {h: 1 /* Branch2 */, a1: $3.a1, a2: $3.a2, a3: $3.a3}, a2: {a1: $3.a4, a2: {h: 1 /* Branch2 */, a1: $88.a1.a1, a2: $88.a1.a2.a1, a3: $88.a1.a2.a2}}}};
       }
      }
     }
    }
   }
  }
 }
}

/* Data.SortedMap.Dependent.treeInsert : Ord k => (x : k) ->
v x -> Tree n k v o -> Either (Tree n k v o) (Tree (S n) k v o) */
function Data_SortedMap_Dependent_treeInsert($0, $1, $2, $3) {
 const $4 = Data_SortedMap_Dependent_treeInsertx27($0, $1, $2, $3);
 switch($4.h) {
  case 0: /* Left */ return {h: 0 /* Left */, a1: $4.a1};
  case 1: /* Right */ return {h: 1 /* Right */, a1: {h: 1 /* Branch2 */, a1: $4.a1.a1, a2: $4.a1.a2.a1, a3: $4.a1.a2.a2}};
 }
}

/* Data.SortedMap.Dependent.toList : SortedDMap k v -> List (x : k ** v x) */
function Data_SortedMap_Dependent_toList($0) {
 switch($0.h) {
  case 0: /* Empty */ return {h: 0};
  case 1: /* M */ return Data_SortedMap_Dependent_treeToList($0.a3);
 }
}

/* Data.SortedMap.Dependent.map : (v x -> w x) -> SortedDMap k v -> SortedDMap k w */
function Data_SortedMap_Dependent_map($0, $1) {
 switch($1.h) {
  case 0: /* Empty */ return {h: 0 /* Empty */, a1: $1.a1};
  case 1: /* M */ return {h: 1 /* M */, a1: $1.a1, a2: $1.a2, a3: Data_SortedMap_Dependent_treeMap($9 => $0($9), $1.a3)};
 }
}

/* Data.SortedMap.Dependent.lookup : k -> SortedDMap k v -> Maybe (y : k ** v y) */
function Data_SortedMap_Dependent_lookup($0, $1) {
 switch($1.h) {
  case 0: /* Empty */ return {h: 0};
  case 1: /* M */ return Data_SortedMap_Dependent_treeLookup($1.a1, $0, $1.a3);
 }
}

/* Data.SortedMap.Dependent.insert : (x : k) -> v x -> SortedDMap k v -> SortedDMap k v */
function Data_SortedMap_Dependent_insert($0, $1, $2) {
 switch($2.h) {
  case 0: /* Empty */ return {h: 1 /* M */, a1: $2.a1, a2: 0n, a3: {h: 0 /* Leaf */, a1: $0, a2: $1}};
  case 1: /* M */ {
   const $9 = Data_SortedMap_Dependent_treeInsert($2.a1, $0, $1, $2.a3);
   switch($9.h) {
    case 0: /* Left */ return {h: 1 /* M */, a1: $2.a1, a2: $2.a2, a3: $9.a1};
    case 1: /* Right */ return {h: 1 /* M */, a1: $2.a1, a2: ($2.a2+1n), a3: $9.a1};
   }
  }
 }
}

/* Data.SortedMap.Dependent.empty : Ord k => SortedDMap k v */
function Data_SortedMap_Dependent_empty($0) {
 return {h: 0 /* Empty */, a1: $0};
}

/* Control.Monad.State.State.pure */
function Control_Monad_State_State_pure_Applicative_x28x28StateTx20x24stateTypex29x20x24fx29($0, $1, $2) {
 return $0.a1.a2(undefined)({a1: $2, a2: $1});
}

/* Control.Monad.State.State.map */
function Control_Monad_State_State_map_Functor_x28x28StateTx20x24stateTypex29x20x24fx29($0, $1, $2, $3) {
 return $0(undefined)(undefined)($b => ({a1: $b.a1, a2: $1($b.a2)}))($2($3));
}

/* Control.Monad.State.State.lift */
function Control_Monad_State_State_lift_MonadTrans_x28StateTx20x24stateTypex29($0, $1, $2) {
 return $0.a1.a1(undefined)(undefined)($c => ({a1: $2, a2: $c}))($1);
}

/* Control.Monad.State.State.join */
function Control_Monad_State_State_join_Monad_x28x28StateTx20x24stateTypex29x20x24mx29($0, $1, $2) {
 return Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29($0, $1, $7 => $7, $2);
}

/* Control.Monad.State.State.>>= */
function Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29($0, $1, $2, $3) {
 const $e = $f => {
  const $12 = $2($f.a2);
  const $11 = $12;
  return $11($f.a1);
 };
 return $0.a2(undefined)(undefined)($1($3))($e);
}

/* Control.Monad.State.State.<*> */
function Control_Monad_State_State_x3cx2ax3e_Applicative_x28x28StateTx20x24stateTypex29x20x24fx29($0, $1, $2, $3) {
 return $0.a2(undefined)(undefined)($1($3))($f => $0.a2(undefined)(undefined)($2($f.a1))($1c => $0.a1.a2(undefined)({a1: $1c.a1, a2: $f.a2($1c.a2)})));
}

/* Control.Monad.State.Interface.modify : MonadState stateType m => (stateType -> stateType) -> m () */
function Control_Monad_State_Interface_modify($0, $1) {
 return $0.a1.a2(undefined)(undefined)($0.a2)(s => $0.a3($1(s)));
}

/* Control.Monad.State.Interface.gets : MonadState stateType m => (stateType -> a) -> m a */
function Control_Monad_State_Interface_gets($0, $1) {
 return $0.a1.a2(undefined)(undefined)($0.a2)(s => $0.a1.a1.a2(undefined)($1(s)));
}

/* Control.Monad.Error.Either.pure */
function Control_Monad_Error_Either_pure_Applicative_x28x28EitherTx20x24ex29x20x24mx29($0, $1) {
 return $0.a2(undefined)({h: 1 /* Right */, a1: $1});
}

/* Control.Monad.Error.Either.map */
function Control_Monad_Error_Either_map_Functor_x28x28EitherTx20x24ex29x20x24mx29($0, $1, $2) {
 const $9 = $a => {
  switch($a.h) {
   case 0: /* Left */ return {h: 0 /* Left */, a1: $a.a1};
   case 1: /* Right */ return {h: 1 /* Right */, a1: $1($a.a1)};
  }
 };
 const $3 = $0(undefined)(undefined)($9);
 return $3($2);
}

/* Control.Monad.Error.Either.lift */
function Control_Monad_Error_Either_lift_MonadTrans_x28EitherTx20x24ex29($0, $1) {
 return $0.a1.a1(undefined)(undefined)($b => ({h: 1 /* Right */, a1: $b}))($1);
}

/* Control.Monad.Error.Either.join */
function Control_Monad_Error_Either_join_Monad_x28x28EitherTx20x24ex29x20x24mx29($0, $1) {
 return Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29($0, $1, $6 => $6);
}

/* Control.Monad.Error.Either.>>= */
function Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29($0, $1, $2) {
 return $0.a2(undefined)(undefined)($1)($c => Prelude_Types_either(() => $f => $0.a1.a2(undefined)({h: 0 /* Left */, a1: $f}), () => $18 => $2($18), $c));
}

/* Control.Monad.Error.Either.<*> */
function Control_Monad_Error_Either_x3cx2ax3e_Applicative_x28x28EitherTx20x24ex29x20x24mx29($0, $1, $2) {
 const $17 = $18 => $19 => {
  switch($18.h) {
   case 0: /* Left */ return {h: 0 /* Left */, a1: $18.a1};
   case 1: /* Right */ {
    switch($19.h) {
     case 1: /* Right */ return {h: 1 /* Right */, a1: $18.a1($19.a1)};
     case 0: /* Left */ return {h: 0 /* Left */, a1: $19.a1};
    }
   }
  }
 };
 const $12 = $0.a2(undefined)($17);
 const $c = $0.a3(undefined)(undefined)($12);
 const $a = $c($1);
 const $4 = $0.a3(undefined)(undefined)($a);
 return $4($2);
}

/* Allen.Interval.setRelation : Interval k -> RelationBits -> k -> Interval k */
function Allen_Interval_setRelation($0, $1, $2) {
 return {a1: $0.a1, a2: Data_SortedMap_insert($2, $1, $0.a2)};
}

/* Allen.Interval.propogate'' : Eq k => (k, k) -> StateT (List (k, k)) (Allen k) () */
function Allen_Interval_propogatex27x27($0, $1, $2) {
 const $15 = range => $16 => {
  const $1f = k => $20 => {
   const $2e = ki => $2f => {
    const $3d = ij => {
     const $3e = Allen_Relation_compose(ki, ij);
     return $42 => {
      const $50 = nkj => {
       const $51 = (nkj&$3e);
       return $54 => {
        let $5c;
        switch(Prelude_EqOrd_x3dx3d_Eq_Bits16(($51|nkj), nkj)) {
         case 1: {
          $5c = Prelude_EqOrd_x3c_Ord_Bits16($51, nkj);
          break;
         }
         case 0: {
          $5c = 0;
          break;
         }
        }
        const $58 = Prelude_Interfaces_when(csegen_487(), $5c, () => Control_Monad_State_Interface_modify(csegen_499(), $6b => ({a1: {a1: k, a2: $1.a2}, a2: $6b})));
        return Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $58, $71 => $72 => Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $77 => Control_Monad_State_State_lift_MonadTrans_x28StateTx20x24stateTypex29(csegen_468(), Allen_Types_fromID(k), $77), intervalK => $80 => Control_Monad_State_State_lift_MonadTrans_x28StateTx20x24stateTypex29(csegen_468(), Control_Monad_State_Interface_modify(csegen_473(), $89 => Data_SortedMap_insert(k, Allen_Interval_setRelation(intervalK, $51, $1.a2), $89)), $80), $72), $54);
       };
      };
      return Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $47 => Control_Monad_State_State_lift_MonadTrans_x28StateTx20x24stateTypex29(csegen_468(), Allen_Interval_getConstraints(k, $1.a2), $47), $50, $42);
     };
    };
    return Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $34 => Control_Monad_State_State_lift_MonadTrans_x28StateTx20x24stateTypex29(csegen_468(), Allen_Interval_getConstraints($1.a1, $1.a2), $34), $3d, $2f);
   };
   return Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $25 => Control_Monad_State_State_lift_MonadTrans_x28StateTx20x24stateTypex29(csegen_468(), Allen_Interval_getConstraints(k, $1.a1), $25), $2e, $20);
  };
  const $1a = Prelude_Basics_flip(csegen_488(), range, $1f);
  const $98 = $99 => {
   const $9e = k => $9f => {
    const $ad = ij => $ae => {
     const $bc = jk => {
      const $bd = Allen_Relation_compose(ij, jk);
      return $c1 => {
       const $cf = nik => {
        const $d0 = (nik&$bd);
        return $d3 => {
         let $db;
         switch(Prelude_EqOrd_x3dx3d_Eq_Bits16(($d0|nik), nik)) {
          case 1: {
           $db = Prelude_EqOrd_x3c_Ord_Bits16($d0, nik);
           break;
          }
          case 0: {
           $db = 0;
           break;
          }
         }
         const $d7 = Prelude_Interfaces_when(csegen_487(), $db, () => Control_Monad_State_Interface_modify(csegen_499(), $ea => ({a1: {a1: $1.a1, a2: k}, a2: $ea})));
         return Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $d7, $f0 => $f1 => Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $f6 => Control_Monad_State_State_lift_MonadTrans_x28StateTx20x24stateTypex29(csegen_468(), Allen_Types_fromID($1.a1), $f6), intervalI => $ff => Control_Monad_State_State_lift_MonadTrans_x28StateTx20x24stateTypex29(csegen_468(), Control_Monad_State_Interface_modify(csegen_473(), $108 => Data_SortedMap_insert($1.a1, Allen_Interval_setRelation(intervalI, $d0, k), $108)), $ff), $f1), $d3);
        };
       };
       return Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $c6 => Control_Monad_State_State_lift_MonadTrans_x28StateTx20x24stateTypex29(csegen_468(), Allen_Interval_getConstraints($1.a1, k), $c6), $cf, $c1);
      };
     };
     return Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $b3 => Control_Monad_State_State_lift_MonadTrans_x28StateTx20x24stateTypex29(csegen_468(), Allen_Interval_getConstraints($1.a2, k), $b3), $bc, $ae);
    };
    return Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $a4 => Control_Monad_State_State_lift_MonadTrans_x28StateTx20x24stateTypex29(csegen_468(), Allen_Interval_getConstraints($1.a1, $1.a2), $a4), $ad, $9f);
   };
   return Prelude_Basics_flip(csegen_488(), range, $9e);
  };
  return Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $1a, $98, $16);
 };
 return Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $8 => Control_Monad_State_State_lift_MonadTrans_x28StateTx20x24stateTypex29(csegen_468(), Allen_Interval_allIntervalsExcept($0, {a1: $1.a1, a2: {a1: $1.a2, a2: {h: 0}}}), $8), $15, $2);
}

/* Allen.Interval.propogate' : Eq k => StateT (List (k, k)) (Allen k) () */
function Allen_Interval_propogatex27($0, $1) {
 const $7 = toDo => $8 => {
  switch(toDo.h) {
   case 0: /* nil */ return Control_Monad_State_State_pure_Applicative_x28x28StateTx20x24stateTypex29x20x24fx29(csegen_468(), undefined, $8);
   case undefined: /* cons */ return Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), Control_Monad_State_Interface_modify(csegen_499(), $18 => Data_List_drop(1n, $18)), $1d => $1e => Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $23 => Allen_Interval_propogatex27x27($0, {a1: toDo.a1.a1, a2: toDo.a1.a2}, $23), $2b => $2c => Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), $31 => Allen_Interval_propogatex27x27($0, {a1: toDo.a1.a2, a2: toDo.a1.a1}, $31), $39 => $3a => Allen_Interval_propogatex27($0, $3a), $2c), $1e), $8);
  }
 };
 return Control_Monad_State_State_x3ex3ex3d_Monad_x28x28StateTx20x24stateTypex29x20x24mx29(csegen_468(), csegen_495(), $7, $1);
}

/* Allen.Interval.propogate : Eq k => (k, k) -> Allen k () */
function Allen_Interval_propogate($0, $1) {
 return Control_Monad_Error_Either_map_Functor_x28x28EitherTx20x24ex29x20x24mx29($4 => $5 => $6 => $7 => $8 => Control_Monad_State_State_map_Functor_x28x28StateTx20x24stateTypex29x20x24fx29($b => $c => $d => $e => $d($e), $6, $7, $8), $15 => Builtin_snd($15), Allen_Interval_propogatex27($0, {a1: $1, a2: {h: 0}}));
}

/* Allen.Interval.interval_ : Ord k => k -> Allen k () */
function Allen_Interval_interval_($0, $1) {
 return Prelude_Interfaces_x2ax3e(csegen_191(), Allen_Interval_interval($0, $1), csegen_213());
}

/* Allen.Interval.interval : Ord k => k -> Allen k k */
function Allen_Interval_interval($0, $1) {
 const $7 = otherNames => {
  const $14 = others => {
   const $15 = Data_SortedMap_fromList($0, Prelude_Types_listBind(otherNames, iv => Prelude_Types_pure_Applicative_List({a1: iv, a2: Allen_Relation_AllRelationBits()})));
   return Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29(csegen_462(), Control_Monad_State_Interface_modify(csegen_473(), $29 => Data_SortedMap_map_Functor_x28SortedMapx20x24kx29(iv => ({a1: iv.a1, a2: Data_SortedMap_insert($1, Allen_Relation_AllRelationBits(), iv.a2)}), $29)), $37 => Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29(csegen_462(), Control_Monad_State_Interface_modify(csegen_473(), $40 => Data_SortedMap_insert($1, {a1: $1, a2: $15}, $40)), $48 => Control_Monad_Error_Either_pure_Applicative_x28x28EitherTx20x24ex29x20x24mx29(csegen_185(), $1)));
  };
  return Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29(csegen_462(), Prelude_Types_traverse_Traversable_List(csegen_191(), $10 => Allen_Types_fromID($10), otherNames), $14);
 };
 return Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29(csegen_462(), csegen_508(), $7);
}

/* Allen.Interval.getConstraints : k -> k -> Allen k RelationBits */
function Allen_Interval_getConstraints($0, $1) {
 const $8 = a => {
  const $9 = Data_SortedMap_lookup($1, a.a2);
  switch($9.h) {
   case undefined: /* just */ return Control_Monad_Error_Either_pure_Applicative_x28x28EitherTx20x24ex29x20x24mx29(csegen_185(), $9.a1);
   case 0: /* nothing */ return $12 => Control_Monad_State_State_pure_Applicative_x28x28StateTx20x24stateTypex29x20x24fx29(csegen_179(), {h: 0 /* Left */, a1: {h: 0 /* MissingInterval */, a1: $1}}, $12);
  }
 };
 return Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29(csegen_462(), Allen_Types_fromID($0), $8);
}

/* Allen.Interval.assumeBits : Eq k => k -> RelationBits -> k -> Allen k () */
function Allen_Interval_assumeBits($0, $1, $2, $3) {
 const $a = a => {
  const $11 = b => {
   const $23 = $24 => {
    const $2c = $2d => {
     const $3d = Allen_Relation_allRelations();
     let $3c;
     switch($3d.h) {
      case 0: /* nil */ {
       $3c = {h: 0};
       break;
      }
      case undefined: /* cons */ {
       let $40;
       switch($3d.a2.h) {
        case 0: /* nil */ {
         $40 = {h: 0};
         break;
        }
        case undefined: /* cons */ {
         let $43;
         switch($3d.a2.a2.h) {
          case 0: /* nil */ {
           $43 = {h: 0};
           break;
          }
          case undefined: /* cons */ {
           let $46;
           switch($3d.a2.a2.a2.h) {
            case 0: /* nil */ {
             $46 = {h: 0};
             break;
            }
            case undefined: /* cons */ {
             let $49;
             switch($3d.a2.a2.a2.a2.h) {
              case 0: /* nil */ {
               $49 = {h: 0};
               break;
              }
              case undefined: /* cons */ {
               let $4c;
               switch($3d.a2.a2.a2.a2.a2.h) {
                case 0: /* nil */ {
                 $4c = {h: 0};
                 break;
                }
                case undefined: /* cons */ {
                 let $4f;
                 switch($3d.a2.a2.a2.a2.a2.a2.h) {
                  case 0: /* nil */ {
                   $4f = {h: 0};
                   break;
                  }
                  case undefined: /* cons */ {
                   let $52;
                   switch($3d.a2.a2.a2.a2.a2.a2.a2.h) {
                    case 0: /* nil */ {
                     $52 = {h: 0};
                     break;
                    }
                    case undefined: /* cons */ {
                     let $55;
                     switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                      case 0: /* nil */ {
                       $55 = {h: 0};
                       break;
                      }
                      case undefined: /* cons */ {
                       let $58;
                       switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                        case 0: /* nil */ {
                         $58 = {h: 0};
                         break;
                        }
                        case undefined: /* cons */ {
                         let $5b;
                         switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                          case 0: /* nil */ {
                           $5b = {h: 0};
                           break;
                          }
                          case undefined: /* cons */ {
                           let $5e;
                           switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                            case 0: /* nil */ {
                             $5e = {h: 0};
                             break;
                            }
                            case undefined: /* cons */ {
                             let $61;
                             switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                              case 0: /* nil */ {
                               $61 = {h: 0};
                               break;
                              }
                              case undefined: /* cons */ {
                               let $64;
                               switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                case 0: /* nil */ {
                                 $64 = {h: 0};
                                 break;
                                }
                                case undefined: /* cons */ {
                                 let $67;
                                 switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                  case 0: /* nil */ {
                                   $67 = {h: 0};
                                   break;
                                  }
                                  case undefined: /* cons */ {
                                   let $6a;
                                   switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                    case 0: /* nil */ {
                                     $6a = {h: 0};
                                     break;
                                    }
                                    case undefined: /* cons */ {
                                     let $6d;
                                     switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                      case 0: /* nil */ {
                                       $6d = {h: 0};
                                       break;
                                      }
                                      case undefined: /* cons */ {
                                       let $70;
                                       switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                        case 0: /* nil */ {
                                         $70 = {h: 0};
                                         break;
                                        }
                                        case undefined: /* cons */ {
                                         let $73;
                                         switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                          case 0: /* nil */ {
                                           $73 = {h: 0};
                                           break;
                                          }
                                          case undefined: /* cons */ {
                                           let $76;
                                           switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                            case 0: /* nil */ {
                                             $76 = {h: 0};
                                             break;
                                            }
                                            case undefined: /* cons */ {
                                             let $79;
                                             switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                              case 0: /* nil */ {
                                               $79 = {h: 0};
                                               break;
                                              }
                                              case undefined: /* cons */ {
                                               let $7c;
                                               switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                case 0: /* nil */ {
                                                 $7c = {h: 0};
                                                 break;
                                                }
                                                case undefined: /* cons */ {
                                                 let $7f;
                                                 switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                  case 0: /* nil */ {
                                                   $7f = {h: 0};
                                                   break;
                                                  }
                                                  case undefined: /* cons */ {
                                                   let $82;
                                                   switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                    case 0: /* nil */ {
                                                     $82 = {h: 0};
                                                     break;
                                                    }
                                                    case undefined: /* cons */ {
                                                     let $85;
                                                     switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                      case 0: /* nil */ {
                                                       $85 = {h: 0};
                                                       break;
                                                      }
                                                      case undefined: /* cons */ {
                                                       let $88;
                                                       switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                        case 0: /* nil */ {
                                                         $88 = {h: 0};
                                                         break;
                                                        }
                                                        case undefined: /* cons */ {
                                                         let $8b;
                                                         switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                          case 0: /* nil */ {
                                                           $8b = {h: 0};
                                                           break;
                                                          }
                                                          case undefined: /* cons */ {
                                                           let $8e;
                                                           switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                            case 0: /* nil */ {
                                                             $8e = {h: 0};
                                                             break;
                                                            }
                                                            case undefined: /* cons */ {
                                                             let $91;
                                                             switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                              case 0: /* nil */ {
                                                               $91 = {h: 0};
                                                               break;
                                                              }
                                                              case undefined: /* cons */ {
                                                               let $94;
                                                               switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                case 0: /* nil */ {
                                                                 $94 = {h: 0};
                                                                 break;
                                                                }
                                                                case undefined: /* cons */ {
                                                                 let $97;
                                                                 switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                  case 0: /* nil */ {
                                                                   $97 = {h: 0};
                                                                   break;
                                                                  }
                                                                  case undefined: /* cons */ {
                                                                   let $9a;
                                                                   switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                    case 0: /* nil */ {
                                                                     $9a = {h: 0};
                                                                     break;
                                                                    }
                                                                    case undefined: /* cons */ {
                                                                     let $9d;
                                                                     switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                      case 0: /* nil */ {
                                                                       $9d = {h: 0};
                                                                       break;
                                                                      }
                                                                      case undefined: /* cons */ {
                                                                       let $a0;
                                                                       switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                        case 0: /* nil */ {
                                                                         $a0 = {h: 0};
                                                                         break;
                                                                        }
                                                                        case undefined: /* cons */ {
                                                                         let $a3;
                                                                         switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                          case 0: /* nil */ {
                                                                           $a3 = {h: 0};
                                                                           break;
                                                                          }
                                                                          case undefined: /* cons */ {
                                                                           let $a6;
                                                                           switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                            case 0: /* nil */ {
                                                                             $a6 = {h: 0};
                                                                             break;
                                                                            }
                                                                            case undefined: /* cons */ {
                                                                             let $a9;
                                                                             switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                              case 0: /* nil */ {
                                                                               $a9 = {h: 0};
                                                                               break;
                                                                              }
                                                                              case undefined: /* cons */ {
                                                                               let $ac;
                                                                               switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                                case 0: /* nil */ {
                                                                                 $ac = {h: 0};
                                                                                 break;
                                                                                }
                                                                                case undefined: /* cons */ {
                                                                                 let $af;
                                                                                 switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                                  case 0: /* nil */ {
                                                                                   $af = {h: 0};
                                                                                   break;
                                                                                  }
                                                                                  case undefined: /* cons */ {
                                                                                   let $b2;
                                                                                   switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                                    case 0: /* nil */ {
                                                                                     $b2 = {h: 0};
                                                                                     break;
                                                                                    }
                                                                                    case undefined: /* cons */ {
                                                                                     let $b5;
                                                                                     switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                                      case 0: /* nil */ {
                                                                                       $b5 = {h: 0};
                                                                                       break;
                                                                                      }
                                                                                      case undefined: /* cons */ {
                                                                                       let $b8;
                                                                                       switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                                        case 0: /* nil */ {
                                                                                         $b8 = {h: 0};
                                                                                         break;
                                                                                        }
                                                                                        case undefined: /* cons */ {
                                                                                         let $bb;
                                                                                         switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                                          case 0: /* nil */ {
                                                                                           $bb = {h: 0};
                                                                                           break;
                                                                                          }
                                                                                          case undefined: /* cons */ {
                                                                                           let $be;
                                                                                           switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                                            case 0: /* nil */ {
                                                                                             $be = {h: 0};
                                                                                             break;
                                                                                            }
                                                                                            case undefined: /* cons */ {
                                                                                             let $c1;
                                                                                             switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                                              case 0: /* nil */ {
                                                                                               $c1 = {h: 0};
                                                                                               break;
                                                                                              }
                                                                                              case undefined: /* cons */ {
                                                                                               let $c4;
                                                                                               switch($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.h) {
                                                                                                case 0: /* nil */ {
                                                                                                 $c4 = {h: 0};
                                                                                                 break;
                                                                                                }
                                                                                                case undefined: /* cons */ {
                                                                                                 $c4 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: Allen_Relation_asList($3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2)};
                                                                                                 break;
                                                                                                }
                                                                                               }
                                                                                               $c1 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $c4};
                                                                                               break;
                                                                                              }
                                                                                             }
                                                                                             $be = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $c1};
                                                                                             break;
                                                                                            }
                                                                                           }
                                                                                           $bb = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $be};
                                                                                           break;
                                                                                          }
                                                                                         }
                                                                                         $b8 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $bb};
                                                                                         break;
                                                                                        }
                                                                                       }
                                                                                       $b5 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $b8};
                                                                                       break;
                                                                                      }
                                                                                     }
                                                                                     $b2 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $b5};
                                                                                     break;
                                                                                    }
                                                                                   }
                                                                                   $af = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $b2};
                                                                                   break;
                                                                                  }
                                                                                 }
                                                                                 $ac = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $af};
                                                                                 break;
                                                                                }
                                                                               }
                                                                               $a9 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $ac};
                                                                               break;
                                                                              }
                                                                             }
                                                                             $a6 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $a9};
                                                                             break;
                                                                            }
                                                                           }
                                                                           $a3 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $a6};
                                                                           break;
                                                                          }
                                                                         }
                                                                         $a0 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $a3};
                                                                         break;
                                                                        }
                                                                       }
                                                                       $9d = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $a0};
                                                                       break;
                                                                      }
                                                                     }
                                                                     $9a = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $9d};
                                                                     break;
                                                                    }
                                                                   }
                                                                   $97 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $9a};
                                                                   break;
                                                                  }
                                                                 }
                                                                 $94 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $97};
                                                                 break;
                                                                }
                                                               }
                                                               $91 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $94};
                                                               break;
                                                              }
                                                             }
                                                             $8e = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $91};
                                                             break;
                                                            }
                                                           }
                                                           $8b = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $8e};
                                                           break;
                                                          }
                                                         }
                                                         $88 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $8b};
                                                         break;
                                                        }
                                                       }
                                                       $85 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $88};
                                                       break;
                                                      }
                                                     }
                                                     $82 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $85};
                                                     break;
                                                    }
                                                   }
                                                   $7f = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $82};
                                                   break;
                                                  }
                                                 }
                                                 $7c = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $7f};
                                                 break;
                                                }
                                               }
                                               $79 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $7c};
                                               break;
                                              }
                                             }
                                             $76 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $79};
                                             break;
                                            }
                                           }
                                           $73 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $76};
                                           break;
                                          }
                                         }
                                         $70 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $73};
                                         break;
                                        }
                                       }
                                       $6d = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $70};
                                       break;
                                      }
                                     }
                                     $6a = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $6d};
                                     break;
                                    }
                                   }
                                   $67 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $6a};
                                   break;
                                  }
                                 }
                                 $64 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $67};
                                 break;
                                }
                               }
                               $61 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $64};
                               break;
                              }
                             }
                             $5e = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $61};
                             break;
                            }
                           }
                           $5b = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $5e};
                           break;
                          }
                         }
                         $58 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $5b};
                         break;
                        }
                       }
                       $55 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a2.a1, a2: $58};
                       break;
                      }
                     }
                     $52 = {a1: $3d.a2.a2.a2.a2.a2.a2.a2.a1, a2: $55};
                     break;
                    }
                   }
                   $4f = {a1: $3d.a2.a2.a2.a2.a2.a2.a1, a2: $52};
                   break;
                  }
                 }
                 $4c = {a1: $3d.a2.a2.a2.a2.a2.a1, a2: $4f};
                 break;
                }
               }
               $49 = {a1: $3d.a2.a2.a2.a2.a1, a2: $4c};
               break;
              }
             }
             $46 = {a1: $3d.a2.a2.a2.a1, a2: $49};
             break;
            }
           }
           $43 = {a1: $3d.a2.a2.a1, a2: $46};
           break;
          }
         }
         $40 = {a1: $3d.a2.a1, a2: $43};
         break;
        }
       }
       $3c = {a1: $3d.a1, a2: $40};
       break;
      }
     }
     const $ca = $cb => {
      let $d5;
      switch($cb.a2) {
       case 0: {
        $d5 = 1;
        break;
       }
       case 1: {
        $d5 = 2;
        break;
       }
       case 2: {
        $d5 = 4;
        break;
       }
       case 3: {
        $d5 = 8;
        break;
       }
       case 4: {
        $d5 = 16;
        break;
       }
       case 5: {
        $d5 = 32;
        break;
       }
       case 6: {
        $d5 = 64;
        break;
       }
       case 7: {
        $d5 = 128;
        break;
       }
       case 8: {
        $d5 = 256;
        break;
       }
       case 9: {
        $d5 = 512;
        break;
       }
       case 10: {
        $d5 = 1024;
        break;
       }
       case 11: {
        $d5 = 2048;
        break;
       }
       case 12: {
        $d5 = 4096;
        break;
       }
      }
      const $d4 = ($d5&$2);
      const $d2 = Prelude_EqOrd_x2fx3d_Eq_Bits16($d4, 0);
      const $ce = Prelude_Interfaces_guard(csegen_204(), $d2);
      return Prelude_Types_listBind($ce, $da => Prelude_Types_pure_Applicative_List($cb));
     };
     const $3a = Prelude_Types_listBind($3c, $ca);
     const $dd = $de => {
      let $e1;
      switch($de.a2) {
       case 0: {
        $e1 = 4096;
        break;
       }
       case 1: {
        $e1 = 2048;
        break;
       }
       case 2: {
        $e1 = 1024;
        break;
       }
       case 3: {
        $e1 = 512;
        break;
       }
       case 4: {
        $e1 = 256;
        break;
       }
       case 5: {
        $e1 = 128;
        break;
       }
       case 6: {
        $e1 = 64;
        break;
       }
       case 7: {
        $e1 = 32;
        break;
       }
       case 8: {
        $e1 = 16;
        break;
       }
       case 9: {
        $e1 = 8;
        break;
       }
       case 10: {
        $e1 = 4;
        break;
       }
       case 11: {
        $e1 = 2;
        break;
       }
       case 12: {
        $e1 = 1;
        break;
       }
      }
      return Prelude_Types_pure_Applicative_List($e1);
     };
     const $38 = Prelude_Types_listBind($3a, $dd);
     const $33 = Prelude_Types_foldl_Foldable_List(csegen_146(), 0, $38);
     const $30 = Allen_Interval_setRelation(b, $33, $1);
     return Data_SortedMap_insert($3, $30, $2d);
    };
    const $28 = Control_Monad_State_Interface_modify(csegen_473(), $2c);
    return Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29(csegen_462(), $28, $e6 => Allen_Interval_propogate($0, {a1: $1, a2: $3}));
   };
   return Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29(csegen_462(), Control_Monad_State_Interface_modify(csegen_473(), $1a => Data_SortedMap_insert($1, Allen_Interval_setRelation(a, $2, $3), $1a)), $23);
  };
  return Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29(csegen_462(), Allen_Types_fromID($3), $11);
 };
 return Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29(csegen_462(), Allen_Types_fromID($1), $a);
}

/* Allen.Interval.allIntervalsExcept : Eq k => List k -> Allen k (List k) */
function Allen_Interval_allIntervalsExcept($0, $1) {
 const $7 = allIntervals => {
  const $e = i => {
   let $14;
   switch(Prelude_Types_elem(csegen_116(), $0, i, $1)) {
    case 1: {
     $14 = 0;
     break;
    }
    case 0: {
     $14 = 1;
     break;
    }
   }
   const $10 = Prelude_Interfaces_guard(csegen_204(), $14);
   return Prelude_Types_listBind($10, $1d => Prelude_Types_pure_Applicative_List(i));
  };
  const $b = Prelude_Types_listBind(allIntervals, $e);
  return Control_Monad_Error_Either_pure_Applicative_x28x28EitherTx20x24ex29x20x24mx29(csegen_185(), $b);
 };
 return Control_Monad_Error_Either_x3ex3ex3d_Monad_x28x28EitherTx20x24ex29x20x24mx29(csegen_462(), csegen_508(), $7);
}


try{__mainExpression_0()}catch(e){if(e instanceof IdrisError){console.log('ERROR: ' + e.message)}else{throw e} }
