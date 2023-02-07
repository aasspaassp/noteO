const mongoose = require('mongoose');

if(process.argv.length < 3){
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

//establishing connection with the database
const password = process.argv[2]

//node mongo.js password

const url = `mongodb+srv://andresfilos94:${password}@cluster0.zsxgft3.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
}
)

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB!')

    const note = new Note({
      content: "HTML is Easy",
      date: new Date(),
      importante: true,
    })
    return note.save()
  })
  .then(() => {
    console.log('note saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
  