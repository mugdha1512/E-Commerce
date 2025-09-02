package com.mp.Ecommerce_Backend.repository;

import com.mp.Ecommerce_Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
