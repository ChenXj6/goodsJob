//接口统一管理

//这里是解决跨域接口  '/apis'为代理域名（在vue.config.js里配置跨域）
// const host=process.env.NODE_ENV=='development'?'http://5016.yesswl.top':`${location.protocol}//${location.host}`;
const host = 'https://app.goodjobsapp.com'; 

const apiUrl = `${host}/app/index.php?i=4&c=entry&do=apis&m=sz_yi&p=`;
const base = {
  login: apiUrl + 'userinfo&op=login',
  register: apiUrl + 'userinfo&op=register',
  apis: apiUrl + 'apis',
  sureorder: host + "/app/index.php?i=4&c=entry&op=confirmm&pid=3&do=order_get&m=weliam_indiana",
  getinfo: apiUrl + 'userinfo&op=getinfo',
  order: apiUrl + 'userinfo&op=order',
  news: apiUrl + 'index&op=news',
  videos: apiUrl + 'index&op=videos',
  one_new: apiUrl + 'index&op=one_new',
  setmeal: apiUrl + 'index&op=setmeal',
  my_task_list: apiUrl + 'userinfo&op=my_task_list',
  pay_setmeal: apiUrl + 'userinfo&op=pay_setmeal',
  task_list: apiUrl + 'index&op=task_list',
  site: host + '/indexurl.php',
  main: apiUrl + 'index&op=main',
  receive_tasks: apiUrl + 'userinfo&op=receive_tasks',
  my_task_one: apiUrl + 'userinfo&op=my_task_one',
  my_setmeal_list: apiUrl + 'userinfo&op=my_setmeal_list',
  publish: apiUrl + 'userinfo&op=publish',
  my_publish: apiUrl + 'userinfo&op=my_publish',
  submit_withdraw: apiUrl + 'userinfo&op=submit_withdraw',
  level: apiUrl + 'userinfo&op=level',
  bill_flow: apiUrl + 'userinfo&op=bill_flow',
  record: apiUrl + 'userinfo&op=record',
  logout: apiUrl + 'userinfo&op=logout',
  sendcode: `${host}/app/index.php?i=4&c=entry&p=sendcode&do=member&m=sz_yi&op=sendcode`,
  revise_psd: apiUrl + 'userinfo&op=revise_psd',
  forgetpwd: apiUrl + 'userinfo&op=forgetpwd',
  forgetcode: `${host}/app/index.php?i=4&c=entry&p=sendcode&do=member&m=sz_yi&op=forgetcode`,
  uploader: `${host}/app/index.php?i=4&c=entry&p=uploader&do=apis&m=sz_yi`,
  task_sublimt: apiUrl + 'userinfo&op=task_sublimt',
  logo: `${host}/app/index.php?i=4&c=entry&do=apis&m=sz_yi&p=index&op=logo`,
  member: `${host}/app/index.php?i=4&c=entry&p=webinfo&do=apis&m=sz_yi&op=member`,
  reward: `${host}/app/index.php?i=4&c=entry&p=webinfo&do=apis&m=sz_yi&op=reward`,
  setmeal_list: `${host}/app/index.php?i=4&c=entry&p=webinfo&do=apis&m=sz_yi&op=setmeal_list`,
  weblogout: `${host}/app/index.php?i=4&c=entry&p=webinfo&do=apis&m=sz_yi&op=logout`,
  recharge: apiUrl + 'userinfo&op=recharge',
  top_up_way: apiUrl + 'userinfo&op=top_up_way',
  get_sign: apiUrl + 'userinfo&op=get_sign',
  service: apiUrl + 'userinfo&op=service',
  tasks_grade: apiUrl + 'index&op=tasks_grade',
  firstMes:apiUrl + 'index&op=announcement',
  treasure:apiUrl + 'userinfo&op=treasure',
  paytreasure:apiUrl + 'userinfo&op=paytreasure',
  paytreasurelog:apiUrl + 'userinfo&op=paytreasurelog',
  rule:apiUrl + 'index&op=ruleconfig',
  changePwd:apiUrl + 'userinfo&op=editpwd',
  persons:apiUrl + 'index&op=maillist'
}

export default base;
