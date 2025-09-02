package com.mp.Ecommerce_Backend.controller;


import com.mp.Ecommerce_Backend.exception.ProductException;
import com.mp.Ecommerce_Backend.exception.UserException;
import com.mp.Ecommerce_Backend.model.Review;
import com.mp.Ecommerce_Backend.model.User;
import com.mp.Ecommerce_Backend.request.ReviewRequest;
import com.mp.Ecommerce_Backend.service.ReviewService;
import com.mp.Ecommerce_Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Review> createReviewReview(@RequestBody ReviewRequest req,
                                                     @RequestHeader("Authorization") String jwt)throws UserException, ProductException{
        User user = userService.findUserProfileByJwt(jwt);
        Review review = reviewService.createReview(req, user);
        return new ResponseEntity<>(review, HttpStatus.CREATED);

    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getProductsReview(@PathVariable Long productId)
            throws UserException, ProductException {
        List<Review> reviews = reviewService.getAllReview(productId);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }




}
