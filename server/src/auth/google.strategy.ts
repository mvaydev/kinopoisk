import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20'
import { CreateUserDto } from 'src/users/user.dto'

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            callbackURL: process.env.OAUTH_CALLBACK_URL,
            scope: ['email', 'profile'],
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
    ) {
        done(null, {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photoUrl: profile.photos[0].value,
        } as CreateUserDto)
    }
}
