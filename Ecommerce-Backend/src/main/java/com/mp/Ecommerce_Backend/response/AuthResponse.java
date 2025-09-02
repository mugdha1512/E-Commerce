package com.mp.Ecommerce_Backend.response;

public class AuthResponse {
    private String jwt;
    private String message;

    // Default constructor (needed for JSON serialization)
    public AuthResponse() {}

    // Parameterized constructor
    public AuthResponse(String jwt, String message) {
        super();
        this.jwt = jwt;
        this.message = message;
    }

    // Getters and Setters
    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
