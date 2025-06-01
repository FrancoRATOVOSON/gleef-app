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

const ProjectsController = () => import('#controllers/projects_controller')

router.get('/projects', [ProjectsController, 'getAll'])
router.post('/project/create', [ProjectsController, 'create'])
router.get('/project/:id', [ProjectsController, 'getSingle'])
router.get('/project/:id/locales', [ProjectsController, 'getLocales'])
router.get('/project/:id/translations', [ProjectsController, 'getTranslations'])

const TranslationsController = () => import('#controllers/translations_controller')

router.post('/translation', [TranslationsController, 'createTranslation'])
router.put('/translation', [TranslationsController, 'updateTranslation'])
router.post('/translations', [TranslationsController, 'uploadFiles'])
