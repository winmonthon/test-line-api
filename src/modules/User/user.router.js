import express from 'express'
import UsersController from './controller/users.controller.js'
import { adminAuthentication } from '../../middlewares/authentication.js'

const router = express.Router()

//Create new user
router.post('/', UsersController.createNewUser)
//See all user
router.get('/', adminAuthentication, UsersController.getAllUsers)
//Update user
router.put('/:userId', UsersController.updateUser)
//Delete user
router.delete('/:userId', adminAuthentication, UsersController.deleteUser)

export default router
