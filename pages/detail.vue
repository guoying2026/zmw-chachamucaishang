<template>
  <div class="first">
    <img class="first" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_e50b0b18-3ddc-49e5-b4f7-1d24bd8e12fb.png" alt=""/>
  </div>
  <div class="third">
    <div class="second_1">
      <text class="second_1_1">张姗姗的木材加工厂</text>
      <div class="second_1_2">
        <div class="second_1_2_item">
          <div class="second_1_2_first second_1_2_item_left">
            <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_e2d929f8-8994-4ba6-b731-d4779bf41cf2.png" alt=""/>
            <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_c5514216-f624-444c-bb74-24b956dfaab0.png" alt=""/>
            <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_63b5d737-53a8-407f-bec4-9f92e207c88c.png" alt=""/>
            <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_f2fdbec2-a1bc-490d-ba2e-383830efbd3a.png" alt=""/>
          </div>
          <text class="grey-line"></text>
          <div class="second_1_2_third">勋章</div>
        </div>
        <div class="second_1_2_item">
          <div class="second_1_2_first second_1_2_item_middle">
            <text class="second_1_2_item_middle_number">98</text>
            <!--                        <div class="red_solid_circle"></div>-->
            <!--            <text class="second_1_2_item_middle_number">8</text>-->
          </div>
          <text class="grey-line"></text>
          <div class="second_1_2_third">信用分</div>
        </div>
        <div class="second_1_2_item">
          <!--          <img class="second_1_2_first second_1_2_item_right" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_ad66b4f5-d594-4271-0a13-2c57e718420c.png" alt=""/>-->
          <img class="second_1_2_first second_1_2_item_right" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_1d7c135f-d036-4159-bcf3-62d40562d9df.png" alt=""/>

          <text class="grey-line"></text>
          <div class="second_1_2_third">等级</div>
        </div>
      </div>
      <a href="http://shop{$company['id']}.zhenmuwang.com" target="_blank" class="second_1_3">点击进入</a>
    </div>
    <div class="third_2">
      <div class="third_2_space">
        <text class="tab_0" :class="tabItemStore.tabItem*1 === 0 ?'white-color white-underline':''" @click="switchTab(0)">商家简介</text>
        <text>|</text>
        <text class="tab_1" :class="tabItemStore.tabItem*1 === 1 ?'white-color white-underline':''" @click="switchTab(1)">基本信息</text>
        <text>|</text>
        <text class="tab_2" :class="tabItemStore.tabItem*1 === 2 ?'white-color white-underline':''" @click="switchTab(2)">企业动态</text>
        <text>|</text>
        <text class="tab_3" :class="tabItemStore.tabItem*1 === 3 ?'white-color white-underline':''" @click="switchTab(3)">评论</text>
        <text>|</text>
        <text class="tab_4" :class="tabItemStore.tabItem*1 === 4 ?'white-color white-underline':''" @click="switchTab(4)">问答</text>
        <text>|</text>
        <text class="tab_5" :class="tabItemStore.tabItem*1 === 5 ?'white-color white-underline':''" @click="switchTab(5)">投诉</text>
      </div>
    </div>
    <div class="third_4" v-if="tabItemStore.tabItem*1 === 0">
      <div class="third_4_left white-color">
        <div class="third_4_left_1">
          <img class="third_4_left_1_left" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_395067ed-d2f0-4c5b-b2fc-cb322af9cc75.png"/>
          <text class="third_4_left_1_right">商家地址</text>
        </div>
        <div id="container" class="third_4_left_2"></div>
        <!--                <div class="fujin"></div>-->
        <!--                <image class="third_4_left_2" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_e8b85a02-f6f9-4f01-b4c0-92c39128fb2b.png"></image>-->
        <text class="third_4_left_3">公司地址</text>
        <div class="third_4_left_4">
          <div class="third_4_left_4_1">
            <img class="third_4_left_4_1_left" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_13ebe768-2a48-405f-0f6b-6b07e3f776ba.png"/>
            <text class="third_4_left_4_1_right">商品列表</text>
          </div>
        </div>
        <!--                商品列表开始-->
        <div class="third_4_left_5">
          <a class="third_4_left_5_item" href="#" target="_blank">
            <img class="third_4_left_5_item_1" src="#"  alt=""/>
            <div class="third_4_left_5_item_2">
              <div class="third_4_left_5_item_2_top">
                <text class="size-14">¥</text>
                <text class="size-20">34</text>
              </div>
              <text class="third_4_left_5_item_2_bottom white-color">{$item.goods_title}</text>
            </div>
          </a>
          <!--                    <div class="third_4_left_5_item">-->
          <!--                        <image class="third_4_left_5_item_1" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_5bee340a-2839-428f-0edf-476da7441843.png"></image>-->
          <!--                        <div class="third_4_left_5_item_2">-->
          <!--                            <div class="third_4_left_5_item_2_top">-->
          <!--                                <text class="size-14">¥</text>-->
          <!--                                <text class="size-20">87.2</text>-->
          <!--                            </div>-->
          <!--                            <text class="third_4_left_5_item_2_bottom white-color">精品实木松木</text>-->
          <!--                        </div>-->
          <!--                    </div>-->
          <!--                    <div class="third_4_left_5_item">-->
          <!--                        <image class="third_4_left_5_item_1" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_5bee340a-2839-428f-0edf-476da7441843.png"></image>-->
          <!--                        <div class="third_4_left_5_item_2">-->
          <!--                            <div class="third_4_left_5_item_2_top">-->
          <!--                                <text class="size-14">¥</text>-->
          <!--                                <text class="size-20">87.2</text>-->
          <!--                            </div>-->
          <!--                            <text class="third_4_left_5_item_2_bottom white-color">精品实木松木</text>-->
          <!--                        </div>-->
          <!--                    </div>-->
        </div>
      </div>
      <img class="third_4_right" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_57253c6a-7053-4709-b69b-6148dca9969b.png" alt=""/>
    </div>
    <div class="tab_1_space" v-if="tabItemStore.tabItem*1 === 1">
      <table>
        <tr>
          <th>企业名称</th>
          <td>广东广物木材产业股份有限公司</td>
          <th>统一社会信用代码</th>
          <td>91440000079578488R</td>
        </tr>
        <tr>
          <th>法定代表人</th>
          <td>王磊</td>
          <th>登记状态</th>
          <td>在营</td>
        </tr>
        <tr>
          <th>注册时间</th>
          <td>2022-09-08</td>
          <th>注册资本</th>
          <td>8627.98万元人民币</td>
        </tr>
        <tr>
          <th>组织机构代码</th>
          <td>07957848-8</td>
          <th>工商注册号</th>
          <td>440000000103474</td>
        </tr>
        <tr>
          <th>纳税人识别号</th>
          <td>91440000079578488R</td>
          <th>企业类型</th>
          <td>其他股份有限公司（非上市）</td>
        </tr>
        <tr>
          <th>营业期限</th>
          <td>2013-10-11 至 无固定期限</td>
          <th>纳税人资质</th>
          <td>增值税一般纳税人</td>
        </tr>
        <tr>
          <th>人员规模</th>
          <td>少于50人</td>
          <th>参保人数</th>
          <td>12</td>
        </tr>
        <tr>
          <th>核准日期</th>
          <td>2023-04-17</td>
          <th>登记机关</th>
          <td>广东省市场监督管理局</td>
        </tr>
        <tr>
          <th>联系电话</th>
          <td>188********</td>
          <th>所属地区</th>
          <td>广东省广州市黄埔区</td>
        </tr>
        <tr>
          <th>是否失信</th>
          <td>否</td>
          <th>黑名单</th>
          <td>暂无</td>
        </tr>
        <tr>
          <th>处罚公示</th>
          <td>暂无</td>
          <th>投诉记录</th>
          <td>暂无</td>
        </tr>
        <tr>
          <th>诉讼查询</th>
          <td colspan="3">Content 5</td>
        </tr>
        <tr class="last_tr">
          <th>经营范围</th>
          <td colspan="3">Content 5</td>
        </tr>
      </table>
    </div>
    <div class="tab_2_space" v-if="tabItemStore.tabItem*1 === 2">
      <div class="tab_2_space_1">
        <text>全部动态 46</text>
        <div>
          <text>动态类型</text>
          <div>
            <text>全部类型</text>
            <text>工商</text>
            <text>风险</text>
            <text>经营</text>
            <text>招投标</text>
            <text>新闻</text>
          </div>
        </div>
        <div>
          <text>时间选择</text>
          <div>
            <text>全部时间</text>
            <text>今天</text>
            <text>近7天</text>
            <text>近30天</text>
          </div>
        </div>
      </div>
      <table>
        <tr class="table_title">
          <th>动态等级</th>
          <th>动态类型</th>
          <th class="wide-column">动态内容</th>
          <th>更新时间</th>
          <th>操作</th>
        </tr>
        <tr class="table_detail">
          <td>利好</td>
          <td>中标结果</td>
          <td class="wide-column">[终结公告]广东广物木材产业股份有限公司713.99万股</td>
          <td>2022-12-16</td>
          <td>详情</td>
        </tr>
        <tr class="table_detail">
          <td>警示</td>
          <td>新增开庭公告</td>
          <td class="wide-column">开庭时间：2022-10-11</td>
          <td>2022-11-21</td>
          <td>详情</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="second" v-if="tabItemStore.tabItem*1 === 0">
    <img class="third_1" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_ee681ac6-85ab-4998-bdc2-6b95352bbd49.png" alt=""/>
    <div class="second_2">
      <div class="second_2_left">
        <div class="second_2_left_1">
          <text class="second_2_left_1_left">公司名字 > 口碑</text>
          <!--                    <text class="size-10 grey-color">更多</text>-->
        </div>
        <div class="second_2_left_item">
          <div class="second_2_left_2">
            <img class="second_2_left_2_left" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_e9a1e1da-d6e0-4c64-b332-46fd243749db.png"/>
            <div class="second_2_left_2_right">
              <text class="second_2_left_2_right_1">网友</text>
              <text class="second_2_left_2_right_2">网友印象</text>
            </div>
          </div>
          <div class="second_2_left_3">
            <!--                            <div class="second_2_left_3_left_top">-->
            <!--                                <image class="second_2_left_3_left_top_1" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_36acf18d-2d6a-40af-b13d-8c47b50bf32c.png"></image>-->
            <!--                                <image class="second_2_left_3_left_top_2" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_dd28b805-d944-41e0-bdf2-5accbd2976a4.png"></image>-->
            <!--                            </div>-->
            <!--                            <div class="second_2_left_3_left_middle">-->
            <!--                                <text>-->
            <!--                                    货物出现了很严重的质量问题（缺边儿，毛刺，规格不一），客户没办法用这批货物要求退而且还要了货物图片，收到货实物跟图片严重不符-->
            <!--                                    货物出现了很严重的质量问题（缺边儿，毛刺，规格不一），客户没办法用这批货物要求退而且还要了货物图片，收到货实物跟图片严重不符-->
            <!--                                </text>-->
            <!--                            </div>-->
            <!--                            <div class="second_2_left_3_left_bottom">-->
            <!--                                <image class="second_2_left_3_left_bottom_1" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_6a65789d-dffe-4153-b1f2-67739e7e22ec.png"></image>-->
            <!--                                <image class="second_2_left_3_left_bottom_2" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_27118c68-9b62-4833-b540-e14e9019bd80.png"></image>-->
            <!--                            </div>-->
          </div>
        </div>
        <!--                <div class="second_2_left_item">-->
        <!--                    <div class="second_2_left_2">-->
        <!--                        <image class="second_2_left_2_left" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_e9a1e1da-d6e0-4c64-b332-46fd243749db.png"></image>-->
        <!--                        <div class="second_2_left_2_right">-->
        <!--                            <text class="second_2_left_2_right_1">张山山木材加工厂</text>-->
        <!--                            <text class="second_2_left_2_right_2">网友印象</text>-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                    <div class="second_2_left_3">-->
        <!--                        货物出现了很严重的质量问题（缺边儿，毛刺，规格不一），客户没办法用这批货物要求退而且还要了货物图片，收到货实物跟图片严重不符-->
        <!--                            货物出现了很严重的质量问题（缺边儿，毛刺，规格不一），客户没办法用这批货物要求退而且还要了货物图片，收到货实物跟图片严重不符-->
        <!--                    </div>-->
        <!--                </div>-->
        <div class="second_2_left_1 second_2_left_1_margin">
          <text class="second_2_left_1_left">公司名字相关回答</text>
          <!--                    <text class="size-10 grey-color">更多</text>-->
        </div>
        <div class="second_2_left_items">
          <div class="second_2_left_items_top">
            <text class="second_2_left_items_top_1">问</text>
            <text class="second_2_left_items_top_2">商家怎么样呢？货有什么问题吗？</text>
          </div>
          <text class="second_2_left_items_bottom">暂无回答</text>
        </div>
      </div>
      <img class="second_2_right" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_32b3a7b9-6975-4544-b3cd-7c294c699f6b.png" alt=""/>
    </div>
  </div>
  <div class="fourth white-color" v-if="tabItemStore.tabItem*1 === 0">
    <img class="fourth_3" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_35896d5e-f8b3-4301-b1e0-578385e4ee7b.png" alt=""/>
    <div class="fourth_1">
      <div class="fourth_1_left">
        <img class="fourth_1_left_1" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_f6e0be5e-570c-46f5-b946-75a8f54a7a03.png" alt=""/>
        <text class="fourth_1_left_2">动态</text>
      </div>
      <text class="grey-color size-10">更多</text>
    </div>
    <div class="tab_2_space" v-if="tabItemStore.tabItem*1 === 0">
      <table>
        <tr class="table_title">
          <th>动态等级</th>
          <th>动态类型</th>
          <th class="wide-column">动态内容</th>
          <th>更新时间</th>
          <th>操作</th>
        </tr>
        <tr class="table_detail">
          <td>利好</td>
          <td>中标结果</td>
          <td class="wide-column">[终结公告]广东广物木材产业股份有限公司713.99万股</td>
          <td>2022-12-16</td>
          <td>详情</td>
        </tr>
        <tr class="table_detail">
          <td>警示</td>
          <td>新增开庭公告</td>
          <td class="wide-column">开庭时间：2022-10-11</td>
          <td>2022-11-21</td>
          <td>详情</td>
        </tr>
      </table>
    </div>

  </div>
</template>
<style scoped>
.tab_1_space{
  margin-top: 20px;
  width: 58%;
  border-radius: 10px;
  font-size: 15px;
}
.tab_1_space table{
  width: 100%;
  color: #fff;
  border:none;
  border-collapse: collapse;
}
.tab_1_space table tr th{
  padding: 10px;
  background: #5C3B1D;
  border-bottom: 1.5px solid #4D2F13;
}
.tab_1_space table tr td{
  padding: 10px;
  background: #684525;
  border-bottom: 1.5px solid #4D2F13;
}
.last_tr{
  border-bottom:none;
}
.tab_2_space{
  margin-top: 20px;
  width: 58%;
  border-radius: 10px;
}
.tab_2_space table{
  width: 100%;
  color: #fff;
  border-collapse: collapse;
}
.tab_2_space table td, table th {
  text-align: center; /* 设置内容居中 */
}

.tab_2_space table td:nth-child(3), table th:nth-child(3) {
  text-align: left; /* 设置第三列的内容左对齐 */
}
.tab_2_space table tr:first-child td {
  border-top: none;
}
.tab_2_space table .table_title{
  background: #5C3B1D;
}
.tab_2_space table tr th{
  padding: 10px;
}
.tab_2_space table tr td{
  padding: 10px;
}
.tab_2_space table .table_detail{
  background: #684525;
}
.tab_2_space table .wide-column{
  width: 50%;
}
.first{
  width: 100%;
  height: 400px;
  background-color: #3F1E00;
}
.second{
  width: 100%;
  background: #00133F;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.third .second_1{
  margin-top: -90px;
  width: 58%;
  background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_54178852-78ca-42ee-b66a-def56d87313c.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 0;
}
.third .second_1 .second_1_1{
  color:#707070;
  font-weight: bolder;
  font-size: 20px;
}
.third .second_1 .second_1_2{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
}
.third .second_1 .second_1_2 .second_1_2_item{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 5%;
  width: 30%;
}
.third .second_1 .second_1_2 .second_1_2_first{
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.third .second_1 .second_1_2 .second_1_2_item .second_1_2_item_middle{
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.third .second_1 .second_1_2 .second_1_2_item .second_1_2_item_middle .second_1_2_item_middle_number{
  display: flex;
  padding: 2px 8px;
  font-size: 50px;
  font-weight: 600;
  background-color: #E21B00;
  color: #fff;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  font-family: system-ui;
}
.third .second_1 .second_1_3{
  display: flex;
  background: #FF834E;
  color: #fff;
  align-items: center;
  justify-content: center;
  padding: 10px 50px;
  border-radius: 50px;
  margin-bottom: 30px;
}
.grey-line{
  width: 80%;
  height: 1px;
  border-top: solid #CFCFCF 1px;
  margin: 10px 0;
}
.red_solid_circle{
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: #E21B00;
  margin: 5px 2px;
}
.second .second_2{
  width: 68%;
  margin-top: 20px;
  margin-left: 12%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: #fff;
  padding-bottom: 20px;
}
.second .second_2 .second_2_left{
  display: flex;
  flex-direction: column;
  width: 50%;
}
.second .second_2 .second_2_left .second_2_left_1{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}
.second .second_2 .second_2_left .second_2_left_1 .second_2_left_1_left{
  font-size: 16px;
}
.second .second_2 .second_2_left .second_2_left_item{
  margin-top: 20px;
}
.second .second_2 .second_2_left .second_2_left_item .second_2_left_2{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.second .second_2 .second_2_left .second_2_left_item .second_2_left_2 .second_2_left_2_left{
  width: 60px;
  height: 60px;
}
.second .second_2 .second_2_left .second_2_left_item .second_2_left_2 .second_2_left_2_right{
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.second .second_2 .second_2_left .second_2_left_item .second_2_left_2 .second_2_left_2_right .second_2_left_2_right_1{
  font-size: 14px;
}
.second .second_2 .second_2_left .second_2_left_item .second_2_left_2 .second_2_left_2_right .second_2_left_2_right_2{
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background-color: #995319;
  border-radius: 50px;
  margin-top: 5px;
}
.second .second_2 .second_2_left .second_2_left_items{
  display: flex;
  flex-direction: column;
}
.second .second_2 .second_2_left .second_2_left_items .second_2_left_items_top{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: 20px;
}
.second .second_2 .second_2_left .second_2_left_items .second_2_left_items_top .second_2_left_items_top_1{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 3px 2px 2px;
  background-color: #FF8C1B;
  color: #fff;
  border-radius: 5px;
  font-size: 12px;
}
.second .second_2 .second_2_left .second_2_left_items .second_2_left_items_top .second_2_left_items_top_2{
  margin-left: 10px;
}
.second .second_2 .second_2_left .second_2_left_items .second_2_left_items_bottom{
  background: #008aff;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  /*background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_0efc2dc0-ef82-4dad-b906-10772e2f93f0.png");*/
}
.second .second_2 .second_2_left_3{
  /*display: flex;*/
  /*flex-direction: column;*/
  background: #008aff;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
}
.second .second_2 .second_2_left_3 .second_2_left_3_left_top{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.second .second_2 .second_2_left_3 .second_2_left_3_left_top .second_2_left_3_left_top_1{
  width: 50px;
}
.second .second_2 .second_2_left_3 .second_2_left_3_left_top .second_2_left_3_left_top_2{
  flex: 1;
  height: 9.5px;
}
.second .second_2 .second_2_left_3 .second_2_left_3_left_middle{
  flex: 1;
  background: url(https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_2257c950-697d-4940-bd9c-d338919365c7.png) no-repeat;
  background-size: 100% 100%;
  padding: 5px 0 0 15px;
}
.second .second_2 .second_2_left_3 .second_2_left_3_left_bottom{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.second .second_2 .second_2_left_3 .second_2_left_3_left_bottom .second_2_left_3_left_bottom_1{
  width: 50px;
}
.second .second_2 .second_2_left_3 .second_2_left_3_left_bottom .second_2_left_3_left_bottom_2{
  flex:1;
  height: 11px;
}
.second .second_2 .second_2_left_1_margin{
  margin-top: 30px;
}
.second .second_2 .second_2_right{
  height: 100%;
  width: 50%;
}
.third{
  width: 100%;
  background: #3F1E00;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 20px;
}
.third_1{
  width: 58%;
  margin-top: 20px;
}
.third .third_2{
  width: 58%;
  margin-top: 20px;
}
.third .third_2 .third_2_space{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background:linear-gradient(to bottom,#B3641B,#7C3D04);
  color:#C38C5A;
  padding: 10px;
  border-radius: 10px;
  cursor:pointer;
}
.white-color{
  color: #fff;
}
.white-underline{
  border-bottom: 2px solid #fff;
}
.third .third_3{
  width: 58%;
  background: #684525;
  margin-top: 20px;
  border-radius: 10px;
}
.third .third_3 .third_3_space{
  padding:20px;
  color: #F6F4F2;
}
.third .third_4{
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 68%;
  margin-left: 10%;
}
.third .third_4 .third_4_left{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 50%;
}
.third .third_4 .third_4_left .third_4_left_1{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.third .third_4 .third_4_left .third_4_left_1 .third_4_left_1_left{
  width: 25px;
  height: 25px;
}
.third .third_4 .third_4_left .third_4_left_1 .third_4_left_1_right{
  margin-left: 10px;
}
.third .third_4 .third_4_left .third_4_left_2{
  width: 100%;
  height: 100%;
  margin-top: 10px;
  border-radius: 10px;
}
.third .third_4 .third_4_left .third_4_left_3{
  margin-top: 10px;
}
.third .third_4 .third_4_left .third_4_left_4{
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}
.third .third_4 .third_4_left .third_4_left_4 .third_4_left_4_1{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.third .third_4 .third_4_left .third_4_left_4 .third_4_left_4_1 .third_4_left_4_1_left{
  width: 25px;
  height: 25px;
}
.third .third_4 .third_4_left .third_4_left_4 .third_4_left_4_1 .third_4_left_4_1_right{
  margin-left: 10px;
}
.third .third_4 .third_4_left .third_4_left_5{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.third .third_4 .third_4_left .third_4_left_5 .third_4_left_5_item{
  margin: 20px 5px 0 5px;
  display: flex;
  flex-direction: column;
  width: 30%;
}
.third .third_4 .third_4_left .third_4_left_5 .third_4_left_5_item .third_4_left_5_item_1{
  width: 100%;
  height: 100px;
}
.third .third_4 .third_4_left .third_4_left_5 .third_4_left_5_item .third_4_left_5_item_2{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  background: #684525;
  padding: 5px 5px 5px 0;
}
.third .third_4 .third_4_left .third_4_left_5 .third_4_left_5_item .third_4_left_5_item_2 .third_4_left_5_item_2_top{
  color: #FFE400;
}
.third .third_4 .third_4_left .third_4_left_5 .third_4_left_5_item .third_4_left_5_item_2 .third_4_left_5_item_2_bottom{
  font-size: 14px;
}
.size-14{
  font-size: 14px;
}
.size-20{
  font-size: 20px;
}
.third .third_4 .third_4_right{
  margin-left: 20px;
  height: 100%;
  width: 50%;
}
.fourth{
  width: 100%;
  background: #3F3A00;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}
.fourth .fourth_1{
  width: 58%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 20px;
}
.fourth .fourth_1 .fourth_1_left{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.fourth .fourth_1 .fourth_1_left .fourth_1_left_1{
  width: 25px;
  height: 25px;
}
.fourth .fourth_1 .fourth_1_left .fourth_1_left_2{
  margin-left: 10px;
}
.fourth .fourth_2{
  width: 58%;
  display: flex;
  flex-direction: column;
}
.fourth_2_space{
  display: flex;
  flex-direction: column;
}
.fourth .fourth_2 .fourth_2_item{
  margin-top: 20px;
}
.fourth .fourth_2 .fourth_2_3{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.fourth .fourth_2 .fourth_2_3 .fourth_2_3_right{
  background: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_974f0e77-0c58-4cc4-bdb8-564a3a4e7f2b.png") round;
  padding: 10px 5px 10px 10px;
  margin-left: 10px;
}
.fourth .fourth_3{
  margin-top: 20px;
  width: 58%;
  height: 200px;
}
.grey-color{
  color: #B8B8B8;
}
.size-10{
  font-size: 10px;
}
.fifth{
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
}
.fifth .fifth_1{
  width:58%;
  margin-top: 20px;
}
.fifth .fifth_2{
  width: 58%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.fifth .fifth_2 .fifth_2_item{
  margin-left: 20px;
  margin-top: 20px;
}
.zero{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
<script setup lang="ts">
import { ref } from 'vue'
const route = useRoute();

import { useTabItemStore } from "~/pinia/tabItem";
const tabItemStore = useTabItemStore();
console.log(tabItemStore.tabItem);
const switchTab = (item :number) => {
  tabItemStore.tabItem = item;
  console.log(tabItemStore.tabItem);
}
</script>
