module.exports = (options)=>{
  const adminUser = require('../models/AdminUser')
  const jwt = require('jsonwebtoken')
  const SECRET = require('../secret')
  const assert = require('http-assert')

  return async (req, res, next)=>{
    const token = req.headers.authorization
    try{
      const {id} = jwt.verify(token, SECRET)
      req.user =await adminUser.findById(id)
      if(!req.user){
        res.status(401).send({
          message: "用户无效，请重新登录"
        })
      }
    }catch(err){
      res.status(401).send({
        message: "请先登录"
      })
    }
    
    next()
  }
}