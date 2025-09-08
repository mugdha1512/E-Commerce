package com.mp.Ecommerce_Backend.repository;

import com.mp.Ecommerce_Backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CartRepository extends JpaRepository<Cart, Long> {
    @Query("SELECT c FROM Cart c WHERE c.user.id=:userId")
     public Cart findByUserId(@Param("userId") Long userId);



}
