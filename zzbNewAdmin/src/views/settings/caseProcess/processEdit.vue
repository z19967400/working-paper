<template>
  <div class="processEdit-box">
    <span class="title">办案流程新增/编辑 </span>
    <el-divider></el-divider>
    <div class="processEdit-warp">
      <el-form
        ref="form"
        :style="{ height: height + 'px' }"
        :model="formdata"
        label-width="80px"
      >
        <el-form-item label="流程名称">
          <el-col :span="6">
            <el-input v-model="formdata.flow_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="排序">
          <el-col :span="6">
            <el-input v-model="formdata.flow_sort"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="默认">
          <el-switch v-model="formdata.is_default"></el-switch>
        </el-form-item>
        <el-form-item label="节点管理">
          <el-steps direction="vertical">
            <div
              class="step-item"
              v-for="(item, index) in formdata.data"
              :key="index"
            >
              <el-step></el-step>
              <div>
                <div class="demo-form-inline">
                  <el-form-item label="节点名称">
                    <el-input
                      v-model="item.name"
                      placeholder="请输入节点名称"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="选择表单">
                    <el-select v-model="item.form_id" placeholder="选择表单">
                      <el-option
                        v-for="(item2, index2) in data.fromIdList"
                        :key="index2"
                        :label="item2.form_name"
                        :value="item2.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="间隔天数">
                    <el-input
                      type="number"
                      v-model="item.interval_days"
                      placeholder="请输入间隔时间"
                    ></el-input>
                  </el-form-item>
                  <el-button
                    @click="stepDelete(index, item)"
                    plain
                    size="mini"
                    type="primary"
                    icon="el-icon-delete"
                  ></el-button>
                </div>
              </div>
            </div>
          </el-steps>
          <el-button
            @click="add()"
            type="primary"
            size="small"
            icon="el-icon-circle-plus-outline"
            plain
            >添加</el-button
          >
        </el-form-item>
        <el-form-item class="edit-bottom-bin">
          <el-button type="primary" :loading="btnLoad" @click="onSubmit"
            >确定</el-button
          >
          <el-button @click="quxiao">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" src="./processEdit.ts"></script>
<style lang="scss">
@import './processEdit.scss';
</style>
