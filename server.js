const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const details = require ("./app/models/details.json");
const nodemailer = require("nodemailer");


let socketIO = require('socket.io');




const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
      origin: '*'
  }
});
let userList = new Map();

io.on('connection', (socket) => {
  let userName = socket.handshake.query.userName;
  addUser(userName, socket.id);

  socket.broadcast.emit('user-list', [...userList.keys()]);
  socket.emit('user-list', [...userList.keys()]);

  socket.on('message', (msg) => {
      socket.broadcast.emit('message-broadcast', {message: msg, userName: userName});
  })

  socket.on('disconnect', (reason) => {
      removeUser(userName, socket.id);
  })
});

function addUser(userName, id) {
  if (!userList.has(userName)) {
      userList.set(userName, new Set(id));
  } else {
      userList.get(userName).add(id);
  }
}

function removeUser(userName, id) {
  if (userList.has(userName)) {
      let userIds = userList.get(userName);
      if (userIds.size == 0) {
          userList.delete(userName);
      }
  }
}











var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const { reunion } = require("./app/models");
const Role = db.role;



db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "Welcome " });
});


require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/reunion.routes")(app)

    
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


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

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  let lien = req.url;
  sendMail(user,lien, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});
async function sendMail(user,lien, callback) {
  
  
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

