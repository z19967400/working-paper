<template>
  <div class="adminTab">
    <el-table
      :max-height="500"
      v-if="billType === 'Bill_Type_0'"
      border
      :data="tabList"
    >
      <el-table-column
        v-if="mType != '普通用户'"
        prop="member_vip_admin_id"
        label="管理员ID"
        width="180"
      >
      </el-table-column>
      <el-table-column v-else prop="member_id" label="用户ID"></el-table-column>
      <el-table-column
        v-if="mType != '普通用户'"
        prop="admin_name"
        label="管理员真实姓名"
      >
      </el-table-column>
      <el-table-column v-else prop="member_name" label="用户真实姓名">
      </el-table-column>
      <el-table-column prop="admin_phone_number" label="手机号码">
      </el-table-column>
      <el-table-column prop="admin_email" label="电子邮箱"> </el-table-column>
      <el-table-column v-show="mType != '普通用户'" label="权限" width="180">
        <template slot-scope="scope">
          <span>{{ getJurisdiction(scope.row.is_super) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <!-- <el-button type="text">发票完善通知</el-button> -->
          <el-button
            @click="novice(scope.row)"
            style="color:#67C23A;"
            type="text"
            >{{ '新账单通知' }}</el-button
          >
          <el-button @click="delected(scope.row.id)" type="text"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-table v-else border :data="tabList">
      <el-table-column prop="lawyer_id" label="律师ID" width="180">
      </el-table-column>
      <el-table-column prop="lawyer_name" label="律师姓名"> </el-table-column>
      <el-table-column prop="law_firm_name" label="律所名称"> </el-table-column>
      <el-table-column prop="lawyer_phone_number" label="手机号码">
      </el-table-column>
      <el-table-column prop="lawyer_email" label="电子邮箱"> </el-table-column>
      <!-- <el-table-column label="操作" width="280">
        <template>
          <el-button type="text">{{
            billType === 'Bill_Type_1' ? '收款信息完善通知' : '发票完善通知'
          }}</el-button>
          <el-button type="text">新账单通知</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import telephone from '../../../../Template/telephone/telephone.vue'
@Component({
  components: { telephone }
})
export default class adminTab extends Vue {
  @Prop() tabList!: any
  @Prop() billType!: string
  @Prop() mType?: string
  data: any = {}
  mounted() {
    //
  }
  getJurisdiction(num: number) {
    return num == 0 ? '普通用户' : '超级管理员'
  }
  //删除记录
  delected(id: number) {
    this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.$emit('delected', id)
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  //发送账单通知
  novice(row: any) {
    this.$emit('novice', row)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';
.adminTab {
  width: 100%;
  & .el-table {
    width: 100%;
  }
}
</style>
