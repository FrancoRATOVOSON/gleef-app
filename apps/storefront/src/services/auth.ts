import { fetchPOST } from '#/lib/utils'
import { CredentialsType } from '#/types/auth'

export const login = (credentials: CredentialsType) =>
  fetchPOST('/auth/login', credentials, { credentials: undefined })

export const signup = (credentials: CredentialsType) =>
  fetchPOST('/auth/signup', credentials, { credentials: undefined })

export const logout = () => fetchPOST('/auth/logout', {})
