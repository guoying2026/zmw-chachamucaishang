import { ref,computed } from 'vue';
import { shopDetailApi } from '~/server/api/shop';

type CompanyInfo = {
    address: string;
    company_name: string;
    company_en_name: string;
    former_name: string;
    business_scope: string;
    company_sort: string;
    contact_phone: string;
    more_contact_phone: string;
    corporation: string;
    credit_code: string;
    credit_score: number;
    email: string;
    more_email: string;
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
    tax_level: string;
    staff_size: string;
    insured_num: string;
    business_term: string;
    taxpayer_qualification: string;
    registration_status: string;
    approval_date: string;
    registration_authority: string;
};


export const useShopDetails = (companyInfoId: string | number) => {
    // 定义一个响应式的company_info对象来保存所有的数据
    const company_info = ref<Partial<CompanyInfo>>({});

    const fetchShopDetails = async () => {
        try {
            let data = await shopDetailApi(companyInfoId);
            // 使用对象解构赋值
            company_info.value = data.company_info;
        } catch (error) {
            console.error("Failed to fetch shop details", error);
        }
    };

// ... 其他代码

// ... 其他代码，例如定义 company_info ...
    //地址
    const address = computed(() => company_info.value.address || '-');
    //公司名字
    const company_name = computed(() => company_info.value.company_name || '-');
    // 公司英文名
    const company_en_name = computed(() => company_info.value.company_en_name || '-');
    // 公司曾用名
    const former_name = computed(() => company_info.value.former_name || '-');
    //经营范围
    const business_scope = computed(() => company_info.value.business_scope || '-');
    //经营状态
    const operation_state = computed(() => company_info.value.operation_state || '-');
    //公司类型
    const company_sort = computed(() => company_info.value.company_sort || '-');
    //联系电话
    const contact_phone = computed(() => {
        const phone = company_info.value.contact_phone;

        if (phone && phone.length === 11) {
            return phone.slice(0, 3) + '****' + phone.slice(7);
        } else if (phone && phone.length < 11 && phone.length >= 4) {
            return '****' + phone.slice(-4);
        } else if (phone && phone.length < 4) {
            return phone;
        } else {
            return '-';
        }
    });
    // 更多联系电话
    const more_contact_phone = computed(() => {
        const phones = company_info.value.more_contact_phone;
        if (!phones) return [];
        let phoneArr = phones.split(',');
        phoneArr = phoneArr.map(phone => {
            if (phone && phone.length === 11) {
                return phone.slice(0, 3) + '****' + phone.slice(7);
            } else if (phone && phone.length < 11 && phone.length >= 4) {
                return '****' + phone.slice(-4);
            } else if (phone && phone.length < 4) {
                return phone;
            } else {
                return '-';
            }
        });
        return phoneArr;
    })
    //法定代表人
    const corporation = computed(() => company_info.value.corporation || '-');
    //统一社会信用代码
    const credit_code = computed(() => company_info.value.credit_code || '-');
    //信用分
    const credit_score = computed(() => company_info.value.credit_score || 0);
    //邮箱
    const email = computed(() => company_info.value.email || '-');
    // 更多邮箱
    const more_email = computed(() => {
        const emails = company_info.value.more_email;
        if (!emails) return [];
        return emails.split(',');
    });
    //成立时间
    const foundation_date = computed(() => company_info.value.foundation_date || '-');
    const geohash = computed(() => company_info.value.geohash || '-');
    const industry = computed(() => company_info.value.industry || '-');
    const lat = computed(() => company_info.value.lat || 0);
    const lng = computed(() => company_info.value.lng || 0);
    const organisation_code = computed(() => company_info.value.organisation_code || '-');
    const registered_capital = computed(() => company_info.value.registered_capital || '-');
    //工商注册号
    const registration_mark = computed(() => company_info.value.registration_mark || '-');
    //纳税人识别号
    const taxpayer_id = computed(() => company_info.value.taxpayer_id || '-');
    const province = computed(() => company_info.value.province || '-');
    const city = computed(() => company_info.value.city || '-');
    const district = computed(() => company_info.value.district || '-');
    // 税务登记
    const tax_level = computed(() => company_info.value.tax_level || '-');
    // 人员规模
    const staff_size = computed(() => company_info.value.staff_size || '-');
    // 参保人数
    const insured_num = computed(() => company_info.value.insured_num || '-');
    // 营业期限
    const business_term = computed(() => company_info.value.business_term || '-');
    // 纳税人资质
    const taxpayer_qualification = computed(() => company_info.value.taxpayer_qualification || '-');
    // 登记状态
    const registration_status = computed(() => company_info.value.registration_status || '-');
    // 核准日期
    const approval_date = computed(() => company_info.value.approval_date || '-');
    // 登记机关
    const registration_authority = computed(() => company_info.value.registration_authority || '-');


    return {
        address,
        company_name,
        company_en_name,
        former_name,
        business_scope,
        company_sort,
        contact_phone,
        more_contact_phone,
        corporation,
        credit_code,
        credit_score,
        email,
        more_email,
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
        tax_level,
        staff_size,
        insured_num,
        business_term,
        taxpayer_qualification,
        registration_status,
        approval_date,
        registration_authority,
        fetchShopDetails,
    };
};
