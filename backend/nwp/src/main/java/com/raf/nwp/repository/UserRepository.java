package com.raf.nwp.repository;

import com.raf.nwp.model.SiteUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<SiteUser,Long> {
    boolean existsByEmail(String email);
    Optional<SiteUser> findByEmail(String email);
}
