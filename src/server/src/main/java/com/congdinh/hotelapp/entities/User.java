package com.congdinh.hotelapp.entities;


import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends MasterEntityBase {
    @Column(nullable = false, columnDefinition = "NVARCHAR(50)")
    private String firstName;

    @Column(columnDefinition = "NVARCHAR(50)")
    private String lastName;
    
    @Column(unique = true, nullable = false, columnDefinition = "VARCHAR(50)")
    private String username;

    @Column(unique = true, nullable = false, columnDefinition = "VARCHAR(50)")
    private String email;

    @Column(unique = true, nullable = false, columnDefinition = "VARCHAR(20)")
    private String phoneNumber;

    @Column(nullable = false)
    private String password;

    @ManyToMany
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;
}
