import { Permission } from 'app/api/models/Permission';

export class AppUser {

    public get isSuperAdmin(): boolean {
        return this.permissions.includes(Permission.superAdmin);
    }

    constructor(
        public userName: string,
        public email: string,
        public permissions: Permission[]
    ) {
    }

    public satisfiesPermission(permission: Permission): boolean {
        return this.permissions.includes(permission) || this.isSuperAdmin;
    }
}
