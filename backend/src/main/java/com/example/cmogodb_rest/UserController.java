 package com.example.cmogodb_rest;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@CrossOrigin(origins = "http://localhost:5173") // 👈 हे ॲनोटेशन इथे सर्वात महत्त्वाचे आहे!
@RestController 
@RequestMapping("/path")
public class UserController {
     public final  UserService service;
     private static final Logger log = LoggerFactory.getLogger(UserController.class);

     public UserController(UserService service) {
     this.service=service;
    }
@PostMapping("/users") 
@ResponseStatus (HttpStatus.CREATED)
  public  UserResponceDto useradd( @Valid @RequestBody  UserRequestDto request){
      return  service.create(request);
 }
 @GetMapping("/users")
 public  List<UserResponceDto> getdata(
    @RequestParam (defaultValue = "0") int page,
    @RequestParam (defaultValue = "10") int size) {
         log.info("Fetching all users");
    return service.getUsers(page,size);
        }
   
 }
  
