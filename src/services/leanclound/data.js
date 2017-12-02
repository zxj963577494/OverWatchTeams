import AV from 'leancloud-storage'

// 创建对象
export function Create(payload) {
  // 声明类型
  const Data = AV.Object.extend(payload.tb)
  // 新建对象
  const data = new Data()
  for (let key of Object.keys(payload.fields)) {
    data.set(key, payload.fields[key])
  }
  //return Data.save()
}


