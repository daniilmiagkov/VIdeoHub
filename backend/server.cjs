const express = require('express')
const server = express()
const fs = require('fs')
const path = require('path')
const projectHub = path.join(__dirname, '..');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';
const cors = require('cors'); // Добавляем cors


server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // req.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
})
server.use(bodyParser.json());
server.use('/dist', express.static(path.join(projectHub, 'dist')));
server.use(express.static(path.join(__dirname, '.')));
server.use(cors()); // Разрешаем CORS для всех запросов

// Простой пользовательский объект
const users = [
  {
    id: 1,
    username: '1',
    password: '1',
    role: 'user'
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin',
    role: 'admin'
  }
];

// Роут для выхода пользователя и удаления токена JWT
server.post('/api/logout', (req, res) => {
  // В этом примере мы просто обнуляем токен, но на практике можно добавить дополнительные действия, если необходимо
  res.json({ message: 'Logged out successfully' });
});

// Роут для аутентификации пользователя и создания токена JWT
server.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

server.get('/', function(req, res) {
  res.set('Content-Type', 'text/html');
  
  fs.readFile(projectHub + '\\dist\\index.html', 'utf8', (err, data) => {
    res.send(data);
    
  })
})

server.get('/videos', (req, res) => {
  res.set('Content-Type', 'application/json');
  fs.readdir(projectHub + '\\backend\\videos', (err, files) => {
    console.log(files)
    res.send(files);
  })
})

server.get(new RegExp('/videos/\\w+'), (req, res) => {
  const [, video] = req.path.match(/\/database\/(\w+)/);
  
  const path = `${projectHub}/backend/videos/${video}.mp4`;
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    console.log(parts)
  
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

server.get(new RegExp('/database/\\w+/\\w+_\\w+'), (req, res) => {
  res.set('Content-Type', 'application/json');
  
  // Извлекаем параметры из пути запроса
  const [, dbName, subject, item] = req.path.match(/\/database\/(\w+)\/(\w+)_(\w+)/);
  
  // Собираем путь к файлу на основе параметров
  const filePath = `${projectHub}/backend/database/${dbName}/${subject}_${item}.json`;
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Обработка ошибок, например, если файл не найден
      console.error('Ошибка чтения файла:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
      // console.log(data);
    }
  });
});


server.listen(3000, () => {
  console.log('listening on port http://localhost:3000')
})