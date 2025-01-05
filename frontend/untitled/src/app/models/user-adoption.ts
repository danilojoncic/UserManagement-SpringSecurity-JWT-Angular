import {PermissionType} from "./permissionType";

export interface UserAdoption {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: PermissionType[];
}
