<template>
  <div class="telephone-warp">
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
    <div class="zhezhao" v-show="visible"></div>
    <el-popover title="添加/编辑" popper-class="editData" v-model="visible">
      <el-form ref="form" :rules="rules" :model="editData" label-width="80px">
        <span @click="resetForm('form')" class="el-icon-close close"></span>
        <el-form-item label="名称" prop="name">
          <el-col :span="22">
            <el-input v-model="editData.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="调用码" prop="use_code">
          <el-col :span="22">
            <el-input v-model="editData.use_code"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="内容" prop="template_content">
          <el-col :span="22">
            <el-input
              type="textarea"
              v-model="editData.template_content"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="展示内容" prop="display_content">
          <el-col :span="22">
            <el-input
              type="textarea"
              v-model="editData.display_content"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参数" prop="parameter">
          <el-col :span="22">
            <el-input type="textarea" v-model="editData.parameter"></el-input>
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
      :page="getData.page"
      :totalize="data.totalize"
      @watchChange="watchChange"
    ></comPaging>
  </div>
</template>
<script lang="ts" src="./telephone.ts"></script>
<style lang="scss">
@import './telephone.scss';
</style>
