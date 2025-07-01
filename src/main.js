import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import { createPinia } from 'pinia'

import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'vue-double-slider/dist/style.css'
import vueDoubleSlider from 'vue-double-slider'


import { faXTwitter, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'
library.add(faXTwitter, faInstagram, faYoutube, faLinkedin)
import { useUserStore } from '@/components/stores/userStore'
import { supabaseCopy } from '@/lib/supabaseCopy.js'


const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.use(vueDoubleSlider)

const userStore = useUserStore()

supabaseCopy.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    userStore.login(session.user)
  }
})

app.mount('#app')
