package com.raf.nwp.model.dto;

import com.raf.nwp.model.PermissionType;
import com.raf.nwp.repository.PermissionRepository;

import java.util.List;

public record UserAdoption(String firstName,
                           String lastName,
                           String email,
                           String password,
                           List<PermissionType> roles) {

}
