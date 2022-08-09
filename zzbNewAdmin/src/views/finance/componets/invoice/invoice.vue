<template>
  <div class="invoice">
    <span
      @click="addInvoice"
      style="font-size:14px;color:#67C23A;cursor: pointer;position: relative;top: -25px;float:right;"
      >{{ !data.type ? '新增' : '返回' }}</span
    >
    <el-divider></el-divider>
    <div v-if="!data.type">
      <el-table :data="invoiceList" border>
        <el-table-column prop="id" label="发票信息ID" width="120">
        </el-table-column>
        <el-table-column prop="invoice_name" label="名称" width="220">
        </el-table-column>
        <el-table-column prop="invoice_type" label="发票类型" width="180">
          <template slot-scope="scope">
            <span>{{
              scope.row.invoice_type == 'Invoice_Type_0'
                ? '增值税普通发票(电子)'
                : scope.row.invoice_type == 'Invoice_Type_1'
                ? '增值税普通发票(纸质)'
                : scope.row.invoice_type == 'Invoice_Type_3'
                ? '增值税专用发票(电子)'
                : '增值税专用发票(纸质)'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="duty_paragraph" label="税号" width="220">
        </el-table-column>
        <el-table-column prop="detailed_address" label="地址" width="250">
        </el-table-column>
        <el-table-column prop="telephone" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="bank_of_deposit" label="开户行" width="180">
        </el-table-column>
        <el-table-column prop="bank_account" label="银行账号" width="180">
        </el-table-column>
        <!-- <el-table-column prop="invoice_remarks" label="发票备注" width="220">
        </el-table-column> -->
        <el-table-column prop="create_name" label="创建人" width="120">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="150">
        </el-table-column>
        <el-table-column fixed="right" label="选择" width="80">
          <template slot-scope="scope">
            <el-radio
              v-model="data.UserId"
              @change="radioChange"
              :label="scope.row.id"
              >选择</el-radio
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="footer-btn">
        <el-button type="primary" @click="onSubmit('选择')">确认</el-button>
        <el-button @click="quxiao">取消</el-button>
      </div>
    </div>
    <el-form
      v-else
      ref="form"
      :model="data.form"
      class="addForm demo-form-inline longInput"
      label-width="80px"
    >
      <!-- <el-form-item v-show="adminList.length > 0" label="管理员">
        <el-select v-model="data.form.member_vip_admin_id">
          <el-option
            v-for="(item, index) in adminList"
            :key="index"
            :value="item.id"
            :label="item.admin_name"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-row>
        <el-col :span="12"> -->
      <el-form-item v-show="adminList.length > 0" label="管理员">
        <el-select v-model="data.form.member_vip_admin_id">
          <el-option
            v-for="(item, index) in adminList"
            :key="index"
            :value="item.id"
            :label="item.admin_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- </el-col>
        <el-col :span="12"> -->

      <!-- </el-col>
      </el-row> -->
      <!-- <el-row>
        <el-col :span="12"> -->
      <el-form-item label="发票类型">
        <el-select v-model="data.form.invoice_type">
          <el-option
            value="Invoice_Type_3"
            label="增值税专用发票(电子)"
          ></el-option>
          <el-option
            value="Invoice_Type_2"
            label="增值税专用发票(纸质)"
          ></el-option>
          <el-option
            value="Invoice_Type_0"
            label="增值税普通发票(电子)"
          ></el-option>
          <!-- <el-option
            value="Invoice_Type_1"
            label="增值税普通发票(纸质)"
          ></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="data.form.invoice_name"></el-input>
      </el-form-item>
      <!-- </el-col>
        <el-col :span="12"> -->
      <el-form-item label="税号">
        <el-input v-model="data.form.duty_paragraph"></el-input>
      </el-form-item>
      <!-- <el-form-item label="地区">
            <comAddress
              @emitAddress="emitAddress"
              :address="data.address"
            ></comAddress>
          </el-form-item> -->
      <!-- </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> -->
      <el-form-item label="地址">
        <el-input v-model="data.form.detailed_address"></el-input>
      </el-form-item>
      <!-- </el-col>
        <el-col :span="12"> -->
      <el-form-item label="电话">
        <el-input v-model="data.form.telephone"></el-input>
      </el-form-item>
      <!-- </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> -->
      <el-form-item label="开户行">
        <el-input v-model="data.form.bank_of_deposit"></el-input>
      </el-form-item>
      <!-- </el-col>
        <el-col :span="12"> -->
      <el-form-item label="银行账号">
        <el-input v-model="data.form.bank_account"></el-input>
      </el-form-item>
      <!-- </el-col>
      </el-row> -->
      <!-- <el-form-item style="width:90%;" label="发票备注">
        <el-input
          type="textarea"
          v-model="data.form.invoice_remarks"
        ></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit('新增')">确认</el-button>
        <el-button @click="quxiao">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" src="./invoice.ts"></script>
<style lang="scss">
@import './invoice.scss';
</style>
