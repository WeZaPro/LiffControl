import axios from 'axios'

export default axios.create({
  //baseURL: 'https://mkt-linebot-nodejs-production.up.railway.app/api',
  //baseURL:process.env.VUE_APP_API+"/api",
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-type': 'application/json',
  },
})
