<template>
  <div class="fromInfo-warp">
    <!-- <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect> -->
    <comOperation :totalize="data.list.length" @add="add"></comOperation>
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      @Edit="handleEdit"
      @Delete="handleDelete"
    ></comtable>
    <div class="zhezhao" v-show="visible"></div>
    <comPaging
      :page="getInfo.page"
      :totalize="data.totalize"
      @watchChange="watchChange"
    ></comPaging>
    <el-popover title="添加/编辑" popper-class="editData" v-model="visible">
      <el-form ref="form" :rules="rules" :model="editData" label-width="80px">
        <span
          @click="resetForm('form')"
          class="el-icon-circle-close close"
        ></span>
        <el-form-item label="名称" prop="name">
          <el-col :span="22">
            <el-input v-model="editData.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="控件类别" prop="control_type">
          <el-col :span="22">
            <el-select v-model="editData.control_type" placeholder="请选择">
              <el-option
                v-for="item in control_types"
                :key="item.id"
                :label="item.dic_content"
                :value="item.dic_code"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="提示内容">
          <el-col :span="22">
            <el-input v-model="editData.tips_content"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="选项内容">
          <el-col :span="22">
            <el-input v-model="editData.option_content"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="默认值">
          <el-col :span="22">
            <el-input v-model="editData.default_value"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="是否必填">
          <el-switch v-model="editData.is_required"></el-switch>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button
            type="primary"
            :loading="btnLoad"
            @click="submitForm('form')"
            >确定</el-button
          >
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-popover>
  </div>
</template>
<script lang="ts" src="./fromInfo.ts"></script>
<style lang="scss">
@import './fromInfo.scss';
</style>
