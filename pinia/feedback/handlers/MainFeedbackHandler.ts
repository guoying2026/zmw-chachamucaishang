import {Reaction} from "~/types/feedback";

export interface MainFeedbackHandler {
    get(index: number | string): any;
    updateReaction(index: number | string, newReaction: Reaction): void;
}
