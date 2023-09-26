import { ref,computed } from 'vue';
import { dynamicApi } from '~/server/api/dynamic';
import {Dynamic} from "~/types/dynamicType";
import {useDynamicStore} from "~/pinia/dynamicStore";

// 定义具有字符串索引签名的类型
type GroupedDataType = {
    [key: string]: any[];  // 这里，我们只知道它是一个数组，但你可能想要为这个数组指定更明确的类型。
};

type DynamicList = {
    id: number,
    cid: number,
    code: string,
    content: string,
    level: number,
    num: number,
    pid: number,
    risk_type: string,
    title: string,
};
type newGuaranteeInformationObj = {
    detailUrl:string
    entName:string
    pid:string
    publicationDate:string
    stockBeGuarantee:string
    stockBeGuaranteeDetailUrl: string
    stockGuarantee:string
    stockGuaranteeAmount:string
    stockGuaranteeDetailUrl:string
    stockGuaranteeMode:string
    stockId: string,
}
type newDeliveryAnnouncementObj = {
    cause: string,
    court: string,
    courtnoticeId: string,
    date: string,
    detailUrl: string,
    people: string[],
    type: string,
};
type subjectedToViolationProcessingObj = {
    decisionAuthority: string,
    detailUrl: string,
    entName: string,
    penaltyAmount: string,
    pid: string,
    publicationDate: string,
    punishedObject: string,
    punishedObjectDetailUrl: string,
    stockId: string,
    violationType: string
}
type spotCheckInspectionOperationObj = {
    dataId: string,
    dataid: string,
    inspectionAuthority: string,
    inspectionDate: string,
    inspectionResult: string
    inspectionType: string
}
type newCourtAnnouncementJudicialDocumentObj = {
    bid: string
    caseNo: string,
    compName: string
    detailUrl: string
    procedure: string
    role: string
    type: string
    verdictDate: string
    wenshuId: string
    wenshuName: string
}
type newCourtAnnouncementObj = {
    cause: string
    court: string
    courtnoticeId: string
    date: string
    detailUrl: string
    people: string []
    type: string
}
type investorInformationChangeCommerceObj ={
    changeDate:string
    changeType:string
    date:string
    fieldName:string
    newValue:string
    oldValue:string
}
type registeredCapitalChangeCommerceObj = {
    changeDate:string
    changeType:string
    date:string
    fieldName:string
    newValue:string
    oldValue:string
}
type companyAddressChangeCommerceObj = {
    changeDate:string
    changeType:string
    date:string
    fieldName:string
    newValue:string
    oldValue:string
}
type companyNameChangeCommerceObj = {
    changeDate:string
    changeType:string
    date:string
    fieldName:string
    newValue:string
    oldValue:string
}
type legalRepresentativeChangeCommerceObj = {
    changeDate:string
    changeType:string
    date:string
    fieldName:string
    newValue:string
    oldValue:string
}
type mainMemberChangeCommerceObj = {
    changeDate:string
    changeType:string
    date:string
    fieldName:string
    newValue:string
    oldValue:string
}
type newCourtSessionAnnouncementObj = {
    author: string
    caseNo: string
    caseReason: string
    content: string
    court: string
    dataId: string
    dataid: string
    defendantlist: string[]
    department: string
    detailUrl: string
    ename: string
    hearingDate: string
    judge: string
    judgeType: string
    plaintifflist: string[]
    pureRole: string
    region: string
    relatedCompanies: object
    tribunal: string
}
type listedInOperationalAnomalyObj = {
    authority:string
    enterDate:string
    enterReason:string
    leaveAuthority:string
    leaveDate:string
    leaveReason:string
}
type newCaseFilingObj = {
    caseNumber: string,
    court: string,
    date: string,
    defendant: string []
    detailUrl: string
    filingInfoId: string
    plaintiff: string []
    relatedCompanies: object
}
type subItemObj = {
    name: string,
    pid: string,
    personId:string,
    entUrl: string,
    personUrl: string
}
type subjectedToAdministrativePenaltyObj = {
    detailUrl: string,
    penalties: string,
    penaltiesDate: string,
    penaltiesId: string,
    penaltiesName: string,
    penaltiesNumber: string,
    penaltiesReason: string,
    penaltiesType: string,
}
type newFinalCaseObj = {
    amount: string
    caseNoTerminal: string
    court: string
    dataId: string
    detailUrl: string
    filingDate: string
    name: string
    nameUrl: string
    pid: string
    terminateDate: string
}
type restrictedHighConsumptionObj = {
    companyName: string,
    companyNum: string,
    companyUrl: string,
    court: string,
    dataId: string,
    detailUrl: string,
    execComapnyName: string,
    personId: string,
    personLogo: string,
    personLogoWord: string,
    personLogoWordRandNum: string,
    personName: string,
    personUrl: string,
    pid: string,
    releaseDate: string,
}
type newSimpleCancellationObj = {
    cancelId: string
    cancelImageUrl: string
    creditNo: string
    departMent: string
    detailUrl: string
    entName: string
    gsScaObjections: string []
    gsScaResult: gsScaResultItem []
    length: string
    noticePeriodDate: string
}
type gsScaResultItem = {
    result: string
}
type equityPledgeValidInvalidObj = {
    dataId: string
    dataid: string
    detailUrl: string
    entName: string
    equalityPawnee: string
    equalityPawneeDetailUrl: string
    equalityPledgeStatusCode: string
    equalityPledgor: string
    equalityPledgorDetailUrl: string
    issueDate: string
    licenseNumber: string
    pid: string
    publicationDate: string
}
type listedInDishonestExecutedPersonObj ={
    discreditId: string
    implementCaseNumber: string
    implementCourtName: string
    performStatus: string
    pid: string
    publishDate: string
    verdictCaseNumber: string
    verdictDate: string
}
type seriousViolationObj = {
    authority: string
    enterDate: string
    enterReason: string
    leaveAuthority: string
    leaveDate: string
    leaveReason: string
}
type newEquityFreezeObj = {
    beExecutedPerson: string
    detailUrl: string
    equalityAmount: string
    notificationNumber: string
    status: string
    stockFreezeKey: string
    type: string
    typeAndStatus: string
}
type executedPersonForcedByCourtDueToLegalObligationObj = {
    court: string
    date: string
    detailUrl: string
    executeName: string
    executeNumber: string
    executedId: string
    executedUrl: string
    pid: string
    subjectMatter: string
}
type subjectedToEnvironmentalPenaltyObj = {
    createdTime: string
    dataId: string
    dataid: string
    detailUrl: string
    documentNo: string
    endDate: string
    illegalType: string
    implementStatus: string
    name: string
    nowStatus: string
    punishmentBasis: string
    punishmentContent: string
    punishmentDate: string
    punishmentDept: string
    punishmentMeasure: string
    punishmentReason: string
    punishmentResult: string
    punishmentTitle: string
    punishmentType: string
    remarks: string
}
type liquidationGroupInformationObj={
    dataId: string
    dataid: string
    employees: string
    leader: string
}
type movableMortgageValidInvalidObj = {
    dataId: string
    detailUrl: string
    guaranteeClaimAmount: string
    guaranteeClaimStatusCode: string
    issueAuthority: string
    issueDate: string
    licenseNumber: string
    pid: string
}
type newJudicialAuctionObj = {
    basis: string
    certificate: string
    court: string
    dataId: string
    dataid: string
    date: string
    description: string
    detailUrl: string
    document: string
    ename: string
    estPrice: string
    name: string
    owner: string
    restrict: string
    result: string
    startPrice: string
}
type newLandMortgageObj = {
    addressCode: string
    baiduCodeMortgagee: string
    baiduCodeMortgagor: string
    dataId: string
    dataid: string
    detailUrl: string
    endTime: string
    entName: string
    evaluationAmount: string
    externalUpdateTime: string
    landArea: string
    landMortgagee: string
    landMortgageeName: string
    landMortgageeProperty: string
    landUseRightNumber: string
    landholdNumber: string
    mortgageAmount: string
    mortgageArea: string
    mortgageLandUse: string
    parcelAddress: string
    parcelNumber: string
    pid: string
    propertyType: string
    startTime: string
    time: string
}
type taxArrearsAnnouncementObj = {
    address: string
    compName: string
    dataId: string
    dataid: string
    date: string
    detailUrl: string
    idNumber: string
    newOverdueAmount: string
    overdueAmount: string
    personName: string
    pid: string
    taxBureau: string
    taxType: string
    taxpayerNum: string
    taxpayersType: string
}
type newEquityPledgeObj = {
    detailUrl: string
    entName: string
    pid: string
    pledgeAmount: string
    pledgeParty: string
    pledgePartyDetailUrl: string
    pledgeRatio: string
    publicationDate: string
    shareholderName: string
    shareholderNameDetailUrl: string
    stockId: string
}
type administrativeLicenseOperationObj = {

}
export const useDynamic = (companyInfoId: number) => {
    const dynamic = ref<Dynamic[]>([]);
    const groupedData = reactive<GroupedDataType>({});
    const getLevelDescription = (level: number): string => {
        switch (level*1) {
            case 1:
                return '利好';
            case 2:
                return '提示';
            case 3:
                return '警示';
            case 4:
                return '风险';
            case 5:
                return '高风险';
            default:
                return '未知级别';
        }
    }

    const newCourtAnnouncementJudicialDocument = (list: [],data: DynamicList) => {
        // console.log('newCourtAnnouncementJudicialDocument');
        // console.log('新增开庭公告');
        // console.log(list);
        // const contents: string[] = [];
        list.forEach((item:newCourtAnnouncementJudicialDocumentObj) => {
            let content = '案号：'+ item.caseNo +"<br/>"+'案由:'+item.type+'<br/>'+item.role+'compName<br/>'+'公告日期：'+item.verdictDate;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '新增开庭公告',
                content: content,
                updateTime: item.verdictDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })

        // {
        //     id: 1,
        //         category: "招投标",
        //     subCategory: "中标结果",
        //     level: "利好",
        //     content: "[终结公告]广东广物木材产业股份有限公司713.99万股",
        //     updateTime: "2022-12-16",
        // },
        // console.log('拼接content');
        // console.log(contents);
        return list;
    }
    const investorInformationChangeCommerce = (list: [],data: DynamicList) => {
        // console.log('investorInformationChangeCommerce');
        // console.log('投资人信息变更-工商');
        // console.log(list);
        // const contents: string[] = [];
        list.forEach((item:investorInformationChangeCommerceObj) => {
            let content = item.changeType +"<br/>"+'从“'+item.oldValue+'”变成“'+item.newValue+'”<br/>'+'变更日期：'+item.changeDate;
            let obj:Dynamic = {
                id: data.id,
                level: "提示",
                category: '工商',
                subCategory: '股东变更',
                content: content,
                updateTime: item.changeDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log('拼接content');
        // console.log(contents);
        return list;
    }
    const registeredCapitalChangeCommerce = (list: [],data: DynamicList) => {
        // console.log('registeredCapitalChangeCommerce');
        // console.log('注册资本变更-工商');
        // console.log(list);
        // const contents: string[] = [];
        list.forEach((item: registeredCapitalChangeCommerceObj) => {
            let content = item.changeType +"<br/>"+'从“'+item.oldValue+'万元”变成“'+item.newValue+'万元”<br/>'+'变更日期：'+item.changeDate;
            let obj:Dynamic = {
                id: data.id,
                level: "提示",
                category: '工商',
                subCategory: '注册资本变更',
                content: content,
                updateTime: item.changeDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log('拼接content');
        // console.log(contents);
        return list;
    }
    const companyAddressChangeCommerce = (list: [],data: DynamicList) => {
        // console.log('companyAddressChangeCommerce');
        // console.log('企业地址变更-工商');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item:companyAddressChangeCommerceObj) => {
            let content = item.changeType +"<br/>"+'从“'+item.oldValue+'”变成“'+item.newValue+'”<br/>'+'变更日期：'+item.changeDate;
            let obj:Dynamic = {
                id: data.id,
                level: "提示",
                category: '工商',
                subCategory: '企业地址变更',
                content: content,
                updateTime: item.changeDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log('拼接content');
        // console.log(contents);
        return list;
    }
    const newCourtSessionAnnouncement = (list: [],data: DynamicList) => {
        // console.log('newCourtSessionAnnouncement');
        // console.log('新增开庭公告');
        // //"法院:秦皇岛市山海关区人民法院；开庭日期:2018-08-01；开庭时间:9:00；法庭:第三审判庭；案号:（2018）冀0303民初2537号；法官:梁德印；当事人:庞大汽贸集团股份有限公司秦皇岛分公司,张浩生,是否庭审直播；原告:庞大汽贸集团股份有限公司秦皇岛分公司；被告:张浩生"
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item:newCourtSessionAnnouncementObj) => {
            let content = '案号：'+item.caseNo +"<br/>"+'案由：'+item.caseReason+'<br/>法院：'+item.court+'<br/>开庭日期：'+item.hearingDate+'<br/>';
            if(item.plaintifflist.length > 0){
                content += '当事人：<br/>'
                content += '原告：<br/>';
            }
            //原告
            item.plaintifflist.forEach((subItem) => {
                content += subItem + '<br/>';
            })
            if(item.defendantlist.length > 0){
                content += '被告：<br/>';
            }
            //被告
            item.defendantlist.forEach((subItem) => {
                content += subItem + '<br/>';
            })
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '新增开庭公告',
                content: content,
                updateTime: item.hearingDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const listedInOperationalAnomaly = (list: [],data:DynamicList) => {
        // console.log('listedInOperationalAnomaly');
        // console.log('被列入经营异常');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item:listedInOperationalAnomalyObj) => {
            let content = '被列入经营异常' +"<br/>处理人："+item.authority+'<br/>原因'+item.enterReason+'<br/>发布日期：'+item.enterDate;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '被列入经营异常',
                content: content,
                updateTime: item.enterDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        return list;
    }
    const companyNameChangeCommerce = (list: [],data: DynamicList) => {
        // console.log('companyNameChangeCommerce');
        // console.log('企业名称变更-工商');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item:companyNameChangeCommerceObj) => {
            let content = item.changeType +"<br/>"+'从“'+item.oldValue+'”变成“'+item.newValue+'”<br/>'+'变更日期：'+item.changeDate;
            let obj:Dynamic = {
                id: data.id,
                level: "提示",
                category: '工商',
                subCategory: '企业名称变更',
                content: content,
                updateTime: item.date,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        return list;
    }
    const newCaseFiling = (list: [],data: DynamicList) => {
        // console.log('newCaseFiling');
        // console.log('新增立案');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item:newCaseFilingObj) => {
            let content = '案号：'+item.caseNumber +"<br/>法院："+item.court+'<br/>开庭日期：'+item.date+'<br/>';
            if(item.plaintiff.length > 0){
                content += '当事人：<br/>'
                content += '原告：<br/>';
            }

            //原告
            item.plaintiff.forEach((subItem:any) => {
                content += subItem.name + '<br/>';
            })
            if(item.defendant.length > 0){
                content += '被告：<br/>';
            }
            //被告
            item.defendant.forEach((subItem: any) => {
                content += subItem.name + '<br/>';
            })
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '新增立案',
                content: content,
                updateTime: item.date,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const legalRepresentativeChangeCommerce = (list: [],data: DynamicList) => {
        // console.log('legalRepresentativeChangeCommerce');
        // console.log('法定代表人变更-工商');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item:legalRepresentativeChangeCommerceObj) => {
            let content = item.changeType +"<br/>"+'从“'+item.oldValue+'”变成“'+item.newValue+'”<br/>'+'变更日期：'+item.changeDate;
            let obj:Dynamic = {
                id: data.id,
                level: "提示",
                category: '工商',
                subCategory: '法定代表人变更',
                content: content,
                updateTime: item.date,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const mainMemberChangeCommerce = (list: [],data: DynamicList) => {
        // console.log('mainMemberChangeCommerce');
        // console.log('主要成员变更-工商');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item:mainMemberChangeCommerceObj) => {
            let content = item.changeType +"<br/>"+'从“'+item.oldValue+'”变成“'+item.newValue+'”<br/>'+'变更日期：'+item.changeDate;
            let obj:Dynamic = {
                id: data.id,
                level: "提示",
                category: '工商',
                subCategory: '主要成员变更',
                content: content,
                updateTime: item.date,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const newCourtAnnouncement = (list: [],data: DynamicList) => {
        // console.log('newCourtAnnouncement');
        // console.log('新增法院公告');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item:newCourtAnnouncementObj) => {
            let content = '法院公告：'+ item.type +"<br/>"+'法院:'+item.court+'<br/>案由：'+item.cause+'<br/>公告日期：'+item.date;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '新增法院公告',
                content: content,
                updateTime: item.date,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const subjectedToAdministrativePenalty = (list: [],data: DynamicList) => {
        // console.log('subjectedToAdministrativePenalty');
        // console.log('被行政处罚');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item: subjectedToAdministrativePenaltyObj) => {
            let content = '决定文书号：'+ item.penaltiesNumber+'<br/>违法事实'+item.penaltiesReason+'<br/>处罚类型：'+item.penaltiesType+'<br/>处罚单位：'+item.penalties+'<br/>决定日期：'+item.penaltiesDate;
            let obj:Dynamic = {
                id: data.id,
                level: "风险",
                category: '风险',
                subCategory: '被行政处罚',
                content: content,
                updateTime: item.penaltiesDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const newFinalCase = (list: [],data:DynamicList) => {
        // console.log('newFinalCase');
        // console.log('新增终本案件');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item: newFinalCaseObj) => {
            let content = '案号：'+ item.caseNoTerminal+'<br/>被执行人：'+item.name+'<br/>执行标的元：'+item.amount+'<br/>执行法院：'+item.court+'<br/>立案日期：'+item.filingDate+'<br/>终本日期'+item.terminateDate;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '新增终本案件',
                content: content,
                updateTime: item.terminateDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const restrictedHighConsumption = (list: [],data: DynamicList) => {
        // console.log('restrictedHighConsumption');
        // console.log('被限制高消费');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item: restrictedHighConsumptionObj) => {
            let content = '限消令对象：' +item.companyName+'<br/>关联对象：'+item.personName+'<br/>执行法院：'+item.court+'<br/>发布日期：'+item.releaseDate;
            let obj:Dynamic = {
                id: data.id,
                level: "高风险",
                category: '风险',
                subCategory: '被限制高消费',
                content: content,
                updateTime: item.releaseDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const newSimpleCancellation = (list: [],data: DynamicList) => {
        // console.log('newSimpleCancellation');
        // console.log('新增简易注销');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item:newSimpleCancellationObj) => {
            let content = '';
            if (item.gsScaResult && item.gsScaResult.length > 0) {
                content = '企业名称：' + item.entName + '<br/>简易注销结果：' + item.gsScaResult[0].result + '<br/>登记机关：' + item.departMent + '<br/>公告期：' + item.noticePeriodDate;
                let obj:Dynamic = {
                    id: data.id,
                    level: getLevelDescription(data.level),
                    category: '风险',
                    subCategory: '新增简易注销',
                    content: content,
                    updateTime: item.noticePeriodDate,
                }
                dynamic.value.push(obj);
            }
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const equityPledgeValidInvalid = (list: [],data: DynamicList) => {
        // console.log('equityPledgeValidInvalid');
        console.log('股权出质 有效/无效:');
        // console.log(list);
        // const contents: string [] = [];
        console.log(list);
        list.forEach((item: equityPledgeValidInvalidObj) => {
            let content = '登记编号：'+item.licenseNumber +'<br/>出质人：'+item.equalityPawnee+'<br/>质权人：'+item.equalityPledgor+'<br/>出质状态：'+item.equalityPledgeStatusCode+'<br/>登记日期：'+item.publicationDate;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '股权出质'+item.equalityPledgeStatusCode,
                content: content,
                updateTime: item.publicationDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const listedInDishonestExecutedPerson = (list: [],data: DynamicList) => {
        // console.log('listedInDishonesExecutedPerson');
        // console.log('被列入失信被执行人');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item: listedInDishonestExecutedPersonObj) => {
            let content = '案号：'+item.verdictCaseNumber+'<br/>执行依据文号：'+item.implementCaseNumber+'<br/>执行法院：'+item.implementCourtName+'<br/>被执行人的履行情况：'+item.performStatus+'<br/>立案日期：'+item.verdictDate+'<br/>发布日期：'+item.publishDate;
            let obj:Dynamic = {
                id: data.id,
                level: '高风险',
                category: '风险',
                subCategory: '被列入失信被执行人',
                content: content,
                updateTime: item.publishDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const seriousViolation = (list: [],data: DynamicList) => {
        // console.log('seriousViolation');
        //
        // console.log('严重违法');
        // console.log(list);
        // const contents: Dynamic [] = [];
        list.forEach((item: seriousViolationObj) => {
            let content = '列入日期：'+item.enterDate+'<br/>作出决定机关(列入)：'+item.authority+'<br/>列入原因：'+item.enterReason;
            let obj:Dynamic = {
                id: data.id,
                level: "高风险",
                category: '风险',
                subCategory: '严重违法',
                content: content,
                updateTime: item.enterDate,
            }
            dynamic.value.push(obj);
        })

        // console.log(contents);
        return list;
    }
    const newEquityFreeze = (list: [],data: DynamicList) => {
        // console.log('newEquityFreeze');
        // console.log('新增股权冻结');
        //
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item: newEquityFreezeObj) => {
            let content = '执行通知书文号：'+item.notificationNumber+'<br/>被执行人：'+item.beExecutedPerson+'<br/>股权数额：'+item.equalityAmount+'<br/>类型|状态：'+item.typeAndStatus;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '新增股权冻结',
                content: content,
                updateTime: '-',
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const actualCapitalChangeCommerce = (list: [],data: DynamicList) => {
        console.log('actualCapitalChangeCommerce');
        console.log('实收资本变更-工商');
        console.log(list);

        return list;
    }
    const executedPersonForcedByCourtDueToLegalObligation = (list: [],data: DynamicList) => {
        // console.log('executedPersonForcedByCourtDueToLegalObligation');
        // console.log('被执行人曾因未按时履行法律义务而被法院强制执行');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item:executedPersonForcedByCourtDueToLegalObligationObj) => {
            let content = '【被执行人曾因未按时履行法律义务而被法院强制执行】执行通知书文号：'+item.executeNumber+'<br/>被执行人：'+item.executeName+'<br/>法院：'+item.court+'<br/>处罚金额：'+item.subjectMatter;
            let obj:Dynamic = {
                id: data.id,
                level: "高风险",
                category: '新闻',
                subCategory: '消极',
                content: content,
                updateTime: item.date,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const subjectedToEnvironmentalPenalty = (list: [],data: DynamicList) => {
        // console.log('subjectedToAdministrativePenalty');
        // console.log('被环保处罚');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item:subjectedToEnvironmentalPenaltyObj) => {
            let content = '决定文书号：'+item.documentNo+'<br/>违法事实：'+item.punishmentReason+'<br/>处罚结果：'+item.punishmentResult+'<br/>处罚单位：'+item.punishmentDept+'<br/>处罚日期：'+item.punishmentDate;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '被环保处罚',
                content: content,
                updateTime: item.punishmentDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const liquidationGroupInformation = (list: [],data: DynamicList) => {
        // console.log('liquidationGroupInformation');
        // console.log('有清算消息');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item:liquidationGroupInformationObj) => {
            let content = '清算组负责人：'+item.leader+'<br/>清算组成员：'+item.employees;
            let obj:Dynamic = {
                id: data.id,
                level: "警示",
                category: '新闻',
                subCategory: '中立',
                content: content,
                updateTime: '-',
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const movableMortgageValidInvalid = (list: [],data: DynamicList) => {
        // console.log('movableMortgageValidInvalid');
        console.log('动产抵押 有效/无效');
        console.log(list);
        // const contents: string [] = [];
        list.forEach((item:movableMortgageValidInvalidObj) => {
            let content = '登记编号：'+item.licenseNumber+'<br/>登记机关：'+item.issueAuthority+'<br/>被担保主债权数额：'+item.guaranteeClaimAmount+'<br/>状态：'+item.guaranteeClaimStatusCode+'<br/>登记日期：'+item.issueDate;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '动产抵押',
                content: content,
                updateTime: item.issueDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const newJudicialAuction = (list: [],data:DynamicList) => {
        // console.log('newJudicialAuction');
        // console.log('新增司法拍卖');
        // console.log(list);
        // const contents: string [] = [];
        list.forEach((item: newJudicialAuctionObj) => {
            let content = '标题：'+item.name+'<br/>处置单位：'+item.court+'<br/>描述：'+item.description;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '新增司法拍卖',
                content: content,
                updateTime: item.date,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);

        return list;
    }
    const newLandMortgage = (list: [],data: DynamicList) => {
        console.log('newLandMortgage');
        console.log('新增土地抵押');
        console.log(list);
        const contents: string[] = [];
        list.forEach((item: newLandMortgageObj) => {
            let content = '';
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '新增司法拍卖',
                content: content,
                updateTime: item.time,
            }
            dynamic.value.push(obj);
            contents.push(content);
        })
        console.log(contents);
        return list;
    }
    const inquiryEvaluation = (list: [],data: DynamicList) => {
        console.log('inquiryEvaluation');
        console.log('询价评估');
        console.log(list);
        const contents : string[] = [];
        list.forEach((item:newLandMortgageObj) => {
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '询价评估',
                content: '',
                updateTime: item.time,
            }
            dynamic.value.push(obj);
        })
        return list;
    }
    const taxArrearsAnnouncement = (list: [],data: DynamicList) => {
        // console.log('taxArrearsAnnouncement');

        // console.log('欠税公告');
        // console.log(list);
        // const contents : string[] = [];
        list.forEach((item:taxArrearsAnnouncementObj) => {
            let content = '欠税税种：'+item.taxType+'<br/>欠税余额：'+item.overdueAmount+'元<br/>发布单位：'+item.taxBureau+'<br/>发布日期：'+item.date;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '欠税公告',
                content: content,
                updateTime: item.date,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);

        return list;
    }

    const newDeliveryAnnouncement = (list: [],data: DynamicList) => {
        // console.log('送达公告');
        // console.log(list);
        // const contents: string[] = [];
        list.forEach((item:newDeliveryAnnouncementObj) => {
            let content = '[送达公告]'+ item.court +"<br/>"+'公告案由:'+item.cause+'<br/>'+'公告日期：'+item.date+'<br/>';
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '新增送达公告',
                content: content,
                updateTime: item.date,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log('拼接content');
        // console.log(contents);
        return list;
    }
    const newTaxViolation = (list: [],data: DynamicList) => {
        console.log('newTaxViolation');
        console.log(list);
        return list;
    }
    const newGuaranteeInformation = (list: [],data: DynamicList) => {
        // console.log('newGuaranteeInformation');
        // console.log('新增担保信息');
        // console.log(list);

        // const contents: string[] = [];
        list.forEach((item:newGuaranteeInformationObj) => {
            let content = '担保方：'+ item.entName +"<br/>"+'被担保方:'+item.stockBeGuarantee+'<br/>'+'担保方式：'+item.stockGuaranteeMode+'<br/>'+'担保金额：'+item.stockGuaranteeAmount+'万元<br/>公告日期：'+item.publicationDate;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '新增送达公告',
                content: content,
                updateTime: item.publicationDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log('拼接content');
        // console.log(contents);
        return list;
    }
    const spotCheckInspectionOperation = (list: [],data: DynamicList) => {
        // console.log('spotCheckInspectionOperation');
        // console.log('抽查检查');
        // console.log(list);
        // const contents: string[] = [];
        list.forEach((item:spotCheckInspectionOperationObj) => {
            let content = '检查实施机关：'+item.inspectionAuthority+"<br/>"+"类型：抽查<br/>日期："+item.inspectionDate+"<br/>结果："+item.inspectionResult;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '经营',
                subCategory: '抽查检查',
                content: content,
                updateTime: item.inspectionDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        return list;
    }
    const subjectedToViolationProcessing = (list: [],data: DynamicList) => {
        // console.log('subjectedToViolationProcessing');
        // console.log('受到违规处理');
        // console.log(list);
        // const contents: string[] = [];
        list.forEach((item:subjectedToViolationProcessingObj) => {
            let content = '类型：违规处理<br/>处罚对象'+ item.entName +'<br/>处理人:'+item.decisionAuthority+'<br/>'+'违规行为：'+item.violationType+'<br/>'+'处罚金额：'+item.penaltyAmount+'万元<br/>公告日期：'+item.publicationDate;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '受到违规处理',
                content: content,
                updateTime: item.publicationDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log('拼接content');
        // console.log(contents);
        return list;
    }
    const newEquityPledge = (list: [],data: DynamicList) => {
        // console.log('newEquityPledge');
        // console.log('新增股权出质');
        // console.log(list);
        // const contents: string[] = [];
        list.forEach((item:newEquityPledgeObj) => {
            let content = '公告日期：'+ item.publicationDate +'<br/>股东名称：'+item.shareholderName+'<br/>'+'质押方：'+item.pledgeParty+'<br/>'+'质押股票(万股)：'+item.pledgeAmount+'<br/>占总股比例：'+item.pledgeRatio;
            let obj:Dynamic = {
                id: data.id,
                level: getLevelDescription(data.level),
                category: '风险',
                subCategory: '新增股权出质',
                content: content,
                updateTime: item.publicationDate,
            }
            dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const administrativeLicenseOperation = (list: [],data: DynamicList) => {
        console.log('administrativeLicenseOperation');
        console.log('行政许可');
        console.log(list);
        const contents: string[] = [];
        list.forEach((item:administrativeLicenseOperationObj) => {
            // let content = '公告日期：'+ item.publicationDate +'<br/>股东名称：'+item.shareholderName+'<br/>'+'质押方：'+item.pledgeParty+'<br/>'+'质押股票(万股)：'+item.pledgeAmount+'<br/>占总股比例：'+item.pledgeRatio;
            // let obj:Dynamic = {
            //     id: data.id,
            //     level: getLevelDescription(data.level),
            //     category: '风险',
            //     subCategory: '新增股权出质',
            //     content: content,
            //     updateTime: item.publicationDate,
            // }
            // dynamic.value.push(obj);
            // contents.push(content);
        })
        // console.log(contents);
        return list;
    }
    const foodSamplingUnqualified = (list: [],data: DynamicList) => {
        console.log('foodSamplingUnqualified');
        return list;
    }
    const groupAndSortData = (data: DynamicList) => {
        if (!data || !data.code || !data.content) return;

        // 解析content
        const parsedContent = JSON.parse(data.content);
        if (!parsedContent || !parsedContent.data || !parsedContent.data.list) return;
        // console.log(parsedContent.data.list);

        let processedList;
        switch(data.code) {
            case 'C00017':
                processedList = newCourtAnnouncementJudicialDocument(parsedContent.data.list,data);
                break;

            case 'investorChange':
                processedList = investorInformationChangeCommerce(parsedContent.data.list,data);
                break;

            case 'registeredChange':
                processedList = registeredCapitalChangeCommerce(parsedContent.data.list,data);
                break;

            case 'adressChange':
                processedList = companyAddressChangeCommerce(parsedContent.data.list,data);
                break;
            case 'C00086':
                processedList = newCourtSessionAnnouncement(parsedContent.data.list,data);
                break;
            case 'C00012':
                processedList = listedInOperationalAnomaly(parsedContent.data.list,data);
                break;
            case 'nameChange':
                processedList = companyNameChangeCommerce(parsedContent.data.list,data);
                break;
            case 'abnormalRisk':
                processedList = listedInOperationalAnomaly(parsedContent.data.list,data);
                break;
            case 'C00088':
                processedList = newCaseFiling(parsedContent.data.list,data);
                break;
            case 'legalpersonChange':
                processedList = legalRepresentativeChangeCommerce(parsedContent.data.list,data);
                break;
            case 'mainPersonChange':
                processedList = mainMemberChangeCommerce(parsedContent.data.list,data);
                break;
            case 'C00087':
                processedList = newCourtAnnouncement(parsedContent.data.list,data);
                break;
            case 'C00019':
                processedList = subjectedToAdministrativePenalty(parsedContent.data.list,data);
                break;
            case 'C00083':
                processedList = newFinalCase(parsedContent.data.list,data);
                break;
            case 'C00082':
                processedList = restrictedHighConsumption(parsedContent.data.list,data);
                break;
            case 'C00040':
                processedList = newSimpleCancellation(parsedContent.data.list,data);
                break;
            case 'C00035':
                processedList = equityPledgeValidInvalid(parsedContent.data.list,data);
                break;
            case 'C00001':
                processedList = listedInDishonestExecutedPerson(parsedContent.data.list,data);
                break;
            case 'C00039':
                processedList = seriousViolation(parsedContent.data.list,data);
                break;
            case 'C00042':
                processedList = newEquityFreeze(parsedContent.data.list,data);
                break;
            case 'capitalChange':
                processedList = actualCapitalChangeCommerce(parsedContent.data.list,data);
                break;
            case 'C00081':
                processedList = executedPersonForcedByCourtDueToLegalObligation(parsedContent.data.list,data);
                break;
            case 'C00107':
                processedList = subjectedToEnvironmentalPenalty(parsedContent.data.list,data);
                break;
            case 'illegalRisk':
                processedList = seriousViolation(parsedContent.data.list,data);
                break;
            case 'C00043':
                processedList = liquidationGroupInformation(parsedContent.data.list,data);
                break;
            case 'C00034':
                processedList = movableMortgageValidInvalid(parsedContent.data.list,data);
                break;
            case 'C00090':
                processedList = newJudicialAuction(parsedContent.data.list,data);
                break;
            case 'C00097':
                processedList = newLandMortgage(parsedContent.data.list,data);
                break;
            case 'C00116':
                processedList = inquiryEvaluation(parsedContent.data.list,data);
                break;
            case 'C00105':
                processedList = taxArrearsAnnouncement(parsedContent.data.list,data);
                break;
            case 'COURT_NOTICE':
                processedList = newDeliveryAnnouncement(parsedContent.data.list,data);
                break;
            case 'C00073':
                processedList = newTaxViolation(parsedContent.data.list,data);
                break;
            case 'C00069':
                processedList = newGuaranteeInformation(parsedContent.data.list,data);
                break;
            case 'C00036':
                processedList = spotCheckInspectionOperation(parsedContent.data.list,data);
                break;
            case 'C00070':
                processedList = subjectedToViolationProcessing(parsedContent.data.list,data);
                break;
            case 'C00068':
                processedList = newEquityPledge(parsedContent.data.list,data);
                break;
            case 'C00041':
                processedList = administrativeLicenseOperation(parsedContent.data.list,data);
                break;
            case 'C00018':
                processedList = foodSamplingUnqualified(parsedContent.data.list,data);
                break;
            // ... 其他36个case

            default:
                processedList = parsedContent.data.list;
                return;
        }

        // 按时间排序
        // listData.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 以code值为键，将数据插入数组
        if (!groupedData[data.code]) {
            groupedData[data.code] = [];
        }
        groupedData[data.code].push(...processedList);
    };
    const fetchDynamic = async () => {
        try {
             console.log('fetchDynamic');
            let data = await dynamicApi(companyInfoId);
            console.log(data.risk_info);
            // 遍历dataArray并处理每个数据项
            data.risk_info.forEach((item: DynamicList) => {
                groupAndSortData(item);
            });
            console.log('dynamic');
            console.log(dynamic.value);
            const dynamicSore = useDynamicStore();
            dynamicSore.setDynamics(dynamic.value);
            return dynamic.value;
            // 调用函数处理数据
        } catch (error) {
            console.error("Failed to fetch shop details", error);
        }
    };

    return {
        fetchDynamic,
    };
};
