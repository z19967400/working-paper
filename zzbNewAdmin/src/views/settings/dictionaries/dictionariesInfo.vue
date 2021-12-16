<template>
  <div class="dictionariesInfo-warp">
    <!-- <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect> -->
    <comOperation :totalize="data.totalize" @add="add"></comOperation>
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      @Edit="handleEdit"
      @Delete="handleDelete"
      @change="onChangeVal"
    ></comtable>
    <div class="zhezhao" v-show="visible"></div>
    <el-popover title="添加/编辑" popper-class="editData" v-model="visible">
      <span
        @click="resetForm('form')"
        class="el-icon-circle-close close"
      ></span>
      <el-form ref="form" :rules="rules" :model="editData" label-width="80px">
        <el-form-item label="字典内容" prop="dic_content">
          <el-col :span="22">
            <el-input v-model="editData.dic_content"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="字典编码" prop="dic_code">
          <el-col :span="22">
            <el-input v-model="editData.dic_code"></el-input>
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
    <!-- <comPaging :totalize="data.totalize" @watchChange="watchChange"></comPaging> -->
  </div>
</template>
<script lang="ts" src="./dictionariesInfo.ts"></script>
<style lang="scss">
@import './dictionariesInfo.scss';
</style>
