package com.example.cmogodb_rest;

import java.util.List;

import org.apache.catalina.connector.Request;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Pageable;



@Service 
public class UserService {

    public  final UserRepository repo;
    public  UserService(UserRepository repo) {
        this.repo=repo;
    }
    public  UserResponceDto  create( UserRequestDto request ){
          
        User user = new User();
        user.setName(request.getName());
        user.setAge(request.getAge());
        User savedUser=repo.save(user);
        return  new UserResponceDto(savedUser.getId(),savedUser.getName(),savedUser.getAge());
    }
       @Cacheable(value = "users", key = "#page + '-' + #size")
       public List<UserResponceDto> getUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAll(pageable)
                .map(user -> new UserResponceDto(user.getId(), user.getName(), user.getAge()))
                .getContent();
    }
}