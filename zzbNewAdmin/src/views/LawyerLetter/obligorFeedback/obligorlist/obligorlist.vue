<template>
  <div class="obligorlist-wrap">
    <div class="obligorlist-box">
      <comselect
        :options="data.options"
        @select="search"
        @clear="clearSelection"
      ></comselect>
      <comOperation :totalize="data.totalize" @add="add"></comOperation>
      <comtable
        :tableData="data.list"
        :load="data.loading"
        :xq="true"
        :xz="true"
        @Info="goInfo"
        @xiazai="xiazai"
        :tableType="data.dataType"
      ></comtable>
      <comPaging
        :page="getData.page"
        :totalize="data.totalize"
        @watchChange="watchChange"
      ></comPaging>
    </div>
    <div class="zhezhao" v-show="visible"></div>
    <el-popover title="详情/编辑" popper-class="editData" v-model="visible">
      <span
        @click="visible = !visible"
        class="el-icon-circle-close close"
      ></span>
      <obligorInfo @add="addFeedback" :info="editData"></obligorInfo>
    </el-popover>
    <div class="zhezhao" v-show="visible2"></div>
    <el-popover title="添加" popper-class="editData" v-model="visible2">
      <span
        @click="visible2 = !visible2"
        class="el-icon-circle-close close"
      ></span>
      <addObligor @add="addFeedback"></addObligor>
    </el-popover>
    <iframe v-show="false" :src="uloadsrc" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts" src="./obligorlist.ts"></script>

<style lang="scss">
@import './obligorlist.scss';
</style>
