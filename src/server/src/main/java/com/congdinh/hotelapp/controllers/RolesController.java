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

import com.congdinh.hotelapp.dtos.role.RoleCreateUpdateDTO;
import com.congdinh.hotelapp.dtos.role.RoleMasterDTO;
import com.congdinh.hotelapp.services.RoleService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/roles")
@Tag(name = "Roles", description = "APIs for managing roles")
public class RolesController {
    private final RoleService roleService;
    private final PagedResourcesAssembler<RoleMasterDTO> pagedResourcesAssembler;

    public RolesController(RoleService roleService, PagedResourcesAssembler<RoleMasterDTO> pagedResourcesAssembler) {
        this.roleService = roleService;
        this.pagedResourcesAssembler = pagedResourcesAssembler;
    }

    @GetMapping
    @Operation(summary = "Get all roles")
    @ApiResponse(responseCode = "200", description = "Return all roles")
    public ResponseEntity<List<RoleMasterDTO>> getAll() {
        var roles = roleService.findAll();
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/searchByName")
    @Operation(summary = "Search roles by role number")
    @ApiResponse(responseCode = "200", description = "Return roles that match the role number")
    public ResponseEntity<List<RoleMasterDTO>> searchByName(
            @RequestParam(required = false) String keyword) {
        var roles = roleService.findByName(keyword);
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/search")
    @Operation(summary = "Search roles with pagination")
    @ApiResponse(responseCode = "200", description = "Return roles that match the keyword with pagination")
    public ResponseEntity<?> searchPaginated(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "name") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        Pageable pageable = null;

        if (order.equals("asc")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }

        var roles = roleService.findPaginated(keyword, pageable);

        return ResponseEntity.ok(pagedResourcesAssembler.toModel(roles));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get role by id")
    @ApiResponse(responseCode = "200", description = "Return role that match the id")
    public ResponseEntity<RoleMasterDTO> getById(@RequestParam String id) {
        var role = roleService.findById(id);
        return ResponseEntity.ok(role);
    }

    @PostMapping()
    @Operation(summary = "Create new role")
    @ApiResponse(responseCode = "200", description = "Return created role")
    @ApiResponse(responseCode = "400", description = "Return error message if create failed")
    public ResponseEntity<?> create(@Valid @RequestBody RoleCreateUpdateDTO roleDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        var newRole = roleService.create(roleDTO);

        if (newRole == null) {
            return ResponseEntity.badRequest().body("Failed to create role");
        }

        return ResponseEntity.ok(newRole);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update role by id")
    @ApiResponse(responseCode = "200", description = "Return updated role")
    @ApiResponse(responseCode = "400", description = "Return error message if update failed")
    public ResponseEntity<?> update(
            @PathVariable UUID id,
            @Valid @RequestBody RoleCreateUpdateDTO roleDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        var updatedRole = roleService.update(id, roleDTO);

        if (updatedRole == null) {
            return ResponseEntity.badRequest().body("Failed to update role");
        }

        return ResponseEntity.ok(updatedRole);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete role by id")
    @ApiResponse(responseCode = "200", description = "Return true if delete successfully")
    @ApiResponse(responseCode = "400", description = "Return error message if delete failed")
    public ResponseEntity<?> delete(@PathVariable UUID id) {

        var result = roleService.delete(id);

        if (!result) {
            return ResponseEntity.badRequest().body("Failed to delete role");
        }

        return ResponseEntity.ok(result);
    }
}
