import http from "./httpsConfig";
import url from "../config/requestConfig";
import axios from "axios";
/**
 * 获取用户信息
 */
function getUserInfo() {
  return new Promise((resolve, reject) => {
    http("get", url.getUserInfo, {}).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 文件上传
 * type :0:图片上传 1:Pdf上传 2:Excel文件 3: 反馈 4:律师认证 5:债权人 6:会员头像图片
 */
function uploadFil(fromData: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: url.uploadFil + "?type=6",
      params: fromData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => {
        if (res.data.status === 200) {
          resolve(res);
        }
        if (res.data.status !== 200) {
          return false;
        }
      })
      .catch(error => {
        console.log("网络异常~", error);
        reject(error);
      });
  });
}
/**
 * 获取当前会员的债权人信息
 */
function GetMyCreditor(creditor_type: string) {
  return new Promise((resolve, reject) => {
    http("get", url.GetMyCreditor, { creditor_type }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}

/**
 * 获取全部地区信息
 */
function getAllRegion() {
  return new Promise((resolve, reject) => {
    http("get", url.getAllRegion, {}).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}

/**
 * 获取所有币种
 */
function getAllCurrency() {
  return new Promise((resolve, reject) => {
    http("get", url.getAllCurrency, {}).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 保存债权人信息
 */
function saveCCreditor(parmas: any) {
  return new Promise((resolve, reject) => {
    http("post", url.saveCCreditor, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 更新债权人信息
 */
function updateCreditor(parmas: any) {
  return new Promise((resolve, reject) => {
    http("post", url.updateCreditor, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 证照识别
 */
function Recognitiion(parmas: any) {
  return new Promise((resolve, reject) => {
    http("post", url.Recognitiion, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 创建AI律师函
 */
function CreateAiOrder(parmas: any) {
  return new Promise((resolve, reject) => {
    http("post", url.CreateAILawyerLetter, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 获取微信配置
 */
function GetWeChatConfig(path: string) {
  return new Promise((resolve, reject) => {
    http("post", url.GetWeChatConfig, { url: path }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 获取订单详情
 */
function GetOrderDetails(pay_number: string) {
  return new Promise((resolve, reject) => {
    http("get", url.GetOrderDetails, { pay_number }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 获取openid
 */
function getOpenId(code: string) {
  return new Promise((resolve, reject) => {
    http("get", url.getOpenId, { code }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 微信支付
 */
function WeChatPay(parmas: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url.WeChatPay,
      baseURL: "https://pay.debteehelper.com/api/",
      params: parmas
    })
      .then((res: any) => {
        resolve(res);
      })
      .catch(error => {
        console.log("网络异常~", error);
        reject(error);
      });
  });
}
/**
 * 获取用户的AI律师函列表
 */
function getOrderList(params: any) {
  return new Promise((resolve, reject) => {
    http("get", url.getOrderList, params).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 获取用户的AI律师函详情
 */
function getOrderInfo(debtor_number: string) {
  return new Promise((resolve, reject) => {
    http("get", url.getOrderInfo, { debtor_number }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 查询订单支付状态
 */
function OrderQuery(out_trade_no: string) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url.OrderQuery,
      baseURL: "https://pay.debteehelper.com/api/",
      params: { out_trade_no }
    })
      .then((res: any) => {
        resolve(res);
      })
      .catch(error => {
        console.log("网络异常~", error);
        reject(error);
      });
  });
}
/**
 * 获取用户的AI律师函详情
 */
function StopOrder(params: any) {
  return new Promise((resolve, reject) => {
    http("get", url.StopOrder, params).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 获取微信配置
 */
function UserEdit(parmas: any) {
  return new Promise((resolve, reject) => {
    http("post", url.UserEdit, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 创建律师办案
 */
function Createcase(parmas: any) {
  return new Promise((resolve, reject) => {
    http("post", url.CreateCase, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}

/**
 * 创建律师办案
 */
function getLawyerCases(parmas: any) {
  return new Promise((resolve, reject) => {
    http("get", url.getLawyerCases, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}

/**
 * 获取律师办案案件事项
 */
function getLawyerCaseMatters(parmas: any) {
  return new Promise((resolve, reject) => {
    http("get", url.getLawyerCaseMatters, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}

/**
 * 律师端获取接案状态
 */
function GetLawyerCaseStatus(debtor_number: string) {
  return new Promise((resolve, reject) => {
    http("get", url.GetLawyerCaseStatus, { debtor_number }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 获取案件法院信息
 */
function GetCaseCourt(debtor_number: string) {
  return new Promise((resolve, reject) => {
    http("get", url.GetCaseCourt, { debtor_number }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 获取表单详情
 */
function GetCaseMattersFromDetails(matters_from_id: string) {
  return new Promise((resolve, reject) => {
    http("get", url.GetCaseMattersFromDetails, { matters_from_id }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 线上合同签署
 */
function ContractNotice(contract_id: string) {
  return new Promise((resolve, reject) => {
    http("get", url.ContractNotice, { contract_id }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 线上合同查看
 */
function ContractSee(contract_id: string) {
  return new Promise((resolve, reject) => {
    http("get", url.ContractSee, { contract_id }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 获取案件详情
 */
function GetCaseDetails(debtor_number: string) {
  return new Promise((resolve, reject) => {
    http("get", url.GetCaseDetails, { debtor_number }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 案件服务费选择
 */
function ServiceFeeSelection(parmas: any) {
  return new Promise((resolve, reject) => {
    http("get", url.ServiceFeeSelection, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 创建律师查档委托
 */
function CreateQueryQrchives(parmas: any) {
  return new Promise((resolve, reject) => {
    http("post", url.CreateQueryQrchives, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 创建诉讼助资委托
 */
function CreateLitigationFunding(parmas: any) {
  return new Promise((resolve, reject) => {
    http("post", url.CreateLitigationFunding, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 创建保全保险委托
 */
function CreatePreservationInsurance(parmas: any) {
  return new Promise((resolve, reject) => {
    http("post", url.CreatePreservationInsurance, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}

/**
 * 获取增值服务分页数据
 */
function GetServicesPagingData(parmas: any) {
  return new Promise((resolve, reject) => {
    http("get", url.GetServicesPagingData, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
/**
 * 获取增值服务分页数据
 */
function GetServiceDetails(parmas: any) {
  return new Promise((resolve, reject) => {
    http("get", url.GetServiceDetails, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
//根据id获取地址
function GetAddressDetails(parmas: any) {
  return new Promise((resolve, reject) => {
    http("post", url.GetAddressDetails, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
//小程序中间页点击计数
function UrlClicksCount(debtor_number: any) {
  return new Promise((resolve, reject) => {
    http("get", url.UrlClicksCount, { debtor_number }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}

//根据委托编号获取物流信息
function GetLogisticsByDebtorNumber(debtor_number: any) {
  return new Promise((resolve, reject) => {
    http("get", url.GetLogisticsByDebtorNumber, { debtor_number }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
function GetTaskContentById(parmas: any) {
  return new Promise((resolve, reject) => {
    http("get", url.GetTaskContentById, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
function GenerateReport(id: number) {
  return new Promise((resolve, reject) => {
    http("get", url.GenerateReport, { id }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
function GetAILawyerLetterReport(debtor_number: string) {
  return new Promise((resolve, reject) => {
    http("get", url.GetAILawyerLetterReport, { debtor_number }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
//获取案件报价
function GetQuotedPriceByDebtorNumber(debtor_number: string) {
  return new Promise((resolve, reject) => {
    http("get", url.GetQuotedPriceByDebtorNumber, { debtor_number }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
//用户选择报价
function CustomerSelectQuotedPrice(parmas: any) {
  return new Promise((resolve, reject) => {
    http("get", url.CustomerSelectQuotedPrice, parmas).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
function GetByid(id: number) {
  return new Promise((resolve, reject) => {
    http("get", url.GetByid, { id }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
function GetFeedbackByDebtorNumber(debtor_number: string) {
  return new Promise((resolve, reject) => {
    http("get", url.GetFeedbackByDebtorNumber, { debtor_number }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}

function GetPlatformNotice() {
  return new Promise((resolve, reject) => {
    http("get", url.GetPlatformNotice, {}).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}
export {
  getUserInfo,
  uploadFil,
  GetMyCreditor,
  getAllRegion,
  getAllCurrency,
  saveCCreditor,
  Recognitiion,
  CreateAiOrder,
  GetWeChatConfig,
  GetOrderDetails,
  WeChatPay,
  getOpenId,
  getOrderList,
  getOrderInfo,
  OrderQuery,
  StopOrder,
  updateCreditor,
  UserEdit,
  Createcase,
  getLawyerCases,
  getLawyerCaseMatters,
  GetLawyerCaseStatus,
  GetCaseCourt,
  GetCaseMattersFromDetails,
  ContractNotice,
  ContractSee,
  GetCaseDetails,
  ServiceFeeSelection,
  CreateQueryQrchives,
  CreateLitigationFunding,
  CreatePreservationInsurance,
  GetServicesPagingData,
  GetServiceDetails,
  GetAddressDetails,
  UrlClicksCount,
  GetLogisticsByDebtorNumber,
  GetTaskContentById,
  GenerateReport,
  GetAILawyerLetterReport,
  GetQuotedPriceByDebtorNumber,
  CustomerSelectQuotedPrice,
  GetByid,
  GetFeedbackByDebtorNumber,
  GetPlatformNotice
};
