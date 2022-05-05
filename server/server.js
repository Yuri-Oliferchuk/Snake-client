import express from 'express'
import { getHighScore } from './db.js'
const app = express()
const PORT = 3001


app.use(express.json())

app.get('/', (req, res) => {
    getHighScore()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})