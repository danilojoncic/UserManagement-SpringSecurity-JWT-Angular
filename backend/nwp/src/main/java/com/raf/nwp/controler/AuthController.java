package com.raf.nwp.controler;

import com.raf.nwp.model.dto.LoginAttempt;
import com.raf.nwp.model.dto.LoginResponse;
import com.raf.nwp.model.dto.Message;
import com.raf.nwp.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginAttempt dto){
        LoginResponse lR = authService.succesfullLogin(dto);
        if(lR == null)return ResponseEntity.status(401).body(new Message("Error"));
        return ResponseEntity.ok(lR);
    }


}
