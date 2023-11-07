<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />
  <div class="container center-content" id="main">
    <div class="col-lg-6">
      <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <div>
              <component :is="Component" />
            </div>
          </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
