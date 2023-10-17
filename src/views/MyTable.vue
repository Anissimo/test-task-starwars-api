<template>
  <div class="table-wrapper">
    <a-row :gutter="16" direction="column">
      <a-col :span="12" :offset="6">
        <a-card>
          <a-row align="middle">
            <a-col class="a-col" :span="6">{{ headers[0].title }}</a-col>
            <a-col class="a-col" :span="6">{{ headers[1].title }}</a-col>
            <a-col class="a-col" :span="6">{{ headers[2].title }}</a-col>
            <a-col class="a-col" :span="6">{{ headers[3].title }}</a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="12" :offset="6" v-for="item in dataSource" :key="item.key">
        <a-card>
          <a-row align="middle">
            <a-col class="a-col" :span="6">{{ item.key }}</a-col>
            <a-col class="a-col-resourse-type" :span="6">{{
              item.resourceType
            }}</a-col>
            <a-col class="a-col" :span="6">/{{ item.api }}</a-col>
            <a-col class="a-col" :span="6"
              ><a-button @click="goTo(item.api)">See more...</a-button></a-col
            >
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { ResourcesType } from "@/types/interfaces";

export default defineComponent({
  setup() {
    const router = useRouter();
    const headers = [
      { key: "1", title: "Number" },
      { key: "2", title: "Resource Type" },
      { key: "3", title: "API" },
      { key: "4", title: "More Info" },
    ];
    const dataSource = Object.values(ResourcesType).map(
      (resourceType, index) => ({
        key: (index + 1).toString(),
        resourceType,
        api: resourceType,
      })
    );
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

<style scoped lang="scss">
.table-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.a-col {
  text-align: left;
  &-resourse-type {
    @extend .a-col;
    text-transform: capitalize;
  }
}
</style>
