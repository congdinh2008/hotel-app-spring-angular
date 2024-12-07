package com.congdinh.hotelapp.controllers;

import java.util.*;

import org.springframework.data.domain.*;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.congdinh.hotelapp.dtos.hotelservice.*;
import com.congdinh.hotelapp.dtos.user.UserMasterDTO;
import com.congdinh.hotelapp.mapper.CustomPagedResponse;
import com.congdinh.hotelapp.services.HotelServiceService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/hotel-services")
@Tag(name = "Services", description = "APIs for managing services")
public class HotelServicesController {
    private final HotelServiceService hotelServiceService;
    private final PagedResourcesAssembler<HotelServiceMasterDTO> pagedResourcesAssembler;

    public HotelServicesController(HotelServiceService hotelServiceService, PagedResourcesAssembler<HotelServiceMasterDTO> pagedResourcesAssembler) {
        this.hotelServiceService = hotelServiceService;
        this.pagedResourcesAssembler = pagedResourcesAssembler;
    }

    @GetMapping
    @Operation(summary = "Get all hotelServices")
    @ApiResponse(responseCode = "200", description = "Return all hotelServices")
    public ResponseEntity<List<HotelServiceMasterDTO>> getAll() {
        var hotelServices = hotelServiceService.findAll();
        return ResponseEntity.ok(hotelServices);
    }

    // localhost:8080/api/v1/hotelServices/search?keyword=101
    @GetMapping("/searchByHotelServiceName")
    @Operation(summary = "Search hotelServices by hotel service name")
    @ApiResponse(responseCode = "200", description = "Return hotelServices that match the hotelService number")
    public ResponseEntity<List<HotelServiceMasterDTO>> searchByHotelServiceName(
            @RequestParam(required = false) String keyword) {
        var hotelServices = hotelServiceService.findByName(keyword);
        return ResponseEntity.ok(hotelServices);
    }

    // localhost:8080/api/v1/hotelServices/search?keyword=101&page=0&size=10
    @GetMapping("/search")
    @Operation(summary = "Search hotel service with pagination")
    @ApiResponse(responseCode = "200", description = "Return hotel service that match the keyword with pagination")
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

        var hotelServices = hotelServiceService.findPaginated(keyword, pageable);

        var pagedModel = pagedResourcesAssembler.toModel(hotelServices);

        // Get data, page, and links from pagedModel
        Collection<EntityModel<HotelServiceMasterDTO>> data = pagedModel.getContent();

        var links = pagedModel.getLinks();

        var response = new CustomPagedResponse<EntityModel<HotelServiceMasterDTO>>(data, pagedModel.getMetadata(), links);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get hotelService by id")
    @ApiResponse(responseCode = "200", description = "Return hotel service that match the id")
    public ResponseEntity<HotelServiceMasterDTO> getById(@RequestParam String id) {
        var hotelService = hotelServiceService.findById(id);
        return ResponseEntity.ok(hotelService);
    }

    @PostMapping()
    @Operation(summary = "Create new hotelService")
    @ApiResponse(responseCode = "200", description = "Return created hotel service")
    @ApiResponse(responseCode = "400", description = "Return error message if create failed")
    public ResponseEntity<?> create(@Valid @RequestBody HotelServiceCreateUpdateDTO hotelServiceDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        var newHotelService = hotelServiceService.create(hotelServiceDTO);

        if (newHotelService == null) {
            return ResponseEntity.badRequest().body("Failed to create hotel service");
        }

        return ResponseEntity.ok(newHotelService);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update hotelService by id")
    @ApiResponse(responseCode = "200", description = "Return updated hotel service")
    @ApiResponse(responseCode = "400", description = "Return error message if update failed")
    public ResponseEntity<?> update(
            @PathVariable UUID id,
            @Valid @RequestBody HotelServiceCreateUpdateDTO hotelServiceDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        var updatedHotelService = hotelServiceService.update(id, hotelServiceDTO);

        if (updatedHotelService == null) {
            return ResponseEntity.badRequest().body("Failed to update hotel service");
        }

        return ResponseEntity.ok(updatedHotelService);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete hotelService by id")
    @ApiResponse(responseCode = "200", description = "Return true if delete successfully")
    @ApiResponse(responseCode = "400", description = "Return error message if delete failed")
    public ResponseEntity<?> delete(@PathVariable UUID id) {

        var result = hotelServiceService.delete(id);

        if (!result) {
            return ResponseEntity.badRequest().body("Failed to delete hotel service");
        }

        return ResponseEntity.ok(result);
    }
}
