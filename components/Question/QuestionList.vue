<template>
  <div class="question">
    <div class="question_item" v-for="(question, index) in questionStore.questions">
      <div class="question_item_1">
        <div class="avatar-wrapper">
          <img class="avatar-name__img avatar" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="Marcin Treder">
          <span class="question-icon orange-bg">问</span>
        </div>
        <figcaption class="avatar-name__name margin-10-left">
          <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">Marcin Treder</strong>
        </figcaption>
      </div>
      <div class="question_item_2">
        <p class="margin-10-top ">{{question.question}}</p>
        <div class="question_item_3">
          <text class=" time grey-color">{{question.time}}</text>
          <div class="question_item_4">
            <LikeSwitch :index="index" commentOrReply="comment"></LikeSwitch>
<!--            <div class="question_item_4_s s_1">-->
<!--              <svg t="1691744480998" class="icon grey-color" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7486" width="200" height="200"><path d="M889.6 396.8l-281.6 0c25.6-134.4 76.8-300.8-32-352-115.2-51.2-121.6 19.2-134.4 134.4-12.8 121.6-192 249.6-192 249.6l0 563.201 608 0c83.2-38.4 134.4-377.6 160-499.2s-128-96-128-96zM0 428.8l179.201 0 0 569.6-179.201 0 0-569.6z" fill="#ffffff" p-id="7487"></path></svg>-->
<!--              <text class="margin-10-left grey-color">{{question.likes}}</text>-->
<!--            </div>-->
<!--            <div class="question_item_4_s s_2">-->
<!--              <svg t="1691744322247" class="icon grey-color" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4418" width="200" height="200"><path d="M0.324216 544.126266V99.856667c0-42.502075 34.439126-76.943007 76.950232-76.943007h69.252138v597.416871l-69.252138 0.727905C34.779598 621.060242 0.324216 586.621116 0.324216 544.126266zM906.401774 701.805334c-101.960909-0.643013-203.927236-1.295057-305.889952-1.936264 14.372063 50.5578 21.64389 95.465755 21.64389 135.014667 0 89.738243-78.615563 177.607053-157.128172 166.202603-69.225045-10.057012-76.829216-69.88612-76.829216-144.858545v-67.689761c0-86.871778-72.916951-160.897746-157.451485-169.040169l-11.119068 0.106567V22.915466h602.566394c56.362979 0 104.7768 40.090776 115.278141 95.47298 28.068601 148.097091 56.146233 296.181539 84.21664 444.269599 12.045656 63.672736-29.79715 125.053384-93.46808 137.09904a116.62016 116.62016 0 0 1-21.819092 2.048249z" fill="#ffffff" p-id="4419" data-spm-anchor-id="a313x.search_index.0.i8.81863a81qlwlOT" class="selected"></path></svg>-->
<!--              <text class="margin-10-left grey-color">{{question.dislikes}}</text>-->
<!--            </div>-->
            <AddComment company-name="张姗姗木材加工厂" type="answer">
              <!-- 定义插槽内容 -->
              <template #trigger>
                <text class="margin-20-left grey-color">回答</text>
              </template>
            </AddComment>
          </div>
        </div>
      </div>
      <hr v-if="question.answer_list && question.answer_list.length">
      <div class="answer">
        <div class="answer_item" v-for="(answer,answerIndex) in question.answer_list">
          <div class="answer_item_1">
            <div class="avatar-wrapper">
              <img class="avatar-name__img avatar" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="Marcin Treder">
              <span class="question-icon blue-bg">答</span>
            </div>
            <figcaption class="avatar-name__name margin-10-left">
              <strong class="text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">Marcin Treder</strong>
            </figcaption>
          </div>
          <div class="answer_item_2">
            <p class="margin-10-top">{{answer.answer}}</p>
            <div class="answer_item_3">
              <text class=" time grey-color">{{answer.time}}</text>
              <div class="answer_item_4">
                <div class="question_item_4_s s_1">
                  <svg t="1691744558644" class="icon grey-color" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9341" width="200" height="200"><path d="M341.196926 1023.989977H85.299231a84.019743 84.019743 0 0 1-85.299231-82.313758V466.5595A84.019743 84.019743 0 0 1 85.299231 384.245742h255.897695zM85.299231 938.690746h170.598463V469.544973H85.299231z" fill="#ffffff" p-id="9342"></path><path d="M783.899937 1023.989977H298.54731a42.649616 42.649616 0 0 1-42.649616-42.649615V426.895357a42.649616 42.649616 0 0 1 17.273095-34.33294c69.092377-50.966291 150.97964-168.465982 157.803578-250.139996A142.449716 142.449716 0 0 1 711.39559 107.02324a142.236468 142.236468 0 0 1 5.331202 37.531661v25.163274A452.938919 452.938919 0 0 1 685.805821 341.596126h203.651915a125.816366 125.816366 0 0 1 106.624039 53.31202 174.863424 174.863424 0 0 1 19.405575 151.192887l-105.984295 382.567053v2.985473A140.103988 140.103988 0 0 1 783.899937 1023.989977zM341.196926 938.690746h442.703011a56.723989 56.723989 0 0 0 43.929104-34.332941l104.918054-382.140556v-2.985474a92.336418 92.336418 0 0 0-8.316675-75.276571 40.517135 40.517135 0 0 0-36.038925-17.059847H615.220707a42.649616 42.649616 0 0 1-35.399181-66.5334 333.306747 333.306747 0 0 0 51.606035-190.643782V144.341653A57.150485 57.150485 0 0 0 629.081832 128.348048a57.363733 57.363733 0 0 0-112.808234 15.353861 16.206854 16.206854 0 0 1 0 3.198721C508.596667 248.833212 422.657692 378.701292 341.196926 448.220165z" fill="#ffffff" p-id="9343"></path></svg>
                  <text class="margin-10-left grey-color">{{answer.likes}}</text>
                </div>
                <div class="question_item_4_s s_2">
                  <svg t="1691744401336" class="icon grey-color" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4593" width="200" height="200"><path d="M300 608.864V88h477.916c25.815 0 41.979 5.525 51.808 14.617 6.238 6.125 9.602 13.574 10.735 20.38l0.438 2.633 92.314 402.165 0.176 0.712c5.816 23.53 1.843 43.53-10.447 59.143-9.517 11.702-32.017 21.182-59.61 21.182H546.349l72.213 130.586c7.856 14.206 15.912 31.605 23.947 53.053 10.618 28.344 20.148 61.09 28.115 98.645 0.036 0.32-0.053 0.518-0.461 1.612-1.324 3.544-4.218 8.523-9.47 15.814C644.654 926.839 623.467 936 594.813 936c-18.135 0-28.537-4.288-37.618-12.874-8.405-7.946-14.718-17.855-25.561-39.254l-5.634-11.118-5.344-5.732c-0.433-0.72-0.918-1.551-1.444-2.474-1.787-3.135-7.986-14.904-10.1-18.652l0.01-0.006c-25.204-43.028-36.934-62.463-52.366-85.841-21.447-32.49-42.12-59.384-64.482-82.682-28.251-29.434-58.872-52.508-92.273-68.503z m-88-24.668a289.824 289.824 0 0 0-29.43-1.476H97.667c-6.617 0-8.667-2.052-8.667-8.768V96.256C89 90.049 91.054 88 97.667 88H212v496.196z m483.57 112.636h167.76c53.193 0 101.27-20.48 128.379-54.272 29.665-37.376 39.382-85.504 27.107-135.168l-91.552-398.848c-2.557-15.36-10.74-44.544-36.826-69.632C863.331 13.312 825.482 0 777.916 0H97.667C42.429 0 1 41.472 1 96.256v477.696c0 55.296 41.429 96.768 96.667 96.768h84.903c121.729 0 184.64 107.008 250.618 219.648 1.535 2.56 12.787 25.6 19.947 33.28C471.037 958.976 504.282 1024 594.811 1024c55.239 0 101.782-20.992 135.027-60.928 17.39-23.552 34.268-52.224 27.108-89.088-7.304-34.634-15.547-64.206-23.833-89.152l-37.543-88z" fill="#ffffff" p-id="4594"></path></svg>
                  <text class="margin-10-left grey-color">{{answer.dislikes}}</text>
                </div>
              </div>
            </div>
          </div>
        </div>
<!--        <hr v-if="answerIndex !== question.answer_list.length-1">-->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import 'assets/css/question.scss'
import {useQuestionStore} from "~/pinia/questionStore";
import {QuestionStore} from "~/types/questionStore";
import LikeSwitch from "~/components/LikeSwitch.vue";
import AddComment from "~/components/Comment/AddComment.vue";

const questionStore:QuestionStore = useQuestionStore();
</script>
