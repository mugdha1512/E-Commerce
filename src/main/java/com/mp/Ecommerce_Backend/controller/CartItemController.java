package com.mp.Ecommerce_Backend.controller;

import com.mp.Ecommerce_Backend.exception.CartItemException;
import com.mp.Ecommerce_Backend.exception.ProductException;
import com.mp.Ecommerce_Backend.exception.UserException;
import com.mp.Ecommerce_Backend.model.CartItem;
import com.mp.Ecommerce_Backend.request.AddItemRequest;
import com.mp.Ecommerce_Backend.response.ApiResponse;
import com.mp.Ecommerce_Backend.service.CartItemService;
import com.mp.Ecommerce_Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart_items")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private UserService userService;

    // Get cart item by ID
    @GetMapping("/{id}")
    public ResponseEntity<CartItem> getCartItemById(@PathVariable Long id) throws CartItemException {
        CartItem cartItem = cartItemService.findCartItemById(id);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    // Add an item to cart
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req,
                                                     @RequestHeader("Authorization") String authorizationHeader)
            throws UserException, CartItemException, ProductException {
        Long userId = extractUserIdFromAuth(authorizationHeader);
        cartItemService.addCartItem(userId, req);

        ApiResponse response = new ApiResponse();
        response.setMessage("Item added to cart");
        response.setStatus(true);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    // Update cart item by ID
    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long id,
                                                   @RequestBody AddItemRequest req,
                                                   @RequestHeader("Authorization") String authorizationHeader)
            throws CartItemException, UserException {
        Long userId = extractUserIdFromAuth(authorizationHeader);
        CartItem updated = cartItemService.updateCartItem(userId, id, req);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    // Remove cart item by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCartItem(@PathVariable Long id,
                                                      @RequestHeader("Authorization") String authorizationHeader)
            throws CartItemException, UserException {
        Long userId = extractUserIdFromAuth(authorizationHeader);
        cartItemService.removeCartItem(userId, id);

        ApiResponse response = new ApiResponse();
        response.setMessage("Item removed from cart");
        response.setStatus(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Helper method to extract userId from JWT token in the Authorization header
    private Long extractUserIdFromAuth(String authorizationHeader) throws UserException {
        if (authorizationHeader == null || authorizationHeader.isBlank()) {
            throw new UserException("Missing Authorization header");
        }
        String token = authorizationHeader.startsWith("Bearer ")
                ? authorizationHeader.substring(7).trim()
                : authorizationHeader.trim();

        // Your UserService does not currently have findUserIdByToken, so we use findUserProfileByJwt and then get id
        return userService.findUserProfileByJwt(token).getId();
    }
}
