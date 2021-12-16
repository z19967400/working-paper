<template>
  <div class="invoicexx-wrap">
    <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <comOperation :totalize="data.list.length" @add="add"></comOperation>
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      :top="60"
      @Edit="handleEdit"
      @Delete="handleDelete"
    ></comtable>
    <comPaging
      :page="options.page"
      :totalize="data.totalize"
      @watchChange="watchChange"
    ></comPaging>
    <div class="zhezhao" v-show="data.visible"></div>
    <el-popover
      title="新增/编辑"
      popper-class="editData"
      v-model="data.visible"
    >
      <span @click="close" class="el-icon-close close"></span>
      <el-form
        :model="editData"
        :rules="data.rules"
        ref="ruleForm"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-form-item label="抬头类别" prop="invoice_title_type">
          <el-radio-group v-model="editData.invoice_title_type">
            <el-radio label="企业单位"></el-radio>
            <el-radio label="个人"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票类别" prop="invoice_type">
          <el-radio-group v-model="editData.invoice_type">
            <el-radio label="增值税普通发票"></el-radio>
            <el-radio label="增值税专用发票"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票抬头" prop="invoice_title">
          <el-col :span="22"
            ><el-input v-model="editData.invoice_title"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="纳税人识别号" prop="tax_number">
          <el-col :span="22"
            ><el-input v-model="editData.tax_number"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="开户银行" prop="bank_name">
          <el-col :span="22"
            ><el-input v-model="editData.bank_name"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="银行账号" prop="bank_account">
          <el-col :span="22"
            ><el-input v-model="editData.bank_account"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="电话" prop="bank_telephone">
          <el-col :span="22"
            ><el-input v-model="editData.bank_telephone"></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="选择地区">
          <el-col :span="22">
            <comAddress
              @emitAddress="selectAddress"
              :address="region"
            ></comAddress>
          </el-col>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailed_address">
          <el-col :span="22">
            <el-input v-model="editData.detailed_address"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <el-col class="edit-bottom-bin" :span="12">
        <el-button
          style="margin-left: 110px;"
          type="primary"
          :loading="data.submitType"
          @click="submitForm('ruleForm')"
          >确定</el-button
        >
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-col>
    </el-popover>
  </div>
</template>
<script lang="ts" src="./invoice.ts"></script>

<style lang="scss">
@import "./invoice.scss";
</style>
