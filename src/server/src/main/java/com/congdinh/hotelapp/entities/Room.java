package com.congdinh.hotelapp.entities;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(columnDefinition = "NVARCHAR(255)", nullable = false, unique = true)
    private String number;

    private RoomType type;

    private int capacity;

    private double price;

}
