package com.raf.nwp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Getter
@Setter
public class PermissionType implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String title;

    public PermissionType() {
    }

    public PermissionType(String title) {
        this.title = title;
    }

    @Override
    public String getAuthority() {
        return title;
    }
}
