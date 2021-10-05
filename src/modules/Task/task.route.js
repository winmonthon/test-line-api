import express from 'express'
import TaskController from './controller/task.controller.js'

const router = express.Router()

//Create task
router.post('/', TaskController.createTaskFromSale)
//See all task
router.get('/', TaskController.getAllTask)
//Get task by user (sale)
router.get('/sale/:userId', TaskController.getTaskBySale)
//Get task by superviosr
router.get('/supervisor/:userId', TaskController.getTaskBySupervisor)
//Get task by engineer
router.get('/engineer/:userId', TaskController.getTaskByEngineer)
//SV assign task
router.put('/supervisor/:taskId', TaskController.assignTask)
//Update Task
router.put('/:taskId', TaskController.updateTask)
//Delete task
router.delete('/:id', TaskController.deleteTask)
//See one task
router.get('/:id', TaskController.getTaskById)

export default router
