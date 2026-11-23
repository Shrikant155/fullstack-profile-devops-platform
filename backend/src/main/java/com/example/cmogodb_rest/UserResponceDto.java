package com.example.cmogodb_rest;

public class UserResponceDto {
    private String id;
    private String name;
    private Integer age;

    // Constructor
    public UserResponceDto(String id, String name, Integer age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getAge() {
        return age;
    }
}