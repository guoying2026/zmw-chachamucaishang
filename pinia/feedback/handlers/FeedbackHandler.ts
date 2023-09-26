import {FeedbackData} from "~/types/feedback";
import {UnwrapRef} from "vue";
import {RefSymbol} from "@vue/reactivity";

export interface FeedbackHandler {
    add(data:FeedbackData): void;
}
