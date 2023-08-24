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
    credit_score: string;
    email: string;
    foundation_date: string;
    geohash: string;
    industry: string;
    lat: string;
    lng: string;
    operation_state: string;
    organisation_code: string;
    registered_capital: string;
    registration_mark: string;  // 这个是你提供的数据中存在的但列表中没有提及的，我也加上了
    taxpayer_id: string;
    province: string;
    city: string;
    district: string;
};


export const useShopDetails = (companyInfoId: string | number) => {
    // 定义一个响应式的company_info对象来保存所有的数据
    const company_info = ref<Partial<CompanyInfo>>({});

    const fetchShopDetails = async () => {
        try {
            let data = await shopDetailApi(companyInfoId);
            // 使用对象解构赋值
            company_info.value = data.company_info;
            console.log('shopDetail composables');
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch shop details", error);
        }
    };

// ... 其他代码

// ... 其他代码，例如定义 company_info ...
    //地址
    const address = computed(() => company_info.value.address);
    //公司名字
    const company_name = computed(() => company_info.value.company_name);
    //经营范围
    const business_scope = computed(() => company_info.value.business_scope);
    //经营状态
    const operation_state = computed(() => company_info.value.operation_state);
    //公司类型
    const company_sort = computed(() => company_info.value.company_sort);
    //联系电话
    const contact_phone = computed(() => company_info.value.contact_phone);
    //法定代表人
    const corporation = computed(() => company_info.value.corporation);
    //统一社会信用代码
    const credit_code = computed(() => company_info.value.credit_code);
    //信用分
    const credit_score = computed(() => company_info.value.credit_score);
    //邮箱
    const email = computed(() => company_info.value.email);
    //成立时间
    const foundation_date = computed(() => company_info.value.foundation_date);
    const geohash = computed(() => company_info.value.geohash);
    const industry = computed(() => company_info.value.industry);
    const lat = computed(() => company_info.value.lat);
    const lng = computed(() => company_info.value.lng);
    const organisation_code = computed(() => company_info.value.organisation_code);
    const registered_capital = computed(() => company_info.value.registered_capital);
    //工商注册号
    const registration_mark = computed(() => company_info.value.registration_mark);
    //纳税人识别号
    const taxpayer_id = computed(() => company_info.value.taxpayer_id);
    const province = computed(() => company_info.value.province);
    const city = computed(() => company_info.value.city);
    const district = computed(() => company_info.value.district);


    return {
        address,
        company_name,
        business_scope,
        company_sort,
        contact_phone,
        corporation,
        credit_code,
        credit_score,
        email,
        foundation_date,
        geohash,
        industry,
        lat,
        lng,
        operation_state,
        organisation_code,
        registered_capital,
        registration_mark,
        taxpayer_id,
        province,
        city,
        district,
        fetchShopDetails,
    };
};
