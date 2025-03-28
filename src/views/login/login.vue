<template>
  <div class="login">
    <div class="login-header">
      <div class="header-logo">
        <img src="@/assets/img/login-logo.png" alt="">
      </div>
    </div>
    <div class="login-content">
      <van-tabs v-model:active="activeName">
        <van-tab
          title="Log In"
          name="log"
        >
          <LogForm
            v-model="loginForm"
            :items="logInItems"
            btn-text="Login"
            @btn-click="login"
          />
        </van-tab>
        <van-tab
          title="Sign Up"
          name="sign"
        >
          <LogForm
            v-model="signUpForm"
            :items="signUpItems"
            btn-text="Sign Up"
            @btn-click="signUp"
          />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { authApi } from '@/api/modules'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeName = ref('log')

const signUpForm = reactive({
  username: '',
  mobile: '',
  password: '',
})

const loginForm = reactive({
  mobile: '',
  password: '',
})

const logInItems = computed(() => {
  return [
    { prop: 'mobile', label: 'Mobile', placeholder: '请输入手机号' },
    { prop: 'password', label: 'Password', placeholder: '请输入密码' }
  ]
})

const signUpItems = computed(() => {
  return [
    { prop: 'username', label: 'Username', placeholder: '请输入账号名称' },
    { prop: 'mobile', label: 'Mobile', placeholder: '请输入手机号' },
    { prop: 'password', label: 'Password', placeholder: '请输入密码' }
  ]
})

const login = async () => {
  const res: any = await authApi.login(loginForm)
  const { setToken } = useAuthStore()
  setToken(res.token)
  router.push('/')
}

const signUp = async () => {
  const res = await authApi.register(signUpForm)
  console.log(res);
}
</script>
<style lang="less" scoped>
.login {
  padding: 16px 32px;

  .login-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 54px;

    .header-logo {
      img {
        width: 64px;
        height: 64px;
      }
    }
  }

  .login-content {
    // .van-tab--active {
    //   color: #383838;
    //   font-weight: bold;
    // }
    // .switch-btn {
    //   display: inline-block;
    //   margin-right: 16px;
    //   font-size: 18px;
    //   font-weight: bold;
    //   color: #a9a9a9;
    // }
  }
}

:deep(.van-tabs__nav) {
  background-color: transparent;
}

// :deep(.van-tab--active) {
//   color: #383838;
//   font-weight: bold;
// }
</style>
