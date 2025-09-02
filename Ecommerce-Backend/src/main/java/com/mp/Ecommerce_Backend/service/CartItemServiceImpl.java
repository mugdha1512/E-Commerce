package com.mp.Ecommerce_Backend.service;

import com.mp.Ecommerce_Backend.exception.CartItemException;
import com.mp.Ecommerce_Backend.exception.UserException;
import com.mp.Ecommerce_Backend.model.Cart;
import com.mp.Ecommerce_Backend.model.CartItem;
import com.mp.Ecommerce_Backend.model.Product;
import com.mp.Ecommerce_Backend.model.User;
import com.mp.Ecommerce_Backend.repository.CartRepository;
import com.mp.Ecommerce_Backend.repository.CartItemRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService{

    private CartItemRepository cartItemRepository;
    private UserService userService;
    private CartRepository cartRepository;

    public CartItemServiceImpl(CartItemRepository cartItemRepository, UserService userService, CartRepository cartRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.cartRepository = cartRepository;
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
        cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice()*cartItem.getQuantity());

        CartItem createdCartItem = cartItemRepository.save(cartItem);
        return createdCartItem;
    }

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {
            CartItem item = findCartItemById(id);
        User user = userService.findUserById(item.getUserid());
        if(user.getId()==(userId)){
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(item.getQuantity()*item.getProduct().getPrice());
            item.setDiscountedPrice(item.getProduct().getDiscountedPrice()*item.getQuantity());
        }
        return cartItemRepository.save(item);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId)
    {
        CartItem cartItem = cartItemRepository.isCartItemExist(cart,product,size,userId);
        return cartItem;
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
        CartItem cartItem = findCartItemById(cartItemId);

        User user =userService.findUserById(cartItem.getUserid());

        User requUser = userService.findUserById(userId);

        if(user.getId()==(requUser.getId())){
            cartItemRepository.deleteById(cartItemId);
        }
        else{
            throw new UserException("You can't remove another users item");
        }
    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws CartItemException {
        Optional<CartItem> opt = cartItemRepository.findById(cartItemId);

        if (opt.isPresent()) {
            return opt.get();
        }
        throw new CartItemException("cartItem not found with id: " + cartItemId);
        }

}
