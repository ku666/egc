export const decodeResHeader = function (res) {
  let resHeaderArr = JSON.stringify(res).split('filename=\\')
  let tempNameArr = JSON.stringify(resHeaderArr[1]).split(',')
  return decodeURI(tempNameArr[0].substring(3, tempNameArr[0].length - 6))
}
