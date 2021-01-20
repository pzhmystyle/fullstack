module.exports=()=>{
  return (req,res,next)=>{
    const apistr = req.params.resource
    const Model = require('inflection2').classify(apistr)
    req.Model = require(`../models/${Model}`)
    next()
  }
}