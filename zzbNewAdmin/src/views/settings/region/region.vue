<template>
  <div class="region-warp">
    <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <comOperation :totalize="data.totalize" @add="add"></comOperation>
    <div v-show="history.length > 1" class="reg-tags">
      <el-breadcrumb>
        <el-breadcrumb-item v-for="(item, index) in history" :key="index">
          <span @click="goHistory(index)">{{ item.name }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      :info="tabInfo"
      @Info="handleInfo"
      @Edit="handleEdit"
      @Delete="handleDelete"
    ></comtable>
    <div class="zhezhao" v-show="visible"></div>
    <el-popover title="添加/编辑" popper-class="editData" v-model="visible">
      <span
        @click="resetForm('form')"
        class="el-icon-circle-close close"
      ></span>
      <el-form ref="form" :rules="rules" :model="editData" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-col :span="22">
            <el-input v-model="editData.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button
            type="primary"
            :loading="btnLoad"
            native-type="submit"
            @click="submitForm('form')"
            >确定</el-button
          >
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-popover>
    <comPaging
      :page="getRegData.page"
      :totalize="data.totalize"
      @watchChange="watchChange"
    ></comPaging>
  </div>
</template>
<script lang="ts" src="./region.ts"></script>
<style lang="scss">
@import './region.scss';
</style>
