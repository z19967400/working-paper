<template>
  <div>
    <el-table :data="tableData" show-header>
      <el-table-column
        v-for="item in tableDataName"
        label-width="180"
        :key="item.id"
        :prop="item.filename"
        :label="item.title"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["tableData", "tableDataName"]
};
</script>

<style></style>
