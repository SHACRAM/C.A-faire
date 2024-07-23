package com.C.A_faire.api.rest.controller;


import com.C.A_faire.api.rest.model.User;
import com.C.A_faire.api.rest.repository.UserRepository;
import com.C.A_faire.api.rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * read - Get all Users
     * @return An Iterable object of User
     */
    @GetMapping("/users")
    public Iterable<User> getUsers(){
        return userService.getUsers();
    }

    /**
     * Read - Get one User
     * @param id The id of the user
     * @return An user object
     */

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable("id") final Integer id){
        Optional <User> user = userService.getUser(id);
        if(user.isPresent()){
            return user.get();
        } else {
            return null;
        }
    }


    /**
     * Create - Add a new user
     * @param user An object user
     * @return The user object saved
     */
    @PostMapping("/user")
    public User createUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @PutMapping("/user/{id}")
    public User updateUser(@PathVariable("id") final Integer id, @RequestBody User user){
        Optional<User> u = userService.getUser(id);
        if(u.isPresent()){
            User currentUser = u.get();

            String enterprise = user.getEnterprise();
            if(enterprise != null)
            {
                currentUser.setEnterprise(enterprise);
            }
            String  email = user.getEmail();
            if(email != null){
                currentUser.setEmail(email);
            }
            String  password = user.getPassword();
            if(password != null){
                currentUser.setPassword(password);
            }
            userService.saveUser(currentUser);
            return currentUser;
        } else{
            return null;
        }
    }

    /**
     * Delete - delete an user
     * @param id - The id of the user to delete
     */
    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable("id") final Integer id){
        userService.deleteUser(id);
    }




}
