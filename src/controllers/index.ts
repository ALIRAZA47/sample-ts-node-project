import express from 'express'
import userController from './user'
import companyController from './company'
import departmentController from './department'
import userProtocolController from './userPermissions'
import siteController from './site'
import authController from './auth'
import depotController from './depot'
import globalResponseHandler from '../utils/global/responseHandler'
import protocolDepotController from './protocolDepot'
import protocolController from './protocol'
import { OK } from '../constants/statusCodes'

const { appHome } = require('../services')

const router = express.Router()

router.get('/', (req, res) => {
    // #swagger.tags = ['App']
    // #swagger.description = 'App Home.'
    return globalResponseHandler(req, res, OK, 'Korio', appHome())
})

router.use('/users', userController)
router.use('/user-permissions', userProtocolController)
router.use('/companies', companyController)
router.use('/departments', departmentController)
router.use('/sites', siteController)
router.use('/auth', authController)
router.use('/depots', depotController)
router.use('/protocol', protocolController)
router.use('/protocol-depot', protocolDepotController)

export default router
