/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

const UsersController = () => import('#controllers/users_controller')

router.post('/auth/signup', [UsersController, 'register'])
router.post('/auth/login', [UsersController, 'login'])
