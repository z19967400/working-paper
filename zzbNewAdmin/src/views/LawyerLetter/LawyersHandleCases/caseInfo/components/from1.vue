<template>
  <div class="from1-wrap">
    <el-form :inline="true" :model="addCollectionFrom" class="demo-form-inline">
      <el-row>
        <el-col :span="12">
          <el-form-item label="办案事项" :label-width="labelWidth">
            <el-select
              v-model="addCollectionFrom.matter"
              placeholder="请选择办案事项"
            >
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="办案律师" :label-width="labelWidth">
            <el-select
              v-model="addCollectionFrom.lawyer"
              placeholder="请选择办案律师"
            >
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="回款币种" :label-width="labelWidth">
            <el-select
              v-model="addCollectionFrom.Collection_currency"
              placeholder="请选择回款币种"
            >
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="回款金额" :label-width="labelWidth">
            <el-input
              v-model="addCollectionFrom.Collection_Amount"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="回款方式" :label-width="labelWidth">
            <el-select
              v-model="addCollectionFrom.Collection_Amount"
              placeholder="请选择回款方式"
            >
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="回款日期" :label-width="labelWidth">
            <el-date-picker
              v-model="addCollectionFrom.Collection_time"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="确认状态" :label-width="labelWidth">
          <el-select
            v-model="addCollectionFrom.ConfirmStatus"
            placeholder="请选择回款币种"
          >
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="data.addCollection = false">取 消</el-button>
      <el-button type="primary" @click="data.addCollection = false"
        >确 定</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component({})
export default class About extends Vue {
  // data
  addCollectionFrom: any = {
    id: 0,
    matter: '一审',
    lawyer: '王律师',
    Collection_currency: '人民币（元）',
    Collection_Amount: '998',
    Collection_method: '转账',
    Collection_time: '2020-02-02 08:54:62',
    ConfirmStatus: '已确认',
    notes: '111'
  }
  labelWidth: string = '80px'
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let self: any = this
  }
  //初始化
  init() {
    //
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.from1-wrap {
  width: 100%;
}
</style>
