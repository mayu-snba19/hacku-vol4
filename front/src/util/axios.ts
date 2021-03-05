import axiosBase from 'axios'

const API_ENDPOINT_BASE_URL = process.env.API_ENDPOINT_BASE_URL

const axios = axiosBase.create({
  baseURL: API_ENDPOINT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
})

export default axios
