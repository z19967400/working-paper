import * as types from '../action_types';
import { AnyAction } from 'redux';
import CreateAILawyerLetter from '../types/CreateAILawyerLetter'

// 定义参数接口
export interface AddState {
  parmas: CreateAILawyerLetter 
}

// 初始化state
let initialState: AddState = {
  parmas: {
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
    detailed_address:'',
    arrearage_type:'',
    currency_id:1,
    arrears_principal:'',
    arrears_interest:0,
    creditor_name:'',
    creditor_telphone:'',
    creditor_email:'',
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