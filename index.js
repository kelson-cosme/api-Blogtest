const express = require('express')
const cors = require('cors')

const app = express()

app.listen(process.env.PORT || 3000)

// app.listen(5500, () => console.log('Rodando na porta 5500'))

app.use(cors())

app.use(express.json())

let users = [{
  id: 1,
  title: "Robôs 'programadores' vão roubar empregos na área de TI? ",
  description: "Aliado ou rival?",
  content: "Além de escrever textos, o robô ChatGPT consegue programar em várias linguagens. Isso também pode ser feito com o Copilot, do site de compartilhamento de códigos GitHub. As ferramentas podem mudar a forma de trabalho e as competências exigidas de programadores. O ChatGPT e o Copilot foram treinados a partir de códigos-fonte disponíveis na internet para simular o pensamento de humanos. Eles criam programas por conta própria, mas, em muitos casos, exigem ajustes que vão além de um simples copiar e colar. Entenda mais sobre as ferramentas.",
  img: "https://wp.eucapacito.com.br/wp-content/uploads/2021/04/AdobeStock_241083104-scaled.jpeg"
}]


app.route('/api').get((req, res) => res.json({
  users
}))

app.route('/api/:id').get((req, res) => {
  const userId = req.params.id

  const user = users.find(user => Number(user.id) === Number(userId))

  if (!user) {
    return res.json('User nor found!')
  }

  res.json(user)
})

app.route('/api').post((req, res) => {
  const lastId = users[users.length - 1].id
  users.push({
    id: lastId + 1,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    img: req.body.img
  })
  res.json('Saved user')
})

app.route('/api/:id').put((req, res) => {
  const userId = req.params.id

  const user = users.find(user => Number(user.id) === Number(userId))

  if (!user) {
    return res.json('User nor found!')
  }

  const updatedUser = {
    ...user,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    img: req.body.img
  }

  users = users.map(user => {
    if (Number(user.id) === Number(userId)) {
      user = updatedUser
    }
    return user
  })

  res.json("Updated user")
})

app.route('/api/:id').delete((req, res) => {
  const userId = req.params.id

  users = users.filter(user => Number(user.id) !== Number(userId))

  res.json('Deleted User')
})