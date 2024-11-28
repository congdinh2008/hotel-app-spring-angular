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

    // Keep the insertedAt, updatedAt, deletedAt, isActive fields as they are
    @Mapping(target = "insertedAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt", ignore = true)
    @Mapping(target = "active", ignore = true)
    void updateEntity(RoleCreateUpdateDTO dto, @MappingTarget Role entity);
}
