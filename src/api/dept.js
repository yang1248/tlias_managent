import request from '../utils/request'

//查询全部部门
export const queryAllApi = () => request.get('/depts')

//新增
export const addApi = (data) => request.post('/depts', data)
