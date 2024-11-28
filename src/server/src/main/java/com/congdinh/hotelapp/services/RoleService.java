package com.congdinh.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.congdinh.hotelapp.dtos.role.RoleCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.role.RoleMasterDTO;

public interface RoleService {
    List<RoleMasterDTO> findAll();

    List<RoleMasterDTO> findByName(String keyword);

    Page<RoleMasterDTO> findPaginated(String keyword, Pageable pageable);

    RoleMasterDTO findById(String id);

    RoleMasterDTO create(RoleCreateUpdateDTO roleDTO);

    RoleMasterDTO update(UUID id, RoleCreateUpdateDTO roleDTO);

    boolean delete(UUID id);
}
