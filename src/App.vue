<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <AppNavbar v-if="showNavbar"/>
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuthStore } from './stores';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const route = useRoute()
const authStore = useAuthStore()
const { isLogged } = storeToRefs(authStore)

const showNavbar = computed(() => {
  return route.meta.showNavbar
})
</script>

<style scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
