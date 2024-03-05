<template>
  <div class="HomeView">
    <Button label="Ping" @click="onClickButton" />
    <div>{{ message }}</div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import Api from '@/services/Api'

  const message = ref('')

  const onClickButton = async () => {
    const { data } = await Api.ping()
    message.value = data
  }
</script>
