package com.mp.Ecommerce_Backend.service;

import com.mp.Ecommerce_Backend.config.JwtProvider;
import com.mp.Ecommerce_Backend.exception.UserException;
import com.mp.Ecommerce_Backend.model.User;
import com.mp.Ecommerce_Backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserServiceImpl implements UserService{
        private UserRepository userRepository;
        private JwtProvider jwtProvider;

    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User findUserById(Long userId) throws UserException {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            return user.get();
        }
        throw new UserException("user not found with id:"+userId);
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email =jwtProvider.getEmailFromToken(jwt);

        User user =userRepository.findByEmail(email);

        if(user==null){
            throw new UserException("User Not Found with Email "+email);
        }
        return  user;
    }
}
