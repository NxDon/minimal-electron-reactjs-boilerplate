import axios from 'axios';
import cfg from '../config.js';


const instance = axios.create({
  baseURL: cfg.baseUrl,
  timeout: cfg.updateInterval || 5000
})

//设置默认的Content_Type
instance.defaults.headers.post['Content-Type'] = 'application/json';


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

async function getData(path, identifier = '') {
  //const response = await axios.get(`http://localhost:8081${path}/${identifier}`);
  console.log(`getting data from ${path}/${identifier}`);
  let response = await instance.get(`${path}/${identifier}`);
  return response.data;
}


async function postData(path, payload) {
  console.log('post  data' + path);
  return await instance.post(`${path}`, payload);
}

const path = {
  sim429StandardCode: '/api/sim/data429/word_standard_code',
  sim422StandardCode: '/api/sim/data422/word_standard_code',
  sim429Data: '/api/sim/data429',
  sim422Data: '/api/sim/data422',
  simDiscreteData: '/api/sim/discrete',
  simDifDiscreteData: '/api/sim/dif_discrete',
  simPost429Data: '/api/sim/data429',
  simPost422Data: '/api/sim/data422',
  simPostDiscreteData: 'api/sim/discrete/sent_value',
  simPostDifDiscreteData: '/api/sim/dif_discrete/sent_value',
  simPostStartCommand:'/api/sim/start',
  simPostStopCommand:'/api/sim/stop',
  simPostSelfTestCommand:'/api/sim/self_test',
  monitor429Data: '/api/mon/data429',
  monitor422Data: '/api/mon/data422',
  monitorDiscreteData: '/api/mon/discrete',
  monitorDifDiscreteData: '/api/mon/dif_discrete',
  monitor429SubData: '/api/mon/data429/word_standard_code_data',
  monitor422SubData: '/api/mon/data422/word_standard_code_data'
}

//
//获取sim字规范号
// GET /sim/data429/word_standard_code/
// [
//   {
//     equipmentName:string，//设备名称
//    word_standard_code:[string...] //字规范号名称列表
// }...
// ]
//
export async function getSimWordStandardCode(bus) {
  switch (bus) {
    case '429':
      return await getData(path.sim429StandardCode)
    case '422':
      return await getData(path.sim422StandardCode)
    default:
      throw new Error(`need pass bus`)
  }
}


//获取sim相应字规范号的数据
// GET /sim/data429/infos/:word_standard_code
//   [
//   {
//     id:number,
//     parameter_name:string,
//     description:string,
//     sent_value:string,
//     received_value:string,
//     editable:bool
//   }...
// ]
//

export async function getSimData(child_standard_code, bus) {
  switch (bus) {
    case '429':
      return await getData(path.sim429Data, child_standard_code);
    case '422':
      return await getData(path.sim422Data, child_standard_code);
    case 'discrete':
      return await getData(path.simDiscreteData, child_standard_code);
    case 'dif_discrete':
      return await getData(path.simDifDiscreteData, child_standard_code);
    default:
      throw new Error('need pass a bus')
  }
}
//修改相关send_value
// POST /sim/data429/
// {
//   word_standard_code:string
//   id:number,
//   sent_value:string
// }
//
export async function postSimData(bus=429,payload) {

  switch (bus) {
    case '429':
      return await postData(path.simPost429Data, payload);
    case '422':
      return await postData(path.simPost422Data, payload);
    case 'discrete':
      return await postData(path.simPostDiscreteData, payload);
    case 'dif_discrete':
      return await postData(path.simPostDifDiscreteData, payload);
    default:
      return null;
  }
}
// 发送开始仿真/停止仿真指令
// POST /sim/startSim
//
export async function postCommand(type='start'){
  switch (type) {
    case 'start':
      return await postData(path.simPostStartCommand);
    case 'stop':
      return await postData(path.simPostStopCommand);
    case 'self_test':
      return await postData(path.simPostSelfTestCommand);
    default:
      console.error("please pass params to postCommand function");
  }
}


//
// 数据监控界面接口定义:
//   GET /mon/data429/:equip_name
// 1.获取相应字规范号的数据
//   [
//   {
//     id:number,
//     word_standard_code:string,
//     child_standard_name:string,
//     received_value:string，
//         cycle_diagnose:number,//1正常 2故障
//           rs_status:number, //1正常 2故障
//   data_diagnose:number //1正常 2故障
// }
// ]
//
// GET /mon/data429/word_standard_code_data/:word_standard_code
// 2.获得429字规范号数据ID、description、received_value
//   [
//   {
//     id:number,
//     description:string,
//     received_value:string,
//     data_diagnose:number //1正常 2故障
//   }
//   ]
//
// GET /mon/data422/:equip_name
// 3.获取422相应字规范号的数据
//   [
//   {
//     id:number,
//     word_standard_code:string,
//     child_standard_name:string,
//     received_value:string,
//     rs_status:number, //1正常 2故障
//     data_diagnose:number //1正常 2故障
//   }
//   ]
//
// GET /mon/data422/word_standard_code_data/:word_standard_code
// 4.获得422字规范号数据ID、description、received_value
//   [
//   {
//     id:number,
//     description:string,
//     received_value:string,
//     data_diagnose:number //1正常 2故障
//   }
//   ]
//
// GET /mon/discrete
// 5.获取离散量数据
//   [
//   {
//     id:number,
//     signalName:string,
//     received_value:number
//   }
//   ]
//
// GET /mon/dif_discrete
// 6.获取差分离散量数据
//   [
//   {
//     id:number,
//     signalName:string,
//     received_value:number
//   }
//   ]


export async function getMonData(bus,equip_name) {
  switch (bus) {
    case '429':
      return await getData(path.monitor429Data,equip_name);
    case '422':
      return await getData(path.monitor422Data, equip_name);
    case 'discrete':
      return await getData(path.monitorDiscreteData);
    case 'dif_discrete':
      return await getData(path.monitorDifDiscreteData);
    default:
      throw new Error('need pass a bus')
  }
}

// GET /mon/data429/data/:equip_standard_code
// 3.获得429子信号数据ID、description、received_value
//     [
//     {
//         id:number,
//         description:string,
//         received_value:string,
//     }
//     ]
//
//

export async function getMonSubTableData(word_standard_code,bus) {
  switch (bus) {
    case '429':
      return await getData(path.monitor429SubData, word_standard_code);
    case '422':
      return await getData(path.monitor422SubData, word_standard_code);
    default:
      throw new Error('need pass a bus')
  }
}
