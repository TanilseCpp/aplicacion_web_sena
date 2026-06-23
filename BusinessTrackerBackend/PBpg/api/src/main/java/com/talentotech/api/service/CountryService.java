package com.talentotech.api.service;
import org.springframework.stereotype.Service;
import java.util.List;
import com.talentotech.api.repository.CountryRepository;
import com.talentotech.api.model.Country;
import com.talentotech.api.exception.ResourceNotFoundException;
@Service
public class CountryService {

    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public Country save(Country country) {

        if (countryRepository.existsByName(country.getName())) {
            throw new ResourceNotFoundException("el país ya existe");
        }

        return countryRepository.save(country);
    }

    public List<Country> findAll() {
        return countryRepository.findAll();
    }

    public Country findById(Long id) {
        return countryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("País no encontrado"));
    }
}
