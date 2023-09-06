# 登录注册

我们登录弹层在多个页面需要控制隐藏和显示, 所以我们定义一个共享状态.

Nuxt提供了useState可组合的功能，可以跨组件创建响应性的、对ssr友好的共享状态。

`useState`是一个`ssr`友好的ref替换。它的值将在服务器端呈现之后保存(在客户端hydration作用期间)，并使用唯一的键在所有组件之间共享。

## 创建共享状态

现在我们来创建一个登录弹层, 注册弹层, 用户token的共享状态.

```shell
touch composables/states.ts
```

写入以下代码:
```typescript
/** 用户信息 **/
export const useToken = () => useState<string>('token', () => {
  const userInfo = useCookie<{ token: string | undefined }>('userInfo')
  return userInfo.value ? 'Bearer ' + userInfo.value.token : ''
})

/** 登录弹层显示状态 */
export const useLoginDialogVisible = () => useState<boolean>('loginDialogVisible', () => false)

/** 注册弹层显示状态 */
export const useRegDialogVisible = () => useState<boolean>('regDialogVisible', () => false)
```

## 创建登录组件

```shell
touch components/LoginPop.vue
```

```vue
<template>
  <client-only>
    <el-dialog title="登录" width="360" v-model="loginDialogVisible">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" :prefix-icon="ElIconUserFilled"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码" :prefix-icon="ElIconLock"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          还没有账号？去<a href="javascript:void(0)" class="link-color" @click="handleShowRegDialog">注册</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login(formRef)" style="width: 100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="注册" width="360" v-model="regDialogVisible">
      <el-form ref="formRegRef" :model="regForm" :rules="regRules">
        <el-form-item prop="email">
          <el-input v-model="regForm.email" placeholder="请输入邮箱" :prefix-icon="ElIconUserFilled"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="regForm.password" placeholder="请输入密码" :prefix-icon="ElIconLock"></el-input>
        </el-form-item>
        <el-form-item prop="twoPassword">
          <el-input type="password" v-model="regForm.twoPassword" placeholder="请再次输入密码" :prefix-icon="ElIconLock"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          已有账号？去<a href="javascript:void(0)" class="link-color" @click="handleShowLoginDialog">登录</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReg(formRegRef)" style="width: 100%">注 册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </client-only>
</template>

<script lang="ts" setup name="LoginPop">
import { FormInstance } from 'element-plus';
import { reactive } from "#imports";
import { useLoginDialogVisible, useRegDialogVisible } from "~/composables/states";
import { useClientRequest } from "~/composables/useClientRequest";

const token = useToken()
const regDialogVisible = useRegDialogVisible()
const loginDialogVisible = useLoginDialogVisible()
const tokenCookie = useCookie<string | undefined>('token')

const formRef = ref<FormInstance>()
const formRegRef = ref<FormInstance>()
const form = reactive({
  email: '542968439@qq.com',
  password: '123456'
})
const regForm =reactive({
  email: '',
  password: '',
  twoPassword: ''
})
const rules = ref({
  email: [{ required: true, message: '请输入邮箱地址' }],
  password: [{ required: true, message: '请输入密码' }]
})
const regRules = ref({
  email: [{ required: true, message: '请输入邮箱地址' }],
  password: [{ required: true, message: '请输入密码' }],
  twoPassword: [{
    required: true,
    validator: (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if(regForm.password !== regForm.twoPassword) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
  }]
})

// 登录
async function login(formEl: FormInstance | undefined) {
  if (!process.client) return;
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      const data = await useClientRequest<{ code: number; token: string; msg?: string }>('web/user/login', { method: 'post', body: form })
      if (data.code === 200) {
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        // 设置cookie
        tokenCookie.value = data.token
        // 更新state
        token.value = 'Bearer ' + data.token
        // 关闭登录弹层
        loginDialogVisible.value = false
      }
    }
  })
}

// 注册
async function handleReg(formEl: FormInstance | undefined) {
  if (!process.client) return;
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      const data = await useClientRequest<{ code: number; msg?: string }>('web/user/reg', { method: 'post', body: regForm })
      if (data.code === 200) {
        ElMessage({
          message: '注册成功',
          type: 'success',
        })
        regDialogVisible.value = false
      }
    }
  })
}

// 隐藏登录弹层，显示注册弹层
function handleShowRegDialog() {
  loginDialogVisible.value = false
  regDialogVisible.value = true
}

// 隐藏注册弹层，显示登录弹层
function handleShowLoginDialog() {
  loginDialogVisible.value = true
  regDialogVisible.value = false
}
</script>
```
我们在`layouts/default.vue`中使用登录/注册组件

```vue
<template>
  <LoginPop />
</template>
```

完善`AppHeader`组件登录交互

```vue
<script setup lang="ts">
  // 1. 使用 state
  const token = useToken('token')
  // 2. 完善登录方法
  const loginDialogVisible = useLoginDialogVisible()
  function goLogin() {
    loginDialogVisible.value = true
  }
  // 3. 完善退出登录
  const tokenCookie = useCookie<string | undefined>('token')

  function logOut() {
    token.value = ''
    tokenCookie.value = undefined
    // 如果在用户中心页就回到首页
    if (route.path.indexOf('/user') > -1) {
      navigateTo('/')
    }
  }
</script>
```

