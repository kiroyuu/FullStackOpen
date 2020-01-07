require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

const Person = require('./models/person')

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

app.put('/api/persons/:id', (request,response,next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNum => {
      response.json(updatedNum.toJSON())
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if ((!body.name) || (!body.number)) {
    return response.status(400).json({ error: 'content missing' })
  }
  if (nameIn(body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const person = new Person({
    name: body.name,
    /* number: generateRanNum(), */
    number: body.number,
    /* id: generateId(), */
  })

  person
    .save()
    .then(savedNum => savedNum.toJSON())
    .then(savedAndFormattedNum => {
      response.json(savedAndFormattedNum) })
    .catch(error => next(error))
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

app.get('/api/persons/:id',(req,res,next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (req,res, next) => {
  /* const len = Person.countDocuments({})
    console.log(len)
    const amount = persons.length
    res.send(`Phonebook has info for ${amount} people \n ${date}`) */
  const date = new Date()

  Person.countDocuments({})
    .then(amount => {
      const info = '<html>' +
                      '<title>Info</title>' +
                      '<div>' +
                      `<p>Phonebook has info for ${amount} people</p>` +
                      `<p>${date}</p>` +
                      '</div>' +
                      '</html>'
      res.send(info)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id',(req,res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const unknowEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknowEndPoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
