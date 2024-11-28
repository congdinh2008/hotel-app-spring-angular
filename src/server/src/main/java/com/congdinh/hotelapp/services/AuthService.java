package com.congdinh.hotelapp.services;


import java.util.UUID;

import com.congdinh.hotelapp.dtos.auth.RegisterRequestDTO;

public interface AuthService {
    UUID register(RegisterRequestDTO registerRequestDTO);

    boolean existsByUsername(String username);
}
