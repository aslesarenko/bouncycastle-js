package scorex.bcjs;

import org.teavm.jso.JSObject;

public abstract class JSExtendedDigest implements JSObject {
    public abstract void update(byte[] in, int inOff, int len);
    public abstract int doFinal(byte[] out, int outOff);
}
