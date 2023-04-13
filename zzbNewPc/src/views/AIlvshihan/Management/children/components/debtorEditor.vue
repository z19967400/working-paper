<template>
  <div class="obligorEdit-wrap">
    <div class="obligorEdit-box">
      <el-form
        ref="form"
        :inline="true"
        :model="data.info2"
        class="demo-form-inline"
        label-width="100px"
      >
        <div style="max-height:550px; overflow-y: auto;">
          <el-divider></el-divider>
          <el-row>
            <el-col
              v-for="(item, index) in data.info.list"
              :key="index"
              :span="12"
              v-show="
                item.label != '收件人姓名' &&
                  item.label != '收件人电话' &&
                  item.label != '收件人地址'
              "
            >
              <el-form-item :label="item.label">
                <el-col v-if="item.label == '欠费类型'" :span="22">
                  <el-select
                    size="small"
                    v-model="data.info2[item.prop]"
                    placeholder="请选择欠费类型"
                  >
                    <el-option
                      v-for="item2 in data.arrearsTypes"
                      :key="item2.dic_code"
                      :label="item2.dic_content"
                      :value="item2.dic_content"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col v-else-if="item.label == '结算日期'" :span="22">
                  <el-date-picker
                    size="small"
                    type="date"
                    placeholder="选择日期"
                    v-model="data.info2[item.prop]"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-col>
                <el-col v-else-if="item.label == '欠款币种'" :span="22">
                  <el-select
                    size="small"
                    v-model="data.info2['currency_id']"
                    placeholder="请选择币种"
                  >
                    <el-option
                      v-for="item2 in data.currencys"
                      :key="item2.id"
                      :label="item2.currency_name"
                      :value="item2.id"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col
                  style="position: relative;top:5px;"
                  v-else-if="item.label == '债务人地区'"
                  :span="22"
                >
                  <comAddress
                    @emitAddress="addressEdit"
                    :size="'small'"
                    :id="data.info2.debtor_number"
                    :address="data.info2.address_selected"
                  ></comAddress>
                </el-col>
                <el-col v-else :span="22">
                  <el-input
                    size="small"
                    v-model="data.info2[item.prop]"
                  ></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <span style="margin-top:0;">催款函</span>
            <el-divider></el-divider>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="data.info.Collection"
            ></el-input>
          </el-row>
          <el-row style="margin-bottom:20px;">
            <span style="margin-top:0;">律师函</span>
            <el-divider></el-divider>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="data.info.lawyerLetter"
            ></el-input>
          </el-row> -->
        </div>
        <el-row>
          <el-form-item class="from-footer">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import * as Api from "../../../../../api/AIlvshihan";
import { comAddress } from "../../../../../components/index";
@Component({
  components: {
    comAddress
  }
})
export default class debtorEditor extends Vue {
  // prop
  @Prop() info!: any;
  //Watch
  @Watch("info", { deep: true, immediate: true })
  tableDataChange(newVal: any, oldVal: any) {
    this.data.debtor_type_name = newVal["debtor_type_name"];
    // let code: string =
    //   newVal['debtor_type_name'] == 'Creditor_states_0'
    //     ? 'arrears_types'
    //     : 'arrears_types2'
    // this.getArrearsTypes(code)
    this.data.info = newVal;
    Object.keys(this.data.info2).forEach((key: string) => {
      if (newVal.data[key] != undefined) {
        this.data.info2[key] = newVal.data[key];
      }
      if (key === "address_Edit") {
        this.data.info2.address_Edit = {
          city: newVal.data.city,
          country: newVal.data.country,
          county: newVal.data.county,
          debtor_number: newVal.data.debtor_number,
          province: newVal.data.province
        };
      }
      if (key === "address_selected") {
        this.data.info2.address_selected = [
          newVal.data.country,
          newVal.data.province,
          newVal.data.city,
          newVal.data.county
        ];
      }
    });
  }
  // data
  data: any = {
    info: {},
    info2: {
      id: 0,
      debtor_name: "",
      contact_person: "",
      phone_number: "",
      email: "",
      address_txt: "",
      country: "",
      detailed_address: "",
      arrearage_type: "",
      settlement_date: "",
      currency_id: "",
      arrears_principal: "",
      arrears_interest: "",
      insurer_name: "",
      creditor_name: "",
      creditor_email: "",
      repayment_amount: "",
      is_dishonesty: "",
      f_remarks: "",
      creditor_telphone: ""
    },
    currencys: [],
    arrearsTypes: [],
    debtor_type_name: ""
  };

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    this.getCurrencys();
  }
  //地址修改
  addressEdit(data: any) {
    this.data.info2.address_Edit = data;
  }
  //获取币种字典
  getCurrencys() {
    // let parmas: any = {
    //   page: 1,
    //   limit: 50,
    //   currency_name: '',
    //   currency_unit: ''
    // }
    Api.getCurrency().then((res: any) => {
      this.data.currencys = res.data;
    });
  }
  //获取欠费类型字典
  // getArrearsTypes(code: string) {
  //   Api.GetType(code).then((res: any) => {
  //     this.data.arrearsTypes = res.data
  //   })
  // }
  //提交修改
  onSubmit() {
    let parmas: any = {
      data: this.data.info2
      // Collection: this.data.info.Collection,
      // lawyerLetter: this.data.info.lawyerLetter
    };
    this.$emit("edit", parmas);
  }
  //取消关闭
  close() {
    this.$emit("close");
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";

.obligorEdit-wrap {
  width: 100%;
  & > .obligorEdit-box {
    & > form {
      width: 100% !important;
      & .el-row {
        margin-bottom: 20px;
      }
      & .el-row:last-child {
        margin-bottom: 0;
      }
      & .el-form-item {
        display: flex;
      }
      & .from-footer {
        & > .el-form-item__content {
          margin: 0 auto;
          position: relative;
          top: 20px;
        }
      }
      & .el-form-item__label {
        width: 150px !important;
      }
      & input {
        width: 170px;
      }
    }
  }
}
</style>
