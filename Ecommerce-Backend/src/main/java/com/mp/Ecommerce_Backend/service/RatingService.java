package com.mp.Ecommerce_Backend.service;

import com.mp.Ecommerce_Backend.exception.ProductException;
import com.mp.Ecommerce_Backend.model.Rating;
import com.mp.Ecommerce_Backend.model.User;   // ✅ use your entity
import com.mp.Ecommerce_Backend.request.RatingRequest;

import java.util.List;

public interface RatingService {
    Rating createRating(RatingRequest req, User user) throws ProductException;

    List<Rating> getProductsRating(Long productId);
}
