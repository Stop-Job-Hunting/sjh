// import express from "express";
// import Socket from "./services/SocketService";
// import Startup from "./Startup";
// import DbContext from "./db/DbConfig";

// //create server & socketServer
// const app = express();
// const socketServer = require("http").createServer(app);
// const io = require("socket.io")(socketServer);
// const port = process.env.PORT || 3000;

// //Establish Socket
// Socket.setIO(io);
// Startup.ConfigureGlobalMiddleware(app);
// Startup.ConfigureRoutes(app);

// //Connect to Atlas MongoDB
// DbContext.connect();

// //Start Server
// socketServer.listen(port, () => {
//   console.log(`[SERVING ON PORT: ${port}]`);
// });


// NOTE this is essentially the main portion of our server
import express from "express";
import cors from "cors";
import bp from "body-parser";
import helmet from "helmet"
import DbContext from "./db/dbConfig";
import { Auth0Provider } from "@bcwdev/auth0provider";


//NOTE: process.env.PORT pulls port from environ vars if a avail
const port = process.env.PORT || 3000;

//NOTE next we need to create our server
let server = express();

//NOTE Fire up database connection
DbContext.connect();

//NOTE Creates a reference to the build project on the client (if api only remove this line)
server.use(express.static(__dirname + "/../client"));

//NOTE Allows requests from the port 8080, add additional addresses as needed
var whitelist = ["http://localhost:8080"];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(helmet());
server.use(cors(corsOptions));
server.use(bp.json({ limit: "50mb" }));

//NOTE we are giving our server the bodyparser middleware. This middleware gives use the ability to pass information into our server as a request and parse it from JSON back into objects.
// server.use(bp.urlencoded({ extended: true }));


// NOTE Configures auth0 middleware that is used throughout controllers

Auth0Provider.configure({
  domain: process.env.AUTH_DOMAIN,
  clientId: process.env.AUTH_CLIENT_ID,
  audience: process.env.AUTH_AUDIENCE
});


//NOTE Everything above this line always stays the same

//NOTE next we want to register all our routes(doorways that can be accessed in our app)

//TODO We work here we have to import access to our controllers
// TODO: make work here
import { ValuesController } from "./controllers/ValuesController";
import { BasicInfoController } from "./controllers/BasicInfoController";
import { ProfilesController } from "./controllers/ProfilesController";


//NOTE remember the forward slash at the start of your path!
// TODO 
server.use("/api/values", new ValuesController().router);
server.use("/api/basicInfo", new BasicInfoController().router);
server.use("/api/profiles", new ProfilesController().router);



// NOTE: DON't change 
//NOTE Everything below this line always stays the same

//NOTE Default error handler, catches all routes with an error attached
server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } });
});

//NOTE Catch all to insure to return 404 if received a bad route
server.use((req, res, next) => {
  res.status(404).send("Route not found");
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
