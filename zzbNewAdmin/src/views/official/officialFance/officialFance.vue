<template>
  <div class="officialFance-wrap">
    <div class="officialFance-box">
      <comselect
        :options="data.options"
        @select="search"
        @clear="clearSelection"
      ></comselect>
      <comOperation :totalize="data.totalize" @add="add"></comOperation>
      <comtable
        :tableData="data.list"
        :load="data.loading"
        :tableType="data.dataType"
        @Edit="handleEdit"
        @Delete="handleDelete"
      ></comtable>
      <comPaging
        :page="getData.page"
        :totalize="data.totalize"
        @watchChange="watchChange"
      ></comPaging>
    </div>
  </div>
</template>

<script lang="ts" src="./officialFance.ts"></script>

<style lang="scss">
@import './officialFance.scss';
</style>
