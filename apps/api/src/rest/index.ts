import Express from 'express'

import { Version } from './Version'

const router = Express.Router()

router.get('/version', function (req, res) {
  Version(req, res)
})

export default router
