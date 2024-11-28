package com.congdinh.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.congdinh.hotelapp.dtos.hotelservice.HotelServiceCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.hotelservice.HotelServiceMasterDTO;

public interface HotelServiceService {

    List<HotelServiceMasterDTO> findAll();

    List<HotelServiceMasterDTO> findByName(String keyword);

    Page<HotelServiceMasterDTO> findPaginated(String keyword, Pageable pageable);

    HotelServiceMasterDTO findById(String id);

    HotelServiceMasterDTO create(HotelServiceCreateUpdateDTO serviceDTO);

    HotelServiceMasterDTO update(UUID id, HotelServiceCreateUpdateDTO serviceDTO);

    boolean delete(UUID id);
}
