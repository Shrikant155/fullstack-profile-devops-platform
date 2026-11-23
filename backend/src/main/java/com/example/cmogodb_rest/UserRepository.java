package com.example.cmogodb_rest;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository  extends  MongoRepository<User,String>{
    
}
