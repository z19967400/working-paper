<template>
  <div class="logistics-warp">
    <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <!-- <comOperation :totalize="data.totalize" @add="add"></comOperation> -->
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      @Edit="handleEdit"
      @Delete="handleDelete"
    ></comtable>
    <comPaging :totalize="data.totalize" @watchChange="watchChange"></comPaging>
  </div>
</template>
<script lang="ts" src="./logistics.ts"></script>
<style lang="scss">
@import './logistics.scss';
</style>
