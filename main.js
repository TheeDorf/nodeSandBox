const http = require("http");
const PORT = 5001


http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    res.setHeader("content-type", "text/html")
    console.log(`request method used: ${method}`);
    // res.writeHead(404,{ "content-type": "text/html"});
    // res.write("hello this request worked");
    const dataChunksArray = [];
    req.on('data', (chunk)=>{
        console.log(` chunk is: ${chunk}`)
        dataChunksArray.push(chunk)
    })
    
    req.on('end', ()=>{   
        if(method == 'POST'){
            const body = JSON.parse(Buffer.concat(dataChunksArray).toString())
            const responseBody = { method, url, body}
        
         if (url == "/yourPage"){
                res.write("<h2>welcome to your home page</h2>")
                res.write(JSON.stringify(responseBody));
                req.statusCode = 202;
            }
            else{
                res.write("<h1> this page was not found</h1>")
                res.statusCode = 404;
                
            }
        
        res.end();
    } 
    
});

if (url == "/"){
    res.write("<h1>Welcome to the site</h1>")
    res.statusCode = 200;
    res.end();
} 
else if (url == "/about"){
    res.write("<p>thank you for coming </p>")
    res.statusCode = 200;
    res.end();
}

})



.listen(PORT, ()=>{ 
    console.log(`server is listening at local host ${PORT} port`)
})
