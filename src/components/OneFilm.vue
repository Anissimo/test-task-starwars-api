<template>
  <a-card class="a-card" :title="film.title">
    <p>Режиссер: {{ film.director }}</p>
    <p>Продюсер: {{ film.producer }}</p>
    <p>Дата выпуска: {{ film.release_date }}</p>
    <p>Эпизод: {{ film.episode_id }}</p>
    <div v-if="showMore">
      <p>Открывающий текст: {{ film.opening_crawl }}</p>
      <p>Персонажи: {{ film.characters.length }}</p>
      <p>Планеты: {{ film.planets.length }}</p>
      <p>Звездолеты: {{ film.starships.length }}</p>
      <p>Транспортные средства: {{ film.vehicles.length }}</p>
      <p>Виды: {{ film.species.length }}</p>
    </div>
    <a-button class="button-seemore" @click="showMore = !showMore">{{
      showMore ? "Смотреть меньше" : "Смотреть больше..."
    }}</a-button>
  </a-card>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  film: Object,
});

const showMore = ref(false);
</script>

<style scoped>
p {
  text-align: left;
}
.a-card {
  /* display: flex;
  justify-content: flex-start; */
}

.button-seemore {
    /* margin-left: 0; */
}
</style>
