<template>
  <div class="register-page">
    <div class="register-wrapper">
      <h1>Create your Account</h1>
      <p class="subtitle">You are one step closer to fulfilling your dreams</p>

      <form class="register-form" @submit.prevent="handleSubmit">

        <div class="form-row">
          <div class="form-column">
            <span class="error-message">{{ errors.firstName }}</span>
            <input type="text" placeholder="Name" v-model="form.firstName" />
          </div>
          <div class="form-column">
            <span class="error-message">{{ errors.lastName }}</span>
            <input type="text" placeholder="Surname" v-model="form.lastName" />
          </div>
        </div>


        <div class="form-row">
          <div class="form-column">
            <span class="error-message">{{ errors.email }}</span>
            <input type="email" placeholder="Email" v-model="form.email" />
          </div>
          <div class="form-column">
            <span class="error-message">{{ errors.emailRepeat }}</span>
            <input type="email" placeholder="Repeat Email" v-model="form.emailRepeat" />
          </div>
        </div>


        <div class="form-column">
          <span class="error-message">{{ errors.password }}</span>
          <input type="text" placeholder="Password" v-model="form.password" />
          <progress id="password-progress" :value="passwordStrength" max="100" :class="passwordColor"/>
        </div>


        <div class="form-column">
          <span class="error-message">{{ errors.passwordRepeat }}</span>
          <input type="password" placeholder="Repeat Password" v-model="form.passwordRepeat" />
        </div>


        <button type="submit" class="submit-button">Sign Up!</button>
      </form>
    </div>
  </div>
</template>

<script setup>

import { reactive, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import { generateIQ } from '@/utils/iq'
import { useUserStore } from '@/components/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  emailRepeat: '',
  password: '',
  passwordRepeat: '',
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  emailRepeat: '',
  password: '',
  passwordRepeat: '',
})

const passwordColor = computed(() => {
  const strength = passwordStrength.value
  if (strength >= 100) return 'green-password'
  if (strength >= 60) return 'orange-password'
  return 'red-password'
})

const passwordStrength = computed(() => {
  const length = form.password.length
  if (length >= 12 && /[!@#$%^&*()_+]/.test(form.password)) return 100
  if (length >= 8) return 60
  if (length >= 4) return 30
  return 0
})

function validateForm() {
  let isValid = true

  errors.firstName = form.firstName.trim() ? '' : 'Field cannot be empty'
  isValid &&= !errors.firstName

  errors.lastName = form.lastName.trim() ? '' : 'Field cannot be empty'
  isValid &&= !errors.lastName

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  errors.email = emailRegex.test(form.email) ? '' : 'Invalid email format'
  isValid &&= !errors.email

  if (!form.emailRepeat.trim()) {
    errors.emailRepeat = 'Field cannot be empty'
    isValid = false
  } else if (form.emailRepeat !== form.email) {
    errors.emailRepeat = 'Emails do not match'
    isValid = false
  } else {
    errors.emailRepeat = ''
  }

  const pw = form.password
  const pwErrors = []
  if (pw.length < 8) pwErrors.push('min. 8 chars')
  if (!/[a-z]/.test(pw)) pwErrors.push('lowercase')
  if (!/[A-Z]/.test(pw)) pwErrors.push('uppercase')
  if (!/\d/.test(pw)) pwErrors.push('number')
  if (!/[!@#$%^&*()_+]/.test(pw)) pwErrors.push('symbol')

  errors.password = pwErrors.length > 0
    ? `Password must contain: ${pwErrors.join(', ')}`
    : ''
  isValid &&= !errors.password

  errors.passwordRepeat = form.passwordRepeat === form.password
    ? ''
    : 'Passwords do not match'
  isValid &&= !errors.passwordRepeat

  return isValid
}

async function handleSubmit() {
  if (!validateForm()) return

  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
  })

  if (error) {
    await router.push('/register-error')
    return
  }

  // Warten auf Session → notwendig für dieses RLS von spabase!
  const { data: sessionData } = await supabase.auth.getSession()
  const userId = sessionData?.session?.user?.id

  if (!userId) {
    await router.push('/register-error')
    return
  }

  const iq = generateIQ()

  const { error: insertError } = await supabase.from('profiles').insert([
    {
      id: userId,
      username: `${form.firstName} ${form.lastName}`,
      iq: iq,
    },
  ])

  if (insertError) {
     await router.push('/register-error')
    return
  }

  userStore.login(sessionData.session.user)
  await router.push('/register-success')
}
</script>


<style scoped>
.register-page {
  background-color: #9482BC;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  padding-top: 50px;
  padding-bottom: 160px;
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
  margin-bottom: 0px;
  color: #1e1e1e;
  margin-top: -40px;
}

.subtitle {
  font-size: 26px;
  color: #555;
  margin-bottom: 25px;
  margin-top: 10px;
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

.form-row {
  display: flex;
  gap: 12px;
}
.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
.form-column {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

input {
  padding: 12px 14px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fafafa;
}

input:focus {
  outline: none;
  border-color: #BEFFE6;
}

progress {
  width: 100%;
  margin-top: 4px;
  height: 8px;
  border-radius: 4px;
  appearance: none;
  background-color: transparent;
}

progress::-webkit-progress-bar {
  background-color: #eee;
  border-radius: 4px;
}

.red-password::-webkit-progress-value {
  background-color: #ffbebe;
}

.orange-password::-webkit-progress-value {
  background-color: #ffd7be;
}

.green-password::-webkit-progress-value {
  background-color: #BEFFE6;
}

.red-password::-moz-progress-bar {
  background-color: #ffbebe;
}

.orange-password::-moz-progress-bar {
  background-color: #ffd7be;
}

.green-password::-moz-progress-bar {
  background-color: #BEFFE6;
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

.error-message {
  height: 14px;
  font-size: 13px;
  line-height: 14px;
  margin-bottom: 0;
  color: #e74c3c;
  font-weight: 500;
  text-align: left;
  transition: opacity 0.2s ease;
  opacity: 1;
  display: block;
}

.error-message:empty {
  opacity: 0;
}
</style>
