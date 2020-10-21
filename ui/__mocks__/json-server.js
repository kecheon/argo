const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("mock.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);


// Custom middleware to access POST methids.
// Can be customized for other HTTP method as well.
// server.use((req, res, next) => {
//   console.log("POST request listener");
//   const body = req.body;
//   console.log(body);
//   if (req.method === "POST") {
//     // If the method is a POST echo back the name from request body
//     res.json({ message:"User created successfully", name: req.body.name});
//   }else{
//       //Not a post request. Let mock.json handle it
//       next();
//   }  
// });

server.use(router);
router.render = function (req, res) {
  if (req.method === 'GET' && !req.params.id) {
    var obj = {}
    // obj[req.params.resource] = res.locals.data
    obj['body'] = res.locals.data
    res.jsonp(obj)
  } else {
    res.jsonp(res.locals.data)
  }
}

server.listen(2114, () => {
  console.log("JSON Server is running");
});