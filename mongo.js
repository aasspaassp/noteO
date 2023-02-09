const mongoose = require('mongoose');


if(process.argv.length < 3){
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

//establishing connection with the database
const password = process.argv[2]

//node mongo.js password

const url = `mongodb+srv://andresfilos94:${password}@cluster0.zsxgft3.mongodb.net/noteO?retryWrites=true&w=majority`;

mongoose.set('strictQuery',false);
mongoose.connect(url);


//Si hubiera ts habría que hacer un type que fuera igual
//Schema for js objects

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
}
)

//Class for JS objects
const Note = mongoose.model('Note', noteSchema)



 //Código para crear una nota nueva

const note = new Note({
  content: "Testing to grow better systems",
  date: new Date(),
  important: false,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close() //closes the collection
}) 

//Código para enlistar notas

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

/* const allNotes = await Note.find();
console.log(allNotes) */




