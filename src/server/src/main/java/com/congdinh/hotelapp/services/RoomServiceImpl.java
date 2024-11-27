package com.congdinh.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.congdinh.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.room.RoomDTO;
import com.congdinh.hotelapp.entities.Room;
import com.congdinh.hotelapp.entities.RoomType;
import com.congdinh.hotelapp.repositories.RoomRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;

    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public List<RoomDTO> findAll() {
        var rooms = roomRepository.findAll();

        // Convert entities to DTOs
        var roomDTOs = rooms.stream().map(room -> {
            var roomDTO = new RoomDTO();
            roomDTO.setId(room.getId());
            roomDTO.setNumber(room.getNumber());
            roomDTO.setType(room.getType());
            roomDTO.setCapacity(room.getCapacity());
            roomDTO.setPrice(room.getPrice());
            return roomDTO;
        }).toList();

        return roomDTOs;
    }

    @Override
    public List<RoomDTO> findByRoomNumber(String keyword) {
        Specification<Room> spec = (root, query, cb) -> {
            if (keyword == null) {
                return null;
            }
            return cb.like(root.get("number"), "%" + keyword + "%");
        };

        var rooms = roomRepository.findAll(spec);

        // Convert entities to DTOs
        var roomDTOs = rooms.stream().map(room -> {
            var roomDTO = new RoomDTO();
            roomDTO.setId(room.getId());
            roomDTO.setNumber(room.getNumber());
            roomDTO.setType(room.getType());
            roomDTO.setCapacity(room.getCapacity());
            roomDTO.setPrice(room.getPrice());
            return roomDTO;
        }).toList();

        return roomDTOs;
    }

    @Override
    public List<RoomDTO> findByRoomType(RoomType type) {
        Specification<Room> spec = (root, query, cb) -> {
            if (type == null) {
                return null;
            }
            return cb.equal(root.get("type"), type);
        };

        var rooms = roomRepository.findAll(spec);

        // Convert entities to DTOs
        var roomDTOs = rooms.stream().map(room -> {
            var roomDTO = new RoomDTO();
            roomDTO.setId(room.getId());
            roomDTO.setNumber(room.getNumber());
            roomDTO.setType(room.getType());
            roomDTO.setCapacity(room.getCapacity());
            roomDTO.setPrice(room.getPrice());
            return roomDTO;
        }).toList();

        return roomDTOs;
    }

    @Override
    public Page<RoomDTO> findPaginated(String keyword, Pageable pageable) {
        Specification<Room> spec = (root, query, cb) -> {
            if (keyword == null) {
                return null;
            }
            return cb.like(root.get("number"), "%" + keyword + "%");
        };

        var rooms = roomRepository.findAll(spec, pageable);

        // Convert entities to DTOs
        var roomDTOs = rooms.map(room -> {
            var roomDTO = new RoomDTO();
            roomDTO.setId(room.getId());
            roomDTO.setNumber(room.getNumber());
            roomDTO.setType(room.getType());
            roomDTO.setCapacity(room.getCapacity());
            roomDTO.setPrice(room.getPrice());
            return roomDTO;
        });

        return roomDTOs;
    }

    @Override
    public RoomDTO findById(String id) {
        var room = roomRepository.findById(UUID.fromString(id)).orElse(null);

        if (room == null) {
            return null;
        }

        var roomDTO = new RoomDTO();
        roomDTO.setId(room.getId());
        roomDTO.setNumber(room.getNumber());
        roomDTO.setType(room.getType());
        roomDTO.setCapacity(room.getCapacity());
        roomDTO.setPrice(room.getPrice());

        return roomDTO;
    }

    @Override
    public RoomDTO create(RoomCreateUpdateDTO roomDTO) {
        if (roomDTO == null) {
            throw new IllegalArgumentException("RoomDTO is null");
        }

        var existingRoom = roomRepository.findByNumber(roomDTO.getNumber());
        if (existingRoom != null) {
            throw new IllegalArgumentException("Room number already exists");
        }

        var room = new Room();
        room.setNumber(roomDTO.getNumber());
        room.setType(roomDTO.getType());
        room.setCapacity(roomDTO.getCapacity());
        room.setPrice(roomDTO.getPrice());

        room = roomRepository.save(room);

        var newRoomDTO = new RoomDTO();
        newRoomDTO.setId(room.getId());
        newRoomDTO.setNumber(room.getNumber());
        newRoomDTO.setType(room.getType());
        newRoomDTO.setCapacity(room.getCapacity());
        newRoomDTO.setPrice(room.getPrice());

        return newRoomDTO;
    }

    @Override
    public RoomDTO update(UUID id, RoomCreateUpdateDTO roomDTO) {
        if (roomDTO == null) {
            throw new IllegalArgumentException("RoomDTO is null");
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
        room.setNumber(roomDTO.getNumber());
        room.setType(roomDTO.getType());
        room.setCapacity(roomDTO.getCapacity());
        room.setPrice(roomDTO.getPrice());

        room = roomRepository.save(room);

        // Convert entity to DTO
        var updatedRoomDTO = new RoomDTO();
        updatedRoomDTO.setId(room.getId());
        updatedRoomDTO.setNumber(room.getNumber());
        updatedRoomDTO.setType(room.getType());
        updatedRoomDTO.setCapacity(room.getCapacity());
        updatedRoomDTO.setPrice(room.getPrice());

        return updatedRoomDTO;
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
