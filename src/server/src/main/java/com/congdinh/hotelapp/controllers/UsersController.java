package com.congdinh.hotelapp.controllers;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
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

import com.congdinh.hotelapp.dtos.role.RoleMasterDTO;
import com.congdinh.hotelapp.dtos.user.UserCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.user.UserMasterDTO;
import com.congdinh.hotelapp.mapper.CustomPagedResponse;
import com.congdinh.hotelapp.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "Users", description = "APIs for managing users")
public class UsersController {
    private final UserService userService;
    private final PagedResourcesAssembler<UserMasterDTO> pagedResourcesAssembler;

    public UsersController(UserService userService, PagedResourcesAssembler<UserMasterDTO> pagedResourcesAssembler) {
        this.userService = userService;
        this.pagedResourcesAssembler = pagedResourcesAssembler;
    }

    @GetMapping
    @Operation(summary = "Get all users")
    @ApiResponse(responseCode = "200", description = "Return all users")
    public ResponseEntity<List<UserMasterDTO>> getAll() {
        var users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/searchByKeyword")
    @Operation(summary = "Search users by user number")
    @ApiResponse(responseCode = "200", description = "Return users that match the user number")
    public ResponseEntity<List<UserMasterDTO>> searchByKeyword(
            @RequestParam(required = false) String keyword) {
        var users = userService.findByKeyword(keyword);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/search")
    @Operation(summary = "Search users with pagination")
    @ApiResponse(responseCode = "200", description = "Return users that match the keyword with pagination")
    public ResponseEntity<?> searchPaginated(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "username") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        Pageable pageable = null;

        if (order.equals("asc")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }

        var users = userService.findPaginated(keyword, pageable);

        var pagedModel = pagedResourcesAssembler.toModel(users);

        // Get data, page, and links from pagedModel
        Collection<EntityModel<UserMasterDTO>> data = pagedModel.getContent();

        var links = pagedModel.getLinks();

        var response = new CustomPagedResponse<EntityModel<UserMasterDTO>>(data, pagedModel.getMetadata(), links);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by id")
    @ApiResponse(responseCode = "200", description = "Return user that match the id")
    public ResponseEntity<UserMasterDTO> getById(@RequestParam String id) {
        var user = userService.findById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping()
    @Operation(summary = "Create new user")
    @ApiResponse(responseCode = "200", description = "Return created user")
    @ApiResponse(responseCode = "400", description = "Return error message if create failed")
    public ResponseEntity<?> create(@Valid @RequestBody UserCreateUpdateDTO userDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        var newUser = userService.create(userDTO);

        if (newUser == null) {
            return ResponseEntity.badRequest().body("Failed to create user");
        }

        return ResponseEntity.ok(newUser);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update user by id")
    @ApiResponse(responseCode = "200", description = "Return updated user")
    @ApiResponse(responseCode = "400", description = "Return error message if update failed")
    public ResponseEntity<?> update(
            @PathVariable UUID id,
            @Valid @RequestBody UserCreateUpdateDTO userDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        var updatedUser = userService.update(id, userDTO);

        if (updatedUser == null) {
            return ResponseEntity.badRequest().body("Failed to update user");
        }

        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user by id")
    @ApiResponse(responseCode = "200", description = "Return true if delete successfully")
    @ApiResponse(responseCode = "400", description = "Return error message if delete failed")
    public ResponseEntity<?> delete(@PathVariable UUID id) {

        var result = userService.delete(id);

        if (!result) {
            return ResponseEntity.badRequest().body("Failed to delete user");
        }

        return ResponseEntity.ok(result);
    }
}
