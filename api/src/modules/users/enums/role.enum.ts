import { registerEnumType } from "@nestjs/graphql";

export enum Role {
  ADMIN = 'ADMIN',
  PROVIDER = 'PROVIDER',
  VIEWER = 'VIEWER',
}

registerEnumType(Role, {
  name: 'Role', // ← utilisé dans le schéma GraphQL
  description: 'Les rôles utilisateurs disponibles',
});
