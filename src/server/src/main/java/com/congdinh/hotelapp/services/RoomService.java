package com.congdinh.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.congdinh.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.room.RoomMasterDTO;
import com.congdinh.hotelapp.entities.RoomType;

public interface RoomService {
    List<RoomMasterDTO> findAll();

    List<RoomMasterDTO> findByRoomNumber(String keyword);

    List<RoomMasterDTO> findByRoomType(RoomType type);

    Page<RoomMasterDTO> findPaginated(String keyword, Pageable pageable);

    RoomMasterDTO findById(String id);

    RoomMasterDTO create(RoomCreateUpdateDTO roomDTO);

    RoomMasterDTO update(UUID id, RoomCreateUpdateDTO roomDTO);

    boolean delete(UUID id);
}
