package com.pingzero.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String manufacturer;

    // Relación N:1 → muchos productos pertenecen a una categoría
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // Constructor vacío
    public Product() {}

    // Constructor
    public Product(String name, String manufacturer, Category category) {
        this.name = name;
        this.manufacturer = manufacturer;
        this.category = category;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}