<template>
  <footer class="app_footer">
    <!-- 联系我们 -->
    <div class="contact">
      <div class="page-container">
        <el-row class="footer-row" :gutter="20">
          <el-col :span="6" :xs="12">
            <div class="item">
              <div class="item-title">學程介紹</div>
              <div class="item-content">
                <div class="item-content-box">
                  <i class="iconfont icon-kefu"></i>
                  在线客服
                </div>
                <div class="item-content-box">
                  <i class="iconfont icon-question"></i>
                  问题反馈
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6" :xs="12"
            ><div class="item">
              <div class="item-title">外部連結</div>
              <div class="item-content">
                <div class="item-content-box">
                  <i class="iconfont icon-kefu"></i>
                  彰師大教務處
                </div>
                <div class="item-content-box">
                  <i class="iconfont icon-question"></i>
                  課務組網頁
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
              <div class="hotline">04-7232105#5622-5626</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="page-container">
        <div class="slogan">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>价格亲民</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>物流快捷</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>品质新鲜</span>
          </a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 小兔鲜儿</p>
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
// .el-row:first-child {
//   margin-top: 20px;
// }
// .el-row:last-child {
//   margin-bottom: 20px;
// }

.el-col {
  border-radius: 4px;
}

.item {
  // background-color: #ccc;
  border-radius: 4px;
  min-height: 36px;
  height: 150px;
  text-align: center;
  border-right: 1px solid #f2f2f2;
  color: #999;
}
.item-title {
  font-size: medium;
  padding: 20px;
  text-align: center;
}
.item-content {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;

  .iconfont {
    font-size: 36px;
    display: block;
    color: #666;
  }

  &:last-child {
    margin-right: 0;
  }
}

.item-content-box {
  flex: 1;
  max-width: 100px;

  &:hover {
    .iconfont {
      cursor: pointer;
      color: $baseColor;
    }
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
    background-color: $baseColor;
  }
}

.app_footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;

  .contact {
    background: #fff;

    .page-container {
      // padding: 60px 0 40px 25px;
      display: flex;
    }

    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
    }

    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;

      span {
        display: block;
      }

      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: $baseColor;
      }
    }

    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;

      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }

  .extra {
    background-color: #333;
  }

  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;

    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;

      i {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }

      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }

  .copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;

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

@media screen and (max-width: 767px) {
  .item {
    margin-top: 20px;
  }
}
</style>
