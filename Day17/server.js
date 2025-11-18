const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Node.js Server</title>
    </head>
    <body>
      <h1>Welcome to Node.js Server!</h1>
      <p>This is a simple web page served by a Node.js HTTP server using the built-in http module.</p>
    </body>
    </html>
  `);
});
server.listen(3001, () => {
  console.log('Server running at http://localhost:3001');
});
