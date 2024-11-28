package com.congdinh.hotelapp.dtos.hotelservice;

import com.congdinh.hotelapp.dtos.MasterDTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HotelServiceMasterDTO extends MasterDTO {
    private String name;

    private double price;
}
