<template>
  <div class="handCasePross">
    <div class="handCasePross-section">
      <!-- <p class="handCasePross-section-title">案件流程</p> -->
      <div v-for="(item, index) in data.casePross.matters" :key="index">
        <p class="handCasePross-section-title">{{ item.matters_name }}</p>
        <!-- <table1 :tableData="item.list" :tableOption="data.matters_fromType"></table1> -->
        <el-table
          align="left"
          :header-cell-style="{ 'text-align': 'left' }"
          :cell-style="{ 'text-align': 'left' }"
          :data="item.list"
          style="width: 100%"
        >
          <el-table-column
            v-for="(item, index) in data.matters_fromType"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          >
            <template slot-scope="scope">
              <span>
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                class="text"
                type="text"
                :disabled="scope.row['execution_status'] != '已完成'"
                @click="handleSee(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <div class="handCasePross-section">
      <p class="handCasePross-section-title">表单信息</p>
      <table1 :tableData="data.casePross.matters_from" :tableOption="data.matters_fromType"></table1>
    </div> -->
    <el-dialog
      class="contractDialog"
      title="办案进度"
      :visible.sync="data.contractVisible"
    >
      <el-steps
        direction="vertical"
        finish-status="success"
        :active="data.contractData.length"
      >
        <el-step
          v-for="(item, index) in data.contractData"
          :key="index"
          :title="item.name"
        >
          <div slot="description">
            <span
              v-if="
                item.control_type != 'Control_type_9' &&
                  item.control_type != 'Control_type_8'
              "
              >{{ item.form_value }}</span
            >
            <img
              @click="preview(item.form_value)"
              v-if="item.control_type == 'Control_type_8'"
              :src="item.form_value"
              width="120px"
              alt=""
            />
            <div v-if="item.control_type == 'Control_type_9'">
              <img
                @click="preview(item2)"
                style="margin-right:20px;"
                v-for="(item2, index2) in item.form_value.split(',')"
                width="120px"
                :key="index2"
                :src="item2"
              />
            </div>
          </div>
        </el-step>
      </el-steps>
      <!-- <el-row
        style="margin-bottom:20px;"
        v-for="(item, index) in data.contractData"
        :key="index"
      >
        <el-col :span="8">
          <span>{{ item.name }}</span>
        </el-col>
        <el-col :span="12">
          <div v-if="item.control_type == 'Control_type_9'">
            <img
              style="width:200px;"
              @click="preview(item2)"
              v-for="(item2, index2) in item.arr"
              :src="item2"
              :key="index2"
            />
          </div>
          <img
            style="width:200px;"
            @click="preview(item.form_value)"
            v-else-if="item.control_type == 'Control_type_8'"
            :src="item.form_value"
            alt=""
          />
          <span v-else> {{ item.form_value }} </span>
        </el-col>
      </el-row> -->
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { api } from "../../../../../../zzbPc/src/assets/js/api";
import * as Api from "../../../../api/AIlvshihan";
import table1 from "./table1.vue";
@Component({
  components: {
    table1
  }
})
export default class About extends Vue {
  @Prop() caseProssData!: any;
  @Watch("caseProssData")
  caseProssDataChange(newVal: any, oldVal: any) {
    newVal.contract.forEach((item: any) => {
      item.contract_type =
        item.contract_type == 0
          ? "委托合同"
          : item.contract_type == 0
          ? "律师代理合同"
          : "律师解约合同";
      item.contract_sign_method =
        item.contract_sign_method == 0 ? "线上签署" : "线下签署";
      item.sign_status =
        item.sign_status == -1
          ? "合同准备中"
          : item.sign_status == 0
          ? "待签署"
          : "已签署";
    });
    newVal.matters_from.forEach((item: any) => {
      item.execution_status =
        item.execution_status == -1
          ? "未开始"
          : item.execution_status == 0
          ? "进行中"
          : "已完成";
    });
    this.data.casePross.lawyer = newVal.lawyer;
    this.data.casePross.contract = newVal.contract;
    this.data.casePross.court = newVal.court;
    newVal.matters.forEach((item: any) => {
      item.list = newVal.matters_from.filter((item2: any) => {
        return item2.matters_id == item.id;
      });
      this.data.casePross.matters.push(item);
    });
    // this.data.casePross.matters_from = newVal.matters_from
  }
  data: any = {
    contractVisible: false,
    casePross: {
      lawyer: [],
      contract: [],
      court: [],
      matters: [],
      matters_from: []
    },
    mattersType: [
      { prop: "debtor_number", label: "债务人编号" },
      { prop: "matters_name", label: "事项名称" }
    ],
    matters_fromType: [
      { prop: "from_name", label: "流程名称" },
      { prop: "estimated_time", label: "预计时间" },
      { prop: "completion_time", label: "完成时间" },
      { prop: "execution_status", label: "执行状态" }
    ],
    //合同内容
    contractData: []
  };
  //查看
  handleSee(row: any) {
    this.data.contractVisible = true;
    Api.getProcessInfo(row.id).then((res: any) => {
      res.data.forEach((item: any) => {
        if (item.control_type == "Control_type_9") {
          let arr: any = [];
          if (item.form_value != "") {
            arr = item.form_value.split(",");
          }
          item["arr"] = arr;
        }
      });
      this.data.contractData = res.data;
    });
  }
  //图片预览
  preview(url: string) {
    window.open(url);
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";
.handCasePross {
  width: 100%;
  & .handCasePross-section-title {
    font-size: 12px;
    color: #313131;
    font-weight: bold;
    padding-left: 12px;
  }
  & .contractDialog .el-dialog {
    width: 680px;
  }
  & .text {
    color: #409eff;
  }
  & .is-disabled {
    color: #c0c4cc;
  }
  & .el-table th > .cell {
    text-align: left;
    font-weight: normal;
  }
  & .el-step__title.is-success {
    color: #313133;
  }
  & .el-step__description.is-success {
    font-size: 14px;
    min-height: 40px;
    margin-bottom: 20px;
    color: #606266;
  }
}
</style>
