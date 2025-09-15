package com.mp.Ecommerce_Backend.service;

import com.mp.Ecommerce_Backend.exception.CartItemException;
import com.mp.Ecommerce_Backend.exception.UserException;
import com.mp.Ecommerce_Backend.exception.ProductException;
import com.mp.Ecommerce_Backend.model.Cart;
import com.mp.Ecommerce_Backend.model.CartItem;
import com.mp.Ecommerce_Backend.model.Product;
import com.mp.Ecommerce_Backend.model.User;
import com.mp.Ecommerce_Backend.repository.CartRepository;
import com.mp.Ecommerce_Backend.repository.CartItemRepository;
import com.mp.Ecommerce_Backend.request.AddItemRequest;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService {

    private CartItemRepository cartItemRepository;
    private UserService userService;
    private CartRepository cartRepository;
    private final ProductService productService;

    public CartItemServiceImpl(CartItemRepository cartItemRepository,
                               UserService userService,
                               CartRepository cartRepository,
                               ProductService productService) {
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.cartRepository = cartRepository;
        this.productService = productService;
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
        cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice() * cartItem.getQuantity());
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {
        CartItem item = findCartItemById(id);
        User user = userService.findUserById(item.getUserid());
        if (user.getId()==(userId)) {
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(item.getQuantity() * item.getProduct().getPrice());
            item.setDiscountedPrice(item.getProduct().getDiscountedPrice() * item.getQuantity());
            // You can update size or other fields here if needed
            return cartItemRepository.save(item);
        } else {
            throw new UserException("You are not authorized to update this cart item");
        }
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) {
        return cartItemRepository.isCartItemExist(cart, product, size, userId);
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
        CartItem cartItem = findCartItemById(cartItemId);
        User user = userService.findUserById(cartItem.getUserid());
        User requUser = userService.findUserById(userId);
        if (user.getId()==(requUser.getId())) {
            cartItemRepository.deleteById(cartItemId);
        } else {
            throw new UserException("You can't remove another user's item");
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

    // New method to add cart item from AddItemRequest
    @Override
    public void addCartItem(Long userId, AddItemRequest req) throws ProductException, UserException {
        Cart cart = cartRepository.findByUserId(userId);

        if (cart == null) {
            User user = new User();
            user.setId(userId);
            cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }

        Product product = productService.findProductById(req.getProductId());

        Integer quantity = req.getQuantity();
        if (quantity == null || quantity < 1) {
            quantity = 1;
        }

        CartItem isPresent = isCartItemExist(cart, product, req.getSize(), userId);

        if (isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            cartItem.setQuantity(quantity);
            cartItem.setUserid(userId);
            cartItem.setSize(req.getSize());
            int price = quantity * product.getDiscountedPrice();
            cartItem.setPrice(price);
            cartItem.setDiscountedPrice(price);

            CartItem createdCartItem = createCartItem(cartItem);
            cart.getCartItems().add(createdCartItem);
            cartRepository.save(cart);
        } else {
            // Optionally update the quantity if the item already exists
            isPresent.setQuantity(isPresent.getQuantity() + quantity);
            isPresent.setPrice(isPresent.getQuantity() * product.getPrice());
            isPresent.setDiscountedPrice(isPresent.getQuantity() * product.getDiscountedPrice());
            cartItemRepository.save(isPresent);
        }
    }

    // New method to update cart item from AddItemRequest
    @Override
    public CartItem updateCartItem(Long userId, Long id, AddItemRequest req) throws CartItemException, UserException {
        CartItem existingCartItem = findCartItemById(id);
        User user = userService.findUserById(existingCartItem.getUserid());
        if (user.getId()!=(userId)) {
            throw new UserException("You are not authorized to update this cart item");
        }

        if (req.getQuantity() != null && req.getQuantity() > 0) {
            existingCartItem.setQuantity(req.getQuantity());
        }

        if (req.getSize() != null) {
            existingCartItem.setSize(req.getSize());
        }

        // Update prices accordingly
        existingCartItem.setPrice(existingCartItem.getQuantity() * existingCartItem.getProduct().getPrice());
        existingCartItem.setDiscountedPrice(existingCartItem.getQuantity() * existingCartItem.getProduct().getDiscountedPrice());

        return cartItemRepository.save(existingCartItem);
    }




}
