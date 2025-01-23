package com.siman.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {
    private String message;
    private Long id;
    private String username;
    private List<String> roles;

    // Constructor adicional que acepta solo un parámetro String
    public MessageResponse(String message) {
        this.message = message;
    }
}
