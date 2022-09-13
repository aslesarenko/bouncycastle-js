package scorex.bcjs;

import gf2t.GF2_192;
import gf2t.GF2_192_Base;
import gf2t.GF2_192_Poly;
import org.bouncycastle.crypto.digests.Blake2bDigest;

public class Crypto implements Exported {
    @Override
    public Blake2bDigest createBlake2bDigest(int size) {
        return new Blake2bDigest(size);
    }

    @Override
    public GF2_192_Poly fromByteArray(byte[] coeff0, byte[] moreCoeffs) {
        return GF2_192_Poly.fromByteArray(coeff0, moreCoeffs);
    }

    @Override
    public GF2_192_Poly interpolate(byte[] points, GF2_192_Base[] values, GF2_192_Base valueAt0) {
        return GF2_192_Poly.interpolate(points, (GF2_192[])values, (GF2_192)valueAt0);
    }
}
