package com.mp.Ecommerce_Backend.service;

import com.mp.Ecommerce_Backend.exception.ProductException;
import com.mp.Ecommerce_Backend.model.Product;
import com.mp.Ecommerce_Backend.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    Product createProduct(Product product);

    // NEW ADDED: Overloaded for CreateProductRequest
    Product createProduct(CreateProductRequest request);

    String deleteProduct(Long productId) throws ProductException;

    Product updateProduct(Long productId, Product product) throws ProductException;

    Product findProductById(Long id) throws ProductException;

    List<Product> findProductByCategory(String category);

    Page<Product> getAllProduct(
            String category,
            List<String> colors,
            List<String> sizes,
            Integer minPrice,
            Integer maxPrice,
            Integer minDiscount,
            String sort,
            String stock,
            Integer pageNumber,
            Integer pageSize
    );

    // NEW ADDED: Get all products
    List<Product> findAllProducts();
}
