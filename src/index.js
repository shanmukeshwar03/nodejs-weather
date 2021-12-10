import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.ORIGIN }))

app.get('/', async (req, res) => {
  const { city } = req.query

  try {
    if (city) {
      const response = await axios.get(
        `${process.env.BASE_URL}?q=${city}&units=metric&appid=${process.env.TOKEN}`
      )
      return res.send(response.data)
    }
    let clientIP =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if (clientIP.includes(',')) clientIP = clientIP.split(',')[0]
    const location = await axios.get('http://ip-api.com/json/' + clientIP)
    const response = await axios.get(
      `${process.env.BASE_URL}?lat=${location.data.lat}&lon=${location.data.lon}&units=metric&appid=${process.env.TOKEN}`
    )
    res.send(response.data)
  } catch (error) {
    res.status(500).send(error.response.data)
  }
})

app.use((req, res) => {
  res.status(400).send('No route found!')
})

app.listen(process.env.PORT)
