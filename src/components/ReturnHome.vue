<template>
  <div class="container-for-button">
    <router-link to="/">
      <a-button>Go back</a-button>
    </router-link>
    <h2>{{ title }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.container-for-button {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px;
  // position: absolute;
  // top: 0;
  // left: 0;
  z-index: 1;
  a-button {
    margin: 0;
    padding: 10px 20px;
  }

  h2 {
    margin: 0;
    font-size: 1.5em;
    color: rgba(255, 255, 255, 0.85);
  }
}
</style>
