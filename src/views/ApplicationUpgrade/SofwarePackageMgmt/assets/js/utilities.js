export const readBlobAsDataURL = (blob, callback) => {
  var a = new FileReader()
  a.onload = (e) => {
    callback(e.target.result)
  }
  a.readAsDataURL(blob)
}
