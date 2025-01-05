package com.raf.nwp.service.abstraction;

import com.raf.nwp.model.SiteUser;
import com.raf.nwp.model.dto.UserAdoption;

import java.util.List;

public interface UserInterface {
    boolean deleteUser(Long id);
    boolean updateUser(Long id, UserAdoption dto);
    boolean createUser(UserAdoption dto);
    List<SiteUser> returnAllUsers();
    SiteUser returnOneUser(Long id);
}
