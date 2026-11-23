package  com.example.cmogodb_rest;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class HealthCheck {
     @GetMapping("/health-check")
    public String healthcheck(){
        return  "ok";
    }
    @GetMapping("/add")
    public String addsum() {
        return  "10+20";
    }
    
}
