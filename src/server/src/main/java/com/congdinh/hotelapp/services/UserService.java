package com.congdinh.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.congdinh.hotelapp.dtos.user.UserCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.user.UserMasterDTO;

public interface UserService {
    List<UserMasterDTO> findAll();

    List<UserMasterDTO> findByKeyword(String keyword);

    Page<UserMasterDTO> findPaginated(String keyword, Pageable pageable);

    UserMasterDTO findById(String id);

    UserMasterDTO create(UserCreateUpdateDTO userDTO);

    UserMasterDTO update(UUID id, UserCreateUpdateDTO userDTO);

    boolean delete(UUID id);
}
