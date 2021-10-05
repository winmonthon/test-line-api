import dotenv from 'dotenv'
import line from '@line/bot-sdk'
import LineConfig from '../lineConfig.js'
import carousel from '../flex/carousel.js'
import UsersService from '../../User/services/users.services.js'
import shortid from 'shortid'
import AuthService from '../../Auth/services/auth.service.js'
import md5 from 'md5'
dotenv.config()

const win = 'U30918c965c0984fb90f0dca605c61617'
const bam = 'Ub271ef8465b45d4059554e9fe5392bc5'
const Ppong = 'Ua58ce1cc835b80f3b2a93f2cd35172a2'

const client = new line.Client(LineConfig)
const createId = shortid.generate()

let taskName = ''
let description = ''
let userName = ''
let userPassword = ''
let userTel = ''
let userId = ''

const LineController = {
  async handleEvent(req, res) {
    let payload = {}

    const event = req.body.events[0]
    const { text } = event.message || ''

    switch (text) {
      case 'เพิ่มงานใหม่':
        payload = {
          type: 'text',
          text: `กรุณากรอกชื่องานโดยขึ้นต้นด้วยคำว่า "งานใหม่" ตัวอย่าง "งานใหม่ Task one "`,
        }
        console.log(event.source.userId)
        return client.replyMessage(event.replyToken, payload)
      case 'login':
        payload = {
          type: 'text',
          text: `กรุณากรอกชื่อ ตัวอย่าง "ชื่อ สมชาย ศิลเสมอกัน"`,
        }
        return client.replyMessage(event.replyToken, payload)
      case 'test push':
        carousel.template.columns[0].title = 'test test'
        return client.pushMessage(win, carousel)

      case 'test carousel':
        return client.replyMessage(event.replyToken, carousel)

      default:
        if (text.startsWith('งานใหม่')) {
          payload = {
            type: 'text',
            text: `กรุณากรอกรายละเอียดงานโดยขึ้นต้นด้วยคำว่า "รายละเอียด" ตัวอย่าง "รายละเอียด ซ่อมเครื่องทำความร้อนที่ชั้น 2"`,
          }
          await client.replyMessage(event.replyToken, payload)
          return (taskName = text.split(' ')[1])
        } else if (text.startsWith('รายละเอียด')) {
          description = text.split(' ')[1]
          carousel.template.columns[0].title = taskName
          carousel.template.columns[0].text = description
          return client.replyMessage(event.replyToken, carousel)
        } else if (text.startsWith('ชื่อ')) {
          userName = text.split('ชื่อ ')[1]
          console.log(userName)
          payload = {
            type: 'text',
            text: `กรุณากรอกเบอร์โทรศัพท์ ตัวอย่าง "เบอร์ 0123456789"`,
          }
          return client.replyMessage(event.replyToken, payload)
        } else if (text.startsWith('เบอร์')) {
          userTel = text.split('เบอร์')[1]
          console.log(userTel)
          payload = {
            type: 'text',
            text: `กรุณาตั้ง password ตัวอย่าง "password summer2021"`,
          }
          return client.replyMessage(event.replyToken, payload)
        } else if (text.startsWith('password')) {
          userPassword = text.split('password')[1]
          userId = event.source.userId
          console.log(event.source.userId)
        }
        payload = {
          type: 'text',
          text: `ลงทะเบียนเรียบร้อย กรุณารอการอัพเดทจากผู้ดูแล`,
        }
        await UsersService.createUser({
          userId: createId,
          name: userName,
          lineUid: userId,
          tel: userTel,
        })
        await AuthService.create({
          password: md5(`${userPassword}${process.env.SALT}`),
          tel: userTel,
          userId: createId,
        })
        return client.replyMessage(event.replyToken, payload)
    }
  },
}

export default LineController
