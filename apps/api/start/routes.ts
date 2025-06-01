/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

const UsersController = () => import('#controllers/users_controller')

router.post('/auth/signup', [UsersController, 'register'])
router.post('/auth/login', [UsersController, 'login'])
router
  .post('auth/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/login')
  })
  .use(middleware.auth())

const ProjectsController = () => import('#controllers/projects_controller')

router.get('/projects', [ProjectsController, 'getAll']).use(middleware.auth())
router.post('/project/create', [ProjectsController, 'create']).use(middleware.auth())
router.get('/project/:id', [ProjectsController, 'getSingle']).use(middleware.auth())
router.get('/project/:id/locales', [ProjectsController, 'getLocales']).use(middleware.auth())
router
  .get('/project/:id/translations', [ProjectsController, 'getTranslations'])
  .use(middleware.auth())

const TranslationsController = () => import('#controllers/translations_controller')

router.post('/translation', [TranslationsController, 'createTranslation']).use(middleware.auth())
router.put('/translation', [TranslationsController, 'updateTranslation']).use(middleware.auth())
router.post('/translations', [TranslationsController, 'uploadFiles']).use(middleware.auth())
