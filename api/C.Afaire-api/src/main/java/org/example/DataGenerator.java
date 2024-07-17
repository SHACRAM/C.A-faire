package org.example;
import com.github.javafaker.Faker;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;

public class DataGenerator {
    public static void main(String[] args) {
        int userNumber = 15;
        Faker faker = new Faker();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        List<Map<String, String>> users = new ArrayList<>();

        for (int i = 0; i < userNumber; i++) {
            Map<String, String> user = new HashMap<>();
                    String nomEntreprise = faker.company().name();
                    String email = faker.internet().emailAddress(nomEntreprise);
                    String password = faker.internet().password(8,15,true,true);
                    String hashedPassword = passwordEncoder.encode(password);
            user.put("enterprise", nomEntreprise);
            user.put("email", email);
            user.put("password", hashedPassword);
            users.add(user);
        }

        try
                (Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:8889/C.A-faire?useSSL=false", "Sebastien", "A@49nPg0?");
            PreparedStatement preparedStatement = connect.prepareStatement("INSERT INTO users (enterprise, email, password) VALUES (?,?,?)")){

            for(Map<String, String> user : users){
                preparedStatement.setString(1, user.get("enterprise"));
                preparedStatement.setString(2, user.get("email"));
                preparedStatement.setString(3, user.get("password"));
                preparedStatement.addBatch();
            }
            int [] result = preparedStatement.executeBatch();
            if (result.length > 0){
                System.out.println("Users inserted successfully");
            }else {
                System.out.println("No users inserted");
            }

        }catch (SQLException ex){
            ex.printStackTrace(System.err);
        }

    }
}