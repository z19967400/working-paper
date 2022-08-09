import * as types from '../action_types';
import { AnyAction } from 'redux';
import CreateAILawyerLetter from '../types/CreateAILawyerLetter'

// 定义参数接口
export interface AddState {
  parmas: CreateAILawyerLetter 
}
const storage:any=window.localStorage;
const HC:any = JSON.parse(storage.getItem("HC"))||''


// 初始化state
let initialState: AddState = {
  parmas: {
    is_wechat:HC.is_wechat||0,
    creditor_id:HC.creditor_id||0,
    debt_type:HC.debt_type||'',
    debtor_name:HC.debtor_name||'',
    debtor_type:HC.debtor_type||'',
    contact_person:HC.contact_person||'',
    phone_number:HC.phone_number||'',
    email:HC.email||'',
    country:3752,
    address:HC.address || '',
    province:HC.province||0,
    city:HC.city||0,
    county:HC.county||0,
    detailed_address:HC.detailed_address||'',
    arrearage_type:HC.arrearage_type||'',
    currency_id:HC.currency_id||1,
    arrears_principal:HC.arrears_principal||'',
    arrears_interest:HC.arrears_interest||0,
    creditor_name:HC.creditor_name||'',
    creditor_telphone:HC.creditor_telphone||'',
    creditor_email:HC.creditor_email||'',
  }
};

// 返回一个reducer
const CreateLetter = (state: AddState = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.ADD:
    // payload为传入的参数
      return { parmas:  action.payload };
    case types.DELETE:
      return { parmas:  {
        is_wechat:0,
        creditor_id:0,
        debt_type:'',
        debtor_name:'',
        debtor_type:'',
        contact_person:'',
        phone_number:'',
        email:'',
        country:3752,
        province:0,
        city:0,
        county:0,
        address:'',
        detailed_address:'',
        arrearage_type:'',
        currency_id:1,
        arrears_principal:'',
        arrears_interest:0,
        creditor_name:'',
        creditor_telphone:'',
        creditor_email:'',
      } };
    default:
      return state;
  }
};

export default CreateLetter