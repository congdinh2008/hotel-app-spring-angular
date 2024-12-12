package com.congdinh.hotelapp.dtos.user;

import java.util.Set;

import com.congdinh.hotelapp.dtos.BaseDTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserInformationDTO extends BaseDTO {
    private String firstName;

    private String lastName;

    private String displayName;

    private String username;

    private String email;

    private String phoneNumber;

    private Set<String> roles;
}
