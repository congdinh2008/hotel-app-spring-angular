package com.congdinh.hotelapp.dtos.auth;

import com.congdinh.hotelapp.dtos.user.UserInformationDTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {
    private String accessToken;
    private UserInformationDTO user;
}
