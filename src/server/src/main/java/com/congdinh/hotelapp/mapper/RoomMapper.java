package com.congdinh.hotelapp.mapper;

import org.mapstruct.*;

import com.congdinh.hotelapp.entities.Room;
import com.congdinh.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.room.RoomDTO;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RoomMapper {
    Room toEntity(RoomDTO dto);

    RoomDTO toDTO(Room entity);

    Room toEntity(RoomCreateUpdateDTO dto);

    RoomCreateUpdateDTO toCreateUpdateDTO(Room entity);
}
