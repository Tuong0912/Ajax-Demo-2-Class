package com.example.ajaxpractice_96.controller;

import com.example.ajaxpractice_96.model.Product;
import com.example.ajaxpractice_96.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private IProductService iProductService;

    @GetMapping()
    public ResponseEntity<Iterable<Product>> findAll() {
        return new ResponseEntity<>(iProductService.findAll(), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Void> create(@RequestBody Product product) {
        this.iProductService.save(product);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("{id}")
    public ResponseEntity<Optional<Product>> findById(@PathVariable Long id) {
        return new ResponseEntity<>(this.iProductService.findById(id), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody Product product) {
        if (this.iProductService.findById(id).isPresent()) {
            product.setId(id);
            this.iProductService.save(product);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        this.iProductService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
