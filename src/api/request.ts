import axios from 'axios'
import { message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const request = axios.create({
    // 后台接口的基准地址
    baseURL: "http://127.0.0.1:8000/",
    timeout: 3000
})

const token = localStorage.getItem('token')

const navi = useNavigate()

request.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            navi('/login')
        }
        return config;
    },

    (err) => {
        message.error(err.message)
        console.log(err)
        return Promise.reject(err);
    }
)

request.interceptors.response.use(
    (response: any) => {
        if (response.code === '401') {
            message.error('no auth')
        }
        return response.data

    },

    (err) => {
        message.error(err.message)
        console.log(err)
        return Promise.reject(err);

    }
)

export default request