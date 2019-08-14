import Mock from 'mockjs' // 引入mockjs

const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据

let ImageSize = [
  '300x250', '250x250', '240x400', '336x280',
  '180x150', '720x300', '468x60', '234x60',
  '88x31', '120x90', '120x60', '120x240',
  '125x125', '728x90', '160x600', '120x600',
  '300x600'
]

Mock.mock('/wx/rank/getRecommendList', () => {
  let arr = []
  for (let i = 0; i < 20; i++) {
    let data = {
      'user_event_id': Random.natural(1, 100),
      'user_event_thumb': Random.dataImage('200x200'),
      'user_event_vote_num': Random.natural(1000, 9999),

      'user_name': Random.cname(),
      'user_class_code': Random.natural(100, 200)
    }
    arr.push(data)
  }

  return {
    'status': 1,
    'msg': '操作成功',
    'data': {
      'total': 2,
      'per_page': 20,
      'current_page': 1,
      'last_page': 1,
      'data': arr
    },
    'is_auth': 1
  }
})
