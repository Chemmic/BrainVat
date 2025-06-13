<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/components/stores/userStore'
import { ref } from 'vue'

const userStore = useUserStore()

const showDropdown = ref(false)
import { supabase } from '@/lib/supabase'

async function logout() {
  await supabase.auth.signOut()
  userStore.logout()
}
</script>

<template>
  <header class="header">

    <div class="left">
      <div class="logo">
        <RouterLink to="/">
          <img src="@/assets/Logo_no_background.png" alt="Brain Vat Logo" />
        </RouterLink>
      </div>
    </div>

    <!-- Navigation + Buttons -->
    <div class="right-content">
      <el-menu
        mode="horizontal"
        :default-active="'1'"
        background-color="transparent"
        text-color="#1E1E1E"
        active-text-color="#1E1E1E"
        class="menu"
      >
        <el-menu-item index="1" @click="$router.push('/jobs')">View Jobs</el-menu-item>

        <el-menu-item index="2">Resources</el-menu-item>
        <el-menu-item index="3">Contact</el-menu-item>
      </el-menu>

      <div v-if="!userStore.isLoggedIn" class="button-group">
        <RouterLink to="/login">
          <el-button type="default" plain class="gray">Sign in</el-button>
        </RouterLink>
        <RouterLink to="/register">
          <el-button type="primary" class="black">Register</el-button>
        </RouterLink>
      </div>



      <div v-else class="user-dropdown">
        <div @click="showDropdown = !showDropdown" class="account-btn">
          Account ⌄
        </div>
        <div class="dropdown" v-if="showDropdown">
          <RouterLink to="/profile">Profile</RouterLink>
          <button @click="logout">Log out</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>


.user-dropdown {
  position: relative;
  z-index: 1000;
}

.account-btn {
  cursor: pointer;
  padding: 10px 16px;
  background-color: #f0f0f0;
  border-radius: 6px;
  font-weight: 500;
  user-select: none;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-width: 160px;
  z-index: 1050;
}

.dropdown a,
.dropdown button {
  padding: 10px 16px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
  color: #333;

}

.dropdown a:hover,
.dropdown button:hover {
  background-color: #f5f5f5;
}
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 950;
  align-items: center;
  padding: 0 2rem;
  height: 120px;
  background-color: white;
  border-bottom: 1px solid #eee;
}

.left {
  flex: 1;
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 100%;
  max-height: 90px;
  cursor: pointer;
}


.logo a {
  all: unset;
  display: flex;
}

.right-content {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: flex-end;
  flex: 1;
  min-width: 0;
}

.menu {
  border-bottom: none !important;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  min-width: 500px;
  max-width: 600px;
}

::v-deep(.el-menu-item) {
  font-size: 17px;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
}

.button-group {
  display: flex;
  gap: 12px;
}

.button-group .el-button {
  font-size: 16px;
  padding: 10px 20px;
  height: auto;
  line-height: 1.2;
  border-radius: 6px;
}

.black {
  background-color: black;
  color: white;
  border: none;
}

.gray {
  background-color: #D9D9D9;
  color: black;
  border: none;
}
</style>
