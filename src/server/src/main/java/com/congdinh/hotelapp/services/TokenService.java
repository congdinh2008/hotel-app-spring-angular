package com.congdinh.hotelapp.services;


import org.springframework.security.core.Authentication;

public interface TokenService {
    String generateToken(Authentication authentication);

    Authentication getAuthentication(String token);
}
