<template>
  <div :style="{ height: data.height + 'px' }" class="contract-wrap">
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">合同模板</span>
      </span>
      <el-divider></el-divider>
      <div class="box">
        <el-row v-show="name === '用户签约'">
          <span>法律服务合同模板</span>
          <a
            href="http://file.debteehelper.com/contract/tp/法律服务合同模板-用户端.docx"
            target="_blank"
            class="download"
            >点击下载法律服务合同模板</a
          >
        </el-row>
        <el-row v-show="name === '律师签约'">
          <span>委托律师代理合同模板</span>
          <a
            href="http://file.debteehelper.com/contract/tp/委托律师代理合同模板-律师端.doc"
            target="_blank"
            class="download"
            >点击下载委托律师代理合同模板</a
          >
        </el-row>
        <!-- <el-row>
          <el-col :span="4">
            <span>解除诉讼委托律师代理合同</span>
          </el-col>
          <el-col :span="12">
            <a href="http://file.debteehelper.com/contract/tp/解除诉讼委托律师代理合同.doc" target="_blank" class="download">点击下载解除诉讼委托律师代理合同模板</a>
          </el-col>
        </el-row> -->
      </div>
    </div>
    <div class="section">
      <!-- <span class="generate">生成三方协议合同</span> -->
      <span style="margin-top:0;">
        <span class="title">合同列表</span>
        <!-- <span class="generate" @click="generate(2)"> 生成律师解约合同</span> -->
        <span
          v-show="name === '律师签约'"
          class="generate"
          @click="generate(1)"
        >
          生成委托律师代理合同</span
        ><span
          v-show="name === '用户签约'"
          class="generate"
          @click="generate(0)"
          >生成/上传法律服务合同</span
        ></span
      >
      <el-divider></el-divider>
      <comTab1
        :tableData="data.contract"
        :tableType="data.contracType"
        @info="collectionInfo"
      ></comTab1>
    </div>
    <el-dialog title="生成/上传法律服务合同" :visible.sync="dialogFormVisible1">
      <el-form :model="form1">
        <el-form-item label="经办人" :label-width="formLabelWidth">
          <el-input
            style="width:50%;"
            v-model="form1.signer_name"
            autocomplete="off"
          ></el-input>
          <p style="margin:0;font-size:12px;color:#909399;">
            请填写合同签署者的真实姓名
          </p>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input
            style="width:50%;"
            v-model="form1.signer_phone_bumber"
            autocomplete="off"
          ></el-input>
          <p style="margin:0;font-size:12px;color:#909399;">
            请填写合同签署者的有效手机号码
          </p>
        </el-form-item>
        <el-form-item label="签署方式" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="10">
              <el-radio-group v-model="form1.contract_sign_method">
                <el-radio :label="0">线上签署</el-radio>
                <el-radio :label="1">线下签署</el-radio>
              </el-radio-group>
            </el-col>
            <el-col v-show="form1.contract_sign_method == '1'" :span="14">
              <el-upload
                class="upload-demo upload-demo2"
                :action="
                  'http://api1.debteehelper.com/api/Upload/UploadImage?type=5&original_name=true'
                "
                :on-preview="handlePreview1"
                :on-success="handleSuccess1"
                :on-remove="handleRemove1"
                :before-remove="beforeRemove"
                multiple
                :limit="5"
                :on-exceed="handleExceed1"
                :file-list="upFileData.fileList1"
              >
                <el-button size="mini" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          v-show="form1.contract_sign_method == '1'"
          label="合同编号"
          :label-width="formLabelWidth"
        >
          <el-input
            style="width:50%;"
            v-model="form1.contract_number"
            placeholder="可自定义合同的编号"
            autocomplete="off"
          ></el-input>
          <!-- <p style="margin:0;font-size:12px;color:#909399;">
            可自定义合同的编号
          </p> -->
        </el-form-item>
        <!-- <el-form-item label="签署状态" :label-width="formLabelWidth">
          <el-radio-group v-model="form1.sign_status">
            <el-radio :label="0">待签署</el-radio>
            <el-radio :label="1">已签署</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item :label-width="formLabelWidth">
          <div slot="label">
            <p style="margin:0;padding:0;">补充条款</p>
            <span style="font-size:12px;color:#909399;">(将显示在合同内)</span>
          </div>
          <el-input
            type="textarea"
            v-model="form1.supplementary_provisions"
          ></el-input>
        </el-form-item>
        <el-form-item label="后台备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form1.admin_notes"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="createContract1">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="生成/上传委托律师代理合同"
      :visible.sync="dialogFormVisible2"
    >
      <el-form :model="form2">
        <el-form-item label="经办人" :label-width="formLabelWidth">
          <el-input
            style="width:50%;"
            v-model="form2.signer_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input
            style="width:50%;"
            v-model="form2.signer_phone_bumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="签署方式" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="10">
              <el-radio-group v-model="form2.contract_sign_method">
                <el-radio :label="0">线上签署</el-radio>
                <el-radio :label="1">线下签署</el-radio>
              </el-radio-group>
            </el-col>
            <el-col v-show="form2.contract_sign_method == '1'" :span="14">
              <el-upload
                class="upload-demo "
                :action="
                  'http://api1.debteehelper.com/api/Upload/UploadImage?type=5&original_name=true'
                "
                :on-preview="handlePreview2"
                :on-success="handleSuccess2"
                :on-remove="handleRemove2"
                :before-remove="beforeRemove"
                multiple
                :limit="5"
                :on-exceed="handleExceed2"
                :file-list="upFileData.fileList2"
              >
                <el-button size="mini" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- <el-form-item label="签署状态" :label-width="formLabelWidth">
          <el-radio-group v-model="form2.sign_status">
            <el-radio :label="0">待签署</el-radio>
            <el-radio :label="1">已签署</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item
          v-show="form2.contract_sign_method == '1'"
          label="合同编号"
          :label-width="formLabelWidth"
        >
          <el-input
            style="width:50%;"
            v-model="form2.contract_number"
            placeholder="可自定义合同的编号"
            autocomplete="off"
          ></el-input>
          <!-- <p style="margin:0;font-size:12px;color:#909399;">
            可自定义合同的编号
          </p> -->
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <div slot="label">
            <p style="margin:0;padding:0;">补充条款</p>
            <span style="font-size:12px;color:#909399;">(将显示在合同内)</span>
          </div>
          <el-input
            type="textarea"
            v-model="form2.supplementary_provisions"
          ></el-input>
        </el-form-item>
        <el-form-item label="后台备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form2.admin_notes"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="createContract2">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="生成/上传解除委托律师代理合同"
      :visible.sync="dialogFormVisible3"
    >
      <el-form :model="form3" class="from3">
        <el-form-item label="经办人" :label-width="formLabelWidth">
          <el-input
            style="width:50%;"
            v-model="form3.signer_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input
            style="width:50%;"
            v-model="form3.signer_phone_bumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="签署方式" :label-width="formLabelWidth">
          <el-radio-group
            v-model="form3.settlement_scheme"
            @change="form3change"
          >
            <el-radio :label="1">
              甲方须向乙方支付
              <el-input
                v-if="form3.settlement_scheme == 1"
                v-model="form3.settlement_amount"
                size="mini"
                style="width:100px;"
              ></el-input>
              <span v-else>费用,</span>
              甲方于本协议生效后5个工作日内全额付清。
            </el-radio>
            <el-radio :label="2">
              乙方须向甲方退还
              <el-input
                v-if="form3.settlement_scheme == 2"
                v-model="form3.settlement_amount"
                size="mini"
                style="width:100px;"
              ></el-input>
              <span v-else>费用</span>
              ,乙方于本协议生效后5个工作日内全额退还。
            </el-radio>
            <el-radio :label="3">任何一方无需向对方支付任何费用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="签署方式" :label-width="formLabelWidth">
          <el-row>
            <el-radio-group v-model="form3.contract_sign_method">
              <el-radio :label="0">线上签署</el-radio>
              <el-radio :label="1">线下签署</el-radio>
            </el-radio-group>
            <el-col v-show="form3.contract_sign_method == '5'" :span="14">
              <el-upload
                class="upload-demo"
                :action="
                  'http://api1.debteehelper.com/api/Upload/UploadImage?type=5&original_name=true'
                "
                :on-preview="handlePreview3"
                :on-success="handleSuccess3"
                :on-remove="handleRemove3"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed3"
                :file-list="upFileData.fileList3"
              >
                <el-button size="mini" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- <el-form-item label="签署状态" :label-width="formLabelWidth">
          <el-radio-group v-model="form3.sign_status">
            <el-radio :label="0">待签署</el-radio>
            <el-radio :label="1">已签署</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="后台备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form3.admin_notes"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="createContract3">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看" width="35%" :visible.sync="dialogInfoVisible">
      <div class="info-box">
        <el-row>
          <el-col :span="4">合同编号</el-col>
          <el-col v-show="!data.editType" :span="8"
            >{{ infoData.contract_number
            }}<i
              @click="data.editType = true"
              style="margin-left:10px;cursor: pointer;color:#409EFF;"
              class="el-icon-edit-outline"
            ></i
          ></el-col>
          <el-col v-show="data.editType" :span="18">
            <el-input
              size="small"
              style="width:220px;"
              v-model="infoData.contract_number"
            ></el-input>
            <el-button
              style="margin-left:10px;"
              @click="ConfirmModification"
              size="small"
              type="primary"
              >确定</el-button
            >
            <el-button size="small" @click="data.editType = false" plain
              >取消</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">合同类别</el-col>
          <el-col :span="8">{{
            infoData.contract_type == 0
              ? '委托合同'
              : infoData.contract_type == 1
              ? '律师代理合同'
              : '律师解约合同'
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">经办人</el-col>
          <el-col :span="8">{{ infoData.signer_name }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">手机号码</el-col>
          <!-- <el-input size="small" v-model="infoData.signer_phone_bumber"></el-input> -->
          <el-col :span="8">{{ infoData.signer_phone_bumber }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">签署方式</el-col>
          <el-col :span="8">{{
            infoData.contract_sign_method == 0 ? '线上签署' : '线下签署'
          }}</el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="4">签署状态</el-col>
          <el-col :span="8">{{infoData.sign_status == 0?"待签署":"已签署"}}</el-col>
        </el-row> -->
        <el-row>
          <el-col :span="4">签署时间</el-col>
          <el-col :span="8">{{ infoData.sign_time }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">后台备注</el-col>
          <el-col :span="12">{{ infoData.admin_notes }}</el-col>
        </el-row>
        <el-row v-show="infoData.err_msg != null">
          <el-col :span="4">异常原因</el-col>
          <el-col :span="20">{{ infoData.err_msg }}</el-col>
        </el-row>
        <el-row v-show="infoData.contract_sign_method == 1">
          <el-col :span="4">文件列表</el-col>
          <el-col :span="20">
            <el-link
              type="success"
              v-for="(item, index) in infoData.contract_file_url"
              :key="index"
              @click="openInfo(item)"
              >{{ getName(item) }}</el-link
            >
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-show="infoData.contract_sign_method == 0"
          @click="seeContractInfo(infoData.id)"
          >查看合同</el-button
        >
        <el-button
          v-show="
            infoData.contract_sign_method == 0 && infoData.sign_status == '0'
          "
          @click="NoticeContractInfo(infoData.id)"
          >短信通知签署</el-button
        >
        <el-button @click="ContractDelect(infoData.id)" type="primary"
          >删除合同</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import comTab1 from './table1.vue'
import * as Api from '../../../../../api/business'
import { baseURL } from '../../../../../utils/request'
import { api } from '../../../../../../../zzbPc/src/assets/js/api'
@Component({
  components: {
    comTab1
  }
})
export default class About extends Vue {
  // prop
  @Prop({ required: false, default: '' }) contract!: any
  @Prop() height!: number
  @Prop() debtor_number!: number
  @Prop() name!: string
  //Watch
  @Watch('contract', { deep: true, immediate: true })
  contractChangeVal(newVal: any, oldVal: any) {
    this.data.contract = newVal
  }
  @Watch('height', { deep: true, immediate: true })
  heightChangeVal(newVal: number, oldVal: number) {
    this.data.height = newVal
  }
  @Watch('debtor_number', { deep: true, immediate: true })
  debtor_numberChangeVal(newVal: string, oldVal: string) {
    this.data.debtor_number = newVal
  }
  // data
  data: any = {
    editType: false,
    baseUrl: '',
    debtor_number: '', //债务编号
    contract: [], //父组件传过来的数据
    height: 0, //侧边栏高度
    signerData: {}, //签署人信息
    contracType: [
      //数据类型
      { label: '合同编号', prop: 'contract_number' },
      { label: '合同类别', prop: 'contract_type' },
      { label: '经办人', prop: 'signer_name' },
      { label: '手机号码', prop: 'signer_phone_bumber' },
      { label: '签署方式', prop: 'contract_sign_method' },
      { label: '签署状态', prop: 'sign_status' },
      { label: '签署时间', prop: 'sign_time' }
    ]
  }
  formLabelWidth: string = '110px'
  dialogFormVisible1: boolean = false
  dialogFormVisible2: boolean = false
  dialogFormVisible3: boolean = false
  dialogInfoVisible: boolean = false
  form1: any = {
    signer_name: '',
    signer_phone_bumber: '',
    contract_sign_method: 0,
    contract_number: '',
    // sign_status: 0,
    supplementary_provisions: '',
    admin_notes: '',
    contract_file_url: [],
    signer_type: 0,
    contract_type: 0
  }
  form2: any = {
    signer_name: '',
    signer_phone_bumber: '',
    contract_sign_method: 0,
    contract_number: '',
    // sign_status: 0,
    supplementary_provisions: '',
    admin_notes: '',
    contract_file_url: [],
    signer_type: 0,
    contract_type: 0
  }
  form3: any = {
    signer_name: '',
    signer_phone_bumber: '',
    contract_sign_method: 0,
    // sign_status: 0,
    admin_notes: '',
    contract_file_url: [],
    signer_type: 0,
    settlement_scheme: 1,
    contract_type: 0
  }
  upFileData: any = {
    fileList1: [],
    fileList2: [],
    fileList3: []
  }
  infoData: any = {
    id: '',
    contract_number: '',
    qiyuesuo_contract_id: '',
    signer_phone_bumber: '',
    contract_type: '',
    signer_name: '',
    admin_notes: '',
    contract_sign_method: '',
    sign_status: '',
    sign_time: '',
    settlement_amount: 0,
    err_msg: '',
    contract_file_url: ''
  }
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    this.data.burl = baseURL
  }
  //查看合同详情
  collectionInfo(data: any) {
    this.dialogInfoVisible = true
    Api.getContractInfo(data.row.id).then((res: any) => {
      Object.keys(this.infoData).forEach((key: string) => {
        if (key == 'contract_file_url') {
          this.infoData[key] = JSON.parse(res.data[key])
        } else {
          this.infoData[key] = res.data[key]
        }
      })
      // eslint-disable-next-line no-console
      console.log(this.infoData)
    })
  }
  //生成合同
  generate(val: number) {
    this.getContractSigner(val).then((res: any) => {
      this.data.signerData = res.data
      let parmas: any = {
        signer_name: '',
        signer_phone_bumber: '',
        contract_sign_method: 0,
        // sign_status: 0,
        supplementary_provisions: '',
        admin_notes: '',
        contract_file_url: [],
        signer_type: 0,
        contract_type: 0
      }
      this.form1 = Object.assign({}, parmas)
      this.form2 = Object.assign({}, parmas)
      this.form3 = Object.assign({}, parmas)
      this.form1.supplementary_provisions =
        '11.1 甲方确认并同意乙方律师在以下权限范围内拥有自主决定权:（视委托案件情况填写，如无则删去本条）'
      if (val == 0) {
        if (this.data.contract.matter.length == 0) {
          this.$alert('委托事项不能为空', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$message({
              //   type: 'info',
              //   message: `action: ${action}`,
              // })
            }
          })
          return false
        }
        if (this.data.contract.customer.length == 0) {
          this.$alert('办案客服不能为空', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$message({
              //   type: 'info',
              //   message: `action: ${action}`,
              // })
            }
          })
          return false
        }
        this.upFileData.fileList1 = []
        this.dialogFormVisible1 = true
        this.form1.signer_name = this.data.signerData.signer_name
        this.form1.signer_phone_bumber = this.data.signerData.signer_phone_bumber
        this.form1.signer_type = this.data.signerData.signer_type
        this.form1.contract_type = val
      }
      if (val == 1) {
        if (res.data == null) {
          this.$alert('请先分配律师', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$message({
              //   type: 'info',
              //   message: `action: ${action}`,
              // })
            }
          })
          return false
        }
        if (this.data.contract.matter.length == 0) {
          this.$alert('委托事项不能为空', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$message({
              //   type: 'info',
              //   message: `action: ${action}`,
              // })
            }
          })
          return false
        }
        this.upFileData.fileList2 = []
        this.dialogFormVisible2 = true
        this.form2.signer_name = this.data.signerData.signer_name
        this.form2.signer_phone_bumber = this.data.signerData.signer_phone_bumber
        this.form2.signer_type = this.data.signerData.signer_type
        this.form2.contract_type = val
      }
      if (val == 2) {
        this.upFileData.fileList3 = []
        this.dialogFormVisible3 = true
        this.form3.signer_name = this.data.signerData.signer_name
        this.form3.signer_phone_bumber = this.data.signerData.signer_phone_bumber
        this.form3.signer_type = this.data.signerData.signer_type
        this.form3.contract_type = val
      }
    })
  }
  //修改合同编号
  ConfirmModification() {
    let parmas: any = {
      contract_id: this.infoData.id,
      contract_number: this.infoData.contract_number
    }
    Api.UpdateContractNumber(parmas).then((res: any) => {
      if (res.state) {
        this.data.editType = false
        this.$message.success(res.msg)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //获取合同签署人信息
  getContractSigner(val: number) {
    return new Promise((resolve: any, reject: any) => {
      let parmas: any = {
        contract_type: val,
        debtor_number: this.data.debtor_number
      }
      Api.getContractSigner(parmas).then((res: any) => {
        resolve(res)
      })
    })
  }
  //创建合同1
  createContract1() {
    let parmas: any = this.form1
    parmas['debtor_number'] = this.data.debtor_number
    parmas['contract_file_url'] = JSON.stringify(parmas.contract_file_url)
    let contract_sign_method: any = this.form1.contract_sign_method
    let contract_file_url: string = this.form1.contract_file_url

    if (contract_sign_method == 1 && contract_file_url.length == 0) {
      this.$alert('请上传文件', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          // this.$message({
          //   type: 'info',
          //   message: `action: ${action}`,
          // })
        }
      })
      return false
    }
    Api.createContract(parmas).then((res: any) => {
      if (res.state) {
        this.dialogFormVisible1 = false
        this.$message.success(res.msg)
        this.$emit('getContracts', 'Three')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //创建合同2
  createContract2() {
    let parmas: any = this.form2
    parmas['debtor_number'] = this.data.debtor_number
    parmas['contract_file_url'] = JSON.stringify(parmas['contract_file_url'])
    let contract_sign_method: any = this.form2.contract_sign_method
    let contract_file_url: Array<string> = this.form2.contract_file_url

    if (contract_sign_method == 1 && contract_file_url.length == 0) {
      this.$alert('请上传文件', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          // this.$message({
          //   type: 'info',
          //   message: `action: ${action}`,
          // })
        }
      })
      return false
    }
    Api.createContract(parmas).then((res: any) => {
      if (res.state) {
        this.dialogFormVisible2 = false
        this.$message.success(res.msg)
        this.$emit('getContracts')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //创建合同3
  createContract3() {
    let parmas: any = this.form3
    parmas['debtor_number'] = this.data.debtor_number
    parmas['contract_file_url'] = JSON.stringify(parmas['contract_file_url'])
    Api.createContract(parmas).then((res: any) => {
      if (res.state) {
        this.dialogFormVisible3 = false
        this.$message.success(res.msg)
        this.$emit('getContracts')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //解约合同选择变化
  form3change(val: any) {
    let self: any = this
    self.form3.settlement_amount = 0
  }

  //查看合同详情
  seeContractInfo(id: number) {
    Api.ContractSee(id).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        window.open(res.data)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }

  //通知签署
  NoticeContractInfo(id: number) {
    this.$confirm('是否确认发送短信通知用户签署合同?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.ContractNotice(id).then((res: any) => {
          if (res.state) {
            this.$message.success('Messge已发送')
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送'
        })
      })
  }
  //删除合同
  ContractDelect(id: number) {
    this.$confirm('您确定删除该合同?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        let val: string = this.name == '用户签约' ? 'Three' : ''
        Api.ContractDelect(id).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            this.dialogInfoVisible = false
            this.$emit('getContracts', val)
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }

  handleRemove1(file: any, fileList: any) {
    // eslint-disable-next-line no-console
    console.log(file, fileList)
  }
  handleRemove2(file: any, fileList: any) {
    // eslint-disable-next-line no-console
    console.log(file, fileList)
  }
  handleRemove3(file: any, fileList: any) {
    // eslint-disable-next-line no-console
    console.log(file, fileList)
  }
  handlePreview1(file: any) {
    // eslint-disable-next-line no-console
    console.log(file)
  }
  handlePreview2(file: any) {
    // eslint-disable-next-line no-console
    console.log(file)
  }
  handlePreview3(file: any) {
    // eslint-disable-next-line no-console
    console.log(file)
  }
  beforeRemove(file: any, fileList: any) {
    return this.$confirm(`确定移除 ${file.name}？`)
  }
  handleSuccess1(file: any) {
    this.form1.contract_file_url.push(
      'http://file.debteehelper.com' +
        file.data.FileUrl +
        file.data.FileExtension
    )
  }
  handleSuccess2(file: any) {
    this.form2.contract_file_url.push(
      'http://file.debteehelper.com' +
        file.data.FileUrl +
        file.data.FileExtension
    )
  }
  handleSuccess3(file: any) {
    this.form3.contract_file_url.push(
      'http://file.debteehelper.com' +
        file.data.FileUrl +
        file.data.FileExtension
    )
  }
  handleExceed1(files: any, fileList: any) {
    this.$message.warning(
      `当前限制选择 1 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    )
  }
  handleExceed2(files: any, fileList: any) {
    this.$message.warning(
      `当前限制选择 1 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    )
  }
  handleExceed3(files: any, fileList: any) {
    this.$message.warning(
      `当前限制选择 1 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    )
  }
  getName(val: string) {
    let text: string = val.substring(val.lastIndexOf('/') + 1, val.length)
    return text
  }
  openInfo(url: string) {
    window.open(url)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.contract-wrap {
  width: 100%;
  overflow-y: auto;
  & > .section {
    margin-bottom: 20px;
    padding-right: 20px;
    & > span:first-child {
      // font-size: 12px;
      // color: $Main-characters;
      margin-top: 10px;
      display: block;
      height: 20px;
      .edit {
        color: #e6a23c;
        float: right;
        cursor: pointer;
      }
      .generate {
        color: white;
        float: right;
        cursor: pointer;
        background: #ec193a;
        padding: 4px 8px;
        margin-right: 10px;
        border-radius: 2px;
      }
    }
    .box {
      display: flex;
      flex-wrap: wrap;
      & > .text {
        width: 33.33%;
        p {
          color: $General-colors;
          font-size: 14px;
          margin: 0;
          margin-bottom: 10px;
          line-height: 32px;
          display: flex;
          & > span:first-child {
            margin-right: 20px;
            font-size: 12px;
            color: $Secondary-text;
            min-width: 60px;
          }
        }
      }
      & > .el-row {
        width: 100%;
        height: 32px;
        line-height: 32px;
        margin-bottom: 10px;
        span {
          color: #909199;
          font-size: 12px;
        }
        p {
          margin: 0;
          font-size: 14px;
          color: #313133;
        }
      }
    }
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .download {
    font-size: 14px;
    color: #67c23a;
    margin-left: 20px;
  }
  .el-dialog {
    width: 680px;
  }
  & .el-textarea {
    width: 80%;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .upload-demo {
    height: 40px;
    display: flex;
    & .el-button--mini {
      margin-right: 20px;
      position: relative;
      // top: -10px;
    }
    & .el-upload-list {
      width: 200px;
      display: inline-block;
      position: relative;
      top: -115px;
    }
  }
  .upload-demo2 {
    & .el-upload-list {
      width: 200px;
      display: inline-block;
      position: relative;
      top: -195px;
    }
  }
  & .cell button:nth-child(2) {
    display: none;
  }
  & .info-box {
    width: 90%;
    margin: 0 auto;
    .el-row {
      height: 32px;
      line-height: 32px;
      margin-bottom: 10px;
      .el-col:nth-child(1) {
        font-size: 14px;
        color: #909199;
      }
      .el-col:nth-child(2) {
        font-size: 14px;
        color: #303133;
      }
    }
  }
  & .from3 {
    & .el-radio-group {
      display: flex;
      flex-wrap: wrap;
      & .el-radio {
        width: 100%;
        margin: 10px;
      }
    }
  }
  .title {
    font-size: 14px;
    color: #606266;
    font-weight: bold;
    display: inline-block;
    border-left: 3px solid #e01f3c;
    height: 15px;
    line-height: 15px;
    padding-left: 10px;
  }
}
</style>
