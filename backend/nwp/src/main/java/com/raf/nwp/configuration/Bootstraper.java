package com.raf.nwp.configuration;

import com.raf.nwp.model.PermissionType;
import com.raf.nwp.model.SiteUser;
import com.raf.nwp.model.dto.UserAdoption;
import com.raf.nwp.repository.PermissionRepository;
import com.raf.nwp.repository.UserRepository;
import com.raf.nwp.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Bootstraper implements CommandLineRunner {

    private final PermissionRepository permissionRepository;
    private final UserService userService;

    public Bootstraper(PermissionRepository permissionRepository, UserService userService) {
        this.permissionRepository = permissionRepository;
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
        if(permissionRepository.count() != 4) {


            PermissionType permissionType1 = new PermissionType("can_read");
            PermissionType permissionType2 = new PermissionType("can_create");
            PermissionType permissionType3 = new PermissionType("can_edit");
            PermissionType permissionType4 = new PermissionType("can_delete");

            permissionRepository.save(permissionType1);
            permissionRepository.save(permissionType2);
            permissionRepository.save(permissionType3);
            permissionRepository.save(permissionType4);


            UserAdoption user1 = new UserAdoption("Edward",
                    "Blackadder",
                    "black@gmail.com",
                    "TheFoxThatIsTheOxfordProfessorOfCunning",
                    List.of(permissionType1,permissionType2,permissionType3,permissionType4));

            UserAdoption user2 = new UserAdoption("Captain",
                    "Darling",
                    "darling@gmail.com",
                    "yess",
                    List.of(permissionType1,permissionType2,permissionType3));


            UserAdoption user3 = new UserAdoption("Baldrick",
                    "Sodoff",
                    "electronicmail@gmail.com",
                    "aWordToPass",
                    List.of(permissionType1));


            UserAdoption user4 = new UserAdoption("General",
                    "Melchet",
                    "frontlineconnoseur@gmail.com",
                    "yippy",
                    List.of(permissionType1,permissionType2));

            UserAdoption user5 = new UserAdoption("Hugh",
                    "Laurie",
                    "bestpainterever@gmail.com",
                    "something",
                    List.of());

            userService.createUser(user1);
            userService.createUser(user2);
            userService.createUser(user3);
            userService.createUser(user4);
            userService.createUser(user5);




        }
        System.out.println(permissionRepository.count());
    }
}
