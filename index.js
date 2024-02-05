const http = require("http");
const fs = require("fs");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

// Creating Server
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("This is Home Page");
  } else if (req.url === "/about") {
    res.end("This is About Page");
  } else if (req.url === "/contact") {
    res.end("This is Contact Page");
  } else if (req.url === "/file-write") {
    fs.writeFile("demo.txt", "hello world", (err) => {
      if (err) {
        console.log("File Couldn't be created");
      } else {
        console.log("File Created Successfully...");
      }
    });
    res.end("File Created Successfully and Hello World Text Added...");
  } else if (req.url === "/upload" && req.method.toLowerCase() === "post") {
    upload.single("avatar")(req, res, (err) => {
      if (err) {
        console.error(err);
        res.end("Error uploading file");
      } else {
        res.end("File uploaded successfully!");
      }
    });
  } else {
    res.end("File Not Found...");
  }
});

server.listen(5500, () => {
  console.log("Server is running at port 5500...");
});

// 1.It should use the http module to create an HTTP server.
// 2.It should listen on port 5500.
// 3.It should log a message to the console when it starts listening on port 5500.
// 4.If you request this url “/” then the response is  “This is Home Page”.
// 5.If you request this url “/about” then the response is  “This is About Page”.
// 6.If you request this url “/contact” then the response  is “This is Contact Page”.
// 7.If you request this url “/file-write” then fs.writeFile() method will create a file “demo.txt” and write the text “hello world” in this file.
// 8. Show how to upload a file using multer.
// 9.And of course you need to end the server response using res.end()
