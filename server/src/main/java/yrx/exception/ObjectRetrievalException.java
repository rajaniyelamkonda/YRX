package yrx.exception;

public class ObjectRetrievalException extends Exception {

    private String id;

    public ObjectRetrievalException(String id, String message) {
        super(message);
        this.id = id;
    }
    public ObjectRetrievalException(String message) {
        super(message);
        this.id = "";
    }

    @Override
    public String toString() {
        return "Object retrieval failed for ID: " + id + " error is " + getMessage();
    }
}
