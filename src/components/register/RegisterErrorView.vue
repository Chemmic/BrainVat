<template>
  <div class="message-view">
    <h1 class="title error">Registration Failed</h1>
    <p class="subtitle">Something went wrong. Please try again later.</p>
    <p class="subtitle">Is this Email already registered?</p>
    <RouterLink to="/register" class="btn">Back to Registration</RouterLink>
  </div>
</template>

<script setup>
</script>

<style scoped>
.message-view {
  padding: 100px 20px;
  text-align: center;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1e1e1e;
}

.title.error {
  color: #e74c3c;
}

.subtitle {
  font-size: 20px;
  color: #555;
  margin-bottom: 40px;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background-color: black;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: #333;
}
</style>
