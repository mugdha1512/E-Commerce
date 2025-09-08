package com.mp.Ecommerce_Backend.service;

import com.mp.Ecommerce_Backend.exception.CartItemException;
import com.mp.Ecommerce_Backend.exception.UserException;
import com.mp.Ecommerce_Backend.model.Cart;
import com.mp.Ecommerce_Backend.model.CartItem;
import com.mp.Ecommerce_Backend.model.Product;

public interface CartItemService {
    public CartItem createCartItem(CartItem cartItem);

    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;

    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId);

    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException;

    public CartItem findCartItemById(Long cartItemId) throws CartItemException;

}
