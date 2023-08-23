import {FeedbackData} from "~/types/feedback";

export interface FeedbackHandler {
    add(data: FeedbackData): void;
}
