import request from '@/utils/request'

// 查询参数列表
export function listConfig(query) {
  return request({
    url: '/system/config/list',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getConfig(configId) {
  return request({
    url: '/system/config/' + configId,
    method: 'get'
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return request({
    url: '/system/config/configKey/' + configKey,
    method: 'get'
  })
}

// 新增参数配置
export function addConfig(data) {
  return request({
    url: '/system/config',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateConfig(data) {
  return request({
    url: '/system/config',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delConfig(configId) {
  return request({
    url: '/system/config/' + configId,
    method: 'delete'
  })
}

// 刷新参数缓存
export function refreshCache() {
  return request({
    url: '/system/config/refreshCache',
    method: 'delete'
  })
}

// 网站参数设置列表
export function listWebConofig(query) {
  return request({
    url: '/system/config/listWebConofig',
    method: 'get',
    params: query
  })
}

// 查询网站参数设置详细
export function getWebConfig(configId) {
  return request({
    url: '/system/config/webConfig/' + configId,
    method: 'get'
  })
}

// 新增参数配置
export function addWebConfig(data) {
  return request({
    url: '/system/config/addWebConfig',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateWebConfig(data) {
  return request({
    url: '/system/config/updateWebConfig',
    method: 'post',
    data: data
  })
}

// 删除参数配置
export function delWebConfig(configId) {
  return request({
    url: '/system/config/delWebConfig/' + configId,
    method: 'delete'
  })
}

// 刷新参数缓存
export function refreshWebConfigCache() {
  return request({
    url: '/system/config/refreshWebConfigCache',
    method: 'delete'
  })
}