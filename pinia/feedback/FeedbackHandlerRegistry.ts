import { FeedbackHandler } from '~/types/feedback';

const handlers: { [key: string]: FeedbackHandler } = {};

export function registerFeedbackHandler(type: string, handler: FeedbackHandler) {
    handlers[type] = handler;
}

export function getFeedbackHandler(type: string): FeedbackHandler | undefined {
    return handlers[type];
}
