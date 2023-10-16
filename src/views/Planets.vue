<template>
  <div class="container">
    <h2>Planets.vue</h2>
    <router-link to="/">
      <a-button>Назад</a-button>
    </router-link>
    <a-table
      :dataSource="planets"
      :columns="columns"
      rowKey="name"
      @change="handleTableChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { IPlanet, PlanetResponse } from "@/types/interfaces";
import _ from "lodash";

const planets = ref<IPlanet[]>([]);
const columns = [
  { title: "Название", dataIndex: "name", key: "name", sorter: true },
  { title: "Климат", dataIndex: "climate", key: "climate", sorter: true },
  { title: "Диаметр", dataIndex: "diameter", key: "diameter", sorter: true },
  { title: "Создано", dataIndex: "created", key: "created" },
  { title: "Изменено", dataIndex: "edited", key: "edited" },
  { title: "Гравитация", dataIndex: "gravity", key: "gravity" },
  {
    title: "Период орбиты",
    dataIndex: "orbital_period",
    key: "orbital_period",
    sorter: true,
  },
  {
    title: "Население",
    dataIndex: "population",
    key: "population",
    sorter: true,
  },
  {
    title: "Период вращения",
    dataIndex: "rotation_period",
    key: "rotation_period",
    sorter: true,
  },
  {
    title: "Поверхностная вода",
    dataIndex: "surface_water",
    key: "surface_water",
    sorter: true,
  },
  { title: "Местность", dataIndex: "terrain", key: "terrain" },
] as const;

onMounted(async () => {
  try {
    const response = await axios.get<PlanetResponse>(
      "https://swapi.dev/api/planets"
    );

    planets.value = response.data.results;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});

const handleTableChange = (
  pagination: unknown,
  filters: unknown,
  sorter: { field: keyof IPlanet; order: string }
) => {
  if (sorter.order === "ascend") {
    planets.value = _.sortBy(planets.value, [
      (planet) => {
        const value = planet[sorter.field];
        return isNaN(Number(value)) ? value : Number(value);
      },
    ]);
  } else if (sorter.order === "descend") {
    planets.value = _.sortBy(planets.value, [
      (planet) => {
        const value = planet[sorter.field];
        return isNaN(Number(value)) ? value : Number(value);
      },
    ]).reverse();
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
