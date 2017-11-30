export function cutstr(str, len, flag) {
  var str_length = 0
  var str_cut = ''
  var str_len = str.length
  for (var i = 0; i < str_len; i++) {
    var a = str.charAt(i)
    str_length++
    if (escape(a).length > 4) {
      //中文字符的长度经编码之后大于4
      str_length++
    }
    str_cut = str_cut.concat(a)
    if (str_length >= len) {
      if (flag === 0) {
        str_cut = str_cut.concat('...')
      }
      return str_cut
    }
  }
  //如果给定字符串小于指定长度，则返回源字符串；
  if (str_length < len) {
    return str
  }
}

export function pcToMobile(value) {
  if (value) {
    return value.replace(/target='_blank'/g, '')
        .replace(/target="_blank"/g, '')
        .replace(/style="width: (\d+)px; height: (\d+)px;"/g, 'style="width:100%;height:$1px"')
        .replace(/width="(\d+)"/g, 'width="100%"')
  }
}