<template>
  <div class="container">
    <h2>Films.vue</h2>
    <router-link to="/">
      <a-button>Назад</a-button>
    </router-link>

    <!-- Здесь будет компонент поиска -->

    <!-- Здесь будут фильтры и сортировка -->

    <a-row :gutter="16">
      <a-col :span="24" v-for="film in films" :key="film.title">
        <OneFilm :film="film" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import OneFilm from "../components/OneFilm.vue";

const films = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("https://swapi.dev/api/films/");
    const filmIds = response.data.results.map(
      (film) => film.url.match(/\/films\/(\d+)\//)[1]
    );

    for (const id of filmIds) {
      const filmResponse = await axios.get(
        `https://swapi.dev/api/films/${id}/`
      );
      films.value.push(filmResponse.data);
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
