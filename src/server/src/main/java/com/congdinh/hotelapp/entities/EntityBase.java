package com.congdinh.hotelapp.entities;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public class EntityBase  {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
}
