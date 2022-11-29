const request = require('request')
const path = require('path')

function writeHot(type = 'tv') {
  request(getOptions(type), (error, _, body) => {
    const data = formatJson(JSON.parse(body).items)
    const date = new Date().toLocaleString()
    fs.writeFile(path.resolve(`./${type}Data.json`), JSON.stringify(data,null, 4), (err) => {
      if (err) {
        console.log(`${date} 写入 ${type} 失败`)
        throw err
      }
      console.log(`${date} 写入 ${type} 成功`)
    })
  })
}
function readHot(type = 'tv') {
  fs.readFile(path.resolve(`./${type}Data.json`), 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }
    const result = JSON.parse(data.toString());
    return result
});
}


function formatJson(list = []) {
  if (list.length === 0) return []
  return list.map((item) => {
    return {
      title: item.title,
      updateInfo: item.episodes_info,
      photos: item.photos,
      tags: item.card_subtitle
    }
  })
}

function getOptions(type = 'tv') {
  return {
    url: `https://m.douban.com/rexxar/api/v2/${type}/recommend?refresh=0&start=0&count=20&selected_categories=%7B%7D&uncollect=false&tags=2022&ck=Yx7V`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Cookie:
        'bid=ZhK-TLoe5CQ; ll="108090"; dbcl2="235766877:JBmId63cbmk"; push_noty_num=0; push_doumail_num=0; __utmv=30149280.23576; Hm_lvt_6d4a8cfea88fa457c3127e14fb5fabc2=1668761909,1669023341; _ga=GA1.2.822318364.1666256309; ck=Yx7V; ap_v=0,6.0; __utma=30149280.822318364.1666256309.1669023112.1669276279.5; __utmc=30149280; __utmz=30149280.1669276279.5.4.utmcsr=cn.bing.com|utmccn=(referral)|utmcmd=referral|utmcct=/; __utmt=1; __utmb=30149280.4.10.1669276279; frodotk="948ff5167087a4bebdafdf435196ee3a"',
      Referer: 'https://movie.douban.com/tv/',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
    }
  }
}
const tool = { writeHot ,readHot}
module.exports = tool
