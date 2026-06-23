package com.talentotech.api.controller;
import org.springframework.web.bind.annotation.*;
import com.talentotech.api.service.RegionService;
import com.talentotech.api.model.Region;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/region")
public class RegionController {

    private final RegionService regionService;

    public RegionController(RegionService regionService) {
        this.regionService = regionService;
    }

    @PostMapping
    public Region create(@RequestBody Region region) {
        return regionService.save(region);
    }

    @GetMapping
    public List<Region> findAll() {
        return regionService.findAll();
    }

    @GetMapping("/{id}")
    public Region findById(@PathVariable Long id) {
        return regionService.findById(id);
    }

    @GetMapping("/country/{countryId}")
    public List<Region> findByCountry(@PathVariable Long countryId) {
        return regionService.findByCountry(countryId);
    }
}
