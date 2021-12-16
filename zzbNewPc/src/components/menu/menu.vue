<template>
  <div :class="{ open: data.isCollapse }" class="menu-wrap">
    <div class="menu-header">
      <div v-show="!data.isCollapse">
        <img
          @click="toweb"
          class="logo"
          src="https://file.debteehelper.com/logo/logo_200.png"
          alt=""
        />
      </div>
      <i
        class="icon"
        :class="[data.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
        @click="data.isCollapse = !data.isCollapse"
      ></i>
    </div>
    <el-menu
      :default-active="data.menuActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="data.isCollapse"
      :unique-opened="true"
      :collapse-transition="false"
    >
      <router-link to="/">
        <el-menu-item index="1">
          <div class="xian"></div>
          <i class="el-icon-house"></i>
          <span slot="title">控制台首页</span>
        </el-menu-item>
      </router-link>
      <el-submenu
        v-for="(item, index) in $store.state.layout.Routers"
        :key="index + 1"
        :index="tostr(index)"
        v-show="item.ismenu == true && item.meta.index != '1'"
      >
        <template slot="title">
          <div class="xian"></div>
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <router-link
            v-for="(item2, index2) in item.children"
            :key="index2 + 1"
            :to="item2.path"
            v-show="item2.ismenu == true"
          >
            <el-menu-item :index="item2.meta.index">
              <template slot="title">
                <div class="xian"></div>
                <span>{{ item2.meta.title }}</span>
              </template>
            </el-menu-item>
          </router-link>
          <!-- <router-link v-show="is_super == 1 && item.meta.title == '债权人管理'" to="/account/index">
            <el-menu-item index="5-1">
              <div class="xian"></div> -->
          <!-- <i class="el-icon-s-tools"></i> -->
          <!-- <span slot="title">管理员</span>
            </el-menu-item>
          </router-link> -->
        </el-menu-item-group>
      </el-submenu>

      <!-- <router-link
        v-for="(item, index) in $store.state.layout.Routers"
        :key="index * -1"
        v-show="item.meta.index > 7"
        :to="item.path"
      >
        <el-menu-item :index="item.meta.index + '-1'">
          <div class="xian"></div>
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </router-link> -->
      <el-submenu index="100">
        <template slot="title">
          <div class="xian"></div>
          <i class="el-icon-tickets"></i>
          <span slot="title">操作手册</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="100-1">
            <template slot="title">
              <!-- <div class="xian"></div> -->
              <span
                @click="
                  open(
                    'https://file.debteehelper.com/help/债主帮VIP账户操作手册-AI律师函.pdf'
                  )
                "
                >AI律师函</span
              >
            </template>
          </el-menu-item>
          <el-menu-item index="100-2">
            <template slot="title">
              <span
                @click="
                  open(
                    'https://file.debteehelper.com/help/债主帮VIP账户操作手册-律师办案.pdf'
                  )
                "
              >
                律师办案
              </span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <!-- <div v-show="!data.isCollapse" class="customer"> -->
    <!-- <h4>专属客服</h4> -->
    <!-- <span class="heng"></span>
      <img src="../../assets/images/layout/customer.png" />
      <p class="p">客服小催</p>
      <p class="p">4006 321 918</p>
      <div @click="lianxi" class="btn">在线联系</div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { MenuData } from "../../types/components/menu.interface";
import { getCookie } from "../../utils/common";
// import {  } from "@/components" // 组件

@Component({})
export default class About extends Vue {
  // prop
  @Prop({
    required: false,
    default: ""
  })
  name!: string;

  @Watch("$route")
  onChangeValue(newVule: any, oldVule: any) {
    let self: any = this;
    if (newVule.meta.index != "") {
      this.data.menuActive = newVule.meta.index;
    }
  }
  @Watch("data", { immediate: true, deep: true })
  openChangeValue(newVule: any, oldVule: any) {
    this.$emit("open", newVule.isCollapse);
  }
  // data
  data: MenuData = {
    componentName: "menu",
    isCollapse: false,
    menuActive: "1-1"
  };
  is_super: string = "";

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let self: any = this;
    this.data.menuActive = self.$route.meta.index;
    self.is_super = getCookie("is_super");
  }

  handleOpen(key: number, keyPath: string) {
    // eslint-disable-next-line no-console
    // console.log(key, keyPath);
  }

  handleClose(key: number, keyPath: string) {
    // eslint-disable-next-line no-console
    // console.log(key, keyPath);
  }

  tostr(index: number) {
    let aa: number = index + 1;
    let xx: string = String(aa);
    return xx;
  }
  toweb() {
    window.open("https://www.debteehelper.com/#/index");
  }
  lianxi() {
    this.$emit("open2");
  }
  open(url: string) {
    window.open(url);
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";
$bg-color1: linear-gradient(
  to bottom right,
  rgb(62, 91, 156, 1) 30%,
  rgb(13, 28, 61) 100%
); //1级菜单背景，主题背景
$color: #fff; //头部字体颜色
$color-1: #fff; //menu字体颜色
$hover-color: rgba(141, 181, 255, 0.5); //菜单悬浮色
$active-color: rgba(141, 181, 255, 0.5); //二级菜单选中色
.menu-wrap {
  width: 220px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: $bg-color1;
  position: relative;
  .menu-header {
    // background-color: $menu-header-color;
    line-height: 50px;
    color: $color;
    display: flex;
    justify-content: space-around;
    font-size: $large-title;
    height: 50px;
    width: 100%;
    max-width: 200px;
    .icon {
      font-size: 20px;
      cursor: pointer;
      line-height: 50px;
    }
    .logo {
      width: 90px;
      position: relative;
      top: 10px;
    }
  }
  .el-menu {
    border-right: none;
    background: none;
    width: 200px;
    & .el-menu-item {
      color: $color-1;
      & i {
        color: #ffffff;
      }
    }
    & .el-menu-item:hover,
    & .el-menu-item:focus,
    & .is-active {
      background-color: $active-color;
    }
    & > .el-submenu {
      .el-submenu__title {
        // padding-left: 40px !important;
        & i {
          color: #ffffff;
        }
      }
      .el-menu {
        .el-menu-item-group {
          .el-menu-item {
            padding-left: 60px !important;
            background-color: $bg-color1;
            color: $color-1;
          }
          .el-menu-item:hover,
          .is-active {
            background-color: $active-color;
          }
        }
      }
    }
    .el-menu-item.is-active,
    .el-submenu__title {
      color: $color-1;
    }
    .el-menu-item.is-active:hover,
    .el-submenu__title:hover {
      background-color: $active-color;
      .xian {
        height: 80%;
      }
    }
  }
  & > .el-menu--collapse {
    width: auto !important;
  }
  .customer {
    width: 180px;
    padding: 20px;
    // box-shadow: 0 2px 5px #ccc;
    position: absolute;
    left: -15px;
    bottom: 20px;
    color: #fff;
    img {
      width: 35%;
      display: block;
      margin: 10px auto;
    }
    .p {
      font-size: 12px;
      color: #fff;
      text-align: center;
      margin-bottom: 10px;
    }
    .btn {
      color: white;
      background-color: #bbb;
      width: 80%;
      margin: auto;
      text-align: center;
      font-size: 14px;
      padding: 8px 0;
      cursor: pointer;
      border-radius: 5px;
    }
    .btn:hover {
      background-color: #eb193a;
    }
  }
}
.el-menu-item-group__title {
  padding: 0;
}

a {
  text-decoration: none;
}
.xian {
  position: absolute;
  left: 5px;
  width: 2px;
  height: 0;
  transition: height 0.2s ease;
  background-color: red;
  top: 10%;
}
</style>
