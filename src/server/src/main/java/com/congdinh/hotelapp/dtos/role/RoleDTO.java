package com.congdinh.hotelapp.dtos.role;

import com.congdinh.hotelapp.dtos.BaseDTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class RoleDTO extends BaseDTO {
    private String name;

    private String description;
}
