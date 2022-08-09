<template>
  <div class="layout-wrap">
    <el-container>
      <el-aside :class="{ open: openType }">
        <Menu @open2="data.customerVisible = true" @open="openWacth"></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- <div class="header-breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>XX列表</el-breadcrumb-item>
              <el-breadcrumb-item>XX详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div> -->
          <div class="header-icon">
            <!-- <el-badge is-dot class="item">
              <el-tooltip content="通知" placement="bottom">
                <i class="el-icon-bell"></i>
              </el-tooltip>
            </el-badge>
            <el-tooltip content="访问移动端" placement="bottom">
              <i class="el-icon-mobile-phone"></i>
            </el-tooltip> -->
            <!-- <el-tooltip content="刷新" placement="bottom">
              <i @click="Refresh" class="el-icon-refresh"></i>
            </el-tooltip> -->
            <!-- <el-tooltip content="帮助" placement="bottom">
              <i class="el-icon-warning-outline"></i>
            </el-tooltip>
            <el-tooltip content="设置" placement="bottom">
              <i class="el-icon-setting"></i>
            </el-tooltip>
            <el-tooltip content="客服" placement="bottom">
              <i class="el-icon-service"></i> -->
            <!-- </el-tooltip> -->
          </div>
          <div class="header-user">
            <div class="user-img">
              <img :src="$store.state.Login.headImg" alt="用户头像" />
            </div>
            <div class="user-name">
              <span>{{ $store.state.Login.userName }}</span>
            </div>
            <div class="user-operation">
              <el-dropdown trigger="click" @command="handleCommand">
                <i class="el-icon-arrow-down el-dropdown-link"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="modify">
                    账户设置
                  </el-dropdown-item>
                  <el-dropdown-item command="logout">
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main>
          <div class="header-tag" ref="headerTag">
            <div :style="{ left: left + 'px' }" class="tags-box" ref="tagsBox">
              <el-tag
                v-for="tag in data.tags"
                :key="tag.name"
                :closable="tag.closable"
                :type="tag.type"
                v-show="tag.name != '404'"
                @click="handleClick(tag)"
                @close="handleClose(tag)"
                :class="{ active: tag.active }"
              >
                {{ tag.name }}
              </el-tag>
            </div>
          </div>
          <transition mode="out-in" name="fade">
            <keep-alive v-if="$route.meta.keepAlive">
              <router-view />
            </keep-alive>
            <router-view exclude="detail" v-if="!$route.meta.keepAlive" />
          </transition>
          <el-popover
            placement="left-start"
            popper-class="popoverBox-box"
            width="180"
            trigger="hover"
          >
            <div class="popoverBox">
              <p @click="data.customerVisible = true">
                <img src="../../assets/images/layout/zixun.svg" alt="" />
                <span>在线咨询</span>
              </p>
              <el-divider></el-divider>
              <div class="p">
                <img src="../../assets/images/layout/phone.svg" alt="" />
                <div>
                  <span>电话咨询</span>
                  <span>4006 321 918</span>
                </div>
              </div>
            </div>
            <div slot="reference" class="right-customer">
              <img src="../../assets/images/layout/coutomer2.svg" alt="" />
            </div>
          </el-popover>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      custom-class="customerBox"
      :visible.sync="data.customerVisible"
      :show-close="false"
    >
      <div class="hd"></div>
      <div @click="data.customerVisible = false" class="close">
        <i class="el-icon-close"></i>
      </div>
      <iframe
        class="customerToset"
        src="https://webchat.7moor.com/pcwebchat.html?accessId=6c39ab80-4b14-11eb-9b83-fdf3fdf4044c&urlTitle=&fromUrl=http%3A%2F%2Fsaas.debteehelper.com%2Ftest%2Findex.html&language=zh-CN&otherParams=%7B%7D&clientId=&unionAccessId=undefined&customField=&showAnnexUrl=false&priority=false"
        frameborder="0"
      ></iframe>
    </el-dialog>
    <el-dialog
      title="账户设置"
      :visible.sync="data.customerVisible2"
      custom-class="settingBox"
    >
      <el-divider></el-divider>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="管理员姓名">
          <span>{{ admin_name }}</span>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone_number">
          <el-input v-model="form.phone_number"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="修改登录名密码">
          <el-radio v-model="form.update_password" label="0">否</el-radio>
          <el-radio v-model="form.update_password" label="1">是</el-radio>
        </el-form-item>
        <el-form-item
          v-if="form.update_password == '1'"
          label="登录名"
          prop="account_name"
        >
          <el-input v-model.trim="form.account_name"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.update_password == '1'"
          label="原密码"
          prop="password"
        >
          <el-input show-password v-model.trim="form.password"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.update_password == '1'"
          label="新密码"
          prop="password_01"
        >
          <el-input show-password v-model.trim="form.password_01"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.update_password == '1'"
          label="再次输入新密码"
          prop="password_02"
        >
          <el-input show-password v-model.trim="form.password_02"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center;">
        <el-button @click="resetForm('form')">取消</el-button>
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./layout.ts"></script>

<style lang="scss">
@import "./layout.scss";
</style>
