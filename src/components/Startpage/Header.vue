<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/components/stores/userStore'
import { ref, computed } from 'vue'
import { supabaseCopy } from '@/lib/supabaseCopy.js'
import { onMounted, onBeforeUnmount } from 'vue'

const dropdownRef = ref(null)


const userStore = useUserStore()
const showDropdown = ref(false)

const route = useRoute()
const router = useRouter()

const activeMenuItem = computed(() => {
  const path = route.path
  if (path.startsWith('/jobs')) return '1'
  if (path.startsWith('/contact')) return '2'
  return ''
})

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

async function logout() {
  await supabaseCopy.auth.signOut()
  userStore.logout()
}
</script>

<template>
  <header class="header">
    <div class="left">
      <RouterLink to="/" class="logo">
        <img src="@/assets/Logo_no_background.png" alt="Brain Vat Logo" />
      </RouterLink>
    </div>

    <div class="right">
      <div class="actions">
        <el-menu
          mode="horizontal"
          :default-active="activeMenuItem"
          background-color="transparent"
          text-color="#333238"
          active-text-color="#000"
          :ellipsis="false"
          class="menu"
        >
          <el-menu-item index="1" @click="$router.push('/jobs')" class="buttons">View Jobs</el-menu-item>
          <el-menu-item index="2" @click="$router.push('/contact')" class="buttons">Contact</el-menu-item>
        </el-menu>

        <div v-if="!userStore.isLoggedIn" class="button-group">
          <RouterLink to="/login">
            <el-button type="info" plain class="gray">Sign in</el-button>
          </RouterLink>
          <RouterLink to="/register">
            <el-button type="primary" class="black">Register</el-button>
          </RouterLink>
        </div>

        <div v-else class="user-dropdown" ref="dropdownRef">
          <div @click="showDropdown = !showDropdown" class="account-btn">
            Account ⌄
          </div>
          <div class="dropdown" v-if="showDropdown">
            <RouterLink to="/profile">Profile</RouterLink>
            <RouterLink to="/my-jobs">My Jobs</RouterLink>
            <button @click="logout">Log out</button>
          </div>
        </div>

      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  padding: 0 2rem;
  background-color: white;
  border-bottom: 1px solid #eee;
}

.left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo img {
  max-height: 90px;
  height: 100%;
  cursor: pointer;
}

.right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  overflow: visible;
}

.buttons {
  margin-right: 20px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: nowrap;
}

.menu {
  display: flex;
  align-items: center;
  border-bottom: none !important;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: visible;
  margin-right: 60px;
}

::v-deep(.el-menu-item) {
  font-size: 17px;
  padding: 0 20px;
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
  border-radius: 6px;
  height: auto;
  line-height: 1.2;
}

.black {
  background-color: #333238;
  color: white;
  border: none;
}

.black:hover {
  background-color: #7D8088;
}

.gray {
  background-color: #B4C9DC;
  color: #333238;
  border: none;
}

.gray:hover {
  background-color: #c7dff3;
}

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
  color: #333238;
}

.dropdown a:hover,
.dropdown button:hover {
  background-color: #f5f5f5;
}
</style>
