const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const details = require ("./app/models/details.json");
const nodemailer = require("nodemailer");

const app = express();
const socketConst = require ("./app/models/socket-constants");

const game = require ("./app/middlewares/Game");


const db = require("./app/models");
const { reunion } = require("./app/models");
const Role = db.role;



const http = require('http').Server(app);

//const io = require('socket.io')(http, {cors: {origin: '*'}});
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

http.listen(3000);

io.on('connection', (socket) =>{

  socket.on(socketConst.CRIAR_GAME, (data) =>{
      var gameStatus = game.criarJogo(data, socket.id)
      socket.join(data.idSala);
      io.to(data.idSala).emit(socketConst.ENTRAR_GAME, gameStatus)
  })

  socket.on(socketConst.ENTRAR_GAME, (data) =>{
    var gameStatus = game.inserirPlayer(data, socket.id)
    socket.join(data.idSala);
    //emite para a sala do id especifico
    io.to(data.idSala).emit(socketConst.ENTRAR_GAME, gameStatus)
  })

  socket.on(socketConst.VOTAR_GAME, (data) =>{
      var gameStatus = game.inserirVoto(data);
      io.to(data.idSala).emit(socketConst.VOTAR_GAME, gameStatus);
  })

  socket.on(socketConst.VIRAR_CARD, (data) =>{
      var gameStatus = {virar: data.virar, media:data.media, travarCarta: data.travarCarta}
      io.to(data.idSala).emit(socketConst.VIRAR_CARD, gameStatus);
  })

  socket.on(socketConst.REINICIAR_GAME, (data) =>{
      var gameStatus = game.reiniciarGame(data);
      io.to(data).emit(socketConst.REINICIAR_GAME, gameStatus);
  })



  socket.on('disconnect', (data) =>{
      console.log("desconectado")
      var gameStatus = game.removerPlayer(socket.id)
      io.to(gameStatus.idSala).emit(socketConst.ENTRAR_GAME, gameStatus)
  })
})




var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
    initiall();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "Welcome " });
});
const authJwt = require ('./app/middlewares/authJwt');
const estimationModel = require("./app/models/estimation.model");
function auth(req,res,next){
  if(req.authJwt()){
      next();
  } 
  else{
      res.redirect("/fail");}
}
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/reunion.routes")(app , auth);
require("./app/routes/vote.routes.js")(app);
require("./app/middlewares/video")(app);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const Carte = db.carte;

function initiall() {
  Carte.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Carte({
        name: "carte1"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added carte 1  ");
      });

      new Carte({
        name: "carte2"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'carte2' to  cartes collection");
      });

      new Carte({
        name: "carte3"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'carte3' to cartes collection");
      });
      new Carte({
        name: "carte4"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added carte 4  ");
      });
      new Carte({
        name: "carte5"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added carte 5   ");
      });
      new Carte({
        name: "carte6"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added carte 6   ");
      });
      new Carte({
        name: "carte7"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added carte 7  ");
      });
      new Carte({
        name: "carte8"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added carte 8  ");
      });
      new Carte({
        name: "carte9"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added carte 9  ");
      });
      new Carte({
        name: "carte10"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added carte 10   ");
      });
      new Carte({
        name: "carte11"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added carte 11   ");
      });
      new Carte({
        name: "carte12"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added carte 12   ");
      });
    }
  });
}
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
//app.all('*', ensureAuthenticated)

app.post("/estimation", (req,res) => {
  console.log("request");
  let user = req.body;
  let carte = req.body;

  estimationModel(user, carte , info =>{
    console.log ('user estimer');
    res.send(info);
  })
});
async function estimation(user , carte , callback){
  
}

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  let lien = req.body;
  sendMail(user,lien, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});
async function sendMail(user, callback) {
  
  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: details.email,
      pass: details.password
    },
    tls:{
      rejectUnauthorized:false
    },
    secureConnection: false,
    
  });

  let mailOptions = {
    from: '"corilus@gmail.com', 
    to: user.email,
    subject: "rejoindre reunion", 
    html: `<h1>Hi ${user.name}</h1><br>
    <h4>Thanks for joining us</h4>
    <a>${user.lien}</a>`
    
    
  };


  let info = await transporter.sendMail(mailOptions);

  callback(info);

 
 
};
/*
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
});*/

/*io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    socket.broadcast.emit('message-broadcast', {message: msg});
    console.log('message: ' + msg);
  });
});*/
  