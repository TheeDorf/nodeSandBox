const { createServer } = require("http");
const { appendFile, readFile, createReadStream, read } = require("fs");
const path = require("path");
const { eventEmitter } = require("events");
cont PORT = 5001;

const MovieRec = new EventEmitter();

const server = createServer((req, res) => {
  const { url, method } = req;

  req.on("error", (err) => {
    console.error(err);
    res.statusCode = 404;
    res.setHeader("content-Type", "application/json");
    res.write(JSON.stringify({ msg: "invalid request 404!" }));
    res.end();
  });

  const chunks = [];

  req.on("data", (chunk) => {
    chunks.push(chunk)
    console.log(chunks);
  })
  req.on("end", ()=>{
    if (url === "/movie_likes" && method === "POST"){
    const body = JSON.parse(Buffer.concat(chunks).toString);
    const newMovie = `${body.username}, ${body.movie}\n`;
    MovieRec.emit("new movie!", newMovie, res);
    res.setHeader("content-Type", "application/json");
    res.write(
        JSON.stringify({ msg: "Succesfully added movie" })
    );
    res.end();
  }
  else if (url === "/movie likes" && method === "GET"){
    res.setHEader("content-type", "text/html");
    const readStream = createReadStream(
        path.join(__dirname, "./public/index.html")
    )
    readStream.pipe(res);
  }
  else{
    res.statusCode= 400;
    res.setHeader("content-Type", "application/json");
    res.write(JSON.stringify({ msg: "not a valid endpoint" }));
    res.end();
  }
  })
});
server.listen(PORT, ()=> console.log(`server listening at ${PORT} port`))
