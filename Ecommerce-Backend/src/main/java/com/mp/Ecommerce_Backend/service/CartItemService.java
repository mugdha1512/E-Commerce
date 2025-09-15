package com.mp.Ecommerce_Backend.service;

import com.mp.Ecommerce_Backend.exception.CartItemException;
import com.mp.Ecommerce_Backend.exception.UserException;
import com.mp.Ecommerce_Backend.exception.ProductException;
import com.mp.Ecommerce_Backend.model.Cart;
import com.mp.Ecommerce_Backend.model.CartItem;
import com.mp.Ecommerce_Backend.model.Product;
import com.mp.Ecommerce_Backend.request.AddItemRequest;

public interface CartItemService {

    CartItem createCartItem(CartItem cartItem);

    CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;

    CartItem isCartItemExist(Cart cart, Product product, String size, Long userId);

    void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException;

    CartItem findCartItemById(Long cartItemId) throws CartItemException;

    // New method to add cart item from AddItemRequest
    void addCartItem(Long userId, AddItemRequest req) throws ProductException, UserException;

    // New method to update cart item from AddItemRequest
    CartItem updateCartItem(Long userId, Long id, AddItemRequest req) throws CartItemException, UserException;
}
