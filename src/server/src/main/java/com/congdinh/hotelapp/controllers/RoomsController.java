package com.congdinh.hotelapp.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.congdinh.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.room.RoomDTO;
import com.congdinh.hotelapp.entities.RoomType;
import com.congdinh.hotelapp.services.RoomService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/rooms")
@Tag(name = "Rooms", description = "APIs for managing rooms")
public class RoomsController {
    private final RoomService roomService;
    private final PagedResourcesAssembler<RoomDTO> pagedResourcesAssembler;

    public RoomsController(RoomService roomService, PagedResourcesAssembler<RoomDTO> pagedResourcesAssembler) {
        this.roomService = roomService;
        this.pagedResourcesAssembler = pagedResourcesAssembler;
    }

    @GetMapping
    @Operation(summary = "Get all rooms")
    @ApiResponse(responseCode = "200", description = "Return all rooms")
    public ResponseEntity<List<RoomDTO>> getAll() {
        var rooms = roomService.findAll();
        return ResponseEntity.ok(rooms);
    }

    // localhost:8080/api/v1/rooms/search?keyword=101
    @GetMapping("/searchByRoomNumber")
    @Operation(summary = "Search rooms by room number")
    @ApiResponse(responseCode = "200", description = "Return rooms that match the room number")
    public ResponseEntity<List<RoomDTO>> searchByRoomNumber(
            @RequestParam(required = false) String keyword) {
        var rooms = roomService.findByRoomNumber(keyword);
        return ResponseEntity.ok(rooms);
    }

    // localhost:8080/api/v1/rooms/search?type=DELUXE
    @GetMapping("/searchByRoomType")
    @Operation(summary = "Search rooms by room type")
    @ApiResponse(responseCode = "200", description = "Return rooms that match the room type")
    public ResponseEntity<List<RoomDTO>> searchByRoomType(
            @RequestParam(required = false) RoomType type) {
        var rooms = roomService.findByRoomType(type);
        return ResponseEntity.ok(rooms);
    }

    // localhost:8080/api/v1/rooms/search?keyword=101&page=0&size=10
    @GetMapping("/search")
    @Operation(summary = "Search rooms with pagination")
    @ApiResponse(responseCode = "200", description = "Return rooms that match the keyword with pagination")
    public ResponseEntity<?> searchPaginated(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "number") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        Pageable pageable = null;

        if (order.equals("asc")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }

        var rooms = roomService.findPaginated(keyword, pageable);

        return ResponseEntity.ok(pagedResourcesAssembler.toModel(rooms));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get room by id")
    @ApiResponse(responseCode = "200", description = "Return room that match the id")
    public ResponseEntity<RoomDTO> getById(@RequestParam String id) {
        var room = roomService.findById(id);
        return ResponseEntity.ok(room);
    }

    @PostMapping()
    @Operation(summary = "Create new room")
    @ApiResponse(responseCode = "200", description = "Return created room")
    @ApiResponse(responseCode = "400", description = "Return error message if create failed")
    public ResponseEntity<?> create(@Valid @RequestBody RoomCreateUpdateDTO roomDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        var newRoom = roomService.create(roomDTO);

        if (newRoom == null) {
            return ResponseEntity.badRequest().body("Failed to create room");
        }

        return ResponseEntity.ok(newRoom);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update room by id")
    @ApiResponse(responseCode = "200", description = "Return updated room")
    @ApiResponse(responseCode = "400", description = "Return error message if update failed")
    public ResponseEntity<?> update(
            @PathVariable UUID id,
            @Valid @RequestBody RoomCreateUpdateDTO roomDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        var updatedRoom = roomService.create(roomDTO);

        if (updatedRoom == null) {
            return ResponseEntity.badRequest().body("Failed to update room");
        }

        return ResponseEntity.ok(updatedRoom);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete room by id")
    @ApiResponse(responseCode = "200", description = "Return true if delete successfully")
    @ApiResponse(responseCode = "400", description = "Return error message if delete failed")
    public ResponseEntity<?> delete(@PathVariable UUID id) {

        var result = roomService.delete(id);

        if (!result) {
            return ResponseEntity.badRequest().body("Failed to delete room");
        }

        return ResponseEntity.ok(result);
    }
}
