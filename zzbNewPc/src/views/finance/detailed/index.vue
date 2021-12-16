<template>
  <div class="detailed-wrap">
    <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <comOperation :totalize="data.totalize"></comOperation>
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      :info="true"
      @Info="handleEdit"
    ></comtable>
    <comPaging
      :page="options.page"
      :totalize="data.totalize"
      @watchChange="watchChange"
    ></comPaging>
    <div class="zhezhao" v-show="data.visible"></div>
    <el-popover title="详情" popper-class="editData" v-model="data.visible">
      <span @click="close" class="el-icon-close close"></span>
      <div>
        <el-row
          style="margin-bottom:20px"
          v-for="(item, index) in info"
          :key="index"
          :gutter="20"
        >
          <el-col v-for="(item2, index2) in item" :span="8" :key="index2">
            <span class="laber" style="display: inline-block;width:70px;">{{
              item2.label
            }}</span>
            <span class="text">{{ item2.value }}</span>
          </el-col>
        </el-row>
      </div>
    </el-popover>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import "./index.scss";
</style>
