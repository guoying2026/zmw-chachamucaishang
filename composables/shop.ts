import { ref,computed } from 'vue';
import { shopDetailApi } from '~/server/api/shop';

type CompanyInfo = {
    address: string;
    company_name: string;
    business_scope: string;
    company_sort: string;
    contact_phone: string;
    corporation: string;
    credit_code: string;
    credit_score: number;
    email: string;
    foundation_date: string;
    geohash: string;
    industry: string;
    lat: number;
    lng: number;
    operation_state: string;
    organisation_code: string;
    registered_capital: string;
    registration_mark: string;  // 这个是你提供的数据中存在的但列表中没有提及的，我也加上了
    taxpayer_id: string;
    province: string;
    city: string;
    district: string;
};

const DEFAULT_VALUES: Partial<CompanyInfo> = {
    address: '-',
    company_name: '-',
    business_scope: '-',
    operation_state: '-',
    company_sort: '-',
    contact_phone: '',
    corporation: '-',
    credit_code: '-',
    credit_score: 0,
    email: '-',
    foundation_date: '-',
    geohash: '-',
    industry: '-',
    lat: 0,
    lng: 0,
    organisation_code: '-',
    registered_capital: '-',
    registration_mark: '-',
    taxpayer_id: '-',
    province: '-',
    city: '-',
    district: '-'
};

type ShopDetailsReturnType = {
    [key in keyof typeof DEFAULT_VALUES]: ReturnType<typeof computed>
} & {
    fetchShopDetails: () => Promise<void>;
};
export const useShopDetails = (companyInfoId: string | number): ShopDetailsReturnType => {
    const company_info = ref<Partial<CompanyInfo>>(DEFAULT_VALUES);

    const fetchShopDetails = async () => {
        try {
            let data = await shopDetailApi(companyInfoId);
            company_info.value = { ...DEFAULT_VALUES, ...data.company_info };
        } catch (error) {
            console.error("Failed to fetch shop details", error);
        }
    };

    const formatPhone = (phone: string) => {
        if (phone.length === 11) {
            return phone.slice(0, 3) + '****' + phone.slice(7);
        } else if (phone.length < 11 && phone.length >= 4) {
            return '****' + phone.slice(-4);
        } else if (phone.length < 4) {
            return phone;
        } else {
            return '-';
        }
    };

    const computedProps = Object.keys(DEFAULT_VALUES).reduce((acc, key) => {
        if (key === 'contact_phone') {
            acc[key] = computed(() => formatPhone(<string>company_info.value[key]));
        } else {
            acc[key] = computed(() => company_info.value[key as keyof typeof company_info.value]);
        }
        return acc;
    }, {} as Record<keyof typeof DEFAULT_VALUES | string, ReturnType<typeof computed>>);


    return {
        ...computedProps,
        fetchShopDetails,
    };
};
