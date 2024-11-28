package com.congdinh.hotelapp.dtos.role;

import org.hibernate.validator.constraints.Length;

import com.congdinh.hotelapp.dtos.MasterCreateUpdateDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class RoleCreateUpdateDTO extends MasterCreateUpdateDTO {
    @NotBlank(message = "Name is required")
    @Length(min = 2, max = 255, message = "Name must be between 2 and 255 characters")
    private String name;
    
    @Length(max = 500, message = "Name must be less than 500 characters")
    private String description;
}