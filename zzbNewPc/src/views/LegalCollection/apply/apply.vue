<template>
  <div class="apply-wrap">
    <div class="box">
      <el-form
        v-loading="loading"
        :model="data"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
      >
        <el-form-item
          v-show="type == '逾期贷款'"
          label="贷款利率"
          prop="lending_rate"
        >
          <el-input
            size="small"
            style="width:280px;"
            placeholder="(年息%)"
            v-model="data.lending_rate"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="约定还款日期" prop="agreed_payment_date">
          <el-date-picker
            style="width:280px;"
            size="small"
            v-model="data.agreed_payment_date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="guarantee_type">
          <span slot="label"
            >担保类型
            <img
              style="width:18px;cursor: pointer;position:relative ;top:3px;left:3px;"
              src="../../../assets/images/tips.svg"
              alt=""
              @click="dialogVisible = true"
          /></span>

          <el-select
            style="width:280px;"
            size="small"
            v-model="data.guarantee_type"
          >
            <el-option label="保证" value="保证"></el-option>
            <el-option label="银行履约保函" value="银行履约保函"></el-option>
            <el-option label="抵押" value="抵押"></el-option>
            <el-option label="质押" value="质押"></el-option>
            <el-option label="留置" value="留置"></el-option>
            <el-option label="无" value="无"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="obligorType == 'Creditor_states_0'"
          label="债务人状态"
          prop="debtor_status"
        >
          <el-select
            style="width:280px;"
            size="small"
            v-model="data.debtor_status"
          >
            <el-option
              label="存续（在营、开业、在册）"
              value="存续（在营、开业、在册）"
            ></el-option>
            <el-option label="注销" value="注销"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="债务人状态" prop="debtor_status">
          <el-select
            style="width:280px;"
            size="small"
            v-model="data.debtor_status"
          >
            <el-option label="正常" value="正常"></el-option>
            <el-option label="失联" value="失联"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="height:auto;max-heigt:80px;min-height:40px;"
          label="债务人财产线索"
          prop="property_clues"
        >
          <el-checkbox-group v-model="data.property_clues">
            <el-checkbox label="房产" name="房产"></el-checkbox>
            <el-checkbox label="车辆" name="车辆"></el-checkbox>
            <el-checkbox label="设备" name="设备"></el-checkbox>
            <el-checkbox label="货物" name="货物"></el-checkbox>
            <el-checkbox
              label="债务人的应收账款"
              name="债务人的应收账款"
            ></el-checkbox>
            <el-checkbox label="其他资产" name="其他资产"></el-checkbox>
            <el-checkbox label="不详" name="不详"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="债务人财产线索补充">
          <el-input
            size="small"
            style="width:280px;"
            v-model="data.property_clues_bc"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="height:auto;max-heigt:80px;min-height:40px;"
          label="最后一次催款日期(有证据证明)"
        >
          <el-date-picker
            style="width:280px;"
            size="small"
            v-model="data.confirmation_date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          v-if="type == '企业应收账款'"
          style="height:auto;max-heigt:80px;min-height:40px;"
          label="现有证据"
          prop="available_evidence"
        >
          <el-checkbox-group v-model="data.available_evidence">
            <el-checkbox
              label="合同/协议/订单"
              name="合同/协议/订单"
            ></el-checkbox>
            <el-checkbox label="发票" name="发票"></el-checkbox>
            <el-checkbox
              label="发货及物流凭证（运单等）、收货凭证"
              name="发货及物流凭证（运单等）、收货凭证"
            ></el-checkbox>
            <el-checkbox
              label="对账凭证、付款计划书、付款承诺书"
              name="对账凭证、付款计划书、付款承诺书"
            ></el-checkbox>
            <el-checkbox
              label="付款记录、催款通知记录"
              name="付款记录、催款通知记录"
            ></el-checkbox>
            <el-checkbox
              label="电子证据（邮件、微信、录音录像等）"
              name="电子证据（邮件、微信、录音录像等）"
            ></el-checkbox>
            <el-checkbox
              label="判决、仲裁、公证等司法文书"
              name="判决、仲裁、公证等司法文书"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          v-else
          style="height:auto;max-heigt:80px;min-height:40px;"
          label="现有证据"
          prop="available_evidence"
        >
          <el-checkbox-group v-model="data.available_evidence">
            <el-checkbox
              label="合同/贷款凭证/协议书/基于借贷关系产生的申请书"
              name="合同/贷款凭证/协议书/基于借贷关系产生的申请书"
            ></el-checkbox>
            <el-checkbox label="担保手续" name="担保手续"></el-checkbox>
            <el-checkbox
              label="贷款保证的物资和财产的凭证"
              name="贷款保证的物资和财产的凭证"
            ></el-checkbox>
            <el-checkbox
              label="还款付息凭证、还款承诺书或计划书"
              name="还款付息凭证、还款承诺书或计划书"
            ></el-checkbox>
            <el-checkbox
              label="电子证据（邮件、微信、录音录像等）"
              name="电子证据（邮件、微信、录音录像等）"
            ></el-checkbox>
            <el-checkbox
              label="判决、冲裁、公证等司法文书"
              name="判决、冲裁、公证等司法文书"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="其他证据">
          <el-input
            size="small"
            style="width:280px;"
            v-model="data.other_evidence"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="欠款是否存在争议" prop="is_dispute">
          <el-radio-group v-model="data.is_dispute">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="案件管辖地区一">
          <el-input
            size="small"
            style="width:280px;"
            v-model="data.jurisdiction_01_txt"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="案件管辖地区二">
          <el-input
            size="small"
            style="width:280px;"
            v-model="data.jurisdiction_02_txt"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="其他管辖地区">
          <el-input
            size="small"
            style="width:280px;"
            v-model="data.jurisdiction_03_txt"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          style="height:auto;max-heigt:80px;min-height:40px;"
          label="委托事项"
          prop="entrusted_matters"
        >
          <el-checkbox-group v-model="data.entrusted_matters">
            <el-checkbox label="全案委托" name="全案委托"></el-checkbox>
            <el-checkbox label="非诉催收" name="非诉催收"></el-checkbox>
            <el-checkbox label="财产保全" name="财产保全"></el-checkbox>
            <el-checkbox
              label="诉讼一审/仲裁"
              name="诉讼一审/仲裁"
            ></el-checkbox>
            <el-checkbox label="诉讼二审" name="诉讼二审"></el-checkbox>
            <el-checkbox label="强制执行" name="强制执行"></el-checkbox>
            <el-checkbox label="破产程序" name="破产程序"></el-checkbox>
            <el-checkbox label="再审" name="再审"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="其他委托">
          <el-input
            size="small"
            style="width:280px;"
            v-model="data.other_entrustment"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交委托</el-button
          >
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="释义"
      custom-class="tipsBox"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-divider></el-divider>
      <!-- <p>请您知晓</p> -->
      <p><b>保证-</b>保证人与债权人约定,债务人不付款时,保证人代为偿还债务</p>
      <p>
        <b>银行履约保函-</b
        >债务人通过银行向债权人提供的保证认真履行合同的一种经济担保
      </p>
      <p><b>抵押-</b>指用房屋、车辆等财产提供担保,但财产不交付给债权人</p>
      <p>
        <b>质押-</b
        >指用车辆、股权等财产提供担保且财产交付给债权人或对财产权利进行出质登记
      </p>
      <p><b>留置-</b>债权人因合同关系占有债务人的财物</p>
      <p><b>无-</b>相当于应收账款没有担保</p>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="width:100px;"
          type="primary"
          @click="dialogVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import * as Api from "../../../api/AIlvshihan";
@Component({})
export default class apply extends Vue {
  data: any = {
    collection_scene: "",
    creditor_id: "",
    debtor_number: "",
    lending_rate: "",
    agreed_payment_date: "",
    guarantee_type: "",
    property_clues: [],
    property_clues_bc: "",
    confirmation_date: "",
    available_evidence: [],
    other_evidence: "",
    is_dispute: "是",
    jurisdiction_01_txt: "",
    jurisdiction_02_txt: "",
    jurisdiction_03_txt: "",
    entrusted_matters: [],
    other_entrustment: ""
  };
  dialogVisible: boolean = false;
  type: string = "";
  obligorType: string = ""; //Creditor_states_0:企业 Creditor_states_1：个人
  loading: boolean = false;
  rules: any = {
    guarantee_type: [
      { required: true, message: "请选择担保类型", trigger: "change" }
    ],
    debtor_status: [
      { required: true, message: "请选择债务人状态", trigger: "change" }
    ],
    agreed_payment_date: [
      { required: true, message: "请选择约定还款日期", trigger: "change" }
    ],
    property_clues: [
      {
        type: "array",
        required: true,
        message: "请至少选择一个财产线索",
        trigger: "change"
      }
    ],
    available_evidence: [
      {
        type: "array",
        required: true,
        message: "请至少选择一个现有证据",
        trigger: "change"
      }
    ],
    entrusted_matters: [
      {
        type: "array",
        required: true,
        message: "请至少选择一个委托事项",
        trigger: "change"
      }
    ],
    is_dispute: [
      { required: true, message: "请选择是否存在争议", trigger: "blur" }
    ]
  };
  created() {
    const self: any = this;
    self.type = self.$route.query.type;
    self.obligorType = self.$route.query.obligorType;
    self.data.creditor_id = Number(self.$route.query.creditor_id);
    self.data.debtor_number = self.$route.query.debtor_number;
    if (self.type == "逾期贷款") {
      self.rules["lending_rate"] = [
        { required: true, message: "请输入贷款利率", trigger: "blur" }
      ];
      // eslint-disable-next-line no-console
      console.log(self.rules);
    }
  }
  submitForm(formName: string) {
    const self: any = this;
    self.$refs[formName].validate((valid: boolean) => {
      if (valid) {
        self.loading = true;
        self.data.collection_scene =
          self.type == "企业应收账款" ? "Debt_type_4" : "Debt_type_5";
        self.data.property_clues = self.data.property_clues.toString();
        self.data.available_evidence = self.data.available_evidence.toString();
        self.data.entrusted_matters = self.data.entrusted_matters.toString();
        Api.CreateCasesByAI(self.data).then((res: any) => {
          self.loading = false;
          if (res.state) {
            self.$message.success(res.msg);
            self.resetForm("ruleForm");
            setTimeout(() => {
              self.$router.push(`/LawyerLawUrging/caseInfo/${res.data}`);
            }, 2000);
          } else {
            self.$message.warning(res.msg);
          }
        });
      } else {
        // eslint-disable-next-line no-console
        console.log("error submit!!");
        return false;
      }
    });
  }
  resetForm(formName: string) {
    const self: any = this;
    self.$refs[formName].resetFields();
  }
}
</script>
<style lang="scss">
.apply-wrap {
  height: 100%;
  width: 100%;
  & .box {
    overflow-y: auto;
    height: 100%;
  }
  & .el-form-item {
    height: 40px;
  }
  & .tipsBox {
    border-radius: 10px;
    padding: 10px;
    & .el-dialog__body {
      padding-top: 0;
    }
    & .el-divider {
      margin: 5px 0 15px 0;
    }
    & .el-dialog__footer {
      text-align: center;
    }
  }
}
</style>
