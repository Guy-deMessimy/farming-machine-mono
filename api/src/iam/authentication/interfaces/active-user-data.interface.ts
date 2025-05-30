// import { PermissionType } from 'src/iam/authorization/permission.type';
// import { Role } from 'src/users/enums/role.enum';

import { Role } from 'src/modules/users/enums/role.enum';

export interface ActiveUserData {
  /**
   * The "subject" of the token. The value of this property is the user ID
   * that granted this token.
   */
  sub: string;

  /**
   * The subject's (user) email.
   */
  email: string;
  /**
   * The subject's (user) role.
   */
  role: Role;
  /**
   * The subject's (user) permissions.
   * NOTE: Using this approach in combination with the "role-based" approach
   * does not make sense. We have those two properties here ("role" and "permissions")
   * just to showcase two alternative approaches.
   */
  //   permissions: PermissionType[];
}
