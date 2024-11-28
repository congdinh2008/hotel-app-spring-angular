package com.congdinh.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.congdinh.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.room.RoomMasterDTO;
import com.congdinh.hotelapp.entities.Room;
import com.congdinh.hotelapp.entities.RoomType;
import com.congdinh.hotelapp.mapper.RoomMapper;
import com.congdinh.hotelapp.repositories.RoomRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    public RoomServiceImpl(RoomRepository roomRepository, RoomMapper roomMapper) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
    }

    @Override
    public List<RoomMasterDTO> findAll() {
        var rooms = roomRepository.findAll();

        // Convert entities to DTOs
        var roomDTOs = rooms.stream().map(room -> {
            return roomMapper.toMasterDTO(room);
        }).toList();

        return roomDTOs;
    }

    @Override
    public List<RoomMasterDTO> findByRoomNumber(String keyword) {
        Specification<Room> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }
            return cb.like(root.get("number"), "%" + keyword + "%");
        };

        var rooms = roomRepository.findAll(spec);

        // Convert entities to DTOs
        var roomDTOs = rooms.stream().map(room -> {
            return roomMapper.toMasterDTO(room);
        }).toList();

        return roomDTOs;
    }

    @Override
    public List<RoomMasterDTO> findByRoomType(RoomType type) {
        Specification<Room> spec = (root, _, cb) -> {
            if (type == null) {
                return null;
            }
            return cb.equal(root.get("type"), type);
        };

        var rooms = roomRepository.findAll(spec);

        // Convert entities to DTOs
        var roomDTOs = rooms.stream().map(room -> {
            return roomMapper.toMasterDTO(room);
        }).toList();

        return roomDTOs;
    }

    @Override
    public Page<RoomMasterDTO> findPaginated(String keyword, Pageable pageable) {
        Specification<Room> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }
            return cb.like(root.get("number"), "%" + keyword + "%");
        };

        var rooms = roomRepository.findAll(spec, pageable);

        // Convert entities to DTOs
        var roomDTOs = rooms.map(room -> {
            return roomMapper.toMasterDTO(room);
        });

        return roomDTOs;
    }

    @Override
    public RoomMasterDTO findById(String id) {
        var room = roomRepository.findById(UUID.fromString(id)).orElse(null);

        if (room == null) {
            return null;
        }

        return roomMapper.toMasterDTO(room);
    }

    @Override
    public RoomMasterDTO create(RoomCreateUpdateDTO roomDTO) {
        if (roomDTO == null) {
            throw new IllegalArgumentException("RoomMasterDTO is null");
        }

        var existingRoom = roomRepository.findByNumber(roomDTO.getNumber());
        if (existingRoom != null) {
            throw new IllegalArgumentException("Room number already exists");
        }

        var room = roomMapper.toEntity(roomDTO);

        room = roomRepository.save(room);

        return roomMapper.toMasterDTO(room);
    }

    @Override
    public RoomMasterDTO update(UUID id, RoomCreateUpdateDTO roomDTO) {
        if (roomDTO == null) {
            throw new IllegalArgumentException("RoomMasterDTO is null");
        }

        var existingRoom = roomRepository.findByNumber(roomDTO.getNumber());

        if (existingRoom != null && !existingRoom.getId().equals(id)) {
            throw new IllegalArgumentException("Room number already exists");
        }

        var room = roomRepository.findById(id).orElse(null);

        if (room == null) {
            throw new IllegalArgumentException("Room not found");
        }

        // Update entity properties
        room = roomMapper.toEntity(roomDTO);

        room = roomRepository.save(room);

        return roomMapper.toMasterDTO(room);
    }

    @Override
    public boolean delete(UUID id) {
        var room = roomRepository.findById(id).orElse(null);

        if (room == null) {
            throw new IllegalArgumentException("Room not found");
        }

        roomRepository.delete(room);

        return !roomRepository.existsById(id);
    }
}
