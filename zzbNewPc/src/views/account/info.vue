<template>
  <div class="AccountInfo">
    <!-- <comselect :options="data.options" @select="search" @clear="clearSelection"></comselect> -->
    <comOperation :totalize="data.totalize" :addText="'新增管理员'" @add="addAccount"></comOperation>
    <!-- <p class="title">账户管理员 -->
    <!-- <span @click="atAll" style="cursor: pointer;color:#409EFF;"> / 全部</span> -->
    <!-- <span v-show="data.Account.account_name != '' && data.Account.account_name != null"> / {{data.Account.account_name}}</span> -->
    <!-- </p> -->
    <comtable :tableData="data.list" :load="data.loading" :tableType="data.dataType" @See="handleSee" :edit="false" :xq="true" @admin="creaditorfp" @Edit="addAccount" @Delete="handleDelete" :top="20"></comtable>
    <!-- <comPaging :page="options.page" :totalize="data.totalize" @watchChange="watchChange"></comPaging> -->
    <!-- 新增账户 弹框 -->
    <el-popover title="新增/编辑管理员" popper-class="editData" v-model="visible3">
      <addAdmin :accounts="accounts" :id="data.Account.id" :status='data.disabled' :key="addAdminKey" :btnType="data.btnType" :addData="addAdmin" @sandAdminPassword="sandAdminPassword" @determine="addAdminSave" @cancel="addAdminCancel"></addAdmin>
    </el-popover>
    <el-dialog title="债权人分配" :visible.sync="data.dialogVisible">
      <el-table :data="data.creaditors2" style="width: 100%" max-height="350">
        <el-table-column prop="id" label="序号" width="60"></el-table-column>
        <el-table-column prop="creditor_name" label="债权人" width="220">
        </el-table-column>
        <el-table-column prop="phone_number" label="手机号码" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="220">
        </el-table-column>
        <el-table-column prop="audit_status" label="审核状态">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="160">
        </el-table-column>
        <el-table-column fixed="right" label="选择" width="60">
          <template slot-scope="scope">
            <el-checkbox @change="checkbox(scope.row)" v-model="scope.row.checked"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="账户管理员查看" :visible.sync="data.dialogVisible2">
      <seeInfo :seeData="seeData"></seeInfo>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./info.ts"></script>
<style lang="scss">
@import './info.scss';
</style>
