const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'main_page.html' : req.url);

    // Verifica se o arquivo existe
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.statusCode = 404;
            res.end('File not found');
            return;
        }

        // Verifica a extensão do arquivo para definir o Content-Type correto
        let contentType = 'text/html';
        if (path.extname(filePath) === '.js') {
            contentType = 'text/javascript';
        } else if (path.extname(filePath) === '.css') {
            contentType = 'text/css';
        }

        // Lê o conteúdo do arquivo
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal server error');
                return;
            }

            // Define o cabeçalho da resposta
            res.setHeader('Content-Type', contentType);
            res.statusCode = 200;
            res.end(content);
        });
    });
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
