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
    </div>
    <div class="third_2">
      <client-only>
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
      </client-only>
    </div>
    <div class="third_4" v-if="tabItemStore.tabItem*1 === 0">
      <div class="third_4_left white-color">
        <div class="third_4_left_1">
          <img class="third_4_left_1_left" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_b1e32456-293f-44db-bae5-62a5749d9b5b.png"  alt=""/>
          <text class="third_4_left_1_right">企业简介</text>
        </div>
        <div class="third_4_left_1_detail">
          <div class="third_4_left_1_detail_1">
            <text>张珊珊的木材加工厂</text>
          </div>
          <div class="third_4_left_1_detail_2">
            <div class="third_4_left_1_detail_2_1">
              <div class="third_4_left_1_detail_2_1_item">
                <text>法定代表人：张姗姗</text>
                <text class="margin-10-top">注册时间：2022-10-09</text>
              </div>
              <div class="third_4_left_1_detail_2_1_item">
                <text>联系方式：139********</text>
                <text class="margin-10-top">注册资本：89万元</text>
              </div>
            </div>
            <div class="third_4_left_1_detail_2_1 margin-10-top">
              <text class="third_4_left_1_detail_2_1_1">经营范围：</text>
              <text class="third_4_left_1_detail_2_1_2">原木、锯材及木制品的销售；家居装饰；木材仓储，木材加工，木材研发，木材检测，木材及制品的展示 展销、信息咨询、技术服务 ，物流配送</text>
            </div>
          </div>
        </div>
<!--        <div id="container" class="third_4_left_2"></div>-->

        <!--                <div class="fujin"></div>-->
        <!--                <image class="third_4_left_2" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_e8b85a02-f6f9-4f01-b4c0-92c39128fb2b.png"></image>-->
<!--        <text class="third_4_left_3">公司地址</text>-->
        <div class="third_4_left_4">
          <div class="third_4_left_4_1">
            <img class="third_4_left_4_1_left" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_395067ed-d2f0-4c5b-b2fc-cb322af9cc75.png" alt="商家地址图标"/>
            <text class="third_4_left_4_1_right">商家地址</text>
          </div>
          <text class="third_4_left_4_2">附近商家 ></text>
        </div>
        <client-only><baidu-map class="map" :center="{lng: 118.906004, lat: 33.962873}" :zoom="5" @ready="ready" ></baidu-map></client-only>
        <div class="map_address">
          <svg class="icon" viewBox="0 0 1024 1024" width="200" height="200"><path d="M513.8 63.4C327.2 63.4 173 221.2 173 414.9c0 186.5 304.9 520.2 319.3 534.5 3.6 7.2 14.3 10.8 21.5 10.8s17.9-3.6 21.5-10.8l104-125.6C779.2 644.5 851 508.2 851 414.9c3.6-193.7-150.7-351.5-337.2-351.5z m0 513c-86.1 0-154.3-71.7-154.3-161.4s68.2-161.4 154.3-161.4S668 325.3 668 414.9s-68.1 161.5-154.2 161.5z" fill="#ffffff"></path></svg>
          <text>沭阳县钱集镇南槽坊村村部</text>
        </div>
      </div>
      <img class="third_4_right" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_57253c6a-7053-4709-b69b-6148dca9969b.png" alt=""/>
    </div>
    <div class="tab_0_space light_brown" v-if="tabItemStore.tabItem*1 === 0">
      东莞市大岭山木之源包装有限公司，是从事木业十多年的厂家，是一家主业生产木托盘、出口托盘、木包装箱、塑料托盘、纸托盘、纸护角、拉伸缠绕膜、打包带等包装仓储物流用包装制品的企业。东莞市大岭山木之源包装有限公司，是从事木业十多年的厂家，是一家主业生产木托盘、出口托盘、木包装箱、塑料托盘、纸托盘、纸护角、拉伸缠绕膜、打包带等包装仓储物流用包装制品的企业。东莞市大岭山木之源包装有限公司，是从事木业十多年的厂家，是一家主业生产木托盘、出口托盘、木包装箱、塑料托盘、纸托盘、纸护角、拉伸缠绕膜、打包带等包装仓储物流用包装制品的企业。
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
        <div class="horizontal_line"></div>
        <div class="choose_item">
          <text class="choose_title">动态类型</text>
          <div class="choose_detail">
            <text>全部类型</text>
            <text>工商</text>
            <text>风险</text>
            <text>经营</text>
            <text>招投标</text>
            <text>新闻</text>
          </div>
        </div>
<!--        <div class="choose_item">-->
<!--          <text class="choose_title">工商动态</text>-->
<!--          <div class="choose_detail">-->
<!--            <text>全部</text>-->
<!--            <text>法定代表人变更</text>-->
<!--            <text>主要成员变更</text>-->
<!--            <text>股东变更</text>-->
<!--            <text>大股东变更</text>-->
<!--            <text>实际控制人变更</text>-->
<!--            <text>最终受益人变更</text>-->
<!--            <text>对外投资人变更</text>-->
<!--            <text>注册资本变更</text>-->
<!--            <text>经营范围变更</text>-->
<!--            <text>经营状态变更</text>-->
<!--            <text>企业名称变更变更</text>-->
<!--          </div>-->
<!--        </div>-->
        <div class="choose_item">
          <text class="choose_title">时间选择</text>
          <div class="choose_detail">
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
          <td class="green_classify">利好</td>
          <td>中标结果</td>
          <td class="wide-column">[终结公告]广东广物木材产业股份有限公司713.99万股</td>
          <td>2022-12-16</td>
          <td>详情</td>
        </tr>
        <tr class="table_detail">
          <td class="pink_classify">警示</td>
          <td>新增开庭公告</td>
          <td class="wide-column">开庭时间：2022-10-11</td>
          <td>2022-11-21</td>
          <td>详情</td>
        </tr>
        <tr class="table_detail">
          <td class="blue_classify">提示</td>
          <td>新增企业公告</td>
          <td class="wide-column">公告名称：[临时公告]广物木材:董事、监事换届公告<br/> 公告日期：2022-09-18<br/> 公告名称：[临时公告]广物木材:监事换届公告<br/>  公告日期：2022-09-18</td>
          <td>2022-11-21</td>
          <td>详情</td>
        </tr>
        <tr class="table_detail">
          <td class="blue_classify">提示</td>
          <td>新增企业公告</td>
          <td class="wide-column">公告名称：[临时公告]广物木材:董事、监事换届公告<br/> 公告日期：2022-09-18<br/> 公告名称：[临时公告]广物木材:监事换届公告<br/>  公告日期：2022-09-18</td>
          <td>2022-11-21</td>
          <td>详情</td>
        </tr>
        <tr class="table_detail">
          <td class="red_classify">高风险</td>
          <td>被列入严重执法</td>
          <td class="wide-column">列入原因: 未依照《企业信息公示暂行条例》第八条规定的期限公示年度报告<br/>
            列入日期: 2021-06-11</td>
          <td>2022-11-21</td>
          <td>详情</td>
        </tr>
      </table>
    </div>
    <div class="tab_3_space" v-if="tabItemStore.tabItem*1 === 3">
      <div class="tab_3_space_1">
        <text>全部评价（{{company_comment_count}}）</text>
        <Tag tag="写评论" number="41" color="orange"></Tag>
      </div>
      <NoDetail v-if="company_comment_count < 0"></NoDetail>
      <div class="tab_3_space_2" v-else>
        <comment></comment>
      </div>
    </div>
  </div>
  <div class="second" v-if="tabItemStore.tabItem*1 === 0">
    <img class="third_1" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_ee681ac6-85ab-4998-bdc2-6b95352bbd49.png" alt=""/>
    <div class="second_2">
      <div class="second_2_left">
        <div class="second_2_left_1">
          <text class="second_2_left_1_left">张珊珊加工厂口碑</text>
          <!--                    <text class="size-10 grey-color">更多</text>-->
        </div>
        <div class="second_2_left_item">
          <div class="second_2_left_2">
            <img class="second_2_left_2_left" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_e9a1e1da-d6e0-4c64-b332-46fd243749db.png"/>
            <div class="second_2_left_2_right">
              <text class="second_2_left_2_right_1">网友</text>
            </div>
          </div>
          <text>货物出现了很严重的质量问题（缺边、毛刺、规格不一）客户没办法用这批货要求退而且
            要了货物图片，收到货实物跟图片严重不符）</text>
        </div>
        <div class="second_2_left_item">
          <div class="second_2_left_2">
            <img class="second_2_left_2_left" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_e9a1e1da-d6e0-4c64-b332-46fd243749db.png"/>
            <div class="second_2_left_2_right">
              <text class="second_2_left_2_right_1">网友</text>
            </div>
          </div>
          <text>货物出现了很严重的质量问题（缺边、毛刺、规格不一）客户没办法用这批货要求退而且
            要了货物图片，收到货实物跟图片严重不符）</text>
        </div>
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
    <div class="tab_0_space" v-if="tabItemStore.tabItem*1 === 0">
      <table class="green">
        <tr class="table_title">
          <th>动态等级</th>
          <th>动态类型</th>
          <th class="wide-column">动态内容</th>
          <th>更新时间</th>
          <th>操作</th>
        </tr>
        <tr class="table_detail">
          <td class="green_classify">利好</td>
          <td>中标结果</td>
          <td class="wide-column">[终结公告]广东广物木材产业股份有限公司713.99万股</td>
          <td>2022-12-16</td>
          <td>详情</td>
        </tr>
        <tr class="table_detail">
          <td class="pink_classify">警示</td>
          <td>新增开庭公告</td>
          <td class="wide-column">开庭时间：2022-10-11</td>
          <td>2022-11-21</td>
          <td>详情</td>
        </tr>
        <tr class="table_detail">
          <td class="blue_classify">提示</td>
          <td>新增企业公告</td>
          <td class="wide-column">公告名称：[临时公告]广物木材:董事、监事换届公告<br/> 公告日期：2022-09-18<br/> 公告名称：[临时公告]广物木材:监事换届公告<br/>  公告日期：2022-09-18</td>
          <td>2022-11-21</td>
          <td>详情</td>
        </tr>
        <tr class="table_detail">
          <td class="blue_classify">提示</td>
          <td>新增企业公告</td>
          <td class="wide-column">公告名称：[临时公告]广物木材:董事、监事换届公告<br/> 公告日期：2022-09-18<br/> 公告名称：[临时公告]广物木材:监事换届公告<br/>  公告日期：2022-09-18</td>
          <td>2022-11-21</td>
          <td>详情</td>
        </tr>
        <tr class="table_detail">
          <td class="red_classify">高风险</td>
          <td>被列入严重执法</td>
          <td class="wide-column">列入原因: 未依照《企业信息公示暂行条例》第八条规定的期限公示年度报告<br/>
            列入日期: 2021-06-11</td>
          <td>2022-11-21</td>
          <td>详情</td>
        </tr>
      </table>
      <text class="green_tip">查查木材商企业动态数据基于公开数据分析而成，仅作参考，不作为个人决策及媒体引用的依据，查查木材商亦不承担因此产生的任何后果</text>
    </div>

  </div>
</template>
<style scoped>
.tab_3_space_1{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.icon{
  width: 20px;
  height: 20px;
}
.map_address{
  font-size: 14px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}
.map_address text{
  margin-left: 5px;
}
.map {
  margin-top: 10px;
  width: 466px;
  height: 300px;
}
.light_brown{
  background: #684525;
  padding: 10px 20px;
}
.choose_item{
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  font-size: 14px;
}
.choose_title{
  color: #999999;
}
.choose_detail{
  margin-left: 20px;
  color: #fff;
  display: flex;
  flex-direction: row;
}
.choose_detail text{
  margin: 0 5px;
}
.horizontal_line{
  height: 2px;      /* 线的厚度 */
  background: #3F1E00;  /* 线的颜色 */
  width: 100%;       /* 线的宽度 */
  margin: 10px 0;
}
.tab_2_space_1{
  background: #684525;
  border-radius: 10px;
  padding: 20px;
}
.green_tip{
  color: #847C1C;
  font-size: 12px;
}
.green_classify{
  color: #00AD79;
}
.blue_classify{
  color: #6FD5FF;
}
.pink_classify{
  color: #FF6F6F;
}
.red_classify{
  color: #FF3535;
}
.third_4_left_1_detail{
  width: 100%;
  margin-top: 20px;
}
.third_4_left_1_detail_1{
  background: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_94fceb32-91cb-4731-beed-643c1fde67e9.png");
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 70px;
  font-size: 20px;
}
.third_4_left_1_detail_2{
  margin-top:2px;
  display: flex;
  flex-direction: column;
  background-color: #684525;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 20px;
  font-size: 14px !important;
}
.third_4_left_1_detail_2_1{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.third_4_left_1_detail_2_1_item{
  display: flex;
  flex-direction: column;
}
.third_4_left_1_detail_2_1_1{
  width: 70px;
}
.third_4_left_1_detail_2_1_2{
  flex: 1;
}
.tab_1_space{
  margin-top: 20px;
  width: 58%;
  border-radius: 10px;
  font-size: 15px;
}
.tab_1_space table{
  width: 100%;
  color: #fff;
  border:none !important;
  border-collapse: collapse !important;
}
.tab_1_space table tr th{
  padding: 10px;
  background: #5C3B1D;
  border: 1.5px solid #4D2F13 !important;
}
.tab_1_space table tr td{
  padding: 10px;
  background: #684525;
  border: 1.5px solid #4D2F13 !important;
}
.last_tr{
  border-bottom:none;
}
.tab_2_space,.tab_0_space,.tab_3_space{
  margin-top: 20px;
  width: 58%;
  border-radius: 10px;
}
.tab_2_space table{
  width: 100%;
  color: #fff;
  border-collapse: collapse;
  border: none !important;
  margin-top: 20px;
}
.tab_2_space table td, table th {
  text-align: center; /* 设置内容居中 */
}
.tab_0_space table td, table th {
  text-align: center; /* 设置内容居中 */
}
.tab_2_space table td:nth-child(3), table th:nth-child(3) {
  text-align: left; /* 设置第三列的内容左对齐 */
}
.tab_0_space table td:nth-child(3), table th:nth-child(3){
  text-align: left; /* 设置第三列的内容左对齐 */
}
.tab_2_space table tr:first-child td,.tab_0_space table tr:first-child td {
  border-top: none;
}
.tab_0_space .green{
  font-size: 14px !important;
  border: 1px solid #474101 !important;
  width: 100%;
  color: #fff;
  border-collapse: collapse;
}
.tab_0_space .green th,td{
  border: 1.5px solid #474101 !important;
}
.tab_0_space .green .table_title{
  background: #605902 !important;
}
.tab_2_space table .table_title{
  background: #5C3B1D;
}
.tab_2_space table tr th,.tab_0_space table tr th{
  padding: 10px;
}
.tab_2_space table tr td,.tab_0_space table tr td{
  padding: 10px;
}
.tab_2_space table tr td{
  border: 1.5px solid #563619 !important;
}
.tab_0_space table.green .table_detail{
  background: #534D05 !important;
}
.tab_2_space table .table_detail,.tab_0_space table .table_detail{
  background: #684525;
}
.tab_2_space table .wide-column,.tab_0_space table .wide-column{
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
  color: #000;
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
.grey-line{
  width: 80%;
  height: 1px;
  border-top: solid #CFCFCF 1px;
  margin: 10px 0;
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
  background: linear-gradient(#3E98F6, #1B62B8);
  border-radius: 10px;
  padding: 10px;
}
.second .second_2 .second_2_left .second_2_left_item .second_2_left_2{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.second .second_2 .second_2_left .second_2_left_item .second_2_left_2 .second_2_left_2_left{
  width: 35px;
  height: 35px;
}
.second .second_2 .second_2_left .second_2_left_item .second_2_left_2 .second_2_left_2_right{
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.second .second_2 .second_2_left .second_2_left_item .second_2_left_2 .second_2_left_2_right .second_2_left_2_right_1{
  font-size: 14px;
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
.third .third_4 .third_4_left_4_2{
  font-size: 14px;
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
</style>
<script setup lang="ts">
// import { ref } from 'vue';
import { useTabItemStore } from "~/pinia/tabItem";
import {BaiduMap} from "vue-baidu-map-3x";
const tabItemStore = useTabItemStore();
console.log(tabItemStore.tabItem);
const switchTab = (item :number) => {
  tabItemStore.tabItem = item;
  console.log(tabItemStore.tabItem);
}

const ready = ({ BMap , map }: { BMap: any, map: any })=>{
  // 对地图进行自定义操作
}
//评论开始
const company_comment_count = 887;
//评论结束
</script>
