package com.mp.Ecommerce_Backend.service;

import com.mp.Ecommerce_Backend.exception.ProductException;
import com.mp.Ecommerce_Backend.model.Cart;
import com.mp.Ecommerce_Backend.model.CartItem;
import com.mp.Ecommerce_Backend.model.Product;
import com.mp.Ecommerce_Backend.model.User;
import com.mp.Ecommerce_Backend.repository.CartRepository;
import com.mp.Ecommerce_Backend.request.AddItemRequest;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemService cartItemService;
    private final ProductService productService;

    public CartServiceImpl(CartRepository cartRepository, CartItemService cartItemService, ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Long userId, AddItemRequest req) throws ProductException {
        Cart cart = cartRepository.findByUserId(userId);

        // If cart does not exist, create one with a new User object
        if (cart == null) {
            User user = new User();   // ✅ create empty user
            user.setId(userId);       // ✅ just set the id
            cart = createCart(user);
        }

        Product product = productService.findProductById(req.getProductId());

        CartItem isPresent = cartItemService.isCartItemExist(cart, product, req.getSize(), userId);

        if (isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            cartItem.setQuantity(req.getQuantity());
            cartItem.setUserid(userId);

            int price = req.getQuantity() * product.getDiscountedPrice();
            cartItem.setPrice(price);
            cartItem.setSize(req.getSize());

            CartItem createdcartItem = cartItemService.createCartItem(cartItem);
            cart.getCartItems().add(createdcartItem);
        }
        return "Item Added To Cart";
    }


    @Override
    public Cart findUserCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);

        if (cart == null) {
            throw new RuntimeException("Cart not found for user id " + userId);
        }

        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getPrice();
            totalDiscountedPrice += cartItem.getDiscountedPrice();
            totalItem += cartItem.getQuantity();
        }

        cart.setTotalPrice(totalPrice);
        cart.setTotalDiscountedPrice(totalDiscountedPrice);
        cart.setTotalItem(totalItem);
        cart.setDicsount(totalPrice-totalDiscountedPrice);

        return cartRepository.save(cart);
    }
}
