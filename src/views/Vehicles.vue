<template>
  <div class="container">
    <ReturnHome title="Vehicles" />
    <a-table
      :dataSource="vehicles"
      :columns="columns"
      :pagination="pagination"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { Table } from "ant-design-vue";
import ReturnHome from "../components/ReturnHome.vue";

export default defineComponent({
  name: "VehiclesTable",
  components: {
    aTable: Table,
    ReturnHome,
  },
  setup() {
    const vehicles = ref([]);
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Model",
        dataIndex: "model",
        key: "model",
      },
      {
        title: "Manufacturer",
        dataIndex: "manufacturer",
        key: "manufacturer",
      },
      {
        title: "Cost in Credits",
        dataIndex: "cost_in_credits",
        key: "cost_in_credits",
      },
      {
        title: "Length",
        dataIndex: "length",
        key: "length",
      },
    ];

    const pagination = {
      pageSize: 3,
      position: ["bottomCenter"],
    };

    onMounted(async () => {
      const response = await fetch("https://swapi.dev/api/vehicles/");
      const data = await response.json();
      vehicles.value = data.results;
    });

    return { vehicles, columns, pagination };
  },
});
</script>

<style scoped>
.ant-pagination {
  justify-content: center;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}
</style>
