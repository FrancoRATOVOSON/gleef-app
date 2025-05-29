import db from '#config/db'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {

  async register({ request, response }: HttpContext) {
    const { username, password } = request.body()

    if (!username || !password) {
      return response.status(400).json({
        message: 'Username and password are required',
      })
    }

    const existingUser = await db.user.findUnique({
      where: { username },
    })

    if (existingUser) {
      return response.status(409).json({
        message: 'Username already taken',
      })
    }

    const hashedPassword = await hash.make(password)
    const user = await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
      },
    })

    return response.json({
      message: 'User registered successfully',
      user,
    })
  }

  async login({ request, response }: HttpContext) {
    const { username, password } = request.body()

    if (!username || !password) {
      return response.status(400).json({
        message: 'Username and password are required',
      })
    }

    const user = await db.user.findUnique({
      where: { username },
    })

    if (!user) {
      return response.status(401).json({
        message: 'Invalid username or password',
      })
    }

    const isValid = await hash.verify(user.password,password)
    if (!isValid) {
      return response.status(401).json({
        message: 'Invalid username or password',
      })
    }

    return response.json({
      message: 'User logged in successfully',
      user: {
        id: user.id,
        username: user.username,
      },
    })
  }
}
