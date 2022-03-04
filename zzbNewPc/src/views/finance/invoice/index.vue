<template>
  <div class="invoice-wrap">
    <div
      :style="{ height: data.height / 2 + 'px' }"
      style="border:1px sold #ccc"
    >
      <p style="color:#606366;font-size:14px;margin-bottom:20px;">
        发票信息管理
      </p>
      <div class="table-header">
        <div>
          <el-input
            style="width:220px;"
            placeholder="名称"
            size="small"
            v-model="data.searchVal1"
          ></el-input>
          <el-button
            style="margin-left:20px;"
            @click="getInvoiceDown"
            size="small"
            type="primary"
            >搜索</el-button
          >
          <el-button
            style="margin-left:20px;"
            @click="clearSearch1"
            size="small"
            type="primary"
            >清除</el-button
          >
        </div>
        <el-button @click="addInvoice" size="small" type="primary"
          >新增发票</el-button
        >
      </div>
      <el-table :height="(data.height - 180) / 2" border :data="data.list">
        <el-table-column prop="invoice_type" label="发票类型" width="180">
        </el-table-column>
        <el-table-column prop="invoice_name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="duty_paragraph" label="税号" width="180">
        </el-table-column>
        <el-table-column prop="detailed_address" label="地址" width="180">
        </el-table-column>
        <el-table-column prop="telephone" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="bank_of_deposit" label="开户行" width="180">
        </el-table-column>
        <el-table-column prop="bank_account" label="银行账号" width="180">
        </el-table-column>
        <el-table-column prop="create_name" label="创建人" width="180">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="选择" width="120px">
          <template slot-scope="scope">
            <el-button
              @click="edit1(scope.row)"
              style="color:#E6A23C;"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button @click="delect1(scope.row.id)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div :style="{ height: data.height / 2 + 'px' }" style="margin-top:20px;">
      <p style="color:#606366;font-size:14px;margin-bottom:20px;">
        收票地址管理
      </p>
      <div class="table-header">
        <div>
          <el-input
            size="small"
            style="width:220px;"
            placeholder="收票人姓名"
            v-model="data.searchVal2"
          ></el-input>
          <el-input
            size="small"
            style="width:220px;margin-left:20px;"
            placeholder="收票人手机"
            v-model="data.searchVal3"
          ></el-input>
          <el-button
            style="margin-left:20px;"
            @click="getTicketDown"
            size="small"
            type="primary"
            >搜索</el-button
          >
          <el-button
            style="margin-left:20px;"
            @click="clearSearch2"
            size="small"
            type="primary"
            >清除</el-button
          >
        </div>
        <el-button @click="addTicket" size="small" type="primary"
          >新增收票</el-button
        >
      </div>
      <el-table :height="(data.height - 180) / 2" border :data="data.list2">
        <el-table-column prop="name" label="收票人姓名"> </el-table-column>
        <el-table-column prop="phone" label="收票人手机"> </el-table-column>
        <el-table-column prop="detailed_address" label="收票人地址">
        </el-table-column>
        <el-table-column prop="email" label="收票人电子邮箱"> </el-table-column>
        <el-table-column prop="create_name" label="创建人"> </el-table-column>
        <el-table-column prop="create_time" label="创建时间"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              @click="edit2(scope.row)"
              style="color:#E6A23C;"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button @click="delect2(scope.row.id)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        custom-class="zz-dialog"
        :title="data.title"
        width="680px"
        :visible.sync="data.outerVisible"
        :before-close="handleClose"
      >
        <el-form
          v-if="data.title == '新增发票信息' || data.title == '编辑发票信息'"
          :rules="rules"
          label-width="120px"
          :model="data.addInvoiceData"
          ref="ruleForm"
        >
          <el-form-item label="发票类型" prop="invoice_type">
            <el-select
              v-model="data.addInvoiceData.invoice_type"
              placeholder="请选择发票类型"
            >
              <el-option label="增值税普通发票（电子）" value="Invoice_Type_0">
              </el-option>
              <el-option label="增值税普通发票（纸质）" value="Invoice_Type_1">
              </el-option>
              <el-option label="增值税专用发票（纸质）" value="Invoice_Type_2">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发票名称" prop="invoice_name">
            <el-input
              style="width:280px"
              v-model="data.addInvoiceData.invoice_name"
              placeholder="请输入发票名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="税号" prop="duty_paragraph">
            <el-input
              style="width:280px"
              v-model="data.addInvoiceData.duty_paragraph"
              placeholder="请输入税号"
            ></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="detailed_address">
            <el-input
              style="width:280px"
              v-model="data.addInvoiceData.detailed_address"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="telephone">
            <el-input
              style="width:280px"
              v-model="data.addInvoiceData.telephone"
              placeholder="请输入电话"
            ></el-input>
          </el-form-item>
          <el-form-item label="开户行" prop="bank_of_deposit">
            <el-input
              style="width:280px"
              v-model="data.addInvoiceData.bank_of_deposit"
              placeholder="请输入开户行"
            ></el-input>
          </el-form-item>
          <el-form-item label="银行账号" prop="bank_account">
            <el-input
              style="width:280px"
              v-model="data.addInvoiceData.bank_account"
              placeholder="请输入银行账号"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :rules="rules2"
          label-width="120px"
          :model="data.addTicketData"
          ref="ruleForm2"
          v-else
        >
          <el-form-item label="收票人姓名" prop="name">
            <el-input
              style="width:280px"
              v-model="data.addTicketData.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="收票人手机" prop="phone">
            <el-input
              style="width:280px"
              v-model="data.addTicketData.phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="收票人地址" prop="email">
            <el-input
              style="width:280px"
              v-model="data.addTicketData.detailed_address"
            ></el-input>
          </el-form-item>
          <el-form-item label="收票人电子邮箱" prop="detailed_address">
            <el-input
              style="width:280px"
              v-model="data.addTicketData.email"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import "./index.scss";
</style>
