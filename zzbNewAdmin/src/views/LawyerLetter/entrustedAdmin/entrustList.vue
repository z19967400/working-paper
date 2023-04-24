<template>
  <div class="entrustList-wrap">
    <div class="entrustList-box">
      <comselect
        :options="data.options"
        @select="search"
        @clear="clearSelection"
        :isAi="true"
      ></comselect>
      <comOperation :totalize="data.totalize" @add="add"></comOperation>
      <el-button
        size="small"
        @click="GetAILawyerLetter"
        class="faqi"
        type="primary"
        plain
        >创建律师函</el-button
      >
      <el-button
        size="small"
        @click="GetAILawyerLetterExportData"
        class="daochu"
        type="primary"
        plain
        >导出</el-button
      >
      <comtable
        :tableData="data.list"
        :load="data.loading"
        :tableType="data.dataType"
        :admin="true"
        @admin="goAdmin"
        @Delete="handleDelete"
      ></comtable>
      <comPaging
        :page="getData.page"
        :totalize="data.totalize"
        @watchChange="watchChange"
      ></comPaging>
      <el-dialog
        class="tanchuang"
        title="AI律师函导出"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <div style="position: relative;top: -15px;">
          <el-input
            style="width:180px;"
            size="small"
            v-model="getdaochu.member_id"
            placeholder="用户ID"
          ></el-input>
          <el-input
            size="small"
            style="width:180px;margin-left:20px;"
            v-model="getdaochu.create_name"
            placeholder="创建人"
          ></el-input>
          <el-input
            size="small"
            style="width:180px;margin-left:20px;"
            v-model="getdaochu.creditor_name"
            placeholder="债权人名称"
          ></el-input>
          <el-date-picker
            style="width:180px;margin-left:20px;"
            size="small"
            v-model="getdaochu.start_time"
            align="right"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
          <el-date-picker
            style="width:180px;margin-left:20px;"
            size="small"
            v-model="getdaochu.end_time"
            value-format="yyyy-MM-dd"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
          <el-button
            type="primary"
            size="small"
            style="margin-left:20px;"
            plain
            @click="GetAILawyerLetterExportData"
            >查 询</el-button
          >
          <el-button type="primary" size="small" plain @click="chongzhi"
            >重 置</el-button
          >
          <el-button
            type="primary"
            size="small"
            style="float: right;"
            plain
            @click="exportBtn"
            >导 出</el-button
          >
        </div>
        <el-table
          border
          height="500px"
          v-loading="load"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column prop="debtor_number" label="委托编号" width="150">
          </el-table-column>
          <el-table-column prop="creditor_name" label="债权人" width="200">
          </el-table-column>
          <el-table-column prop="debtor_name" label="债务人" width="180">
          </el-table-column>
          <el-table-column prop="currency_name" label="欠款币种" width="100">
          </el-table-column>
          <el-table-column
            prop="arrears_principal"
            label="欠款本金"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{
                thousandBitSeparator(scope.row.arrears_principal)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="arrears_interest"
            label="违约金/利息/滞纳金"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{
                thousandBitSeparator(scope.row.arrears_interest)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="execution_progress"
            label="执行进度"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="creditor_contacts_name"
            label="债权联系人姓名"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="creditor_contacts_telphone"
            label="债权联系人手机号码"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="creditor_contacts_email"
            label="债权联系人电子邮箱"
            width="180"
          >
          </el-table-column>
          <el-table-column prop="create_name" label="创建人" width="120">
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="150">
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" src="./entrustList.ts"></script>

<style lang="scss">
@import './entrustList.scss';
</style>
