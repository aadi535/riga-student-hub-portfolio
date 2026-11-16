package lv.rigastudenthub;

import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;

@RestControllerAdvice
class ApiErrors {
    @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<?> validation(MethodArgumentNotValidException e) {
        return ResponseEntity.badRequest().body(Map.of("message","Check the required fields, contact format, email, length limits and privacy consent."));
    }
    @ExceptionHandler(ResponseStatusException.class) ResponseEntity<?> status(ResponseStatusException e) {
        return ResponseEntity.status(e.getStatusCode()).body(Map.of("message",e.getReason()==null ? "Request could not be completed." : e.getReason()));
    }
    @ExceptionHandler({org.springframework.http.converter.HttpMessageNotReadableException.class, org.springframework.web.method.annotation.MethodArgumentTypeMismatchException.class, org.springframework.web.bind.MissingRequestHeaderException.class})
    ResponseEntity<?> invalid(Exception e) { return ResponseEntity.badRequest().body(Map.of("message","Invalid request format.")); }
    @ExceptionHandler(Exception.class) ResponseEntity<?> unavailable(Exception e) {
        // Do not echo SQL, provider responses or personal form data to browsers or logs.
        return ResponseEntity.status(503).body(Map.of("message","Service temporarily unavailable. Your request has not been confirmed; retry with the same form."));
    }
}
