import request from '../utils/request'

//查询全部部门
export const queryAllApi = () => request.get('/depts')
