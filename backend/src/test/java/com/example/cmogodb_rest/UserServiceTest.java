package com.example.cmogodb_rest;
import java.util.List;
import org.springframework.data.domain.Pageable;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock 
    private  UserRepository repo;
    @InjectMocks 
    private UserService service;
    void create_shouldSaveUserAndReturnResponseDto() {
   UserRequestDto request = new UserRequestDto();
    request.setName("Amit");
    request.setAge(25);

 User savedUser = new User();
    savedUser.setId("abc123");
    savedUser.setName("Amit");
    savedUser.setAge(25);
when(repo.save(any(User.class))).thenReturn(savedUser);
UserResponceDto result = service.create(request);
assertEquals("abc123", result.getId());
    assertEquals("Amit", result.getName());
    assertEquals(25, result.getAge());

    ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
    verify(repo).save(captor.capture());
    assertEquals("Amit", captor.getValue().getName());
    assertEquals(25, captor.getValue().getAge());


    }
    @Test
void getUsers_shouldReturnMappedPage() {
    // ARRANGE
    User u1 = new User();
    u1.setId("1");
    u1.setName("Amit");
    u1.setAge(30);

    User u2 = new User();
    u2.setId("2");
    u2.setName("Sneha");
    u2.setAge(28);

    Page<User> userPage = new PageImpl<>(List.of(u1, u2));
    when(repo.findAll(any(Pageable.class))).thenReturn(userPage);

    // ACT
    List<UserResponceDto> result = service.getUsers(0, 10);

    // ASSERT
    assertEquals(2, result.size());
    assertEquals("1", result.get(0).getId());
    assertEquals("Amit", result.get(0).getName());
    assertEquals("Sneha", result.get(1).getName());

    verify(repo).findAll(PageRequest.of(0, 10));
}
@Test
void getUsers_whenNoUsers_shouldReturnEmptyList() {
    when(repo.findAll(any(Pageable.class))).thenReturn(Page.empty());

    List<UserResponceDto> result = service.getUsers(0, 10);

    assertTrue(result.isEmpty());
}
}
