<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

export default defineComponent({
  name: 'App',
  components: {},

  setup(props, context) {
    onMounted(() => {
      context.root.$i18n.locale = 'zh'
    })
  }
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
