package com.mp.Ecommerce_Backend.repository;
import com.mp.Ecommerce_Backend.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}