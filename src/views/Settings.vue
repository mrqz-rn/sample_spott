<template>
  <div class="flex items-center justify-center bg-zinc-900 h-screen">
      <div class="bg-slate-900 rounded shadow-md w-full max-w-lg h-screen content-center p-8" >
        <h1 class="absolute top-8 text-xl font-bold w-md text-white">
          Settings
        </h1>
        <div>
            <div>
                <button @click="confirm_remove_user"
                  class="w-full bg-green-700 text-white text-lg py-3 my-2 rounded-full hover:bg-green-800 active:scale-96 transition duration-150">
                  Remove User Session
                </button>
                  <button @click="confirm_remove_attlogs"
                  class="w-full bg-blue-700 text-white text-lg py-3 my-2 rounded-full hover:bg-blue-800 active:scale-96 transition duration-150">
                  Reset Attlogs
                </button>
            </div>
            <div class="absolute bottom-20 w-md">
              <button @click="confirm_logout"
                class="w-full bg-rose-600 text-white text-lg py-3 my-2 rounded-full hover:bg-rose-700 active:scale-96 transition duration-150">
                Logout
              </button>
            </div>
        </div>
      </div>
      <ConfirmModal :options="modal_object.user" @confirm="remove_user"/>
      <ConfirmModal :options="modal_object.attlogs" @confirm="remove_attlogs"/>
      <ConfirmModal :options="modal_object.logout" @confirm="logout"/>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessionStore';
import { loader } from '@/stores/loaderStore'
import { alertmodal } from '@/stores/alertStore'
import ConfirmModal from '@/components/ConfirmModal.vue';
import { reactive } from 'vue';


const sessionStore = useSessionStore()
const router = useRouter()


const modal_object = reactive({
  user: {
    type: 'confirm',
    status: false,
    message: '',
  },
  attlogs: {
    type: 'confirm',
    status: false,
    message: '',
  },
  logout: {
    type: 'confirm',
    status: false,
    message: '',
  }
})


const confirm_remove_user = () => {
  modal_object.user.status = true
  modal_object.user.message = 'Are you sure you want to remove the user session?'
}
const remove_user = () => {
  sessionStore.removeUserSession()
  alertmodal.show('Success', 'User Session Removed')
}

const confirm_remove_attlogs = () => {
  modal_object.attlogs.status = true
  modal_object.attlogs.message = 'Are you sure you want to reset the attlogs?'
}
const remove_attlogs = () => {
  sessionStore.removeAttlogSession()
  alertmodal.show('Success', 'Attlogs Reset')
}

const confirm_logout = () => {
  modal_object.logout.status = true
  modal_object.logout.message = 'Are you sure you want to logout?'
}
const logout = () => {
  loader.show('Please wait...')
  sessionStore.logout()
  router.push('/').then(() => { loader.hide() })
}



</script>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 2rem;
}
</style>
