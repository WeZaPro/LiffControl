import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createGtm } from '@gtm-support/vue-gtm'

createApp(App)
  .use(
    createGtm({
      id: 'GTM-PZJBQS8Z', // GTM ID
    })
  )
  .use(router)
  .mount('#app')
