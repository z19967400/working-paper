<template>
  <div class="offer">
    <div v-if="data.type == 0">
      <div v-if="data.case_report_file != ''">
        <span style="font-size:14px;color:#606366;">案件评估分析报告</span>
        <el-button
          style="color:#67C23A;margin-left:10px;font-size:14px;"
          @click="openReport"
          type="text"
          >点击下载</el-button
        >
      </div>
      <el-button
        size="small"
        @click="data.confirm = true"
        style="display:block;"
        type="primary"
        plain
        >选择律师费模式</el-button
      >
    </div>
    <div v-else-if="data.type == 2" class="noSelect">
      <span>案件评估中</span>
    </div>
    <div v-else>
      <el-table :data="data.slelectList">
        <el-table-column prop="patternName" label="服务费模式">
        </el-table-column>
        <el-table-column prop="quotedFrice" label="报价"> </el-table-column>
        <el-table-column prop="range" label="服务范围"> </el-table-column>
      </el-table>
      <div v-if="data.case_report_file != ''">
        <span style="font-size:14px;color:#606366;">案件评估分析报告</span>
        <el-button
          style="color:#67C23A;margin-left:10px;font-size:14px;"
          @click="openReport"
          type="text"
          >点击下载</el-button
        >
      </div>
    </div>
    <el-dialog title="确认案件服务费模式" :visible.sync="data.confirm">
      <el-table :data="data.patterns" style="width: 100%" max-height="350">
        <el-table-column prop="patternName" label="服务费模式" width="120">
        </el-table-column>
        <el-table-column prop="quotedFrice" label="报价" width="120">
        </el-table-column>
        <el-table-column prop="range" label="服务范围"> </el-table-column>
        <el-table-column fixed="right" label="选择" width="60">
          <template slot-scope="scope">
            <el-radio v-model="data.service_fee_mode" :label="scope.row.id">{{
              ""
            }}</el-radio>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="data.case_report_file != ''">
        <span style="font-size:14px;color:#606366;">案件评估分析报告</span>
        <el-button
          style="color:#67C23A;margin-left:10px;font-size:14px;"
          @click="openReport"
          type="text"
          >点击下载</el-button
        >
      </div>
      <div style="text-align: center;position: relative;top:20px;">
        <el-button @click="patternsConfirm" type="primary">确认</el-button>
        <el-button @click="data.confirm = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { baseURL } from "../../../../utils/request";
import * as Api from "../../../../api/AIlvshihan";
@Component({})
export default class offer extends Vue {
  @Prop() debtor_number!: string;
  @Prop() operation_authority!: boolean;
  data: any = {
    service_fee_mode: -1,
    case_report_file: "",
    confirm: false,
    patterns: [],
    slelectList: [],
    type: 0
  };
  mounted() {
    this.getOfferInfo();
  }
  //获取报价详情
  getOfferInfo() {
    Api.GetQuotedPriceByDebtorNumber(this.debtor_number).then((res: any) => {
      this.data.service_fee_mode = res.data.customer_select;
      this.data.case_report_file = res.data.case_report_file;
      const arr: any = [
        {
          id: 0,
          patternName: "纯固定",
          quotedFrice: res.data.fixed_service_fee,
          range: "诉讼一审/仲裁",
          show: res.data.display_fixed_service_fee == 1
        },
        {
          id: 1,
          patternName: "纯风险",
          quotedFrice: res.data.risk_service_fee + "%",
          range:
            "全案委托（包括但不限于非诉催收、财产保全、诉讼一审/仲裁、诉讼二审、强制执行等法律程序）",
          show: res.data.display_risk_service_fee == 1
        },
        {
          id: 2,
          patternName: "固定+风险",
          quotedFrice:
            res.data.fixed_risk_service_fee_fixed +
            "元" +
            "+" +
            res.data.fixed_risk_service_fee_risk +
            "%",
          range:
            "全案委托（包括但不限于非诉催收、财产保全、诉讼一审/仲裁、诉讼二审、强制执行等法律程序）",
          show: res.data.display_fixed_risk_service_fee == 1
        }
      ];
      this.data.patterns = arr.filter((item: any) => {
        return item.show;
      });
      if (
        res.data.send_customer_status == 1 &&
        res.data.customer_select == -1
      ) {
        //报价待选择
        this.data.type = 0;
        this.data.confirm = true;
      } else if (
        res.data.send_customer_status == 1 &&
        res.data.customer_select > -1
      ) {
        //报价已选择
        this.data.type = 1;
        this.data.slelectList = arr.filter((item: any) => {
          return item.id == res.data.customer_select;
        });
      } else {
        //报价不可选择
        this.data.type = 2;
      }
    });
  }
  //选择报价模式
  patternsConfirm() {
    const self: any = this;
    if (this.operation_authority == false) {
      self.$message.warning("抱歉,未授权管理员无法确认报价哦！");
      return false;
    }
    const parmas: any = {
      debtor_number: this.debtor_number,
      customer_select: this.data.service_fee_mode
    };
    Api.CustomerSelectQuotedPrice(parmas).then((res: any) => {
      if (res.state) {
        self.$message.success(res.msg);
        self.data.confirm = false;
        self.getOfferInfo();
      } else {
        self.$message.warning(res.msg);
      }
    });
  }
  //打开报告
  openReport() {
    let self: any = this;
    let path: string = self.data.case_report_file;
    let path2: string = "";
    if (path.indexOf("http") == -1) {
      path2 = "https://file.debteehelper.com" + path;
    } else {
      path2 = path;
    }

    window.open(path2);
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/variables";
.offer {
  width: 100%;
  & > .noSelect {
    padding: 8px 16px;
    border: 1px solid #ccc;
    color: #909399;
    font-size: 14px;
    border-radius: 5px;
    display: inline-block;
  }
}
</style>
