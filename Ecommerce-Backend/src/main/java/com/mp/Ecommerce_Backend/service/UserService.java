package com.mp.Ecommerce_Backend.service;

import com.mp.Ecommerce_Backend.exception.UserException;
import com.mp.Ecommerce_Backend.model.User;

public interface UserService {
    public User findUserById(Long userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;
}
