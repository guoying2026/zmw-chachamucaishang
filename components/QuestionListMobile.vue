<template>
  <NoDetail text="没有相关问答" v-if="questionStore.getQuestionsCount <= 0"></NoDetail>
  <div class="question" v-else>
    <div class="question_item blue_comment" v-for="(question, index) in questionStore.questions">
      <div class="question_item_1">
        <div class="avatar-wrapper">
          <img class="avatar-name__img avatar" :src="question.avatar" width="32" height="32" :alt="question.name">
          <span class="question-icon orange-bg">问</span>
        </div>
        <div class="avatar-name__name margin-10-left">
          <strong class=" text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">{{question.name}}</strong>
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
          <text class=" time blue-color">{{question.created_time}}</text>
          <div class="question_item_4">
            <LikeSwitch
                :index="Number(index)"
                :reply-index="0"
                feedbackType="question"
                :company-info-id="companyInfoId"
                :main-id="Number(question.id)"
                :main-reply-id="0"></LikeSwitch>
            <AddFormMobile v-if="userInfoStore.getUserId()*1 > 0"
                           :index="Number(index)"
                           :reply-index="0"
                           :company-info-id="companyInfoId"
                           :reply-user-id="Number(question.name_id)"
                           :reply-user="question.name"
                           :main-id="Number(question.id)"
                           :main-reply-id="0"
                           title-box="回答"
                           feedback-type="answer"
            >
              <!-- 定义插槽内容 -->
              <template #trigger>
                <text class="margin-20-left blue-color">回答</text>
              </template>
            </AddFormMobile>
            <LoginPopup v-else>
              <template #open>
                <text class="margin-20-left blue-color">回答</text>
              </template>
            </LoginPopup>
            <DeleteListItem
                :main-reply-id="0"
                :main-id="Number(question.id)"
                :company-info-id="companyInfoId"
                feedback-type="question"
                :reply-index="0"
                :index="Number(index)"
                v-if="question.user_id*1 === userInfoStore.getUserId()*1"
            >
              <template #trigger>
                <text class="margin-20-left blue-color">删除</text>
              </template>
            </DeleteListItem>
          </div>
        </div>
      </div>
      <hr v-if="question.answer_list && question.answer_list.length">
      <div class="answer">
        <div class="answer_item" v-for="(answer,answerIndex) in question.answer_list">
          <div class="answer_item_1">
            <div class="avatar-wrapper">
              <img class="avatar-name__img avatar" src="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/672913/5c1186f93e195.jpg" width="32" height="32" alt="answer.name">
              <span class="question-icon blue-bg">答</span>
            </div>
            <div class="avatar-name__name margin-10-left">
              <strong class="text-bold" data-dl-uid="390" data-dl-original="true" data-dl-translated="false">{{answer.name}}</strong>
            </div>
          </div>
          <div class="answer_item_2">
            <p class="margin-10-top">{{answer.answer}}</p>
            <el-row :gutter="8" v-if="answer.image" class="margin-10-bottom row-image-box">
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
              <text class=" time blue-color">{{answer.created_time}}</text>
              <div class="answer_item_4">
                <LikeSwitch
                    :index="Number(index)"
                    :reply-index="Number(answerIndex)"
                    feedbackType="answer"
                    :company-info-id="companyInfoId"
                    :main-id="Number(question.id)"
                    :main-reply-id="answer.id"></LikeSwitch>
                <DeleteListItem
                    :main-reply-id="answer.id"
                    :main-id="Number(question.id)"
                    :company-info-id="companyInfoId"
                    feedback-type="answer"
                    :reply-index="Number(answerIndex)"
                    :index="Number(index)"
                    v-if="answer.user_id*1 === userInfoStore.getUserId()*1"
                >
                  <template #trigger>
                    <text class="margin-20-left blue-color">删除</text>
                  </template>
                </DeleteListItem>
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
import {useUserInfoStore} from "~/pinia/userInfo";
import {setQuestions} from "~/composables/question";
import NoDetail from "~/components/NoDetail.vue";
import DeleteListItem from "~/components/DeleteListItem.vue";

const questionStore:QuestionStore = useQuestionStore();
const userInfoStore = useUserInfoStore();
const props = defineProps({
  companyInfoId:{
    type: Number,
    required: true,
  }
});
const { fetchQuestions } = setQuestions(props.companyInfoId, userInfoStore.getUserId());
// 在组件挂载时加载评论
watch([() => props.companyInfoId, userInfoStore.getUserId], () => {
  fetchQuestions();
}, { immediate: true });
</script>
