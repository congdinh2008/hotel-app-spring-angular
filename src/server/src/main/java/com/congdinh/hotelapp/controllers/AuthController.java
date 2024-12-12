package com.congdinh.hotelapp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.congdinh.hotelapp.dtos.auth.LoginRequestDTO;
import com.congdinh.hotelapp.dtos.auth.LoginResponseDTO;
import com.congdinh.hotelapp.dtos.auth.RegisterRequestDTO;
import com.congdinh.hotelapp.services.AuthService;
import com.congdinh.hotelapp.services.TokenService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth", description = "Authentication APIs")
public class AuthController {
    private final AuthService authService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenService tokenService;

    public AuthController(AuthService authService, AuthenticationManagerBuilder authenticationManagerBuilder,
            TokenService tokenService) {
        this.authService = authService;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.tokenService = tokenService;
    }

    // Login API
    @PostMapping("/login")
    @Operation(summary = "Login", description = "Login API")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO, BindingResult bindingResult) {
        // Validate request
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        // Create authentication token with username and password
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginRequestDTO.getUsername(), loginRequestDTO.getPassword());

        // Authenticate user
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // Set authentication to Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT token
        String accessToken = tokenService.generateToken(authentication);

        var userInformationDTO = authService.getUserInformationDTO(loginRequestDTO.getUsername());

        // create response
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.setAccessToken(accessToken);
        loginResponseDTO.setUser(userInformationDTO);

        return ResponseEntity.ok(loginResponseDTO);
    }

    // Register API
    @PostMapping("/register")
    @Operation(summary = "Register", description = "Register API")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO registerRequestDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        var result = authService.register(registerRequestDTO);

        return ResponseEntity.ok(result);
    }
}
