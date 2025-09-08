package com.mp.Ecommerce_Backend.service;

import com.mp.Ecommerce_Backend.exception.ProductException;
import com.mp.Ecommerce_Backend.model.Product;
import com.mp.Ecommerce_Backend.model.Review;
import com.mp.Ecommerce_Backend.model.User;
import com.mp.Ecommerce_Backend.repository.ProductRepository;
import com.mp.Ecommerce_Backend.repository.ReviewRepository;
import com.mp.Ecommerce_Backend.request.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService{

    private ReviewRepository reviewRepository;
    private ProductService productService;
    private ProductRepository productRepository;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository, ProductService productService, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @Override
    public Review createReview(ReviewRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReview(req.getReview());
        review.setCreatedAt(LocalDateTime.now());


        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllReview(Long productId) {
        return reviewRepository.getAllProductsReview(productId);
    }
}
