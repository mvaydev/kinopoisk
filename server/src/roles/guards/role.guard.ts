import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { Roles } from '../role.decorator'
import { intersection } from 'lodash'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride(Roles, [
            context.getHandler(),
            context.getClass(),
        ])
        if (!roles || roles.length === 0) return true

        const user = context.switchToHttp().getRequest().user
        if (!user?.roles || !Array.isArray(user.roles)) return false

        return intersection(user.roles, roles).length != 0
    }
}
