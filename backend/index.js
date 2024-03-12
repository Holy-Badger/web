const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
  origin: ['http://127.0.0.1:5500']
}))

let posts = [{ id: 1, title: 'title_1', body: 'body_1' }]

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', (req, res) => {
  console.log(req.body);
  const { title, body } = req.body
  const id = posts.length + 1
  posts.unshift({title, body, id})
  res.send({ title, body, id })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
