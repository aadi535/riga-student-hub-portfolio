package lv.rigastudenthub;

import java.util.Arrays;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/** Run locally with PropertiesLauncher; passwords are read without terminal echo. */
public class PasswordHashTool {
    public static void main(String[] args) {
        var console=System.console();
        if(console==null) throw new IllegalStateException("Use an interactive terminal to generate the manager password hash.");
        char[] password=console.readPassword("Choose a manager password (at least 14 characters): ");
        try {
            if(password==null || password.length<14) throw new IllegalArgumentException("Use at least 14 characters.");
            console.printf("BCrypt hash (save in MANAGER_PASSWORD_HASH): %s%n",new BCryptPasswordEncoder(12).encode(new String(password)));
        } finally { if(password!=null) Arrays.fill(password,'\0'); }
    }
}
