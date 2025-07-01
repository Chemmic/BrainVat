<template>
  <div class="layout">
    <Header class="header" />
    <main class="main-scroll-container">
      <RouterView />
    </main>
    <Footer class="footer" />
  </div>
</template>

<script setup>
import Header from '@/components/Startpage/Header.vue'
import Footer from '@/components/Startpage/Footer.vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/components/stores/userStore'
import { supabase } from '@/lib/supabase.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

let idleTimer
const idleLimit = 10 * 60 * 1000 // 10 Minuten

function resetIdleTimer() {
  clearTimeout(idleTimer)
  idleTimer = setTimeout(async () => {
    await supabase.auth.signOut()
    userStore.logout()
    router.push('/login')
  }, idleLimit)
}

const activityEvents = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart']

onMounted(() => {
  activityEvents.forEach(evt => window.addEventListener(evt, resetIdleTimer))
  resetIdleTimer()
})

onBeforeUnmount(() => {
  activityEvents.forEach(evt => window.removeEventListener(evt, resetIdleTimer))
  clearTimeout(idleTimer)
})
</script>

<style scoped>
.layout {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

*:focus,
*:active {
  outline: none !important;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  z-index: 950;
}


.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px; /*  80px */
  z-index: 100;
}


.main-scroll-container {
  position: absolute;
  top: 120px;
  bottom: 80px;
  left: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}
</style>