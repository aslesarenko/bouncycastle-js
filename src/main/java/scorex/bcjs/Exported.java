package scorex.bcjs;

import org.bouncycastle.crypto.digests.Blake2bDigest;
import org.teavm.jso.JSObject;

interface Exported extends JSObject {
    Blake2bDigest createBlake2bDigest(int size);
}
