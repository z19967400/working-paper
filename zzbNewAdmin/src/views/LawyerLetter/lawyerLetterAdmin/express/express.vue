<template>
  <div class="express">
    <el-upload
      class="upload-demo"
      :limit="50"
      :before-upload="uploadBefore"
      :on-success="haldOnSuccess"
      :on-exceed="handleExceed"
      drag
      :show-file-list="false"
      :action="data.burl + '/LawyerLetterExpress/UploadCourierReceiptImg'"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb,一次上传最大数量50。
      </div>
    </el-upload>
    <el-divider content-position="left">委托信息核验</el-divider>
    <el-table
      v-loading="this.data.loading"
      :height="500"
      :data="data.list"
      border
      style="width: 100%;height:500px;"
      :row-class-name="tableRowClassName"
      :key="data.tableKey"
    >
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="debtor_number" label="委托编号" width="150">
      </el-table-column>
      <el-table-column prop="debtor_name" label="债务人名称" width="250">
      </el-table-column>
      <el-table-column prop="receiving_name" label="收件人" width="120">
      </el-table-column>
      <el-table-column prop="receiving_phone" label="收件人电话" width="120">
      </el-table-column>
      <el-table-column prop="receiving_address" label="收件人地址" width="350">
      </el-table-column>
      <el-table-column
        prop="execution_progress"
        label="委托执行进度"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="send_time" label="寄送日期" width="150">
      </el-table-column>
      <el-table-column prop="courier_receipt" label="快递底单状态" width="120">
      </el-table-column>
      <el-table-column label="快递公司" prop="courier_company" width="120">
      </el-table-column>
      <el-table-column label="快递单号" prop="courier_number" width="125">
      </el-table-column>
      <el-table-column label="上传提示" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.msg }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="courier_receipt" label="底单图片" width="120">
        <template slot-scope="scope">
          <img
            @click="open(scope.row.courier_receipt_img)"
            style="max-width:100%;max-height:100%;cursor: pointer;"
            :src="scope.row.courier_receipt_img"
            alt="底单图片"
          />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="courier_receipt"
        label="操作"
        width="60"
      >
        <template slot-scope="scope">
          <el-button @click="handleDelect(scope.$index)" type="text"
            >移除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button class="btn-fanhui" @click="goBack" type="primary"
      >返回</el-button
    >
    <!-- <el-button class="btn-fanhui" @click="upAgain" type="primary">重新上传</el-button>
    <el-button class="btn-fanhui" @click="save" type="primary">保存并继续上传</el-button> -->
  </div>
</template>
<script lang="ts" src="./express.ts"></script>

<style lang="scss">
@import './express.scss';
</style>
