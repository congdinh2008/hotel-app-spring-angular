package com.congdinh.hotelapp.mapper;

import org.mapstruct.*;

import com.congdinh.hotelapp.dtos.hotelservice.HotelServiceCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.hotelservice.HotelServiceMasterDTO;
import com.congdinh.hotelapp.entities.HotelService;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface HotelServiceMapper {
    HotelService toDTO(HotelService entity);

    HotelServiceMasterDTO toMasterDTO(HotelService entity);

    HotelService toEntity(HotelServiceCreateUpdateDTO dto);
}
