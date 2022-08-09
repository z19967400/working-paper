<template>
  <div
    class="addAdmin"
    :class="data.type === '新增管理员' ? 'dialog-small' : 'dialog-big'"
  >
    <el-dialog
      @close="close"
      :before-close="close"
      :close-on-click-modal="false"
      title="新增授权管理员"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        v-loading="loading"
        :model="data.form"
        :rules="data.rules"
        ref="addAdmin"
      >
        <el-form-item label="债权人名称" :label-width="formLabelWidth">
          <span>{{ creditor_name }}</span>
        </el-form-item>
        <el-form-item label="管理员设置" :label-width="formLabelWidth">
          <el-radio-group @change="typeChange" v-model="data.type">
            <el-radio label="新增管理员"></el-radio>
            <el-radio label="选择已有管理员"></el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="addFrom" v-if="data.type === '新增管理员'">
          <el-form-item
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
            class="is-required"
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
                <el-button size="small" type="primary">上传授权书</el-button>
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
        <div v-else>
          <!-- <el-form-item label="选择管理员" :label-width="formLabelWidth"> -->
          <el-table
            border
            :data="data.tableData"
            height="250"
            style="width: 93%;margin-left:35px;"
          >
            <el-table-column prop="index" label="序号" width="60px">
            </el-table-column>
            <el-table-column prop="admin_name" label="真实姓名" width="120px">
            </el-table-column>
            <el-table-column prop="id_number" label="身份证号" width="180px">
            </el-table-column>
            <el-table-column
              prop="admin_phone_number"
              label="手机号码"
              width="180px"
            >
            </el-table-column>
            <el-table-column prop="admin_email" label="电子邮箱" width="380px">
            </el-table-column>
            <el-table-column fixed="right" label="选择">
              <template slot-scope="scope">
                <el-radio
                  v-model="data.active"
                  @change="choice"
                  :label="scope.row.id"
                  >选中</el-radio
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- </el-form-item> -->
          <el-form-item
            style="margin-bottom:0px;"
            :label-width="formLabelWidth"
          >
            <template slot="label">
              <span class="xinghao">管理员授权书</span>
            </template>
            <el-link
              style="font-size:14px;letter-spacing: 2px;position: relative;top:-1px;"
              @click="upSq"
              type="success"
              >下载授权书模板</el-link
            >
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
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
                <el-button size="small" type="primary">上传授权书</el-button>
              </el-upload>
            </el-col>
            <el-col :span="13">
              <div style="line-height: 1.5;">
                <span
                  style="font-size:12px;color:#606366;display:block;;position: relative;top:-27px;"
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
export default class addAdmin extends Vue {
  @Prop({}) dialogFormVisible!: boolean;
  @Prop({}) adminIds!: any;
  @Prop({}) creditor_name!: string;

  @Watch("adminIds", { deep: true, immediate: true })
  adminIdsChange(newVal: any, oldVal: any) {
    if (newVal.length != 0) {
      this.data.adminIds = [...newVal];
    } else {
      this.data.adminIds = [];
    }
    this.fileList = [];
    this.data.form = {
      admin_id: 0,
      creditor_id: 0,
      admin_name: "",
      id_number: "",
      admin_phone_number: "",
      admin_email: "",
      admin_account: "",
      authorization_file: ""
    };
    this.data.active = "";
    this.getAllAdmin();
  }
  formLabelWidth: string = "120px";
  loading: boolean = false;
  burl: string = "";
  fileList: any = [];
  data: any = {
    type: "新增管理员",
    form: {
      admin_id: 0,
      creditor_id: 0,
      admin_name: "",
      id_number: "",
      admin_phone_number: "",
      admin_email: "",
      admin_account: "",
      authorization_file: ""
    },
    active: "",
    tableData: [],
    adminIds: [],
    rules: {
      admin_name: [
        { required: true, message: "请输入管理员名称", trigger: "blur" }
      ],
      id_number: [
        { required: true, message: "请输入身份证号", trigger: "blur" },
        {
          validator: (rule: any, value: string, callback: any) => {
            this.VerifyAdminInfo(rule, value, callback, 1);
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
            this.VerifyAdminInfo(rule, value, callback, 0);
          }
        }
      ],
      authorization_file: [
        { required: true, message: "请上传管理员授权书", trigger: "blur" }
      ]
    }
  };
  created() {
    let qz: string = pp === "production" ? "/api/" : "/api/pt";
    this.burl = baseURL + qz;
  }
  //关闭
  close() {
    let slef: any = this;
    slef.$refs["addAdmin"].resetFields();
    slef.$emit("addAdminClose", false);
  }
  //选中管理员
  choice(id: number) {
    let row: any = this.data.tableData.filter((item: any) => {
      return item.id === id;
    });
    this.data.form.admin_id = row[0].id;
    this.data.form.admin_name = row[0].admin_name;
    this.data.form.id_number = row[0].id_number;
    this.data.form.admin_phone_number = row[0].admin_phone_number;
    this.data.form.admin_email = row[0].admin_email;
    this.data.form.admin_account = row[0].admin_account;
  }
  //获取所有管理员
  getAllAdmin() {
    Api.GetAllAdmin().then((res: any) => {
      if (this.data.adminIds.length == 0) {
        this.data.tableData = res.data;
      } else {
        let arr3: any = res.data.filter(
          (obj: any) => !this.data.adminIds.some((obj1: any) => obj1 == obj.id)
        );
        arr3.forEach((item: any, index: number) => {
          item["index"] = index + 1;
        });
        this.data.tableData = arr3;
      }
    });
  }
  //验证管理员信息是否重复
  VerifyAdminInfo(rule: any, value: string, callback: any, type: number) {
    Api.VerifyAdminInfo({ type, content: value }).then((res: any) => {
      if (res.state) {
        callback();
      } else {
        callback(new Error(res.msg));
      }
    });
  }
  //新增授权管理员
  AddCreditorAdmin() {
    let self: any = this;
    if (self.data.type === "新增管理员") {
      let from: any = self.$refs["addAdmin"];
      from.validate((valid: Boolean) => {
        if (valid) {
          self.$emit("hanlAddAdmin", this.data.form);
        } else {
          return false;
        }
      });
    } else {
      if (self.data.form.admin_id === 0) {
        self.$message.warning("请选择已有管理员");
        return false;
      }
      if (self.data.form.authorization_file === "") {
        self.$message.warning("请上传授权委托书");
        return false;
      }
      self.$emit("hanlAddAdmin", this.data.form);
    }
  }
  exceed(files: any, fileList: any) {
    let self: any = this;
    self.$message.warning("请先删除已上传文件");
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
            file.response.data.FileUrl +
            file.response.data.FileExtension
        }
      ];
      self.fileList = item;
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
  //下载授权书
  upSq() {
    window.open(
      "https://file.debteehelper.com/template/授权委托书模板-新增管理员-V6.docx"
    );
  }
  //切换类别
  typeChange() {
    this.data.form = {
      admin_id: 0,
      creditor_id: 0,
      admin_name: "",
      id_number: "",
      admin_phone_number: "",
      admin_email: "",
      admin_account: "",
      authorization_file: ""
    };
    this.data.active = "";
    this.fileList = [];
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/variables.scss";
.addAdmin {
  & .el-dialog {
    border-radius: 10px;
    & .el-form-item {
      height: auto !important;
    }
    & .addFrom {
      & .el-input {
        width: 460px !important;
      }
    }
    & .dialog-footer {
      text-align: center;
    }
  }
  & .el-form {
    & .el-form-item__label {
      position: relative;
      // margin-right: 10px;
      padding-right: 12px !important;
    }
    & .el-form-item__label::before {
      position: absolute;
      right: 0px;
    }
  }
  & .xinghao {
    position: relative;
  }
  & .xinghao:after {
    content: "*";
    color: #f56c6c;
    // margin-right: 4px;
    position: absolute;
    right: -8px;
  }
}
.dialog-big {
  & .el-dialog {
    width: 880px !important;
  }
}
.dialog-small {
  & .el-dialog {
    width: 680px !important;
  }
}
</style>
