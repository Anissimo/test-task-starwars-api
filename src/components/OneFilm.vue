<template>
  <a-card class="a-card" :title="film.title" :bordered="true">
    <a-row class="info-row">
      <a-col :span="8" class="info-col" v-for="(value, key) in film" :key="key">
        <strong>{{ key }}:</strong>
        {{ Array.isArray(value) ? value.join(", ") : value }}
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IFilm } from "@/types/interfaces";

export default defineComponent({
  props: {
    film: {
      type: Object as () => IFilm,
      required: true,
    },
  },
});
</script>

<style scoped>
.a-card {
  width: 100%; /* Чтобы карточка могла сжиматься по горизонтали */
  margin-bottom: 20px; /* Добавляем немного отступа снизу для каждой карточки */
}

.info-row {
  flex-direction: column;
}

.info-col {
  text-align: left;
  padding: 5px;
}
</style>
