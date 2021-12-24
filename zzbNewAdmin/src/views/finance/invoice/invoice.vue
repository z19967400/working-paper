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
          placeholder="登录名"
          size="small"
        ></el-input>
        <el-button size="small" @click="search" type="primary" plain
          >查询</el-button
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
        </el-table-column>

        <el-table-column align="center" label="操作" width="100">
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
  </div>
</template>

<script lang="ts" src="./invoice.ts"></script>

<style lang="scss">
@import './invoice.scss';
</style>
