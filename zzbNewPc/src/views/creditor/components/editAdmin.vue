<template>
  <div class="addAdmin">
    <el-dialog
      @close="close"
      :before-close="close"
      :close-on-click-modal="false"
      title="编辑授权管理员"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="data.form">
        <div class="addFrom">
          <el-form-item label="登录名" :label-width="formLabelWidth">
            <el-input
              v-model="data.form.admin_account"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input
              v-model="data.form.admin_phone_number"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" :label-width="formLabelWidth">
            <el-input
              v-model="data.form.admin_email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button @click="AddCreditorAdmin" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import * as Api from "../../../api/creditor";
@Component({
  components: {}
})
export default class editAdmin extends Vue {
  @Prop({}) dialogFormVisible!: boolean;
  @Prop({}) edit!: any;

  @Watch("edit")
  editChange(newVal: any, oldVal: any) {
    if (JSON.stringify(newVal).length !== 2) {
      this.data.form.admin_id = newVal.admin_id;
      this.data.form.admin_phone_number = newVal.admin_phone_number;
      this.data.form.admin_email = newVal.admin_email;
      this.data.form.admin_account = newVal.admin_account;
    }
  }
  formLabelWidth: string = "120px";
  data: any = {
    form: {
      admin_id: 0,
      admin_phone_number: "",
      admin_email: "",
      admin_account: ""
    },
    active: "",
    tableData: []
  };
  created() {}
  //关闭
  close() {
    this.$emit("editAdminClose", false);
  }

  //编辑授权管理员
  AddCreditorAdmin() {
    const self: any = this;
    Api.UpdateAdmin(self.data.form).then((res: any) => {
      if (res.state) {
        self.$message({
          message: res.msg,
          type: "success"
        });
        self.$emit("editAdminClose", false);
      } else {
        self.$message({
          message: res.msg,
          type: "warning"
        });
      }
    });
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/variables.scss";
.addAdmin {
  & .el-dialog {
    width: 680px;
    border-radius: 10px;
    & .el-form-item {
      height: auto !important;
    }
    & .addFrom {
      & .el-input {
        width: 420px;
      }
    }
    & .dialog-footer {
      text-align: center;
    }
  }
}
</style>
