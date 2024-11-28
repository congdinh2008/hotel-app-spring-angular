package com.congdinh.hotelapp.entities;

import java.time.ZonedDateTime;

import org.hibernate.annotations.*;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@MappedSuperclass
public class MasterEntityBase extends EntityBase {
    @TimeZoneStorage(TimeZoneStorageType.NATIVE)
    @Column(columnDefinition = "DATETIMEOFFSET", nullable = false)
    private ZonedDateTime insertedAt;

    @TimeZoneStorage(TimeZoneStorageType.NATIVE)
    @Column(columnDefinition = "DATETIMEOFFSET")
    private ZonedDateTime updatedAt;

    @TimeZoneStorage(TimeZoneStorageType.NATIVE)
    @Column(columnDefinition = "DATETIMEOFFSET")
    private ZonedDateTime deletedAt;

    @Column(nullable = false)
    private boolean isActive;

    @PrePersist
    public void prePersist() {
        this.insertedAt = ZonedDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = ZonedDateTime.now();
    }
}
