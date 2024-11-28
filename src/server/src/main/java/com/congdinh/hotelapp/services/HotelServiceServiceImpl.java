package com.congdinh.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import com.congdinh.hotelapp.dtos.hotelservice.HotelServiceCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.hotelservice.HotelServiceMasterDTO;
import com.congdinh.hotelapp.entities.HotelService;
import com.congdinh.hotelapp.mapper.HotelServiceMapper;
import com.congdinh.hotelapp.repositories.HotelServiceRepository;

@Service
@Transactional
public class HotelServiceServiceImpl implements HotelServiceService {
    private final HotelServiceRepository hotelServiceRepository;
    private final HotelServiceMapper hotelServiceMapper;

    public HotelServiceServiceImpl(HotelServiceRepository hotelServiceRepository, HotelServiceMapper hotelServiceMapper) {
        this.hotelServiceRepository = hotelServiceRepository;
        this.hotelServiceMapper = hotelServiceMapper;
    }

    @Override
    public List<HotelServiceMasterDTO> findAll() {
        var services = hotelServiceRepository.findAll();

        // Convert entities to DTOs
        var serviceDTOs = services.stream().map(service -> {
            return hotelServiceMapper.toMasterDTO(service);
        }).toList();

        return serviceDTOs;
    }

    @Override
    public List<HotelServiceMasterDTO> findByName(String keyword) {
        Specification<HotelService> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }
            return cb.like(root.get("name"), "%" + keyword + "%");
        };

        var services = hotelServiceRepository.findAll(spec);

        // Convert entities to DTOs
        var serviceDTOs = services.stream().map(service -> {
            return hotelServiceMapper.toMasterDTO(service);
        }).toList();

        return serviceDTOs;
    }

    @Override
    public Page<HotelServiceMasterDTO> findPaginated(String keyword, Pageable pageable) {
        Specification<HotelService> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }
            return cb.like(root.get("name"), "%" + keyword + "%");
        };

        var services = hotelServiceRepository.findAll(spec, pageable);

        // Convert entities to DTOs
        var serviceDTOs = services.map(service -> {
            return hotelServiceMapper.toMasterDTO(service);
        });

        return serviceDTOs;
    }

    @Override
    public HotelServiceMasterDTO findById(String id) {
        var service = hotelServiceRepository.findById(UUID.fromString(id)).orElse(null);

        if (service == null) {
            return null;
        }

        return hotelServiceMapper.toMasterDTO(service);
    }

    @Override
    public HotelServiceMasterDTO create(HotelServiceCreateUpdateDTO serviceDTO) {
        if (serviceDTO == null) {
            throw new IllegalArgumentException("Service is null");
        }

        var existingService = hotelServiceRepository.findByName(serviceDTO.getName());
        if (existingService != null) {
            throw new IllegalArgumentException("Service number already exists");
        }

        var service = hotelServiceMapper.toEntity(serviceDTO);

        service = hotelServiceRepository.save(service);

        return hotelServiceMapper.toMasterDTO(service);
    }

    @Override
    public HotelServiceMasterDTO update(UUID id, HotelServiceCreateUpdateDTO serviceDTO) {
        if (serviceDTO == null) {
            throw new IllegalArgumentException("Service is null");
        }

        var existingService = hotelServiceRepository.findByName(serviceDTO.getName());

        if (existingService != null && !existingService.getId().equals(id)) {
            throw new IllegalArgumentException("Service number already exists");
        }

        var service = hotelServiceRepository.findById(id).orElse(null);

        if (service == null) {
            throw new IllegalArgumentException("Service not found");
        }

        // Update entity properties
        hotelServiceMapper.updateEntity(serviceDTO, service);
        service.setId(id);

        service = hotelServiceRepository.save(service);

        return hotelServiceMapper.toMasterDTO(service);
    }

    @Override
    public boolean delete(UUID id) {
        var service = hotelServiceRepository.findById(id).orElse(null);

        if (service == null) {
            throw new IllegalArgumentException("Service not found");
        }

        hotelServiceRepository.delete(service);

        return !hotelServiceRepository.existsById(id);
    }
}

