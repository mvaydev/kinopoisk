import { Reflector } from '@nestjs/core'
import { RoleGuard } from './role.guard'
import { ExecutionContext } from '@nestjs/common'
import { createMock } from '@golevelup/ts-jest'
import { RoleType } from '../roles'

describe('Role Guard', () => {
    let guard: RoleGuard
    let reflector: Reflector

    beforeEach(() => {
        reflector = new Reflector()
        guard = new RoleGuard(reflector)
    })

    it('should return true, if in context no roles', () => {
        reflector.get = () => []
        const context = createMock<ExecutionContext>({
            switchToHttp: () => ({
                getRequest: () => ({ user: {} }),
            }),
        })
        const canActivate = guard.canActivate(context)

        expect(canActivate).toBe(true)
    })

    it('should return false, if in request no user', () => {
        reflector.get = () => ['admin']
        const context = createMock<ExecutionContext>({
            switchToHttp: () => ({
                getRequest: () => ({}),
            }),
        })
        const canActivate = guard.canActivate(context)

        expect(canActivate).toBe(false)
    })

    it('should return false, if in user no roles field', () => {
        reflector.get = () => ['admin']
        const context = createMock<ExecutionContext>({
            switchToHttp: () => ({
                getRequest: () => ({ user: {} }),
            }),
        })
        const canActivate = guard.canActivate(context)

        expect(canActivate).toBe(false)
    })

    it('should return false, if in user roles isnt Array', () => {
        reflector.get = () => ['admin']
        const context = createMock<ExecutionContext>({
            switchToHttp: () => ({
                getRequest: () => ({
                    user: { roles: '12345' },
                }),
            }),
        })
        const canActivate = guard.canActivate(context)

        expect(canActivate).toBe(false)
    })

    it('should return true, if user have guard roles, else - false', () => {
        reflector.get = () => [RoleType.ADMIN]
        let context = createMock<ExecutionContext>({
            switchToHttp: () => ({
                getRequest: () => ({
                    user: { roles: [RoleType.ADMIN] },
                }),
            }),
        })
        let canActivate = guard.canActivate(context)

        expect(canActivate).toBe(true)

        context = createMock<ExecutionContext>({
            switchToHttp: () => ({
                getRequest: () => ({
                    user: { roles: [RoleType.MODERATOR] },
                }),
            }),
        })
        canActivate = guard.canActivate(context)

        expect(canActivate).toBe(false)
    })
})
