// feedback/FeedbackServiceContainer.ts

import { FeedbackHandler } from './handlers/FeedbackHandler';

class FeedbackServiceContainer {
    private handlers: Map<string, FeedbackHandler> = new Map();

    registerHandler(type: string, handler: FeedbackHandler) {
        this.handlers.set(type, handler);
    }

    getHandler(type: string): FeedbackHandler | undefined {
        return this.handlers.get(type);
    }
}

export const serviceContainer = new FeedbackServiceContainer();
