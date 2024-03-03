<template>
  <div class="grades">
    <DataTable
      :value="data"
      columnResizeMode="expand"
      showGridlines
      stripedRows
      rowGroupMode="rowspan"
      sortMode="single"
      :sortOrder="1"
      tableStyle="min-width: 50rem"
    >
      <Column
        headerClass="column-header_center"
        bodyClass="column-header_center"
        field="order"
        header="№"
        style="width: 5%"
        headerStyle="width: 5%"
      />
      <Column field="fullname" header="ФИО" style="width: 400px" />

      <Column
        headerClass="column-header_center"
        bodyClass="column-header_center"
        v-for="lesson of lessons"
        :key="lesson"
        :field="lesson"
        :header="lesson"
        style="width: 25px"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup>
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'

  import { ref } from 'vue'

  const data = ref([
    {
      order: '1',
      fullname: 'Кириллов Даниил Павлович',
      11.02: 2,
      12.02: 3,
      13.02: 5,
      14.02: 5,
      15.02: 5,
      16.02: 5,
      17.02: 5,
      18.02: 5,
      19.02: 5,
      20.02: 5,
      21.02: 5,
      22.02: 5,
      23.02: 5,
      24.02: 5,
      25.02: 5,
    },
  ])

  const lessons = ref([
    '11.02',
    '12.02',
    '13.02',
    '14.02',
    13.02,
    14.02,
    15.02,
    16.02,
    17.02,
    18.02,
    19.02,
    20.02,
    21.02,
    22.02,
    23.02,
    24.02,
    25.02,
  ])
</script>

<style lang="scss">
  .column-header_center {
    .p-column-header-content {
      justify-content: center;
    }
  }

  .column-header_center {
    text-align: center;
  }
</style>
