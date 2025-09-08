package com.mp.Ecommerce_Backend.service;

import com.mp.Ecommerce_Backend.exception.ProductException;
import com.mp.Ecommerce_Backend.model.Product;
import com.mp.Ecommerce_Backend.model.Rating;
import com.mp.Ecommerce_Backend.repository.RatingRepository;
import com.mp.Ecommerce_Backend.request.RatingRequest;
import com.mp.Ecommerce_Backend.model.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {
    private RatingRepository ratingRepository;
    private ProductService productService;

    public RatingServiceImpl(RatingRepository ratingRepository, ProductService productService) {
        this.ratingRepository = ratingRepository;
        this.productService = productService;
    }

    @Override
    public Rating createRating(RatingRequest req, User user) throws ProductException {
        Product product =productService.findProductById(req.getProductId());

        Rating rating = new Rating();
        rating.setProduct(product);
        rating.setUser(user);
        rating.setRatings(req.getRating());
        rating.setCreatedAt(LocalDateTime.now());

        return ratingRepository.save(rating);
    }

    @Override
    public List<Rating> getProductsRating(Long productId) {

        return ratingRepository.getAllProductsRating(productId);
    }
}
