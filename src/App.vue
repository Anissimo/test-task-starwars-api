<template>
  <a-config-provider
    :theme="{
      algorithm: theme.darkAlgorithm,
      token: {
        fontFamily: 'Montserrat, sans-serif',
      },
    }"
  >
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { theme } from "ant-design-vue";
export default defineComponent({
  name: "App",
  setup() {
    return {
      theme,
    };
  },
});
</script>

<style>
#app {
  box-sizing: border-box;
  text-align: center;
  margin-top: 20px;
}
body {
  background: #141414;
}
</style>
