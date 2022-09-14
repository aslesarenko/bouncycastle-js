package scorex.bcjs;

import org.teavm.jso.JSBody;

public class Main {
    private Main() {
    }
    public static void main(String[] args) {
        Crypto c = new Crypto();
        Blake2bDigestImpl d = c.createBlake2bDigest(32);
        d.update(new byte[]{1, 2, 3}, 0, 3);
        byte[] res = new byte[32];
        d.doFinal(res, 0);
        exportAPI(c);
    }

    @JSBody(params = "o", script = "main.api = o;")
    private static native void exportAPI(Exported o);
}