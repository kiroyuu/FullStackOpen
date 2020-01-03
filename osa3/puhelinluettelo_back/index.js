const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

app.use(requestLogger)
morgan.token('body', function (req,res) {
  return JSON.stringify(req.body)
})
/* app.use(morgan("tiny"))
 */

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}

const nameIn = (name) => {
  if (persons.findIndex(person => person.name === name) < 0) return false
  else return true
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if ((!body.name) || (!body.number)){
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  if (nameIn(body.name)){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    /* number: generateRanNum(), */
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const generateRanNum =  () => {
  const num = Math.floor(Math.random() * 10000)  
  return num
}
let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-532423",
      id: 2
    },
    {
      name: "Den Abramov",
      number: "040-2132136",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "040-9761523",
      id: 4
    }
  ]

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req,res) => {
    const amount = persons.length
    const date = new Date()
    res.send(`Phonebook has info for ${amount} people \n ${date}`)
  })

  app.delete('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const unknowEndPoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknowEndPoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
