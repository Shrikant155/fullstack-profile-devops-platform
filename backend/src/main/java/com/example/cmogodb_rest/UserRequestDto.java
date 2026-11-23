package com.example.cmogodb_rest;



import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class UserRequestDto {
    @NotBlank (message = "cannot blank")
    private  String name;
    @Min(value = 18)
    private  Integer age;

    public  String getName(){
        return  name;
    }
    public  Integer getAge() {
        return  age;
    }

    public  void setName(String name){
        this.name=name;
    }
    public void setAge( Integer age) {
        this.age=age;
    }

}
