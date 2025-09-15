package com.mp.Ecommerce_Backend.repository;

import com.mp.Ecommerce_Backend.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
