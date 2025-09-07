package com.mp.Ecommerce_Backend.service;

import com.mp.Ecommerce_Backend.exception.OrderException;
import com.mp.Ecommerce_Backend.model.*;
import com.mp.Ecommerce_Backend.repository.AddressRepository;
import com.mp.Ecommerce_Backend.repository.OrderRepository;
import com.mp.Ecommerce_Backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            CartService cartService,
                            AddressRepository addressRepository,
                            UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Order createOrder(User user, Address shippAddress) {
        // Save shipping address and link to user
        shippAddress.setUser(user);
        Address savedAddress = addressRepository.save(shippAddress);

        user.getAddress().add(savedAddress);
        userRepository.save(user);

        // Fetch user's cart and prepare order items list
        Cart cart = cartService.findUserCart(user.getId());
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setSize(cartItem.getSize());
            orderItem.setPrice(cartItem.getPrice());
            orderItem.setDiscountedPrice(cartItem.getDiscountedPrice());
            orderItem.setUserId(cartItem.getUserid());

            orderItems.add(orderItem);
        }

        // Create order and set properties
        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(savedAddress);
        order.setOrderDate(LocalDateTime.now());
        order.setCreatedAt(LocalDateTime.now());
        order.setOrderStatus("PENDING");
        order.getPaymentDetails().setStatus("PENDING");

        order.setTotalPrice(cart.getTotalPrice());
        order.setTotalItem(cart.getTotalItem());
        order.setDiscount(cart.getDicsount());
        order.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());

        // Link each order item to order before saving
        for (OrderItem item : orderItems) {
            item.setOrder(order);
        }
        order.setOrderItems(orderItems);

        // Save order (cascades and saves orderItems)
        Order savedOrder = orderRepository.save(order);

        return savedOrder;
    }

    @Override
    public Order placedOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        order.setOrderStatus("PLACED");
        order.getPaymentDetails().setStatus("COMPLETED");
        return orderRepository.save(order);
    }

    @Override
    public Order confirmedOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        order.setOrderStatus("CONFIRMED");
        return orderRepository.save(order);
    }

    @Override
    public Order shippedOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        order.setOrderStatus("SHIPPED");
        return orderRepository.save(order);
    }

    @Override
    public Order deliveredOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        order.setOrderStatus("DELIVERED");
        return orderRepository.save(order);
    }

    @Override
    public Order cancelOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        order.setOrderStatus("CANCELED");
        return orderRepository.save(order);
    }

    @Override
    public Order findOrderById(Long orderId) throws OrderException {
        return orderRepository.findById(orderId).orElseThrow(
                () -> new OrderException("Order not found with id " + orderId));
    }

    @Override
    public List usersOrderHistory(Long userId) {
        return orderRepository.getUsersOrders(userId);
    }

    @Override
    public List getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public void deleteOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        orderRepository.delete(order);
    }
}
