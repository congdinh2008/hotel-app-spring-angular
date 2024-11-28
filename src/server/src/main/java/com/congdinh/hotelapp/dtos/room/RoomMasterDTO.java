package com.congdinh.hotelapp.dtos.room;

import com.congdinh.hotelapp.dtos.MasterDTO;
import com.congdinh.hotelapp.entities.RoomType;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomMasterDTO extends MasterDTO {
    private String number;

    private RoomType type;

    private int capacity;

    private double price;
}
