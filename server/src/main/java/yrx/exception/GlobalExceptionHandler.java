package yrx.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Optional;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ObjectCreationFailedException.class)
    public ResponseEntity<String> ObjectCreationFailedExceptionHandler(final ObjectCreationFailedException exception) {
        final String message = Optional.of(exception.getMessage()).orElse(exception.getClass().getSimpleName());
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ObjectRetrievalException.class)
    public ResponseEntity<String> ObjectRetrievalExceptionHandler(final ObjectRetrievalException exception) {
        return new ResponseEntity<>(exception.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> genericExceptionHandle(final Exception exception) {
        System.out.println(exception.getMessage());
        exception.printStackTrace();
        return new ResponseEntity<>("Something went wrong. Please raise SR.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
