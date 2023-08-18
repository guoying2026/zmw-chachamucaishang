import {FeedbackData} from "~/types/feedback";

export interface FeedbackHandler {
    handle(data: FeedbackData): void;
}
