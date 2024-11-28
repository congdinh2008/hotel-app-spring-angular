package com.congdinh.hotelapp.dtos.room;

import com.congdinh.hotelapp.dtos.BaseDTO;
import com.congdinh.hotelapp.entities.RoomType;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class RoomDTO extends BaseDTO {
    private String number;

    private RoomType type;

    private int capacity;

    private double price;
}
