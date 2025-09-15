package com.mp.Ecommerce_Backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtProvider {

    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth) {
        return Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 864000000))
                .claim("email", auth.getName())
                .signWith(key)
                .compact();
    }

    private String cleanTokenString(String token) {
        if (token == null) return null;
        token = token.replaceAll("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F]", ""); // remove illegal/control chars
        token = token.replaceAll("\\s", ""); // remove whitespace
        return token;
    }

    public String getEmailFromToken(String jwt) {
        try {
            String cleanJwt = cleanTokenString(jwt);
            Claims claims = Jwts.parser()              // << ONLY FOR 0.11+ (including 0.13)
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(cleanJwt)
                    .getBody();
            return claims.get("email", String.class);
        } catch (Exception e) {
            throw new RuntimeException("Invalid JWT token: " + e.getMessage());
        }
    }
}
