<template>
  <DataTable
    class="LessonsTable"
    :value="products"
    stripedRows
    :rowClass="() => 'LessonsTable__row'"
    editMode="cell"
    @cell-edit-complete="onCellEditComplete"
  >
    <!-- Дата -->
    <Column
      headerClass="column-header_center"
      bodyClass="column-cell_center"
      field="date"
      header="Дата"
      headerStyle="width: 100px"
    >
      <template #body="{ data, field }">
        <Tag :value="data[field]"></Tag>
      </template>
    </Column>

    <!-- Время -->
    <Column
      headerClass="column-header_center"
      bodyClass="column-cell_center"
      field="datetimeRange"
      header="Время"
      headerStyle="width: 150px"
    >
      <template #body="{ data, field }">
        <Tag :value="data[field]"></Tag>
      </template>
    </Column>

    <!-- Раздел -->
    <Column
      headerClass="column-header_center"
      bodyClass="column-cell_center"
      field="type"
      header="Вид"
      headerStyle="width: 75px"
    >
      <template #body="{ data, field }">
        <Tag :value="data[field]"></Tag>
      </template>
    </Column>

    <!-- Тема -->
    <Column field="chapter" header="Раздел" headerStyle="width: 300px">
      <template #body="{ data, field }">
        {{ data[field] }}
      </template>
      <template #editor="{ data, field }">
        <CellEditor v-model="data[field]" />
      </template>
    </Column>

    <!-- Задание -->
    <Column field="topic" header="Тема" headerStyle="width: 100%">
      <template #body="{ data, field }">
        {{ data[field] }}
      </template>
      <template #editor="{ data, field }">
        <CellEditor v-model="data[field]" />
      </template>
    </Column>

    <Column
      field="task"
      header="Задание"
      headerClass="column-header_center"
      bodyClass="column-cell_center"
      headerStyle="width: 200px"
    >
      <template #body="{ data, field }">
        <Chip class="LessonsTable__chip" label="Задание - BIOS" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
  import { ref } from 'vue'

  const products = ref([
    {
      date: '03.03.2024',
      datetimeRange: '09:00 - 10:30',
      type: 'ЛК',
      chapter: 'Раздел 1. Древность и средневековье на территории нашей страны',
      topic:
        'Тема 01. Введение. История как объект изучения. Народы и государства на территории нашей страны в древности.',
      task: 'https://google.com',
    },
    {
      date: '03.03.2024',
      datetimeRange: '09:00 - 10:30',
      type: 'СРС',
      chapter: 'Раздел 1. Древность и средневековье на территории нашей страны',
      topic:
        'Тема 02. От древности к средневековью. Древнерусское государство и государственные образования на территории нашей страны (Крым, Северный Кавказ, Поволжье, Сибирь) в IX-XIII вв.',
      task: 'https://google.com',
    },
    {
      date: '03.03.2024',
      datetimeRange: '09:00 - 10:30',
      type: 'ЛАБ',
      chapter: 'Раздел 1. Древность и средневековье на территории нашей страны',
      topic:
        'Тема 03. От Руси к России. Московское государство и другие государства на территории нашей страны в XIV – начале XVII вв. ',
      task: 'https://google.com',
    },
    {
      date: '03.03.2024',
      datetimeRange: '09:00 - 10:30',
      type: 'Сем',
      chapter: 'Раздел 1. Древность и средневековье на территории нашей страны',
      topic:
        'Тема 04. Новый период всемирной и российской истории. Россия в XVII веке. Культура русского и других народов на территории нашей страны в IX - XVII вв.',
      task: 'https://google.com',
    },
  ])

  const onCellEditComplete = event => {
    let { data, newValue, field } = event

    data[field] = newValue
  }
</script>

<style lang="scss">
  .LessonsTable {
    font-size: 14px;

    $row-height: 60px;

    table {
      table-layout: fixed;
    }

    tr {
      height: $row-height;
    }

    .p-cell-editing {
      /* Непонятно почему, но это единственное решение, чтобы растянуть элемент внутри клетки */
      /* https://stackoverflow.com/questions/22220698/height-100-for-div-inside-div-with-display-table-cell#answer-32112698 */
      height: 1px;
      padding: 0;
    }

    &__chip {
      font-size: 14px;
    }
  }

  .column-header_center {
    .p-column-header-content {
      justify-content: center;
    }
  }

  .column-cell_center {
    text-align: center;
  }
</style>
