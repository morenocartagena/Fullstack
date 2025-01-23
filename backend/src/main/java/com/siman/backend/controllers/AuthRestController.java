package com.siman.backend.controllers;

import com.siman.backend.payload.request.LoginRequest;
import com.siman.backend.payload.response.MessageResponse;
import com.siman.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthRestController {

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new MessageResponse("¡Usuario autenticado exitosamente!", userDetails.getId(), userDetails.getUsername(), roles));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        // Spring Security manejará el logout automáticamente
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(new MessageResponse("¡Usuario desconectado exitosamente!"));
    }
}
