<template>
  <div class="home">
    {{ state }}

    <el-button @click="refetch">refetch</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import useAxios from '@/composables/use-axios'

export default defineComponent({
  setup() {
    const { state, refetch } = useAxios(
      {
        url: 'http://localhost:8080/',
        method: 'get'
      },
      { manual: true }
    )

    return { state, refetch }
  }
})
</script>
