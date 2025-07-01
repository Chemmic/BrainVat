<template>
  <div class="contact-container">
    <el-card class="contact-card" shadow="always">
      <h2>Contact Us</h2>

      <el-form :model="form" :rules="rules" ref="contactForm" label-position="top">
        <el-form-item label="Category" prop="category">
          <el-select v-model="form.category" placeholder="Please select a category">
            <el-option label="Support" value="support" />
            <el-option label="Feedback" value="feedback" />
            <el-option label="Partnership" value="partner" />
            <el-option label="Other" value="other" />
          </el-select>
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="Your email address" />
        </el-form-item>

        <el-form-item label="Message" prop="message">
          <el-input
            type="textarea"
            v-model="form.message"
            :rows="5"
            placeholder="How can we help you?"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" class="black">Submit</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const form = reactive({
  category: '',
  email: '',
  message: ''
})

const rules = {
  category: [{ required: true, message: 'Please select a category', trigger: 'change' }],
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Invalid email format', trigger: 'blur' }
  ],
  message: [{ required: true, message: 'Message cannot be empty', trigger: 'blur' }]
}

const contactForm = ref(null)

const submitForm = () => {
  contactForm.value.validate((valid) => {
    if (valid) {

      ElMessage.success('Message sent successfully!')
      resetForm()
    } else {
      ElMessage.error('Please fill out the required fields correctly.')
    }
  })
}

const resetForm = () => {
  contactForm.value.resetFields()
}
</script>

<style scoped>
.contact-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  height: 100%;
  background-color: #f5f5f5;
}

.contact-card {
  width: 100%;
  max-width: 600px;
}

.black {
  background-color: #333238;
  color: white;
  border: none;
}

</style>
