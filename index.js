//server
const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')

const app = express()

const articles = []

app.get('/', (req, res) => {
    res.json('Welcome to my Climate Change API')
})

app.get('/news', (req, res) => {
    
    axios.get('https://climate.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2C+created_at+desc&search=&category=19%2C98')
        .then((response) => {
            const html = response.data
            // console.log(html)
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
               const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch((err) => {
            console.log(err)
        })
}) 

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))