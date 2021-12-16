<template>
  <div class="smsPhone-wrap">
    <div class="smsPhone-box">
      <el-row>
        <el-col :span="4">发送状态</el-col>
        <el-col :span="20">{{ data.info.dic_content }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">发送号码</el-col>
        <el-col :span="20">{{ data.info.send_number }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">发送内容</el-col>
        <el-col
          v-if="data.name == '催收函邮件' || data.name == '催收律师函'"
          :span="20"
        >
          <el-link @click="chakan(data.info.pdf_url)" type="success"
            >点击查看</el-link
          >
        </el-col>
        <el-col v-else :span="20">{{ data.info.send_content }}</el-col>
      </el-row>
      <el-row v-show="data.info.dic_content == '执行完毕'">
        <el-col :span="4">发送时间</el-col>
        <el-col :span="20">{{ data.info.send_time }}</el-col>
      </el-row>
      <div v-if="data.Details.length != 0" class="bottom">
        <span>快递信息</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="4">收件人名称</el-col>
          <el-col :span="20">{{ data.logistics.receiving_name }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">收件人电话</el-col>
          <el-col :span="20">{{ data.logistics.receiving_phone }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">收件人地址</el-col>
          <el-col :span="20">{{ data.logistics.receiving_address }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">快递单号</el-col>
          <el-col :span="20">{{ data.logistics.courier_number }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">快递进度</el-col>
          <el-col :span="20">
            <p v-for="(item, index) in data.Details" :key="index">
              <span>{{ item.update_time }}</span
              ><span>{{ item.update_context }}</span>
            </p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { baseURL } from "../../../../utils/request";
@Component({})
export default class About extends Vue {
  // prop
  @Prop() info!: any;
  @Prop() name!: string;

  //Watch
  @Watch("info", { deep: true, immediate: true })
  tableDataChange(newVal: any, oldVal: any) {
    if (this.data.name != "催收律师函") {
      this.data.info = newVal;
    } else {
      this.data.info = newVal.data;
      this.data.Details = newVal.Details;
      this.data.logistics = newVal.logistics;
    }
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
  }
  chakan(val: string) {
    window.open(val);
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
}
</style>
