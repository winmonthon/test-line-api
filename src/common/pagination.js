export default pagination{
    const { page = 1, size = 10 } = req.query

const calSkip = (page, size) => {
  return (page - 1) * size
}
const calPage = (count, size) => {
  return Math.ceil(count / size)
}
}
