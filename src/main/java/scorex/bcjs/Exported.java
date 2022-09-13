package scorex.bcjs;

import gf2t.GF2_192;
import gf2t.GF2_192_Base;
import gf2t.GF2_192_Poly;
import org.bouncycastle.crypto.digests.Blake2bDigest;
import org.teavm.jso.JSObject;

interface Exported extends JSObject {
    Blake2bDigest createBlake2bDigest(int size);
    GF2_192_Base create_GF_192(byte[] that);
    GF2_192_Poly fromByteArray(byte[] coeff0, byte[] moreCoeffs);
    GF2_192_Poly interpolate (byte[] points, GF2_192_Base[] values, GF2_192_Base valueAt0);
}
