<template>
  <div class="esistenteProva-wrap">
    <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <comOperation :totalize="data.totalize" :addShow="false"></comOperation>
    <el-table
      id="comTable"
      :height="`${height}px`"
      v-loading="data.loading"
      :data="data.list"
      style="width: 100%"
      highlight-current-row
      fixed
    >
      <el-table-column
        v-for="(item, index) in data.dataType"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      ></el-table-column>
    </el-table>
    <comPaging :totalize="data.totalize" @watchChange="watchChange"></comPaging>
  </div>
</template>
<script lang="ts" src="./esistenteProva.ts"></script>

<style lang="scss">
@import './esistenteProva.scss';
</style>
