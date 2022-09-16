"use strict";
var main;
(function() {
var $rt_seed = 2463534242;
function $rt_nextId() {
    var x = $rt_seed;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
}
function $rt_compare(a, b) {
    return a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1;
}
function $rt_isInstance(obj, cls) {
    return obj !== null && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls);
}
function $rt_isAssignable(from, to) {
    if (from === to) {
        return true;
    }
    if (to.$meta.item !== null) {
        return from.$meta.item !== null && $rt_isAssignable(from.$meta.item, to.$meta.item);
    }
    var supertypes = from.$meta.supertypes;
    for (var i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            return true;
        }
    }
    return false;
}
function $rt_castToInterface(obj, cls) {
    if (obj !== null && !$rt_isInstance(obj, cls)) {
        $rt_throwCCE();
    }
    return obj;
}
function $rt_castToClass(obj, cls) {
    if (obj !== null && !(obj instanceof cls)) {
        $rt_throwCCE();
    }
    return obj;
}
Array.prototype.fill = Array.prototype.fill || function(value, start, end) {
    var len = this.length;
    if (!len) return this;
    start = start | 0;
    var i = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
    end = end === undefined ? len : end | 0;
    end = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
    for (;i < end;i++) {
        this[i] = value;
    }
    return this;
};
function $rt_createArray(cls, sz) {
    var data = new Array(sz);
    data.fill(null);
    return new $rt_array(cls, data);
}
function $rt_createArrayFromData(cls, init) {
    return $rt_wrapArray(cls, init);
}
function $rt_wrapArray(cls, data) {
    return new $rt_array(cls, data);
}
function $rt_createUnfilledArray(cls, sz) {
    return new $rt_array(cls, new Array(sz));
}
function $rt_createNumericArray(cls, nativeArray) {
    return new $rt_array(cls, nativeArray);
}
var $rt_createLongArray;
var $rt_createLongArrayFromData;
if (typeof BigInt64Array !== 'function') {
    $rt_createLongArray = function(sz) {
        var data = new Array(sz);
        var arr = new $rt_array($rt_longcls(), data);
        data.fill(Long_ZERO);
        return arr;
    };
    $rt_createLongArrayFromData = function(init) {
        return new $rt_array($rt_longcls(), init);
    };
} else {
    $rt_createLongArray = function(sz) {
        return $rt_createNumericArray($rt_longcls(), new BigInt64Array(sz));
    };
    $rt_createLongArrayFromData = function(data) {
        var buffer = new BigInt64Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_longcls(), buffer);
    };
}
function $rt_createCharArray(sz) {
    return $rt_createNumericArray($rt_charcls(), new Uint16Array(sz));
}
function $rt_createCharArrayFromData(data) {
    var buffer = new Uint16Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_charcls(), buffer);
}
function $rt_createByteArray(sz) {
    return $rt_createNumericArray($rt_bytecls(), new Int8Array(sz));
}
function $rt_createByteArrayFromData(data) {
    var buffer = new Int8Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_bytecls(), buffer);
}
function $rt_createShortArray(sz) {
    return $rt_createNumericArray($rt_shortcls(), new Int16Array(sz));
}
function $rt_createShortArrayFromData(data) {
    var buffer = new Int16Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_shortcls(), buffer);
}
function $rt_createIntArray(sz) {
    return $rt_createNumericArray($rt_intcls(), new Int32Array(sz));
}
function $rt_createIntArrayFromData(data) {
    var buffer = new Int32Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_intcls(), buffer);
}
function $rt_createBooleanArray(sz) {
    return $rt_createNumericArray($rt_booleancls(), new Int8Array(sz));
}
function $rt_createBooleanArrayFromData(data) {
    var buffer = new Int8Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_booleancls(), buffer);
}
function $rt_createFloatArray(sz) {
    return $rt_createNumericArray($rt_floatcls(), new Float32Array(sz));
}
function $rt_createFloatArrayFromData(data) {
    var buffer = new Float32Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_floatcls(), buffer);
}
function $rt_createDoubleArray(sz) {
    return $rt_createNumericArray($rt_doublecls(), new Float64Array(sz));
}
function $rt_createDoubleArrayFromData(data) {
    var buffer = new Float64Array(data.length);
    buffer.set(data);
    return $rt_createNumericArray($rt_doublecls(), buffer);
}
function $rt_arraycls(cls) {
    var result = cls.$array;
    if (result === null) {
        var arraycls = {  };
        var name = "[" + cls.$meta.binaryName;
        arraycls.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false, simpleName : null, declaringClass : null, enclosingClass : null };
        arraycls.classObject = null;
        arraycls.$array = null;
        result = arraycls;
        cls.$array = arraycls;
    }
    return result;
}
function $rt_createcls() {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
}
function $rt_createPrimitiveCls(name, binaryName) {
    var cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    cls.$meta.simpleName = null;
    cls.$meta.declaringClass = null;
    cls.$meta.enclosingClass = null;
    return cls;
}
var $rt_booleanclsCache = null;
function $rt_booleancls() {
    if ($rt_booleanclsCache === null) {
        $rt_booleanclsCache = $rt_createPrimitiveCls("boolean", "Z");
    }
    return $rt_booleanclsCache;
}
var $rt_charclsCache = null;
function $rt_charcls() {
    if ($rt_charclsCache === null) {
        $rt_charclsCache = $rt_createPrimitiveCls("char", "C");
    }
    return $rt_charclsCache;
}
var $rt_byteclsCache = null;
function $rt_bytecls() {
    if ($rt_byteclsCache === null) {
        $rt_byteclsCache = $rt_createPrimitiveCls("byte", "B");
    }
    return $rt_byteclsCache;
}
var $rt_shortclsCache = null;
function $rt_shortcls() {
    if ($rt_shortclsCache === null) {
        $rt_shortclsCache = $rt_createPrimitiveCls("short", "S");
    }
    return $rt_shortclsCache;
}
var $rt_intclsCache = null;
function $rt_intcls() {
    if ($rt_intclsCache === null) {
        $rt_intclsCache = $rt_createPrimitiveCls("int", "I");
    }
    return $rt_intclsCache;
}
var $rt_longclsCache = null;
function $rt_longcls() {
    if ($rt_longclsCache === null) {
        $rt_longclsCache = $rt_createPrimitiveCls("long", "J");
    }
    return $rt_longclsCache;
}
var $rt_floatclsCache = null;
function $rt_floatcls() {
    if ($rt_floatclsCache === null) {
        $rt_floatclsCache = $rt_createPrimitiveCls("float", "F");
    }
    return $rt_floatclsCache;
}
var $rt_doubleclsCache = null;
function $rt_doublecls() {
    if ($rt_doubleclsCache === null) {
        $rt_doubleclsCache = $rt_createPrimitiveCls("double", "D");
    }
    return $rt_doubleclsCache;
}
var $rt_voidclsCache = null;
function $rt_voidcls() {
    if ($rt_voidclsCache === null) {
        $rt_voidclsCache = $rt_createPrimitiveCls("void", "V");
    }
    return $rt_voidclsCache;
}
function $rt_throw(ex) {
    throw $rt_exception(ex);
}
var $rt_javaExceptionProp = Symbol("javaException");
function $rt_exception(ex) {
    var err = ex.$jsException;
    if (!err) {
        err = new Error("Java exception thrown");
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(err);
        }
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return err;
}
function $rt_fillStack(err, ex) {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        var stack = $rt_decodeStack(err.stack);
        var javaStack = $rt_createArray($rt_stecls(), stack.length);
        var elem;
        var noStack = false;
        for (var i = 0;i < stack.length;++i) {
            var element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
}
function $rt_createMultiArray(cls, dimensions) {
    var first = 0;
    for (var i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
        if (dimensions[i] === 0) {
            first = i;
            break;
        }
    }
    if (first > 0) {
        for (i = 0;i < first;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
        }
        if (first === dimensions.length - 1) {
            return $rt_createArray(cls, dimensions[first]);
        }
    }
    var arrays = new Array($rt_primitiveArrayCount(dimensions, first));
    var firstDim = dimensions[first] | 0;
    for (i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createArray(cls, firstDim);
    }
    return $rt_createMultiArrayImpl(cls, arrays, dimensions, first);
}
function $rt_createByteMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_bytecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createByteArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_bytecls(), arrays, dimensions);
}
function $rt_createCharMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_charcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createCharArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_charcls(), arrays, dimensions, 0);
}
function $rt_createBooleanMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_booleancls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createBooleanArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_booleancls(), arrays, dimensions, 0);
}
function $rt_createShortMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_shortcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createShortArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_shortcls(), arrays, dimensions, 0);
}
function $rt_createIntMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_intcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createIntArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_intcls(), arrays, dimensions, 0);
}
function $rt_createLongMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_longcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createLongArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_longcls(), arrays, dimensions, 0);
}
function $rt_createFloatMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_floatcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createFloatArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_floatcls(), arrays, dimensions, 0);
}
function $rt_createDoubleMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_doublecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createDoubleArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_doublecls(), arrays, dimensions, 0);
}
function $rt_primitiveArrayCount(dimensions, start) {
    var val = dimensions[start + 1] | 0;
    for (var i = start + 2;i < dimensions.length;i = i + 1 | 0) {
        val = val * (dimensions[i] | 0) | 0;
        if (val === 0) {
            break;
        }
    }
    return val;
}
function $rt_createMultiArrayImpl(cls, arrays, dimensions, start) {
    var limit = arrays.length;
    for (var i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
        cls = $rt_arraycls(cls);
        var dim = dimensions[i];
        var index = 0;
        var packedIndex = 0;
        while (index < limit) {
            var arr = $rt_createUnfilledArray(cls, dim);
            for (var j = 0;j < dim;j = j + 1 | 0) {
                arr.data[j] = arrays[index];
                index = index + 1 | 0;
            }
            arrays[packedIndex] = arr;
            packedIndex = packedIndex + 1 | 0;
        }
        limit = packedIndex;
    }
    return arrays[0];
}
function $rt_assertNotNaN(value) {
    if (typeof value === 'number' && isNaN(value)) {
        throw "NaN";
    }
    return value;
}
function $rt_createOutputFunction(printFunction) {
    var buffer = "";
    var utf8Buffer = 0;
    var utf8Remaining = 0;
    function putCodePoint(ch) {
        if (ch === 0xA) {
            printFunction(buffer);
            buffer = "";
        } else if (ch < 0x10000) {
            buffer += String.fromCharCode(ch);
        } else {
            ch = ch - 0x10000 | 0;
            var hi = (ch >> 10) + 0xD800;
            var lo = (ch & 0x3FF) + 0xDC00;
            buffer += String.fromCharCode(hi, lo);
        }
    }
    return function(ch) {
        if ((ch & 0x80) === 0) {
            putCodePoint(ch);
        } else if ((ch & 0xC0) === 0x80) {
            if (utf8Buffer > 0) {
                utf8Remaining <<= 6;
                utf8Remaining |= ch & 0x3F;
                if ( --utf8Buffer === 0) {
                    putCodePoint(utf8Remaining);
                }
            }
        } else if ((ch & 0xE0) === 0xC0) {
            utf8Remaining = ch & 0x1F;
            utf8Buffer = 1;
        } else if ((ch & 0xF0) === 0xE0) {
            utf8Remaining = ch & 0x0F;
            utf8Buffer = 2;
        } else if ((ch & 0xF8) === 0xF0) {
            utf8Remaining = ch & 0x07;
            utf8Buffer = 3;
        }
    };
}
var $rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : typeof console === "object" ? $rt_createOutputFunction(function(msg) {
    console.info(msg);
}) : function() {
};
var $rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : typeof console === "object" ? $rt_createOutputFunction(function(msg) {
    console.error(msg);
}) : function() {
};
var $rt_packageData = null;
function $rt_packages(data) {
    var i = 0;
    var packages = new Array(data.length);
    for (var j = 0;j < data.length;++j) {
        var prefixIndex = data[i++];
        var prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
}
function $rt_metadata(data) {
    var packages = $rt_packageData;
    var i = 0;
    while (i < data.length) {
        var cls = data[i++];
        cls.$meta = {  };
        var m = cls.$meta;
        var className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            var packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        var superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        var flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        var innerClassInfo = data[i++];
        if (innerClassInfo === 0) {
            m.simpleName = null;
            m.declaringClass = null;
            m.enclosingClass = null;
        } else {
            var enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            var declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            var simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        var clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        var virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (var j = 0;j < virtualMethods.length;j += 2) {
                var name = virtualMethods[j];
                var func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (var k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
}
function $rt_wrapFunction0(f) {
    return function() {
        return f(this);
    };
}
function $rt_wrapFunction1(f) {
    return function(p1) {
        return f(this, p1);
    };
}
function $rt_wrapFunction2(f) {
    return function(p1, p2) {
        return f(this, p1, p2);
    };
}
function $rt_wrapFunction3(f) {
    return function(p1, p2, p3) {
        return f(this, p1, p2, p3, p3);
    };
}
function $rt_wrapFunction4(f) {
    return function(p1, p2, p3, p4) {
        return f(this, p1, p2, p3, p4);
    };
}
function $rt_threadStarter(f) {
    return function() {
        var args = Array.prototype.slice.apply(arguments);
        $rt_startThread(function() {
            f.apply(this, args);
        });
    };
}
function $rt_mainStarter(f) {
    return function(args, callback) {
        if (!args) {
            args = [];
        }
        var javaArgs = $rt_createArray($rt_objcls(), args.length);
        for (var i = 0;i < args.length;++i) {
            javaArgs.data[i] = $rt_str(args[i]);
        }
        $rt_startThread(function() {
            f.call(null, javaArgs);
        }, callback);
    };
}
var $rt_stringPool_instance;
function $rt_stringPool(strings) {
    $rt_stringPool_instance = new Array(strings.length);
    for (var i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
}
function $rt_s(index) {
    return $rt_stringPool_instance[index];
}
function $rt_eraseClinit(target) {
    return target.$clinit = function() {
    };
}
var $rt_numberConversionView = new DataView(new ArrayBuffer(8));
var $rt_doubleToLongBits;
var $rt_longBitsToDouble;
if (typeof BigInt !== 'function') {
    $rt_doubleToLongBits = function(n) {
        $rt_numberConversionView.setFloat64(0, n, true);
        return new Long($rt_numberConversionView.getInt32(0, true), $rt_numberConversionView.getInt32(4, true));
    };
    $rt_longBitsToDouble = function(n) {
        $rt_numberConversionView.setInt32(0, n.lo, true);
        $rt_numberConversionView.setInt32(4, n.hi, true);
        return $rt_numberConversionView.getFloat64(0, true);
    };
} else {
    $rt_doubleToLongBits = function(n) {
        $rt_numberConversionView.setFloat64(0, n, true);
        var lo = $rt_numberConversionView.getInt32(0, true);
        var hi = $rt_numberConversionView.getInt32(4, true);
        return BigInt.asIntN(64, BigInt.asUintN(32, BigInt(lo)) | BigInt(hi) << BigInt(32));
    };
    $rt_longBitsToDouble = function(n) {
        var hi = Number(BigInt.asIntN(32, n >> BigInt(32)));
        var lo = Number(BigInt.asIntN(32, n & BigInt(0xFFFFFFFF)));
        $rt_numberConversionView.setInt32(0, lo, true);
        $rt_numberConversionView.setInt32(4, hi, true);
        return $rt_numberConversionView.getFloat64(0, true);
    };
}
function $rt_floatToIntBits(n) {
    $rt_numberConversionView.setFloat32(0, n);
    return $rt_numberConversionView.getInt32(0);
}
function $rt_intBitsToFloat(n) {
    $rt_numberConversionView.setInt32(0, n);
    return $rt_numberConversionView.getFloat32(0);
}
function $rt_javaException(e) {
    return e instanceof Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null;
}
function $rt_jsException(e) {
    return typeof e.$jsException === 'object' ? e.$jsException : null;
}
function $rt_wrapException(err) {
    var ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
}
function $dbg_class(obj) {
    var cls = obj.constructor;
    var arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    var clsName = "";
    if (cls === $rt_booleancls()) {
        clsName = "boolean";
    } else if (cls === $rt_bytecls()) {
        clsName = "byte";
    } else if (cls === $rt_shortcls()) {
        clsName = "short";
    } else if (cls === $rt_charcls()) {
        clsName = "char";
    } else if (cls === $rt_intcls()) {
        clsName = "int";
    } else if (cls === $rt_longcls()) {
        clsName = "long";
    } else if (cls === $rt_floatcls()) {
        clsName = "float";
    } else if (cls === $rt_doublecls()) {
        clsName = "double";
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
}
function Long(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
}
Long.prototype.__teavm_class__ = function() {
    return "long";
};
function Long_isPositive(a) {
    return (a.hi & 0x80000000) === 0;
}
function Long_isNegative(a) {
    return (a.hi & 0x80000000) !== 0;
}
var Long_MAX_NORMAL = 1 << 18;
var Long_ZERO;
var Long_create;
var Long_fromInt;
var Long_fromNumber;
var Long_toNumber;
var Long_hi;
var Long_lo;
if (typeof BigInt !== "function") {
    Long.prototype.toString = function() {
        var result = [];
        var n = this;
        var positive = Long_isPositive(n);
        if (!positive) {
            n = Long_neg(n);
        }
        var radix = new Long(10, 0);
        do  {
            var divRem = Long_divRem(n, radix);
            result.push(String.fromCharCode(48 + divRem[1].lo));
            n = divRem[0];
        }while (n.lo !== 0 || n.hi !== 0);
        result = (result.reverse()).join('');
        return positive ? result : "-" + result;
    };
    Long.prototype.valueOf = function() {
        return Long_toNumber(this);
    };
    Long_ZERO = new Long(0, 0);
    Long_fromInt = function(val) {
        return new Long(val,  -(val < 0) | 0);
    };
    Long_fromNumber = function(val) {
        if (val >= 0) {
            return new Long(val | 0, val / 0x100000000 | 0);
        } else {
            return Long_neg(new Long( -val | 0,  -val / 0x100000000 | 0));
        }
    };
    Long_create = function(lo, hi) {
        return new Long(lo, hi);
    };
    Long_toNumber = function(val) {
        return 0x100000000 * val.hi + (val.lo >>> 0);
    };
    Long_hi = function(val) {
        return val.hi;
    };
    Long_lo = function(val) {
        return val.lo;
    };
} else {
    Long_ZERO = BigInt(0);
    Long_create = function(lo, hi) {
        return BigInt.asIntN(64, BigInt.asUintN(32, BigInt(lo)) | BigInt(hi) << BigInt(32));
    };
    Long_fromInt = function(val) {
        return BigInt(val);
    };
    Long_fromNumber = function(val) {
        return BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val));
    };
    Long_toNumber = function(val) {
        return Number(val);
    };
    Long_hi = function(val) {
        return Number(BigInt.asIntN(64, val >> BigInt(32))) | 0;
    };
    Long_lo = function(val) {
        return Number(BigInt.asIntN(32, val)) | 0;
    };
}
var $rt_imul = Math.imul || function(a, b) {
    var ah = a >>> 16 & 0xFFFF;
    var al = a & 0xFFFF;
    var bh = b >>> 16 & 0xFFFF;
    var bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
};
var $rt_udiv = function(a, b) {
    return (a >>> 0) / (b >>> 0) >>> 0;
};
var $rt_umod = function(a, b) {
    return (a >>> 0) % (b >>> 0) >>> 0;
};
function $rt_checkBounds(index, array) {
    if (index < 0 || index >= array.length) {
        $rt_throwAIOOBE();
    }
    return index;
}
function $rt_checkUpperBound(index, array) {
    if (index >= array.length) {
        $rt_throwAIOOBE();
    }
    return index;
}
function $rt_checkLowerBound(index) {
    if (index < 0) {
        $rt_throwAIOOBE();
    }
    return index;
}
function $rt_classWithoutFields(superclass) {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
}
function $rt_setCloneMethod(target, f) {
    target.$clone = f;
}
function $rt_cls(cls) {
    return jl_Class_getClass(cls);
}
function $rt_str(str) {
    if (str === null) {
        return null;
    }
    var characters = $rt_createCharArray(str.length);
    var charsBuffer = characters.data;
    for (var i = 0; i < str.length; i = (i + 1) | 0) {
        charsBuffer[i] = str.charCodeAt(i) & 0xFFFF;
    }
    return jl_String__init_(characters);
}
function $rt_ustr(str) {
    if (str === null) {
        return null;
    }
    var data = str.$characters.data;
    var result = "";
    for (var i = 0; i < data.length; i = (i + 1) | 0) {
        result += String.fromCharCode(data[i]);
    }
    return result;
}
function $rt_objcls() { return jl_Object; }
function $rt_stecls() {
    return jl_StackTraceElement;
}
function $rt_nullCheck(val) {
    if (val === null) {
        $rt_throw(jl_NullPointerException__init_());
    }
    return val;
}
function $rt_intern(str) {
    return str;
}
function $rt_getThread() {
    return null;
}
function $rt_setThread(t) {
}
function $rt_createException(message) {
    return jl_RuntimeException__init_(message);
}
function $rt_createStackElement(className, methodName, fileName, lineNumber) {
    return null;
}
function $rt_setStack(e, stack) {
}
function $rt_throwAIOOBE() {
}
function $rt_throwCCE() {
}
var $java = Object.create(null);
function jl_Object() {
    this.$id$ = 0;
}
function jl_Object__init_() {
    var var_0 = new jl_Object();
    jl_Object__init_0(var_0);
    return var_0;
}
function jl_Object__init_0($this) {}
function jl_Object_getClass($this) {
    return jl_Class_getClass($this.constructor);
}
function jl_Object_toString($this) {
    return ((((jl_StringBuilder__init_()).$append((jl_Object_getClass($this)).$getName())).$append($rt_s(0))).$append(jl_Integer_toHexString(jl_Object_identity($this)))).$toString();
}
function jl_Object_identity($this) {
    var $platformThis, var$2;
    $platformThis = $this;
    if (!$platformThis.$id$) {
        var$2 = $rt_nextId();
        $platformThis.$id$ = var$2;
    }
    return $this.$id$;
}
function jl_Throwable() {
    var a = this; jl_Object.call(a);
    a.$message = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
function jl_Throwable__init_() {
    var var_0 = new jl_Throwable();
    jl_Throwable__init_0(var_0);
    return var_0;
}
function jl_Throwable__init_1(var_0) {
    var var_1 = new jl_Throwable();
    jl_Throwable__init_2(var_1, var_0);
    return var_1;
}
function jl_Throwable__init_0($this) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
}
function jl_Throwable__init_2($this, $message) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message = $message;
}
function jl_Throwable_fillInStackTrace($this) {
    return $this;
}
var jl_Exception = $rt_classWithoutFields(jl_Throwable);
function jl_Exception__init_() {
    var var_0 = new jl_Exception();
    jl_Exception__init_0(var_0);
    return var_0;
}
function jl_Exception__init_1(var_0) {
    var var_1 = new jl_Exception();
    jl_Exception__init_2(var_1, var_0);
    return var_1;
}
function jl_Exception__init_0($this) {
    jl_Throwable__init_0($this);
}
function jl_Exception__init_2($this, $message) {
    jl_Throwable__init_2($this, $message);
}
var jl_RuntimeException = $rt_classWithoutFields(jl_Exception);
function jl_RuntimeException__init_0() {
    var var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_1(var_0);
    return var_0;
}
function jl_RuntimeException__init_(var_0) {
    var var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_2(var_1, var_0);
    return var_1;
}
function jl_RuntimeException__init_1($this) {
    jl_Exception__init_0($this);
}
function jl_RuntimeException__init_2($this, $message) {
    jl_Exception__init_2($this, $message);
}
var jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException);
function jl_IndexOutOfBoundsException__init_() {
    var var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_0(var_0);
    return var_0;
}
function jl_IndexOutOfBoundsException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
var ju_Arrays = $rt_classWithoutFields();
function ju_Arrays_copyOf($array, $length) {
    var var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createCharArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
}
function ju_Arrays_fill($a, $fromIndex, $toIndex, $val) {
    var var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    while ($fromIndex < $toIndex) {
        var$5 = $a.data;
        var$6 = $fromIndex + 1 | 0;
        var$5[$fromIndex] = $val;
        $fromIndex = var$6;
    }
}
function ju_Arrays_fill0($a, $val) {
    ju_Arrays_fill($a, 0, $a.data.length, $val);
}
function ju_Arrays_fill1($a, $fromIndex, $toIndex, $val) {
    var var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    while ($fromIndex < $toIndex) {
        var$5 = $a.data;
        var$6 = $fromIndex + 1 | 0;
        var$5[$fromIndex] = $val;
        $fromIndex = var$6;
    }
}
function ju_Arrays_fill2($a, $val) {
    ju_Arrays_fill1($a, 0, $a.data.length, $val);
}
var jlr_Array = $rt_classWithoutFields();
function jlr_Array_getLength(var$1) {
    if (var$1 === null || var$1.constructor.$meta.item === undefined) {
        $rt_throw(jl_IllegalArgumentException__init_());
    }
    return var$1.data.length;
}
function jlr_Array_newInstance($componentType, $length) {
    if ($componentType === null)
        $rt_throw(jl_NullPointerException__init_());
    if ($componentType === $rt_cls($rt_voidcls()))
        $rt_throw(jl_IllegalArgumentException__init_());
    if ($length < 0)
        $rt_throw(jl_NegativeArraySizeException__init_());
    return jlr_Array_newInstanceImpl($componentType.$getPlatformClass(), $length);
}
function jlr_Array_newInstanceImpl(var$1, var$2) {
    if (var$1.$meta.primitive) {
        if (var$1 == $rt_bytecls()) {
            return $rt_createByteArray(var$2);
        }
        if (var$1 == $rt_shortcls()) {
            return $rt_createShortArray(var$2);
        }
        if (var$1 == $rt_charcls()) {
            return $rt_createCharArray(var$2);
        }
        if (var$1 == $rt_intcls()) {
            return $rt_createIntArray(var$2);
        }
        if (var$1 == $rt_longcls()) {
            return $rt_createLongArray(var$2);
        }
        if (var$1 == $rt_floatcls()) {
            return $rt_createFloatArray(var$2);
        }
        if (var$1 == $rt_doublecls()) {
            return $rt_createDoubleArray(var$2);
        }
        if (var$1 == $rt_booleancls()) {
            return $rt_createBooleanArray(var$2);
        }
    } else {
        return $rt_createArray(var$1, var$2)
    }
}
var jl_System = $rt_classWithoutFields();
function jl_System_arraycopy($src, $srcPos, $dest, $destPos, $length) {
    var var$6, $srcType, $targetType, $srcArray, $i, var$11, var$12, $elem;
    if ($src !== null && $dest !== null) {
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src)) {
            var$6 = $destPos + $length | 0;
            if (var$6 <= jlr_Array_getLength($dest)) {
                a: {
                    b: {
                        if ($src !== $dest) {
                            $srcType = (jl_Object_getClass($src)).$getComponentType();
                            $targetType = (jl_Object_getClass($dest)).$getComponentType();
                            if ($srcType !== null && $targetType !== null) {
                                if ($srcType === $targetType)
                                    break b;
                                if (!$srcType.$isPrimitive() && !$targetType.$isPrimitive()) {
                                    $srcArray = $src;
                                    $i = 0;
                                    var$6 = $srcPos;
                                    while ($i < $length) {
                                        var$11 = $srcArray.data;
                                        var$12 = var$6 + 1 | 0;
                                        $elem = var$11[var$6];
                                        if (!$targetType.$isInstance($elem)) {
                                            jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                            $rt_throw(jl_ArrayStoreException__init_());
                                        }
                                        $i = $i + 1 | 0;
                                        var$6 = var$12;
                                    }
                                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                    return;
                                }
                                if (!$srcType.$isPrimitive())
                                    break a;
                                if ($targetType.$isPrimitive())
                                    break b;
                                else
                                    break a;
                            }
                            $rt_throw(jl_ArrayStoreException__init_());
                        }
                    }
                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                    return;
                }
                $rt_throw(jl_ArrayStoreException__init_());
            }
        }
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    }
    $rt_throw(jl_NullPointerException__init_0($rt_s(1)));
}
function jl_System_doArrayCopy(var$1, var$2, var$3, var$4, var$5) {
    if (var$1 !== var$3 || var$4 < var$2) {
        for (var i = 0; i < var$5; i = (i + 1) | 0) {
            var$3.data[var$4++] = var$1.data[var$2++];
        }
    } else {
        var$2 = (var$2 + var$5) | 0;
        var$4 = (var$4 + var$5) | 0;
        for (var i = 0; i < var$5; i = (i + 1) | 0) {
            var$3.data[--var$4] = var$1.data[--var$2];
        }
    }
}
var otj_JSObject = $rt_classWithoutFields(0);
var sb_JSExtendedDigest = $rt_classWithoutFields();
function sb_JSExtendedDigest__init_$static($this) {
    jl_Object__init_0($this);
}
var ji_Serializable = $rt_classWithoutFields(0);
var jl_Number = $rt_classWithoutFields();
var jl_Comparable = $rt_classWithoutFields(0);
var jl_Integer = $rt_classWithoutFields(jl_Number);
var jl_Integer_TYPE = null;
function jl_Integer_$callClinit() {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
}
function jl_Integer_toHexString($i) {
    jl_Integer_$callClinit();
    return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
}
function jl_Integer_numberOfLeadingZeros($i) {
    var $n, var$3, var$4;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i >>> 16;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    var$4 = var$3 >>> 8;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 8;
    var$3 = var$4 >>> 4;
    if (!var$3)
        var$3 = var$4;
    else
        $n = $n | 4;
    var$4 = var$3 >>> 2;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 2;
    if (var$4 >>> 1)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
}
function jl_Integer__clinit_() {
    jl_Integer_TYPE = $rt_cls($rt_intcls());
}
var jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException);
function jl_NullPointerException__init_0(var_0) {
    var var_1 = new jl_NullPointerException();
    jl_NullPointerException__init_1(var_1, var_0);
    return var_1;
}
function jl_NullPointerException__init_() {
    var var_0 = new jl_NullPointerException();
    jl_NullPointerException__init_2(var_0);
    return var_0;
}
function jl_NullPointerException__init_1($this, $message) {
    jl_RuntimeException__init_2($this, $message);
}
function jl_NullPointerException__init_2($this) {
    jl_RuntimeException__init_1($this);
}
var jl_Error = $rt_classWithoutFields(jl_Throwable);
function jl_Error__init_() {
    var var_0 = new jl_Error();
    jl_Error__init_0(var_0);
    return var_0;
}
function jl_Error__init_1(var_0) {
    var var_1 = new jl_Error();
    jl_Error__init_2(var_1, var_0);
    return var_1;
}
function jl_Error__init_0($this) {
    jl_Throwable__init_0($this);
}
function jl_Error__init_2($this, $message) {
    jl_Throwable__init_2($this, $message);
}
var jl_LinkageError = $rt_classWithoutFields(jl_Error);
function jl_LinkageError__init_(var_0) {
    var var_1 = new jl_LinkageError();
    jl_LinkageError__init_0(var_1, var_0);
    return var_1;
}
function jl_LinkageError__init_0($this, $message) {
    jl_Error__init_2($this, $message);
}
var jl_IncompatibleClassChangeError = $rt_classWithoutFields(jl_LinkageError);
function jl_IncompatibleClassChangeError__init_(var_0) {
    var var_1 = new jl_IncompatibleClassChangeError();
    jl_IncompatibleClassChangeError__init_0(var_1, var_0);
    return var_1;
}
function jl_IncompatibleClassChangeError__init_0($this, $message) {
    jl_LinkageError__init_0($this, $message);
}
var jl_NoSuchFieldError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
function jl_NoSuchFieldError__init_(var_0) {
    var var_1 = new jl_NoSuchFieldError();
    jl_NoSuchFieldError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchFieldError__init_0($this, $message) {
    jl_IncompatibleClassChangeError__init_0($this, $message);
}
var g_GF2_192_Base = $rt_classWithoutFields();
function g_GF2_192_Base__init_$static($this) {
    jl_Object__init_0($this);
}
function g_GF2_192() {
    g_GF2_192_Base.call(this);
    this.$word = null;
}
var g_GF2_192_irredMuls = null;
var g_GF2_192_powTable0 = null;
var g_GF2_192_powTable1 = null;
var g_GF2_192_powTable2 = null;
var g_GF2_192_$assertionsDisabled = 0;
function g_GF2_192_$callClinit() {
    g_GF2_192_$callClinit = $rt_eraseClinit(g_GF2_192);
    g_GF2_192__clinit_();
}
function g_GF2_192__init_() {
    var var_0 = new g_GF2_192();
    g_GF2_192__init_0(var_0);
    return var_0;
}
function g_GF2_192__init_1(var_0) {
    var var_1 = new g_GF2_192();
    g_GF2_192__init_2(var_1, var_0);
    return var_1;
}
function g_GF2_192__init_3(var_0) {
    var var_1 = new g_GF2_192();
    g_GF2_192__init_4(var_1, var_0);
    return var_1;
}
function g_GF2_192__init_5(var_0) {
    var var_1 = new g_GF2_192();
    g_GF2_192__init_6(var_1, var_0);
    return var_1;
}
function g_GF2_192__init_7(var_0, var_1) {
    var var_2 = new g_GF2_192();
    g_GF2_192__init_8(var_2, var_0, var_1);
    return var_2;
}
function g_GF2_192__init_0($this) {
    g_GF2_192_$callClinit();
    g_GF2_192_Base__init_$static($this);
    $this.$word = $rt_createLongArray(3);
}
function g_GF2_192__init_2($this, $that) {
    g_GF2_192_$callClinit();
    g_GF2_192_Base__init_$static($this);
    $this.$word = $rt_createLongArray(3);
    $this.$word.data[0] = $that.$word.data[0];
    $this.$word.data[1] = $that.$word.data[1];
    $this.$word.data[2] = $that.$word.data[2];
}
function g_GF2_192__init_4($this, $that) {
    g_GF2_192_$callClinit();
    g_GF2_192_Base__init_$static($this);
    $this.$word = $rt_createLongArray(3);
    $this.$word.data[0] = Long_and(Long_fromInt($that), Long_create(4294967295, 0));
}
function g_GF2_192__init_6($this, $that) {
    g_GF2_192_$callClinit();
    g_GF2_192__init_8($this, $that, 0);
}
function g_GF2_192__init_8($this, $that, $pos) {
    var $i, var$4, var$5;
    g_GF2_192_$callClinit();
    g_GF2_192_Base__init_$static($this);
    $this.$word = $rt_createLongArray(3);
    if (!g_GF2_192_$assertionsDisabled && $that.data.length < ($pos + 24 | 0))
        $rt_throw(jl_AssertionError__init_());
    $i = 0;
    while ($i < 8) {
        var$4 = $that.data;
        var$5 = $this.$word.data;
        var$5[0] = Long_or(var$5[0], Long_shl(Long_and(Long_fromInt(var$4[$i + $pos | 0]), Long_fromInt(255)), $i << 3));
        $i = $i + 1 | 0;
    }
    $i = 0;
    while ($i < 8) {
        var$4 = $that.data;
        var$5 = $this.$word.data;
        var$5[1] = Long_or(var$5[1], Long_shl(Long_and(Long_fromInt(var$4[($i + $pos | 0) + 8 | 0]), Long_fromInt(255)), $i << 3));
        $i = $i + 1 | 0;
    }
    $i = 0;
    while ($i < 8) {
        var$4 = $that.data;
        var$5 = $this.$word.data;
        var$5[2] = Long_or(var$5[2], Long_shl(Long_and(Long_fromInt(var$4[($i + $pos | 0) + 16 | 0]), Long_fromInt(255)), $i << 3));
        $i = $i + 1 | 0;
    }
}
function g_GF2_192_add($res, $a, $b) {
    g_GF2_192_$callClinit();
    $res.$word.data[0] = Long_xor($a.$word.data[0], $b.$word.data[0]);
    $res.$word.data[1] = Long_xor($a.$word.data[1], $b.$word.data[1]);
    $res.$word.data[2] = Long_xor($a.$word.data[2], $b.$word.data[2]);
}
function g_GF2_192_mul($res, $a, $b) {
    var $a0muls, var$5, $a1muls, var$7, $a2muls, var$9, $i, $prev, var$12, $w0, $w1, $w2, $j, $multiplier, $modReduceIndex, var$19, var$20, var$21, $index;
    g_GF2_192_$callClinit();
    $a0muls = $rt_createLongArray(16);
    var$5 = $a0muls.data;
    $a1muls = $rt_createLongArray(16);
    var$7 = $a1muls.data;
    $a2muls = $rt_createLongArray(16);
    var$9 = $a2muls.data;
    var$5[1] = $a.$word.data[0];
    var$7[1] = $a.$word.data[1];
    var$9[1] = $a.$word.data[2];
    $i = 2;
    while ($i <= 8) {
        $prev = $i / 2 | 0;
        var$5[$i] = Long_shl(var$5[$prev], 1);
        var$7[$i] = Long_or(Long_shl(var$7[$prev], 1), Long_shru(var$5[$prev], 63));
        var$9[$i] = Long_or(Long_shl(var$9[$prev], 1), Long_shru(var$7[$prev], 63));
        var$5[$i] = Long_xor(var$5[$i], g_GF2_192_irredMuls.data[Long_lo(Long_shru(var$9[$prev], 63))]);
        $i = $i * 2 | 0;
    }
    var$5[3] = Long_xor(var$5[1], var$5[2]);
    var$7[3] = Long_xor(var$7[1], var$7[2]);
    var$9[3] = Long_xor(var$9[1], var$9[2]);
    $i = 1;
    while ($i < 4) {
        var$12 = 4 | $i;
        var$5[var$12] = Long_xor(var$5[4], var$5[$i]);
        var$7[var$12] = Long_xor(var$7[4], var$7[$i]);
        var$9[var$12] = Long_xor(var$9[4], var$9[$i]);
        $i = $i + 1 | 0;
    }
    $i = 1;
    while ($i < 8) {
        var$12 = 8 | $i;
        var$5[var$12] = Long_xor(var$5[8], var$5[$i]);
        var$7[var$12] = Long_xor(var$7[8], var$7[$i]);
        var$9[var$12] = Long_xor(var$9[8], var$9[$i]);
        $i = $i + 1 | 0;
    }
    $w0 = Long_ZERO;
    $w1 = Long_ZERO;
    $w2 = Long_ZERO;
    $j = 2;
    while ($j >= 0) {
        $multiplier = $b.$word.data[$j];
        $i = 60;
        while ($i >= 0) {
            $modReduceIndex = Long_lo(Long_shru($w2, 60));
            var$19 = Long_or(Long_shl($w2, 4), Long_shru($w1, 60));
            var$20 = Long_or(Long_shl($w1, 4), Long_shru($w0, 60));
            var$21 = Long_xor(Long_shl($w0, 4), g_GF2_192_irredMuls.data[$modReduceIndex]);
            $index = Long_lo(Long_and(Long_shru($multiplier, $i), Long_fromInt(15)));
            $w0 = Long_xor(var$21, var$5[$index]);
            $w1 = Long_xor(var$20, var$7[$index]);
            $w2 = Long_xor(var$19, var$9[$index]);
            $i = $i + (-4) | 0;
        }
        $j = $j + (-1) | 0;
    }
    $res.$word.data[0] = $w0;
    $res.$word.data[1] = $w1;
    $res.$word.data[2] = $w2;
}
function g_GF2_192_mul0($res, $a, $b) {
    var $w0, $w1, $w2, $i, var$8, var$9, var$10, var$11, $t;
    g_GF2_192_$callClinit();
    $w0 = Long_ZERO;
    $w1 = Long_ZERO;
    $w2 = Long_ZERO;
    $i = 7;
    while ($i >= 0) {
        var$8 = Long_shru($w2, 63);
        var$9 = Long_or(Long_shl($w2, 1), Long_shru($w1, 63));
        var$10 = Long_or(Long_shl($w1, 1), Long_shru($w0, 63));
        var$11 = Long_shl($w0, 1);
        $t = Long_fromInt($b >>> $i & 1);
        $w2 = Long_xor(var$9, Long_mul($a.$word.data[2], $t));
        $w1 = Long_xor(var$10, Long_mul($a.$word.data[1], $t));
        $w0 = Long_xor(var$11, Long_xor(Long_mul($a.$word.data[0], $t), Long_mul(Long_fromInt(135), var$8)));
        $i = $i + (-1) | 0;
    }
    $res.$word.data[0] = $w0;
    $res.$word.data[1] = $w1;
    $res.$word.data[2] = $w2;
}
function g_GF2_192_invert($res, $z) {
    var $zTo2ToK1s, $zTo2ToK1s2ToK0s, $k;
    g_GF2_192_$callClinit();
    $zTo2ToK1s = g_GF2_192__init_1($z);
    g_GF2_192_mul($res, $z, $z);
    $zTo2ToK1s2ToK0s = g_GF2_192__init_1($res);
    $k = 0;
    while ($k < 6) {
        $k = $k + 1 | 0;
        g_GF2_192_mul($zTo2ToK1s, $zTo2ToK1s2ToK0s, $zTo2ToK1s);
        g_GF2_192_power2To2ToK($zTo2ToK1s2ToK0s, $zTo2ToK1s, $k);
        g_GF2_192_mul($res, $res, $zTo2ToK1s2ToK0s);
    }
    g_GF2_192_power2To2ToK($zTo2ToK1s2ToK0s, $zTo2ToK1s2ToK0s, $k);
    g_GF2_192_mul($res, $res, $zTo2ToK1s2ToK0s);
}
function g_GF2_192_power2To2ToK($res, $z, $k) {
    var $t0, $t1, $t2, $maxIndex, $i, var$9, var$10, var$11, $w, $multiplier;
    g_GF2_192_$callClinit();
    if ($k >= 7) {
        g_GF2_192_power2To2ToK($res, $z, 6);
        if (($k % 2 | 0) == 1)
            g_GF2_192_power2To2ToK($res, $res, 6);
    } else {
        $t0 = Long_ZERO;
        $t1 = Long_ZERO;
        $t2 = Long_ZERO;
        $maxIndex = 0;
        $i = 0;
        var$9 = $z.$word.data;
        var$10 = var$9.length;
        var$11 = 0;
        while (var$11 < var$10) {
            $w = var$9[var$11];
            $maxIndex = $maxIndex + 64 | 0;
            while ($i < $maxIndex) {
                $multiplier = Long_and($w, Long_fromInt(1));
                $t0 = Long_xor($t0, Long_mul(g_GF2_192_powTable0.data[$k].data[$i], $multiplier));
                $t1 = Long_xor($t1, Long_mul(g_GF2_192_powTable1.data[$k].data[$i], $multiplier));
                $t2 = Long_xor($t2, Long_mul(g_GF2_192_powTable2.data[$k].data[$i], $multiplier));
                $w = Long_shru($w, 1);
                $i = $i + 1 | 0;
            }
            var$11 = var$11 + 1 | 0;
        }
        $res.$word.data[0] = $t0;
        $res.$word.data[1] = $t1;
        $res.$word.data[2] = $t2;
    }
}
function g_GF2_192__clinit_() {
    g_GF2_192_$assertionsDisabled = $rt_cls(g_GF2_192).$desiredAssertionStatus() ? 0 : 1;
    g_GF2_192_irredMuls = $rt_createLongArrayFromData([Long_ZERO, Long_fromInt(135), Long_fromInt(270), Long_fromInt(393), Long_fromInt(540), Long_fromInt(667), Long_fromInt(786), Long_fromInt(917), Long_fromInt(1080), Long_fromInt(1215), Long_fromInt(1334), Long_fromInt(1457), Long_fromInt(1572), Long_fromInt(1699), Long_fromInt(1834), Long_fromInt(1965)]);
    g_GF2_192_powTable0 = $rt_createArrayFromData($rt_arraycls($rt_longcls()), [$rt_createLongArrayFromData([Long_fromInt(1), Long_fromInt(4), Long_fromInt(16), Long_fromInt(64), Long_fromInt(256), Long_fromInt(1024), Long_fromInt(4096), Long_fromInt(16384), Long_fromInt(65536), Long_fromInt(262144), Long_fromInt(1048576), Long_fromInt(4194304), Long_fromInt(16777216), Long_fromInt(67108864), Long_fromInt(268435456), Long_fromInt(1073741824), Long_create(0, 1), Long_create(0, 4), Long_create(0, 16), Long_create(0, 64),
    Long_create(0, 256), Long_create(0, 1024), Long_create(0, 4096), Long_create(0, 16384), Long_create(0, 65536), Long_create(0, 262144), Long_create(0, 1048576), Long_create(0, 4194304), Long_create(0, 16777216), Long_create(0, 67108864), Long_create(0, 268435456), Long_create(0, 1073741824), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(135), Long_fromInt(540),
    Long_fromInt(2160), Long_fromInt(8640), Long_fromInt(34560), Long_fromInt(138240), Long_fromInt(552960), Long_fromInt(2211840), Long_fromInt(8847360), Long_fromInt(35389440), Long_fromInt(141557760), Long_fromInt(566231040), Long_create(2264924160, 0), Long_create(469762048, 2), Long_create(1879048192, 8), Long_create(3221225472, 33), Long_create(0, 135), Long_create(0, 540), Long_create(0, 2160), Long_create(0, 8640), Long_create(0, 34560), Long_create(0, 138240), Long_create(0, 552960), Long_create(0, 2211840),
    Long_create(0, 8847360), Long_create(0, 35389440), Long_create(0, 141557760), Long_create(0, 566231040), Long_create(0, 2264924160), Long_create(0, 469762048), Long_create(0, 1879048192), Long_create(0, 3221225472), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(270), Long_fromInt(1080), Long_fromInt(4199)]), $rt_createLongArrayFromData([Long_fromInt(1), Long_fromInt(16), Long_fromInt(256),
    Long_fromInt(4096), Long_fromInt(65536), Long_fromInt(1048576), Long_fromInt(16777216), Long_fromInt(268435456), Long_create(0, 1), Long_create(0, 16), Long_create(0, 256), Long_create(0, 4096), Long_create(0, 65536), Long_create(0, 1048576), Long_create(0, 16777216), Long_create(0, 268435456), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(135), Long_fromInt(2160), Long_fromInt(34560), Long_fromInt(552960), Long_fromInt(8847360), Long_fromInt(141557760), Long_create(2264924160, 0), Long_create(1879048192, 8), Long_create(0, 135), Long_create(0, 2160), Long_create(0, 34560), Long_create(0, 552960), Long_create(0, 8847360), Long_create(0, 141557760), Long_create(0, 2264924160), Long_create(0, 1879048192),
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(1080), Long_fromInt(16405), Long_fromInt(262480), Long_fromInt(4199680), Long_fromInt(67194880), Long_fromInt(1075118080), Long_create(22020096, 4), Long_create(352321536, 64),
    Long_create(1342177280, 1025), Long_create(0, 16405), Long_create(0, 262480), Long_create(0, 4199680), Long_create(0, 67194880), Long_create(0, 1075118080), Long_create(0, 22020096), Long_create(0, 352321536), Long_create(0, 1342177280), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(540), Long_fromInt(8640), Long_fromInt(138375), Long_fromInt(2214635), Long_fromInt(35434160), Long_fromInt(566946560), Long_create(481210368, 2), Long_create(3404398592, 33), Long_create(2930769920, 540), Long_create(3942645760, 8650), Long_create(2952790016, 138414), Long_create(0, 2214635), Long_create(0, 35434160), Long_create(0, 566946560), Long_create(0, 481210368), Long_create(0, 3404398592), Long_create(0, 2930769920), Long_create(0, 3942645760),
    Long_create(0, 2952790016), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(270), Long_fromInt(4199), Long_fromInt(65620), Long_fromInt(1048694), Long_fromInt(16777290)]), $rt_createLongArrayFromData([Long_fromInt(1), Long_fromInt(65536), Long_create(0, 1),
    Long_create(0, 65536), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(135), Long_fromInt(8847360), Long_create(0, 135), Long_create(0, 8847360), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(16405), Long_fromInt(1075118080), Long_create(0, 16405), Long_create(0, 1075118080), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(2214635), Long_create(3404398592, 33),
    Long_create(0, 2214635), Long_create(0, 3404398592), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(4199), Long_fromInt(268435729), Long_create(17891328, 4096), Long_create(0, 268435729), Long_create(0, 17891328), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(552960), Long_create(1879085047, 8), Long_create(2415329280, 552960), Long_create(0, 1879085047), Long_create(0, 2415329280), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_fromInt(1080), Long_fromInt(67194880), Long_create(1346655301, 1025), Long_create(1413808128, 67194948), Long_create(0, 1346655301), Long_create(0, 1413808128), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(138375), Long_create(481203164, 2), Long_create(2482474843, 138414), Long_create(2405105664, 481203191), Long_create(0, 2482474843), Long_create(0, 2405105664), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(270), Long_fromInt(16777290),
    Long_create(69, 256), Long_create(65793, 16777216), Long_create(16842752, 1), Long_create(0, 65793), Long_create(0, 16842752), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(34560), Long_create(2264924160, 0), Long_create(135, 34560), Long_create(8882055, 2264924160), Long_create(2273771520, 135), Long_create(0, 8882055), Long_create(0, 2273771520), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(4199680), Long_create(352321536, 64), Long_create(16405, 4199680), Long_create(1079334165, 352321536),
    Long_create(1427439616, 16469), Long_create(0, 1079334165), Long_create(0, 1427439616), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(8640), Long_fromInt(566946560), Long_create(3942645760, 8650), Long_create(2222891, 566946560), Long_create(3942654443, 3942645793), Long_create(569049088, 2222848), Long_create(0, 3942654443), Long_create(0, 569049088), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(1048694), Long_create(69888, 16), Long_create(285216871, 1048577), Long_create(269488384, 69888),
    Long_create(286265361, 285216784), Long_create(269549568, 269488400), Long_create(0, 286265361), Long_create(0, 269549568), Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(2160), Long_fromInt(141557895), Long_create(9434880, 2160), Long_create(4144527472, 141557903), Long_create(2021195632, 9434888), Long_create(4286085367, 4144527480), Long_create(2029453312, 2021195640), Long_create(0, 4286085367), Long_create(0, 2029453312), Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(262480), Long_create(22037549, 4),
    Long_create(1146372408, 262480), Long_create(1090868584, 22037588), Long_create(1427456104, 1146372357), Long_create(1079316805, 1090868501), Long_create(289734656, 1427456085), Long_create(0, 1079316805), Long_create(0, 289734656), Long_ZERO, Long_ZERO, Long_fromInt(540), Long_fromInt(35434160), Long_create(2928932780, 540), Long_create(4153230747, 35434131), Long_create(1169170923, 2928932749), Long_create(566946603, 4153230768), Long_create(3944993883, 1169170890), Long_create(3562733568, 566946595),
    Long_create(0, 3944993883), Long_create(0, 3562733568), Long_ZERO, Long_ZERO, Long_fromInt(65620), Long_create(121, 1), Long_create(35, 65536), Long_fromInt(16), Long_fromInt(118), Long_fromInt(65641)]), $rt_createLongArrayFromData([Long_fromInt(1), Long_ZERO, Long_ZERO, Long_fromInt(268435729), Long_ZERO, Long_ZERO, Long_create(65793, 16777216), Long_ZERO, Long_fromInt(8640), Long_create(286265361, 285216784), Long_ZERO, Long_create(2928932780, 540), Long_create(65537, 1), Long_ZERO, Long_create(0, 3404398592),
    Long_create(286327057, 268439825), Long_fromInt(67194880), Long_create(138375, 2405105664), Long_create(16777473, 16843008), Long_create(16405, 4199680), Long_create(3402287808, 569057738), Long_create(16848993, 268439825), Long_create(1427456104, 1146372357), Long_create(481203164, 2027182850), Long_create(1, 134), Long_ZERO, Long_fromInt(2214635), Long_create(268435729, 1610649318), Long_ZERO, Long_create(2465567638, 138414), Long_create(65793, 25593478), Long_ZERO, Long_create(285216844, 3943703018),
    Long_create(286265361, 4285036790), Long_create(22038065, 4), Long_create(618, 3944993883), Long_create(65537, 8781959), Long_create(2331901952, 1075118113), Long_create(3672838518, 3402287818), Long_create(286880017, 4276527095), Long_create(3743372344, 1290453939), Long_create(2465501906, 16915886), Long_create(21009286, 2264989830), Long_create(1639871701, 1433714197), Long_create(268447901, 4195426554), Long_create(1034047785, 2516944863), Long_create(970002024, 547007851), Long_create(2895075836, 3944994375),
    Long_fromInt(1), Long_fromInt(16405), Long_create(1881228572, 8), Long_fromInt(268435729), Long_create(1346655301, 1025), Long_create(2473593052, 2265062574), Long_create(65793, 16777216), Long_create(1078285667, 352321536), Long_create(343439580, 470317145), Long_create(425726102, 285216784), Long_create(1090868555, 1090802961), Long_create(1161241456, 1169171281), Long_create(65537, 8847361), Long_create(1075134485, 1090797589), Long_create(893212027, 3133289781), Long_create(230154957, 2683769107), Long_create(16777529, 16842752),
    Long_create(2611876894, 2273805826), Long_create(2250337709, 2806803712), Long_create(286327057, 268501009), Long_create(2545582988, 1371735543), Long_create(2806284753, 2542119766), Long_fromInt(35172261), Long_create(601245508, 4153214243), Long_create(134, 134), Long_create(268435729, 2198270), Long_create(1879085047, 811929664), Long_create(1610648286, 1610649326), Long_create(2248350196, 3266566942), Long_create(25533258, 1411669192), Long_create(2458298182, 2256963270), Long_create(151550064, 2989835754),
    Long_create(90720550, 2988769787), Long_create(4143427610, 20989513), Long_create(78935628, 78935750), Long_create(3944928961, 86139358), Long_create(2347646996, 3396145185), Long_create(4224083310, 2614008774), Long_create(1697711210, 2614595511), Long_create(2213543479, 420665265), Long_create(2653504740, 2248181506), Long_create(2941559633, 2272515042), Long_create(2097252059, 2195120846), Long_create(1886935247, 3480052222), Long_create(3400909706, 2842182992), Long_create(3275374627, 2659850303), Long_create(814458936, 3017606629),
    Long_create(2482474242, 1526865070), Long_fromInt(1), Long_create(1346638928, 1025), Long_fromInt(268435729), Long_fromInt(268435729), Long_create(269549904, 352322561), Long_create(65793, 16777216), Long_create(141623686, 16777216), Long_create(26000, 1409635605), Long_create(286274001, 285216784), Long_create(425726102, 294064144), Long_create(2933106428, 1090852636), Long_create(2928863178, 541), Long_create(65537, 2406481921), Long_create(1142166608, 2662219797), Long_create(286331187, 3672838161), Long_create(2450576913, 409997585),
    Long_create(356666839, 2387285312), Long_create(286395587, 2388332800), Long_create(2046249443, 4131462399), Long_create(2357616693, 549135759), Long_create(3688612764, 837427675), Long_create(2883835769, 617830635), Long_create(448212052, 1759810812), Long_create(481203168, 2027182980), Long_create(1879083849, 142), Long_create(1348853435, 3281147361), Long_create(270650362, 1610649318), Long_create(4068937049, 3875573422), Long_create(2196017862, 2112141135), Long_create(2464453345, 25467432), Long_create(3548632046, 2024716901),
    Long_create(285234204, 3208037663), Long_create(8781916, 343496988), Long_create(1371685725, 29836502), Long_create(17831179, 2341441215), Long_create(2388726395, 3938301148), Long_create(1371680873, 3219913687), Long_create(145725428, 1290328860), Long_create(3264377089, 875836603), Long_create(3345926099, 3753095922), Long_create(1643004995, 2855571375), Long_create(1974802629, 4285195223), Long_create(3994908726, 3142353760), Long_create(3227456319, 3421322873), Long_create(1277524306, 343693404), Long_create(1482922191, 1306919431),
    Long_create(269812936, 67457300), Long_create(3163510938, 3944994375), Long_create(3822488276, 138406), Long_create(543494489, 1033), Long_create(1881162781, 16777224), Long_create(1211429780, 1812076678), Long_create(3542449161, 2449611950), Long_create(2199936150, 2516716730), Long_create(3085458981, 3401079187), Long_create(4205756291, 1561145168), Long_create(491338786, 1545369692), Long_create(2382570394, 3793409790), Long_create(2867437767, 2405065052), Long_create(1411790365, 1081553472), Long_create(1828969172, 830567844),
    Long_create(765001442, 3929256503), Long_create(1021032440, 896808311), Long_create(554095137, 3996366372), Long_create(634406192, 140716418), Long_create(214840510, 1708109378), Long_create(1338666975, 2091818341), Long_create(1326500877, 3475322835), Long_create(889133628, 3596086055), Long_create(3077342853, 1277593728), Long_create(1334290177, 749770090), Long_create(1938836308, 2542636996), Long_create(2211856415, 2746239062), Long_create(2727396299, 4090811377), Long_create(2014518412, 635679557),
    Long_create(217332130, 1086455743), Long_create(470950259, 6492531), Long_create(149823663, 3488281506), Long_create(3061858600, 2112813272), Long_create(4212175747, 1417828169), Long_create(278231694, 4214786433), Long_create(3866747837, 3331434993), Long_create(3413993253, 21061904), Long_create(294093437, 1630586671), Long_create(3554889158, 541415732), Long_create(1500912894, 1484895905), Long_create(2182328226, 3018056430), Long_create(833241434, 746048116), Long_create(1156641503, 1153113124), Long_create(659416461, 2250119289),
    Long_create(4181016022, 3755719957), Long_create(3993745761, 4032427276), Long_create(3114518923, 1804810385), Long_create(3362669287, 2790140520), Long_create(3473411832, 1658000057), Long_create(2482408495, 1510087854)]), $rt_createLongArrayFromData([Long_fromInt(1), Long_create(1062813646, 3595038241), Long_create(1078010358, 605584736), Long_fromInt(8641), Long_create(766755960, 1984907574), Long_create(3136966482, 3795511999), Long_create(276367645, 470317145), Long_create(64057997, 3864119712), Long_create(1276123535, 3156466871),
    Long_create(1146995629, 211773769), Long_create(659883376, 4289146266), Long_create(2845525346, 1798951821), Long_create(4394394, 1700476074), Long_create(132284693, 1008653028), Long_create(3582020662, 689655696), Long_create(3798512569, 3621556000), Long_create(1376815096, 3192828168), Long_create(1615818934, 247532485), Long_create(3009204122, 4016060524), Long_create(1750326187, 820923755), Long_create(1407997725, 3201762798), Long_create(4075073581, 1198269891), Long_create(3196214362, 1731317401),
    Long_create(823854861, 3660553421), Long_create(5842441, 9430789), Long_create(4180135860, 204180130), Long_create(1423263536, 1305826998), Long_create(939486781, 2707975556), Long_create(1616404115, 3355808850), Long_create(4036584749, 3344652167), Long_create(733302198, 2284157002), Long_create(3666268552, 1657782975), Long_create(293200993, 3657160148), Long_create(1695872861, 973048238), Long_create(3374418795, 3122529818), Long_create(665414992, 1169940619), Long_create(2972818529, 2994904749), Long_create(1387164415, 336935393),
    Long_create(1922656742, 3692637381), Long_create(456542307, 2057721466), Long_create(4172238905, 1556468570), Long_create(1958397190, 358667883), Long_create(471262232, 3166069528), Long_create(1207027560, 123728975), Long_create(3455470819, 2409506400), Long_create(3603803255, 1359014606), Long_create(4258608363, 618822433), Long_create(2667551981, 1183254368), Long_create(2207992122, 1685108525), Long_create(59989920, 1222865156), Long_create(3751861260, 2678216549), Long_create(3581051847, 3745748641),
    Long_create(771537654, 466672888), Long_create(2141571044, 1611821281), Long_create(698243162, 2871028384), Long_create(39344292, 4089383139), Long_create(1796330492, 1034982984), Long_create(3102683560, 1375048068), Long_create(4250603, 2210458984), Long_create(3344792840, 1475181761), Long_create(217935911, 3983731492), Long_create(1700179091, 4226278175), Long_create(4116211132, 1496598755), Long_create(2146212667, 1428874495), Long_create(1583309349, 2046748717), Long_create(723407299, 2513923678), Long_create(2302036328, 2899286063),
    Long_create(1515598037, 1004356497), Long_create(4041841561, 368695471), Long_create(938079719, 1305352217), Long_create(3372160908, 1595783438), Long_create(1740879673, 2319250965), Long_create(1622402441, 1813873153), Long_create(1259409097, 1383167247), Long_create(492786424, 2002919460), Long_create(2511903181, 683648957), Long_create(2448651509, 3009459910), Long_create(2016379822, 1097090582), Long_create(3538952477, 3148775465), Long_create(623044064, 30301018), Long_create(743397602, 823342167),
    Long_create(242299124, 358157542), Long_create(1868664184, 539956765), Long_create(2276598475, 4204131385), Long_create(1767356433, 1869473958), Long_create(3353063150, 2660359026), Long_create(1051575304, 760404192), Long_create(2708114864, 1889342731), Long_create(961298936, 402104147), Long_create(2945954037, 1679143581), Long_create(1181700023, 3566038925), Long_create(1838891164, 2614661891), Long_create(2004977591, 822636270), Long_create(2701158943, 927701989), Long_create(1565711617, 2344067792),
    Long_create(1523729807, 2341960154), Long_create(1651937585, 4061786109), Long_create(994892954, 3684529327), Long_create(129271054, 140402752), Long_create(3058988815, 3164391367), Long_create(514273490, 2231668326), Long_create(3116797352, 1203994523), Long_create(814221278, 2894048720), Long_create(1072449283, 133757970), Long_create(3602580735, 313565113), Long_create(1887574356, 1458758395), Long_create(2986263515, 713647452), Long_create(1071972, 3469731443), Long_create(3220210332, 2825420424), Long_create(3224689544, 1362134382),
    Long_create(225173829, 3788397698), Long_create(794496539, 663452714), Long_create(1928489770, 3126059242), Long_create(2875457831, 3231197018), Long_create(1585736699, 3728894257), Long_create(2375443923, 2261764658), Long_create(3361340625, 11415541), Long_create(677980239, 220767335), Long_create(4127728955, 159667392), Long_create(3541799116, 2872784337), Long_create(1524377663, 2753743980), Long_create(3032893246, 581918212), Long_create(64826024, 2376185689), Long_create(2367505474, 2831900634), Long_create(170317610, 3875890162),
    Long_create(1852744152, 2842010670), Long_create(796010256, 1279885169), Long_create(2388310970, 1565452396), Long_create(2999190586, 2618394853), Long_create(1193344010, 2201493924), Long_create(615740999, 860738854), Long_create(932835304, 1286424386), Long_create(1570790073, 221094878), Long_create(601324661, 1031820398), Long_create(2104509774, 2497520812), Long_create(3424178442, 2889956374), Long_create(1140321254, 3301075329), Long_create(2148152598, 1573151330), Long_create(1656578180, 3839188611),
    Long_create(835269871, 1658010687), Long_create(2386985044, 3613473273), Long_create(2079238468, 1180485890), Long_create(2568867987, 3558210573), Long_create(1056794750, 2417065313), Long_create(2323677937, 2573515473), Long_create(477276288, 367622131), Long_create(587568382, 3021267702), Long_create(2023504762, 2185641631), Long_create(4173105353, 2032338847), Long_create(1922896000, 204056186), Long_create(2343068911, 3202678074), Long_create(2047858168, 63112960), Long_create(1343021482, 3985547320),
    Long_create(170249543, 4154820130), Long_create(3522064212, 3926999371), Long_create(1971142202, 3287729849), Long_create(4018421551, 1292665302), Long_create(698139661, 49920910), Long_create(3345586400, 207855405), Long_create(1747511584, 2716423953), Long_create(2184846196, 1986910779), Long_create(1286882578, 203334633), Long_create(1213020432, 2059209532), Long_create(1725075914, 1002299869), Long_create(1081746882, 1305362218), Long_create(2716446306, 98974020), Long_create(2337651650, 4030492831),
    Long_create(1503196677, 3194815316), Long_create(555431355, 1373152175), Long_create(1839029506, 384309186), Long_create(152775716, 2591235215), Long_create(285927086, 2358427223), Long_create(3018130683, 122185515), Long_create(4137938472, 2731928037), Long_create(219444614, 3144887225), Long_create(131210451, 2988817724), Long_create(4084931349, 3309956529), Long_create(632406100, 4126382564), Long_create(2060887222, 3803624480), Long_create(858341026, 239739577), Long_create(3322994756, 3061459882), Long_create(1518828387, 2216238231),
    Long_create(761569713, 1694457847), Long_create(3804465348, 1519722334), Long_create(3866872525, 3376216685), Long_create(218292783, 1877492324), Long_create(4147388473, 1052872570), Long_create(1242494752, 157306898), Long_create(3607047860, 4030200324), Long_create(2538369893, 1959191469), Long_create(3432305700, 2330617020), Long_create(2854494106, 1833969059)]), $rt_createLongArrayFromData([Long_fromInt(1), Long_create(60504637, 3091265464), Long_create(3508475690, 3691980177), Long_create(291631953, 2043639468),
    Long_create(1905937684, 2238919878), Long_create(2447369078, 739652424), Long_create(4221479035, 25564202), Long_create(3162829621, 250748564), Long_create(790831695, 1842714541), Long_create(2790208977, 1865416923), Long_create(2842246803, 1958290374), Long_create(1013923992, 1459019150), Long_create(533182358, 4216532343), Long_create(125352983, 940202340), Long_create(762649378, 2408771608), Long_create(1116411927, 261918875), Long_create(3029072205, 1953778027), Long_create(2398430568, 512199834), Long_create(3454320995, 167585752),
    Long_create(1614562234, 3171539367), Long_create(3476746272, 2591968720), Long_create(2594416609, 1138929716), Long_create(1994590026, 1769076648), Long_create(3493864580, 3540741924), Long_create(1306677592, 4141484453), Long_create(3364491978, 1790965467), Long_create(484587154, 4250025544), Long_create(3717949642, 386827018), Long_create(3107803980, 4092937956), Long_create(1766667181, 3183235329), Long_create(3583773816, 235978125), Long_create(4062993232, 811611184), Long_create(2676047463, 43845576),
    Long_create(1256262158, 2519319669), Long_create(637055128, 1114181645), Long_create(428828721, 3699535372), Long_create(1178993991, 189890494), Long_create(3989061832, 634578904), Long_create(3878473916, 177839731), Long_create(4120542395, 4007557358), Long_create(3338488256, 705856109), Long_create(1287196923, 1435389930), Long_create(2592385477, 2687002086), Long_create(430175227, 2037334604), Long_create(3692505360, 3609451389), Long_create(4220338796, 2299355503), Long_create(2173434056, 1711290652),
    Long_create(1440208260, 1812881636), Long_create(122603988, 78515974), Long_create(3499207972, 318195349), Long_create(2560074583, 1392117105), Long_create(1174625513, 2378987121), Long_create(3454639118, 2556940693), Long_create(3500638482, 511340031), Long_create(1340924793, 2756665302), Long_create(2559897841, 1978517557), Long_create(3517178695, 1817540587), Long_create(3461727999, 137752301), Long_create(3479413919, 1407575531), Long_create(3126992759, 106223092), Long_create(1362420558, 2614192884),
    Long_create(95314029, 135079730), Long_create(1546229518, 3435031110), Long_create(2641494635, 3862909843), Long_create(607276696, 415678454), Long_create(4218926967, 2988192414), Long_create(3601292414, 4226435605), Long_create(2464946333, 569308255), Long_create(697141794, 1660612922), Long_create(2209782893, 204501221), Long_create(1039816286, 912969509), Long_create(3725421814, 1362763041), Long_create(175974333, 3637126408), Long_create(316722044, 2657967730), Long_create(2340768456, 2322005541), Long_create(3324854481, 2316326975),
    Long_create(3233994995, 3321119177), Long_create(150545281, 169236766), Long_create(521625887, 3334806248), Long_create(2874196257, 15631148), Long_create(2734232507, 55539235), Long_create(4189288653, 2111580238), Long_create(1290356967, 2303108624), Long_create(2800616126, 3876306225), Long_create(879384650, 4211210995), Long_create(3865807519, 1046228951), Long_create(108492901, 1154525178), Long_create(2027196063, 4082823710), Long_create(3501590435, 3094338845), Long_create(1438974573, 301586465), Long_create(1601602876, 2670427904),
    Long_create(3566172798, 1611798507), Long_create(3846717434, 1552184823), Long_create(547505772, 1697840980), Long_create(902278694, 3836417156), Long_create(3971121235, 2688810212), Long_create(1324575738, 1340251917), Long_create(3116483360, 1514468395), Long_create(3242717878, 39570625), Long_create(2118370414, 1919633428), Long_create(2069251960, 2501627616), Long_create(3952551750, 39723743), Long_create(1083243602, 4023038653), Long_create(3932571268, 1473849069), Long_create(3630506501, 4138863988),
    Long_create(3418331634, 3020119426), Long_create(2102164459, 3268807500), Long_create(2523720040, 2297140821), Long_create(1768521917, 764898213), Long_create(246755732, 1838189337), Long_create(1428935587, 1995196768), Long_create(2153532236, 2771135610), Long_create(976772473, 2898859492), Long_create(3699343060, 3586587325), Long_create(683712180, 552784286), Long_create(217030555, 906794707), Long_create(3412122365, 907723330), Long_create(107919393, 3046524785), Long_create(2361305433, 1024977880),
    Long_create(4181791687, 766473295), Long_create(746037332, 855529199), Long_create(111153513, 4284657976), Long_create(2410589068, 4260943629), Long_create(1055436496, 1253109760), Long_create(1005902305, 1579827666), Long_create(2493032693, 1056620156), Long_create(1199644559, 1960910206), Long_create(2775844642, 4120016870), Long_create(3063812787, 2095422644), Long_create(3767264203, 4064425566), Long_create(2600720467, 413926365), Long_create(833936558, 3164288015), Long_create(1110072987, 1534650545),
    Long_create(3042089051, 1107357833), Long_create(3897863635, 2314801601), Long_create(1172191899, 1041709784), Long_create(2516785152, 1749251397), Long_create(2130680112, 3132055643), Long_create(1655559421, 3218192467), Long_create(1199642730, 2529776883), Long_create(1551005769, 3509260878), Long_create(618373193, 2718200219), Long_create(3266935590, 3224562654), Long_create(2778460948, 1647178137), Long_create(2207279350, 2025571094), Long_create(3508464009, 3954841990), Long_create(1349296205, 1866170480),
    Long_create(3526227299, 4022656416), Long_create(4182805838, 3181777863), Long_create(1613519532, 439660264), Long_create(3535318868, 1874883675), Long_create(3103812421, 2020424703), Long_create(4152934280, 1908465135), Long_create(396780272, 2853948654), Long_create(2690004736, 4118752538), Long_create(2989773877, 762730920), Long_create(1370600809, 1877415795), Long_create(934235941, 2588018808), Long_create(582060890, 1375869923), Long_create(3844585976, 1759213521), Long_create(2422824274, 1391313967),
    Long_create(1642411145, 824725705), Long_create(2552668662, 831854322), Long_create(2286272991, 3151761089), Long_create(2304125900, 960903407), Long_create(2408720581, 2374220013), Long_create(3824418215, 497445762), Long_create(1781647487, 1609825429), Long_create(423263464, 3968546223), Long_create(4270417934, 1957505987), Long_create(2658898689, 744796346), Long_create(3262734299, 598520010), Long_create(1931902779, 1536397315), Long_create(2945850021, 2304562477), Long_create(1639795224, 359228455),
    Long_create(4126732776, 1194901928), Long_create(1397008087, 2269970999), Long_create(879871025, 1736280148), Long_create(901663439, 4040385955), Long_create(2558789185, 756007633), Long_create(1075430783, 3963290056), Long_create(2504997206, 1180045700), Long_create(2775555897, 1369247627), Long_create(1761220477, 3572579324), Long_create(616324242, 294297392), Long_create(520958790, 1248996131), Long_create(3434743464, 2669784471), Long_create(34662359, 3486580432), Long_create(2031701625, 1546393367),
    Long_create(786435596, 264362690), Long_create(1447912603, 1254338586), Long_create(3167795471, 2710729933)]), $rt_createLongArrayFromData([Long_fromInt(1), Long_create(3523641810, 249879215), Long_create(4062167668, 3820269066), Long_create(824170546, 1235008957), Long_create(1050644519, 769165016), Long_create(806822322, 2375850533), Long_create(689550909, 3512242817), Long_create(595553730, 2440144837), Long_create(1660392306, 852613758), Long_create(2893712690, 1602104465), Long_create(2547351581, 643382887),
    Long_create(564898426, 414824268), Long_create(3825175181, 1429156957), Long_create(1510211819, 2545891063), Long_create(1341465623, 3667153649), Long_create(2358400461, 3693550598), Long_create(1624111901, 3565761362), Long_create(1631364309, 3622236395), Long_create(222115347, 2943942933), Long_create(4012648689, 3727583398), Long_create(231371218, 3883655980), Long_create(2750140783, 4207161710), Long_create(2227794691, 413642696), Long_create(1775361199, 4223113163), Long_create(3860861087, 4169165449),
    Long_create(2425339048, 1971573447), Long_create(3223935927, 807592433), Long_create(3773897097, 117752895), Long_create(1568897381, 3030949726), Long_create(2364896044, 2484246398), Long_create(1551339871, 2874172153), Long_create(3644531873, 813589749), Long_create(4227818151, 563166797), Long_create(972975055, 1089524828), Long_create(2420897368, 2795143236), Long_create(163259984, 1458722245), Long_create(3519685092, 2607827097), Long_create(3859676430, 4171194867), Long_create(3523600074, 1773597528),
    Long_create(2413123117, 1700602209), Long_create(1481033542, 4287451214), Long_create(64761267, 1267926076), Long_create(3732115914, 58745794), Long_create(1204687051, 1800109936), Long_create(3754232386, 1115917543), Long_create(212772223, 701458853), Long_create(2576146594, 1717434188), Long_create(2908049861, 683927298), Long_create(158899034, 2132605292), Long_create(1105590792, 973386186), Long_create(591284752, 2119272452), Long_create(1070870136, 2162784741), Long_create(2156254076, 2917265348), Long_create(3505151766, 4082390086),
    Long_create(2064050914, 819788690), Long_create(1956010430, 257303054), Long_create(1055346359, 847584169), Long_create(3683917430, 607886903), Long_create(1867015485, 784439170), Long_create(3219598516, 4255967359), Long_create(3890243054, 1772432098), Long_create(727234016, 1082106719), Long_create(626482612, 724001177), Long_create(2604863906, 2036182058), Long_create(516223895, 4225515913), Long_create(159947515, 3784210127), Long_create(3606413126, 3548594562), Long_create(3805580319, 2685478706), Long_create(3501089624, 3064227893),
    Long_create(1294085635, 2429663126), Long_create(2820017189, 4290168965), Long_create(3943951461, 573060904), Long_create(403277883, 2247412214), Long_create(2995607230, 3330188744), Long_create(2164313116, 3082836981), Long_create(1712630444, 2585564694), Long_create(567871863, 1396302830), Long_create(1280530039, 2668906986), Long_create(983167993, 1208394913), Long_create(2384235587, 4031015307), Long_create(920070464, 2499433769), Long_create(1006326775, 223204940), Long_create(3534895343, 698107268),
    Long_create(2591495331, 4253808080), Long_create(3470239595, 1200887209), Long_create(931633681, 2199616948), Long_create(1280125569, 991294594), Long_create(1423214616, 3506727833), Long_create(1163066243, 1299615403), Long_create(3547961397, 2669420862), Long_create(3419352851, 1541210596), Long_create(2565209607, 1926410592), Long_create(2155394053, 1468088408), Long_create(1661657619, 2493317609), Long_create(2851878609, 2566346431), Long_create(3047946744, 263166174), Long_create(770288555, 1335734545),
    Long_create(2541532246, 3855024406), Long_create(832054172, 1610827959), Long_create(2520313763, 4234812529), Long_create(2513948128, 405207059), Long_create(1087686874, 696341050), Long_create(662760119, 605088636), Long_create(3246131585, 2878907891), Long_create(4126832556, 1254627597), Long_create(3614922870, 3572811515), Long_create(3675837792, 1294685274), Long_create(238867240, 1289924002), Long_create(1761836685, 3119055034), Long_create(425884188, 577983794), Long_create(3486519427, 1943174848),
    Long_create(3925873350, 4268208256), Long_create(2644251902, 3966318654), Long_create(434017120, 455288180), Long_create(3802343902, 3266850566), Long_create(627224278, 40710363), Long_create(2582675257, 2996115975), Long_create(1255467509, 1347151022), Long_create(1750134580, 3775175875), Long_create(192954418, 779322714), Long_create(3400208577, 2001664659), Long_create(1384436851, 2283920965), Long_create(3734802060, 443725698), Long_create(2961318927, 2952862237), Long_create(1257735682, 2691263453),
    Long_create(175052280, 2556556088), Long_create(1313909159, 829163215), Long_create(4271633234, 2891965280), Long_create(1647233480, 1834915913), Long_create(1938505011, 1124973326), Long_create(1095634161, 2269245020), Long_create(960286649, 1203046914), Long_create(576040180, 2993455459), Long_create(2038718763, 2670772536), Long_create(2840475262, 2010801281), Long_create(2737736209, 3039203894), Long_create(1068208985, 176511224), Long_create(695309756, 1967378083), Long_create(3639669565, 671027408),
    Long_create(4115505418, 2030949799), Long_create(346496264, 151872845), Long_create(3220622974, 2923645287), Long_create(420852345, 3547246484), Long_create(2586750917, 317286683), Long_create(3963783152, 1868469174), Long_create(479436080, 1875944714), Long_create(3213718518, 4155931965), Long_create(4060086323, 3426135062), Long_create(1184387595, 2708309893), Long_create(3786478155, 3709738501), Long_create(3381031932, 3957405372), Long_create(4194271622, 1858850796), Long_create(1499311860, 963088846),
    Long_create(2201102382, 3985019972), Long_create(1970195468, 4227636452), Long_create(2051401322, 3572992288), Long_create(2500319199, 125004363), Long_create(753729337, 450139436), Long_create(327989901, 3508270148), Long_create(424535440, 13750757), Long_create(1794765784, 2183012072), Long_create(2397613742, 2301556329), Long_create(262034615, 2013073004), Long_create(3089948780, 2620823023), Long_create(843725276, 517626781), Long_create(3795165084, 4149401491), Long_create(200927088, 2503219086), Long_create(508001220, 3613769938),
    Long_create(158419055, 1829890536), Long_create(1406657201, 2294946252), Long_create(4058016387, 1966922519), Long_create(218980490, 2352813310), Long_create(2682428045, 307105023), Long_create(1582171197, 1311222512), Long_create(1968459670, 604821141), Long_create(205075355, 1763856561), Long_create(4019043149, 3067735277), Long_create(1581241035, 811874020), Long_create(4023978481, 15645533), Long_create(926017958, 4168579994), Long_create(2501408852, 2388354903), Long_create(1539233065, 3384900875),
    Long_create(1595623226, 2300311569), Long_create(933638945, 2712039139), Long_create(1306867787, 2136165495), Long_create(3873518565, 2946209146), Long_create(640751557, 3778153100), Long_create(3285243605, 2795322180), Long_create(1076431127, 159983430), Long_create(1233915837, 1558908076), Long_create(411270110, 1339285327), Long_create(3780497693, 890195670)])]);
    g_GF2_192_powTable1 = $rt_createArrayFromData($rt_arraycls($rt_longcls()), [$rt_createLongArrayFromData([Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(1), Long_fromInt(4), Long_fromInt(16),
    Long_fromInt(64), Long_fromInt(256), Long_fromInt(1024), Long_fromInt(4096), Long_fromInt(16384), Long_fromInt(65536), Long_fromInt(262144), Long_fromInt(1048576), Long_fromInt(4194304), Long_fromInt(16777216), Long_fromInt(67108864), Long_fromInt(268435456), Long_fromInt(1073741824), Long_create(0, 1), Long_create(0, 4), Long_create(0, 16), Long_create(0, 64), Long_create(0, 256), Long_create(0, 1024), Long_create(0, 4096), Long_create(0, 16384), Long_create(0, 65536), Long_create(0, 262144), Long_create(0, 1048576),
    Long_create(0, 4194304), Long_create(0, 16777216), Long_create(0, 67108864), Long_create(0, 268435456), Long_create(0, 1073741824), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(2), Long_fromInt(8), Long_fromInt(33), Long_fromInt(135), Long_fromInt(540), Long_fromInt(2160), Long_fromInt(8640), Long_fromInt(34560), Long_fromInt(138240), Long_fromInt(552960), Long_fromInt(2211840), Long_fromInt(8847360),
    Long_fromInt(35389440), Long_fromInt(141557760), Long_fromInt(566231040), Long_create(2264924160, 0), Long_create(469762048, 2), Long_create(1879048192, 8), Long_create(3221225472, 33), Long_create(0, 135), Long_create(0, 540), Long_create(0, 2160), Long_create(0, 8640), Long_create(0, 34560), Long_create(0, 138240), Long_create(0, 552960), Long_create(0, 2211840), Long_create(0, 8847360), Long_create(0, 35389440), Long_create(0, 141557760), Long_create(0, 566231040), Long_create(0, 2264924160), Long_create(0, 469762048),
    Long_create(0, 1879048192), Long_create(0, 3221225472), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO]), $rt_createLongArrayFromData([Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(1), Long_fromInt(16), Long_fromInt(256), Long_fromInt(4096), Long_fromInt(65536), Long_fromInt(1048576), Long_fromInt(16777216), Long_fromInt(268435456), Long_create(0, 1), Long_create(0, 16), Long_create(0, 256), Long_create(0, 4096), Long_create(0, 65536), Long_create(0, 1048576), Long_create(0, 16777216), Long_create(0, 268435456), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(8), Long_fromInt(135), Long_fromInt(2160), Long_fromInt(34560), Long_fromInt(552960), Long_fromInt(8847360), Long_fromInt(141557760), Long_create(2264924160, 0), Long_create(1879048192, 8), Long_create(0, 135), Long_create(0, 2160),
    Long_create(0, 34560), Long_create(0, 552960), Long_create(0, 8847360), Long_create(0, 141557760), Long_create(0, 2264924160), Long_create(0, 1879048192), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(4), Long_fromInt(64),
    Long_fromInt(1025), Long_fromInt(16405), Long_fromInt(262480), Long_fromInt(4199680), Long_fromInt(67194880), Long_fromInt(1075118080), Long_create(22020096, 4), Long_create(352321536, 64), Long_create(1342177280, 1025), Long_create(0, 16405), Long_create(0, 262480), Long_create(0, 4199680), Long_create(0, 67194880), Long_create(0, 1075118080), Long_create(0, 22020096), Long_create(0, 352321536), Long_create(0, 1342177280), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(2), Long_fromInt(33), Long_fromInt(540), Long_fromInt(8650), Long_fromInt(138414), Long_fromInt(2214635), Long_fromInt(35434160), Long_fromInt(566946560), Long_create(481210368, 2), Long_create(3404398592, 33), Long_create(2930769920, 540), Long_create(3942645760, 8650), Long_create(2952790016, 138414),
    Long_create(0, 2214635), Long_create(0, 35434160), Long_create(0, 566946560), Long_create(0, 481210368), Long_create(0, 3404398592), Long_create(0, 2930769920), Long_create(0, 3942645760), Long_create(0, 2952790016), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO]), $rt_createLongArrayFromData([Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(1), Long_fromInt(65536), Long_create(0, 1),
    Long_create(0, 65536), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(135), Long_fromInt(8847360), Long_create(0, 135), Long_create(0, 8847360), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(16405), Long_fromInt(1075118080), Long_create(0, 16405), Long_create(0, 1075118080), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(33), Long_fromInt(2214635), Long_create(3404398592, 33),
    Long_create(0, 2214635), Long_create(0, 3404398592), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(4096), Long_fromInt(268435729), Long_create(17891328, 4096), Long_create(0, 268435729), Long_create(0, 17891328), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(8), Long_fromInt(552960), Long_create(1879085047, 8), Long_create(2415329280, 552960), Long_create(0, 1879085047), Long_create(0, 2415329280), Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(1025), Long_fromInt(67194948), Long_create(1346655301, 1025), Long_create(1413808128, 67194948), Long_create(0, 1346655301), Long_create(0, 1413808128), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(2), Long_fromInt(138414), Long_create(481203191, 2), Long_create(2482474843, 138414), Long_create(2405105664, 481203191), Long_create(0, 2482474843), Long_create(0, 2405105664), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(256),
    Long_fromInt(16777216), Long_create(1, 256), Long_create(65793, 16777216), Long_create(16842752, 1), Long_create(0, 65793), Long_create(0, 16842752), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(34560), Long_create(2264924160, 0), Long_create(135, 34560), Long_create(8882055, 2264924160), Long_create(2273771520, 135), Long_create(0, 8882055), Long_create(0, 2273771520), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(64), Long_fromInt(4199680), Long_create(352321536, 64),
    Long_create(16469, 4199680), Long_create(1079334165, 352321536), Long_create(1427439616, 16469), Long_create(0, 1079334165), Long_create(0, 1427439616), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(8650), Long_fromInt(566946560), Long_create(3942645793, 8650), Long_create(2222848, 566946560), Long_create(3942654443, 3942645793), Long_create(569049088, 2222848), Long_create(0, 3942654443), Long_create(0, 569049088), Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(16), Long_fromInt(1048577), Long_create(69888, 16),
    Long_create(285216784, 1048577), Long_create(269488400, 69888), Long_create(286265361, 285216784), Long_create(269549568, 269488400), Long_create(0, 286265361), Long_create(0, 269549568), Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(2160), Long_fromInt(141557903), Long_create(9434888, 2160), Long_create(4144527480, 141557903), Long_create(2021195640, 9434888), Long_create(4286085367, 4144527480), Long_create(2029453312, 2021195640), Long_create(0, 4286085367), Long_create(0, 2029453312), Long_ZERO, Long_ZERO,
    Long_fromInt(4), Long_fromInt(262480), Long_create(22037588, 4), Long_create(1146372357, 262480), Long_create(1090868501, 22037588), Long_create(1427456085, 1146372357), Long_create(1079316805, 1090868501), Long_create(289734656, 1427456085), Long_create(0, 1079316805), Long_create(0, 289734656), Long_ZERO, Long_ZERO, Long_fromInt(540), Long_fromInt(35434131), Long_create(2928932749, 540), Long_create(4153230768, 35434131), Long_create(1169170890, 2928932749), Long_create(566946595, 4153230768), Long_create(3944993883, 1169170890),
    Long_create(3562733568, 566946595), Long_create(0, 3944993883), Long_create(0, 3562733568), Long_ZERO, Long_fromInt(1), Long_fromInt(65536), Long_create(0, 1)]), $rt_createLongArrayFromData([Long_ZERO, Long_fromInt(135), Long_ZERO, Long_ZERO, Long_create(1879085047, 8), Long_ZERO, Long_ZERO, Long_create(8882055, 2264924160), Long_ZERO, Long_fromInt(1048577), Long_create(4286085367, 4144527480), Long_ZERO, Long_create(0, 65536), Long_create(8847495, 135), Long_fromInt(33), Long_create(0, 17891328), Long_create(4294414327, 1879638015),
    Long_create(481203191, 2), Long_create(16777472, 16842752), Long_create(2264958855, 2273806080), Long_create(2222848, 566946560), Long_create(286327057, 268501009), Long_create(2274064807, 1879638007), Long_create(566946111, 4153230768), Long_fromInt(1), Long_create(135, 16530), Long_ZERO, Long_fromInt(268435737), Long_create(1879085047, 541383610), Long_ZERO, Long_create(2248212737, 16777216), Long_create(8882055, 3352482450), Long_fromInt(8650), Long_create(4144527480, 425726110), Long_create(4286085367, 1210388938),
    Long_create(2928866705, 540), Long_create(65671, 65537), Long_create(8847495, 1083326485), Long_create(3422158881, 3404402721), Long_create(1897525247, 286331161), Long_create(4227260337, 2348688461), Long_create(2465632091, 2482344948), Long_create(2256963073, 2248181504), Long_create(2794076626, 361185426), Long_create(4211146800, 269496538), Long_create(1880684438, 4008157166), Long_create(1632058691, 3772479619), Long_create(1169170890, 2928932749), Long_fromInt(16404), Long_fromInt(135), Long_fromInt(2214635),
    Long_create(1078220116, 1025), Long_create(1879085047, 8), Long_create(2482474843, 138414), Long_create(1079268372, 335544320), Long_create(8882119, 2264924160), Long_create(3815768238, 3942645793), Long_create(1364525397, 1342522629), Long_create(4264049827, 4144527484), Long_create(1169171414, 1161241558), Long_create(1075068948, 81940), Long_create(8851591, 1075118215), Long_create(3402287810, 1161677514), Long_create(353903956, 1163137297), Long_create(4227259315, 609091327), Long_create(2264958720, 2273771520),
    Long_create(356537747, 1431671616), Long_create(2186331010, 3537077056), Long_create(4294414319, 1887897855), Long_create(996432350, 1422647821), Long_create(3600771506, 609090546), Long_create(35434004, 1), Long_create(16405, 2198136), Long_create(16530, 16530), Long_create(1879084030, 270650354), Long_create(1346655309, 2746438137), Long_create(541508381, 541384635), Long_create(2475006761, 351702554), Long_create(3327481109, 3201561208), Long_create(3200438962, 3537040152), Long_create(3137684772, 69741714),
    Long_create(2923264423, 209451107), Long_create(3139313525, 2799892230), Long_create(1161192386, 1161175888), Long_create(8863922, 2329922157), Long_create(1152113229, 1099653153), Long_create(6405114, 606347309), Long_create(2736072790, 685864374), Long_create(2087770803, 3323461333), Long_create(3464267315, 2453673026), Long_create(3875460693, 766692090), Long_create(4089956989, 3880897365), Long_create(1833298866, 3669154499), Long_create(803768483, 3929764567), Long_create(3565667953, 2629457758), Long_create(3597035108, 4119980835),
    Long_fromInt(135), Long_fromInt(135), Long_create(2480293296, 138414), Long_create(1879085047, 8), Long_create(1879084983, 8), Long_create(2029498032, 3942784143), Long_create(8882055, 2264924160), Long_create(30917523, 2264924164), Long_create(3405233, 2930778603), Long_create(4285036790, 4144527480), Long_create(4264049827, 3072161916), Long_create(568925872, 1167125248), Long_create(9400455, 65671), Long_create(8848551, 340787335), Long_create(3597026705, 2389428936), Long_create(4294967152, 1897494783),
    Long_create(4128836929, 1901658045), Long_create(3421060183, 2390477514), Long_create(4269308280, 2248800008), Long_create(2522884483, 3813222720), Long_create(3835895729, 3199418216), Long_create(4007823310, 1619396846), Long_create(2722136265, 2543124295), Long_create(513013646, 1760923897), Long_create(134, 16530), Long_create(1346767992, 17555), Long_create(2211857577, 2211797262), Long_create(1610649326, 541383610), Long_create(2652083817, 893713969), Long_create(4277579697, 2212799279), Long_create(2398520845, 3335705234),
    Long_create(4217557751, 1007949264), Long_create(4146834434, 2799883477), Long_create(1083310084, 1371668820), Long_create(1416521314, 3874927883), Long_create(2407201702, 1969878717), Long_create(2611900424, 3421134928), Long_create(1414961706, 3396208780), Long_create(1820671087, 2465697616), Long_create(80201601, 2526466754), Long_create(3815481203, 3351471551), Long_create(3534345955, 1288206844), Long_create(2458322284, 1231372446), Long_create(2230211353, 2259040341), Long_create(1846867230, 2233239437),
    Long_create(4131845930, 1398384563), Long_create(3102124201, 313724344), Long_create(2062122862, 514997604), Long_create(1879101411, 8), Long_create(1080352300, 16778241), Long_create(3551779343, 137391), Long_create(1086583577, 2264925185), Long_create(3807842476, 84019383), Long_create(2873390590, 4278190113), Long_create(433060459, 3808983652), Long_create(4088829757, 688211233), Long_create(2987848778, 364143823), Long_create(4133597828, 2590590874), Long_create(2878868288, 2737790910), Long_create(541867318, 28805314),
    Long_create(3219764039, 4208771051), Long_create(2196134354, 1413257803), Long_create(213232438, 2403534099), Long_create(3688486751, 810955227), Long_create(1685663029, 2470514924), Long_create(286485815, 146611612), Long_create(1097909805, 3736693448), Long_create(172030453, 537354397), Long_create(1695839168, 4284509855), Long_create(4050673744, 139592303), Long_create(2990850075, 4155898840), Long_create(759558569, 2673434416), Long_create(2463391120, 543640932), Long_create(1610863571, 2989871840),
    Long_create(630430299, 826786565), Long_create(1643581628, 141802086), Long_create(1557164064, 2730107323), Long_create(1567514616, 815910871), Long_create(1301985475, 2599226218), Long_create(1101095735, 2264172112), Long_create(1764423553, 4003725312), Long_create(962009092, 2112846863), Long_create(2409382498, 421569830), Long_create(3468789501, 2792795927), Long_create(3075966481, 3220292165), Long_create(3389919314, 3279295975), Long_create(894179384, 3412021706), Long_create(2276303792, 3931823048),
    Long_create(1098341445, 4272049492), Long_create(2796264750, 2192525023), Long_create(1376998457, 2639689212), Long_create(1964338327, 4074551701), Long_create(2414772423, 4252454225), Long_create(4254045610, 3680887592), Long_create(1311419720, 1426056062), Long_create(3913250899, 1169170890)]), $rt_createLongArrayFromData([Long_ZERO, Long_create(1806346036, 4137643454), Long_create(2148340417, 2571963446), Long_create(0, 541383602), Long_create(17448870, 1003233285), Long_create(3011453359, 951726079),
    Long_create(478646105, 2601058270), Long_create(2158587903, 232554784), Long_create(1463887462, 3795825795), Long_create(2738106381, 1410168014), Long_create(2103107196, 3352999279), Long_create(4147805738, 4095075149), Long_create(166634364, 22020162), Long_create(2899584224, 2549884340), Long_create(1488886427, 3450126257), Long_create(3281665350, 2694814725), Long_create(2602537317, 2237286884), Long_create(3071356525, 500785017), Long_create(4145084921, 1360361055), Long_create(1939517901, 2228745715),
    Long_create(3498381878, 2549058669), Long_create(3846727255, 1943031177), Long_create(1163166433, 2019974760), Long_create(154864584, 4148582391), Long_create(2191471811, 1679421106), Long_create(722183139, 2025067826), Long_create(3695914049, 132699960), Long_create(1678186664, 489346966), Long_create(2504229785, 4092574005), Long_create(3760499408, 1478435975), Long_create(2325736724, 2367496694), Long_create(1750588012, 4227523795), Long_create(2413983894, 3131701570), Long_create(706642498, 3318570829),
    Long_create(170104906, 2476851690), Long_create(1798512783, 1336499751), Long_create(2848294831, 4061137068), Long_create(3125625194, 2577136387), Long_create(1782557880, 430894124), Long_create(1753621123, 955087881), Long_create(3359641922, 1690293939), Long_create(1658084379, 3535066134), Long_create(2336272847, 2641614560), Long_create(2460426909, 689398692), Long_create(51245543, 1853427198), Long_create(4130492032, 3973446990), Long_create(666589350, 2603269251), Long_create(2728580065, 2024726477),
    Long_create(3687392107, 1038335250), Long_create(3076651843, 83286144), Long_create(2134646073, 2760272631), Long_create(200032457, 1446658414), Long_create(2142154260, 662227639), Long_create(4159195560, 3589703918), Long_create(1529554151, 522853393), Long_create(71555977, 2006441755), Long_create(1476072216, 495514895), Long_create(4054134610, 808038698), Long_create(2624815658, 30749214), Long_create(987665690, 1284732114), Long_create(3937865829, 3828520434), Long_create(3997380193, 870748515), Long_create(490822498, 1035739887),
    Long_create(3872897046, 1307614475), Long_create(3124418207, 3912493055), Long_create(738147551, 799288367), Long_create(1115089613, 2518182037), Long_create(1464210484, 321668096), Long_create(602115605, 936901688), Long_create(874955496, 2012753416), Long_create(1774243606, 4016171867), Long_create(2765240960, 2149556314), Long_create(304369174, 374711164), Long_create(425174326, 3834311809), Long_create(2737666044, 3151524769), Long_create(1755012052, 1429964588), Long_create(2310126394, 3780284954),
    Long_create(1079738235, 2876098800), Long_create(2631681690, 3752169172), Long_create(1114390764, 70306721), Long_create(3359263333, 3178875796), Long_create(3695599637, 3101518176), Long_create(3594332956, 3004104951), Long_create(3389331607, 1059908465), Long_create(1172622118, 2470208759), Long_create(1804145722, 2254989636), Long_create(2332867835, 34310874), Long_create(4151237223, 2882890028), Long_create(1439970637, 2153215083), Long_create(1889494000, 3880965512), Long_create(1577687743, 3861554880),
    Long_create(3289664881, 1104947628), Long_create(716761084, 1597630001), Long_create(295828000, 1206619126), Long_create(1923421841, 2307911210), Long_create(3526002681, 3459014345), Long_create(2894527240, 7002042), Long_create(2463306607, 1318501045), Long_create(3245955488, 1956027517), Long_create(339373903, 3558631760), Long_create(1089915038, 3434382348), Long_create(3085054856, 3335119684), Long_create(635565065, 2481273236), Long_create(2276122519, 4227919776), Long_create(1528289410, 2779824199),
    Long_create(2707560802, 3150364364), Long_create(3574115295, 3097904146), Long_create(2350400656, 3094715899), Long_create(2578440304, 1730031403), Long_create(3017699569, 1762275162), Long_create(701735187, 2090108409), Long_create(2822879791, 4103158791), Long_create(834316315, 743293604), Long_create(3247763401, 3754356793), Long_create(206349129, 2664793051), Long_create(3686557614, 2399319528), Long_create(3863339483, 2319470110), Long_create(2381663473, 3126577197), Long_create(3283709817, 3205091694),
    Long_create(2888897733, 3493354940), Long_create(2741768912, 3078966288), Long_create(3247049264, 1784550821), Long_create(3347008528, 4019141152), Long_create(3261357422, 2737230691), Long_create(1262643692, 3339102488), Long_create(1210978664, 3321816409), Long_create(2851695233, 1087994903), Long_create(2534010440, 3147176205), Long_create(946411773, 365219422), Long_create(3106097248, 2126370728), Long_create(3101387578, 248507218), Long_create(3696193037, 1451657930), Long_create(246915240, 1283719940),
    Long_create(2042313561, 2828927695), Long_create(3526385437, 432545452), Long_create(3199928644, 2480040202), Long_create(3369847228, 2593930227), Long_create(3307655344, 3359313858), Long_create(3760512976, 1272345474), Long_create(3763234803, 1144128267), Long_create(1362168339, 1643215247), Long_create(939703859, 3241997385), Long_create(2299959340, 1086939395), Long_create(3580194827, 1042449426), Long_create(1578673373, 1718613624), Long_create(777472423, 2577543473), Long_create(1728409849, 466003774),
    Long_create(149254082, 2835799601), Long_create(1618624772, 537508370), Long_create(3696884620, 3425821803), Long_create(2070371141, 1576169676), Long_create(1717113096, 1684278386), Long_create(2962192675, 600833956), Long_create(2299174743, 3092818458), Long_create(245663387, 1470491621), Long_create(2861641951, 954194646), Long_create(3347925784, 4246116436), Long_create(712785652, 2456892819), Long_create(3960095263, 3700304043), Long_create(2280322911, 443180151), Long_create(3175687709, 2137858155),
    Long_create(1892692680, 3570949259), Long_create(1860363419, 1487655243), Long_create(93840342, 495811566), Long_create(2979756953, 1473695248), Long_create(472830254, 4273663418), Long_create(104981635, 284445166), Long_create(3702458201, 2141259562), Long_create(847401193, 722241323), Long_create(478413805, 3777051504), Long_create(383902245, 80691623), Long_create(2163889816, 3028836186), Long_create(1200239212, 3664022186), Long_create(976085547, 3614946575), Long_create(1511644262, 1147945922), Long_create(3373841083, 2722555959),
    Long_create(313182180, 1905959478), Long_create(3029472151, 586134619), Long_create(1821714362, 4157352465), Long_create(1835314742, 3302489981), Long_create(515784785, 3559250253), Long_create(2188377519, 2917126137), Long_create(316213990, 3670682504), Long_create(3525929552, 3755051926), Long_create(4291906284, 2709118182), Long_create(4060903699, 760522546), Long_create(1785081561, 4174883461), Long_create(214336439, 3394072887), Long_create(1906134282, 460243600), Long_create(2181234560, 2236061603),
    Long_create(4139146157, 750936308), Long_create(3515723162, 2017475961)]), $rt_createLongArrayFromData([Long_ZERO, Long_create(2855903165, 1603951362), Long_create(440706063, 1540571469), Long_create(3257589501, 16835359), Long_create(2513695010, 1168583632), Long_create(964056434, 3552356849), Long_create(2943519755, 496979687), Long_create(3021810987, 2277524486), Long_create(2878044588, 1083588265), Long_create(1229198885, 2536408374), Long_create(747952178, 1565296191), Long_create(2367445761, 2675271499),
    Long_create(155409779, 2931030783), Long_create(2866899750, 2836378577), Long_create(2771130497, 1370831796), Long_create(2708844122, 576169467), Long_create(757040834, 2439940080), Long_create(519065888, 43124929), Long_create(1887924388, 2953717503), Long_create(248502712, 3704574152), Long_create(1005746604, 1190081896), Long_create(1653493701, 1980277619), Long_create(1158308254, 2098487254), Long_create(3324447360, 3490573537), Long_create(665764721, 625989982), Long_create(1804694001, 59952303), Long_create(3865609567, 854361467),
    Long_create(1166139026, 2916921830), Long_create(4090128164, 230456948), Long_create(2638815995, 2443999624), Long_create(1230078443, 2280765008), Long_create(1226315571, 865965584), Long_create(4226778943, 1286272618), Long_create(273151348, 2384615602), Long_create(2485142495, 1729863302), Long_create(2956309572, 3505124240), Long_create(1991187471, 2049833461), Long_create(2611815744, 2732773084), Long_create(1716099132, 929876019), Long_create(3843840733, 3394111222), Long_create(2827332835, 3035905098),
    Long_create(287142599, 3448465630), Long_create(481850673, 3334947067), Long_create(2125797288, 1821029417), Long_create(3843520929, 2371855619), Long_create(3639849046, 2043974710), Long_create(2896750409, 3738419271), Long_create(1530032603, 2892798576), Long_create(2999978367, 2501172266), Long_create(835011415, 3035107957), Long_create(1750671026, 1528113995), Long_create(331963958, 2856077343), Long_create(3680578862, 3880596176), Long_create(2938681374, 898946716), Long_create(1633801895, 673895955),
    Long_create(3453306198, 772014318), Long_create(415247435, 1471636118), Long_create(3882063760, 3195976284), Long_create(91880907, 2572751893), Long_create(3926456736, 1151997727), Long_create(3775421531, 4115315648), Long_create(3360281364, 2831888839), Long_create(1082767257, 1804814202), Long_create(355380592, 3556479267), Long_create(2052122643, 3133937774), Long_create(2685183186, 1759010180), Long_create(161645687, 102648725), Long_create(1270922879, 2056483415), Long_create(1287789788, 1613604603),
    Long_create(4177438413, 2857825662), Long_create(2472471509, 1536190879), Long_create(31328311, 3381569323), Long_create(2781901429, 1163465000), Long_create(3018698296, 2640052031), Long_create(2842799140, 2830470560), Long_create(4019896871, 3586098091), Long_create(1653125495, 4159236010), Long_create(3475783536, 2906973373), Long_create(3271901754, 2619763739), Long_create(3951128700, 3641132011), Long_create(1119098601, 657864196), Long_create(1843793622, 2588600712), Long_create(3977410481, 4066495900),
    Long_create(909706638, 1277850910), Long_create(137369978, 1929968542), Long_create(3414254498, 1142596262), Long_create(2544373981, 2970773090), Long_create(1477104574, 13825826), Long_create(2222108, 2794501258), Long_create(3351228149, 2010370965), Long_create(2924407220, 1445330852), Long_create(806749183, 4271227115), Long_create(1774994633, 1827403553), Long_create(2921080286, 814522840), Long_create(3366371231, 2995792235), Long_create(3295867001, 3702380901), Long_create(1540933742, 1194572080),
    Long_create(1482120659, 131109324), Long_create(4057742174, 497204227), Long_create(1853985791, 1789143935), Long_create(3128280034, 2664611062), Long_create(1375357336, 903610508), Long_create(3417098661, 2283929199), Long_create(800958208, 1978157089), Long_create(1720492641, 1993209303), Long_create(2006237271, 604016429), Long_create(3910565095, 1009938875), Long_create(1953532537, 3227231890), Long_create(1643220285, 2457268637), Long_create(3445066364, 364392011), Long_create(1144040355, 3900664211),
    Long_create(4023110092, 1296395276), Long_create(1015993165, 689822550), Long_create(2373159203, 3383757334), Long_create(4061393438, 3000706257), Long_create(2935370328, 2420663121), Long_create(3484889608, 2325816511), Long_create(2810715008, 3739383942), Long_create(3358467508, 1405150370), Long_create(762021449, 2467298312), Long_create(4076375, 768095732), Long_create(585319886, 1811652800), Long_create(2634614544, 1690165567), Long_create(2765093590, 1043623806), Long_create(4119756421, 2772836738),
    Long_create(1741511054, 3591188536), Long_create(2196830556, 1664470935), Long_create(2513023556, 1182111854), Long_create(3730782519, 1842325270), Long_create(834719517, 1128861512), Long_create(2524715246, 3403153918), Long_create(1422103630, 1049608376), Long_create(1273674621, 1594028555), Long_create(3729551571, 1453534406), Long_create(3843171935, 971123873), Long_create(3956028551, 2402702176), Long_create(2170076962, 2466669280), Long_create(2812303432, 929138468), Long_create(3409266713, 2901821640),
    Long_create(188838420, 3090027801), Long_create(1149486761, 3996513537), Long_create(1694196809, 1463536636), Long_create(2918670424, 2882260739), Long_create(3014558016, 1764036028), Long_create(2830585224, 4286547123), Long_create(705809574, 4280765983), Long_create(3649207097, 2309030555), Long_create(589921767, 3173387551), Long_create(669254706, 3214417131), Long_create(1359251961, 435907543), Long_create(2112284199, 1220101773), Long_create(3521842926, 366040645), Long_create(2332633114, 4143465301),
    Long_create(608546595, 2738923754), Long_create(1772033819, 1058358939), Long_create(2600165748, 3015548953), Long_create(548403921, 1526558202), Long_create(2335380775, 3710237168), Long_create(749274725, 3788124697), Long_create(145475891, 2398886822), Long_create(579968283, 2381198119), Long_create(228776761, 1217344564), Long_create(235923442, 2421022219), Long_create(3959023469, 3609881414), Long_create(4103719259, 2492985681), Long_create(2002286783, 1243209732), Long_create(1032282981, 100542973),
    Long_create(2056698608, 1514382790), Long_create(2086291748, 308601821), Long_create(3957666117, 2105785059), Long_create(796849642, 3826465495), Long_create(1985315572, 521418853), Long_create(4138070332, 1268105326), Long_create(1775518861, 2202143683), Long_create(1136926911, 74162625), Long_create(149103158, 1047270914), Long_create(4250523013, 563908937), Long_create(898495370, 2082614794), Long_create(700311548, 3928108937), Long_create(2410789719, 2553205870), Long_create(1152841615, 2342346598),
    Long_create(3273311728, 3171164739), Long_create(3612906690, 3819870732), Long_create(235662665, 276056841), Long_create(2064102488, 2143940765), Long_create(771942533, 1206407395), Long_create(1090939858, 1679508097), Long_create(3729671161, 817809941), Long_create(496974020, 3214913883), Long_create(2895103329, 3121328272), Long_create(658911330, 522950438), Long_create(1050266617, 3734439391)]), $rt_createLongArrayFromData([Long_ZERO, Long_create(1792548972, 1008583220), Long_create(514973024, 1173265645),
    Long_create(1835594102, 1530247997), Long_create(3908735264, 3509646608), Long_create(1944007450, 4107548068), Long_create(137833410, 1238505706), Long_create(3025508930, 1553052095), Long_create(419441538, 2123958356), Long_create(1399939728, 1893427700), Long_create(74555153, 432183194), Long_create(277766219, 3731979929), Long_create(2513577042, 517334600), Long_create(3234283267, 4135026467), Long_create(4266809449, 445035332), Long_create(614394574, 2415225216), Long_create(3372146590, 748544920), Long_create(3908928871, 3272760089),
    Long_create(1438371543, 3479722540), Long_create(475618441, 682600142), Long_create(981627646, 1442813679), Long_create(2187054900, 2435771336), Long_create(1030170622, 4238444537), Long_create(2343193187, 3186001381), Long_create(2138325014, 4032169053), Long_create(2378445008, 3565459933), Long_create(3072420094, 2827929616), Long_create(3868956131, 1709393635), Long_create(605744474, 4122079637), Long_create(890602019, 2625848987), Long_create(4106477230, 3134527642), Long_create(3790315470, 1181087482),
    Long_create(1770677149, 484050919), Long_create(3357015650, 2816113679), Long_create(991712859, 2923697049), Long_create(83974432, 2867339231), Long_create(350166947, 1523327071), Long_create(3524193700, 1974576260), Long_create(2240422090, 42647190), Long_create(793049469, 4216582517), Long_create(776523295, 3966592982), Long_create(3828406628, 215636154), Long_create(4036671582, 3624004212), Long_create(1923068955, 4028262755), Long_create(2556376583, 547590769), Long_create(214137278, 2976650708), Long_create(858390794, 3623902125),
    Long_create(4048366116, 1584282264), Long_create(1064172077, 2514787868), Long_create(1390735318, 1075943946), Long_create(2374099623, 3747015841), Long_create(610029891, 4140173909), Long_create(2010449122, 4165854531), Long_create(1211039549, 3741350271), Long_create(911587311, 503437041), Long_create(1111947528, 1742054252), Long_create(1620918291, 1923028919), Long_create(3095249898, 3399322355), Long_create(1594473321, 403105949), Long_create(3896926354, 3833962466), Long_create(3811540094, 186426259),
    Long_create(3003276878, 585617031), Long_create(3738707381, 3829903746), Long_create(2991022882, 1087925107), Long_create(1220381005, 1618685719), Long_create(3930889530, 270401431), Long_create(936955251, 2342793185), Long_create(356989945, 4124275247), Long_create(1642157316, 1323175476), Long_create(37308428, 3520749136), Long_create(941942850, 2526749956), Long_create(731164449, 283339069), Long_create(4183173026, 1647648714), Long_create(2646514735, 1009378094), Long_create(595880143, 2314131531), Long_create(4073084053, 2865883182),
    Long_create(117100380, 3598627356), Long_create(2217850383, 1911069572), Long_create(4077062145, 4245651509), Long_create(4067552880, 3377613340), Long_create(424887203, 275422289), Long_create(724836219, 1135664382), Long_create(4121047767, 2514276449), Long_create(3275355105, 1543305410), Long_create(2401676742, 3603261874), Long_create(2026129751, 3207609927), Long_create(2363825991, 4259197319), Long_create(3389577246, 3524341169), Long_create(229718668, 408369236), Long_create(4149982197, 3072189217),
    Long_create(2898002222, 2721040736), Long_create(2409401241, 2229274292), Long_create(1459846357, 3568499414), Long_create(3025791549, 1392001752), Long_create(4041787979, 1749183849), Long_create(776310001, 131045333), Long_create(1755505629, 1141936313), Long_create(2019588563, 3437353689), Long_create(3232856443, 1639710039), Long_create(658728387, 3835783163), Long_create(457852862, 1477645077), Long_create(1616567376, 3772684946), Long_create(682115670, 2101700995), Long_create(2479782015, 1162674168),
    Long_create(2287935328, 67059794), Long_create(565567185, 3281427879), Long_create(1557299537, 3032821853), Long_create(1284477751, 360818592), Long_create(2819108788, 841566004), Long_create(3837613764, 2193115283), Long_create(1264553266, 379448434), Long_create(2487458152, 3652439138), Long_create(4263279511, 1963351721), Long_create(2030147900, 142342304), Long_create(869205792, 3531007633), Long_create(695801687, 2745854435), Long_create(1231517571, 2719209258), Long_create(3114986960, 4290688502),
    Long_create(1077564114, 867759717), Long_create(3818302403, 2091493732), Long_create(3532559896, 2602097966), Long_create(284486861, 1719654624), Long_create(498448316, 2089638406), Long_create(2863620941, 67755341), Long_create(1850618742, 1234127350), Long_create(2647488267, 2955859338), Long_create(676343755, 1012765804), Long_create(23257324, 2672245484), Long_create(1573586427, 1433159453), Long_create(1944709930, 646952103), Long_create(1310084814, 3049895367), Long_create(2387389931, 2193133666),
    Long_create(4211835042, 7042979), Long_create(444656732, 1731949298), Long_create(3437280628, 680492000), Long_create(2490672543, 2390184826), Long_create(3563319989, 2609740125), Long_create(16112080, 97002607), Long_create(4284126566, 2688894323), Long_create(316766150, 1728071650), Long_create(3579058992, 4022104639), Long_create(1675326667, 2719622271), Long_create(4037386880, 403059663), Long_create(3083122803, 3222131369), Long_create(3117957977, 3546875457), Long_create(1968473560, 3071220584), Long_create(1512337333, 3756100705),
    Long_create(1921473478, 1023670698), Long_create(2007251227, 700054669), Long_create(2896496781, 1345512817), Long_create(1983874183, 967906702), Long_create(902465462, 1704017094), Long_create(3653622666, 132575942), Long_create(1420132633, 966985001), Long_create(1789413477, 3885977192), Long_create(3614530973, 3523260386), Long_create(1510257050, 79655565), Long_create(2019096367, 2532442878), Long_create(4282603180, 1784396826), Long_create(81796658, 2648790041), Long_create(1216501553, 67508235), Long_create(1443531680, 1856647110),
    Long_create(936644852, 171911132), Long_create(2392335157, 193700489), Long_create(761037441, 2510965026), Long_create(2178317166, 2667616784), Long_create(1761101768, 994518171), Long_create(2151932496, 3165703812), Long_create(671969128, 868869975), Long_create(3123028570, 1714773836), Long_create(60022452, 3653107255), Long_create(3530327658, 3886593966), Long_create(3884026607, 1663127636), Long_create(1324968533, 1070343604), Long_create(3821679044, 1827275311), Long_create(561540106, 443748418), Long_create(2131749465, 2862203238),
    Long_create(2999754981, 1633611534), Long_create(1240113947, 3852642202), Long_create(184898890, 1681315859), Long_create(568468504, 3317185873), Long_create(3540687719, 2252234896), Long_create(1727268874, 922301939), Long_create(1589365035, 3501556989), Long_create(210186286, 776888687), Long_create(3618536934, 379118165), Long_create(603254409, 2678082490), Long_create(225307560, 1341073411), Long_create(2292978739, 3670908795), Long_create(445497467, 2221693420), Long_create(1613677071, 1542528894),
    Long_create(3612192204, 2256159405)])]);
    g_GF2_192_powTable2 = $rt_createArrayFromData($rt_arraycls($rt_longcls()), [$rt_createLongArrayFromData([Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(1), Long_fromInt(4), Long_fromInt(16), Long_fromInt(64), Long_fromInt(256), Long_fromInt(1024), Long_fromInt(4096), Long_fromInt(16384), Long_fromInt(65536), Long_fromInt(262144), Long_fromInt(1048576),
    Long_fromInt(4194304), Long_fromInt(16777216), Long_fromInt(67108864), Long_fromInt(268435456), Long_fromInt(1073741824), Long_create(0, 1), Long_create(0, 4), Long_create(0, 16), Long_create(0, 64), Long_create(0, 256), Long_create(0, 1024), Long_create(0, 4096), Long_create(0, 16384), Long_create(0, 65536), Long_create(0, 262144), Long_create(0, 1048576), Long_create(0, 4194304), Long_create(0, 16777216), Long_create(0, 67108864), Long_create(0, 268435456), Long_create(0, 1073741824), Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(2), Long_fromInt(8), Long_fromInt(33), Long_fromInt(135), Long_fromInt(540), Long_fromInt(2160), Long_fromInt(8640), Long_fromInt(34560), Long_fromInt(138240), Long_fromInt(552960), Long_fromInt(2211840), Long_fromInt(8847360), Long_fromInt(35389440), Long_fromInt(141557760), Long_fromInt(566231040), Long_create(2264924160, 0), Long_create(469762048, 2), Long_create(1879048192, 8),
    Long_create(3221225472, 33), Long_create(0, 135), Long_create(0, 540), Long_create(0, 2160), Long_create(0, 8640), Long_create(0, 34560), Long_create(0, 138240), Long_create(0, 552960), Long_create(0, 2211840), Long_create(0, 8847360), Long_create(0, 35389440), Long_create(0, 141557760), Long_create(0, 566231040), Long_create(0, 2264924160), Long_create(0, 469762048), Long_create(0, 1879048192), Long_create(0, 3221225472)]), $rt_createLongArrayFromData([Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(1), Long_fromInt(16), Long_fromInt(256), Long_fromInt(4096), Long_fromInt(65536), Long_fromInt(1048576), Long_fromInt(16777216), Long_fromInt(268435456), Long_create(0, 1), Long_create(0, 16), Long_create(0, 256),
    Long_create(0, 4096), Long_create(0, 65536), Long_create(0, 1048576), Long_create(0, 16777216), Long_create(0, 268435456), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(8), Long_fromInt(135), Long_fromInt(2160),
    Long_fromInt(34560), Long_fromInt(552960), Long_fromInt(8847360), Long_fromInt(141557760), Long_create(2264924160, 0), Long_create(1879048192, 8), Long_create(0, 135), Long_create(0, 2160), Long_create(0, 34560), Long_create(0, 552960), Long_create(0, 8847360), Long_create(0, 141557760), Long_create(0, 2264924160), Long_create(0, 1879048192), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(4), Long_fromInt(64), Long_fromInt(1025), Long_fromInt(16405), Long_fromInt(262480), Long_fromInt(4199680), Long_fromInt(67194880), Long_fromInt(1075118080), Long_create(22020096, 4), Long_create(352321536, 64), Long_create(1342177280, 1025), Long_create(0, 16405), Long_create(0, 262480), Long_create(0, 4199680), Long_create(0, 67194880), Long_create(0, 1075118080),
    Long_create(0, 22020096), Long_create(0, 352321536), Long_create(0, 1342177280), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(2), Long_fromInt(33), Long_fromInt(540), Long_fromInt(8650), Long_fromInt(138414), Long_fromInt(2214635), Long_fromInt(35434160),
    Long_fromInt(566946560), Long_create(481210368, 2), Long_create(3404398592, 33), Long_create(2930769920, 540), Long_create(3942645760, 8650), Long_create(2952790016, 138414), Long_create(0, 2214635), Long_create(0, 35434160), Long_create(0, 566946560), Long_create(0, 481210368), Long_create(0, 3404398592), Long_create(0, 2930769920), Long_create(0, 3942645760), Long_create(0, 2952790016)]), $rt_createLongArrayFromData([Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_fromInt(1), Long_fromInt(65536), Long_create(0, 1), Long_create(0, 65536), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(135), Long_fromInt(8847360), Long_create(0, 135), Long_create(0, 8847360), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(16405), Long_fromInt(1075118080), Long_create(0, 16405), Long_create(0, 1075118080), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO,
    Long_fromInt(33), Long_fromInt(2214635), Long_create(3404398592, 33), Long_create(0, 2214635), Long_create(0, 3404398592), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(4096), Long_fromInt(268435729), Long_create(17891328, 4096), Long_create(0, 268435729), Long_create(0, 17891328), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(8), Long_fromInt(552960), Long_create(1879085047, 8), Long_create(2415329280, 552960), Long_create(0, 1879085047),
    Long_create(0, 2415329280), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(1025), Long_fromInt(67194948), Long_create(1346655301, 1025), Long_create(1413808128, 67194948), Long_create(0, 1346655301), Long_create(0, 1413808128), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(2), Long_fromInt(138414), Long_create(481203191, 2), Long_create(2482474843, 138414), Long_create(2405105664, 481203191), Long_create(0, 2482474843), Long_create(0, 2405105664), Long_ZERO,
    Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(256), Long_fromInt(16777216), Long_create(1, 256), Long_create(65793, 16777216), Long_create(16842752, 1), Long_create(0, 65793), Long_create(0, 16842752), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(34560), Long_create(2264924160, 0), Long_create(135, 34560), Long_create(8882055, 2264924160), Long_create(2273771520, 135), Long_create(0, 8882055), Long_create(0, 2273771520), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(64),
    Long_fromInt(4199680), Long_create(352321536, 64), Long_create(16469, 4199680), Long_create(1079334165, 352321536), Long_create(1427439616, 16469), Long_create(0, 1079334165), Long_create(0, 1427439616), Long_ZERO, Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(8650), Long_fromInt(566946560), Long_create(3942645793, 8650), Long_create(2222848, 566946560), Long_create(3942654443, 3942645793), Long_create(569049088, 2222848), Long_create(0, 3942654443), Long_create(0, 569049088), Long_ZERO, Long_ZERO, Long_ZERO,
    Long_fromInt(16), Long_fromInt(1048577), Long_create(69888, 16), Long_create(285216784, 1048577), Long_create(269488400, 69888), Long_create(286265361, 285216784), Long_create(269549568, 269488400), Long_create(0, 286265361), Long_create(0, 269549568), Long_ZERO, Long_ZERO, Long_ZERO, Long_fromInt(2160), Long_fromInt(141557903), Long_create(9434888, 2160), Long_create(4144527480, 141557903), Long_create(2021195640, 9434888), Long_create(4286085367, 4144527480), Long_create(2029453312, 2021195640), Long_create(0, 4286085367),
    Long_create(0, 2029453312), Long_ZERO, Long_ZERO, Long_fromInt(4), Long_fromInt(262480), Long_create(22037588, 4), Long_create(1146372357, 262480), Long_create(1090868501, 22037588), Long_create(1427456085, 1146372357), Long_create(1079316805, 1090868501), Long_create(289734656, 1427456085), Long_create(0, 1079316805), Long_create(0, 289734656), Long_ZERO, Long_ZERO, Long_fromInt(540), Long_fromInt(35434131), Long_create(2928932749, 540), Long_create(4153230768, 35434131), Long_create(1169170890, 2928932749),
    Long_create(566946595, 4153230768), Long_create(3944993883, 1169170890), Long_create(3562733568, 566946595), Long_create(0, 3944993883), Long_create(0, 3562733568)]), $rt_createLongArrayFromData([Long_ZERO, Long_ZERO, Long_fromInt(16405), Long_ZERO, Long_ZERO, Long_create(1346655301, 1025), Long_ZERO, Long_ZERO, Long_create(1079334165, 352321536), Long_ZERO, Long_fromInt(141557903), Long_create(1079316805, 1090868501), Long_ZERO, Long_create(0, 8847360), Long_create(1075134485, 16405), Long_fromInt(4096),
    Long_create(8, 2415329280), Long_create(67195973, 1413808128), Long_create(1, 256), Long_create(2264958720, 2273771520), Long_create(356537621, 1431639360), Long_create(269488400, 69888), Long_create(4294414335, 1887897855), Long_create(1393344470, 1413809157), Long_ZERO, Long_fromInt(135), Long_create(16405, 2198270), Long_ZERO, Long_create(1879084030, 8), Long_create(1346655301, 3283345183), Long_ZERO, Long_create(2458355591, 2264924224), Long_create(1079334165, 3193271550), Long_fromInt(1048577), Long_create(1090868501, 4264049827),
    Long_create(1079316805, 3933442059), Long_create(8781824, 65536), Long_create(8863765, 8847495), Long_create(1075134516, 2329922283), Long_create(2397442048, 18440192), Long_create(3686428672, 4294966262), Long_create(414172848, 1290328860), Long_create(2273706241, 16843142), Long_create(3537015495, 2453673280), Long_create(883573781, 2872347310), Long_create(1636243695, 2020147065), Long_create(1546718634, 4219021491), Long_create(2236289881, 3485215288), Long_fromInt(1), Long_fromInt(2214508), Long_fromInt(16405),
    Long_fromInt(268435729), Long_create(3824615596, 138406), Long_create(1346655301, 1025), Long_create(65857, 16777216), Long_create(3951535724, 1811939361), Long_create(1079342303, 352321536), Long_create(273699908, 285216788), Long_create(472624163, 2998426034), Long_create(4006012616, 1090869001), Long_create(65537, 1075052545), Long_create(3394095724, 10930765), Long_create(1075654708, 3404414997), Long_create(286332176, 1163137297), Long_create(3881455840, 1889861629), Long_create(414047129, 3676210946),
    Long_create(356521280, 1427439680), Long_create(3404423465, 6379722), Long_create(2815658886, 1442523266), Long_create(67196964, 269567232), Long_create(303129170, 3414337726), Long_create(1852359966, 3676052151), Long_create(16405, 134), Long_create(2214635, 270633832), Long_create(2198270, 2198270), Long_create(1346784482, 1610648295), Long_create(2482473810, 3014674758), Long_create(3266430896, 3283207089), Long_create(945116532, 361146124), Long_create(2030051755, 1371726601), Long_create(1495622724, 1430607124),
    Long_create(2746763686, 147754656), Long_create(1410252789, 413128957), Long_create(2924865225, 30885452), Long_create(1085459020, 1083392147), Long_create(1077189241, 3690611075), Long_create(2327716141, 16789572), Long_create(838459048, 4008506947), Long_create(3825201838, 2853999440), Long_create(1295998169, 1503171220), Long_create(1429506905, 3754577067), Long_create(3482519913, 427362711), Long_create(951208342, 475060816), Long_create(2687257417, 1550935550), Long_create(1004530341, 2333685682), Long_create(1819569037, 2316045298),
    Long_fromInt(268435728), Long_fromInt(16405), Long_fromInt(16405), Long_create(268501008, 16777216), Long_create(1346655301, 1025), Long_create(1346663823, 1025), Long_create(286331152, 268439568), Long_create(1079334165, 352321536), Long_create(4005987154, 352322076), Long_create(425791647, 285216785), Long_create(1210388938, 1090868501), Long_create(4006012616, 2347652873), Long_create(286261520, 277287184), Long_create(1142165585, 8863765), Long_create(1075268793, 1169178645), Long_create(269553688, 2666926097),
    Long_create(17500, 3690075392), Long_create(3469312515, 4210368714), Long_create(2265030241, 2525368593), Long_create(3344290321, 2529575237), Long_create(3543407897, 208371336), Long_create(4008085135, 1619396712), Long_create(4193153144, 1620463103), Long_create(1334044362, 747724551), Long_create(268435863, 1610649184), Long_create(16530, 2198270), Long_create(2463373579, 2332240), Long_create(1610714094, 1636173928), Long_create(541384699, 3283345175), Long_create(3551647648, 681697883), Long_create(2207684247, 2045705776),
    Long_create(3548550302, 961901754), Long_create(1363494681, 3194388815), Long_create(1342457092, 29770962), Long_create(2331902492, 1414442125), Long_create(2587361896, 3415969434), Long_create(286863621, 4276527095), Long_create(359879780, 2259094014), Long_create(2263667697, 1074691471), Long_create(1157989015, 2264990855), Long_create(2108986986, 2861129036), Long_create(501048719, 3069896654), Long_create(1773556052, 2185597855), Long_create(3189222490, 1285196944), Long_create(3919721896, 3262022506),
    Long_create(1328208, 353652757), Long_create(3769323761, 341815264), Long_create(1508184029, 614464631), Long_fromInt(270650237), Long_create(1348836905, 1025), Long_create(4082175172, 2265062566), Long_create(3824550317, 16915622), Long_create(2746373624, 352459942), Long_create(3612157198, 2584371446), Long_create(4075271858, 2097156145), Long_create(2861748982, 755258672), Long_create(21658396, 1572358940), Long_create(354085081, 2990496183), Long_create(4093468655, 4089256895), Long_create(2664272004, 4267917676),
    Long_create(3355060387, 3754089310), Long_create(3410344781, 2320026189), Long_create(4288635977, 3002786355), Long_create(2111687320, 223056639), Long_create(4024863592, 3132782830), Long_create(33118479, 1481573559), Long_create(4274952246, 1706925788), Long_create(2117158012, 1167814745), Long_create(398333742, 3819203926), Long_create(2975120169, 1276528238), Long_create(1851853207, 280967415), Long_create(1035881943, 485756754), Long_create(1612775575, 1881212294), Long_create(2516801698, 3532804214),
    Long_create(568513218, 73419921), Long_create(825747987, 892783497), Long_create(3729599765, 8852483), Long_create(4262019296, 808860046), Long_create(623141773, 3280110730), Long_create(765021174, 2986771761), Long_create(349680174, 3935091601), Long_create(2326726264, 3682336821), Long_create(86592125, 2251453361), Long_create(1626668590, 3752978614), Long_create(143126082, 1209452160), Long_create(2942671591, 3342101763), Long_create(1898076307, 4081621586), Long_create(753423602, 3744747628), Long_create(1083290118, 3135891256),
    Long_create(2112534392, 2823374989), Long_create(614220938, 3673145293), Long_create(3084038210, 2040117212), Long_create(3252440095, 2991318608), Long_create(1489625569, 1239566963), Long_create(929316102, 2999467428), Long_create(4286834376, 3507361628)]), $rt_createLongArrayFromData([Long_ZERO, Long_create(2229230375, 632513032), Long_create(705242353, 9510357), Long_create(810933995, 352321544), Long_create(2937745396, 1075922902), Long_create(3393129935, 3618827997), Long_create(8642, 2415329280), Long_create(870578851, 2531169135),
    Long_create(2140633435, 1879252171), Long_create(3067114636, 2604867721), Long_create(2206489163, 2026720354), Long_create(2672764035, 2739293035), Long_create(1079316801, 3931136510), Long_create(4233750852, 4089253755), Long_create(1371804284, 222648524), Long_create(2688649101, 283014765), Long_create(2861401925, 4195685018), Long_create(892798587, 1227176585), Long_create(421650741, 542537609), Long_create(566511162, 1428352314), Long_create(149846893, 3753412731), Long_create(377230472, 1008090598),
    Long_create(1174752062, 2340847392), Long_create(2042992890, 3875367864), Long_create(682169844, 2408948574), Long_create(442750029, 434916235), Long_create(791780464, 1843929895), Long_create(1325700197, 2204085278), Long_create(2544752893, 947862955), Long_create(1208686205, 4222123211), Long_create(3828831488, 3610009058), Long_create(4089211170, 2405477966), Long_create(3292295406, 1234800290), Long_create(886570268, 688745490), Long_create(3165254932, 340792820), Long_create(1411241963, 2205062043),
    Long_create(3029054470, 1226701926), Long_create(943973898, 1621633215), Long_create(3224692879, 3941621619), Long_create(2022172746, 3616068835), Long_create(3771649359, 1292385008), Long_create(3257209044, 491919999), Long_create(2785589113, 3869351214), Long_create(4258177566, 1486507314), Long_create(2150451209, 4083932022), Long_create(1357379960, 1026948293), Long_create(1329408650, 2785412984), Long_create(3437411331, 2398036549), Long_create(3682831531, 2869825153), Long_create(2591794252, 744827972),
    Long_create(394245982, 2720630269), Long_create(2081200832, 2654205682), Long_create(449382120, 340565383), Long_create(510492757, 2659735239), Long_create(4109428964, 3598965789), Long_create(209843026, 740508747), Long_create(4061249083, 4225486892), Long_create(363304587, 2603025094), Long_create(2262680147, 1551432154), Long_create(502094036, 2348721223), Long_create(2320346919, 2108519661), Long_create(3348968553, 1815757561), Long_create(2799718359, 4284579126), Long_create(3082508074, 743231550),
    Long_create(4275019553, 288567906), Long_create(2512838982, 3134015871), Long_create(95720730, 956508265), Long_create(3734338850, 3323194323), Long_create(3466343191, 2403136261), Long_create(1324714403, 4018975887), Long_create(1102717958, 3604234888), Long_create(23371826, 629733267), Long_create(1118773786, 352779789), Long_create(4164764225, 1304163842), Long_create(769811565, 694676883), Long_create(1278006306, 834080622), Long_create(2557586674, 2612211293), Long_create(1851073518, 87497803), Long_create(996142740, 696951293),
    Long_create(1589291339, 2388316690), Long_create(3119921967, 158806466), Long_create(1283431486, 220920160), Long_create(3045507399, 3124470796), Long_create(2482680968, 425417869), Long_create(724854746, 3859467430), Long_create(1828613712, 335942449), Long_create(1563547750, 2548375745), Long_create(3053670304, 1762592880), Long_create(1095808344, 697585443), Long_create(1978666136, 2250250543), Long_create(315488511, 3877738200), Long_create(3468184071, 4092944305), Long_create(463572700, 3531165481),
    Long_create(1472721080, 75420432), Long_create(1326525663, 2944647981), Long_create(1627949816, 1691602351), Long_create(797496555, 2921233389), Long_create(4001509197, 3941663570), Long_create(1627220052, 1890545908), Long_create(421319106, 3471631439), Long_create(3381462902, 3410704438), Long_create(726529951, 687578636), Long_create(826767703, 1827392992), Long_create(3460513608, 3465748624), Long_create(709020667, 2586648005), Long_create(244649953, 1352069343), Long_create(3976527531, 966309256), Long_create(2345318402, 1300665398),
    Long_create(446757385, 738772727), Long_create(680161270, 3354024261), Long_create(691868442, 899813014), Long_create(3085925639, 762059804), Long_create(906441947, 426197303), Long_create(503505474, 873039526), Long_create(106998632, 827871994), Long_create(2373017946, 537207105), Long_create(1248465081, 2682970094), Long_create(2744880360, 4131567584), Long_create(2506718127, 3862188507), Long_create(2511675198, 1296330617), Long_create(3797651719, 2521870376), Long_create(2296082782, 1948228410), Long_create(1986207343, 300329169),
    Long_create(4239348020, 690183699), Long_create(3547366731, 24149132), Long_create(2205158101, 26940289), Long_create(1916973467, 1638664332), Long_create(1436092532, 1628328669), Long_create(3355586402, 3267468509), Long_create(3656781512, 3128711145), Long_create(1411223903, 2091961450), Long_create(2187717541, 1030732780), Long_create(1770921238, 2856523661), Long_create(1030417268, 809582280), Long_create(2388799650, 2876872100), Long_create(3853403314, 2866494979), Long_create(1775176143, 4012697246),
    Long_create(1913071892, 3406689201), Long_create(55951203, 2182802823), Long_create(3113625886, 4024798224), Long_create(577298652, 688156536), Long_create(427574004, 4061290534), Long_create(613287323, 1355198703), Long_create(2146296727, 3730057746), Long_create(284698667, 2398293591), Long_create(1489897533, 141106258), Long_create(1702692643, 1481992549), Long_create(1962055043, 2863172802), Long_create(2416120009, 2034786961), Long_create(3304877395, 3602788131), Long_create(979637940, 2414088366),
    Long_create(3716929450, 2326657369), Long_create(1927404370, 607722648), Long_create(3857923855, 953219783), Long_create(3152889364, 418742446), Long_create(1765890601, 1163893474), Long_create(3434627953, 2083959471), Long_create(1383873857, 293268936), Long_create(622645572, 4221616293), Long_create(4255671014, 1025502817), Long_create(2347410990, 1896735917), Long_create(1583378441, 3548150492), Long_create(508390681, 2019897315), Long_create(1521056577, 559967133), Long_create(3493144771, 701152553),
    Long_create(1369392782, 2547567032), Long_create(3755059203, 4127970370), Long_create(930390758, 4004123709), Long_create(3386299002, 3061676005), Long_create(248966857, 1026071437), Long_create(2223611593, 2603960877), Long_create(2219932894, 1080600166), Long_create(1501160906, 226862245), Long_create(4229599438, 1369842703), Long_create(1888419638, 408043391), Long_create(4245820816, 1090294054), Long_create(1580732098, 746004072), Long_create(403173135, 4210413513), Long_create(2990563873, 3748552021),
    Long_create(3416152356, 2400268950), Long_create(201413525, 3082624231), Long_create(4194919588, 2670994718), Long_create(3428404911, 2040537839), Long_create(252771479, 3342215368), Long_create(255617047, 827494159), Long_create(1565829402, 2048579457), Long_create(1625260808, 159089796), Long_create(4132757669, 1679869816), Long_create(3012391998, 3792602787), Long_create(915494353, 3957770517), Long_create(3640762976, 895300086), Long_create(3903429881, 4180588246)]), $rt_createLongArrayFromData([Long_ZERO,
    Long_create(3702953097, 2183685353), Long_create(621725759, 2254059659), Long_create(4196648571, 4213020189), Long_create(4277265164, 3407922382), Long_create(2987455355, 165157759), Long_create(473496397, 1482664530), Long_create(3076777036, 3757924640), Long_create(3982008195, 3527953708), Long_create(3841278216, 1017811054), Long_create(3040924940, 607060948), Long_create(2683839735, 4197801685), Long_create(3213161817, 2459814156), Long_create(772976438, 405736472), Long_create(1758730342, 1494221676),
    Long_create(296745854, 1686860627), Long_create(1282699723, 1901138317), Long_create(2572985347, 3539869024), Long_create(1176388502, 2731732973), Long_create(1115959200, 1233890110), Long_create(1408383575, 270693947), Long_create(2816127935, 3679158251), Long_create(3451928535, 1217368751), Long_create(3934242164, 3272591113), Long_create(2148940950, 1165786651), Long_create(2493372053, 1090322785), Long_create(1039508182, 3800458026), Long_create(4071028312, 3931025236), Long_create(64030139, 2455143248),
    Long_create(2689147991, 810187056), Long_create(2915558623, 542176832), Long_create(2629070019, 969296873), Long_create(3350378811, 4024366802), Long_create(1872081865, 1823061274), Long_create(3208407073, 878925228), Long_create(4161597326, 3614148217), Long_create(2449522991, 3409278242), Long_create(3785468329, 1103214367), Long_create(2920871396, 1362277165), Long_create(2077664985, 2015372825), Long_create(4096785411, 2185710354), Long_create(1947707658, 965722467), Long_create(3495288681, 5706501),
    Long_create(457371137, 2595274939), Long_create(1363064406, 1106307918), Long_create(643119447, 273841177), Long_create(3132055916, 3801034519), Long_create(3891437966, 1687381183), Long_create(2427040123, 2095613678), Long_create(562923590, 4087777218), Long_create(361511335, 1684947766), Long_create(2078450593, 1158244554), Long_create(780676747, 4197047846), Long_create(698001676, 3417510851), Long_create(2792865375, 2680494990), Long_create(1445471260, 691289345), Long_create(3599168272, 269593865),
    Long_create(1022879462, 3931916366), Long_create(3460419174, 3663283095), Long_create(3047961278, 2541514463), Long_create(1634018406, 206169642), Long_create(2592722429, 1898732661), Long_create(1382385763, 2855254820), Long_create(3498560196, 4060609058), Long_create(1632645216, 3527887058), Long_create(368981068, 1955636977), Long_create(115782086, 1150545265), Long_create(3611639760, 2861464908), Long_create(4023493830, 3530189459), Long_create(3784811231, 356726040), Long_create(2406931068, 2028030571),
    Long_create(947461732, 2937644301), Long_create(3802472040, 2253248424), Long_create(2061007458, 1614882295), Long_create(1442495488, 837547253), Long_create(4203831691, 675280703), Long_create(416886852, 3817965950), Long_create(728676902, 1642685838), Long_create(120125212, 2664635730), Long_create(2288426498, 224581102), Long_create(386650418, 2253667058), Long_create(303364433, 2653195302), Long_create(2777235076, 3144149587), Long_create(1223932518, 3484584517), Long_create(2424966623, 22591659), Long_create(2299457765, 1431640284),
    Long_create(2973121563, 1907039800), Long_create(1237395447, 4159256491), Long_create(2584879013, 616376894), Long_create(1891124597, 2725232120), Long_create(2276505425, 3595083795), Long_create(2922404222, 1629277047), Long_create(1665047945, 3933056873), Long_create(3213960376, 1236830374), Long_create(1901207877, 1964261525), Long_create(1326497179, 2751131743), Long_create(3389428440, 2275400929), Long_create(3453896908, 829465686), Long_create(3670516491, 750356060), Long_create(2553674044, 3011055032),
    Long_create(1942869096, 1882871525), Long_create(1644313949, 3953188727), Long_create(1555928770, 2045931788), Long_create(3968767473, 900749321), Long_create(419369530, 1503340911), Long_create(2652187529, 482134728), Long_create(3237131213, 3610074587), Long_create(1282295246, 2389610927), Long_create(4117671834, 2013506806), Long_create(4206165882, 3866135377), Long_create(2720403867, 1830077027), Long_create(585000183, 2317315962), Long_create(4050071851, 2252396452), Long_create(1226778463, 3074651761),
    Long_create(282925742, 3686910653), Long_create(3529981204, 2874211344), Long_create(669719943, 348504846), Long_create(1492916329, 2656319636), Long_create(314857480, 430293754), Long_create(2787486673, 3531086725), Long_create(3074305683, 2109296940), Long_create(1453982548, 764190717), Long_create(2411717318, 3150259705), Long_create(2374103710, 904819283), Long_create(1028412729, 4024334153), Long_create(1832882035, 148364574), Long_create(1284442933, 671944340), Long_create(2830728703, 1566666623),
    Long_create(94974995, 542141411), Long_create(1522517196, 1293212343), Long_create(2455206531, 2807121779), Long_create(726029852, 157887040), Long_create(3308125842, 2014314932), Long_create(33497399, 757580179), Long_create(2271956172, 4021861286), Long_create(4106675494, 3670530821), Long_create(1319965920, 625352658), Long_create(2858025381, 889790559), Long_create(3622041274, 3669960653), Long_create(1738849969, 1882225655), Long_create(127082091, 2347679195), Long_create(4004759490, 3140340720), Long_create(2763467808, 4146788287),
    Long_create(93801195, 2857392395), Long_create(684517626, 2390034462), Long_create(863455887, 1344777096), Long_create(1351099553, 688727252), Long_create(2267554563, 2920574777), Long_create(1728784367, 3756890737), Long_create(3876334616, 4023959054), Long_create(1911403541, 1771565380), Long_create(1858219093, 3794144516), Long_create(2756498873, 3133016038), Long_create(293369717, 2545504726), Long_create(1636040366, 1022986525), Long_create(3573271273, 2868885648), Long_create(3191599192, 1015035274),
    Long_create(2822678605, 2656344595), Long_create(719098589, 2105028148), Long_create(4192861514, 3138764952), Long_create(3118693725, 3663772258), Long_create(851498282, 2348421287), Long_create(3924182904, 2029994053), Long_create(3522072371, 1418203548), Long_create(2596384953, 738224068), Long_create(2467852699, 1689307315), Long_create(3821353131, 2652658812), Long_create(3535420516, 4081847888), Long_create(2074274366, 13620195), Long_create(3601487528, 3483690384), Long_create(3001834133, 2948251638),
    Long_create(3156046572, 960607425), Long_create(2913921970, 2863774491), Long_create(2736647093, 3532911433), Long_create(3234707975, 813731073), Long_create(978712476, 3129235353), Long_create(1805562333, 341014068), Long_create(965621875, 2016802402), Long_create(910712795, 2382561885), Long_create(2019820306, 1422991067), Long_create(2286010538, 2033205687), Long_create(1582813139, 3683678236), Long_create(2471802013, 1770499981), Long_create(2931277678, 2472202229), Long_create(3878755596, 2610369860),
    Long_create(3800663406, 1384889933), Long_create(3857876763, 355498929), Long_create(2575282508, 1423117624), Long_create(896798376, 3015166828), Long_create(3823303007, 3477557491), Long_create(2114505058, 2392858099), Long_create(1985678043, 2227552303)]), $rt_createLongArrayFromData([Long_ZERO, Long_create(2474994381, 731129), Long_create(314580534, 340029977), Long_create(1286837859, 547979713), Long_create(3092099655, 2385263995), Long_create(1286050511, 2794231567), Long_create(2511316379, 141748518),
    Long_create(2971220228, 1298340738), Long_create(4080847992, 3220070646), Long_create(2727626986, 2397384496), Long_create(1223567975, 3276323012), Long_create(2827205585, 14316736), Long_create(2298496585, 562752546), Long_create(2364095784, 2945206790), Long_create(3846099515, 472743818), Long_create(2396957859, 823165185), Long_create(1752064323, 1900119974), Long_create(2876153341, 881015691), Long_create(590207523, 4202869236), Long_create(1245198234, 2190761991), Long_create(1002223993, 2994947298),
    Long_create(382096159, 3417943673), Long_create(4149846118, 19485826), Long_create(383533750, 136562803), Long_create(2174881593, 1572319987), Long_create(2032033475, 2211536931), Long_create(1451821640, 2802497965), Long_create(576231740, 1090231555), Long_create(3511351222, 4226163769), Long_create(1301077474, 2038517162), Long_create(2495828210, 2677524085), Long_create(1994753982, 3131116914), Long_create(2610796338, 3150915058), Long_create(3460786080, 1549721294), Long_create(4167825261, 3339818952),
    Long_create(4005556932, 948499315), Long_create(200831591, 434931578), Long_create(2714620200, 1285126494), Long_create(2102413986, 3278724667), Long_create(2378805215, 3351254394), Long_create(1835006794, 1551467159), Long_create(322327505, 1623418582), Long_create(2817773399, 3548146465), Long_create(2365049862, 3389628802), Long_create(4215576419, 97790298), Long_create(432880274, 1972093079), Long_create(2173631902, 1636260598), Long_create(1613358457, 475101230), Long_create(1228351662, 3410052312),
    Long_create(1700195341, 475151408), Long_create(1761759121, 2195941277), Long_create(3604469542, 151808207), Long_create(1847894123, 2482907134), Long_create(2282317878, 3755311982), Long_create(791041692, 608127295), Long_create(3629542166, 2203069726), Long_create(1076079402, 207660842), Long_create(1502233346, 4209296879), Long_create(420543441, 3480732062), Long_create(1732060270, 1219244419), Long_create(3945965442, 958012871), Long_create(2660545511, 2545827591), Long_create(1751693634, 754878658),
    Long_create(4061306865, 1241393196), Long_create(14248044, 1815337837), Long_create(2007805987, 3730494388), Long_create(1238470529, 2398674320), Long_create(2662892859, 157349570), Long_create(1557561518, 3215886070), Long_create(2300852571, 1146911201), Long_create(953216432, 3136348650), Long_create(539929624, 3525094457), Long_create(3417607385, 2809976004), Long_create(3939312341, 766921559), Long_create(2652805279, 144008729), Long_create(1160106220, 12432320), Long_create(3635341333, 4068476283),
    Long_create(409712863, 2793300672), Long_create(3669810604, 3197607952), Long_create(723488728, 1352121563), Long_create(2456374452, 3673086502), Long_create(4191250430, 757487742), Long_create(923019644, 943306641), Long_create(2644125912, 2788248849), Long_create(169414128, 1620149246), Long_create(866900017, 3074861859), Long_create(2578891640, 2262327345), Long_create(3607277246, 4203806888), Long_create(945542370, 1235103271), Long_create(3843582182, 2262922717), Long_create(2774534335, 3817255799),
    Long_create(4117039839, 3465583409), Long_create(3572900105, 1772342951), Long_create(2751001912, 353447726), Long_create(3464901558, 4223264732), Long_create(1313802699, 3221006452), Long_create(756880025, 2517001438), Long_create(2406515875, 162313994), Long_create(3873950238, 3216810254), Long_create(2055628095, 1233425448), Long_create(852372008, 2187783824), Long_create(584795568, 2198287536), Long_create(1558743815, 626473194), Long_create(1630905424, 2817523635), Long_create(382751906, 1353011647),
    Long_create(773331986, 2529212592), Long_create(2546221788, 205667202), Long_create(3621403278, 3591020077), Long_create(340845692, 291938610), Long_create(807804528, 3677374388), Long_create(1618390213, 3533170454), Long_create(2169343508, 3421385453), Long_create(3337174737, 1035611506), Long_create(3040970590, 3404567798), Long_create(3906589543, 1303884040), Long_create(436999892, 4062188076), Long_create(4125325549, 2322915715), Long_create(3006324279, 1815181042), Long_create(2410054549, 94627238),
    Long_create(2244694740, 3605292539), Long_create(3142496148, 3997343881), Long_create(1340682085, 2328142065), Long_create(2709461662, 147681450), Long_create(1642194871, 3133462482), Long_create(3858298631, 1691308493), Long_create(405507882, 140684923), Long_create(700920223, 342364347), Long_create(1237795381, 1775866122), Long_create(1410356582, 1441979619), Long_create(557764309, 4274246369), Long_create(1961449022, 1222689957), Long_create(334077095, 4086230007), Long_create(1313296909, 4002569129),
    Long_create(1370562189, 2810569304), Long_create(604039036, 542932030), Long_create(1570703500, 2084953070), Long_create(3679854964, 1678353292), Long_create(952294448, 3149126188), Long_create(3660360950, 2021448699), Long_create(3211206069, 4157833183), Long_create(4176256986, 2109157179), Long_create(1202331697, 1308500817), Long_create(2984754756, 827977603), Long_create(2031779259, 613779131), Long_create(994901085, 2208355213), Long_create(4167945708, 2931655044), Long_create(302250389, 1950684208),
    Long_create(1915865667, 3744922067), Long_create(1915549235, 635703277), Long_create(2030927845, 2472249679), Long_create(1218638105, 1428627968), Long_create(3083830617, 1755489552), Long_create(1487460642, 690591044), Long_create(2004746959, 3806788148), Long_create(723628117, 2524366247), Long_create(755229151, 2613984062), Long_create(3695216424, 629689805), Long_create(670069242, 3604105598), Long_create(650969433, 2720356553), Long_create(914762684, 3933234473), Long_create(81482312, 364287616), Long_create(3166528482, 1424181249),
    Long_create(3617576386, 829428596), Long_create(2730368376, 3550049905), Long_create(1422792336, 4023647840), Long_create(2025333206, 3729702575), Long_create(204657575, 2255199950), Long_create(114885120, 2465553481), Long_create(2262913208, 745817010), Long_create(1012860767, 4074703270), Long_create(4011331468, 1151543903), Long_create(375354439, 3415506810), Long_create(1834453939, 2316649179), Long_create(2512759992, 1629338852), Long_create(1365507261, 1488537543), Long_create(3130914056, 301906866),
    Long_create(854218425, 1362569647), Long_create(2937122960, 3346838505), Long_create(2799389453, 2672999880), Long_create(2748788855, 3017275944), Long_create(1502668188, 3941240607), Long_create(1625802940, 887404837), Long_create(605870829, 3688367729), Long_create(581875898, 3623062581), Long_create(2397013971, 1550966455), Long_create(3632812999, 309119282), Long_create(1668100830, 3404175044), Long_create(75108342, 2451882897), Long_create(4135980764, 1568157228), Long_create(1855120963, 353719547),
    Long_create(3181033081, 1951666818), Long_create(59037268, 445059027)])]);
}
var jl_Character = $rt_classWithoutFields();
var jl_Character_TYPE = null;
var jl_Character_characterCache = null;
function jl_Character_$callClinit() {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
}
function jl_Character_forDigit($digit, $radix) {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
}
function jl_Character__clinit_() {
    jl_Character_TYPE = $rt_cls($rt_charcls());
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
}
var sb_Exported = $rt_classWithoutFields(0);
var sb_Crypto = $rt_classWithoutFields();
function sb_Crypto__init_() {
    var var_0 = new sb_Crypto();
    sb_Crypto__init_0(var_0);
    return var_0;
}
function sb_Crypto__init_0($this) {
    jl_Object__init_0($this);
}
function sb_Crypto_createBlake2bDigest($this, $size) {
    return sb_Blake2bDigestImpl__init_(obcd_Blake2bDigest__init_($size));
}
function sb_Crypto_create_GF_192($this, $that) {
    return g_GF2_192__init_5($that);
}
function sb_Crypto_fromByteArray($this, $coeff0, $moreCoeffs) {
    return g_GF2_192_Poly_fromByteArray($coeff0, $moreCoeffs);
}
function sb_Crypto_interpolate($this, $points, $values, $valueAt0) {
    return g_GF2_192_Poly_interpolate($points, $values, $valueAt0);
}
function sb_Crypto_fromByteArray$exported$0(var$0, var$1, var$2) {
    return var$0.$fromByteArray(otji_JS_unwrapByteArray(var$1), otji_JS_unwrapByteArray(var$2));
}
function sb_Crypto_interpolate$exported$1(var$0, var$1, var$2, var$3) {
    return var$0.$interpolate0(otji_JS_unwrapByteArray(var$1), otji_JS_unwrapArray($rt_cls(g_GF2_192_Base), var$2), var$3);
}
function sb_Crypto_create_GF_192$exported$2(var$0, var$1) {
    return var$0.$create_GF_192(otji_JS_unwrapByteArray(var$1));
}
function sb_Crypto_createBlake2bDigest$exported$3(var$0, var$1) {
    return var$0.$createBlake2bDigest(var$1);
}
var otci_IntegerUtil = $rt_classWithoutFields();
function otci_IntegerUtil_toUnsignedLogRadixString($value, $radixLog2) {
    var $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0;
    if (!$value)
        return $rt_s(2);
    $radix = 1 << $radixLog2;
    $mask = $radix - 1 | 0;
    $sz = (((32 - jl_Integer_numberOfLeadingZeros($value) | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
    $chars = $rt_createCharArray($sz);
    $pos = $rt_imul($sz - 1 | 0, $radixLog2);
    $target = 0;
    while ($pos >= 0) {
        var$9 = $chars.data;
        $target_0 = $target + 1 | 0;
        var$9[$target] = jl_Character_forDigit($value >>> $pos & $mask, $radix);
        $pos = $pos - $radixLog2 | 0;
        $target = $target_0;
    }
    return jl_String__init_($chars);
}
var jl_Long = $rt_classWithoutFields(jl_Number);
var jl_Long_TYPE = null;
function jl_Long_$callClinit() {
    jl_Long_$callClinit = $rt_eraseClinit(jl_Long);
    jl_Long__clinit_();
}
function jl_Long_rotateRight($i, $distance) {
    var var$3;
    jl_Long_$callClinit();
    var$3 = $distance & 63;
    return Long_or(Long_shru($i, var$3), Long_shl($i, 64 - var$3 | 0));
}
function jl_Long__clinit_() {
    jl_Long_TYPE = $rt_cls($rt_longcls());
}
var jl_Math = $rt_classWithoutFields();
function jl_Math_min($a, $b) {
    if ($a < $b)
        $b = $a;
    return $b;
}
function jl_Math_max($a, $b) {
    if ($a > $b)
        $b = $a;
    return $b;
}
var otjc_JSNumber = $rt_classWithoutFields();
function otjc_JSNumber_byteValue$static($this) {
    return $this;
}
var otji_JS = $rt_classWithoutFields();
function otji_JS_unwrapArray($type, $array) {
    var $result, $i, var$5;
    if ($array === null)
        return null;
    $result = jlr_Array_newInstance($type, $array.length);
    $i = 0;
    while (true) {
        var$5 = $result.data;
        if ($i >= var$5.length)
            break;
        var$5[$i] = $array[$i];
        $i = $i + 1 | 0;
    }
    return $result;
}
function otji_JS_unwrapByteArray($array) {
    var $result, $i, var$4;
    if ($array === null)
        return null;
    $result = $rt_createByteArray($array.length);
    $i = 0;
    while (true) {
        var$4 = $result.data;
        if ($i >= var$4.length)
            break;
        var$4[$i] = otjc_JSNumber_byteValue$static($array[$i]);
        $i = $i + 1 | 0;
    }
    return $result;
}
var jl_CharSequence = $rt_classWithoutFields(0);
var obu_Longs = $rt_classWithoutFields();
function obu_Longs_rotateRight(var$1, var$2) {
    return jl_Long_rotateRight(var$1, var$2);
}
var jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
function jl_StringIndexOutOfBoundsException__init_() {
    var var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
}
function jl_StringIndexOutOfBoundsException__init_0($this) {
    jl_IndexOutOfBoundsException__init_0($this);
}
var jlr_Type = $rt_classWithoutFields(0);
function jl_AbstractStringBuilder() {
    var a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length = 0;
}
function jl_AbstractStringBuilder__init_() {
    var var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_0);
    return var_0;
}
function jl_AbstractStringBuilder__init_1(var_0) {
    var var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_2(var_1, var_0);
    return var_1;
}
function jl_AbstractStringBuilder__init_0($this) {
    jl_AbstractStringBuilder__init_2($this, 16);
}
function jl_AbstractStringBuilder__init_2($this, $capacity) {
    jl_Object__init_0($this);
    $this.$buffer = $rt_createCharArray($capacity);
}
function jl_AbstractStringBuilder_append($this, $string) {
    return $this.$insert($this.$length, $string);
}
function jl_AbstractStringBuilder_insert($this, $index, $string) {
    var $i, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length) {
        if ($string === null)
            $string = $rt_s(3);
        else if ($string.$isEmpty())
            return $this;
        $this.$ensureCapacity($this.$length + $string.$length0() | 0);
        $i = $this.$length - 1 | 0;
        while ($i >= $index) {
            $this.$buffer.data[$i + $string.$length0() | 0] = $this.$buffer.data[$i];
            $i = $i + (-1) | 0;
        }
        $this.$length = $this.$length + $string.$length0() | 0;
        $i = 0;
        while ($i < $string.$length0()) {
            var$4 = $this.$buffer.data;
            var$5 = $index + 1 | 0;
            var$4[$index] = $string.$charAt($i);
            $i = $i + 1 | 0;
            $index = var$5;
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_AbstractStringBuilder_ensureCapacity($this, $capacity) {
    var $newLength;
    if ($this.$buffer.data.length >= $capacity)
        return;
    $newLength = $this.$buffer.data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($this.$buffer.data.length * 2 | 0, 5));
    $this.$buffer = ju_Arrays_copyOf($this.$buffer, $newLength);
}
function jl_AbstractStringBuilder_toString($this) {
    return jl_String__init_0($this.$buffer, 0, $this.$length);
}
var jl_Appendable = $rt_classWithoutFields(0);
var jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder);
function jl_StringBuilder__init_() {
    var var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
}
function jl_StringBuilder__init_0($this) {
    jl_AbstractStringBuilder__init_0($this);
}
function jl_StringBuilder_append($this, $string) {
    jl_AbstractStringBuilder_append($this, $string);
    return $this;
}
function jl_StringBuilder_insert($this, $index, $string) {
    jl_AbstractStringBuilder_insert($this, $index, $string);
    return $this;
}
function jl_StringBuilder_toString($this) {
    return jl_AbstractStringBuilder_toString($this);
}
function jl_StringBuilder_ensureCapacity($this, var$1) {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
}
function jl_StringBuilder_insert0($this, var$1, var$2) {
    return $this.$insert0(var$1, var$2);
}
var jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException);
function jl_ArrayStoreException__init_() {
    var var_0 = new jl_ArrayStoreException();
    jl_ArrayStoreException__init_0(var_0);
    return var_0;
}
function jl_ArrayStoreException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
var jlr_AnnotatedElement = $rt_classWithoutFields(0);
var obu_Arrays = $rt_classWithoutFields();
function obu_Arrays_fill(var$1, var$2) {
    ju_Arrays_fill2(var$1, var$2);
}
function obu_Arrays_fill0(var$1, var$2) {
    ju_Arrays_fill0(var$1, var$2);
}
var obc_Digest = $rt_classWithoutFields(0);
var jl_AssertionError = $rt_classWithoutFields(jl_Error);
function jl_AssertionError__init_() {
    var var_0 = new jl_AssertionError();
    jl_AssertionError__init_0(var_0);
    return var_0;
}
function jl_AssertionError__init_0($this) {
    jl_Error__init_0($this);
}
function g_GF2_192_Poly() {
    var a = this; jl_Object.call(a);
    a.$c = null;
    a.$deg = 0;
}
function g_GF2_192_Poly__init_(var_0, var_1) {
    var var_2 = new g_GF2_192_Poly();
    g_GF2_192_Poly__init_0(var_2, var_0, var_1);
    return var_2;
}
function g_GF2_192_Poly__init_1(var_0, var_1) {
    var var_2 = new g_GF2_192_Poly();
    g_GF2_192_Poly__init_2(var_2, var_0, var_1);
    return var_2;
}
function g_GF2_192_Poly__init_0($this, $coeff0, $moreCoeffs) {
    var var$3, $i;
    var$3 = $moreCoeffs.data;
    jl_Object__init_0($this);
    $this.$deg = var$3.length / 24 | 0;
    $this.$c = $rt_createArray(g_GF2_192, $this.$deg + 1 | 0);
    $this.$c.data[0] = g_GF2_192__init_5($coeff0);
    $i = 1;
    while ($i <= $this.$deg) {
        $this.$c.data[$i] = g_GF2_192__init_7($moreCoeffs, ($i - 1 | 0) * 24 | 0);
        $i = $i + 1 | 0;
    }
}
function g_GF2_192_Poly_fromByteArray($coeff0, $moreCoeffs) {
    return g_GF2_192_Poly__init_($coeff0, $moreCoeffs);
}
function g_GF2_192_Poly_interpolate($points, $values, $valueAt0) {
    var var$4, var$5, var$6, var$7, $resultDegree, $result, $vanishingPoly, $i, $t, $s;
    if ($points !== null && $values !== null) {
        var$4 = $values.data;
        var$5 = var$4.length;
        if (!(!var$5 && $valueAt0 === null)) {
            var$6 = $points.data;
            var$7 = var$6.length;
            if (var$5 == var$7) {
                $resultDegree = var$5 - 1 | 0;
                if ($valueAt0 !== null)
                    $resultDegree = $resultDegree + 1 | 0;
                $result = g_GF2_192_Poly__init_1($resultDegree, 0);
                $vanishingPoly = g_GF2_192_Poly__init_1($resultDegree, 1);
                $i = 0;
                while ($i < var$7) {
                    $t = $result.$evaluate(var$6[$i]);
                    $s = $vanishingPoly.$evaluate(var$6[$i]);
                    g_GF2_192_add($t, $t, var$4[$i]);
                    g_GF2_192_invert($s, $s);
                    g_GF2_192_mul($t, $t, $s);
                    g_GF2_192_Poly_addMonicTimesConstantTo($result, $vanishingPoly, $t);
                    if (!($i >= (var$7 - 1 | 0) && $valueAt0 === null))
                        g_GF2_192_Poly_monicTimesMonomial($vanishingPoly, var$6[$i]);
                    $i = $i + 1 | 0;
                }
                if ($valueAt0 !== null) {
                    $t = g_GF2_192__init_1($result.$c.data[0]);
                    $s = g_GF2_192__init_1($vanishingPoly.$c.data[0]);
                    g_GF2_192_add($t, $t, $valueAt0);
                    g_GF2_192_invert($s, $s);
                    g_GF2_192_mul($t, $t, $s);
                    g_GF2_192_Poly_addMonicTimesConstantTo($result, $vanishingPoly, $t);
                }
                return $result;
            }
        }
    }
    return null;
}
function g_GF2_192_Poly_evaluate($this, $x) {
    var $res, $d;
    $res = g_GF2_192__init_1($this.$c.data[$this.$deg]);
    $d = $this.$deg - 1 | 0;
    while ($d >= 0) {
        g_GF2_192_mul0($res, $res, $x);
        g_GF2_192_add($res, $res, $this.$c.data[$d]);
        $d = $d + (-1) | 0;
    }
    return $res;
}
function g_GF2_192_Poly_addMonicTimesConstantTo($this, $p, $r) {
    var $t, $i;
    $t = g_GF2_192__init_();
    $i = 0;
    while ($i < $p.$deg) {
        g_GF2_192_mul($t, $p.$c.data[$i], $r);
        g_GF2_192_add($this.$c.data[$i], $this.$c.data[$i], $t);
        $i = $i + 1 | 0;
    }
    $this.$deg = $p.$deg;
    $this.$c.data[$this.$deg] = g_GF2_192__init_1($r);
}
function g_GF2_192_Poly_monicTimesMonomial($this, $r) {
    var $i;
    $this.$deg = $this.$deg + 1 | 0;
    $this.$c.data[$this.$deg] = g_GF2_192__init_3(1);
    $i = $this.$deg - 1 | 0;
    while ($i > 0) {
        g_GF2_192_mul0($this.$c.data[$i], $this.$c.data[$i], $r);
        g_GF2_192_add($this.$c.data[$i], $this.$c.data[$i], $this.$c.data[$i - 1 | 0]);
        $i = $i + (-1) | 0;
    }
    g_GF2_192_mul0($this.$c.data[0], $this.$c.data[0], $r);
}
function g_GF2_192_Poly__init_2($this, $maxDeg, $constantTerm) {
    jl_Object__init_0($this);
    $this.$c = $rt_createArray(g_GF2_192, $maxDeg + 1 | 0);
    $this.$c.data[0] = g_GF2_192__init_3($constantTerm);
    $this.$deg = 0;
}
var sb_Main = $rt_classWithoutFields();
function sb_Main_main($args) {
    var $c, $d, $res;
    $c = sb_Crypto__init_();
    $d = $c.$createBlake2bDigest(32);
    $d.$update($rt_createByteArrayFromData([1, 2, 3]), 0, 3);
    $res = $rt_createByteArray(32);
    $d.$doFinal($res, 0);
    main.api = $c;
}
var obc_ExtendedDigest = $rt_classWithoutFields(0);
function obcd_Blake2bDigest() {
    var a = this; jl_Object.call(a);
    a.$digestLength = 0;
    a.$keyLength = 0;
    a.$salt = null;
    a.$personalization = null;
    a.$key = null;
    a.$buffer0 = null;
    a.$bufferPos = 0;
    a.$internalState = null;
    a.$chainValue = null;
    a.$t0 = Long_ZERO;
    a.$t1 = Long_ZERO;
    a.$f0 = Long_ZERO;
}
var obcd_Blake2bDigest_blake2b_IV = null;
var obcd_Blake2bDigest_blake2b_sigma = null;
var obcd_Blake2bDigest_ROUNDS = 0;
function obcd_Blake2bDigest_$callClinit() {
    obcd_Blake2bDigest_$callClinit = $rt_eraseClinit(obcd_Blake2bDigest);
    obcd_Blake2bDigest__clinit_();
}
function obcd_Blake2bDigest__init_(var_0) {
    var var_1 = new obcd_Blake2bDigest();
    obcd_Blake2bDigest__init_0(var_1, var_0);
    return var_1;
}
function obcd_Blake2bDigest__init_0(var$0, var$1) {
    obcd_Blake2bDigest_$callClinit();
    jl_Object__init_0(var$0);
    var$0.$digestLength = 64;
    var$0.$keyLength = 0;
    var$0.$salt = null;
    var$0.$personalization = null;
    var$0.$key = null;
    var$0.$buffer0 = null;
    var$0.$bufferPos = 0;
    var$0.$internalState = $rt_createLongArray(16);
    var$0.$chainValue = null;
    var$0.$t0 = Long_ZERO;
    var$0.$t1 = Long_ZERO;
    var$0.$f0 = Long_ZERO;
    if (var$1 >= 8 && var$1 <= 512 && !(var$1 % 8 | 0)) {
        var$0.$buffer0 = $rt_createByteArray(128);
        var$0.$keyLength = 0;
        var$0.$digestLength = var$1 / 8 | 0;
        obcd_Blake2bDigest_init(var$0);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_0($rt_s(4)));
}
function obcd_Blake2bDigest_init(var$0) {
    var var$1, var$2;
    if (var$0.$chainValue === null) {
        var$0.$chainValue = $rt_createLongArray(8);
        var$1 = var$0.$chainValue.data;
        obcd_Blake2bDigest_$callClinit();
        var$1[0] = Long_xor(obcd_Blake2bDigest_blake2b_IV.data[0], Long_fromInt(var$0.$digestLength | var$0.$keyLength << 8 | 16842752));
        var$0.$chainValue.data[1] = obcd_Blake2bDigest_blake2b_IV.data[1];
        var$0.$chainValue.data[2] = obcd_Blake2bDigest_blake2b_IV.data[2];
        var$0.$chainValue.data[3] = obcd_Blake2bDigest_blake2b_IV.data[3];
        var$0.$chainValue.data[4] = obcd_Blake2bDigest_blake2b_IV.data[4];
        var$0.$chainValue.data[5] = obcd_Blake2bDigest_blake2b_IV.data[5];
        if (var$0.$salt !== null) {
            var$2 = var$0.$chainValue.data;
            var$2[4] = Long_xor(var$2[4], obu_Pack_littleEndianToLong(var$0.$salt, 0));
            var$2 = var$0.$chainValue.data;
            var$2[5] = Long_xor(var$2[5], obu_Pack_littleEndianToLong(var$0.$salt, 8));
        }
        var$0.$chainValue.data[6] = obcd_Blake2bDigest_blake2b_IV.data[6];
        var$0.$chainValue.data[7] = obcd_Blake2bDigest_blake2b_IV.data[7];
        if (var$0.$personalization !== null) {
            var$2 = var$0.$chainValue.data;
            var$2[6] = Long_xor(var$2[6], obu_Pack_littleEndianToLong(var$0.$personalization, 0));
            var$2 = var$0.$chainValue.data;
            var$2[7] = Long_xor(var$2[7], obu_Pack_littleEndianToLong(var$0.$personalization, 8));
        }
    }
}
function obcd_Blake2bDigest_initializeInternalState(var$0) {
    jl_System_arraycopy(var$0.$chainValue, 0, var$0.$internalState, 0, var$0.$chainValue.data.length);
    obcd_Blake2bDigest_$callClinit();
    jl_System_arraycopy(obcd_Blake2bDigest_blake2b_IV, 0, var$0.$internalState, var$0.$chainValue.data.length, 4);
    var$0.$internalState.data[12] = Long_xor(var$0.$t0, obcd_Blake2bDigest_blake2b_IV.data[4]);
    var$0.$internalState.data[13] = Long_xor(var$0.$t1, obcd_Blake2bDigest_blake2b_IV.data[5]);
    var$0.$internalState.data[14] = Long_xor(var$0.$f0, obcd_Blake2bDigest_blake2b_IV.data[6]);
    var$0.$internalState.data[15] = obcd_Blake2bDigest_blake2b_IV.data[7];
}
function obcd_Blake2bDigest_update(var$0, var$1, var$2, var$3) {
    var var$4, var$5, var$6;
    if (var$1 !== null && var$3) {
        var$4 = 0;
        if (var$0.$bufferPos) {
            var$4 = 128 - var$0.$bufferPos | 0;
            if (var$4 >= var$3) {
                jl_System_arraycopy(var$1, var$2, var$0.$buffer0, var$0.$bufferPos, var$3);
                var$0.$bufferPos = var$0.$bufferPos + var$3 | 0;
                return;
            }
            jl_System_arraycopy(var$1, var$2, var$0.$buffer0, var$0.$bufferPos, var$4);
            var$0.$t0 = Long_add(var$0.$t0, Long_fromInt(128));
            if (Long_eq(var$0.$t0, Long_ZERO))
                var$0.$t1 = Long_add(var$0.$t1, Long_fromInt(1));
            obcd_Blake2bDigest_compress(var$0, var$0.$buffer0, 0);
            var$0.$bufferPos = 0;
            obu_Arrays_fill(var$0.$buffer0, 0);
        }
        var$3 = var$2 + var$3 | 0;
        var$5 = var$3 - 128 | 0;
        var$4 = var$2 + var$4 | 0;
        while (var$4 < var$5) {
            var$0.$t0 = Long_add(var$0.$t0, Long_fromInt(128));
            if (Long_eq(var$0.$t0, Long_ZERO))
                var$0.$t1 = Long_add(var$0.$t1, Long_fromInt(1));
            obcd_Blake2bDigest_compress(var$0, var$1, var$4);
            var$4 = var$4 + 128 | 0;
        }
        var$6 = var$0.$buffer0;
        var$3 = var$3 - var$4 | 0;
        jl_System_arraycopy(var$1, var$4, var$6, 0, var$3);
        var$0.$bufferPos = var$0.$bufferPos + var$3 | 0;
        return;
    }
}
function obcd_Blake2bDigest_doFinal(var$0, var$1, var$2) {
    var var$3, var$4, var$5;
    var$0.$f0 = Long_fromInt(-1);
    var$0.$t0 = Long_add(var$0.$t0, Long_fromInt(var$0.$bufferPos));
    if (var$0.$bufferPos > 0 && Long_eq(var$0.$t0, Long_ZERO))
        var$0.$t1 = Long_add(var$0.$t1, Long_fromInt(1));
    obcd_Blake2bDigest_compress(var$0, var$0.$buffer0, 0);
    obu_Arrays_fill(var$0.$buffer0, 0);
    obu_Arrays_fill0(var$0.$internalState, Long_ZERO);
    var$3 = 0;
    while (var$3 < var$0.$chainValue.data.length) {
        var$4 = var$3 * 8 | 0;
        if (var$4 >= var$0.$digestLength)
            break;
        var$5 = obu_Pack_longToLittleEndian(var$0.$chainValue.data[var$3]);
        if (var$4 < (var$0.$digestLength - 8 | 0))
            jl_System_arraycopy(var$5, 0, var$1, var$2 + var$4 | 0, 8);
        else
            jl_System_arraycopy(var$5, 0, var$1, var$2 + var$4 | 0, var$0.$digestLength - var$4 | 0);
        var$3 = var$3 + 1 | 0;
    }
    obu_Arrays_fill0(var$0.$chainValue, Long_ZERO);
    var$0.$reset();
    return var$0.$digestLength;
}
function obcd_Blake2bDigest_reset(var$0) {
    var$0.$bufferPos = 0;
    var$0.$f0 = Long_ZERO;
    var$0.$t0 = Long_ZERO;
    var$0.$t1 = Long_ZERO;
    var$0.$chainValue = null;
    obu_Arrays_fill(var$0.$buffer0, 0);
    if (var$0.$key !== null) {
        jl_System_arraycopy(var$0.$key, 0, var$0.$buffer0, 0, var$0.$key.data.length);
        var$0.$bufferPos = 128;
    }
    obcd_Blake2bDigest_init(var$0);
}
function obcd_Blake2bDigest_compress(var$0, var$1, var$2) {
    var var$3, var$4, var$5, var$6;
    obcd_Blake2bDigest_initializeInternalState(var$0);
    var$3 = $rt_createLongArray(16);
    var$4 = 0;
    while (var$4 < 16) {
        var$3.data[var$4] = obu_Pack_littleEndianToLong(var$1, var$2 + (var$4 * 8 | 0) | 0);
        var$4 = var$4 + 1 | 0;
    }
    var$4 = 0;
    while (var$4 < obcd_Blake2bDigest_ROUNDS) {
        var$5 = var$3.data;
        obcd_Blake2bDigest_G(var$0, var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[0]], var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[1]], 0, 4, 8, 12);
        obcd_Blake2bDigest_G(var$0, var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[2]], var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[3]], 1, 5, 9, 13);
        obcd_Blake2bDigest_G(var$0, var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[4]], var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[5]], 2, 6, 10, 14);
        obcd_Blake2bDigest_G(var$0, var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[6]], var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[7]], 3, 7, 11, 15);
        obcd_Blake2bDigest_G(var$0, var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[8]], var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[9]], 0, 5, 10, 15);
        obcd_Blake2bDigest_G(var$0, var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[10]], var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[11]], 1, 6, 11, 12);
        obcd_Blake2bDigest_G(var$0, var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[12]], var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[13]], 2, 7, 8, 13);
        obcd_Blake2bDigest_G(var$0, var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[14]], var$5[obcd_Blake2bDigest_blake2b_sigma.data[var$4].data[15]], 3, 4, 9, 14);
        var$4 = var$4 + 1 | 0;
    }
    var$6 = 0;
    while (var$6 < var$0.$chainValue.data.length) {
        var$0.$chainValue.data[var$6] = Long_xor(Long_xor(var$0.$chainValue.data[var$6], var$0.$internalState.data[var$6]), var$0.$internalState.data[var$6 + 8 | 0]);
        var$6 = var$6 + 1 | 0;
    }
}
function obcd_Blake2bDigest_G(var$0, var$1, var$2, var$3, var$4, var$5, var$6) {
    var$0.$internalState.data[var$3] = Long_add(Long_add(var$0.$internalState.data[var$3], var$0.$internalState.data[var$4]), var$1);
    var$0.$internalState.data[var$6] = obu_Longs_rotateRight(Long_xor(var$0.$internalState.data[var$6], var$0.$internalState.data[var$3]), 32);
    var$0.$internalState.data[var$5] = Long_add(var$0.$internalState.data[var$5], var$0.$internalState.data[var$6]);
    var$0.$internalState.data[var$4] = obu_Longs_rotateRight(Long_xor(var$0.$internalState.data[var$4], var$0.$internalState.data[var$5]), 24);
    var$0.$internalState.data[var$3] = Long_add(Long_add(var$0.$internalState.data[var$3], var$0.$internalState.data[var$4]), var$2);
    var$0.$internalState.data[var$6] = obu_Longs_rotateRight(Long_xor(var$0.$internalState.data[var$6], var$0.$internalState.data[var$3]), 16);
    var$0.$internalState.data[var$5] = Long_add(var$0.$internalState.data[var$5], var$0.$internalState.data[var$6]);
    var$0.$internalState.data[var$4] = obu_Longs_rotateRight(Long_xor(var$0.$internalState.data[var$4], var$0.$internalState.data[var$5]), 63);
}
function obcd_Blake2bDigest__clinit_() {
    obcd_Blake2bDigest_blake2b_IV = $rt_createLongArrayFromData([Long_create(4089235720, 1779033703), Long_create(2227873595, 3144134277), Long_create(4271175723, 1013904242), Long_create(1595750129, 2773480762), Long_create(2917565137, 1359893119), Long_create(725511199, 2600822924), Long_create(4215389547, 528734635), Long_create(327033209, 1541459225)]);
    obcd_Blake2bDigest_blake2b_sigma = $rt_createArrayFromData($rt_arraycls($rt_bytecls()), [$rt_createByteArrayFromData([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]), $rt_createByteArrayFromData([14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3]), $rt_createByteArrayFromData([11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4]), $rt_createByteArrayFromData([7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8]), $rt_createByteArrayFromData([9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13]),
    $rt_createByteArrayFromData([2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9]), $rt_createByteArrayFromData([12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11]), $rt_createByteArrayFromData([13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10]), $rt_createByteArrayFromData([6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5]), $rt_createByteArrayFromData([10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0]), $rt_createByteArrayFromData([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
    $rt_createByteArrayFromData([14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3])]);
    obcd_Blake2bDigest_ROUNDS = 12;
}
var otp_Platform = $rt_classWithoutFields();
function otp_Platform_isInstance($obj, $cls) {
    return $obj !== null && !(typeof $obj.constructor.$meta === 'undefined' ? 1 : 0) && otp_Platform_isAssignable($obj.constructor, $cls) ? 1 : 0;
}
function otp_Platform_isAssignable($from, $to) {
    var $supertypes, $i;
    if ($from === $to)
        return 1;
    $supertypes = $from.$meta.supertypes;
    $i = 0;
    while ($i < $supertypes.length) {
        if (otp_Platform_isAssignable($supertypes[$i], $to))
            return 1;
        $i = $i + 1 | 0;
    }
    return 0;
}
function otp_Platform_isPrimitive($cls) {
    return $cls.$meta.primitive ? 1 : 0;
}
function otp_Platform_getArrayItem($cls) {
    return $cls.$meta.item;
}
function otp_Platform_getName($cls) {
    return $rt_str($cls.$meta.name);
}
function jl_String() {
    var a = this; jl_Object.call(a);
    a.$characters = null;
    a.$hashCode = 0;
}
var jl_String_CASE_INSENSITIVE_ORDER = null;
function jl_String_$callClinit() {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
}
function jl_String__init_(var_0) {
    var var_1 = new jl_String();
    jl_String__init_1(var_1, var_0);
    return var_1;
}
function jl_String__init_0(var_0, var_1, var_2) {
    var var_3 = new jl_String();
    jl_String__init_2(var_3, var_0, var_1, var_2);
    return var_3;
}
function jl_String__init_1($this, $characters) {
    var var$2, var$3, $i;
    jl_String_$callClinit();
    var$2 = $characters.data;
    jl_Object__init_0($this);
    var$3 = var$2.length;
    $this.$characters = $rt_createCharArray(var$3);
    $i = 0;
    while ($i < var$3) {
        $this.$characters.data[$i] = var$2[$i];
        $i = $i + 1 | 0;
    }
}
function jl_String__init_2($this, $value, $offset, $count) {
    var $i, var$5;
    jl_String_$callClinit();
    jl_Object__init_0($this);
    $this.$characters = $rt_createCharArray($count);
    $i = 0;
    while ($i < $count) {
        var$5 = $value.data;
        $this.$characters.data[$i] = var$5[$i + $offset | 0];
        $i = $i + 1 | 0;
    }
}
function jl_String_charAt($this, $index) {
    if ($index >= 0 && $index < $this.$characters.data.length)
        return $this.$characters.data[$index];
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_String_length($this) {
    return $this.$characters.data.length;
}
function jl_String_isEmpty($this) {
    return $this.$characters.data.length ? 0 : 1;
}
function jl_String_equals($this, $other) {
    var $str, $i;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    $str = $other;
    if ($str.$length0() != $this.$length0())
        return 0;
    $i = 0;
    while ($i < $str.$length0()) {
        if ($this.$charAt($i) != $str.$charAt($i))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
}
function jl_String_hashCode($this) {
    var var$1, var$2, var$3, $c;
    a: {
        if (!$this.$hashCode) {
            var$1 = $this.$characters.data;
            var$2 = var$1.length;
            var$3 = 0;
            while (true) {
                if (var$3 >= var$2)
                    break a;
                $c = var$1[var$3];
                $this.$hashCode = (31 * $this.$hashCode | 0) + $c | 0;
                var$3 = var$3 + 1 | 0;
            }
        }
    }
    return $this.$hashCode;
}
function jl_String__clinit_() {
    jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_84_0__init_();
}
var obu_Pack = $rt_classWithoutFields();
function obu_Pack_littleEndianToInt(var$1, var$2) {
    var var$3, var$4;
    var$1 = var$1.data;
    var$3 = var$1[var$2] & 255;
    var$2 = var$2 + 1 | 0;
    var$4 = var$3 | (var$1[var$2] & 255) << 8;
    var$2 = var$2 + 1 | 0;
    var$4 = var$4 | (var$1[var$2] & 255) << 16;
    var$2 = var$4 | var$1[var$2 + 1 | 0] << 24;
    return var$2;
}
function obu_Pack_intToLittleEndian(var$1, var$2, var$3) {
    var var$4;
    var$2 = var$2.data;
    var$2[var$3] = var$1 << 24 >> 24;
    var$4 = var$3 + 1 | 0;
    var$2[var$4] = var$1 >>> 8 << 24 >> 24;
    var$3 = var$4 + 1 | 0;
    var$2[var$3] = var$1 >>> 16 << 24 >> 24;
    var$2[var$3 + 1 | 0] = var$1 >>> 24 << 24 >> 24;
}
function obu_Pack_littleEndianToLong(var$1, var$2) {
    var var$3;
    var$3 = obu_Pack_littleEndianToInt(var$1, var$2);
    var$2 = obu_Pack_littleEndianToInt(var$1, var$2 + 4 | 0);
    return Long_or(Long_shl(Long_and(Long_fromInt(var$2), Long_create(4294967295, 0)), 32), Long_and(Long_fromInt(var$3), Long_create(4294967295, 0)));
}
function obu_Pack_longToLittleEndian(var$1) {
    var var$2;
    var$2 = $rt_createByteArray(8);
    obu_Pack_longToLittleEndian0(var$1, var$2, 0);
    return var$2;
}
function obu_Pack_longToLittleEndian0(var$1, var$2, var$3) {
    obu_Pack_intToLittleEndian(Long_lo(Long_and(var$1, Long_create(4294967295, 0))), var$2, var$3);
    obu_Pack_intToLittleEndian(Long_hi(var$1), var$2, var$3 + 4 | 0);
}
var jl_NoClassDefFoundError = $rt_classWithoutFields(jl_LinkageError);
function sb_Blake2bDigestImpl() {
    sb_JSExtendedDigest.call(this);
    this.$_digest = null;
}
function sb_Blake2bDigestImpl__init_(var_0) {
    var var_1 = new sb_Blake2bDigestImpl();
    sb_Blake2bDigestImpl__init_0(var_1, var_0);
    return var_1;
}
function sb_Blake2bDigestImpl__init_0($this, $digest) {
    sb_JSExtendedDigest__init_$static($this);
    $this.$_digest = $digest;
}
function sb_Blake2bDigestImpl_update($this, $in, $inOff, $len) {
    $this.$_digest.$update($in, $inOff, $len);
}
function sb_Blake2bDigestImpl_doFinal($this, $out, $outOff) {
    return $this.$_digest.$doFinal($out, $outOff);
}
var jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException);
function jl_NegativeArraySizeException__init_() {
    var var_0 = new jl_NegativeArraySizeException();
    jl_NegativeArraySizeException__init_0(var_0);
    return var_0;
}
function jl_NegativeArraySizeException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
var jl_NoSuchMethodError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
function jl_NoSuchMethodError__init_(var_0) {
    var var_1 = new jl_NoSuchMethodError();
    jl_NoSuchMethodError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchMethodError__init_0($this, $message) {
    jl_IncompatibleClassChangeError__init_0($this, $message);
}
var jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException);
function jl_IllegalArgumentException__init_() {
    var var_0 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_1(var_0);
    return var_0;
}
function jl_IllegalArgumentException__init_0(var_0) {
    var var_1 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_2(var_1, var_0);
    return var_1;
}
function jl_IllegalArgumentException__init_1($this) {
    jl_RuntimeException__init_1($this);
}
function jl_IllegalArgumentException__init_2($this, $message) {
    jl_RuntimeException__init_2($this, $message);
}
var ju_Comparator = $rt_classWithoutFields(0);
var jl_String$_clinit_$lambda$_84_0 = $rt_classWithoutFields();
function jl_String$_clinit_$lambda$_84_0__init_() {
    var var_0 = new jl_String$_clinit_$lambda$_84_0();
    jl_String$_clinit_$lambda$_84_0__init_0(var_0);
    return var_0;
}
function jl_String$_clinit_$lambda$_84_0__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function jl_Class() {
    var a = this; jl_Object.call(a);
    a.$name = null;
    a.$platformClass = null;
}
function jl_Class__init_(var_0) {
    var var_1 = new jl_Class();
    jl_Class__init_0(var_1, var_0);
    return var_1;
}
function jl_Class__init_0($this, $platformClass) {
    var var$2;
    jl_Object__init_0($this);
    $this.$platformClass = $platformClass;
    var$2 = $this;
    $platformClass.classObject = var$2;
}
function jl_Class_getClass($cls) {
    var $result;
    if ($cls === null)
        return null;
    $result = $cls.classObject;
    if ($result === null)
        $result = jl_Class__init_($cls);
    return $result;
}
function jl_Class_getPlatformClass($this) {
    return $this.$platformClass;
}
function jl_Class_isInstance($this, $obj) {
    return otp_Platform_isInstance($obj, $this.$platformClass);
}
function jl_Class_getName($this) {
    if ($this.$name === null)
        $this.$name = otp_Platform_getName($this.$platformClass);
    return $this.$name;
}
function jl_Class_isPrimitive($this) {
    return otp_Platform_isPrimitive($this.$platformClass);
}
function jl_Class_getComponentType($this) {
    return jl_Class_getClass(otp_Platform_getArrayItem($this.$platformClass));
}
function jl_Class_desiredAssertionStatus($this) {
    return 1;
}
$rt_packages([-1, "java", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 1, 0, [], 0, 3, 0, 0, ["$getClass0", $rt_wrapFunction0(jl_Object_getClass), "$toString", $rt_wrapFunction0(jl_Object_toString), "$identity", $rt_wrapFunction0(jl_Object_identity)],
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, ["$fillInStackTrace", $rt_wrapFunction0(jl_Throwable_fillInStackTrace)],
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Exception__init_0), "$_init_0", $rt_wrapFunction1(jl_Exception__init_2)],
jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_RuntimeException__init_1), "$_init_0", $rt_wrapFunction1(jl_RuntimeException__init_2)],
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IndexOutOfBoundsException__init_0)],
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, 0,
jlr_Array, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_System, 0, jl_Object, [], 4, 3, 0, 0, 0,
otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0, 0,
sb_JSExtendedDigest, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, 0,
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Integer_$callClinit, 0,
jl_NullPointerException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_NullPointerException__init_1), "$_init_", $rt_wrapFunction0(jl_NullPointerException__init_2)],
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Error__init_0), "$_init_0", $rt_wrapFunction1(jl_Error__init_2)],
jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_LinkageError__init_0)],
jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_IncompatibleClassChangeError__init_0)],
jl_NoSuchFieldError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_NoSuchFieldError__init_0)],
g_GF2_192_Base, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
g_GF2_192, 0, g_GF2_192_Base, [], 0, 3, 0, g_GF2_192_$callClinit, ["$_init_", $rt_wrapFunction0(g_GF2_192__init_0), "$_init_2", $rt_wrapFunction1(g_GF2_192__init_2), "$_init_4", $rt_wrapFunction1(g_GF2_192__init_4), "$_init_5", $rt_wrapFunction1(g_GF2_192__init_6), "$_init_1", $rt_wrapFunction2(g_GF2_192__init_8)],
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, jl_Character_$callClinit, 0,
sb_Exported, 0, jl_Object, [otj_JSObject], 3, 0, 0, 0, 0,
sb_Crypto, 0, jl_Object, [sb_Exported], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(sb_Crypto__init_0), "$createBlake2bDigest", $rt_wrapFunction1(sb_Crypto_createBlake2bDigest), "$create_GF_192", $rt_wrapFunction1(sb_Crypto_create_GF_192), "$fromByteArray", $rt_wrapFunction2(sb_Crypto_fromByteArray), "$interpolate0", $rt_wrapFunction3(sb_Crypto_interpolate), "$fromByteArray$exported$0", $rt_wrapFunction2(sb_Crypto_fromByteArray$exported$0), "$interpolate$exported$1", $rt_wrapFunction3(sb_Crypto_interpolate$exported$1),
"$create_GF_192$exported$2", $rt_wrapFunction1(sb_Crypto_create_GF_192$exported$2), "$createBlake2bDigest$exported$3", $rt_wrapFunction1(sb_Crypto_createBlake2bDigest$exported$3)],
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Long, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Long_$callClinit, 0,
jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
otjc_JSNumber, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
otji_JS, 0, jl_Object, [], 4, 0, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
obu_Longs, 0, jl_Object, [], 0, 3, 0, 0, 0,
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringIndexOutOfBoundsException__init_0)],
jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AbstractStringBuilder__init_0), "$_init_4", $rt_wrapFunction1(jl_AbstractStringBuilder__init_2), "$append0", $rt_wrapFunction1(jl_AbstractStringBuilder_append), "$insert", $rt_wrapFunction2(jl_AbstractStringBuilder_insert), "$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString)],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringBuilder__init_0), "$append", $rt_wrapFunction1(jl_StringBuilder_append), "$insert0", $rt_wrapFunction2(jl_StringBuilder_insert), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert0)],
jl_ArrayStoreException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ArrayStoreException__init_0)],
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
obu_Arrays, 0, jl_Object, [], 4, 3, 0, 0, 0,
obc_Digest, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_AssertionError, 0, jl_Error, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AssertionError__init_0)],
g_GF2_192_Poly, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_8", $rt_wrapFunction2(g_GF2_192_Poly__init_0), "$evaluate", $rt_wrapFunction1(g_GF2_192_Poly_evaluate)],
sb_Main, 0, jl_Object, [], 0, 3, 0, 0, 0,
obc_ExtendedDigest, 0, jl_Object, [obc_Digest], 3, 3, 0, 0, 0,
obcd_Blake2bDigest, 0, jl_Object, [obc_ExtendedDigest], 0, 3, 0, obcd_Blake2bDigest_$callClinit, ["$_init_4", $rt_wrapFunction1(obcd_Blake2bDigest__init_0), "$update", $rt_wrapFunction3(obcd_Blake2bDigest_update), "$doFinal", $rt_wrapFunction2(obcd_Blake2bDigest_doFinal), "$reset", $rt_wrapFunction0(obcd_Blake2bDigest_reset)],
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, jl_String_$callClinit, ["$_init_6", $rt_wrapFunction1(jl_String__init_1), "$_init_7", $rt_wrapFunction3(jl_String__init_2), "$charAt", $rt_wrapFunction1(jl_String_charAt), "$length0", $rt_wrapFunction0(jl_String_length), "$isEmpty", $rt_wrapFunction0(jl_String_isEmpty), "$equals", $rt_wrapFunction1(jl_String_equals), "$hashCode0", $rt_wrapFunction0(jl_String_hashCode)],
obu_Pack, 0, jl_Object, [], 1, 3, 0, 0, 0,
jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0, 0,
sb_Blake2bDigestImpl, 0, sb_JSExtendedDigest, [], 0, 3, 0, 0, ["$_init_3", $rt_wrapFunction1(sb_Blake2bDigestImpl__init_0), "$update", $rt_wrapFunction3(sb_Blake2bDigestImpl_update), "$doFinal", $rt_wrapFunction2(sb_Blake2bDigestImpl_doFinal)]]);
$rt_metadata([jl_NegativeArraySizeException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_NegativeArraySizeException__init_0)],
jl_NoSuchMethodError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_NoSuchMethodError__init_0)],
jl_IllegalArgumentException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IllegalArgumentException__init_1), "$_init_0", $rt_wrapFunction1(jl_IllegalArgumentException__init_2)],
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_String$_clinit_$lambda$_84_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_String$_clinit_$lambda$_84_0__init_0)],
jl_Class, 0, jl_Object, [jlr_AnnotatedElement, jlr_Type], 0, 3, 0, 0, ["$getPlatformClass", $rt_wrapFunction0(jl_Class_getPlatformClass), "$isInstance", $rt_wrapFunction1(jl_Class_isInstance), "$getName", $rt_wrapFunction0(jl_Class_getName), "$isPrimitive", $rt_wrapFunction0(jl_Class_isPrimitive), "$getComponentType", $rt_wrapFunction0(jl_Class_getComponentType), "$desiredAssertionStatus", $rt_wrapFunction0(jl_Class_desiredAssertionStatus)]]);
function $rt_array(cls, data) {
    this.$monitor = null;
    this.$id$ = 0;
    this.type = cls;
    this.data = data;
    this.constructor = $rt_arraycls(cls);
}
$rt_array.prototype = Object.create(($rt_objcls()).prototype);
$rt_array.prototype.toString = function() {
    var str = "[";
    for (var i = 0;i < this.data.length;++i) {
        if (i > 0) {
            str += ", ";
        }
        str += this.data[i].toString();
    }
    str += "]";
    return str;
};
$rt_setCloneMethod($rt_array.prototype, function() {
    var dataCopy;
    if ('slice' in this.data) {
        dataCopy = this.data.slice();
    } else {
        dataCopy = new this.data.constructor(this.data.length);
        for (var i = 0;i < dataCopy.length;++i) {
            dataCopy[i] = this.data[i];
        }
    }
    return new $rt_array(this.type, dataCopy);
});
$rt_stringPool(["@", "Either src or dest is null", "0", "null", "BLAKE2b digest bit length must be a multiple of 8 and not greater than 512"]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
var Long_eq;
var Long_ne;
var Long_gt;
var Long_ge;
var Long_lt;
var Long_le;
var Long_compare;
var Long_add;
var Long_sub;
var Long_inc;
var Long_dec;
var Long_mul;
var Long_div;
var Long_rem;
var Long_udiv;
var Long_urem;
var Long_neg;
var Long_and;
var Long_or;
var Long_xor;
var Long_shl;
var Long_shr;
var Long_shru;
var Long_not;
if (typeof BigInt !== 'function') {
    Long_eq = function(a, b) {
        return a.hi === b.hi && a.lo === b.lo;
    };
    Long_ne = function(a, b) {
        return a.hi !== b.hi || a.lo !== b.lo;
    };
    Long_gt = function(a, b) {
        if (a.hi < b.hi) {
            return false;
        }
        if (a.hi > b.hi) {
            return true;
        }
        var x = a.lo >>> 1;
        var y = b.lo >>> 1;
        if (x !== y) {
            return x > y;
        }
        return (a.lo & 1) > (b.lo & 1);
    };
    Long_ge = function(a, b) {
        if (a.hi < b.hi) {
            return false;
        }
        if (a.hi > b.hi) {
            return true;
        }
        var x = a.lo >>> 1;
        var y = b.lo >>> 1;
        if (x !== y) {
            return x >= y;
        }
        return (a.lo & 1) >= (b.lo & 1);
    };
    Long_lt = function(a, b) {
        if (a.hi > b.hi) {
            return false;
        }
        if (a.hi < b.hi) {
            return true;
        }
        var x = a.lo >>> 1;
        var y = b.lo >>> 1;
        if (x !== y) {
            return x < y;
        }
        return (a.lo & 1) < (b.lo & 1);
    };
    Long_le = function(a, b) {
        if (a.hi > b.hi) {
            return false;
        }
        if (a.hi < b.hi) {
            return true;
        }
        var x = a.lo >>> 1;
        var y = b.lo >>> 1;
        if (x !== y) {
            return x <= y;
        }
        return (a.lo & 1) <= (b.lo & 1);
    };
    Long_add = function(a, b) {
        if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
            return Long_fromNumber(a.lo + b.lo);
        } else if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) + Long_toNumber(b));
        }
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        var lolo = a_lolo + b_lolo | 0;
        var lohi = a_lohi + b_lohi + (lolo >> 16) | 0;
        var hilo = a_hilo + b_hilo + (lohi >> 16) | 0;
        var hihi = a_hihi + b_hihi + (hilo >> 16) | 0;
        return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
    };
    Long_inc = function(a) {
        var lo = a.lo + 1 | 0;
        var hi = a.hi;
        if (lo === 0) {
            hi = hi + 1 | 0;
        }
        return new Long(lo, hi);
    };
    Long_dec = function(a) {
        var lo = a.lo - 1 | 0;
        var hi = a.hi;
        if (lo ===  -1) {
            hi = hi - 1 | 0;
        }
        return new Long(lo, hi);
    };
    Long_neg = function(a) {
        return Long_inc(new Long(a.lo ^ 0xFFFFFFFF, a.hi ^ 0xFFFFFFFF));
    };
    Long_sub = function(a, b) {
        if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
            return Long_fromNumber(a.lo - b.lo);
        }
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        var lolo = a_lolo - b_lolo | 0;
        var lohi = a_lohi - b_lohi + (lolo >> 16) | 0;
        var hilo = a_hilo - b_hilo + (lohi >> 16) | 0;
        var hihi = a_hihi - b_hihi + (hilo >> 16) | 0;
        return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
    };
    Long_compare = function(a, b) {
        var r = a.hi - b.hi;
        if (r !== 0) {
            return r;
        }
        r = (a.lo >>> 1) - (b.lo >>> 1);
        if (r !== 0) {
            return r;
        }
        return (a.lo & 1) - (b.lo & 1);
    };
    Long_mul = function(a, b) {
        var positive = Long_isNegative(a) === Long_isNegative(b);
        if (Long_isNegative(a)) {
            a = Long_neg(a);
        }
        if (Long_isNegative(b)) {
            b = Long_neg(b);
        }
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        var lolo = 0;
        var lohi = 0;
        var hilo = 0;
        var hihi = 0;
        lolo = a_lolo * b_lolo | 0;
        lohi = lolo >>> 16;
        lohi = (lohi & 0xFFFF) + a_lohi * b_lolo | 0;
        hilo = hilo + (lohi >>> 16) | 0;
        lohi = (lohi & 0xFFFF) + a_lolo * b_lohi | 0;
        hilo = hilo + (lohi >>> 16) | 0;
        hihi = hilo >>> 16;
        hilo = (hilo & 0xFFFF) + a_hilo * b_lolo | 0;
        hihi = hihi + (hilo >>> 16) | 0;
        hilo = (hilo & 0xFFFF) + a_lohi * b_lohi | 0;
        hihi = hihi + (hilo >>> 16) | 0;
        hilo = (hilo & 0xFFFF) + a_lolo * b_hilo | 0;
        hihi = hihi + (hilo >>> 16) | 0;
        hihi = hihi + a_hihi * b_lolo + a_hilo * b_lohi + a_lohi * b_hilo + a_lolo * b_hihi | 0;
        var result = new Long(lolo & 0xFFFF | lohi << 16, hilo & 0xFFFF | hihi << 16);
        return positive ? result : Long_neg(result);
    };
    Long_div = function(a, b) {
        if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
        }
        return (Long_divRem(a, b))[0];
    };
    Long_udiv = function(a, b) {
        if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
        }
        return (Long_udivRem(a, b))[0];
    };
    Long_rem = function(a, b) {
        if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) % Long_toNumber(b));
        }
        return (Long_divRem(a, b))[1];
    };
    Long_urem = function(a, b) {
        if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
        }
        return (Long_udivRem(a, b))[1];
    };
    function Long_divRem(a, b) {
        if (b.lo === 0 && b.hi === 0) {
            throw new Error("Division by zero");
        }
        var positive = Long_isNegative(a) === Long_isNegative(b);
        if (Long_isNegative(a)) {
            a = Long_neg(a);
        }
        if (Long_isNegative(b)) {
            b = Long_neg(b);
        }
        a = new LongInt(a.lo, a.hi, 0);
        b = new LongInt(b.lo, b.hi, 0);
        var q = LongInt_div(a, b);
        a = new Long(a.lo, a.hi);
        q = new Long(q.lo, q.hi);
        return positive ? [q, a] : [Long_neg(q), Long_neg(a)];
    }
    function Long_udivRem(a, b) {
        if (b.lo === 0 && b.hi === 0) {
            throw new Error("Division by zero");
        }
        a = new LongInt(a.lo, a.hi, 0);
        b = new LongInt(b.lo, b.hi, 0);
        var q = LongInt_div(a, b);
        a = new Long(a.lo, a.hi);
        q = new Long(q.lo, q.hi);
        return [q, a];
    }
    function Long_shiftLeft16(a) {
        return new Long(a.lo << 16, a.lo >>> 16 | a.hi << 16);
    }
    function Long_shiftRight16(a) {
        return new Long(a.lo >>> 16 | a.hi << 16, a.hi >>> 16);
    }
    Long_and = function(a, b) {
        return new Long(a.lo & b.lo, a.hi & b.hi);
    };
    Long_or = function(a, b) {
        return new Long(a.lo | b.lo, a.hi | b.hi);
    };
    Long_xor = function(a, b) {
        return new Long(a.lo ^ b.lo, a.hi ^ b.hi);
    };
    Long_shl = function(a, b) {
        b &= 63;
        if (b === 0) {
            return a;
        } else if (b < 32) {
            return new Long(a.lo << b, a.lo >>> 32 - b | a.hi << b);
        } else if (b === 32) {
            return new Long(0, a.lo);
        } else {
            return new Long(0, a.lo << b - 32);
        }
    };
    Long_shr = function(a, b) {
        b &= 63;
        if (b === 0) {
            return a;
        } else if (b < 32) {
            return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >> b);
        } else if (b === 32) {
            return new Long(a.hi, a.hi >> 31);
        } else {
            return new Long(a.hi >> b - 32, a.hi >> 31);
        }
    };
    Long_shru = function(a, b) {
        b &= 63;
        if (b === 0) {
            return a;
        } else if (b < 32) {
            return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >>> b);
        } else if (b === 32) {
            return new Long(a.hi, 0);
        } else {
            return new Long(a.hi >>> b - 32, 0);
        }
    };
    Long_not = function(a) {
        return new Long(~a.hi, ~a.lo);
    };
    function LongInt(lo, hi, sup) {
        this.lo = lo;
        this.hi = hi;
        this.sup = sup;
    }
    function LongInt_mul(a, b) {
        var a_lolo = (a.lo & 0xFFFF) * b | 0;
        var a_lohi = (a.lo >>> 16) * b | 0;
        var a_hilo = (a.hi & 0xFFFF) * b | 0;
        var a_hihi = (a.hi >>> 16) * b | 0;
        var sup = a.sup * b | 0;
        a_lohi = a_lohi + (a_lolo >>> 16) | 0;
        a_hilo = a_hilo + (a_lohi >>> 16) | 0;
        a_hihi = a_hihi + (a_hilo >>> 16) | 0;
        sup = sup + (a_hihi >>> 16) | 0;
        a.lo = a_lolo & 0xFFFF | a_lohi << 16;
        a.hi = a_hilo & 0xFFFF | a_hihi << 16;
        a.sup = sup & 0xFFFF;
    }
    function LongInt_sub(a, b) {
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        a_lolo = a_lolo - b_lolo | 0;
        a_lohi = a_lohi - b_lohi + (a_lolo >> 16) | 0;
        a_hilo = a_hilo - b_hilo + (a_lohi >> 16) | 0;
        a_hihi = a_hihi - b_hihi + (a_hilo >> 16) | 0;
        var sup = a.sup - b.sup + (a_hihi >> 16) | 0;
        a.lo = a_lolo & 0xFFFF | a_lohi << 16;
        a.hi = a_hilo & 0xFFFF | a_hihi << 16;
        a.sup = sup;
    }
    function LongInt_add(a, b) {
        var a_lolo = a.lo & 0xFFFF;
        var a_lohi = a.lo >>> 16;
        var a_hilo = a.hi & 0xFFFF;
        var a_hihi = a.hi >>> 16;
        var b_lolo = b.lo & 0xFFFF;
        var b_lohi = b.lo >>> 16;
        var b_hilo = b.hi & 0xFFFF;
        var b_hihi = b.hi >>> 16;
        a_lolo = a_lolo + b_lolo | 0;
        a_lohi = a_lohi + b_lohi + (a_lolo >> 16) | 0;
        a_hilo = a_hilo + b_hilo + (a_lohi >> 16) | 0;
        a_hihi = a_hihi + b_hihi + (a_hilo >> 16) | 0;
        var sup = a.sup + b.sup + (a_hihi >> 16) | 0;
        a.lo = a_lolo & 0xFFFF | a_lohi << 16;
        a.hi = a_hilo & 0xFFFF | a_hihi << 16;
        a.sup = sup;
    }
    function LongInt_inc(a) {
        a.lo = a.lo + 1 | 0;
        if (a.lo === 0) {
            a.hi = a.hi + 1 | 0;
            if (a.hi === 0) {
                a.sup = a.sup + 1 & 0xFFFF;
            }
        }
    }
    function LongInt_dec(a) {
        a.lo = a.lo - 1 | 0;
        if (a.lo ===  -1) {
            a.hi = a.hi - 1 | 0;
            if (a.hi ===  -1) {
                a.sup = a.sup - 1 & 0xFFFF;
            }
        }
    }
    function LongInt_ucompare(a, b) {
        var r = a.sup - b.sup;
        if (r !== 0) {
            return r;
        }
        r = (a.hi >>> 1) - (b.hi >>> 1);
        if (r !== 0) {
            return r;
        }
        r = (a.hi & 1) - (b.hi & 1);
        if (r !== 0) {
            return r;
        }
        r = (a.lo >>> 1) - (b.lo >>> 1);
        if (r !== 0) {
            return r;
        }
        return (a.lo & 1) - (b.lo & 1);
    }
    function LongInt_numOfLeadingZeroBits(a) {
        var n = 0;
        var d = 16;
        while (d > 0) {
            if (a >>> d !== 0) {
                a >>>= d;
                n = n + d | 0;
            }
            d = d / 2 | 0;
        }
        return 31 - n;
    }
    function LongInt_shl(a, b) {
        if (b === 0) {
            return;
        }
        if (b < 32) {
            a.sup = (a.hi >>> 32 - b | a.sup << b) & 0xFFFF;
            a.hi = a.lo >>> 32 - b | a.hi << b;
            a.lo <<= b;
        } else if (b === 32) {
            a.sup = a.hi & 0xFFFF;
            a.hi = a.lo;
            a.lo = 0;
        } else if (b < 64) {
            a.sup = (a.lo >>> 64 - b | a.hi << b - 32) & 0xFFFF;
            a.hi = a.lo << b;
            a.lo = 0;
        } else if (b === 64) {
            a.sup = a.lo & 0xFFFF;
            a.hi = 0;
            a.lo = 0;
        } else {
            a.sup = a.lo << b - 64 & 0xFFFF;
            a.hi = 0;
            a.lo = 0;
        }
    }
    function LongInt_shr(a, b) {
        if (b === 0) {
            return;
        }
        if (b === 32) {
            a.lo = a.hi;
            a.hi = a.sup;
            a.sup = 0;
        } else if (b < 32) {
            a.lo = a.lo >>> b | a.hi << 32 - b;
            a.hi = a.hi >>> b | a.sup << 32 - b;
            a.sup >>>= b;
        } else if (b === 64) {
            a.lo = a.sup;
            a.hi = 0;
            a.sup = 0;
        } else if (b < 64) {
            a.lo = a.hi >>> b - 32 | a.sup << 64 - b;
            a.hi = a.sup >>> b - 32;
            a.sup = 0;
        } else {
            a.lo = a.sup >>> b - 64;
            a.hi = 0;
            a.sup = 0;
        }
    }
    function LongInt_copy(a) {
        return new LongInt(a.lo, a.hi, a.sup);
    }
    function LongInt_div(a, b) {
        var bits = b.hi !== 0 ? LongInt_numOfLeadingZeroBits(b.hi) : LongInt_numOfLeadingZeroBits(b.lo) + 32;
        var sz = 1 + (bits / 16 | 0);
        var dividentBits = bits % 16;
        LongInt_shl(b, bits);
        LongInt_shl(a, dividentBits);
        var q = new LongInt(0, 0, 0);
        while (sz-- > 0) {
            LongInt_shl(q, 16);
            var digitA = (a.hi >>> 16) + 0x10000 * a.sup;
            var digitB = b.hi >>> 16;
            var digit = digitA / digitB | 0;
            var t = LongInt_copy(b);
            LongInt_mul(t, digit);
            if (LongInt_ucompare(t, a) >= 0) {
                while (LongInt_ucompare(t, a) > 0) {
                    LongInt_sub(t, b);
                     --digit;
                }
            } else {
                while (true) {
                    var nextT = LongInt_copy(t);
                    LongInt_add(nextT, b);
                    if (LongInt_ucompare(nextT, a) > 0) {
                        break;
                    }
                    t = nextT;
                    ++digit;
                }
            }
            LongInt_sub(a, t);
            q.lo |= digit;
            LongInt_shl(a, 16);
        }
        LongInt_shr(a, bits + 16);
        return q;
    }
} else {
    Long_eq = function(a, b) {
        return a === b;
    };
    Long_ne = function(a, b) {
        return a !== b;
    };
    Long_gt = function(a, b) {
        return a > b;
    };
    Long_ge = function(a, b) {
        return a >= b;
    };
    Long_lt = function(a, b) {
        return a < b;
    };
    Long_le = function(a, b) {
        return a <= b;
    };
    Long_add = function(a, b) {
        return BigInt.asIntN(64, a + b);
    };
    Long_inc = function(a) {
        return BigInt.asIntN(64, a + 1);
    };
    Long_dec = function(a) {
        return BigInt.asIntN(64, a - 1);
    };
    Long_neg = function(a) {
        return BigInt.asIntN(64,  -a);
    };
    Long_sub = function(a, b) {
        return BigInt.asIntN(64, a - b);
    };
    Long_compare = function(a, b) {
        return a < b ?  -1 : a > b ? 1 : 0;
    };
    Long_mul = function(a, b) {
        return BigInt.asIntN(64, a * b);
    };
    Long_div = function(a, b) {
        return BigInt.asIntN(64, a / b);
    };
    Long_udiv = function(a, b) {
        return BigInt.asIntN(64, BigInt.asUintN(64, a) / BigInt.asUintN(64, b));
    };
    Long_rem = function(a, b) {
        return BigInt.asIntN(64, a % b);
    };
    Long_urem = function(a, b) {
        return BigInt.asIntN(64, BigInt.asUintN(64, a) % BigInt.asUintN(64, b));
    };
    Long_and = function(a, b) {
        return BigInt.asIntN(64, a & b);
    };
    Long_or = function(a, b) {
        return BigInt.asIntN(64, a | b);
    };
    Long_xor = function(a, b) {
        return BigInt.asIntN(64, a ^ b);
    };
    Long_shl = function(a, b) {
        return BigInt.asIntN(64, a << BigInt(b & 63));
    };
    Long_shr = function(a, b) {
        return BigInt.asIntN(64, a >> BigInt(b & 63));
    };
    Long_shru = function(a, b) {
        return BigInt.asIntN(64, BigInt.asUintN(64, a) >> BigInt(b & 63));
    };
    Long_not = function(a) {
        return BigInt.asIntN(64, ~a);
    };
}
var Long_add = Long_add;

var Long_sub = Long_sub;

var Long_mul = Long_mul;

var Long_div = Long_div;

var Long_rem = Long_rem;

var Long_or = Long_or;

var Long_and = Long_and;

var Long_xor = Long_xor;

var Long_shl = Long_shl;

var Long_shr = Long_shr;

var Long_shru = Long_shru;

var Long_compare = Long_compare;

var Long_eq = Long_eq;

var Long_ne = Long_ne;

var Long_lt = Long_lt;

var Long_le = Long_le;

var Long_gt = Long_gt;

var Long_ge = Long_ge;

var Long_not = Long_not;

var Long_neg = Long_neg;

function $rt_startThread(runner, callback) {
    var result;
    try {
        result = runner();
    } catch (e){
        result = e;
    }
    if (typeof callback !== 'undefined') {
        callback(result);
    } else if (result instanceof Error) {
        throw result;
    }
}
function $rt_suspending() {
    return false;
}
function $rt_resuming() {
    return false;
}
function $rt_nativeThread() {
    return null;
}
function $rt_invalidPointer() {
}
main = { 
  bouncyCastle: sb_Crypto__init_(),
  compare: $rt_compare,
  isInstance: $rt_isInstance,
  isAssignable: $rt_isAssignable,
  castToInterface: $rt_castToInterface,
  castToClass: $rt_castToClass,
  createArray: $rt_createArray,
  createArrayFromData: $rt_createArrayFromData,
  wrapArray: $rt_wrapArray,
  createUnfilledArray: $rt_createUnfilledArray,
  createNumericArray: $rt_createNumericArray,
  createLongArray: $rt_createLongArray,
  createLongArrayFromData: $rt_createLongArrayFromData,
  createCharArray: $rt_createCharArray,
  createCharArrayFromData: $rt_createCharArrayFromData,
  createByteArray: $rt_createByteArray,
  createByteArrayFromData: $rt_createByteArrayFromData,
  createShortArray: $rt_createShortArray,
  createShortArrayFromData: $rt_createShortArrayFromData,
  createIntArray: $rt_createIntArray,
  createIntArrayFromData: $rt_createIntArrayFromData,
  createBooleanArray: $rt_createBooleanArray,
  createBooleanArrayFromData: $rt_createBooleanArrayFromData,
  createFloatArray: $rt_createFloatArray,
  createFloatArrayFromData: $rt_createFloatArrayFromData,
  createDoubleArray: $rt_createDoubleArray,
  createDoubleArrayFromData: $rt_createDoubleArrayFromData,
  arraycls: $rt_arraycls,
  createcls: $rt_createcls,
  createPrimitiveCls: $rt_createPrimitiveCls,
  booleancls: $rt_booleancls,
  charcls: $rt_charcls,
  bytecls: $rt_bytecls,
  shortcls: $rt_shortcls,
  intcls: $rt_intcls,
  longcls: $rt_longcls,
  floatcls: $rt_floatcls,
  doublecls: $rt_doublecls,
  voidcls: $rt_voidcls,
  throw: $rt_throw,
  exception: $rt_exception,
  fillStack: $rt_fillStack,
  createMultiArray: $rt_createMultiArray,
  createByteMultiArray: $rt_createByteMultiArray,
  createCharMultiArray: $rt_createCharMultiArray,
  createBooleanMultiArray: $rt_createBooleanMultiArray,
  createShortMultiArray: $rt_createShortMultiArray,
  createIntMultiArray: $rt_createIntMultiArray,
  createLongMultiArray: $rt_createLongMultiArray,
  createFloatMultiArray: $rt_createFloatMultiArray,
  createDoubleMultiArray: $rt_createDoubleMultiArray,
  primitiveArrayCount: $rt_primitiveArrayCount,
  createMultiArrayImpl: $rt_createMultiArrayImpl,
  assertNotNaN: $rt_assertNotNaN,
  createOutputFunction: $rt_createOutputFunction,
  putStdout: $rt_putStdout,
  putStderr: $rt_putStderr,
  packages: $rt_packages,
  metadata: $rt_metadata,
  wrapFunction0: $rt_wrapFunction0,
  wrapFunction1: $rt_wrapFunction1,
  wrapFunction2: $rt_wrapFunction2,
  wrapFunction3: $rt_wrapFunction3,
  wrapFunction4: $rt_wrapFunction4,
  threadStarter: $rt_threadStarter,
  mainStarter: $rt_mainStarter,
  stringPool: $rt_stringPool,
  s: $rt_s,
  eraseClinit: $rt_eraseClinit,
  doubleToLongBits: $rt_doubleToLongBits,
  longBitsToDouble: $rt_longBitsToDouble,
  floatToIntBits: $rt_floatToIntBits,
  intBitsToFloat: $rt_intBitsToFloat,
  javaException: $rt_javaException,
  jsException: $rt_jsException,
  wrapException: $rt_wrapException,
  imul: $rt_imul,
  udiv: $rt_udiv,
  umod: $rt_umod,
  checkBounds: $rt_checkBounds,
  checkUpperBound: $rt_checkUpperBound,
  checkLowerBound: $rt_checkLowerBound,
  classWithoutFields: $rt_classWithoutFields,
  setCloneMethod: $rt_setCloneMethod,
  cls: $rt_cls,
  str: $rt_str,
  ustr: $rt_ustr,
  objcls: $rt_objcls,
  stecls: $rt_stecls,
  nullCheck: $rt_nullCheck,
  intern: $rt_intern,
  getThread: $rt_getThread,
  setThread: $rt_setThread,
  createException: $rt_createException,
  createStackElement: $rt_createStackElement,
  setStack: $rt_setStack,
  throwAIOOBE: $rt_throwAIOOBE,
  throwCCE: $rt_throwCCE,
  Long_MAX_NORMAL,
  Long_ZERO,
  Long_create,
  Long_fromInt,
  Long_fromNumber,
  Long_toNumber,
  Long_hi,
  Long_lo,
  Long_add,
  Long_sub,
  Long_mul,
  Long_div,
  Long_rem,
  Long_or,
  Long_and,
  Long_xor,
  Long_shl,
  Long_shr,
  Long_shru,
  Long_compare,
  Long_eq,
  Long_ne,
  Long_lt,
  Long_le,
  Long_gt,
  Long_ge,
  Long_not,
  Long_neg,
};

(function() {
    var c;
    c = sb_Crypto.prototype;
    c.interpolate = c.$interpolate$exported$1;
    c.fromByteArray = c.$fromByteArray$exported$0;
    c.create_GF_192 = c.$create_GF_192$exported$2;
    c.createBlake2bDigest = c.$createBlake2bDigest$exported$3;
})();
})();

module.exports = main;
//# sourceMappingURL=classes.js.map