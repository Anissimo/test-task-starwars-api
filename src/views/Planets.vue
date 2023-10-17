<template>
  <div class="container">
    <ReturnHome title="Planets" />
    <a-table
      :dataSource="planets"
      :columns="columns"
      :pagination="false"
      rowKey="name"
      class="a-table"
      @change="handleTableChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { IPlanet, PlanetResponse, Sorter } from "@/types/interfaces";
import _ from "lodash";
import ReturnHome from "../components/ReturnHome.vue";
const planets = ref<IPlanet[]>([]);
const columns = [
  { title: "Name", dataIndex: "name", key: "name", sorter: true },
  { title: "Climate", dataIndex: "climate", key: "climate", sorter: true },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
    sorter: true,
    render: (text: string) => new Date(text).toLocaleString(),
  },
  {
    title: "Edited",
    dataIndex: "edited",
    key: "edited",
    sorter: true,
    render: (text: string) => new Date(text).toLocaleString(),
  },
  { title: "Гравитация", dataIndex: "gravity", key: "gravity" },
  {
    title: "Orbital_period",
    dataIndex: "orbital_period",
    key: "orbital_period",
    sorter: true,
  },
  {
    title: "Population",
    dataIndex: "population",
    key: "population",
    sorter: true,
  },
  {
    title: "Rotation period ",
    dataIndex: "rotation_period",
    key: "rotation_period",
    sorter: true,
  },
  {
    title: "Surface water",
    dataIndex: "surface_water",
    key: "surface_water",
    sorter: true,
  },
  { title: "Terrain", dataIndex: "terrain", key: "terrain" },
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
  sorter: Sorter
) => {
  if (typeof sorter.field === "string") {
    if (sorter.order === "ascend") {
      planets.value = _.sortBy(planets.value, [
        (planet) => {
          const value = planet[sorter.field];
          return typeof value === "string" || typeof value === "number"
            ? isNaN(Number(value))
              ? new Date(value).getTime()
              : Number(value)
            : 0;
        },
      ]);
    } else if (sorter.order === "descend") {
      planets.value = _.sortBy(planets.value, [
        (planet) => {
          const value = planet[sorter.field];
          return typeof value === "string" || typeof value === "number"
            ? isNaN(Number(value))
              ? new Date(value).getTime()
              : Number(value)
            : 0;
        },
      ]).reverse();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.a-table {
  // width: min-content;
  height: min-content;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
