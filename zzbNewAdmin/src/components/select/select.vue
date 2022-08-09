<template>
  <div id="select" class="select-wrap">
    <div class="api-from">
      <div class="select-box">
        <div class="select">
          <label class="label">选择条件</label>
          <el-select size="small" v-model="data.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-select
            v-if="
              data.value == 'api_type' ||
                data.value == 'project_name' ||
                data.value == 'executing_states' ||
                data.value == 'audit_status' ||
                data.value == 'entrust_type' ||
                data.value == 'collations' ||
                data.value == 'bill_status' ||
                data.value == 'pay_method' ||
                data.value == 'm_type' ||
                data.value == 'pay_status'
            "
            size="small"
            v-model="data.input"
            placeholder="请选择"
          >
            <el-option
              v-for="item in data.value == 'api_type'
                ? option.opt
                : data.value == 'executing_states' && !isAi
                ? option.opt3
                : data.value == 'executing_states' && isAi
                ? option.opt4
                : data.value == 'audit_status'
                ? option.opt5
                : data.value == 'entrust_type'
                ? option.opt6
                : data.value == 'collations'
                ? option.opt7
                : data.value == 'm_type'
                ? option.opt8
                : data.value == 'bill_status'
                ? option.opt9
                : data.value == 'pay_method'
                ? option.opt10
                : data.value == 'pay_status'
                ? option.opt11
                : option.opt2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-date-picker
            v-else-if="
              data.value == 'start_time' ||
                data.value == 'end_time' ||
                data.value == 'create_time'
            "
            value-format="yyyy-MM-dd"
            v-model="data.input"
            type="date"
            size="small"
            placeholder="选择日期"
            align="right"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
          <el-date-picker
            size="small"
            v-else-if="data.value == 'time'"
            v-model="data.input"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="margin-right:20px;position: relative;top: 1px;"
          >
          </el-date-picker>
          <el-input
            v-else
            size="small"
            v-model="data.input"
            @keyup.enter.native="search"
            placeholder="请输入内容"
          ></el-input>
          <el-button
            @click="search"
            size="small"
            type="primary"
            icon="el-icon-search"
            style="margin-right:0;"
            plain
            >查询</el-button
          >
        </div>
        <div v-show="data.select.length != 0" class="seleted">
          <div>
            <label class="label">已选条件</label>
            <el-tag
              :key="index"
              v-for="(tag, index) in data.select"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              type="primary"
            >
              <span v-if="tag.label == 'executing_states'">
                {{ extract(tag.value) }}
              </span>
              <span
                v-else-if="
                  tag.label == 'entrust_type' || tag.label == 'collations'
                "
              >
                {{ extract2(tag.label, tag.value) }}
              </span>
              <span v-else-if="tag.label == 'pay_status'">
                {{ extract3(tag.value) }}
              </span>
              <span v-else-if="tag.label == 'm_type'">
                {{ extract4(tag.value) }}
              </span>
              <span v-else-if="tag.label == 'pay_method'">
                {{ extract5(tag.value) }}
              </span>
              <span v-else-if="tag.label == 'bill_status'">
                {{ extract6(tag.value) }}
              </span>
              <span v-else>
                {{ tag.value }}
              </span>
            </el-tag>
          </div>
          <el-button
            @click="clearSelection()"
            size="small"
            type="primary"
            icon="el-icon-delete"
            plain
          ></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { SelectData } from '../../types/components/select.interface'
import option from './select'
// import {  } from "@/components" // 组件

@Component({})
export default class About extends Vue {
  @Prop({}) options!: Array<any>
  @Prop({ default: false }) kaifa?: boolean
  @Prop({}) isAi?: boolean
  // data
  data: SelectData = {
    componentName: 'select',
    input: '', //输入值
    value: '', //选择值
    select: []
  }
  option: any = option
  pickerOptions: any = {
    shortcuts: [
      {
        text: '今天',
        onClick(picker: any) {
          picker.$emit('pick', new Date())
        }
      },
      {
        text: '昨天',
        onClick(picker: any) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          picker.$emit('pick', date)
        }
      },
      {
        text: '一周前',
        onClick(picker: any) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', date)
        }
      }
    ]
  }
  @Watch('data.select.length')
  selectChangeValue(newValue: any, oldValue: any) {
    let table: any = document.getElementById('comTable')
    if (this.kaifa) {
      return false
    }
    let height: any = table.offsetHeight == null ? 0 : table.offsetHeight
    if (newValue == 0) {
      table.style.height = height + 60 + 'px'
    } else {
      table.style.height = height - 60 + 'px'
    }
  }
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let self: any = this
    if (self.kaifa) {
      self.data.value = 'project_name'
      self.data.input = '管理后台'
      self.search()
    }
  }
  //清除筛选
  clearSelection() {
    this.data.input = ''
    this.data.value = ''
    this.data.select = []
    this.$emit('clear')
  }
  //筛选
  search() {
    if (this.data.value == '') {
      let self: any = this
      self.$message.warning('请选择查询条件')
      return false
    }
    if (this.data.value != '' && this.data.input == '') {
      let self: any = this
      self.$message.warning('请选择输入查询内容条件')
      return false
    }
    if (this.data.input != '' && this.data.value != '') {
      if (this.data.input.length > 50) {
        let self: any = this
        self.$message.warning('查询内容不得超过50字')
        return false
      }
      let data: any = {
        label: this.data.value,
        value: this.data.input
      }
      let includes: any = this.data.select.filter((item: any) => {
        return data.label.includes(item.label)
      })
      if (includes.length == 0) {
        this.data.select.push(data)
      } else {
        includes[0].value = data.value
      }
      this.data.input = ''
      this.data.value = ''
      this.$emit('select', this.data.select)
    } else if (this.data.select.length != 0) {
      this.$emit('select', this.data.select)
    } else {
      return false
    }
  }
  //删除已选条件
  handleClose(tag: any) {
    this.data.select.splice(this.data.select.indexOf(tag), 1)
    this.$emit('select', this.data.select)
  }
  //取值
  extract(val: string) {
    let opt: any = this.isAi ? this.option.opt4 : this.option.opt3
    let data: any = opt.filter((item: any) => {
      return item.value == val
    })
    return data[0].label
  }
  //取值
  extract2(name: string, val: any) {
    let value: string = ''
    if (name == 'entrust_type') {
      let arr: any = this.option.opt6.filter((item: any) => {
        return item.value == val
      })
      value = arr[0].label
    } else {
      value = val == 0 ? '时间排序' : '委托金额'
    }
    return value
  }
  //支付状态取值
  extract3(val: string) {
    let data: any = this.option.opt11.filter((item: any) => {
      return item.value == val
    })
    return data[0].label
  }
  //用户类别取值
  extract4(val: string) {
    let data: any = this.option.opt8.filter((item: any) => {
      return item.value == val
    })
    return data[0].label
  }
  //支付方式取值
  extract5(val: string) {
    let data: any = this.option.opt10.filter((item: any) => {
      return item.value == val
    })
    return data[0].label
  }
  //账单状态取值
  extract6(val: string) {
    let data: any = this.option.opt9.filter((item: any) => {
      return item.value == val
    })
    return data[0].label
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.select-wrap {
  width: 100%;
  .select-box {
    .el-input {
      width: auto;
      margin-right: 20px;
    }
    .label {
      font-size: $Text-font;
      color: $General-colors;
      margin-right: 20px;
    }
    .el-button {
      margin-right: 15px;
    }
    .select {
      margin-bottom: 20px;
    }
    .seleted {
      display: flex;
      justify-content: space-between;
      line-height: 32px;
      margin-bottom: 20px;
      .el-tag {
        margin-right: 20px;
        border: none;
        line-height: 32px;
      }
    }
  }
}
.el-button--primary.is-plain {
  background-color: white;
}
</style>
