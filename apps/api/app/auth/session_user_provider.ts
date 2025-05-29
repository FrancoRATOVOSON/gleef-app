import { symbols } from '@adonisjs/auth'
import type { SessionGuardUser, SessionUserProviderContract } from '@adonisjs/auth/types/session'
import type { User } from '#prisma/index'
import db from '#config/db'

export class SessionPrismaUserProvider implements SessionUserProviderContract<User> {
  declare [symbols.PROVIDER_REAL_USER]: User

  async createUserForGuard(user: User): Promise<SessionGuardUser<User>> {
    return {
      getId() {
        return user.id
      },
      getOriginal() {
        return user
      },
    }
  }

  async findById(identifier: string): Promise<SessionGuardUser<User> | null> {
    const user = await db.user.findUnique({
      where: {
        id: identifier,
      },
    })

    if (!user) {
      return null
    }

    return this.createUserForGuard(user)
  }
}
