package com.raf.nwp.service;

import com.raf.nwp.model.PermissionType;
import com.raf.nwp.repository.PermissionRepository;
import com.raf.nwp.service.abstraction.PermissionInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionService implements PermissionInterface {

    private final PermissionRepository permissionRepository;

    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    @Override
    public List<PermissionType> returnAllPermissionTypes() {
        return permissionRepository.findAll();
    }
}
