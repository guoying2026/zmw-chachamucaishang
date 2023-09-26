
export type DynamicParams = {
    company_info_id: string | number;
};

export interface Dynamic {
    id: number,
    level: string,
    category: string,
    subCategory: string,
    content: string,
    updateTime: string,
}
