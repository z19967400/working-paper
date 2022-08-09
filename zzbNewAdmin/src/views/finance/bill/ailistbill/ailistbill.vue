<template>
  <div class="ailistbill">
    <el-steps :active="data.active" finish-status="success" simple>
      <el-step title="选择账单类别"></el-step>
      <el-step :title="`${data.billType === 0 ? '选择用户' : '选择律师'}`">
      </el-step>
      <el-step title="选择账单"></el-step>
      <el-step title="账单设置"></el-step>
    </el-steps>
    <div class="body" :style="`max-height:${height}px`">
      <div v-if="data.active === 0" class="section">
        <p>1. 请选择账单类别</p>
        <el-radio-group v-model="data.billType" class="first">
          <el-radio :label="0">法律服务费请款单_诚收向用户请款</el-radio>
          <el-radio :label="1">律师费请款单_律师向诚收请款</el-radio>
          <el-radio :label="2">平台管理费请款单_诚收向律所请款</el-radio>
        </el-radio-group>
      </div>
      <div v-if="data.active === 1" class="section">
        <p>2. {{ `请${data.billType === 0 ? '选择用户' : '选择律师'}` }}</p>
        <div class="second">
          <selectUser
            v-if="data.billType == 0"
            @setUserId="setUserId"
          ></selectUser>
          <selectLayer v-else @setUserId="setLayerId"></selectLayer>
        </div>
      </div>
      <div v-if="data.active === 2" class="section">
        <p>3. 请选择账单</p>
        <div class="third">
          <selectBill
            :billType="data.billType"
            :member_id="createData.member_id"
            :debtor_number="data.debtor_number"
            :lawyer_id="createData.lawyer_id"
            @getCurrencyId="getCurrencyId"
            @setId="setId"
            @setId1="setId1"
            @setId2="setId2"
            @setId3="setId3"
          ></selectBill>
        </div>
      </div>
      <div v-if="data.active === 3">
        <p>4. 请设置账单</p>
        <el-row>
          <span style="font-size:14px;margin-right:20px;">账单名称</span>
          <el-input
            style="width:680px;"
            size="small"
            v-model="createData.bill_title"
          ></el-input>
        </el-row>
      </div>
    </div>
    <div class="footer">
      <el-button style="margin-top: 12px;" @click="cancel">取消</el-button>
      <!-- <el-button style="margin-top: 12px;" @click="goBaack">上一步</el-button> -->
      <el-button style="margin-top: 12px;" type="primary" @click="next">{{
        data.active == 3 ? '提交' : '下一步'
      }}</el-button>
    </div>
  </div>
</template>
<script lang="ts" src="./ailistbill.ts"></script>
<style lang="scss">
@import './ailistbill.scss';
</style>
