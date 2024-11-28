package com.congdinh.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.congdinh.hotelapp.dtos.user.UserCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.user.UserMasterDTO;
import com.congdinh.hotelapp.entities.User;
import com.congdinh.hotelapp.mapper.UserMapper;
import com.congdinh.hotelapp.repositories.UserRepository;

import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public List<UserMasterDTO> findAll() {
        var users = userRepository.findAll();

        // Convert entities to DTOs
        var userDTOs = users.stream().map(user -> {
            return userMapper.toMasterDTO(user);
        }).toList();

        return userDTOs;
    }

    @Override
    public List<UserMasterDTO> findByKeyword(String keyword) {
        Specification<User> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }
            // Search by user name
            Predicate predicate = cb.like(root.get("username"), "%" + keyword + "%");

            // Search by email
            predicate = cb.or(predicate, cb.like(root.get("email"), "%" + keyword + "%"));

            // Search by phone
            predicate = cb.or(predicate, cb.like(root.get("phone"), "%" + keyword + "%"));

            return predicate;
        };

        var users = userRepository.findAll(spec);

        // Convert entities to DTOs
        var userDTOs = users.stream().map(user -> {
            return userMapper.toMasterDTO(user);
        }).toList();

        return userDTOs;
    }

    @Override
    public Page<UserMasterDTO> findPaginated(String keyword, Pageable pageable) {
        Specification<User> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }
            return cb.like(root.get("username"), "%" + keyword + "%");
        };

        var users = userRepository.findAll(spec, pageable);

        // Convert entities to DTOs
        var userDTOs = users.map(user -> {
            return userMapper.toMasterDTO(user);
        });

        return userDTOs;
    }

    @Override
    public UserMasterDTO findById(String id) {
        var user = userRepository.findById(UUID.fromString(id)).orElse(null);

        if (user == null) {
            return null;
        }

        return userMapper.toMasterDTO(user);
    }

    @Override
    public UserMasterDTO create(UserCreateUpdateDTO userDTO) {
        if (userDTO == null) {
            throw new IllegalArgumentException("UserMasterDTO is null");
        }

        var existingUser = userRepository.findByUsername(userDTO.getUsername());
        if (existingUser != null) {
            throw new IllegalArgumentException("User number already exists");
        }

        var user = userMapper.toEntity(userDTO);

        user = userRepository.save(user);

        return userMapper.toMasterDTO(user);
    }

    @Override
    public UserMasterDTO update(UUID id, UserCreateUpdateDTO userDTO) {
        if (userDTO == null) {
            throw new IllegalArgumentException("UserMasterDTO is null");
        }

        var existingUser = userRepository.findByUsername(userDTO.getUsername());

        if (existingUser != null && !existingUser.getId().equals(id)) {
            throw new IllegalArgumentException("User number already exists");
        }

        var user = userRepository.findById(id).orElse(null);

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        // Update entity properties
        user = userMapper.toEntity(userDTO);

        user = userRepository.save(user);

        return userMapper.toMasterDTO(user);
    }

    @Override
    public boolean delete(UUID id) {
        var user = userRepository.findById(id).orElse(null);

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        userRepository.delete(user);

        return !userRepository.existsById(id);
    }
}
