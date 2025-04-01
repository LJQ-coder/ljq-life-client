import axios from 'axios'
import { HTTP_CONFIG } from '../config/http'
import setupInterceptors from './interceptors'

axios.defaults.withCredentials = true;

const createPureInstance = () => {
  return axios.create(HTTP_CONFIG)
}

const createServiceInstance = () => {
  const instance = axios.create(HTTP_CONFIG)
  setupInterceptors(instance)
  return instance
}

export const pureInstance = createPureInstance()
export const serviceInstance = createServiceInstance()
