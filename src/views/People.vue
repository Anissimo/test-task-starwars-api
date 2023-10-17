<template>
  <div class="container">
    <ReturnHome title="People" class="return-home" />
    <a-table
      v-if="loaded"
      :dataSource="people"
      :columns="columns"
      :pagination="false"
      rowKey="url"
    >
      <template #gender="{ text }">
        <img :src="getGenderIcon(text)" alt="Gender Icon" />
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, h } from "vue";
import axios from "axios";
import moment from "moment";
import { IPeople } from "@/types/interfaces";
import ReturnHome from "../components/ReturnHome.vue";

export default defineComponent({
  components: {
    ReturnHome,
  },
  setup() {
    const people = ref<IPeople[]>([]);
    const loaded = ref(false);
    const columns = [
      { title: "Name", dataIndex: "name" },
      { title: "Birth Year", dataIndex: "birth_year" },
      { title: "Eye Color", dataIndex: "eye_color" },
      {
        title: "Gender",
        dataIndex: "gender",
        customRender: ({ text }: { text: string }) => {
          return h("img", {
            src: getGenderIcon(text),
            alt: "Gender Icon",
            width: 20,
            height: 20,
          });
        },
      },
      { title: "Hair Color", dataIndex: "hair_color" },
      { title: "Height", dataIndex: "height" },
      { title: "Homeworld", dataIndex: "homeworld" },
      { title: "Mass", dataIndex: "mass" },
      { title: "Skin Color", dataIndex: "skin_color" },
      {
        title: "Created",
        dataIndex: "created",
        customRender: ({ text }: { text: string }) => {
          return moment(text).format("MMMM Do YYYY, h:mm:ss a");
        },
      },
      {
        title: "Edited",
        dataIndex: "edited",
        customRender: ({ text }: { text: string }) => {
          return moment(text).format("MMMM Do YYYY, h:mm:ss a");
        },
      },
      { title: "Species", dataIndex: "species" },
    ];

    const fetchDetails = async (urls: string[]) => {
      const details = await Promise.all(
        urls.map((url: string) => axios.get(url))
      );
      return details.map(
        (detail: { data: { name: string } }) => detail.data.name
      );
    };

    onMounted(async () => {
      loaded.value = true;
      const response = await axios.get("https://swapi.dev/api/people/");

      for (let person of response.data.results) {
        switch (typeof person.homeworld) {
          case "string":
            const homeworld = await fetchDetails([person.homeworld]);
            person.homeworld = homeworld[0];
            break;
        }
        switch (true) {
          case Array.isArray(person.species):
            person.species = await fetchDetails(person.species);
            break;
        }
      }

      people.value = response.data.results;
    });
    const getGenderIcon = (gender: string) => {
      switch (gender) {
        case "male":
          return require("@/assets/icons/male-gender.svg");
        case "female":
          return require("@/assets/icons/female-gender.svg");
        default:
          return require("@/assets/icons/n-a-gender.svg");
      }
    };
    return { people, columns, loaded, getGenderIcon };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}
</style>
