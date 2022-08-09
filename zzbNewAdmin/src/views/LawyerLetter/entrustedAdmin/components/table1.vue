<template>
  <div class="table1-wrap">
    <div class="table1-box">
      <el-table :data="data.list" border style="width: 100%">
        <el-table-column
          v-for="(item, index) in tableOption"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <!-- <el-popover placement="bottom" trigger="click" :content="tostr(scope.row[item.prop])" popper-class="table-click" :visible-arrow="false"> -->
            <div
              v-if="scope.row['task_type_name'] === 'EMS律师函'"
              slot="reference"
              class="cell"
            >
              <div
                v-if="
                  item.prop === 'send_time' && audit_status == 'Audit_states_2'
                "
              >
                <div v-if="scope.row['editType']">
                  <el-date-picker
                    :clearable="false"
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                    style="width:175px;"
                    v-model="scope.row[item.prop]"
                    type="datetime"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                  <el-button
                    style="margin-left:10px;"
                    @click.native.stop="editRow(scope.row)"
                    type="text"
                    size="small"
                  >
                    保存
                  </el-button>
                  <el-button
                    @click.stop="closeEdit(scope.$index)"
                    style="margin-left:5px;color:#E6A23C;"
                    type="text"
                    size="small"
                    >取消</el-button
                  >
                </div>
                <div class="sandTime" v-else>
                  <span>{{ scope.row[item.prop] }}</span>
                  <el-button
                    @click.stop="openEdit(scope.$index)"
                    type="text"
                    icon="el-icon-edit-outline"
                    style="color:#409EFF;"
                    circle
                  ></el-button>
                </div>
                <div></div>
              </div>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </div>
            <div v-else slot="reference" class="cell">
              {{ scope.row[item.prop] }}
            </div>
            <!-- </el-popover> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
@Component({})
export default class About extends Vue {
  // prop
  @Prop() tableData!: any
  @Prop() tableOption!: any
  @Prop({ default: false }) operation?: boolean
  @Prop({}) audit_status?: string
  //Watch
  @Watch('tableData', { deep: true })
  tableDataChange(newVal: any, oldVal: any) {
    this.data.list = JSON.parse(JSON.stringify(newVal))
    this.data.list.forEach((item: any) => {
      item['editType'] = false
    })
  }
  @Watch('data.list', { deep: true })
  listChange(newVal: any, oldVal: any) {}
  // data
  data: any = {
    list: []
  }

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    //
  }
  //转字符串
  tostr(val: any) {
    if (val != null) {
      return val.toString()
    } else {
      return val
    }
  }
  //日期编辑
  editRow(row: any) {
    this.$emit('editSandTime', row)
    // eslint-disable-next-line no-console
    console.log(22)
  }
  //打开日期编辑
  openEdit(index: number) {
    let list: any = [...this.data.list]
    list[index]['editType'] = true
    this.$set(this.data, 'list', list)
  }
  //关闭日期编辑
  closeEdit(index: number) {
    let list: any = [...this.data.list]
    list[index]['editType'] = false
    this.$set(this.data, 'list', list)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.table1-wrap {
  width: 100%;
  .el-table th > .cell {
    text-align: center;
  }
  & .sandTime {
    position: relative;
    height: 100%;
    & .el-button {
      position: absolute;
      top: -8px;
    }
  }
}
</style>
