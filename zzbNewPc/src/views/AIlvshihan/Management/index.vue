<template>
  <div class="manage">
    <comselect
      style="position: relative;top:30px;"
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <el-button
      class="openPays"
      type="primary"
      size="small"
      plain
      @click="openPays"
      >待支付</el-button
    >
    <comOperation :totalize="data.totalize" @add="add"></comOperation>
    <comtable
      class="right-table"
      :number="number"
      :top="20"
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      :edit="false"
      @Delete="handleDelete"
      :info="true"
      @Info="handleInfo"
    ></comtable>
    <comPaging :totalize="data.totalize" @watchChange="watchChange"></comPaging>
    <el-dialog title="待支付列表" :visible.sync="data.dialogVisible">
      <el-table :data="data.tableData" style="width: 100%" max-height="350">
        <!-- <el-table-column fixed="left" label="选择" width="60">
          <template slot-scope="scope">
            <el-radio v-model="data.collid" :label="scope.row.id">{{
              ""
            }}</el-radio>
          </template>
        </el-table-column> -->
        <el-table-column
          fixed="left"
          prop="batch_no"
          label="委托批次号"
          width="120px"
        >
        </el-table-column>
        <el-table-column prop="e_total" label="委托数量" width="80px">
        </el-table-column>
        <el-table-column prop="create_name" label="创建人"> </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="150px">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              class="zhifu"
              size="small"
              >立即支付</el-button
            >
            <el-button
              @click="deleteClick(scope.row)"
              type="text"
              class="shanchu"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="chacakparams">确 定</el-button>
        <el-button @click="data.dialogVisible = false">取 消</el-button>
      </span> -->
    </el-dialog>
    <!-- 支付弹窗 -->
    <pay :info="payinfo" @close="payClose" v-show="payShow"></pay>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import "./index.scss";
</style>
