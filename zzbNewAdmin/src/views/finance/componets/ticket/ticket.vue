<template>
  <div class="ticket">
    <span
      @click="addInvoice"
      style="font-size:14px;color:#67C23A;cursor: pointer;position: relative;top: -25px;float:right;"
      >{{ !data.type ? '新增' : '返回' }}</span
    >
    <el-divider></el-divider>
    <div v-if="!data.type">
      <el-table :data="List" border>
        <el-table-column prop="id" label="收票ID" width="80"> </el-table-column>
        <el-table-column prop="name" label="收票人姓名" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="收票人手机" width="120">
        </el-table-column>
        <el-table-column prop="detailed_address" label="收票人地址" width="280">
        </el-table-column>
        <el-table-column prop="email" label="收票人电子邮箱" width="180">
        </el-table-column>
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
      class="addForm demo-form-inline"
      label-width="150px"
    >
      <el-form-item v-show="adminList.length > 0" label="管理员">
        <el-select style="width:650px;" v-model="data.form.member_vip_admin_id">
          <el-option
            v-for="(item, index) in adminList"
            :key="index"
            :value="item.id"
            :label="item.admin_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收票人姓名">
        <el-input style="width:650px;" v-model="data.form.name"></el-input>
      </el-form-item>
      <el-form-item label="收票人手机">
        <el-input style="width:650px;" v-model="data.form.phone"></el-input>
      </el-form-item>
      <!-- <el-form-item label="收票人地区">
        <comAddress
          @emitAddress="emitAddress"
          :address="data.address"
        ></comAddress>
      </el-form-item> -->
      <el-form-item label="收票人地址">
        <el-input
          style="width:650px;"
          v-model="data.form.detailed_address"
        ></el-input>
      </el-form-item>
      <el-form-item label="收票人电子邮箱">
        <el-input style="width:650px;" v-model="data.form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('新增')">确认</el-button>
        <el-button @click="quxiao">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" src="./ticket.ts"></script>
<style lang="scss">
@import './ticket.scss';
</style>
