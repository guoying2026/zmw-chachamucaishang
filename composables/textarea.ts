import { ref, watch } from 'vue';

export function useTextareaLogic(emit: (eventName: string, value: any) => void) {
    const localTextareaValue = ref('');

    watch(() => localTextareaValue.value, (newVal) => {
        emit("update:value", newVal);
    });

    return {
        localTextareaValue,
    };
}
