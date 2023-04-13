<template>
  <div class="work-wrap">
    <el-link @click="tongji" v-show="data.is_super" class="qh" type="success"
      >切换到数据统计</el-link
    >
    <div class="work-box">
      <div class="box">
        <p class="title">AI律师函待审核</p>
        <span class="bj"></span>
        <table1
          :tableData="data.list1"
          :tableOption="data.option1"
          :loading="data.loading"
          @edit="open1"
        ></table1>
      </div>
      <div class="box">
        <p class="title">律师函待寄送</p>
        <span class="bj"></span>
        <table1
          :tableData="data.list2"
          :tableOption="data.option2"
          :loading="data.loading"
          @edit="open2"
        ></table1>
      </div>
      <div class="box">
        <p class="title">律师办案待审核</p>
        <span class="bj"></span>
        <table1
          :tableData="data.list3"
          :tableOption="data.option3"
          :loading="data.loading"
          @edit="open3"
        ></table1>
      </div>
      <div class="box">
        <p class="title">债权人待审核</p>
        <span class="bj"></span>
        <table1
          :tableData="data.list4"
          :tableOption="data.option4"
          :loading="data.loading"
          @edit="open4"
        ></table1>
      </div>
      <div class="box">
        <p class="title">授权管理员待审核</p>
        <span class="bj"></span>
        <table1
          :tableData="data.list5"
          :tableOption="data.option5"
          :loading="data.loading"
          @edit="open5"
        ></table1>
      </div>
      <div class="box">
        <p class="title">律师认证待审核</p>
        <span class="bj"></span>
        <table1
          :tableData="data.list6"
          :tableOption="data.option6"
          :loading="data.loading"
          @edit="open6"
        ></table1>
      </div>
    </div>
    <el-dialog
      custom-class="creditorDialog"
      title="债权人审核"
      :visible.sync="data.shenheType"
      center
    >
      <shenhe
        :row="editData"
        @onSubmit="onSubmit2"
        @close="
          () => {
            data.shenheType = false
          }
        "
      ></shenhe>
    </el-dialog>
    <el-dialog
      custom-class="creditorDialog shenhe"
      title="授权管理员审核"
      :visible.sync="data.creditorshenhShow"
      center
    >
      <shenheAdmin
        :data="adminData"
        @submit="onSubmit1"
        @close="
          () => {
            data.creditorshenhShow = false
          }
        "
      ></shenheAdmin>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./work.ts"></script>

<style lang="scss">
@import './work.scss';
</style>
