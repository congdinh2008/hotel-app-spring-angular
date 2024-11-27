package com.congdinh.hotelapp.dtos.room;

import org.hibernate.validator.constraints.Length;

import com.congdinh.hotelapp.entities.RoomType;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomCreateUpdateDTO {
    @NotBlank(message = "Room Number is required")
    @Length(min = 2, max = 255, message = "Room Number must be between 2 and 255 characters")
    private String number;

    @NotNull(message = "Room Type is required")
    private RoomType type;

    @NotNull(message = "Room Capacity is required")
    @Min(value = 1, message = "Room Capacity must be greater than 0")
    private int capacity;

    @NotNull(message = "Room Price is required")
    @Min(value = 0, message = "Room Price must be greater than or equal to 0")
    private double price;
}