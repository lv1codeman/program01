<script setup>
const linkProgamIntro = () => {
  window.open('https://acadaff.ncue.edu.tw/p/412-1002-2131.php?Lang=zh-tw', '_blank')
}
const linkProgamRules = () => {
  window.open('https://acadaff.ncue.edu.tw/var/file/2/1002/img/736/666581509.pdf', '_blank')
}
const linkNCUEAA = () => {
  window.open('https://acadaff.ncue.edu.tw/', '_blank')
}
const linkCurri = () => {
  window.open('https://acadaff.ncue.edu.tw/p/412-1002-2128.php?Lang=zh-tw', '_blank')
}
</script>
<template>
  <footer class="app_footer">
    <!-- 联系我们 -->
    <div class="contact">
      <div class="page-container">
        <el-row class="footer-row">
          <el-col :span="6" :xs="12">
            <div class="item">
              <div class="item-title">學程介紹</div>
              <div class="item-content">
                <div class="item-content-box" @click="linkProgamIntro">
                  <div class="iconGroup">
                    <div class="iconImage">
                      <font-awesome-icon class="iconfont" icon="fa-magnifying-glass" />
                    </div>
                    <div class="iconText">本校學程</div>
                  </div>
                </div>
                <div class="item-content-box" @click="linkProgamRules">
                  <div class="iconGroup">
                    <div class="iconImage">
                      <font-awesome-icon class="iconfont" icon="fa-scale-balanced" />
                    </div>
                    <div class="iconText">學程法規</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6" :xs="12"
            ><div class="item">
              <div class="item-title">外部連結</div>
              <div class="item-content">
                <div class="item-content-box" @click="linkNCUEAA">
                  <div class="iconGroup">
                    <div class="iconImage">
                      <font-awesome-icon class="iconfont" icon="fa-building-columns" />
                    </div>
                    <div class="iconText">教務處網站</div>
                  </div>
                </div>
                <div class="item-content-box" @click="linkCurri">
                  <div class="iconGroup">
                    <div class="iconImage">
                      <font-awesome-icon class="iconfont" icon="fa-book" />
                    </div>
                    <div class="iconText">課務組網站</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6" :xs="12"
            ><div class="item">
              <div class="item-title">選課須知</div>
              <div class="item-content">
                <div class="item-content-box">
                  <div class="myqrcode">
                    <img src="@/assets/images/選課須知QRcode100x100.png" alt="" />
                  </div>
                </div>
                <div class="item-content-box">
                  <div class="myqrcode-description">
                    <span>掃描QRcode</span>
                    <span>立即前往</span>
                    <a
                      class="primary"
                      href="https://acadaff.ncue.edu.tw/var/file/2/1002/img/958/course.html"
                      target="_blank"
                      >選課專區</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6" :xs="12">
            <div class="item">
              <div class="item-title">聯絡我們</div>
              <div class="hotline">
                <font-awesome-icon icon="fa-phone" /> 04-7232105
                <div class="small">#5622-5626</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="page-container">
        <div class="copyright">
          <p>CopyRight © 彰化師範大學</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer-row {
  flex: 1;
}

.el-row {
  margin-top: 10px;
  margin-bottom: 10px;
}

.item {
  min-height: 36px;
  height: 150px;
  text-align: center;
  border-right: 1px solid #f2f2f2;
  color: var(--el-color-info);
  &:first-child {
    border-left: 1px solid #f2f2f2;
  }
}
.item-title {
  font-size: 20px;
  padding: 20px;
  text-align: center;
}
.item-content {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;

  .item-content-box {
    flex: 1;
    max-width: 100px;

    .iconGroup {
      display: flex;
      justify-content: center;
      flex-flow: row wrap;
      gap: 10px;
      .iconImage {
        // font-size: 30px;
        .iconfont {
          // 以font-size設定icon大小
          font-size: 36px;
          // display: block;
          // color: #666;
        }
      }
      .iconText {
        font-size: 14px;
      }
    }

    &:hover {
      cursor: pointer;
      .iconfont {
        color: var(--el-color-primary);
      }
    }
  }
  &:last-child {
    margin-right: 0;
  }
}

.myqrcode {
  width: 88px;
  height: 88px;
  padding: 2px;
  border: 1px solid #ededed;
}
.myqrcode-description {
  span {
    display: block;
  }
  a {
    display: block;
    line-height: 1;
    padding: 10px 10px;
    margin-top: 5px;
    color: #fff;
    border-radius: 5px;
    background-color: var(--el-color-info);
    &:hover {
      cursor: pointer;
      background-color: var(--el-color-primary);
    }
  }
}

.app_footer {
  overflow: hidden;
  background-color: #f5f5f5;
  margin-top: 20px;

  .contact {
    background: #fff;

    .page-container {
      // padding: 60px 0 40px 25px;
      display: flex;
    }

    .hotline {
      // padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;

      .small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }

  .extra {
    background-color: $nav-bg-color;
  }

  .copyright {
    height: 60px;
    padding-top: 20px;
    text-align: center;
    color: #999;
    font-size: medium;

    p {
      line-height: 1;
      margin-bottom: 20px;
    }

    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;

      &:last-child {
        border-right: none;
      }
    }
  }
}

@media screen and (max-width: 423px) {
  .item-title {
    padding: 10px;
  }
  .item-content {
    gap: 0px;
    .item-content-box {
      .iconGroup {
        gap: 5px;
        .iconImage {
          // font-size: 30px;
          .iconfont {
            font-size: 30px;
          }
        }
        .iconText {
          font-size: 14px;
        }
      }
    }
  }

  .item {
    height: 130px;
    margin-top: 5px;
    font-size: 12px;
  }
  .myqrcode-description a {
    padding: 5px 0px;
  }
}
</style>
