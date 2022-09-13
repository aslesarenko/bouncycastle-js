package scorex.bcjs;

import org.teavm.jso.JSBody;

public class Main {
    private Main() {
    }
    public static void main(String[] args) {
        exportAPI(new Crypto());
    }

    @JSBody(params = "o", script = "main.api = o;")
    private static native void exportAPI(Exported o);
}