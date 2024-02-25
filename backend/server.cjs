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
const users = []

fs.readdir(`${projectHub}\\backend\\users`, (err, files) => {
  if (err) {
    console.error('Ошибка чтения папки:', err);
    return;
  }
  if (files.length > 0) {
    console.log(files)
    for (let user of files) {
      fs.readFile(`${projectHub}\\backend\\users\\${user}`, (err, data) => {
        users.push(JSON.parse(data))
      })
    }
  }
} )

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
    user.token = token;
    console.log(user);
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

const { exec } = require('child_process');
const ffmpeg = require("fluent-ffmpeg");

// Функция для получения метаданных видео по его имени
function getVideoMetadata(videoName, callback) {
  // Путь к видеофайлу
  const videoPath = `${projectHub}\\backend\\videos\\${videoName}`;
  
  // Команда для получения метаданных с помощью ffmpeg
  const command = `ffprobe -v quiet -print_format json -show_format -show_streams "${videoPath}"`;
  
  // Выполнение команды
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка выполнения команды: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Ошибка: ${stderr}`);
      return;
    }
    
    // Парсинг вывода JSON
    const metadata = JSON.parse(stdout);
    // console.log(metadata)
    // Вызов колбэка с полученными метаданными
    callback(metadata);
  });
}

// Пример использования функции
server.get('/videos/:videoName/metadata', (req, res) => {
  const videoName = req.params.videoName;
  // console.log(videoName)
  getVideoMetadata(videoName, (metadata) => {
    res.json(metadata);
  });
});


server.get('/videos', (req, res) => {
  res.set('Content-Type', 'application/json');
  fs.readdir(projectHub + '\\backend\\videos', (err, files) => {
    console.log(files)
    res.send(files);
  })
})

server.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  // Здесь вам нужно выполнить запрос к вашей базе данных для получения данных пользователя по его ID
  // Пример: выполнение запроса к базе данных и получение данных пользователя
  const user = users.find(u => u.token === userId)
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Пользователь не найден' });
  }
});


server.get(new RegExp('/videos/\\w+'), (req, res) => {
  const [, video] = req.path.match(/\/videos\/(\w+)/);
  console.log(video)
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

// Маршрут для передачи потока на HTML страницу
server.get('/stream', (req, res) => {
  const ffmpeg = require('fluent-ffmpeg');
  
  const rtspStreamUrl = 'rtsp://localhost:8001/stream';
  
  const command = ffmpeg(rtspStreamUrl)
    .inputFormat('rtsp')
    .outputOptions(['-c:v libvpx', '-b:v 1M', '-deadline realtime', '-an'])
    .outputFormat('webm');
  
  
  console.log('клиент подключен')
  // Установка заголовков для передачи видео в формате webm
  res.setHeader('Content-Type', 'video/webm');
  res.setHeader('Transfer-Encoding', 'chunked');
  
  // Перенаправление вывода ffmpeg напрямую в ответ сервера
  command.pipe(res, { end: true });
});

server.listen(3000, () => {
  console.log('listening on port http://localhost:3000')
})