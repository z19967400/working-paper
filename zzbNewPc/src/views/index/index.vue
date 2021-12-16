<template>
  <div class="index-wrap">
    <div class="index-box">
      <!-- <div id="chart" class="chart"></div> -->
      <div class="section section01">
        <div class="left">
          <div class="top">
            <div class="fenlei first">
              <h3>{{ adminData.account.account_name }}</h3>
              <div>
                <div style="margin-right:10px;">
                  <i style="color:#eb193a;" class="el-icon-user"></i
                  ><span>{{ adminData.account.admin_role }}</span>
                </div>
                <div>
                  <i style="color:#67C23A;" class="el-icon-success"></i
                  ><span>已认证</span>
                </div>
              </div>
            </div>
            <div class="shu"></div>
            <div class="fenlei">
              <p>
                <span>债权人</span><span>{{ adminData.creditor_total }}</span>
              </p>
            </div>
            <!-- <div class="shu"></div> -->
            <!-- <div class="fenlei">
              <p><span>管理员</span><span>{{adminData.admin_total}}</span></p>
            </div> -->
            <div class="shu"></div>
            <div class="fenlei">
              <p>
                <span>AI律师函委托 / 完成</span
                ><span>{{ adminData.aI_lawyer_total }}</span> /
                <span>{{ adminData.aI_lawyer_end_tatol }}</span>
              </p>
            </div>
            <div class="shu"></div>
            <div class="fenlei">
              <p>
                <span>律师办案委托 / 完成</span
                ><span>{{ adminData.case_total }}</span> /
                <span>{{ adminData.case_end_total }}</span>
              </p>
            </div>
          </div>
          <div class="list-box">
            <div
              v-for="(item, index) in pageList"
              :key="index"
              class="list-item"
            >
              <div @click="toPage(item.url, index)" class="content">
                <h4>{{ item.name }}</h4>
                <span class="heng"></span>
                <img :src="item.url" />
              </div>
            </div>
          </div>
        </div>
        <!-- <div style="width:1%;"></div> -->
        <div class="customer">
          <h4>专属客服</h4>
          <span class="heng"></span>
          <img src="../../assets/images/layout/customer.png" />
          <p class="p">客服小催</p>
          <p class="p">4006 321 918</p>
          <div @click="customerVisible = true" class="btn">在线联系</div>
        </div>
      </div>
      <div class="section section02">
        <div class="left">
          <div>
            <h4>最新消息</h4>
            <span class="heng"></span>
            <el-table :data="adminData.notice" height="400" style="width: 100%">
              <el-table-column prop="send_name" label="发信人" width="80px">
              </el-table-column>
              <el-table-column prop="title" label="主题"> </el-table-column>
              <el-table-column prop="send_time" label="发送时间" width="180px">
              </el-table-column>
              <el-table-column prop="status" label="状态" width="80px">
              </el-table-column>
              <el-table-column label="操作" width="100px">
                <template slot-scope="scope">
                  <el-button
                    style="color:#409EFF;"
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="right">
          <h4>平台介绍</h4>
          <span class="heng"></span>
          <!-- <img src="../../assets/images/layout/4.png" alt="">   
          <img src="../../assets/images/layout/6.png" alt=""> -->
          <img
            @click="
              toPage('https://file.debteehelper.com/help/关于商账催收.pdf', -1)
            "
            src="../../assets/images/layout/7@3x.png"
            alt=""
          />
          <router-link to="/manual/manual"
            ><img src="https://file.debteehelper.com/weapp-img/czsc.png" alt=""
          /></router-link>
        </div>
      </div>
      <!-- <div class="footer">
        <div>
          <img src="https://www.zzbang.vip/CDN/img/pc/zzb.png" alt="">
          <span>债主帮移动端</span>
        </div>
        <div>
          <img src="https://www.zzbang.vip/CDN/img/pc/weixin.png">
          <span>债主帮公众号</span>
        </div>
        <div>
          <span>4006 321 918</span>
          <span>Copyright Reserved ©债主帮 版权所有 沪ICP备18012241号</span>
        </div>
      </div> -->
    </div>
    <el-dialog
      custom-class="customer"
      :visible.sync="customerVisible"
      :show-close="false"
    >
      <div class="hd"></div>
      <div @click="customerVisible = false" class="close">
        <i class="el-icon-close"></i>
      </div>
      <iframe
        class="customerToset"
        src="https://webchat.7moor.com/pcwebchat.html?accessId=6c39ab80-4b14-11eb-9b83-fdf3fdf4044c&urlTitle=&fromUrl=http%3A%2F%2Fsaas.debteehelper.com%2Ftest%2Findex.html&language=zh-CN&otherParams=%7B%7D&clientId=&unionAccessId=undefined&customField=&showAnnexUrl=false&priority=false"
        frameborder="0"
      ></iframe>
    </el-dialog>
    <el-dialog
      custom-class="noticeInfo"
      :title="adminData.noticeInfo.title"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div
        style=" line-height: 1.5"
        v-if="adminData.noticeInfo.title == '债主帮新版上线通知'"
      >
        <p style="margin-bottom:20px;">尊敬的各位用户，您好！</p>
        <p style="text-indent: 29px;">
          为不断提升您的使用体验，债主帮法催服务平台进行了全面升级。即日起，新版平台正式上线。具体注意事项如下：
        </p>
        <p>
          1. 债主帮官网即新版平台访问链接变更为<span
            style="color:#409EFF;cursor: pointer;"
            @click="toWeb('https://www.debteehelper.com/')"
            >(www.debteehelper.com)</span
          >，您可使用已有的VIP账号密码登录后发起委托。
        </p>
        <p>
          2. 新旧交替之际，已发起的委托仍需登录旧版平台<span
            style="color:#409EFF;cursor: pointer;"
            @click="toWeb('https://www.zzbang.vip/')"
            >（www.zzbang.vip）</span
          >查看或操作，后续会做统一的数据迁移，给您带来的不便，敬请谅解。
        </p>
        <p>3. 新旧交替工作完成后，债主帮旧版平台将会关闭，届时将另行通知</p>
        <p style="margin-top:20px;text-indent: 29px;">
          如有任何问题请拨打热线电话4006321918或联系您的专属客服。
        </p>
        <p style="margin-top:20px;margin-bottom:20px;text-indent: 29px;">
          感谢您长久以来给予债主帮的支持！
        </p>
        <p style="text-align: right;">上海诚收信息科技有限公司</p>
        <p style="text-align: right;">债主帮法催服务平台</p>
        <p style="text-align: right;">2021年2月22日</p>
      </div>
      <span v-else>{{ adminData.noticeInfo.text }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handClose">取 消</el-button>
        <el-button type="primary" @click="handClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import "./index.scss";
</style>
