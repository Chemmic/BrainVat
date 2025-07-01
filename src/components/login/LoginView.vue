<template>
  <div class="register-page">
    <div class="register-wrapper">
      <h1>Sign In</h1>
      <p class="subtitle">Welcome back – log in to your Brain Vat</p>

      <form class="register-form" @submit.prevent="handleLogin">

        <div class="form-column">
          <span class="error-message" :class="{ hidden: !errors.email }">{{ errors.email }}</span>
          <!-- Probleme mit auto HTML5 validierung vom browser, deswegen type text und nicht email! -->
          <input
            type="text"
            inputmode="email"
            autocomplete="email"
            placeholder="Email"
            v-model="form.email"
            :class="{ error: errors.email }"
          />
        </div>


        <div class="form-column">
          <span class="error-message" :class="{ hidden: !errors.password }">{{ errors.password }}</span>
          <input
            type="password"
            placeholder="Password"
            v-model="form.password"
            :class="{ error: errors.password }"
          />
        </div>


        <button type="submit" class="submit-button" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Log In' }}
        </button>


        <span v-if="loginError" class="login-error-message">{{ loginError }}</span>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { supabaseCopy } from '@/lib/supabaseCopy.js'
import { useUserStore } from '@/components/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const isLoading = ref(false)
const loginError = ref('')

function validateForm() {
  let valid = true
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(form.email)) {
    errors.email = 'Invalid email'
    valid = false
  } else {
    errors.email = ''
  }

  if (form.password.length < 6) {
    errors.password = 'Enter your password'
    valid = false
  } else {
    errors.password = ''
  }

  return valid
}

async function handleLogin() {
  console.log('Login attempt')

  if (!validateForm()) {
    console.log(errors)
    return
  }

  isLoading.value = true
  loginError.value = ''

  const { data, error } = await supabaseCopy.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  })

  isLoading.value = false

  if (error || !data.user) {
    loginError.value = 'Login failed – check your email or password'
    return
  }

  userStore.login(data.user)
  router.push('/')
}
</script>

<style scoped>
.register-page {
  background-color: #f5f5f5;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  padding-top: 50px;
  display: flex;
  justify-content: center;
}

.register-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h1 {
  font-size: 70px;

  font-weight: 900;
  margin-bottom: 0;
  color: #1e1e1e;
  margin-top: -20px;
}

.subtitle {
  font-size: 26px;
  color: #555;
  margin-bottom: 25px;
  margin-top: 40px;
}

.register-form {
  background-color: white;
  padding: 32px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-column {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

input {
  padding: 12px 14px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fafafa;
  transition: border-color 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #BEFFE6;
}

input.error {
  border-color: #e74c3c;
}

.submit-button {
  padding: 14px;
  background-color: black;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:hover {
  background-color: #333;
}

.submit-button:disabled {
  background-color: #888;
  cursor: not-allowed;
}

.error-message {
  font-size: 13px;
  line-height: 14px;
  color: #e74c3c;
  font-weight: 500;
  text-align: left;
  transition: opacity 0.2s ease;
  min-height: 16px;
  opacity: 1;
}

.error-message.hidden {
  opacity: 0;
}

.login-error-message {
  font-size: 14px;
  color: #e74c3c;
  margin-top: 12px;
  text-align: center;
}
</style>
