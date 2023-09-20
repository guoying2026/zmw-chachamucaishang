import { ref,computed } from 'vue';
import { dynamicApi } from '~/server/api/dynamic';

// type DynamicList = {
//
// };

export const useDynamic = (companyInfoId: string | number) => {
    const dynamic = ref([]);

    const fetchDynamic = async () => {
        try {
            let data = await dynamicApi(companyInfoId);
            dynamic.value = data.risk_info;
            console.log(dynamic.value);
        } catch (error) {
            console.error("Failed to fetch shop details", error);
        }
    };

    return {
        fetchDynamic,
    };
};
