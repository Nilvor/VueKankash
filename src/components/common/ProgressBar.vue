<template>
  <Vue3Lottie style="z-index: 100" :animationData="AstronautJSON" :height="100" :width="100" class="loading"/>
</template>

<script>

import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import AstronautJSON from '../../assets/json/loading.json'

export default {
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      AstronautJSON,
    }
  },
}


</script>
