package com.congdinh.hotelapp.mapper;

import org.mapstruct.*;

import com.congdinh.hotelapp.entities.User;
import com.congdinh.hotelapp.dtos.user.UserCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.user.UserDTO;
import com.congdinh.hotelapp.dtos.user.UserMasterDTO;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserDTO toDTO(User entity);

    UserMasterDTO toMasterDTO(User entity);

    User toEntity(UserCreateUpdateDTO dto);
}
