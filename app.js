const express = require('express')
const { writeHot, readHot } = require('./src/tool')
const app = express()

app.get('/', async (_, res) => {
  writeHot("tv")
  res.json({ success: true, data: '豆瓣服务已启动' })
})

app.get('/tv', async (_, res) => {
  res.json({ success: true, data: readHot("tv") })
})
app.get('/movie', async (_, res) => {
  res.json({ success: true, data: readHot("movie") })
})

app.listen(8010, () => {
  console.log('豆瓣服务已启动： http://localhost:8010')
})
