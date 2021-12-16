<template>
  <div class="apply-wrap">
    <div class="ordinary-box">
      <comselect
        :options="data.options"
        @select="search"
        @clear="clearSelection"
      ></comselect>
      <comOperation :totalize="data.totalize" :addShow="false"></comOperation>
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
      <div class="zhezhao" v-show="visible"></div>
    </div>
    <el-dialog custom-class="remarks" title="备注编辑" :visible.sync="visible">
      <el-row>
        <el-col :span="4">
          <span class="lable">后台备注</span>
        </el-col>
        <el-col :span="16">
          <el-input
            type="textarea"
            :rows="6"
            v-model="Remarks.back_remarks"
          ></el-input>
        </el-col>
      </el-row>
      <div class="footer">
        <el-button @click="saveRemarks" type="primary">保存</el-button>
        <el-button @click="visible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./apply.ts"></script>

<style lang="scss">
@import './apply.scss';
</style>
