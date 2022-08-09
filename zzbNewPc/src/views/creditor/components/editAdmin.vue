<template>
  <div class="addAdmin">
    <el-dialog
      @close="close"
      :before-close="close"
      :close-on-click-modal="false"
      title="编辑授权管理员"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="data.form" :rules="data.rule" ref="addAdmin">
        <div class="addFrom">
          <el-form-item
            v-show="data.form.type == 0"
            label="债权人名称"
            :label-width="formLabelWidth"
          >
            <span>{{ data.form.creditor_name }}</span>
          </el-form-item>
          <el-form-item
            v-show="data.form.type == 0"
            label="登录名"
            :label-width="formLabelWidth"
            prop="admin_account"
          >
            <el-input
              v-model="data.form.admin_account"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-show="data.form.type == 0"
            label="真实姓名"
            :label-width="formLabelWidth"
            prop="admin_name"
          >
            <el-input
              v-model="data.form.admin_name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-show="data.form.type == 0"
            label="身份证号"
            :label-width="formLabelWidth"
            prop="id_number"
          >
            <el-input
              v-model="data.form.id_number"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-show="data.form.type == 0"
            label="手机号码"
            :label-width="formLabelWidth"
            prop="admin_phone_number"
          >
            <el-input
              v-model="data.form.admin_phone_number"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-show="data.form.type == 0"
            label="电子邮箱"
            :label-width="formLabelWidth"
            prop="admin_email"
          >
            <el-input
              v-model="data.form.admin_email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            style="margin-bottom:0px;"
            label="管理员授权书"
            :label-width="formLabelWidth"
            prop="authorization_file"
          >
            <el-link
              style="font-size:14px;letter-spacing: 2px;position: relative;top:-1px;"
              @click="upSq"
              type="success"
              >下载授权书模板</el-link
            >
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" prop="authorization_file">
            <el-col :span="10">
              <el-upload
                :on-preview="preview"
                :on-exceed="exceed"
                :limit="1"
                :action="burl + '/Upload/UploadImage?type=7'"
                :on-change="handleChange"
                :on-success="
                  (res, file) => {
                    handleAvatarSuccess('authorization_file', res, file);
                  }
                "
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
              >
                <el-button size="small" type="primary"
                  >重新上传授权书</el-button
                >
              </el-upload>
            </el-col>
            <el-col :span="12">
              <div style="line-height: 1.5;">
                <span
                  style="font-size:12px;color:#606366;display:block;position: relative;top:-27px;"
                  >请完成所有内容的填写并加盖公章后上传,文件大小不超过50M,仅支持上传jpg/jpeg/png/pdf格式</span
                >
                <!-- <el-link style="font-size:12px;" @click="upSq" type="success"
                  >下载授权委托书模板</el-link
                > -->
              </div>
            </el-col>
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
import { baseURL, pp } from "../../../utils/request";
@Component({
  components: {}
})
export default class editAdmin extends Vue {
  @Prop({}) dialogFormVisible!: boolean;
  @Prop({}) edit!: any;

  @Watch("edit")
  editChange(newVal: any, oldVal: any) {
    // eslint-disable-next-line no-console
    console.log(newVal);
    if (newVal) {
      this.data.form = newVal;
    }
  }
  formLabelWidth: string = "120px";
  data: any = {
    form: {},
    active: "",
    tableData: [],
    rule: {
      admin_name: [
        { required: true, message: "请输入管理员名称", trigger: "blur" }
      ],
      id_number: [
        { required: true, message: "请输入身份证号", trigger: "blur" },
        {
          validator: (rule: any, value: string, callback: any) => {
            this.VerifyAdminInfo(rule, value, callback, 3);
          }
        }
      ],
      admin_phone_number: [
        { required: true, message: "请输入管理员手机号码", trigger: "blur" },
        {
          validator: (rule: any, value: string, callback: any) => {
            this.VerifyAdminInfo(rule, value, callback, 2);
          }
        }
      ],
      admin_email: [
        { required: true, message: "请输入管理员邮箱", trigger: "blur" }
      ],
      admin_account: [
        { required: true, message: "请输入管理员登录名", trigger: "blur" },
        {
          validator: (rule: any, value: string, callback: any) => {
            this.VerifyAdminInfo(rule, value, callback, 1);
          }
        }
      ],
      authorization_file: [
        { required: true, message: "请上传管理员授权书", trigger: "blur" }
      ]
    }
  };
  burl: string = "";
  fileList: any = [];
  loading: boolean = false;
  created() {
    let qz: string = pp === "production" ? "/api/" : "/api/pt";
    this.burl = baseURL + qz;
  }
  //关闭
  close() {
    this.$emit("editAdminClose", false);
  }
  //验证管理员信息是否重复
  VerifyAdminInfo(rule: any, value: string, callback: any, type: number) {
    Api.VerifyAdminInfoForUpdate({
      type,
      value,
      admin_id: this.data.form.admin_id
    }).then((res: any) => {
      if (res.state) {
        callback();
      } else {
        callback(new Error(res.msg));
      }
    });
  }
  //编辑授权管理员
  AddCreditorAdmin() {
    const self: any = this;
    let from: any = self.$refs["addAdmin"];
    from.validate((valid: Boolean) => {
      if (valid) {
        Api.UpdateCreditorAdmin(self.data.form).then((res: any) => {
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
      } else {
        return false;
      }
    });
  }
  //图片预览
  preview(file: any) {
    if (file.url == undefined) {
      let url: string =
        "https://file.debteehelper.com" +
        file.response.data.FileUrl +
        file.response.data.FileExtension;
      window.open(url);
    } else {
      window.open(file.url);
    }
  }

  handleChange(file: any, fileList: any) {
    this.fileList = fileList.slice(-3);
  }
  //图片上传成功
  handleAvatarSuccess(prop: string, res: any, file: any) {
    let self: any = this;
    if (res.data.State == true) {
      self.$message.success(res.data.Msg);
      self.data.form[prop] =
        "https://file.debteehelper.com" +
        res.data.FileUrl +
        res.data.FileExtension;
      let item: any = [
        {
          name: file.name,
          url:
            "https://file.debteehelper.com" +
            res.data.FileUrl +
            res.data.FileExtension
        }
      ];
      self.fileList = item;
      // eslint-disable-next-line no-console
      console.log(self.fileList);
    } else {
      self.$message.warning(res.data.Msg);
    }
    this.loading = false;
  }
  //上传之前
  beforeAvatarUpload(file: any) {
    let self: any = this;
    self.loading = true;
    const isLt2M = file.size / 1024 / 1024 <= 50;

    if (!isLt2M) {
      self.loading = false;
      self.$message.error("上传图片大小不能超过 50MB!");
    }
    return isLt2M;
  }
  exceed(files: any, fileList: any) {
    let self: any = this;
    self.$message.warning("请先删除已上传文件");
  }
  //下载授权书
  upSq() {
    window.open(
      "https://file.debteehelper.com/template/授权委托书模板-新增管理员-V6.docx"
    );
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
    & .el-icon-close-tip {
      display: none !important;
    }
  }
}
</style>
