<template>
  <div class="smsPhone-wrap">
    <div class="smsPhone-box">
      <el-row
        v-show="
          data.name == '首次催收短信' ||
            data.name == '首次催收电话' ||
            data.name == '末次催收短信' ||
            data.name == '末次催收电话'
        "
      >
        <el-col :span="4">手机号码</el-col>
        <el-col :span="20">{{ data.info.phone_number || "未填写" }}</el-col>
      </el-row>
      <el-row
        v-show="data.name == '电子邮件催款函' || data.name == '电子邮件律师函'"
      >
        <el-col :span="4">电子邮箱</el-col>
        <el-col :span="20">{{ data.info.email || "未填写" }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">执行状态</el-col>
        <el-col :span="20">
          {{ data.info.execution_status }}
          <span style="display:block;" v-show="data.info.stop_reason"
            >({{ data.info.stop_reason }})</span
          ></el-col
        >
      </el-row>
      <el-row v-if="data.name == '首次催收电话' || data.name == '末次催收电话'">
        <el-col :span="4">拨打次数</el-col>
        <el-col :span="20">{{ data.info.call_send_count }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          {{
            auditStatus == "Audit_states_2" ? "执行时间" : "计划执行时间"
          }}</el-col
        >
        <el-col :span="20">{{
          data.info.call_send_time || data.info.execution_time
        }}</el-col>
      </el-row>
      <el-row v-if="data.info.execution_status == '执行失败'">
        <el-col :span="4">异常反馈</el-col>
        <el-col :span="20">{{ data.info.execution_err_msg }}</el-col>
      </el-row>

      <el-row>
        <el-col
          style="color:#909399;"
          v-show="data.name == '首次催收电话' || data.name == '末次催收电话'"
          :span="4"
          >拨打内容</el-col
        >
        <el-col
          style="color:#909399;"
          v-show="data.name != '首次催收电话' && data.name != '末次催收电话'"
          :span="4"
          >发送内容</el-col
        >
        <el-col v-if="data.name == '电子邮件催款函'" :span="20">
          <el-link
            @click="
              chakan(
                'https://api1.debteehelper.com/AILawyerLetter/CollectionLetter?debtor_number=' +
                  data.info.debtor_number
              )
            "
            type="success"
            >点击查看</el-link
          >
        </el-col>
        <el-col
          v-if="data.name == 'EMS律师函' || data.name == '电子邮件律师函'"
          :span="20"
        >
          <el-link
            @click="
              chakan2(
                'https://api1.debteehelper.com/AILawyerLetter/LawyerLetterV2?debtor_number=' +
                  data.info.debtor_number,
                data.name
              )
            "
            type="success"
            >点击查看</el-link
          >
        </el-col>
        <el-col v-else :span="20">{{ data.info.data }}</el-col>
      </el-row>

      <!-- <el-row v-show="data.info.execution_status == '执行完毕'">
        <el-col :span="4">发送时间</el-col>
        <el-col :span="20">{{ data.info.send_time }}</el-col>
      </el-row> -->
      <div
        v-if="data.name == 'EMS律师函' && data.info.logistics != null"
        class="bottom"
      >
        <span style="font-size:14px;color:#303133;">快递信息</span>
        <el-divider class="xiahuaxian"></el-divider>
        <div>
          <el-row>
            <el-col :span="4">收件人姓名</el-col>
            <el-col :span="20">{{ data.info.logistics.receiving_name }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">收件人电话</el-col>
            <el-col :span="20">{{
              data.info.logistics.receiving_phone
            }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">收件人地址</el-col>
            <el-col :span="20">{{
              data.info.logistics.receiving_address
            }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">快递公司</el-col>
            <el-col :span="20">{{
              data.info.logistics.courier_company || "待执行"
            }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">快递单号</el-col>
            <el-col :span="20">{{
              data.info.logistics.courier_number || "待执行"
            }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              快递进度
              <!-- <img
                class="tips"
                src="../../../../../assets/images/tips.svg"
                alt=""
              /> -->
            </el-col>
            <el-col v-if="data.info.logistics_details.length != 0" :span="20">
              <p
                v-for="(item, index) in data.info.logistics_details"
                :key="index"
              >
                <span>{{ item.update_time }}</span
                ><span>{{ item.update_context }}</span>
              </p>
            </el-col>
            <el-col v-else :span="20">
              待执行
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { baseURL } from "../../../../../utils/request";
@Component({})
export default class About extends Vue {
  // prop
  @Prop() info!: any;
  @Prop() name!: string;
  @Prop() auditStatus: any;
  @Prop() lawyer_file!: string;
  //Watch
  @Watch("info", { deep: true, immediate: true })
  tableDataChange(newVal: any, oldVal: any) {
    this.data.info = newVal;
  }
  @Watch("name", { deep: true, immediate: true })
  nameChange(newVal: any, oldVal: any) {
    this.data.name = newVal;
  }
  // data
  data: any = {
    info: {},
    name: "",
    baseURL: "",
    Details: [],
    logistics: {}
  };

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    this.data.baseURL = baseURL;
    // eslint-disable-next-line no-console
    console.log(this.auditStatus);
  }
  chakan(val: string) {
    window.open(val);
  }
  chakan2(url: string, name: string) {
    if (name == "EMS律师函") {
      if (this.lawyer_file) {
        window.open(this.lawyer_file);
      } else {
        window.open(url);
      }
    } else {
      window.open(url);
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";

.smsPhone-wrap {
  width: 100%;
  & > .smsPhone-box {
    & .el-row {
      margin-bottom: 20px;
      .el-col:nth-child(1) {
        color: $Secondary-text;
      }
    }
    & > .bottom {
      & > div {
        max-height: 300px;
        overflow-y: auto;
        & > span:first-child {
          font-size: 12px;
          color: #909399;
          margin-top: 10px;
          display: block;
        }
        & p {
          margin-top: 0;
          & span:first-child {
            margin-right: 20px;
          }
        }
      }
    }
    & .xiahuaxian {
      top: 0px !important;
    }
    & .tips {
      width: 15px;
      position: relative;
      top: 2px;
    }
  }
}
</style>
