<template>
  <div class="payDate">
    <div v-if="data.type">
      <el-date-picker
        style="width:160px;"
        v-model="data.value1"
        size="mini"
        type="datetime"
        placeholder="选择日期时间"
        format="yyyy-MM-dd HH:mm"
        value-format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
      <el-button
        style="margin-left:10px;"
        @click="queren"
        size="mini"
        type="primary"
        >确认</el-button
      >
      <el-button @click="data.type = !data.type" size="mini">取消</el-button>
    </div>

    <span v-else>
      <span style="margin-right:10px;"> {{ value }}</span>
      <i
        style="color:#409eff;cursor: pointer;"
        @click="data.type = !data.type"
        class="el-icon-edit-outline"
      ></i>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as Api from '../../../../../api/finance'
@Component({})
export default class payDate extends Vue {
  @Prop() value!: string
  @Prop() bill_id!: string
  @Prop() type!: number
  data: any = {
    value1: '',
    type: false
  }
  @Watch('value', { immediate: true })
  valueChange(newVal: string, oldVal: string) {
    this.data.value1 = newVal
  }
  mounted() {
    //
  }
  //确认选择
  queren() {
    let parmas: any = {
      bill_id: this.bill_id,
      type: this.type,
      time: this.data.value1
    }
    Api.SetBillDate(parmas).then((res: any) => {
      if (res.state) {
        this.data.type = !this.data.type
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';
.payDate {
  display: inline-block;
  // width: 80%;
  position: relative;
  top: -11px;
  // & .el-date-picker {
  // }
}
</style>
