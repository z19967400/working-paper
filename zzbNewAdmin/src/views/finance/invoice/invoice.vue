<template>
  <div class="invoice-wrap">
    <div class="invoice-box">
      <div class="search-box">
        <el-input
          v-model="options.invoice_id"
          placeholder="发票ID"
          size="small"
        ></el-input>
        <el-input
          v-model="options.invoice_name"
          placeholder="发票名称"
          size="small"
        ></el-input>
        <el-input
          v-model="options.create_name"
          placeholder="创建人"
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
      :class="data.actvie == 2 ? 'small' : 'big'"
      @close="close"
      custom-class="creditorDialog"
      title="管理员新增/编辑"
      :visible.sync="data.invoiceEditType"
      center
    >
      <div v-if="data.actvie == 0">
        <selectUser @setUserId="setUserId"></selectUser>
        <div style="text-align: center;margin-top:20px;">
          <el-button type="primary" @click="selectUser">确定</el-button>
          <el-button @click="data.invoiceEditType = false">取消</el-button>
        </div>
      </div>
      <div v-else-if="data.actvie == 1">
        <selectAdmin
          @close="data.invoiceEditType = false"
          @selectAdmin="selectAdmin"
          :list="adminData.admin_list"
          :name="adminData.name"
        ></selectAdmin>
      </div>
      <div v-else>
        <el-form :model="editData" label-width="140px">
          <el-form-item label="发票类型">
            <el-select
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
          <el-form-item label="发票名称">
            <el-col :span="18">
              <el-input
                placeholder="请填写发票名称"
                v-model="editData.invoice_name"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="发票税号">
            <el-col :span="18">
              <el-input
                placeholder="请填写发票税号"
                v-model="editData.duty_paragraph"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-col :span="18">
              <el-input
                placeholder="请填写详细地址"
                v-model="editData.detailed_address"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="电话">
            <el-col :span="18">
              <el-input
                placeholder="请填写电话"
                v-model="editData.telephone"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="开户行">
            <el-col :span="18">
              <el-input
                placeholder="请填写开户行"
                v-model="editData.bank_of_deposit"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="银行账号">
            <el-col :span="18">
              <el-input
                placeholder="请填写银行账号"
                v-model="editData.bank_account"
              ></el-input>
            </el-col>
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

<script lang="ts" src="./invoice.ts"></script>

<style lang="scss">
@import './invoice.scss';
</style>
