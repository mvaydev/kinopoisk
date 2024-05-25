import { Injectable } from "@nestjs/common"
import { UUID } from "crypto"
import { sign } from "jsonwebtoken"

@Injectable()
export class AuthService {
    getTokens(userId: UUID) {
        return {
            accessToken: sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15min' })
        }
    }
}