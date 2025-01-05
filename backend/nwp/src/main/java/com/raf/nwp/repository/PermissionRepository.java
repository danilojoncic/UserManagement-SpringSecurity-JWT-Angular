package com.raf.nwp.repository;

import com.raf.nwp.model.PermissionType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<PermissionType,Long> {
    boolean existsByTitle(String title);
    PermissionType findByTitle(String title);
}
