package com.talentotech.api.controller;
import com.talentotech.api.dto.LoginRequest;
import com.talentotech.api.model.User;
import com.talentotech.api.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:4200")
@RestController //Esto determina que la clase responde peticiones http y devuelve JSON
@RequestMapping("/api/users") //Define la ruta base del controlador

public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //Crear
    @PostMapping
    public ResponseEntity <User> create(@RequestBody User user) {
        return ResponseEntity.status(HttpStatus.CREATED)
        .body(userService.crearUsuario(user));
    }

    //Listar
    @GetMapping
    public List<User> findAll() {
        return userService.findAll();
    }

    //Consultar por id
    @GetMapping("/{id}")
    public User findByID(@PathVariable Long id){
        return userService.findById(id);
    }

    //Modificar por id
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User userDetails) {
        return userService.update(id, userDetails);
    }

    //Verificar login
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest request) {
        User user = userService.login(request);
        return ResponseEntity.ok(user);
    }
    
}
