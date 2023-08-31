<style scoped>
.tab_3_space_2{
  margin-top: 20px;
}
.tab_3_space_3{
  width: 90%;
  margin-top: 65px;
  background: #582D06;
  border-radius: 10px;
  height: auto;
  display: flex;
  flex-direction: column;
}
.right_display{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.red-bg{
  background: #FF4E54;
}
.question_item_1_display,.answer_item_1_display{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.question_item_display,.answer_item_display{
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(#3E98F6, #1B62B8);
  border-radius: 10px;
  margin-top: 20px;
}
.answer_item_display::before{
  content: '';
  position: absolute;
  right: 0;
  bottom: -12px;
  width: 0;
  height: 0;
  border-right: 20px solid #226ec5; /* 控制箭头的宽度 */
  border-bottom: 20px solid transparent; /* 控制箭头的高度 */
}
.question_item_display::before{
  content: '';
  position: absolute;
  left: 0; /* 这会将箭头紧靠在对话框的左侧 */
  bottom: -12px; /* 这会将箭头放在对话框的下方 */
  width: 0;
  height: 0;
  border-left: 20px solid #226ec5; /* 控制箭头的宽度 */
  border-bottom: 20px solid transparent; /* 控制箭头的高度 */
}

.little_time{
  font-size: 8px;
  font-weight: 300;
}
.little_item{
  padding: 0 !important;
  font-size: 14px !important;
}
.tab_4_space_4_1_2,.tab_3_space_4_1_2,.tab_5_space_4_1_2{
  font-size: 14px;
  margin-top: 5px;
}
.border-padding{
  padding: 2px 3px 3px 2px;
  border-radius: 5px;
  font-size: 8px;
}
.tab_4_space_4_2,.tab_3_space_4_2,.tab_5_space_4_2{
  margin: 10px 0 5px 0;
  font-size: 14px !important;
}
.little_margin{
  margin: 5px 0 5px 0 !important;
}
.tab_4_space_4_1,.tab_3_space_4_1,.tab_5_space_4_1{
  background: linear-gradient(to right,#874B14,#582D06);
  padding: 10px;
  border-radius: 10px;
}
.tab_4_space_4,.tab_3_space_4,.tab_5_space_4{
  padding: 0 10px 10px 10px;
}
.right_title{
  align-self: center;
  margin: 20px 0;
}
.tab_3_space,.tab_4_space,.tab_5_space{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.tab_3_space_left,.tab_4_space_left,.tab_5_space_left{
  width: 21%;
}
.tab_3_space_right,.tab_4_space_right,.tab_5_space_right{
  width: 21%;
  display: flex;
  justify-content: center;
}
.tab_5_space_3{
  width: 90%;
  margin-top: 20px;
  background: #582D06;
  border-radius: 10px;
  height: auto;
  display: flex;
  flex-direction: column;
}
.tab_4_space_3{
  width: 90%;
  margin-top: 64px;
  background: #582D06;
  border-radius: 10px;
  height: auto;
  display: flex;
  flex-direction: column;
}
.tab_3_space_1,.tab_4_space_1{
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
  font-size: clamp(12px,1vw,14px);
}
.map {
  margin-top: 10px;
  width: 100%;
  height: 100%;
}
.light_brown{
  background: #684525;
  padding: 10px 20px;
  font-size: clamp(14px,1.2vw,16px);
}
.choose_item{
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  font-size: 14px;
}
.choose_title{
  color: #999999;
  width: 59px;
}
.choose_detail{
  flex:1;
  margin-left: 20px;
  color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.chose{
  border: 1px solid #FF834E;
  border-radius: 5px;
  color: #FF834E;
}
.choose_detail text{
  padding: 2px 5px;
  margin: 0 10px 5px 0;
  white-space: nowrap;
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
.tab_2_space,.tab_0_space,.tab_3_space_middle,.tab_4_space_middle,.tab_5_space_middle{
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
.second_1_2_third{
  font-size: clamp(12px, 1.2vw, 16px);
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
.second .second_2{
  width: 68%;
  margin-top: 20px;
  margin-left: 10%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
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
.second .second_2 .second_2_left_1_margin{
  margin-top: 15px;
}
.second .second_2 .second_2_right{
  height: 100%;
  width: 46%;
  margin-left: 50px;
  margin-bottom: 12px;
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
.third_2{
  width: 58%;
  margin-top: 20px;
}
.third_2_space{
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
  font-size: clamp(14px,1.1vw,16px);
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
<style scoped>
.tab_{
  font-size: clamp(14px, 1.2vw,16px);
  //padding: 20px 40px;
  //margin: -20px -40px;
  transition: background-color 0.3s;
}
/* 默认样式：假设PC端屏幕宽度大于768px，我们首先隐藏第二个img */
.first_2{
  display: none;
}
.mobile{
  display: none;
}
.white-underline {
  position: relative;
  display: inline-block;
  font-size: 16px !important;
}
.white-underline::after {
  content: ''; /* 为伪元素设置内容 */
  position: absolute;
  bottom: -10px; /* 控制下划线与文本的距离。此处设置为5px，你可以根据需要调整 */
  left: 0; /* 从左边开始 */
  width: 100%; /* 下划线宽度与文本内容对齐 */
  height: 2px; /* 设置下划线的高度 */
  background-color: white; /* 下划线颜色 */
}
/* 当屏幕宽度小于或等于768px时，即移动端 */
@media (max-width: 768px) {
  .third .second_1 .second_1_1 {
    margin-top: 10px;
    color: #333333;
    letter-spacing: 1.5px;
  }
  /* 隐藏第一个img */
  .first img:nth-child(1) {
    display: none;
  }
  .first{
    height: auto;
  }
  /* 显示第二个img */
  .first_2 {
    display: block;
  }
  .third .second_1{
    margin-top: -40px;
    width: 94%;
    background-image: url("https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_a27b2d45-6b65-4208-b159-31cf256bd2fb.png");
  }
  .computer{
    display: none !important;
  }
  .mobile{
    display: flex !important;
  }
  .third_2 {
    width: 94%;
    margin-top: 5px;
  }
  .third_2_space{
    width: 100%;
  }
  .tab_{
    color: #ECECEC;
  }
  .white-underline {
    position: relative;
    display: inline-block;
    font-size: 16px !important;
  }
  .white-underline::after {
    content: ''; /* 为伪元素设置内容 */
    position: absolute;
    bottom: -10px; /* 控制下划线与文本的距离。此处设置为5px，你可以根据需要调整 */
    left: 0; /* 从左边开始 */
    width: 100%; /* 下划线宽度与文本内容对齐 */
    height: 2px; /* 设置下划线的高度 */
    background-color: #EBC284;
  }
  .third .third_4 {
    margin-top: 10px;
    width: 100%;
    margin-left: 0;
  }
  .third .third_4 .third_4_left{
    width: 100%;
    margin-left: 3%;
  }
  .third .third_4 .third_4_right {
    margin-left: 5px;
    height: 100%;
    width: 40%;
  }
  .third .third_4 .third_4_left .third_4_left_4{
    margin: 0;
  }
  .third .third_4 .third_4_left .third_4_left_4 .third_4_left_4_1 .third_4_left_4_1_left {
    width: 20px;
    height: 20px;
  }
  .tab_2_space, .tab_0_space, .tab_3_space_middle, .tab_4_space_middle, .tab_5_space_middle {
    margin-top: 20px;
    width: 94%;
    border-radius: 10px;
  }
  .light_brown[data-v-dfbaac98] {
    padding: 10px 10px 10px 10px;
    margin-top: 10px !important;
  }
  .clamp-text {
    position: relative;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    cursor: pointer;
  }

  .clamp-text.expanded {
    -webkit-line-clamp: unset;
    -webkit-box-orient: unset;
  }
  .clamp-text:not(.expanded)::before {
    content: "...";
    position: absolute;
    right: 5vw;  /* 根据"更多"的实际宽度进行调整 */
    bottom: 0;
    color: white;
    background-color: #684525;  /* 设置为父元素的背景颜色 */
    white-space: nowrap;
  }
  .clamp-text:not(.expanded)::after {
    content: "更多";
    position: absolute;
    right: 0;
    bottom: 0;
    color: #FF7E00;
    background-color: #684525;  /* Set this to the background color of the parent element */
    text-align: right;
    padding-left: 5px;  /* space for ellipsis */
    white-space: nowrap;
  }
  .third_1{
    margin-top: 3%;
    width: 94%;
  }
  .blue-tab{
    background: linear-gradient(to bottom, #3B94F1, #095EB9);
  }
  .blue-underline {
    position: relative;
    display: inline-block;
    font-size: 16px !important;
  }
  .blue-underline::after {
    content: ''; /* 为伪元素设置内容 */
    position: absolute;
    bottom: -10px; /* 控制下划线与文本的距离。此处设置为5px，你可以根据需要调整 */
    left: 0; /* 从左边开始 */
    width: 100%; /* 下划线宽度与文本内容对齐 */
    height: 2px; /* 设置下划线的高度 */
    background-color: #58AAFF;
  }
  .fifth{
    width: 94%;
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }
  .fifth_1{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 14px;
  }
  .fifth_1_left img{
    width: 20px;
    height: 20px;
  }
  .fifth_1 .fifth_1_left{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .fifth_2{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    justify-content: space-between;
  }
  .fifth_2_1{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #532B07;
    padding: 10px;
  }

  .fifth_2_2{
    background-color: #4B2604;
    padding: 10px;
    display: flex;          /* 使用 Flexbox 布局 */
    flex-direction: column; /* 主轴方向从上到下 */
    width: 100%;            /* 占据全部可用宽度 */
  }
  .fifth_2_2_left{
    word-wrap: break-word;  /* 如果文本过长，允许换行 */
    flex: 1;                /* 允许该元素扩展，占据尽可能多的空间 */
  }
  .fifth_2_2_right{
    align-self: flex-end;
    color: #E58A38;
  }
  .six{
    width: 94%;
    border-radius: 10px;
    margin-top: 20px;
  }
  .six_table{
    width: 100%;
    border-radius: 10px;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
    font-size: 13px;
  }
  .six td{
    border: none !important;
    padding: 10px 10px 10px 15px;
  }
  .six tr td:nth-child(1) {
    background-color: #532B07;
  }
  .left_width_1 td:nth-child(1){
    width: 100px;
  }
  .left_width_2 td:nth-child(1){
    width: 130px;
  }
  .left_width_3 td:nth-child(1){
    width: 100px;
  }
  .eight{
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .eight_item{
    font-size: 13px;
    padding: 10px;
  }
  .eight_1{
    display: flex;
    flex-direction: column;
    width: 40%;
    background-color: #683A10;
  }
  .selected_category{
    background-color: #5B3009;
    color: #FF9B40;
  }
  .eight_2{
    display: flex;
    flex-direction: column;
    background-color: #5B3009;
    flex:1;
  }
  /* 选择每一行的第二个td */
  .six tr td:nth-child(2) {
    background-color: #4B2604;
  }
  .seven{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 94%;
    margin-top: 10px;
  }
  .vertical-line {
    border-left: 2px solid #4B2604;
    height: 30px;
    width: 0;
    display: inline-block;  /* 或者使用block，根据需要 */
  }
  .fifth_question{
    width: 100%;
    background-color: #00133F;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .fifth_question_space{
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }
  .question_mobile{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .answer_mobile{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .dark_third_bg{
    background-color: #00113A !important;
  }
  .nine{
    width: 94%;
    margin-top: 10px;
  }
  .hover_image{
    width: 65px;
    height: 65px;
  }
}
</style>
<template>
  <div class="first">
    <img class="first" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_e50b0b18-3ddc-49e5-b4f7-1d24bd8e12fb.png" alt=""/>
    <img class="first_2" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_52ee4cb2-2ecf-4107-b71f-2d524663d765.png" alt=""/>
  </div>
  <div class="third computer">
    <ShopFace :companyName="company_name" :creditScore="credit_score"></ShopFace>
    <div class="third_2">
      <client-only>
        <div class="third_2_space">
          <text class="tab_" :class="tabItemStore.tabItem*1 === 0 || tabItemStore.tabItem*1 === 3 ?'white-color white-underline':''" @click="switchTab(0)">商家简介</text>
          <text>|</text>
          <text class="tab_" :class="tabItemStore.tabItem*1 === 1 ?'white-color white-underline':''" @click="switchTab(1)">基本信息</text>
          <text>|</text>
          <text class="tab_" :class="tabItemStore.tabItem*1 === 2 ?'white-color white-underline':''" @click="switchTab(2)">企业动态</text>
          <text>|</text>
          <text class="tab_" :class="tabItemStore.tabItem*1 === 4 || tabItemStore.tabItem*1 === 7?'white-color white-underline':''" @click="switchTab(4)">评论</text>
          <text>|</text>
          <text class="tab_" :class="tabItemStore.tabItem*1 === 5 || tabItemStore.tabItem*1 === 8?'white-color white-underline':''" @click="switchTab(5)">问答</text>
          <text>|</text>
          <text class="tab_" :class="tabItemStore.tabItem*1 === 6 || tabItemStore.tabItem*1 === 9?'white-color white-underline':''" @click="switchTab(6)">投诉</text>
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
            <text>{{company_name}}</text>
          </div>
          <div class="third_4_left_1_detail_2">
            <div class="third_4_left_1_detail_2_1">
              <div class="third_4_left_1_detail_2_1_item">
                <text>法定代表人：{{corporation}}</text>
                <text class="margin-10-top">注册时间：{{foundation_date}}</text>
              </div>
              <div class="third_4_left_1_detail_2_1_item">
                <text>联系方式：{{contact_phone}}</text>
                <text class="margin-10-top">注册资本：{{registered_capital}}</text>
              </div>
            </div>
            <div class="third_4_left_1_detail_2_1 margin-10-top">
              <text class="third_4_left_1_detail_2_1_1">经营范围：</text>
              <text class="third_4_left_1_detail_2_1_2">{{business_scope}}</text>
            </div>
          </div>
        </div>
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
          <text>{{address}}</text>
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
          <td>{{company_name}}</td>
          <th>统一社会信用代码</th>
          <td>{{credit_code}}</td>
        </tr>
        <tr>
          <th>法定代表人</th>
          <td>{{corporation}}</td>
          <th>登记状态</th>
          <td>-</td>
        </tr>
        <tr>
          <th>注册时间</th>
          <td>{{foundation_date}}</td>
          <th>注册资本</th>
          <td>{{registered_capital}}人民币</td>
        </tr>
        <tr>
          <th>组织机构代码</th>
          <td>{{organisation_code}}</td>
          <th>工商注册号</th>
          <td>{{registration_mark}}</td>
        </tr>
        <tr>
          <th>纳税人识别号</th>
          <td>{{taxpayer_id}}</td>
          <th>企业类型</th>
          <td>{{company_sort}}</td>
        </tr>
        <tr>
          <th>营业期限</th>
          <td>-</td>
          <th>纳税人资质</th>
          <td>-</td>
        </tr>
        <tr>
          <th>人员规模</th>
          <td>-</td>
          <th>参保人数</th>
          <td>-</td>
        </tr>
        <tr>
          <th>核准日期</th>
          <td>-</td>
          <th>登记机关</th>
          <td>-</td>
        </tr>
        <tr>
          <th>联系电话</th>
          <td>{{contact_phone}}</td>
          <th>所属地区</th>
          <td>{{province}}{{city}}{{district}}</td>
        </tr>
        <tr>
          <th>是否失信</th>
          <td>否</td>
          <th>黑名单</th>
          <td>否</td>
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
            <text v-for="key in dynamicCategoriesStore.pcCategoryKeys" :key="key" :class="dynamicCategoriesStore.selectedCategory === key?'chose':''" @click="toggleCategory(key)">{{dynamicCategoriesStore.CATEGORIES[key]}}</text>
          </div>
        </div>
        <div class="choose_item">
          <text class="choose_title"></text>
          <div class="choose_detail">
            <text :class="sub === dynamicCategoriesStore.selectedSubCategory?'chose':''" v-for="(sub, key) in dynamicCategoriesStore.SUB_CATEGORIES[dynamicCategoriesStore.selectedCategory]" :key="key" @click="selectSubCategory(sub)">{{sub}}</text>
          </div>
        </div>
<!--        <div class="choose_item">-->
<!--          <text class="choose_title">时间选择</text>-->
<!--          <div class="choose_detail">-->
<!--            <text class="chose">全部时间</text>-->
<!--            <text>今天</text>-->
<!--            <text>近7天</text>-->
<!--            <text>近30天</text>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <template v-if="pcFilteredDynamics.length < 1">
        <NoDetail v-if="dynamicCategoriesStore.selectedSubCategory === '全部'" class="margin-10-top" type="动态" :text="'暂无查询到该企业的'+dynamicCategoriesStore.CATEGORIES[dynamicCategoriesStore.selectedCategory]+'动态'" :has-button="false"></NoDetail>
        <NoDetail v-else class="margin-10-top" type="动态" :text="'暂无查询到该企业的【 '+dynamicCategoriesStore.CATEGORIES[dynamicCategoriesStore.selectedCategory] +' > '+dynamicCategoriesStore.selectedSubCategory +' 】动态'" :has-button="false"></NoDetail>
      </template>
      <table v-else>
        <tr class="table_title">
          <th>动态等级</th>
          <th>动态类型</th>
          <th class="wide-column">动态内容</th>
          <th>更新时间</th>
          <th>操作</th>
        </tr>
        <tr class="table_detail" v-for="dynamic in pcFilteredDynamics" :key="dynamic.id">
          <td :class="getClass(dynamic.level)">{{dynamic.level}}</td>
          <td>{{dynamic.subCategory}}</td>
          <td class="wide-column" v-html="dynamic.content"></td>
          <td>{{dynamic.updateTime}}</td>
          <td>详情</td>
        </tr>
      </table>
    </div>
    <div class="tab_3_space" v-if="tabItemStore.tabItem*1 === 4 || tabItemStore.tabItem*1 === 7">
      <div class="tab_3_space_left"></div>
      <div class="tab_3_space_middle">
        <div class="tab_3_space_1">
          <text>全部评价（{{company_comment_count}}）</text>
          <AddForm title-box="评论" :company-name="company_name" feedback-type="comment">
            <!-- 定义插槽内容 -->
            <template #trigger>
              <!-- Tag组件，当点击时触发openCommentBox方法 -->
              <Tag tag="写评论" number="41" color="orange_linear"></Tag>
            </template>
          </AddForm>
        </div>
        <NoDetail v-if="company_comment_count < 0"></NoDetail>
        <div class="tab_3_space_2" v-else>
          <CommentList></CommentList>
        </div>
      </div>
      <div class="tab_3_space_right">
        <div class="tab_3_space_3">
          <text class="right_title">附近商家（客户评论）</text>
          <div class="tab_3_space_4">
            <div class="tab_3_space_4_1">
              <text>高唐县木材加工厂</text>
              <div class="grey-color tab_3_space_4_1_2">
                <text>信用分：55</text>
                <text class="margin-20-left">距离：5km</text>
              </div>
            </div>
            <div class="tab_3_space_4_2">
              <div class="comment_item little_item">
                <div class="comment_item_1">
                  <img class="avatar-name__img" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="Marcin Tireder">
                  <div class="avatar-name__name margin-10-left">
                    <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">Marcin Tireder</strong>
                  </div>
                </div>
                <div class="comment_item_2">
                  <p class="margin-10-top ">我曾经担心这种木材会受虫害，但实际使用过程中发现它的防虫性能非常好。</p>
                  <div class="comment_item_3">
                    <text class=" grey-color little_time">2020-08-09 12:12:30</text>
                  </div>
                </div>
              </div>
              <div class="comment_item little_item">
                <div class="comment_item_1">
                  <img class="avatar-name__img" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="Marcin Tireder">
                  <div class="avatar-name__name margin-10-left">
                    <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">Marcin Tireder</strong>
                  </div>
                </div>
                <div class="comment_item_2">
                  <p class="margin-10-top ">我曾经担心这种木材会受虫害，但实际使用过程中发现它的防虫性能非常好。</p>
                  <div class="comment_item_3">
                    <text class=" grey-color little_time">2020-08-09 12:12:30</text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab_3_space_4">
            <div class="tab_3_space_4_1">
              <text>高唐县木材加工厂</text>
              <div class="grey-color tab_3_space_4_1_2">
                <text>信用分：55</text>
                <text class="margin-20-left">距离：5km</text>
              </div>
            </div>
            <div class="tab_3_space_4_2">
              <div class="comment_item little_item">
                <div class="comment_item_1">
                  <img class="avatar-name__img" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="Marcin Tireder">
                  <div class="avatar-name__name margin-10-left">
                    <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">Marcin Tireder</strong>
                  </div>
                </div>
                <div class="comment_item_2">
                  <p class="margin-10-top ">我曾经担心这种木材会受虫害，但实际使用过程中发现它的防虫性能非常好。</p>
                  <div class="comment_item_3">
                    <text class=" grey-color little_time">2020-08-09 12:12:30</text>
                  </div>
                </div>
              </div>
              <div class="comment_item little_item">
                <div class="comment_item_1">
                  <img class="avatar-name__img" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="Marcin Tireder">
                  <div class="avatar-name__name margin-10-left">
                    <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">Marcin Tireder</strong>
                  </div>
                </div>
                <div class="comment_item_2">
                  <p class="margin-10-top ">我曾经担心这种木材会受虫害，但实际使用过程中发现它的防虫性能非常好。</p>
                  <div class="comment_item_3">
                    <text class=" grey-color little_time">2020-08-09 12:12:30</text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tab_4_space" v-if="tabItemStore.tabItem*1 === 5 || tabItemStore.tabItem*1 === 8">
      <div class="tab_4_space_left"></div>
      <div class="tab_4_space_middle">
        <div class="tab_4_space_1">
          <text>全部问答</text>
          <AddForm title-box="提问" :company-name="company_name" feedback-type="question">
            <!-- 定义插槽内容 -->
            <template #trigger>
              <Tag tag="我要提问" number="41" color="orange_linear"></Tag>
            </template>
          </AddForm>
        </div>
        <NoDetail tag="我要提问" text="没有问答" v-if="answer_question_count < 0"></NoDetail>
        <div class="tab_4_space_2" v-else>
          <QuestionList></QuestionList>
        </div>
      </div>
      <div class="tab_4_space_right">
        <div class="tab_4_space_3">
          <text class="right_title">附近商家（商品问答）</text>
          <div class="tab_4_space_4">
            <div class="tab_4_space_4_1">
              <text>高唐县木材加工厂</text>
              <div class="grey-color tab_4_space_4_1_2">
                <text>信用分：55</text>
                <text class="margin-20-left">距离：5km</text>
              </div>
            </div>
            <div class="tab_4_space_4_2">
              <div>
                <text class="orange-bg border-padding">问</text>
                <text class="margin-5-left">商品质量怎么样，有没有买过的宝宝，告诉我吧，呜呜呜</text>
              </div>
              <hr class="little_margin">
              <div>
                <text class="blue-bg border-padding">答</text>
                <text class="margin-5-left">挺好的</text>
              </div>
            </div>
          </div>
          <div class="tab_4_space_4">
            <div class="tab_4_space_4_1">
              <text>高唐县木材加工厂</text>
              <div class="grey-color tab_4_space_4_1_2">
                <text>信用分：55</text>
                <text class="margin-20-left">距离：5km</text>
              </div>
            </div>
            <div class="tab_4_space_4_2">
              <div>
                <text class="orange-bg border-padding">问</text>
                <text class="margin-5-left">商品质量怎么样，有没有买过的宝宝，告诉我吧，呜呜呜</text>
              </div>
              <hr class="little_margin">
              <div>
                <text class="blue-bg border-padding">答</text>
                <text class="margin-5-left">挺好的</text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tab_5_space" v-if="tabItemStore.tabItem*1 === 6 || tabItemStore.tabItem*1 === 9">
      <div class="tab_5_space_left"></div>
      <div class="tab_5_space_middle">
        <ComplaintList :company-name="company_name"></ComplaintList>
      </div>
      <div class="tab_5_space_right">
        <div class="tab_5_space_3">
          <text class="right_title">附近商家（被投诉记录）</text>
          <div class="tab_5_space_4">
            <div class="tab_5_space_4_1">
              <text>高唐县木材加工厂</text>
              <div class="grey-color tab_5_space_4_1_2">
                <text>信用分：55</text>
                <text class="margin-20-left">距离：5km</text>
              </div>
            </div>
            <div class="tab_5_space_4_2">
              <text>投诉记录：0</text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="third mobile" :class="tabItemStore.tabItem*1 >= 4 ? 'dark_third_bg':''">
    <ShopFace :companyName="company_name" :creditScore="credit_score"></ShopFace>
    <div class="third_2" v-if="tabItemStore.tabItem*1 >= 4">
      <client-only>
        <div class="third_2_space blue-tab">
          <text class="tab_" :class="(tabItemStore.tabItem*1 === 4 || tabItemStore.tabItem*1 === 7)?'white-color blue-underline':''" @click="switchTab(7)">评价</text>
          <text class="tab_" :class="(tabItemStore.tabItem*1 === 5 || tabItemStore.tabItem*1 === 8) ?'white-color blue-underline':''" @click="switchTab(8)">问答</text>
          <text class="tab_" :class="(tabItemStore.tabItem*1 === 6 || tabItemStore.tabItem*1 === 9) ?'white-color blue-underline':''" @click="switchTab(9)">投诉</text>
        </div>
      </client-only>
    </div>
    <div class="third_2" v-else>
      <client-only>
        <div class="third_2_space">
          <text class="tab_" :class="tabItemStore.tabItem*1 === 0 ?'white-color white-underline':''" @click="switchTab(0)">商家简介</text>
          <text class="tab_" :class="tabItemStore.tabItem*1 === 1 ?'white-color white-underline':''" @click="switchTab(1)">基本信息</text>
          <text class="tab_" :class="tabItemStore.tabItem*1 === 2 ?'white-color white-underline':''" @click="switchTab(2)">企业动态</text>
          <text class="tab_" :class="tabItemStore.tabItem*1 === 3 ?'white-color white-underline':''" @click="switchTab(3)">口碑</text>
        </div>
      </client-only>
    </div>
    <div class="tab_0_space light_brown" v-if="tabItemStore.tabItem*1 === 0" @click="toggleClamp">
      <div class="clamp-text" ref="clampTextRef" :class="{'expanded': isExpanded}">
        东莞市大岭山木之源包装有限公司，是从事木业十多年的厂家，是一家主业生产木托盘、出口托盘、木包装箱、塑料托盘、纸托盘、纸护角、拉伸缠绕膜、打包带等包装仓储物流用包装制品的企业。东莞市大岭山木之源包装有限公司，是从事木业十多年的厂家，是一家主业生产木托盘、出口托盘、木包装箱、塑料托盘、纸托盘、纸护角、拉伸缠绕膜、打包带等包装仓储物流用包装制品的企业。东莞市大岭山木之源包装有限公司，是从事木业十多年的厂家，是一家主业生产木托盘、出口托盘、木包装箱、塑料托盘、纸托盘、纸护角、拉伸缠绕膜、打包带等包装仓储物流用包装制品的企业。
      </div>
    </div>
    <img class="third_1" v-if="tabItemStore.tabItem*1 === 0" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_1fccd42f-528b-4613-b2d5-2f76d0f3d5c8.png" alt="">
    <div class="third_4" v-if="tabItemStore.tabItem*1 === 0">
      <div class="third_4_left white-color">
        <div class="third_4_left_4">
          <div class="third_4_left_4_1">
            <img class="third_4_left_4_1_left" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_395067ed-d2f0-4c5b-b2fc-cb322af9cc75.png" alt="商家地址图标"/>
            <text class="third_4_left_4_1_right">商家地址</text>
          </div>
        </div>
        <client-only><baidu-map class="map" :center="{lng: 118.906004, lat: 33.962873}" :zoom="5" @ready="ready" ></baidu-map></client-only>
        <div class="map_address">
          <svg class="icon" viewBox="0 0 1024 1024" width="200" height="200"><path d="M513.8 63.4C327.2 63.4 173 221.2 173 414.9c0 186.5 304.9 520.2 319.3 534.5 3.6 7.2 14.3 10.8 21.5 10.8s17.9-3.6 21.5-10.8l104-125.6C779.2 644.5 851 508.2 851 414.9c3.6-193.7-150.7-351.5-337.2-351.5z m0 513c-86.1 0-154.3-71.7-154.3-161.4s68.2-161.4 154.3-161.4S668 325.3 668 414.9s-68.1 161.5-154.2 161.5z" fill="#ffffff"></path></svg>
          <text>{{address}}</text>
        </div>
      </div>
      <img class="third_4_right" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_86e5c509-e054-4df8-baf8-e3d9b17ce535.png" alt=""/>
    </div>
    <div class="fifth margin-10-top" v-if="tabItemStore.tabItem*1 === 0">
      <div class="fifth_1">
        <div class="fifth_1_left">
          <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_47dff6c4-5504-4353-b87f-8edb6fd49d9b.png" alt="">
          <text class="margin-10-left">动态</text>
        </div>
        <text @click="switchTab(2)">更多></text>
      </div>
      <div class="fifth_2" v-for="(dynamic, index) in dynamicStore.dynamics">
        <div class="fifth_2_1">
          <text>{{dynamic.updateTime}}</text>
          <text>{{dynamic.subCategory}}</text>
          <text :class="getClass(dynamic.level)">{{dynamic.level}}</text>
        </div>
        <div class="fifth_2_2">
          <div v-html="dynamic.content" class="fifth_2_2_left"></div>
          <text class="fifth_2_2_right">详情</text>
        </div>
      </div>
      <img class="margin-20-top" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_450cc483-88c5-49a4-bb46-7f3fd28ab675.png">
    </div>
    <div class="six" v-if="tabItemStore.tabItem*1 === 1">
      <table class="six_table left_width_1">
        <tr>
          <td>企业名称</td>
          <td>{{company_name}}</td>
        </tr>
        <tr>
          <td>法定代表人</td>
          <td>{{corporation}}</td>
        </tr>
        <tr>
          <td>注册时间</td>
          <td>{{foundation_date}}</td>
        </tr>
        <tr>
          <td>注册资本</td>
          <td>{{registered_capital}}</td>
        </tr>
        <tr>
          <td>登记状态</td>
          <td>{{operation_state}}</td>
        </tr>
        <tr>
          <td>企业类型</td>
          <td>{{company_sort}}</td>
        </tr>
      </table>
    </div>
    <div class="six" v-if="tabItemStore.tabItem*1 === 1">
      <table class="six_table left_width_2">
        <tr>
          <td>统一社会信用代码</td>
          <td>{{credit_code}}</td>
        </tr>
        <tr>
          <td>组织机构代码</td>
          <td>{{organisation_code}}</td>
        </tr>
        <tr>
          <td>工商注册号</td>
          <td>{{registration_mark}}</td>
        </tr>
        <tr>
          <td>纳税人识别号</td>
          <td>{{taxpayer_id}}</td>
        </tr>
      </table>
    </div>
    <div class="six" v-if="tabItemStore.tabItem*1 === 1">
      <table class="six_table left_width_3">
        <tr>
          <td>营业期限</td>
          <td>2013-10-11至无固定期限</td>
        </tr>
        <tr>
          <td>纳税人资质</td>
          <td>-</td>
        </tr>
        <tr>
          <td>人员规模</td>
          <td>-</td>
        </tr>
        <tr>
          <td>参保人数</td>
          <td>-</td>
        </tr>
        <tr>
          <td>核准日期</td>
          <td>-</td>
        </tr><tr>
        <td>登记机关</td>
        <td>-</td>
      </tr><tr>
        <td>联系电话</td>
        <td>-</td>
      </tr><tr>
        <td>是否失信</td>
        <td>-</td>
      </tr><tr>
        <td>黑名单</td>
        <td>-</td>
      </tr><tr>
        <td>处罚公示</td>
        <td>-</td>
      </tr><tr>
        <td>投诉记录</td>
        <td>-</td>
      </tr><tr>
        <td>诉讼查询</td>
        <td>-</td>
      </tr><tr>
        <td>经营范围</td>
        <td>-</td>
      </tr>
      </table>
    </div>
    <div class="seven" v-if="tabItemStore.tabItem*1 === 2">
      <Tag v-for="key in dynamicCategoriesStore.specificCategoryKeys" :key="key"
           :color="dynamicCategoriesStore.selectedCategory === key ? 'brown-orange' : 'brown-white'"
           @click="toggleCategory(key)"
           :tag="dynamicCategoriesStore.CATEGORIES[key]"
      >
      </Tag>
      <div class="vertical-line"></div>
      <Tag tag="更多类型" :more="dynamicCategoriesStore.moreTriangleUpOrDown" :color="dynamicCategoriesStore.selectedCategory === 'MORE' ?'brown-orange':'brown-white'" @click="toggleMoreTypes"></Tag>
    </div>
    <div class="fifth" v-if="tabItemStore.tabItem*1 === 2 && !dynamicCategoriesStore.showMoreTypes">
      <template v-if="filteredDynamics.length < 1">
        <NoDetail v-if="dynamicCategoriesStore.selectedCategory !== 'MORE'" class="margin-10-top" type="动态" :text="'暂无查询到该企业的'+dynamicCategoriesStore.CATEGORIES[dynamicCategoriesStore.selectedCategory]+'动态'" :has-button="false"></NoDetail>
        <NoDetail v-else class="margin-10-top" type="动态" :text="'暂无查询到该企业的【 '+dynamicCategoriesStore.CATEGORIES[dynamicCategoriesStore.selectedMoreCategory] +' > '+dynamicCategoriesStore.selectedSubCategory +' 】动态'" :has-button="false"></NoDetail>
      </template>
      <div class="fifth_2" v-for="dynamic in filteredDynamics" :key="dynamic.id" v-else>
        <div class="fifth_2_1">
          <text>{{dynamic.updateTime}}</text>
          <text>{{dynamic.subCategory}}</text>
          <text :class="getClass(dynamic.level)">{{dynamic.level}}</text>
        </div>
        <div class="fifth_2_2">
          <div v-html="dynamic.content" class="fifth_2_2_left"></div>
          <text class="fifth_2_2_right">详情</text>
        </div>
      </div>
    </div>
    <div class="eight" v-if="tabItemStore.tabItem*1 === 2 && dynamicCategoriesStore.showMoreTypes">
      <!-- 主分类列表 -->
          <!-- 其他主分类 -->
      <div class="eight_1">
        <div class="eight_item" :class="key === dynamicCategoriesStore.selectedMoreCategory? 'selected_category':''" v-for="(category, key) in dynamicCategoriesStore.CATEGORIES" :key="key" @click="toggleMoreCategory(key)">
          {{ category }}
        </div>
      </div>
      <div class="eight_2">
        <!-- 对应的子分类列表 -->
        <!-- 如果选中其他主分类，显示其对应子分类 -->
        <div class="eight_item" :class="sub === dynamicCategoriesStore.selectedSubCategory? 'selected_category':''" v-for="(sub, key) in dynamicCategoriesStore.SUB_CATEGORIES[dynamicCategoriesStore.selectedMoreCategory]" :key="key" @click="selectSubCategory(sub)">
          {{ sub }}
        </div>
      </div>
    </div>
    <img class="third_1" v-if="tabItemStore.tabItem*1 === 3" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_1fccd42f-528b-4613-b2d5-2f76d0f3d5c8.png" alt="">
    <div class="fifth margin-10-top" v-if="tabItemStore.tabItem*1 === 3">
      <div class="fifth_1">
        <div class="fifth_1_left">
          <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_3961e5c7-53cd-4c91-b1da-92f70acf74d8.png" alt="">
          <text class="margin-10-left">评论</text>
        </div>
        <text @click="switchTab(7)">更多></text>
      </div>
    </div>
    <!--    口碑界面评论开始-->
    <CommentListMobile :is-mobile-appraise="true" :is-show-reply="false" v-if="tabItemStore.tabItem*1 === 3"></CommentListMobile>
    <AddFormMobile title-box="评论" :company-name="company_name" feedback-type="comment" v-if="tabItemStore.tabItem*1 === 3">
      <!-- 定义插槽内容 -->
      <template #trigger>
        <!-- Tag组件，当点击时触发openCommentBox方法 -->
        <Tag tag="我要点评" color="orange_long"></Tag>
      </template>
    </AddFormMobile>
    <!--    口碑界面评论结束-->
<!--    移动端评论界面开始-->
    <CommentListMobile v-if="tabItemStore.tabItem*1 === 4 || tabItemStore.tabItem*1 === 7"></CommentListMobile>
    <AddFormMobile title-box="评论" :company-name="company_name" feedback-type="comment" v-if="tabItemStore.tabItem*1 === 4 || tabItemStore.tabItem*1 === 7">
      <!-- 定义插槽内容 -->
      <template #trigger>
        <HoverButton >
          <template #hoverButton>
            <img class="hover_image" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_674067de-0fa6-4a1e-bd78-9ff51400b77a.png" alt=""/>
          </template>
        </HoverButton>
      </template>
    </AddFormMobile>
<!--移动端评论界面结束-->
<!--      移动端提问界面开始-->
    <div class="nine" v-if="tabItemStore.tabItem*1 === 5 || tabItemStore.tabItem*1 === 8">
      <QuestionListMobile ></QuestionListMobile>
      <AddFormMobile title-box="提问" :company-name="company_name" feedback-type="question">
        <!-- 定义插槽内容 -->
        <template #trigger>
          <!-- 当点击时触发openCommentBox方法 -->
          <HoverButton>
            <template #hoverButton>
              <img class="hover_image" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_296ceba6-2d6d-4c64-bcad-6ccdf60ff96c.png" alt=""/>
            </template>
          </HoverButton>
        </template>
      </AddFormMobile>
    </div>
<!--    移动端提问界面结束-->
<!--    移动端投诉界面开始-->
    <div class="nine" v-if="tabItemStore.tabItem*1 === 6 || tabItemStore.tabItem*1 === 9">
      <ComplaintListMobile :company-name="company_name"></ComplaintListMobile>
      <AddFormMobile title-box="投诉" :company-name="company_name" feedback-type="complaint">
        <!-- 定义插槽内容 -->
        <template #trigger>
          <HoverButton>
            <template #hoverButton>
              <img class="hover_image" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_ae5c4513-e845-4bc7-bfd8-87b259c74666.png" alt=""/>
            </template>
          </HoverButton>
        </template>
      </AddFormMobile>
    </div>
<!--    移动端投诉界面结束-->
  </div>
<!--  口碑问答投诉开始-->
  <div class="fifth_question mobile" v-if="tabItemStore.tabItem*1 === 3">
    <div class="fifth_question_space" v-if="tabItemStore.tabItem*1 === 3">
      <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_bcbc6a8e-60b8-4286-bef2-bf6590599e1a.png" alt="">
      <div class="fifth_1 margin-10-top">
        <div class="fifth_1_left">
          <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_0700b3c4-a16a-4f4f-b849-104bd2a96638.png" alt="">
          <text class="margin-10-left">问答</text>
        </div>
        <text @click="switchTab(8)">更多></text>
      </div>
      <div class="question_mobile margin-10-top">
          <div class="avatar-wrapper">
            <img class="avatar-name__img avatar" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="Marcin Tireder">
            <span class="question-icon orange-bg">问</span>
          </div>
          <text class="margin-10-left">商品质量怎么样，有没有买过的，说说看</text>
      </div>
      <div class="answer_mobile margin-10-top margin-10-bottom">
          <div class="avatar-wrapper">
            <img class="avatar-name__img avatar" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="Marcin Tireder">
            <span class="question-icon red-bg">答</span>
          </div>
          <text class="margin-10-left">商品质量怎么样，有没有买过的，说说看</text>
      </div>
      <div class="question_mobile margin-10-top">
        <div class="avatar-wrapper">
          <img class="avatar-name__img avatar" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="Marcin Tireder">
          <span class="question-icon orange-bg">问</span>
        </div>
        <text class="margin-10-left">商品质量怎么样，有没有买过的，说说看</text>
      </div>
      <div class="answer_mobile margin-10-top margin-10-bottom">
        <div class="avatar-wrapper">
          <img class="avatar-name__img avatar" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="Marcin Tireder">
          <span class="question-icon red-bg">答</span>
        </div>
        <text class="margin-10-left">商品质量怎么样，有没有买过的，说说看</text>
      </div>
    </div>
    <AddFormMobile title-box="提问" :company-name="company_name" feedback-type="question" v-if="tabItemStore.tabItem*1 === 3">
      <!-- 定义插槽内容 -->
      <template #trigger>
        <!-- Tag组件，当点击时触发openCommentBox方法 -->
        <Tag tag="我要提问" color="orange_long"></Tag>
      </template>
    </AddFormMobile>
    <div class="fifth_1 margin-10-top">
      <div class="fifth_1_left">
        <img src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_10123398-f5cb-48b9-b40d-7d8cfdf4ba82.png" alt="">
        <text class="margin-10-left">投诉</text>
      </div>
      <text @click="switchTab(9)">更多></text>
    </div>
    <ComplaintListMobile :company-name="company_name" :is-show-reply="false" v-if="tabItemStore.tabItem*1 === 3"></ComplaintListMobile>
    <AddFormMobile title-box="投诉" :company-name="company_name" feedback-type="complaint" class="margin-20-bottom" v-if="tabItemStore.tabItem*1 === 3">
      <!-- 定义插槽内容 -->
      <template #trigger>
        <!-- Tag组件，当点击时触发openCommentBox方法 -->
        <Tag tag="我要投诉" color="orange_long"></Tag>
      </template>
    </AddFormMobile>
  </div>
  <!--  口碑问答投诉开始-->
  <div class="second computer" v-if="tabItemStore.tabItem*1 === 0">
    <img class="third_1" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_1a69286f-36e4-4694-bcbb-5219a41a4d96.png" alt=""/>
    <div class="second_2">
      <div class="second_2_left">
        <div class="second_2_left_1">
          <text class="second_2_left_1_left">张珊珊加工厂口碑</text>
          <!--                    <text class="size-10 grey-color">更多</text>-->
        </div>
        <div class="second_2_left_item">
          <div class="second_2_left_2">
            <img class="second_2_left_2_left" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_e9a1e1da-d6e0-4c64-b332-46fd243749db.png" alt="头像"/>
            <div class="second_2_left_2_right">
              <text class="second_2_left_2_right_1">网友</text>
            </div>
          </div>
          <text class="margin-10-top">货物出现了很严重的质量问题（缺边、毛刺、规格不一）客户没办法用这批货要求退而且
            要了货物图片，收到货实物跟图片严重不符）</text>
        </div>
        <div class="second_2_left_item">
          <div class="second_2_left_2">
            <img class="second_2_left_2_left" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__miniapp_e9a1e1da-d6e0-4c64-b332-46fd243749db.png" alt="头像"/>
            <div class="second_2_left_2_right">
              <text class="second_2_left_2_right_1">网友</text>
            </div>
          </div>
          <text>货物出现了很严重的质量问题（缺边、毛刺、规格不一）客户没办法用这批货要求退而且
            要了货物图片，收到货实物跟图片严重不符）</text>
        </div>
        <div class="margin-10-top right_display">
          <Tag tag="我要点评" number="41" color="orange"></Tag>
          <Tag tag="查看全部" number="41" color="orange"></Tag>
        </div>
        <div class="second_2_left_1 second_2_left_1_margin">
          <text class="second_2_left_1_left">公司名字相关回答</text>
          <!--                    <text class="size-10 grey-color">更多</text>-->
        </div>
        <div class="question_item_display">
          <div class="question_item_1_display">
            <div class="avatar-wrapper">
              <img class="avatar-name__img avatar" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="Marcin Tireder">
              <span class="question-icon orange-bg">问</span>
            </div>
            <text class="margin-10-left">商品质量怎么样，有没有买过的，说说看</text>
            <text class="little_time grey-color">2020-08-09 12:12:30</text>
          </div>
        </div>
        <div class="answer_item_display">
          <div class="answer_item_1_display">
            <div class="avatar-wrapper">
              <img class="avatar-name__img avatar" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="Marcin Tireder">
              <span class="question-icon red-bg">答</span>
            </div>
            <text class="margin-10-left">商品质量怎么样，有没有买过的，说说看</text>
            <text class="little_time grey-color">2020-08-09 12:12:30</text>
          </div>
        </div>
        <div class="answer_item_display">
          <div class="answer_item_1_display">
            <div class="avatar-wrapper">
              <img class="avatar-name__img avatar" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="Marcin Tireder">
              <span class="question-icon red-bg">答</span>
            </div>
            <text class="margin-10-left">商品质量怎么样，有没有买过的，说说看</text>
            <text class="little_time grey-color">2020-08-09 12:12:30</text>
          </div>
        </div>
        <div class="margin-10-top right_display">
          <Tag tag="我要提问" number="41" color="orange"></Tag>
          <Tag tag="查看全部" number="41" color="orange"></Tag>
        </div>
      </div>
      <img class="second_2_right" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_007bdf9d-c46d-4843-b154-d43b201c17f2.png" alt=""/>
    </div>
  </div>
  <div class="fourth white-color computer" v-if="tabItemStore.tabItem*1 === 0">
    <img class="fourth_3" src="https://zhenmuwang.oss-cn-beijing.aliyuncs.com/sell_answer_img__pc_image_5f1cc753-9eff-4e32-b6f7-e2fe603be30f.png" alt=""/>
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
        <tr class="table_detail" v-for="(dynamic, index) in dynamicStore.dynamics">
          <td :class="getClass(dynamic.level)">{{dynamic.level}}</td>
          <td>{{dynamic.subCategory}}</td>
          <td class="wide-column" v-html="dynamic.content"></td>
          <td>{{dynamic.updateTime}}</td>
          <td>详情</td>
        </tr>
      </table>
      <text class="green_tip">查查木材商企业动态数据基于公开数据分析而成，仅作参考，不作为个人决策及媒体引用的依据，查查木材商亦不承担因此产生的任何后果</text>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {BaiduMap} from "vue-baidu-map-3x";
import { useTabItemStore } from "~/pinia/tabItem";
const tabItemStore = useTabItemStore();
//动态
import {useDynamicStore} from "~/pinia/dynamicStore";
const dynamicStore = useDynamicStore();
import {useDynamicCategoriesStore} from "~/pinia/dynamicCategoriesStore";
const dynamicCategoriesStore = useDynamicCategoriesStore();
const toggleCategory = (key: CategoryKeys) => {
  dynamicCategoriesStore.toggleCategory(key);
}
const toggleMoreCategory = (key: CategoryKeys) => {
  dynamicCategoriesStore.toggleMoreCategory(key);
}
const toggleMoreTypes = () => {
  console.log('切换');
  dynamicCategoriesStore.toggleMoreTypes();
  console.log(dynamicCategoriesStore.moreTriangleUpOrDown);
}
const selectSubCategory = (sub: string) => {
  dynamicCategoriesStore.selectSubCategory(sub);
}
const pcFilteredDynamics = computed(() => {
  return dynamicStore.getPcDynamicsByCategoryAndSubCategory(
      dynamicCategoriesStore.CATEGORIES[dynamicCategoriesStore.selectedCategory],
      dynamicCategoriesStore.selectedSubCategory,
  );
})
// 计算属性
const filteredDynamics = computed(() => {
  console.log(dynamicCategoriesStore.selectedMoreCategory);
  console.log(dynamicCategoriesStore.selectedCategory);
  console.log(dynamicCategoriesStore.selectedSubCategory);
  console.log(dynamicCategoriesStore.CATEGORIES[dynamicCategoriesStore.selectedMoreCategory]);
  if(dynamicCategoriesStore.selectedCategory === 'MORE'){
    return dynamicStore.getDynamicsByCategoryAndSubCategory(
        dynamicCategoriesStore.CATEGORIES[dynamicCategoriesStore.selectedMoreCategory],
        dynamicCategoriesStore.selectedSubCategory,
        true,
    )
  }
  return dynamicStore.getDynamicsByCategoryAndSubCategory(
      dynamicCategoriesStore.CATEGORIES[dynamicCategoriesStore.selectedCategory],
      dynamicCategoriesStore.selectedSubCategory,
      false,
  );

});
import Tag from "~/components/Tag.vue";
import CommentList from "~/components/CommentList.vue";
import NoDetail from "~/components/NoDetail.vue";
import ComplaintList from "~/components/ComplaintList.vue";
import {useShopDetails} from "~/composables/shop";
import { useRoute } from 'vue-router';
import CommentListMobile from "~/components/CommentListMobile.vue";
import {CategoryKeys} from "~/types/dynamicCategories";
import ShopFace from "~/components/ShopFace.vue";

const route = useRoute();
const query = route.query;
console.log(query);
const id = query.id as number|string;
console.log(id);
const shopDetails = useShopDetails(id);
const {
  address,
  company_name,
  business_scope,
  company_sort,
  contact_phone,
  corporation,
  credit_code,
  credit_score,
  email,
  foundation_date,
  geohash,
  industry,
  lat,
  lng,
  operation_state,
  organisation_code,
  registered_capital,
  registration_mark,
  taxpayer_id,
  province,
    city,
    district,
  fetchShopDetails,
} = shopDetails;

onMounted(() => {
   fetchShopDetails();
   console.log(tabItemStore.tabItem);
});
const clampTextRef =  ref<HTMLElement | null>(null);
const isExpanded = ref(false);

const toggleClamp = () => {
  if (!clampTextRef.value) return;  // add this line

  console.log(clampTextRef.value.scrollHeight);
  console.log(clampTextRef.value.clientHeight);
  if (isExpanded.value || clampTextRef.value.scrollHeight > clampTextRef.value.clientHeight) {
    isExpanded.value = !isExpanded.value;
  }
}
const switchTab = (item :number) => {
  tabItemStore.tabItem = item;
  console.log(tabItemStore.tabItem);
}
const getClass = (level:string) => {
  switch (level) {
    case "利好":
      return "green_classify";
    case "警示":
      return "pink_classify";
    case "提示":
      return "blue_classify";
    case "高风险":
      return "red_classify";
  }
}
const ready = ({ BMap , map }: { BMap: any, map: any })=>{
  // 对地图进行自定义操作
}
//评论开始
const company_comment_count = 887;

//评论结束
//问答开始
const answer_question_count = 886;
//问答结束
</script>
