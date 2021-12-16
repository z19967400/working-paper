<template>
  <div class="services services2">
    <comselect :options="data.options" @select="search" @clear="clearSelection"></comselect>
    <comOperation :totalize="data.totalize" :addShow="false"></comOperation>
    <comtable :top="0" :tableData="data.list" :load="data.loading" :tableType="data.dataType" :edit="false" @Delete="handleDelete" :admin="true" @admin="handleInfo"></comtable>
    <comPaging :totalize="data.totalize" @watchChange="watchChange"></comPaging>
  </div>
</template>

<script lang="ts" src="./services2.ts"></script>

<style lang="scss">
@import './services.scss';
</style>
