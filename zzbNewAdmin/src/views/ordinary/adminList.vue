<template>
  <div class="adminList-wrap">
    <div class="adminList-box">
      <div class="search-box">
        <el-input
          v-model="getData.member_name"
          placeholder="用户名称"
          size="small"
        ></el-input>
        <el-input
          v-model="getData.admin_name"
          placeholder="管理员真实姓名"
          size="small"
        ></el-input>
        <el-input
          v-model="getData.admin_account"
          placeholder="登录名"
          size="small"
        ></el-input>
        <el-input
          v-model="getData.admin_phone_number"
          placeholder="手机号码"
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
        <el-table-column prop="id" label="ID" width="80"> </el-table-column>
        <el-table-column prop="member_name" label="用户名称"> </el-table-column>
        <el-table-column prop="admin_account" label="登录名"> </el-table-column>
        <el-table-column prop="id_number" label="身份证号" width="210">
        </el-table-column>
        <el-table-column prop="admin_phone_number" label="手机号码" width="150">
        </el-table-column>
        <el-table-column prop="admin_email" label="电子邮箱" width="250">
        </el-table-column>
        <el-table-column align="center" prop="is_super" label="权限" width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.is_super == 0 ? '否' : '是' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="150">
          <template slot-scope="scope">
            <span>{{ tiemStr(scope.row.create_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              style="color:#E6A23C;"
              @click="handleEdit(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              style="color:#67C23A;"
              @click="openSandpass(scope.row)"
              type="text"
              size="small"
              >登录密码</el-button
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
        :page="getData.page"
        :totalize="data.totalize"
        @watchChange="watchChange"
      ></comPaging>
    </div>
    <el-dialog
      custom-class="creditorDialog"
      title="发送登录密码"
      :visible.sync="sandPassWordShow"
      center
    >
      <el-form :model="sandPassWordData" label-width="140px">
        <el-form-item label="登录名">
          <span>{{ sandPassWordData.admin_account }}</span>
        </el-form-item>
        <el-form-item label="真实姓名">
          <span>{{ sandPassWordData.admin_name }}</span>
        </el-form-item>
        <el-form-item label="发送对象">
          <el-select v-model="sandType">
            <el-option label="用户" value="用户"></el-option>
            <el-option label="客服" value="客服"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-col :span="18">
            <el-input
              v-if="sandType == '用户'"
              placeholder="请填写电子邮箱"
              v-model="sandPassWordData.toAddress"
            ></el-input>
            <el-select style="width:100%;" v-else v-model="toAddress">
              <el-option
                v-for="(item, index) in customers"
                :key="index"
                :label="item.real_name + '_' + item.email"
                :value="item.email"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sandPassWord">确定</el-button>
          <el-button @click="sandPassWordShow = !sandPassWordShow"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      custom-class="creditorDialog"
      title="管理员编辑"
      :visible.sync="adminEditType"
      center
    >
      <el-form :model="adminEditData" label-width="140px">
        <el-form-item label="登录名">
          <el-col :span="18">
            <el-input
              placeholder="请填写登录名"
              v-model="adminEditData.admin_account"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-col :span="18">
            <el-input
              placeholder="请填写真实姓名"
              v-model="adminEditData.admin_name"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-col :span="18">
            <el-input
              placeholder="请填写身份证号"
              v-model="adminEditData.id_number"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-col :span="18">
            <el-input
              placeholder="请填写手机号码"
              v-model="adminEditData.admin_phone_number"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-col :span="18">
            <el-input
              placeholder="请填写电子邮箱"
              v-model="adminEditData.admin_email"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="权限">
          <el-col :span="18">
            <el-radio-group v-model="adminEditData.is_super">
              <el-radio :label="0">普通管理员</el-radio>
              <el-radio :label="1">超级管理员</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="adminEditType = !adminEditType">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./adminList.ts"></script>

<style lang="scss">
@import './adminList.scss';
</style>
