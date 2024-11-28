package com.congdinh.hotelapp.dtos.role;

import com.congdinh.hotelapp.dtos.MasterDTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleMasterDTO extends MasterDTO {
    private String name;
    
    private String description;
}
