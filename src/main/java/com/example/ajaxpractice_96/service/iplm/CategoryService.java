package com.example.ajaxpractice_96.service.iplm;

import com.example.ajaxpractice_96.model.Category;
import com.example.ajaxpractice_96.repository.ICategoryRepository;
import com.example.ajaxpractice_96.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository iCategoryRepository;

    @Override
    public Iterable<Category> findAll() {
        return iCategoryRepository.findAll();
    }

    @Override
    public Optional<Category> findById(Long id) {
        return iCategoryRepository.findById(id);
    }

    @Override
    public void save(Category category) {
        iCategoryRepository.save(category);
    }

    @Override
    public void delete(Long id) {
        iCategoryRepository.deleteById(id);
    }
}
