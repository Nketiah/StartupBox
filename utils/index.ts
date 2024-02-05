import bcrypt from 'bcryptjs'
import fs from 'fs'
import { CookieOptions, Response } from "express"
import { User } from '../types'
import jwt from "jsonwebtoken"



interface Utils {
  log: (message: string | any) => void
  hashPassword: (password: string) => Promise<string>
  isPassMatched: (password: string, hash: string) => Promise<boolean>
  backupDatabase: () => void
  getTodaysDate: () => string
  generateCookieToken: (res: Response, user: User) => unknown
  getJwtToken: (userId: string, tokenExpiresIn: string) => string
}

const utils: Utils = {} as Utils

utils.log = function (str: string) { 
    const date = new Date() 
    const year = date.getFullYear() 
    const month = date.getMonth() + 1 
    const day = date.getDate() 
    const hour = date.getHours() 
    const minute = date.getMinutes() 
    const second = date.getSeconds() 
    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second} `
   
   fs.writeFileSync('log',  `${formattedDate} ${str}\n`, {flag :'a'}) 
}

utils.hashPassword = async  function (password: string) {
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)
    return hash
}
  
utils.isPassMatched =  async function (password: string, hash: string) {
    return await bcrypt.compare(password, hash)
}

utils.getJwtToken = function (userId: string, tokenExpiresIn: string) {
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET!, {
        expiresIn: tokenExpiresIn,
    })
}

utils.generateCookieToken = function (res: Response, user: User) {
   const token = utils.getJwtToken(user.id, process.env.JWT_COOKIE_EXPIRE!)
   const options: CookieOptions  = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
  }
   res
   .status(200)
   .cookie("token", token, options)
   .json({
         success: true,
         token,
         user,
   })
}