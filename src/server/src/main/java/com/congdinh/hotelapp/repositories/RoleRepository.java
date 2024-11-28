package com.congdinh.hotelapp.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.congdinh.hotelapp.entities.Role;

public interface RoleRepository extends JpaRepository<Role, UUID>, JpaSpecificationExecutor<Role> {
    Role findByName(String name);

    Boolean existsByName(String name);
}
