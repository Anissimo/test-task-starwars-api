<template>
  <div class="container">
    <ReturnHome title="Films" />

    <!-- Здесь компонент поиска в дальнейшем будет -->

    <!-- Здесь мейби фильтры и сортировка -->

    <a-row :gutter="16">
      <a-col :span="24" v-for="film in films" :key="film.title">
        <OneFilm :film="film" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import axios, { AxiosResponse } from "axios";
import OneFilm from "../components/OneFilm.vue";
import ReturnHome from "../components/ReturnHome.vue";
import { IFilm } from "@/types/interfaces";

export default defineComponent({
  components: {
    OneFilm,
    ReturnHome,
  },
  setup() {
    const films = ref<IFilm[]>([]);

    async function fetchNames(urls: any) {
      const names = [];
      for (let i = 0; i < Math.min(5, urls.length); i++) {
        const response = await axios.get(urls[i]);
        names.push(response.data.name);
      }
      return names;
    }

    onMounted(async () => {
      try {
        const response = await axios.get("https://swapi.dev/api/films/");
        const filmIds = response.data.results.map(
          (film: any) => film.url.match(/\/films\/(\d+)\//)[1]
        );

        for (const id of filmIds) {
          const filmResponse: AxiosResponse<any> = await axios.get(
            `https://swapi.dev/api/films/${id}/`
          );
          const filmData = filmResponse.data;
          for (const key of [
            "characters",
            "planets",
            "species",
            "starships",
            "vehicles",
          ]) {
            if (Array.isArray(filmData[key])) {
              filmData[key] = await fetchNames(filmData[key]);
            }
          }
          films.value.push(filmData);
        }
      } catch (error) {
        console.error(error);
      }
    });

    return { films };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column wrap;
  align-items: flex-start;
}
</style>
