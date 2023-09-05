<template>
  <div class="question">
    <div class="question_item blue_comment" v-for="(question, index) in questionStore.questions">
      <div class="question_item_1">
        <div class="avatar-wrapper">
          <img class="avatar-name__img avatar" :src="question.avatar" width="32" height="32" :alt="question.user">
          <span class="question-icon orange-bg">问</span>
        </div>
        <div class="avatar-name__name margin-10-left">
          <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">{{question.user}}</strong>
        </div>
      </div>
      <div class="question_item_2">
        <p class="margin-10-top ">{{question.question}}</p>
        <el-row :gutter="8" v-if="question.image.length" class="margin-10-bottom row-image-box">
          <el-col
              v-for="(itemImage, indexImage) in question.image"
              :key="indexImage"
              :span="8"
              :md="8"
          >
            <el-image
                :hide-on-click-modal=true
                :src="itemImage"
                class="image_list"
                fit="cover"
                :zoom-rate="1.2"
                :preview-src-list="question.image"
                :initial-index="Number(indexImage)"
                lazy />
          </el-col>
        </el-row>
        <div class="question_item_3">
          <text class=" time blue-color">{{question.time}}</text>
          <div class="question_item_4">
            <LikeSwitch :index="index" feedbackType="question"></LikeSwitch>
            <AddFormMobile title-box="回答" company-name="张姗姗木材加工厂" feedback-type="answer">
              <!-- 定义插槽内容 -->
              <template #trigger>
                <text class="margin-20-left blue-color">回答</text>
              </template>
            </AddFormMobile>
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
            <div class="avatar-name__name margin-10-left">
              <strong class="text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">Marcin Treder</strong>
            </div>
          </div>
          <div class="answer_item_2">
            <p class="margin-10-top">{{answer.answer}}</p>
            <el-row :gutter="8" v-if="answer.image.length" class="margin-10-bottom row-image-box">
              <el-col
                  v-for="(itemReplyImage, indexReplyImage) in answer.image"
                  :key="indexReplyImage"
                  :span="8"
                  :md="8"
              >
                <el-image
                    :hide-on-click-modal=true
                    :src="itemReplyImage"
                    class="image_list"
                    fit="cover"
                    :zoom-rate="1.2"
                    :preview-src-list="answer.image"
                    :initial-index="Number(indexReplyImage)"
                    lazy />
              </el-col>
            </el-row>
            <div class="answer_item_3">
              <text class=" time blue-color">{{answer.time}}</text>
              <div class="answer_item_4">
                <LikeSwitch :index="index" :reply-index="answerIndex" feedbackType="answer"></LikeSwitch>
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

const questionStore:QuestionStore = useQuestionStore();
</script>
