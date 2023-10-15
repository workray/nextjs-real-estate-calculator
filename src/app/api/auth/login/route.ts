import dbConnect from '@/dbConfig/dbConnect'
import { getErrorResponse } from '@/lib/helpers'
import { setToken } from '@/lib/token'
import { LoginUserInput, LoginUserSchema } from '@/lib/validations/user.schema'
import User from '@/models/userModel'
import { compare } from 'bcryptjs'
import { NextRequest } from 'next/server'
import { ZodError } from 'zod'

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const body = (await req.json()) as LoginUserInput
    const data = LoginUserSchema.parse(body)

    const user = await User.findOne({ email: data.email })

    if (!user || !(await compare(data.password, user.password))) {
      return getErrorResponse(401, 'Invalid email or password')
    }
    return await setToken(user)
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'failed validations', error)
    }

    return getErrorResponse(500, error.message)
  }
}
