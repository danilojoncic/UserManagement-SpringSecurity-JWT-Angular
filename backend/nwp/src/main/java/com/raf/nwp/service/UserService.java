package com.raf.nwp.service;

import com.raf.nwp.model.SiteUser;
import com.raf.nwp.model.dto.UserAdoption;
import com.raf.nwp.repository.UserRepository;
import com.raf.nwp.service.abstraction.UserInterface;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserInterface {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean deleteUser(Long id) {
        if(userRepository.existsById(id)){
            userRepository.deleteById(id);
            return true;
        }return false;
    }

    @Override
    public boolean updateUser(Long id, UserAdoption dto) {
        if(userRepository.existsById(id)){
            SiteUser user = userRepository.findById(id).get();
            user.setFirstName(dto.firstName());
            user.setLastName(dto.lastName());
            user.setEmail(dto.email());
            if(!(dto.password() == null)){
                user.setPassword(passwordEncoder.encode(dto.password()));
            }
            user.setPermissionTypes(dto.roles());
            //kako biti papan 101
            userRepository.save(user);
            return true;
        }return false;
    }

    @Override
    public boolean createUser(UserAdoption dto) {
        SiteUser user = new SiteUser(dto.firstName(), dto.lastName(), dto.email(),
                passwordEncoder.encode(dto.password()),dto.roles());
        if(!userRepository.existsByEmail(dto.email())){

            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public List<SiteUser> returnAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public SiteUser returnOneUser(Long id) {
        return userRepository.findById(id).orElseThrow(()-> new RuntimeException("User not present!"));
    }
}
