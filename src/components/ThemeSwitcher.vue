<template>
  <div class="theme-switcher">
    <input type="checkbox" v-model="isDarkTheme" @change="toggleTheme" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ThemeSwitcher",
  setup() {
    const isDarkTheme = ref(false);

    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
      document.body.classList.toggle("dark-theme", isDarkTheme.value);
    };

    return {
      isDarkTheme,
      toggleTheme,
    };
  },
});
</script>

<style scoped>
.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
