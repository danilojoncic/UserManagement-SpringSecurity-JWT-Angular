import {PermissionType} from "./permissionType";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  permissionTypes: PermissionType[];
}
