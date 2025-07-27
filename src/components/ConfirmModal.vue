<template>
      <transition name="popup">
        <div
            v-if="options.status"
            class="absolute inset-0 bg-black/35 backdrop-invert backdrop-opacity-10 flex items-center justify-center z-50"
        >
            <div class="bg-white w-80 p-6 rounded-lg shadow-lg text-center space-y-4">
            <h2 class="text-lg font-semibold">Notice</h2>
            <p class="text-sm text-gray-600">{{ options.message }}</p>
            <div class="flex gap-4 justify-center">
                <button @click="options.status = false"
                    class="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 active:scale-96 transition duration-150">
                    Cancel
                </button>
                <button @click="confirm_event"
                    class="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 active:scale-96 transition duration-150">
                    Confirm
                </button>
            </div>
            </div>
        </div>
    </transition>

</template>

<script setup lang="ts">
const props = defineProps<{
  options: { type: string; status: boolean, message: string }
}>()


const emit = defineEmits<{
  (e: 'confirm'): void
}>()


const confirm_event = () => {
    emit('confirm');
    props.options.status = false
}


</script>


<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: all 0.25s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
</style>
