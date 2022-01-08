<template>
  <div class="gitinvoice-wrap">
    <div class="gitinvoice-box">
      <div class="search-box">
        <el-input
          v-model="options.ticket_address_id"
          placeholder="收票ID"
          size="small"
        ></el-input>
        <el-input
          v-model="options.name"
          placeholder="收票人姓名"
          size="small"
        ></el-input>
        <el-input
          v-model="options.phone_number"
          placeholder="收票人手机"
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
        <el-button size="small" @click="clearSelection" type="primary"
          >重置</el-button
        >
        <el-button
          style="float:right;"
          size="small"
          @click="data.dialogType = true"
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
            <span v-if="item.prop != 'create_time'">{{
              scope.row[item.prop]
            }}</span>
            <span v-else>{{ tiemStr(scope.row[item.prop]) }}</span>
          </template>
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
    <el-dialog
      :class="data.actvie == 2 ? 'small' : 'big'"
      @close="close"
      custom-class="creditorDialog"
      title="管理员编辑"
      :visible.sync="data.dialogType"
      center
    >
      <div v-if="data.actvie == 0">
        <selectUser @setUserId="setUserId"></selectUser>
        <div style="text-align: center;margin-top:20px;">
          <el-button type="primary" @click="selectUser">确定</el-button>
          <el-button @click="data.dialogType = false">取消</el-button>
        </div>
      </div>
      <div v-else-if="data.actvie == 1">
        <selectAdmin
          @close="data.dialogType = false"
          @selectAdmin="selectAdmin"
          :list="adminData.admin_list"
          :name="adminData.name"
        ></selectAdmin>
      </div>
      <div v-else>
        <el-form :model="createData" label-width="140px">
          <el-form-item label="收票人姓名">
            <el-col :span="18">
              <el-input
                placeholder="请填写收票人姓名"
                v-model="createData.name"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="收票人手机">
            <el-col :span="18">
              <el-input
                placeholder="请填写收票人手机"
                v-model="createData.phone"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="收票人地址">
            <el-col :span="18">
              <el-input
                placeholder="请填写收票人地址"
                v-model="createData.detailed_address"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="收票人电子邮箱">
            <el-col :span="18">
              <el-input
                placeholder="请填写收票人电子邮箱"
                v-model="createData.email"
              ></el-input>
            </el-col>
          </el-form-item>
          <div style="text-align: center;">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="data.dialogType = false">取消</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./gitinvoice.ts"></script>

<style lang="scss">
@import './gitinvoice.scss';
</style>
