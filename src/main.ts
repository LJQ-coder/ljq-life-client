import './assets/main.css'
import './assets/font/iconfont.css';
// import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores'

const app = createApp(App)

app.use(createPinia())
app.use(router)


// const initApp = () => {
//   // pinia存储token初始化时需刷新token，此时后端检验httpOnly cookie可返回新的access_token
//   const { refreshToken } = useAuthStore()
//   refreshToken()

//   app.mount('#app')
// }

app.mount('#app')
