module.exports = (app)=>{
  const express = require('express')
  // 这是express的子路由
  const router = express.Router({
    mergeParams: true
  });
  const multer  = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  const adminUser = require('../../models/AdminUser')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const SECRET = require('../../secret')
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')


  router.post(`/`, async (req, res)=>{
    const data = await req.Model.create(req.body)
    res.send(data)
  })

  router.put(`/:id`, async (req, res)=>{
    const data = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(data)
  })

  router.delete(`/:id`, async (req, res)=>{
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
      message: 'success',
    })
  })

  router.get(`/`, async (req, res)=>{
    let queryOptions = {}
    if(req.Model.modelName === "Category"){
      queryOptions.populate = 'parent'
    }
    const dataList = await req.Model.find().setOptions(queryOptions)
    res.send(dataList)
  })

  router.get(`/:id`, async (req, res)=>{
    const data = await req.Model.findById(req.params.id)
    res.send(data)
  })

  

  app.use('/admin/api/nest/:resource', authMiddleware(), resourceMiddleware(), router)

  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req,res)=>{
    const file = req.file
    file.url = 'http://localhost:3000/uploads/'+file.filename
    res.send(file)
  })


  const bcrypt = require('bcrypt')
  app.post('/admin/api/login', async (req,res)=>{
    const {username,password} = req.body
    // 根据用户名找用户
    const user = await adminUser.findOne({username:username}).select('+password')
    console.log(user)
    // assert(user,422,'用户不存在')
    if(!user){
      res.status(422).send({
        message: '用户不存在'
      })
    }
    // 校验密码
    const raw = await bcrypt.compareSync(password,user.password)
    if(!raw){
      res.status('422').send({
        message: '密码错误'
      })
    }
    const token = jwt.sign({id: user._id}, SECRET)
    
    // 返回token
    res.send({
      user,
      message: '登录成功',
      token
    })
  })

  // 错误处理函数
  app.use( (err,req,res,next)=>{
    res.status(500).send({
      message: err.message
    })
  })
}