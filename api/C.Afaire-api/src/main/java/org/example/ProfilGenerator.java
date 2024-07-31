package org.example;

import com.github.javafaker.Faker;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

class User {
    int userId; // Ajout de userId
    String nomSalon;
    String adresseSalon;
    java.util.Date dateOuverture;
    int nombreEmployes;
    String prenomGerant;
    String nomGerant;

    User(int userId, String nomSalon, String adresseSalon, java.util.Date dateOuverture, int nombreEmployes, String prenomGerant, String nomGerant) {
        this.userId = userId; // Initialisation de userId
        this.nomSalon = nomSalon;
        this.adresseSalon = adresseSalon;
        this.dateOuverture = dateOuverture;
        this.nombreEmployes = nombreEmployes;
        this.prenomGerant = prenomGerant;
        this.nomGerant = nomGerant;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId + // Affichage de userId
                ", nomSalon='" + nomSalon + '\'' +
                ", adresseSalon='" + adresseSalon + '\'' +
                ", dateOuverture=" + dateOuverture +
                ", nombreEmployes=" + nombreEmployes +
                ", prenomGerant='" + prenomGerant + '\'' +
                ", nomGerant='" + nomGerant + '\'' +
                '}';
    }
}

public class ProfilGenerator {

    public static void main(String[] args) {
        List<User> users = new ArrayList<>();
        int numberOfUsers = 15;
        Random random = new Random();
        Faker faker = new Faker();

        for (int i = 1; i <= numberOfUsers; i++) { // Début à 1 pour userId
            String nomSalon = faker.company().bs();
            String adresseSalon = faker.address().fullAddress();
            java.util.Date dateOuverture = faker.date().past(365 * 10, java.util.concurrent.TimeUnit.DAYS);
            int nombreEmployes = getRandomInt(2, 30, random);
            String prenomGerant = faker.name().firstName();
            String nomGerant = faker.name().lastName();

            User user = new User(i, nomSalon, adresseSalon, dateOuverture, nombreEmployes, prenomGerant, nomGerant);
            users.add(user);
        }

        System.out.println(users);

        try {
            insertUsersIntoDB(users);
        } catch (SQLException e) {
            System.err.println("Erreur lors de l'insertion des utilisateurs: " + e.getMessage());
        }
    }

    public static int getRandomInt(int min, int max, Random random) {
        return random.nextInt((max - min) + 1) + min;
    }

    public static void insertUsersIntoDB(List<User> users) throws SQLException {
        String url = "jdbc:mysql://localhost:8889/CAfaire";
        String username = "Sebastien";
        String password = "A@49nPg0?";

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            String sql = "INSERT INTO profile (user_id, nomSalon, adresseSalon, dateOuverture, nombreEmployes, prenomGerant, nomGerant) VALUES (?, ?, ?, ?, ?, ?, ?)";

            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                for (User user : users) {
                    statement.setInt(1, user.userId); // Ajout de userId
                    statement.setString(2, user.nomSalon);
                    statement.setString(3, user.adresseSalon);
                    statement.setDate(4, new java.sql.Date(user.dateOuverture.getTime()));
                    statement.setInt(5, user.nombreEmployes);
                    statement.setString(6, user.prenomGerant);
                    statement.setString(7, user.nomGerant);
                    statement.executeUpdate();
                }
                System.out.println("Tous les utilisateurs ont été insérés avec succès.");
            }
        }
    }
}
