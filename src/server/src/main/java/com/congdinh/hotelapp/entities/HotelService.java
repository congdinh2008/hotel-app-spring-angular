package com.congdinh.hotelapp.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "hotel_services")
public class HotelService extends MasterEntityBase {
   
    @Column(columnDefinition = "NVARCHAR(255)", nullable = false, unique = true)
    private String name;

    private double price;
}
