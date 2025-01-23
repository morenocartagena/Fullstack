package com.siman.backend.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoder {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        //String rawPassword1 = "admin";
        //String encodedPassword1 = encoder.encode(rawPassword1);
        //System.out.println(encodedPassword1);
        
        //String rawPassword2 = "operador";
        //String encodedPassword2 = encoder.encode(rawPassword2);
        //System.out.println(encodedPassword2);
    }
}
