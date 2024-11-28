package com.congdinh.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.congdinh.hotelapp.dtos.role.RoleCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.role.RoleMasterDTO;
import com.congdinh.hotelapp.entities.Role;
import com.congdinh.hotelapp.mapper.RoleMapper;
import com.congdinh.hotelapp.repositories.RoleRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    public RoleServiceImpl(RoleRepository roleRepository, RoleMapper roleMapper) {
        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
    }

    @Override
    public List<RoleMasterDTO> findAll() {
        var roles = roleRepository.findAll();

        // Convert entities to DTOs
        var roleDTOs = roles.stream().map(role -> {
            return roleMapper.toMasterDTO(role);
        }).toList();

        return roleDTOs;
    }

    @Override
    public List<RoleMasterDTO> findByName(String keyword) {
        Specification<Role> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }

            return cb.like(root.get("name"), "%" + keyword + "%");
        };

        var roles = roleRepository.findAll(spec);

        // Convert entities to DTOs
        var roleDTOs = roles.stream().map(role -> {
            return roleMapper.toMasterDTO(role);
        }).toList();

        return roleDTOs;
    }

    @Override
    public Page<RoleMasterDTO> findPaginated(String keyword, Pageable pageable) {
        Specification<Role> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }
            return cb.like(root.get("name"), "%" + keyword + "%");
        };

        var roles = roleRepository.findAll(spec, pageable);

        // Convert entities to DTOs
        var roleDTOs = roles.map(role -> {
            return roleMapper.toMasterDTO(role);
        });

        return roleDTOs;
    }

    @Override
    public RoleMasterDTO findById(String id) {
        var role = roleRepository.findById(UUID.fromString(id)).orElse(null);

        if (role == null) {
            return null;
        }

        return roleMapper.toMasterDTO(role);
    }

    @Override
    public RoleMasterDTO create(RoleCreateUpdateDTO roleDTO) {
        if (roleDTO == null) {
            throw new IllegalArgumentException("RoleMasterDTO is null");
        }

        var existingRole = roleRepository.findByName(roleDTO.getName());
        if (existingRole != null) {
            throw new IllegalArgumentException("Role number already exists");
        }

        var role = roleMapper.toEntity(roleDTO);

        role = roleRepository.save(role);

        return roleMapper.toMasterDTO(role);
    }

    @Override
    public RoleMasterDTO update(UUID id, RoleCreateUpdateDTO roleDTO) {
        if (roleDTO == null) {
            throw new IllegalArgumentException("RoleMasterDTO is null");
        }

        var existingRole = roleRepository.findByName(roleDTO.getName());

        if (existingRole != null && !existingRole.getId().equals(id)) {
            throw new IllegalArgumentException("Role number already exists");
        }

        var role = roleRepository.findById(id).orElse(null);

        if (role == null) {
            throw new IllegalArgumentException("Role not found");
        }

        roleMapper.updateEntity(roleDTO, role);
        role.setId(id);

        role = roleRepository.save(role);

        return roleMapper.toMasterDTO(role);
    }

    @Override
    public boolean delete(UUID id) {
        var role = roleRepository.findById(id).orElse(null);

        if (role == null) {
            throw new IllegalArgumentException("Role not found");
        }

        roleRepository.delete(role);

        return !roleRepository.existsById(id);
    }
}
