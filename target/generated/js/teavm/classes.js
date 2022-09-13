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
var otj_JSObject = $rt_classWithoutFields(0);
var jl_Error = $rt_classWithoutFields(jl_Throwable);
function jl_Error__init_(var_0) {
    var var_1 = new jl_Error();
    jl_Error__init_0(var_1, var_0);
    return var_1;
}
function jl_Error__init_0($this, $message) {
    jl_Throwable__init_2($this, $message);
}
var obc_Digest = $rt_classWithoutFields(0);
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
var sb_Main = $rt_classWithoutFields();
function sb_Main_main($args) {
    main.api = sb_Crypto__init_();
}
var jl_LinkageError = $rt_classWithoutFields(jl_Error);
function jl_LinkageError__init_(var_0) {
    var var_1 = new jl_LinkageError();
    jl_LinkageError__init_0(var_1, var_0);
    return var_1;
}
function jl_LinkageError__init_0($this, $message) {
    jl_Error__init_0($this, $message);
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
var obc_ExtendedDigest = $rt_classWithoutFields(0);
function obcd_Blake2bDigest() {
    var a = this; jl_Object.call(a);
    a.$digestLength = 0;
    a.$keyLength = 0;
    a.$salt = null;
    a.$personalization = null;
    a.$key = null;
    a.$buffer = null;
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
    var$0.$buffer = null;
    var$0.$bufferPos = 0;
    var$0.$internalState = $rt_createLongArray(16);
    var$0.$chainValue = null;
    var$0.$t0 = Long_ZERO;
    var$0.$t1 = Long_ZERO;
    var$0.$f0 = Long_ZERO;
    if (var$1 >= 8 && var$1 <= 512 && !(var$1 % 8 | 0)) {
        var$0.$buffer = $rt_createByteArray(128);
        var$0.$keyLength = 0;
        var$0.$digestLength = var$1 / 8 | 0;
        obcd_Blake2bDigest_init(var$0);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_($rt_s(1)));
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
function obcd_Blake2bDigest__clinit_() {
    obcd_Blake2bDigest_blake2b_IV = $rt_createLongArrayFromData([Long_create(4089235720, 1779033703), Long_create(2227873595, 3144134277), Long_create(4271175723, 1013904242), Long_create(1595750129, 2773480762), Long_create(2917565137, 1359893119), Long_create(725511199, 2600822924), Long_create(4215389547, 528734635), Long_create(327033209, 1541459225)]);
    obcd_Blake2bDigest_blake2b_sigma = $rt_createArrayFromData($rt_arraycls($rt_bytecls()), [$rt_createByteArrayFromData([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]), $rt_createByteArrayFromData([14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3]), $rt_createByteArrayFromData([11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4]), $rt_createByteArrayFromData([7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8]), $rt_createByteArrayFromData([9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13]),
    $rt_createByteArrayFromData([2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9]), $rt_createByteArrayFromData([12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11]), $rt_createByteArrayFromData([13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10]), $rt_createByteArrayFromData([6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5]), $rt_createByteArrayFromData([10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0]), $rt_createByteArrayFromData([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
    $rt_createByteArrayFromData([14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3])]);
    obcd_Blake2bDigest_ROUNDS = 12;
}
var otp_Platform = $rt_classWithoutFields();
function otp_Platform_getName($cls) {
    return $rt_str($cls.$meta.name);
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
    return obcd_Blake2bDigest__init_($size);
}
function sb_Crypto_createBlake2bDigest$exported$0(var$0, var$1) {
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
var jl_CharSequence = $rt_classWithoutFields(0);
function jl_AbstractStringBuilder() {
    var a = this; jl_Object.call(a);
    a.$buffer0 = null;
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
    $this.$buffer0 = $rt_createCharArray($capacity);
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
            $this.$buffer0.data[$i + $string.$length0() | 0] = $this.$buffer0.data[$i];
            $i = $i + (-1) | 0;
        }
        $this.$length = $this.$length + $string.$length0() | 0;
        $i = 0;
        while ($i < $string.$length0()) {
            var$4 = $this.$buffer0.data;
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
    if ($this.$buffer0.data.length >= $capacity)
        return;
    $newLength = $this.$buffer0.data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($this.$buffer0.data.length * 2 | 0, 5));
    $this.$buffer0 = ju_Arrays_copyOf($this.$buffer0, $newLength);
}
function jl_AbstractStringBuilder_toString($this) {
    return jl_String__init_0($this.$buffer0, 0, $this.$length);
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
function obu_Pack_littleEndianToLong(var$1, var$2) {
    var var$3;
    var$3 = obu_Pack_littleEndianToInt(var$1, var$2);
    var$2 = obu_Pack_littleEndianToInt(var$1, var$2 + 4 | 0);
    return Long_or(Long_shl(Long_and(Long_fromInt(var$2), Long_create(4294967295, 0)), 32), Long_and(Long_fromInt(var$3), Long_create(4294967295, 0)));
}
var jl_NoClassDefFoundError = $rt_classWithoutFields(jl_LinkageError);
var otji_JS = $rt_classWithoutFields();
var jl_Appendable = $rt_classWithoutFields(0);
var jl_NoSuchMethodError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
function jl_NoSuchMethodError__init_(var_0) {
    var var_1 = new jl_NoSuchMethodError();
    jl_NoSuchMethodError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchMethodError__init_0($this, $message) {
    jl_IncompatibleClassChangeError__init_0($this, $message);
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
var jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException);
function jl_IllegalArgumentException__init_(var_0) {
    var var_1 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_0(var_1, var_0);
    return var_1;
}
function jl_IllegalArgumentException__init_0($this, $message) {
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
var jlr_Type = $rt_classWithoutFields(0);
var jlr_AnnotatedElement = $rt_classWithoutFields(0);
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
function jl_Class_getName($this) {
    if ($this.$name === null)
        $this.$name = otp_Platform_getName($this.$platformClass);
    return $this.$name;
}
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
$rt_packages([-1, "java", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 1, 0, [], 0, 3, 0, 0, ["$getClass0", $rt_wrapFunction0(jl_Object_getClass), "$toString", $rt_wrapFunction0(jl_Object_toString), "$identity", $rt_wrapFunction0(jl_Object_identity)],
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, ["$fillInStackTrace", $rt_wrapFunction0(jl_Throwable_fillInStackTrace)],
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Exception__init_0), "$_init_0", $rt_wrapFunction1(jl_Exception__init_2)],
jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_RuntimeException__init_1), "$_init_0", $rt_wrapFunction1(jl_RuntimeException__init_2)],
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IndexOutOfBoundsException__init_0)],
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, 0,
otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_Error__init_0)],
obc_Digest, 0, jl_Object, [], 3, 3, 0, 0, 0,
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, 0,
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Integer_$callClinit, 0,
sb_Main, 0, jl_Object, [], 0, 3, 0, 0, 0,
jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_LinkageError__init_0)],
jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_IncompatibleClassChangeError__init_0)],
jl_NoSuchFieldError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_NoSuchFieldError__init_0)],
obc_ExtendedDigest, 0, jl_Object, [obc_Digest], 3, 3, 0, 0, 0,
obcd_Blake2bDigest, 0, jl_Object, [obc_ExtendedDigest], 0, 3, 0, obcd_Blake2bDigest_$callClinit, ["$_init_1", $rt_wrapFunction1(obcd_Blake2bDigest__init_0)],
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, jl_Character_$callClinit, 0,
sb_Exported, 0, jl_Object, [otj_JSObject], 3, 0, 0, 0, 0,
sb_Crypto, 0, jl_Object, [sb_Exported], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(sb_Crypto__init_0), "$createBlake2bDigest", $rt_wrapFunction1(sb_Crypto_createBlake2bDigest), "$createBlake2bDigest$exported$0", $rt_wrapFunction1(sb_Crypto_createBlake2bDigest$exported$0)],
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AbstractStringBuilder__init_0), "$_init_1", $rt_wrapFunction1(jl_AbstractStringBuilder__init_2), "$append0", $rt_wrapFunction1(jl_AbstractStringBuilder_append), "$insert", $rt_wrapFunction2(jl_AbstractStringBuilder_insert), "$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString)],
jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, jl_String_$callClinit, ["$_init_2", $rt_wrapFunction1(jl_String__init_1), "$_init_3", $rt_wrapFunction3(jl_String__init_2), "$charAt", $rt_wrapFunction1(jl_String_charAt), "$length0", $rt_wrapFunction0(jl_String_length), "$isEmpty", $rt_wrapFunction0(jl_String_isEmpty), "$equals", $rt_wrapFunction1(jl_String_equals), "$hashCode0", $rt_wrapFunction0(jl_String_hashCode)],
obu_Pack, 0, jl_Object, [], 1, 3, 0, 0, 0,
jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0, 0,
otji_JS, 0, jl_Object, [], 4, 0, 0, 0, 0,
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_NoSuchMethodError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_NoSuchMethodError__init_0)],
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringIndexOutOfBoundsException__init_0)],
jl_IllegalArgumentException, 0, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_IllegalArgumentException__init_0)],
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_String$_clinit_$lambda$_84_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_String$_clinit_$lambda$_84_0__init_0)],
jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement, jlr_Type], 0, 3, 0, 0, ["$getName", $rt_wrapFunction0(jl_Class_getName)],
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringBuilder__init_0), "$append", $rt_wrapFunction1(jl_StringBuilder_append), "$insert0", $rt_wrapFunction2(jl_StringBuilder_insert), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert0)]]);
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
$rt_stringPool(["@", "BLAKE2b digest bit length must be a multiple of 8 and not greater than 512", "0", "null"]);
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
main = $rt_mainStarter(sb_Main_main);
main.javaException = $rt_javaException;
(function() {
    var c;
    c = sb_Crypto.prototype;
    c.createBlake2bDigest = c.$createBlake2bDigest$exported$0;
})();
})();

//# sourceMappingURL=classes.js.map