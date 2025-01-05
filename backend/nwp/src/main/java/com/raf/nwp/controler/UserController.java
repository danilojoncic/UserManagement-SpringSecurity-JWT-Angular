package com.raf.nwp.controler;

import com.raf.nwp.model.dto.Message;
import com.raf.nwp.model.dto.UserAdoption;
import com.raf.nwp.repository.PermissionRepository;
import com.raf.nwp.service.PermissionService;
import com.raf.nwp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final PermissionService permissionService;

    public UserController(UserService userService, PermissionService permissionService) {
        this.userService = userService;
        this.permissionService = permissionService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id){
        return ResponseEntity.ok(userService.returnOneUser(id));
    }


    @GetMapping()
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok(userService.returnAllUsers());
    }

    @GetMapping("/permissions")
    public ResponseEntity<?> getAllPermissions(){
        return ResponseEntity.ok(permissionService.returnAllPermissionTypes());
    }



    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserAdoption dto){
        boolean output = userService.createUser(dto);
        if(output){
            return ResponseEntity.ok(new Message("User has been created!"));
        }else{
            return ResponseEntity.status(401).body(new Message("Error"));
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        boolean output = userService.deleteUser(id);
        if(output){
            return ResponseEntity.ok(new Message("User with id: " + id + " has been deleted!"));
        }else{
            return ResponseEntity.status(401).body(new Message("Error!"));
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> editUser(@PathVariable Long id, @RequestBody UserAdoption dto){
        boolean output = userService.updateUser(id,dto);
        if(output){
            return ResponseEntity.ok(new Message("User with id: " + id + " has succesfully been edited!"));
        }else{
            return ResponseEntity.status(401).body(new Message("Error!"));
        }
    }
}
