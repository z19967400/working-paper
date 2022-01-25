<template>
  <div class="memberCollection-wrap">
    <div class="memberCollection-box">
      <div class="search-box">
        <el-input
          v-model="options.collection_id"
          placeholder="发票ID"
          size="small"
        ></el-input>
        <el-input
          v-model="options.create_name"
          placeholder="发票名称"
          size="small"
        ></el-input>
        <el-button size="small" @click="search" type="primary" plain
          >查询</el-button
        >
        <el-button size="small" @click="reset" type="primary">重置</el-button>
        <el-button
          style="float:right;"
          size="small"
          @click="data.invoiceEditType = true"
          type="primary"
          plain
          >新增</el-button
        >
      </div>
      <el-table
        :height="data.height"
        v-loading="data.loading"
        :data="data.list"
        style="margin-top:20px;"
        border
      >
        <el-table-column
          v-for="(item, index) in data.dataType"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <span
              v-if="item.prop != 'invoice_type' && item.label != '创建人'"
              >{{ scope.row[item.prop] }}</span
            >
            <el-button
              style="color:#67C23A;"
              v-else-if="item.label == '创建人'"
              @click="goAdmin(scope.row)"
              type="text"
              >{{ scope.row[item.prop] }}</el-button
            >
            <span v-else>{{ getTypeName(scope.row[item.prop]) }}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              style="color:#E6A23C;"
              @click="handleEdit(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              style="color:#f04761;"
              @click="handleDelete(scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <comPaging
        :page="options.page"
        :totalize="data.totalize"
        @watchChange="watchChange"
      ></comPaging>
    </div>
    <el-dialog
      :class="'big'"
      @close="close"
      custom-class="creditorDialog"
      title="管理员新增/编辑"
      :visible.sync="data.invoiceEditType"
      center
    >
      <div v-if="data.actvie == 0">
        <selectLayer @setUserId="setUserId"></selectLayer>
        <div style="text-align: center;margin-top:20px;">
          <el-button type="primary" @click="selectUser">确定</el-button>
          <el-button @click="data.invoiceEditType = false">取消</el-button>
        </div>
      </div>
      <div v-else>
        <el-form :inline="true" :model="editData" label-width="140px">
          <el-form-item label="发票类型">
            <el-select
              style="width:220px;"
              placeholder="请选择发票类型"
              v-model="editData.invoice_type"
            >
              <el-option label="增值税普通发票（电子）" value="Invoice_Type_0">
              </el-option>
              <el-option label="增值税普通发票（纸质）" value="Invoice_Type_1">
              </el-option>
              <el-option label="增值税专用发票（纸质）" value="Invoice_Type_2">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发票税率">
            <el-input
              style="width:150px;"
              placeholder="请填写发票税率"
              v-model="editData.invoice_tax_rate"
            ></el-input>
            <span style="margin-left:5px;">%</span>
          </el-form-item>
          <el-form-item label="收款户名">
            <el-input
              style="width:220px;"
              placeholder="请填写收款户名"
              v-model="editData.account_name"
            ></el-input>
          </el-form-item>
          <el-form-item label="收款账号">
            <el-input
              style="width:220px;"
              placeholder="请填写收款账号"
              v-model="editData.account_number"
            ></el-input>
          </el-form-item>
          <el-form-item label="收款银行全称">
            <el-input
              style="width:220px;"
              placeholder="请填写收款银行全称"
              v-model="editData.bank_full_name"
            ></el-input>
          </el-form-item>
          <el-form-item label="收款银行行号">
            <el-input
              style="width:220px;"
              placeholder="请填写收款银行行号"
              v-model="editData.bank_no"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人电话">
            <el-input
              style="width:220px;"
              placeholder="请填写联系人电话"
              v-model="editData.telephone"
            ></el-input>
          </el-form-item>
          <div style="text-align: center;">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="data.invoiceEditType = false">取消</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./memberCollection.ts"></script>

<style lang="scss">
@import './memberCollection.scss';
</style>
