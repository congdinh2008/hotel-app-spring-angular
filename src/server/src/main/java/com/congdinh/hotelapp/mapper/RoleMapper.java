package com.congdinh.hotelapp.mapper;

import org.mapstruct.*;

import com.congdinh.hotelapp.entities.Role;
import com.congdinh.hotelapp.dtos.role.RoleCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.role.RoleDTO;
import com.congdinh.hotelapp.dtos.role.RoleMasterDTO;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RoleMapper {
    RoleDTO toDTO(Role entity);

    RoleMasterDTO toMasterDTO(Role entity);

    Role toEntity(RoleCreateUpdateDTO dto);
}
