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
          <el-input
            v-if="
              data.value != 'api_type' &&
                data.value != 'project_name' &&
                data.value != 'start_time' &&
                data.value != 'end_time' &&
                data.value != 'executing_status' &&
                data.value != 'create_time' &&
                data.value != 'case_status'
            "
            size="small"
            v-model="data.input"
            @keyup.enter.native="search"
            placeholder="请输入内容"
          ></el-input>
          <el-select
            v-if="
              data.value == 'api_type' ||
                data.value == 'project_name' ||
                data.value == 'executing_status' ||
                data.value == 'case_status'
            "
            size="small"
            v-model="data.input"
            placeholder="请选择"
          >
            <el-option
              v-for="item in data.value == 'api_type'
                ? opt
                : data.value == 'executing_status'
                ? opt3
                : data.value == 'case_status'
                ? opt4
                : opt2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-date-picker
            v-if="
              data.value == 'start_time' ||
                data.value == 'end_time' ||
                data.value == 'create_time'
            "
            value-format="yyyy-MM-dd"
            v-model="data.input"
            type="date"
            size="small"
            placeholder="选择日期时间"
            align="right"
          >
          </el-date-picker>
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
              <span v-if="tag.label == 'executing_status'">
                {{ extract(tag.value) }}
              </span>
              <span v-else-if="tag.label == 'case_status'">
                {{ extract2(tag.value) }}
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
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { SelectData } from "../../types/components/select.interface";
// import {  } from "@/components" // 组件

@Component({})
export default class About extends Vue {
  @Prop({}) options!: Array<any>;
  @Prop({ default: false }) kaifa?: boolean;
  // data
  data: SelectData = {
    componentName: "select",
    input: "", //输入值
    value: "", //选择值
    select: []
  };
  opt: any = [
    { label: "平台管理", value: "平台管理" },
    { label: "用户端", value: "用户端" }
  ];
  opt2: any = [
    { label: "管理后台", value: "管理后台" },
    { label: "PC端", value: "PC端" },
    { label: "会员小程序", value: "会员小程序" },
    { label: "VIP小程序", value: "VIP小程序" },
    { label: "律师小程序", value: "律师小程序" }
  ];
  opt3: any = [
    { label: "待审核", value: "AI_State_1" },
    { label: "执行中", value: "AI_State_2" },
    { label: "已完成", value: "AI_State_3" },
    { label: "已终止", value: "AI_State_4" },
    { label: "已撤销", value: "AI_State_5" },
    { label: "审核未通过", value: "AI_State_6" }
  ];
  opt4: any = [
    { label: "评估中", value: "Case_state_0" },
    { label: "待客户确认", value: "Case_state_1" },
    { label: "待发布", value: "Case_state_2" },
    { label: "待分配律师", value: "Case_state_3" },
    { label: "待签署合同", value: "Case_state_4" },
    { label: "办案中", value: "Case_state_5" },
    { label: "已结案", value: "Case_state_6" },
    { label: "无律师接案", value: "Case_state_7" },
    { label: "已撤销", value: "Case_state_8" },
    { label: "已终止", value: "Case_state_9" }
  ];
  pickerOptions: any = {
    shortcuts: [
      {
        text: "今天",
        onClick(picker: any) {
          picker.$emit("pick", new Date());
        }
      },
      {
        text: "昨天",
        onClick(picker: any) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          picker.$emit("pick", date);
        }
      },
      {
        text: "一周前",
        onClick(picker: any) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit("pick", date);
        }
      }
    ]
  };
  @Watch("data.select.length")
  selectChangeValue(newValue: any, oldValue: any) {
    let table: any = document.getElementById("comTable");
    if (this.kaifa) {
      return false;
    }
    let height: any = table.offsetHeight == null ? 0 : table.offsetHeight;
    if (newValue == 0) {
      table.style.height = height + 60 + "px";
    } else {
      table.style.height = height - 60 + "px";
    }
  }
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let self: any = this;
    if (self.kaifa) {
      self.data.value = "project_name";
      self.data.input = "管理后台";
      self.search();
    }
  }
  //清除筛选
  clearSelection() {
    this.data.input = "";
    this.data.value = "";
    this.data.select = [];
    this.$emit("clear");
  }
  //筛选
  search() {
    if (this.data.value == "") {
      let self: any = this;
      self.$message.warning("请选择查询条件");
      return false;
    }
    if (this.data.value != "" && this.data.input == "") {
      let self: any = this;
      self.$message.warning("请选择输入查询内容条件");
      return false;
    }
    if (this.data.input != "" && this.data.value != "") {
      if (this.data.input.length > 50) {
        let self: any = this;
        self.$message.warning("查询内容不得超过50字");
        return false;
      }
      let data: any = {
        label: this.data.value,
        value: this.data.input
      };
      let includes: any = this.data.select.filter((item: any) => {
        return data.label.includes(item.label);
      });
      if (includes.length == 0) {
        this.data.select.push(data);
      } else {
        includes[0].value = data.value;
      }
      this.data.input = "";
      this.data.value = "";
      this.$emit("select", this.data.select);
    } else if (this.data.select.length != 0) {
      this.$emit("select", this.data.select);
    } else {
      return false;
    }
  }
  //删除已选条件
  handleClose(tag: any) {
    this.data.select.splice(this.data.select.indexOf(tag), 1);
    this.$emit("select", this.data.select);
  }
  //取值
  extract(val: string) {
    let data: any = this.opt3.filter((item: any) => {
      return item.value == val;
    });
    return data[0].label;
  }
  //取值2
  extract2(val: string) {
    let data: any = this.opt4.filter((item: any) => {
      return item.value == val;
    });
    return data[0].label;
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";

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
