package com.congdinh.hotelapp.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MasterCreateUpdateDTO {
    @NotNull(message = "Is Active is required")
    private boolean isActive;
}
