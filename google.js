// script to scrap titles from google search
const unirest = require('unirest')
const parser = require('node-html-parser')

let count = 0

// pass to params to search what to search
async function get(params) {
  const page = await unirest.get(`https://www.google.com/search?q=${params}&start=${count}`)
  const body = await page.body
  return body
}

// change how many page to scraps by changing i not pageNumber
for (let i = 0; i < 10; i++) {
  get('JavaScript')
    .then(response => {
      const document = parser.parse(response)
      const titles = document.querySelectorAll('h3')
      titles.forEach(title => {
        console.log(title.childNodes[0].childNodes[0].rawText)
        console.log('----------------------------------------------------------')
      })
      count += 10
    })
}