<template>
  <div class="container">
    <h2>People.vue</h2>
    <a-table :dataSource="people" :columns="columns" rowKey="url">
      <template v-slot:gender="{ text }">
        <img :src="getGenderIcon(text)" :alt="text + '-icon'" />
      </template>
    </a-table>
    <router-link to="/">
      <a-button>Назад</a-button>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const people = ref([]);
const columns = [
  { title: "Имя", dataIndex: "name", key: "name" },
  { title: "Рост", dataIndex: "height", key: "height" },
  { title: "Масса", dataIndex: "mass", key: "mass" },
  { title: "Цвет волос", dataIndex: "hair_color", key: "hair_color" },
  { title: "Цвет кожи", dataIndex: "skin_color", key: "skin_color" },
  { title: "Цвет глаз", dataIndex: "eye_color", key: "eye_color" },
  { title: "Год рождения", dataIndex: "birth_year", key: "birth_year" },
  { title: "Пол", dataIndex: "gender", key: "gender" },
];

const getGenderIcon = (gender) => {
  if (gender === 'male') {
    return require('@/assets/icons/male-gender.svg');
  } else if (gender === 'female') {
    return require('@/assets/icons/female-gender.svg');
  } else {
    return require('@/assets/icons/n-a-gender.svg');
  }
};

onMounted(async () => {
  const response = await axios.get("https://swapi.dev/api/people/");
  people.value = response.data.results;
});
</script>
