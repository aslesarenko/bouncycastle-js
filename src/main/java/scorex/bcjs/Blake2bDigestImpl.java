package scorex.bcjs;

import org.bouncycastle.crypto.digests.Blake2bDigest;
import org.teavm.jso.JSMethod;

public class Blake2bDigestImpl extends JSExtendedDigest {
    private Blake2bDigest _digest;

    public Blake2bDigestImpl(Blake2bDigest digest) {
        _digest = digest;
    }

    @JSMethod
    public void update(byte[] in, int inOff, int len) {
        _digest.update(in, inOff, len);
    }

    @JSMethod
    public int doFinal(byte[] out, int outOff) {
        return _digest.doFinal(out, outOff);
    }
}
