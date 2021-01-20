import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})
http.interceptors.request.use(config=>{
  const token = sessionStorage.getItem('token')
  if(token){
    config.headers['Authorization'] = token
  }
  return config
},err=>{
  return Promise.reject(err)
})
http.interceptors.response.use((res)=>{
  return res
},(err)=>{
  if(err.response.data.message){
    Vue.prototype.$message.error(err.response.data.message)
  }
  console.log(err.response)
  if(err.response.status === 401){
    router.push('/login')
  }
  return Promise.reject(err)
})
export default http