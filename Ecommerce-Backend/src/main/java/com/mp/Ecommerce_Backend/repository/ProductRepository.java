package com.mp.Ecommerce_Backend.repository;

import com.mp.Ecommerce_Backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN p.sizes s " +
            "WHERE (:category IS NULL OR :category = '' OR p.category.name = :category) " +
            "AND (:minPrice IS NULL OR :maxPrice IS NULL OR p.discountedPrice BETWEEN :minPrice AND :maxPrice) " +
            "AND (:minDiscount IS NULL OR p.discountPercent >= :minDiscount) " +
            "AND (:colors IS NULL OR :colors = '' OR LOWER(p.color) IN :colors) " +
            "AND (:sizes IS NULL OR :sizes = '' OR LOWER(s) IN :sizes) " +
            "ORDER BY " +
            "CASE WHEN :sort = 'price_low' THEN p.discountedPrice END ASC, " +
            "CASE WHEN :sort = 'price_high' THEN p.discountedPrice END DESC")
    List<Product> filterProducts(
            @Param("category") String category,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice,
            @Param("minDiscount") Integer minDiscount,
            @Param("sort") String sort,
            @Param("colors") List<String> colors,
            @Param("sizes") List<String> sizes);


}
