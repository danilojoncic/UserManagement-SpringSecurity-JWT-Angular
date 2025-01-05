package com.raf.nwp.service;

import com.raf.nwp.configuration.jwt.JWTUtil;
import com.raf.nwp.model.SiteUser;
import com.raf.nwp.model.dto.LoginAttempt;
import com.raf.nwp.model.dto.LoginResponse;
import com.raf.nwp.repository.UserRepository;
import com.raf.nwp.service.abstraction.AuthInterface;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements AuthInterface {

    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(JWTUtil jwtUtil, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public LoginResponse succesfullLogin(LoginAttempt atp) {
        if (userRepository.existsByEmail(atp.email())) {
            SiteUser st = userRepository.findByEmail(atp.email()).orElse(null);
            System.out.println("USER JE: " + st.getEmail() + " with password: " + st.getPassword());
            if (st != null && passwordEncoder.matches(atp.password(),st.getPassword())) {
                String jwt = jwtUtil.generateToken(st);
                return new LoginResponse(jwt);
            }
        }
        System.out.println("NEMA GA!");
        return null;
    }
}
