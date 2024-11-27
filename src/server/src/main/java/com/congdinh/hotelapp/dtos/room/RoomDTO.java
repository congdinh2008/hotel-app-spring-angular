package com.congdinh.hotelapp.dtos.room;


import java.util.UUID;

import com.congdinh.hotelapp.entities.RoomType;

import lombok.*;

@Data
@NoArgsConstructor
public class RoomDTO {
    private UUID id;

    private String number;

    private RoomType type;

    private int capacity;

    private double price;
}
