<template>
  <div>
    <el-form
      label-position="left"
      label-width="130px"
      :model="collectList"
      :rules="addCollectionRuleForm"
      ref="addRuleRef"
    >
      <el-form-item label="收款通道名称" prop="collectionName">
        <el-input v-model="collectList.collectionName"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="username">
        <el-input v-model="collectList.username"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="collectList.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="collectList.email"></el-input>
      </el-form-item>
      <el-form-item label="账户名称">
        <el-input v-model="collectList.accountName"></el-input>
      </el-form-item>
      <el-form-item label="收款账号">
        <el-input v-model="collectList.collectionNum"></el-input>
      </el-form-item>
      <el-form-item label="收款银行">
        <el-input v-model="collectList.collectionBank"></el-input>
      </el-form-item>
      <el-form-item label="企业支付宝">
        <el-input v-model="collectList.alipay"></el-input>
      </el-form-item>
      <el-form-item label="付款备注">
        <el-input v-model="collectList.addps"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "shoukuanForm",
  data() {
    return {
      collectList: {},
      addcollid: "",
      addCollectionRuleForm: {
        collectionName: {
          min: 2,
          max: 10,
          message: "收款通道名称的长度在2~10个字符之间",
          trigger: "blur"
        },
        username: {
          min: 2,
          max: 10,
          message: "联系人的长度在2~10个字符之间",
          trigger: "blur"
        }
      }
    };
  },
  mounted() {
    //
  },
  methods: {
    //在父组件中触发该方法
    async logsss() {
      if (!this.collectList) return this.$message("已取消添加");
      const { data: res } = await this.$http.post(`MemberCollectMoney/Insert`, {
        payment_channel_name: this.collectList.collectionName,
        contacts_name: this.collectList.username,
        contacts_phone: this.collectList.phoneNumber,
        contacts_email: this.collectList.email,
        alipay_account: this.collectList.alipay,
        payee_name: this.collectList.accountName,
        bank_name: this.collectList.collectionBank,
        bank_account: this.collectList.collectionNum,
        pay_remarks: this.collectList.addps
      });
      this.addcollid = res.data;
      this.$emit("listenaddid", this.addcollid);
      // eslint-disable-next-line no-console
      console.log(res);
      // eslint-disable-next-line no-console
      console.log(this.collectList);
    }
  }
};
</script>

<style lang="less"></style>
