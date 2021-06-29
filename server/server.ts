import { Response, Request } from "express";
require('dotenv').config()
import scoreBoardToJSON from './scoreBoard'
var randomWords = require('random-words');


const app = require('express')();
const server = require('http').createServer(app);
const io  = require('socket.io')(server,{ cors:{ origin :"*" }});


app.get("/", (req:Request,res:Response) => {
  res.send('hello world')

})

server.listen(process.env.PORT ||3001, () => {
  console.log(`🚀 Server ready at: http://localhost:${process.env.PORT ||3001}\n⭐️`)
});


let MagicNumber:Number = createMagicNumber()
let magicNumberScoreBoard: {[key:string]:number}={ }
let magicNumberDate:Date = new Date(0)
function createMagicNumber():number{
  let numero = Math.floor(Math.random() * 1338)
  console.log(numero)
  return numero
}

let randomWord:string = createWord()
let wordScoreBoard: {[key:string]:number}={ }
let wordDate:Date = new Date(0)

function createWord(){
  console.log('new word created')
  return randomWords()
}
function sendWord():void{
  io.sockets.emit('wordToType', {randomWord:randomWord})
}

io.on('connection', (socket: any) => {
  console.log('client connected')      

  socket.on('number', (msg: any)  => {    
    console.log(`user ${msg.username} submitted number ${msg.number}`)
    if(!magicNumberScoreBoard[msg.username]){
      magicNumberScoreBoard[msg.username] = 0
    }
    if(magicNumberDate.getTime() == new Date(0).getTime()){ 
      magicNumberDate = new Date(Date.now())
    }
    if(msg.number == MagicNumber){         
      if(magicNumberScoreBoard[msg.username] === 2){  
        console.log(`game over : ${msg.username} won the game`)
        magicNumberScoreBoard[msg.username] ++
        io.sockets.emit('gameOver',{scoreboard: magicNumberScoreBoard, username:msg.username}) 
        scoreBoardToJSON(magicNumberScoreBoard, magicNumberDate , new Date(Date.now()),'magicNumber')
        magicNumberScoreBoard = {}
      }
      else{    
          magicNumberScoreBoard[msg.username] ++        
          io.sockets.emit('victory',{username: msg.username, number:MagicNumber, scoreboard:magicNumberScoreBoard})
      }
      MagicNumber = createMagicNumber()
    }
  });




  socket.on('newPlayer',(player:any) => { 
    if(Object.keys(wordScoreBoard).length === 0){
      randomWord = createWord()
    }
    sendWord()
  })
  socket.on('word',(msg: any ) => {  
    console.log(`user ${msg.username} submitted word ${msg.word} expected ${randomWord}`)
    if(!wordScoreBoard[msg.username]){
      wordScoreBoard[msg.username] = 0
    }
    if(wordDate.getTime() == new Date(0).getTime()){
      wordDate = new Date(Date.now())
    }
    if(msg.word == randomWord){
      if(wordScoreBoard[msg.username] === 4){
        console.log(`game over : ${msg.username} won the game`)
        wordScoreBoard[msg.username]++
        console.log(wordScoreBoard)
        io.sockets.emit('wordgameover',{scoreBoard: wordScoreBoard, username: msg.username})
        scoreBoardToJSON(wordScoreBoard, wordDate, new Date(Date.now()),'word')
        wordScoreBoard = {}
      }
      else{
        wordScoreBoard[msg.username] ++
        io.sockets.emit('wordvictory',{username: msg.username, word:randomWord, scoreBoard:magicNumberScoreBoard})
      }
      console.log("should create new word")
      randomWord = createWord()
      sendWord()
    }    
  })
});