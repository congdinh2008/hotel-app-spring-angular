package com.congdinh.hotelapp.mapper;

import java.util.Collection;
import org.springframework.hateoas.Links;
import org.springframework.hateoas.PagedModel;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomPagedResponse<T> {
    private Collection<T> data;

    private PagedModel.PageMetadata page;

    private Links links;
}
