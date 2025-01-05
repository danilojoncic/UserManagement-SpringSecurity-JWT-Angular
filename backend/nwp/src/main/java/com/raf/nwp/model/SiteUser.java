package com.raf.nwp.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
public class SiteUser implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_permissions", // Join table name
            joinColumns = @JoinColumn(name = "user_id"), // Foreign key to User
            inverseJoinColumns = @JoinColumn(name = "permission_id") // Foreign key to Permission
    )
    @JsonManagedReference // Avoid circular dependency
    private List<PermissionType> permissionTypes = new ArrayList<>();

    public SiteUser() {
    }

    public SiteUser(String firstName, String lastName, String email, String password, List<PermissionType> permissionTypes) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.permissionTypes = permissionTypes;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return permissionTypes;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
