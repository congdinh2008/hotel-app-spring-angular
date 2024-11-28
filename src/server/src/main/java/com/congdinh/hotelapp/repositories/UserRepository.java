package com.congdinh.hotelapp.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.congdinh.hotelapp.entities.User;

public interface UserRepository extends JpaRepository<User, UUID>, JpaSpecificationExecutor<User> {
    User findByUsername(String username);

    Boolean existsByUsername(String username);
}
