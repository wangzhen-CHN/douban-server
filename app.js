const express = require('express')
const { writeHot, readHot } = require('./src/tool.js')
const CronJob = require('cron').CronJob;
const app = express()

/************************** 定时任务每天零晨12点10分 **************************/
new CronJob('0 10 0 * * *', function() {
  writeHot('tv')
  writeHot('movie')
}, null, true);

app.get('/', async (_, res) => {
  res.json({ success: true, data: '豆瓣服务已启动' })
})

app.get('/refresh', async (_, res) => {
  writeHot('tv')
  writeHot('movie')
  res.json({ success: true,msg:'重写成功', data: {tv:readHot("tv"),movie:readHot("movie")} })
})


app.get('/all', (_, res) => {
  const tv = readHot("tv")
  const movie = readHot("movie")
  res.json({ success: true, data: tv.concat(movie).sort((a,b)=>a.index-b.index) })
})

app.get('/tv', (_, res) => {
  res.json({ success: true, data: readHot("tv") })
})

app.get('/movie', async (_, res) => {
  res.json({ success: true, data: readHot('movie') })
})

app.listen(8010, () => {
  console.log('豆瓣服务已启动： http://localhost:8010')
})
