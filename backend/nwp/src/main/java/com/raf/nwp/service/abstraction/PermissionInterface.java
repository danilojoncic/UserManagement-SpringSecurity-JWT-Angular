package com.raf.nwp.service.abstraction;

import com.raf.nwp.model.PermissionType;

import java.util.List;

public interface PermissionInterface {
    List<PermissionType> returnAllPermissionTypes();
}
