<template>
  <AppHeader />

  <RouterView />
</template>

<script setup lang="ts">
  import AppHeader from '@/components/common/AppHeader/AppHeader.vue'
  import { RouterView } from 'vue-router'
</script>
