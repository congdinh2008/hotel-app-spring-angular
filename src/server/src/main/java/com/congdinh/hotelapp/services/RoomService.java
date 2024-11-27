package com.congdinh.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.congdinh.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.room.RoomDTO;
import com.congdinh.hotelapp.entities.RoomType;

public interface RoomService {
    List<RoomDTO> findAll();

    List<RoomDTO> findByRoomNumber(String keyword);

    List<RoomDTO> findByRoomType(RoomType type);

    Page<RoomDTO> findPaginated(String keyword, Pageable pageable);

    RoomDTO findById(String id);

    RoomDTO create(RoomCreateUpdateDTO roomDTO);

    RoomDTO update(UUID id, RoomCreateUpdateDTO roomDTO);

    boolean delete(UUID id);
}
