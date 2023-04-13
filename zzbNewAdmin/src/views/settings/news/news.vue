<template>
  <div class="news-warp">
    <comselect
      :options="data.options"
      @select="search"
      @clear="clearSelection"
    ></comselect>
    <comOperation :totalize="data.list.length" @add="add"></comOperation>
    <comtable
      :tableData="data.list"
      :load="data.loading"
      :tableType="data.dataType"
      @Edit="handleEdit"
      @Delete="handleDelete"
    ></comtable>
    <!-- <comPaging
      :page="getData.page"
      :totalize="data.totalize"
      @watchChange="watchChange"
    ></comPaging> -->
    <el-dialog
      title="新增"
      :visible.sync="data.dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" label-position="left" label-width="80px">
        <el-form-item label="通知主题">
          <el-input v-model="data.addData.notice_title"></el-input>
        </el-form-item>
        <el-form-item label="通知内容">
          <el-input
            type="textarea"
            :rows="8"
            v-model="data.addData.notice_content"
          ></el-input>
        </el-form-item>
        <el-form-item label="通知类别">
          <el-radio-group v-model="data.addData.notice_category">
            <el-radio label="0">PC</el-radio>
            <el-radio label="1">H5</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="通知时间">
          <el-col :span="11">
            <el-date-picker
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
              v-model="data.addData.start_time"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
              v-model="data.addData.end_time"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="data.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./news.ts"></script>
<style lang="scss">
@import './news.scss';
</style>
