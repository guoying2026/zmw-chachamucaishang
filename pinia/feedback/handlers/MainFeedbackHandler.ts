import {Reaction} from "~/types/feedback";

export interface MainFeedbackHandler {
    get(index: number): any;
    delete(index: number, companyInfoId: number,id: number): any;
    updateReaction(index: number, newReaction: Reaction, companyInfoId : number,mainId: number): void;
}
