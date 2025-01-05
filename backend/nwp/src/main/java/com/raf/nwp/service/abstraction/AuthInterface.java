package com.raf.nwp.service.abstraction;

import com.raf.nwp.model.dto.LoginAttempt;
import com.raf.nwp.model.dto.LoginResponse;

public interface AuthInterface {
    LoginResponse succesfullLogin(LoginAttempt atp);
}
