<template>
  <div class="table2-wrap">
    <div class="table2-box">
      <el-table
        v-loading="loading"
        element-loading-text="加载中"
        highlight-current-row
        max-height="500"
        ref="moviesTable"
        :data="data.list"
        border
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          v-for="(item, index) in tableOption"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :fixed="index == 0 ? true : false"
        >
          <template slot-scope="scope">
            <div v-if="item.label == '地区'">
              <div>
                <div
                  style="cursor: pointer"
                  @click="scope.row['isAddress'] = !scope.row['isAddress']"
                  v-if="!scope.row['isAddress']"
                >
                  {{ scope.row[item.prop] || '未设置' }}
                </div>
                <div v-else>
                  <el-col :span="18">
                    <comAddress
                      @emitAddress="addressEdit"
                      :id="scope.row['debtor_number']"
                      :address="scope.row[item.prop]"
                    ></comAddress>
                  </el-col>
                  <el-col :span="3">
                    <el-button
                      @click="addresDetermine(scope.$index)"
                      class="info"
                      type="text"
                      size="small"
                      >确定</el-button
                    >
                  </el-col>
                  <el-col :span="3">
                    <el-button
                      @click="scope.row['isAddress'] = !scope.row['isAddress']"
                      class="edit"
                      type="text"
                      size="small"
                      >取消</el-button
                    >
                  </el-col>
                </div>
              </div>
            </div>
            <div
              v-else-if="
                item.label == '执行进度' ||
                  item.label == '首次短信' ||
                  item.label == '首次电话' ||
                  item.label == '邮件催款函' ||
                  item.label == '电子律师函' ||
                  item.label == 'EMS律师函' ||
                  item.label == '末次短信' ||
                  item.label == '末次电话'
              "
            >
              <span
                style="color:#E6A23C;"
                v-if="
                  scope.row[item.prop] == '待支付' ||
                    scope.row[item.prop] == '待执行'
                "
                >{{ scope.row[item.prop] }}</span
              >
              <span
                style="color:#67C23A;"
                v-else-if="
                  scope.row[item.prop] == '发送成功' ||
                    scope.row[item.prop] == '执行成功' ||
                    scope.row[item.prop] == '已完成'
                "
                >{{ scope.row[item.prop] }}</span
              >
              <span
                style="color:#ec193a;"
                v-else-if="
                  scope.row[item.prop] == '发送失败' ||
                    scope.row[item.prop] == '执行失败' ||
                    scope.row[item.prop] == '已终止'
                "
                >{{ scope.row[item.prop] }}</span
              >
              <span
                style="color:#409EFF;"
                v-else-if="
                  scope.row[item.prop] == '执行中' ||
                    scope.row[item.prop] == '发送中'
                "
                >{{ scope.row[item.prop] }}</span
              >
              <span style="color:#909399;" v-else>{{
                scope.row[item.prop]
              }}</span>
            </div>
            <div v-else>
              <el-popover
                placement="bottom"
                trigger="click"
                :content="tostr(scope.row[item.prop])"
                popper-class="table-click"
                :visible-arrow="false"
              >
                <div slot="reference" class="cell">
                  {{ scope.row[item.prop] }}
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220px">
          <template slot-scope="scope">
            <el-button
              @click="tongzhi(scope.row, scope.$index)"
              class="edit"
              type="text"
              size="small"
              >短信通知</el-button
            >
            <el-button
              v-if="
                scope.row['executing_status'] == 'AI_State_0' ||
                  scope.row['executing_status'] == 'AI_State_1'
              "
              @click="editClick(scope.row, scope.$index)"
              class="edit"
              type="text"
              size="small"
              >修改</el-button
            >
            <el-button
              @click="handleClick(scope.row, scope.$index)"
              class="info"
              type="text"
              size="small"
              >任务</el-button
            >
            <el-button
              @click="infoClick(scope.row, scope.$index)"
              class="chakan"
              type="text"
              size="small"
              >报告</el-button
            >
            <el-button
              :disabled="
                scope.row['executing_status'] == 'AI_State_0' ||
                  scope.row['executing_status'] == 'AI_State_1' ||
                  scope.row['executing_status'] == 'AI_State_4' ||
                  scope.row['executing_status'] == 'AI_State_3' ||
                  scope.row['executing_status'] == 'AI_State_5'
              "
              @click="stopClick(scope.row, scope.$index)"
              class="stop"
              type="text"
              size="small"
              >终止</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { comAddress } from '../../../../components/index'

interface aa {
  row: any
  rowIndex: number
}
@Component({
  components: {
    comAddress
  }
})
export default class table2 extends Vue {
  // prop
  @Prop() tableData!: any
  @Prop() tableOption!: any
  @Prop() loading!: boolean
  //Watch
  @Watch('tableData', { deep: true })
  tableDataChange(newVal: any, oldVal: any) {
    this.data.list = newVal
  }
  // data
  data: any = {
    list: [],
    edit: {},
    index: 0
  }

  created() {
    this.$nextTick(() => {
      const moviesTable: any = this.$refs.moviesTable
      moviesTable.bodyWrapper.addEventListener('scroll', this.handlScorll, true)
    })
  }

  activated() {
    //
  }

  mounted() {
    //
  }
  //查看
  handleClick(val: any, index: number) {
    this.$emit('info', val)
    this.clickRow(index)
  }
  //编辑
  editClick(val: any, index: number) {
    this.$emit('edit', val)
    this.clickRow(index)
  }
  //终止
  stopClick(val: any, index: number) {
    this.$emit('stop', val)
    this.clickRow(index)
  }
  //报告
  infoClick(val: any, index: number) {
    let debtor_number: string = val.debtor_number
    this.clickRow(index)
    window.open(
      'http://api1.debteehelper.com/AILawyerLetter/AILawyerLetterReport?debtor_number=' +
        debtor_number
    )
  }
  //短信通知
  tongzhi(data: any) {
    this.$emit('tongzhi', data)
  }
  //地址修改
  addressEdit(data: any) {
    this.data.edit = data
  }
  //地址修改确定
  addresDetermine(index: number) {
    this.$emit('address', this.data.edit)
    this.data.list[index].isAddress = !this.data.list[index].isAddress
  }
  //点击每一行
  clickRow(index: number) {
    let self: any = this
    self.data.index = index
  }

  //表格点击选中
  tableRowClassName({ row, rowIndex }: aa) {
    if (rowIndex === this.data.index) {
      return 'success-row'
    }
    return ''
  }
  //转字符串
  tostr(val: any) {
    if (val != null) {
      return val.toString()
    } else {
      return val
    }
  }
  handlScorll(res: any) {
    let height = res.target
    let clientHeight = height.clientHeight
    let scrollTop = height.scrollTop
    let scrollHeight = height.scrollHeight
    if (clientHeight + scrollTop >= scrollHeight) {
      this.$emit('load')
    }
  }
  beforeDestroy() {
    window.removeEventListener('scroll', this.handlScorll)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.table2-wrap {
  width: 100%;
  & .edit {
    color: #55a3f4;
  }
  & .stop {
    color: #ec193a;
  }
  & .chakan {
    color: #e6a23c;
  }
  & .cell {
    height: 32px;
    line-height: 32px;
    div {
      height: 100%;
    }
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  & .el-button.is-disabled {
    color: #c0c4cc !important;
  }
}
</style>
