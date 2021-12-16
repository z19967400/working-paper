<template>
  <div class="Account">
    <!-- <comselect :options="data.options" @select="search" @clear="clearSelection"></comselect> -->
    <!-- <comtable :tableData="data.list" :load="data.loading" :tableType="data.dataType" @admin="setingAdmin" @Edit="handleInfo" @Delete="handleDelete" :top="20"></comtable> -->
    <div class="content">
      <!-- <div class="left">
        <comOperation :totalize="data.totalize" :addText="'新增账户'" @add="addAccount"></comOperation>
        <p class="title">账户管理</p>
        <el-tree :style="{height:data.height+'px'}" :data="data.list" node-key="id" default-expand-all :expand-on-click-node="false">
          <span class="custom-tree-node" :class="[data.cheeked?'act':'']" slot-scope="{ data }">
            <div class="xian"></div>
            <span>{{ data.account_name }}</span>
            <span>
              <el-button @click="() =>{ setingAdmin(data),treeAct(data.id)}" style="color:#409EFF;" type="text">
                管理员设置
              </el-button>
              <el-button style="color:#67C23A;" type="text" @click="() => handleInfo(data)">
                编辑
              </el-button>
              <el-button v-if="data.is_super != '是'" type="text" @click="() => handleDelete(data)">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div> -->
      <div class="right">
        <comRight :accounts="data.accounts" @atAll="atAll" :AccountData="data.AccountData"></comRight>
      </div>
    </div>
    <!-- <comPaging :page="options.page" :totalize="data.totalize" @watchChange="watchChange"></comPaging> -->
    <!-- 新增账户 弹框 -->
    <el-dialog title="编辑/添加子账户" :visible.sync="data.addDialogVisible">
      <el-row style="height:40px;line-height: 40px;">
        <el-col :span="4">
          <span>子账户名称</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="data.addData.account_name"></el-input>
        </el-col>
      </el-row>
      <div class="footer">
        <el-button type="primary" @click="submitForm()">确定</el-button>
        <el-button @click="data.addDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss">
@import './index.scss';
</style>
