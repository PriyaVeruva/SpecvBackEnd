const a = "Hello World";
console.log("hello world");
const { writeFile } = require("fs");
//using node filename =>the js code runs on terminal
//built in node js modules
//to import the modules we will use require(inisde this lets mention the module name)
//os modules
const os = require("os"); //describes about os related sceanrios
console.log(os.cpus());
//path module //describes about filename ,pathname extension
const path = require("path");
console.log(path.basename(__filename));
console.log(path.parse(__filename)); //using this will give filename,pathname,extension at one place

//fs module ->to read or write the file systems
const fs = require("fs");
fs.writeFile("newFile.txt", "Hii this is Priya", (err) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log("File Returned Sucessfulluy");
});
fs.readFile("read.txt", "utf-8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(data);
});
//http module->create http servers and make http requests
const http = require("http");
const server = http.createServer((req, res) => {
	res.writeHead("200", { "Content-Type": "text/plain" });
	res.end("Hii Priya");
});
const port = "3000";
server.listen(port, () => {
	console.log("Server running at", `http://localhost:${port}/`);
});
