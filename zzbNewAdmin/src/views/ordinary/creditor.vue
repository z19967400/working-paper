<template>
  <div class="creditor-wrap">
    <div class="creditor-list">
      <div class="search-box">
        <el-input
          v-model="getData.creditor_name"
          placeholder="债权人名称"
          size="small"
        ></el-input>
        <el-input
          v-model="getData.member_name"
          placeholder="用户名称"
          size="small"
        ></el-input>
        <el-input
          v-model="getData.audit_status"
          placeholder="审核状态"
          size="small"
        ></el-input>
        <el-input
          v-model="getData.create_name"
          placeholder="创建人"
          size="small"
        ></el-input>
        <el-button size="small" @click="search" type="primary" plain
          >查询</el-button
        >
        <el-button size="small" @click="reset" type="primary">重置</el-button>
      </div>
      <el-table
        :height="data.height"
        v-loading="data.loading"
        :data="data.list"
        style="margin-top:20px;"
        border
      >
        <el-table-column prop="id" label="ID" width="80"> </el-table-column>
        <el-table-column prop="creditor_type" label="债权人类型" width="120">
          <template slot-scope="scope">
            <span>{{
              scope.row.creditor_type == 'Creditor_states_0' ? '企业' : '个人'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creditor_name" label="债权人名称" width="">
        </el-table-column>
        <el-table-column prop="agent_authorization" label="授权书" width="120">
          <template slot-scope="scope">
            <el-button
              @click="open(scope.row.agent_authorization)"
              style="color:#67C23A;"
              type="text"
              :disabled="!scope.row.agent_authorization"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="audit_status" label="审核状态" width="120">
          <template slot-scope="scope">
            <span>{{
              scope.row.audit_status === 'Audit_states_0'
                ? '待审核'
                : scope.row.audit_status === 'Audit_states_1'
                ? '未通过'
                : '已通过'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_name" label="创建人" width="">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="150">
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="220">
          <template slot-scope="scope">
            <el-button
              style="color:#E6A23C;"
              @click="handleEdit(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              @click="examine(scope.row)"
              type="text"
              style="color:#409EFF;"
              size="small"
              >审核</el-button
            >
            <el-button
              style="color:#67C23A;"
              @click="admin(scope.row)"
              type="text"
              size="small"
              >管理员</el-button
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
      title="债权人编辑"
      :visible.sync="data.editType"
      center
    >
      <addCreditor
        @onSubmit="onSubmit"
        @close="
          () => {
            data.editType = false
            editData = {}
          }
        "
        :row="editData"
      ></addCreditor>
    </el-dialog>
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
      custom-class="creditorDialog2"
      title="管理员列表"
      :visible.sync="data.adminType"
      center
    >
      <el-table :data="adminList" style="width:100%;" :max-height="500" border>
        <el-table-column prop="admin_id" label="ID" width="80">
        </el-table-column>
        <el-table-column prop="admin_name" label="管理员真实姓名" width="180">
        </el-table-column>
        <el-table-column prop="admin_account" label="登录名" width="150">
        </el-table-column>
        <el-table-column prop="id_number" label="身份证号" width="180">
        </el-table-column>
        <el-table-column prop="admin_phone_number" label="手机号码" width="150">
        </el-table-column>
        <el-table-column prop="admin_email" label="电子邮箱" width="180">
        </el-table-column>
        <el-table-column prop="is_super" label="权限" width="180">
          <template slot-scope="scope">
            <span>{{
              scope.row.is_super == '1' ? '超级管理员' : '普通管理员'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="authorization_file" label="授权书" width="180">
          <template slot-scope="scope">
            <el-button
              @click="open(scope.row.authorization_file)"
              style="color:#67C23A;"
              type="text"
              :disabled="!scope.row.authorization_file"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="audit_status" label="审核状态" width="180">
          <template slot-scope="scope">
            <span>{{
              scope.row.audit_status === 'Audit_states_0'
                ? '待审核'
                : scope.row.audit_status === 'Audit_states_1'
                ? '未通过'
                : '已通过'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="180">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { api } from '../../../../zzbPc/src/assets/js/api'
import { comPaging } from '../../components/index'
import addCreditor from './compents/addCreditor.vue'
import * as Api from '../../api/user'
import shenhe from './compents/shenhe.vue'
@Component({
  components: {
    comPaging,
    addCreditor,
    shenhe
  }
})
export default class Creditor extends Vue {
  data: any = {
    list: [],
    height: 0,
    loading: false,
    loading2: false,
    totalize: 0,
    editType: false,
    shenheType: false,
    adminType: false
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit,
    creditor_name: '',
    member_name: '',
    audit_status: '',
    create_name: ''
  }
  editData: any = {}
  adminList: any = []
  created() {
    let Wheight: number | null = document.body.offsetHeight
    this.data.height = Wheight - 230
  }

  activated() {
    this.init()
  }
  init() {
    this.data.loading = true
    Api.GetCreditorPagingData(this.getData).then((res: any) => {
      this.data.loading = false
      res.data.forEach((item: any) => {
        item.create_time = item.create_time.replace('T', ' ')
        item.create_time = item.create_time.substring(
          0,
          item.create_time.lastIndexOf(':')
        )
      })
      this.data.list = res.data
      this.data.totalize = res.count
    })
  }
  //搜索
  search() {
    let self: any = this
    self.getData.page = 1
    self.init()
  }
  //重置搜索
  reset() {
    this.getData = {
      page: 1,
      limit: this.$store.getters.limit,
      creditor_name: '',
      member_name: '',
      audit_status: '',
      create_name: ''
    }
    this.init()
  }
  //查看授权书
  open(url: string) {
    window.open(url)
  }
  //编辑
  handleEdit(row: any) {
    this.editData = row
    this.data.editType = true
  }
  //管理员
  admin(row: any) {
    this.data.loading2 = true
    Api.GetCreditorAdminByCreditorId(row.id).then((res: any) => {
      res.data.forEach((item: any) => {
        item.create_time = item.create_time.replace('T', ' ')
        item.create_time = item.create_time.substring(
          0,
          item.create_time.lastIndexOf(':')
        )
      })
      this.adminList = res.data
      this.data.adminType = true
      this.data.loading2 = false
    })
  }
  //审核
  examine(row: any) {
    this.editData = row
    this.data.shenheType = true
  }
  //删除
  handleDelete(row: any) {
    this.$confirm('您确定删除该债权人吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.DeleteCreditor(row.id).then((res: any) => {
          if (res.state) {
            this.init()
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  //债权人编辑提交
  onSubmit(parmas: any) {
    Api.UpdateCreditor(parmas).then((res: any) => {
      if (res.state) {
        this.data.editType = false
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //审核提交
  onSubmit2(parmas: any) {
    Api.CreditorAudit(parmas).then((res: any) => {
      if (res.state) {
        this.data.shenheType = false
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //分页
  watchChange(index: number, limit: number | null) {
    let self: any = this
    self.getData.page = index
    self.getData.limit = limit == null ? self.getData.limit : limit
    self.init()
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';
.creditor-wrap {
  height: 100%;
  background-color: $main-body-bgColor;
  width: 100%;
  position: relative;
  & .creditor-list {
    & .search-box {
      & > .el-input {
        display: inline-block;
        width: 180px;
        margin-right: 20px;
      }
    }
  }
  & .creditorDialog {
    width: 680px;
    border-radius: 10px;
  }
  & .creditorDialog2 {
    width: 1280px;
    border-radius: 10px;
  }
  & .is-disabled {
    color: #c0c4cc !important;
  }
}
</style>
