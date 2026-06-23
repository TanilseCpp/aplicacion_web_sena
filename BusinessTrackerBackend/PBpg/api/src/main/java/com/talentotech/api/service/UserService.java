package com.talentotech.api.service;
import com.talentotech.api.dto.LoginRequest;
import com.talentotech.api.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.talentotech.api.repository.UserRepository;
import com.talentotech.api.exception.ResourceNotFoundException;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder){

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User crearUsuario(User user) {
    if (userRepository.findByUsername(user.getUsername()).isPresent()) {
        throw new RuntimeException("El username ya está en uso");
    }
    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
        throw new RuntimeException("El email ya está en uso");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User findById(Long id){
    return userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + id));
    }

    public User update(Long id, User userDetails){
        User user = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        if(userDetails.getUsername()!=null && !userDetails.getUsername().trim().isEmpty()){
            user.setUsername(userDetails.getUsername());
        }

        if(userDetails.getEmail()!=null && !userDetails.getEmail().trim().isEmpty()){
            user.setEmail(userDetails.getEmail());
        }

        if(userDetails.getPassword()!=null && !userDetails.getPassword().trim().isEmpty()){
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }
        
        if (userDetails.getRole()!=null){
            user.setRole(userDetails.getRole());
        }
  
        return userRepository.save(user);
    }

    public User login(LoginRequest request){
        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());
        if(optionalUser.isEmpty()){
            throw new ResourceNotFoundException("Usuario no encontrado");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Credenciales incorrectas");
        }

        return user;
    }

}
