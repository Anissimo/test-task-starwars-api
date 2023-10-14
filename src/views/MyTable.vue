<template>
  <a-row :gutter="16" direction="column">
    <a-col :span="24">
      <a-card>
        <a-row align="middle">
          <a-col :span="6">{{ headers[0].title }}</a-col>
          <a-col :span="6">{{ headers[1].title }}</a-col>
          <a-col :span="6">{{ headers[2].title }}</a-col>
          <a-col :span="6">{{ headers[3].title }}</a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-col :span="24" v-for="item in dataSource" :key="item.key">
      <a-card>
        <a-row align="middle">
          <a-col :span="6">{{ item.key }}</a-col>
          <a-col :span="6">{{ item.name }}</a-col>
          <a-col :span="6">{{ item.api }}</a-col>
          <a-col :span="6"
            ><a-button @click="goTo(item.api)">Кнопка</a-button></a-col
          >
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import DataType from "@/types/interfaces";

export default defineComponent({
  setup() {
    const router = useRouter();
    const headers = [
      { key: "1", title: "Номер" },
      { key: "2", title: "Название" },
      { key: "3", title: "АПИ" },
      { key: "4", title: "" },
    ];
    const dataSource: DataType[] = [
      { key: "1", name: "films", api: "films" },
      { key: "2", name: "people", api: "people" },
      { key: "3", name: "planets", api: "planets" },
      { key: "4", name: "species", api: "species" },
      { key: "5", name: "starships", api: "starships" },
      { key: "6", name: "vehicles", api: "vehicles" },
    ];
    const goTo = (api: string) => {
      router.push(`/${api}`);
    };
    return {
      headers,
      dataSource,
      goTo,
    };
  },
});
</script>
