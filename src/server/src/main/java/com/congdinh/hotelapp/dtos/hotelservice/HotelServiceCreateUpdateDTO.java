package com.congdinh.hotelapp.dtos.hotelservice;

import org.hibernate.validator.constraints.Length;

import com.congdinh.hotelapp.dtos.MasterCreateUpdateDTO;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HotelServiceCreateUpdateDTO extends MasterCreateUpdateDTO {
    @NotBlank(message = "Name is required")
    @Length(min = 2, max = 255, message = "Name must be between 2 and 255 characters")
    private String name;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must be greater than or equal to 0")
    private double price;
}
