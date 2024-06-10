const {Book}=require("./models/books")
const {Author}=require("./models/authors")
const {books,authors}=require('./data')
const {dbconnect} =require("./config/db")

dbconnect()

const exportBooks = async () => {
    try {
        await Book.insertMany(books)
        console.log("book exported")
    } catch (error) {
        console.log(error)
    }
}

const deleteBooks = async () => {
    try {
        await Book.deleteMany()
        console.log("book deleted")
    } catch (error) {
        console.log(error)
    }
}
const exportAuthors = async () => {
    try {
        await Author.insertMany(authors)
        console.log("book exported")
    } catch (error) {
        console.log(error)
    }
}

const deleteAuthors = async () => {
    try {
        await Book.deleteMany()
        console.log("book deleted")
    } catch (error) {
        console.log(error)
    }
}

if (process.argv[2]==="-exportBooks"){
    exportBooks()
}else if(process.argv[2]==="-deleteBooks"){
    deleteBooks()
}else if(process.argv[2]==="-exportAuthors"){
    exportAuthors()
}else if(process.argv[2]==="-deleteAuthors"){
    deleteAuthors()
}