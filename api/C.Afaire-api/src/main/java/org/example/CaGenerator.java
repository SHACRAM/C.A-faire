package org.example;

import com.github.javafaker.Faker;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

/**
 * Permet de générer les fausses données à inserrer dans la base de données
 */
public class CaGenerator {
    public static void main(String[] args) {
        Faker faker = new Faker();
        int numberClient = 15;
        List<Map<String, Object>> cas = new ArrayList<>();

        for (int i = 0; i < numberClient; i++) {
            Map<String, Object> ca = new HashMap<>();
            BigDecimal montant = new BigDecimal(faker.number().numberBetween(10000, 45000))
                    .setScale(2, RoundingMode.HALF_UP);
            Date fakerDate = new Date(faker.date().past(365, java.util.concurrent.TimeUnit.DAYS).getTime());
            LocalDate caDate = fakerDate.toLocalDate();
            int user_id = i + 1;
            ca.put("montant", montant);
            ca.put("datePeriode", fakerDate);
            ca.put("user_id", user_id);
            cas.add(ca);
        }
/**
 * Crée la connection avec la base de données et y insert les données
 */
        String url = "jdbc:mysql://localhost:8889/CAfaire?useSSL=false";
        String user = "Sebastien";
        String password = "A@49nPg0?";

        try (Connection connect = DriverManager.getConnection(url, user, password);
             PreparedStatement preparedStatement = connect.prepareStatement("INSERT INTO ChiffreAffaire (montant, datePeriode, user_id) VALUES (?,?,?)")) {

            for (Map<String, Object> ca : cas) {
                preparedStatement.setBigDecimal(1, (BigDecimal) ca.get("montant"));
                preparedStatement.setDate(2, (Date) ca.get("datePeriode"));
                preparedStatement.setInt(3, (Integer) ca.get("user_id"));
                preparedStatement.addBatch();
            }

            int[] result = preparedStatement.executeBatch();
            if (result.length > 0) {
                System.out.println("Records inserted successfully");
            } else {
                System.out.println("No records inserted");
            }

        } catch (SQLException ex) {
            ex.printStackTrace(System.err);
        }
    }
}
