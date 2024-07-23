package com.C.A_faire.api.rest.service;


import com.C.A_faire.api.rest.model.User;
import com.C.A_faire.api.rest.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Data
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUser(final Integer id){
        return userRepository.findById(id);
    }

    public Iterable<User> getUsers(){
        return userRepository.findAll();
    }

    public void deleteUser(final Integer id){
        userRepository.deleteById(id);
    }

    public User saveUser(User user){
        User savedUser = userRepository.save(user);
        return savedUser;
    }


}
