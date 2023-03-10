//basic server using Node http module. 
//the purpose of the backend is to give raw JSON data to the forntend

//const http = require('http');
const { response } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
//Middleware?
app.use(cors())
app.use(express.static('build')) //el servidor enviará este archivo en el mismo address que la api
app.use(express.json())



let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
  return maxId + 1
}

/* const app = http.createServer((request, response)=>{
  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify(notes))
})

console.log("you have to finish all projects, dont rest until that is done, automatically look for jobs, be a programmer")
//you can visit de server in the localhost 3005
const PORT = 3005
app.listen(PORT)
console.log(`Server running on port ${PORT}` )
 */

app.get('/', (request, response) => {
  response.send('<h1>FORGIVE YOURSELF</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})
// A route for an specific note id # 
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id)
    return note.id === id
  })
  if(note){
    response.json(note)
  }else{
    //error response code
    response.status(404).end()
  }
  response.json(note)
})

app.delete('/api/notes/:id', (request,response) =>{
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body
  if(!body.content){
    return response.status(400).json({
      error: "content missing"
    })
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }

  notes = notes.concat(note)
  response.json(note)
})

const PORT = process.env.PORT || 3008
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})

