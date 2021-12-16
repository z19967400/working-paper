<template>
  <div class="bigData-wrap">
    <div class="bigData-box">
      <comselect
        :options="data.options"
        @select="search"
        @clear="clearSelection"
      ></comselect>
      <comOperation
        :totalize="data.totalize"
        :addshow="false"
        @add="add"
      ></comOperation>
      <comtable
        :tableData="data.list"
        :load="data.loading"
        :tableType="data.dataType"
        @Edit="handleEdit"
        @Delete="handleDelete"
        :operation="false"
      ></comtable>
      <comPaging
        :page="getData.page"
        :totalize="data.totalize"
        @watchChange="watchChange"
      ></comPaging>
    </div>
  </div>
</template>

<script lang="ts" src="./bigData.ts"></script>

<style lang="scss">
@import './bigData.scss';
</style>
