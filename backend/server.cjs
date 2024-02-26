const express = require('express');
const server = express();
const fs = require('fs');
const path = require('path'); // Подключение модуля path для работы с путями
const projectHub = path.join(__dirname, '..');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secretKey = "secretkey";
const cors = require('cors');

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // req.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
});

server.use(bodyParser.json());
server.use('/dist', express.static(path.join(projectHub, 'dist')));
server.use(express.static(path.join(__dirname, '.')));
server.use(cors()); // Разрешаем CORS для всех запросов

// Простой пользовательский объект
const users = [];

fs.readdir(path.join(projectHub, 'backend', 'users'), (err, files) => {
  if (err) {
    console.error('Ошибка чтения папки:', err);
    return;
  }
  if (files.length > 0) {
    console.log(files);
    for (let user of files) {
      fs.readFile(path.join(projectHub, 'backend', 'users', user), (err, data) => {
        users.push(JSON.parse(data));
      });
    }
  }
});

// Роут для выхода пользователя и удаления токена JWT
server.post('/api/logout/:userId', (req, res) => {
  // В этом примере мы просто обнуляем токен, но на практике можно добавить дополнительные действия, если необходимо
  const userId = req.params.userId;
  const user = users.find(u => u.token === userId);
  user.token = "";
  fs.writeFile(path.join(projectHub, 'backend', 'users', `${user.username}.json`), JSON.stringify(user), (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(user.username + " written");
    }
  });
  res.json({ message: 'Logged out successfully' });
});

// Роут для аутентификации пользователя и создания токена JWT
server.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
    user.token = token;
    fs.writeFile(path.join(projectHub, 'backend', 'users', `${user.username}.json`), JSON.stringify(user), (err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(username + " written");
      }
    });
    console.log(user);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

server.get('/', function(req, res) {
  res.set('Content-Type', 'text/html');
  fs.readFile(path.join(projectHub, 'dist', 'index.html'), 'utf8', (err, data) => {
    res.send(data);
  });
});

// Пример использования функции
server.get('/videos/:videoName/metadata', (req, res) => {
  const videoName = req.params.videoName;
  // Функция для получения метаданных видео по его имени
  function getVideoMetadata(videoName, callback) {
    // Путь к видеофайлу
    const { exec } = require('child_process');
    const videoPath = path.join(projectHub, 'backend', 'videos', videoName);
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
      // Вызов колбэка с полученными метаданными
      callback(metadata);
    });
  }
  getVideoMetadata(videoName, (metadata) => {
    res.json(metadata);
  });
});

server.get('/videos', (req, res) => {
  res.set('Content-Type', 'application/json');
  fs.readdir(path.join(projectHub, 'backend', 'videos'), (err, files) => {
    console.log(files);
    res.send(files);
  });
});

server.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  // Здесь вам нужно выполнить запрос к вашей базе данных для получения данных пользователя по его ID
  // Пример: выполнение запроса к базе данных и получение данных пользователя
  const user = users.find(u => u.token === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Пользователь не найден' });
  }
});

server.get(new RegExp('/videos/\\w+'), (req, res) => {
  const [, video] = req.path.match(/\/videos\/(\w+)/);
  console.log(video);
  const videoPath = path.join(projectHub, 'backend', 'videos', `${video}.mp4`);
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

// Маршрут для передачи потока на HTML страницу
server.get('/stream', (req, res) => {
  try {
    const rtspStreamUrl = 'rtsp://localhost:8001/stream';
    const command = ffmpeg(rtspStreamUrl)
      .inputFormat('rtsp')
      .outputOptions(['-c:v libvpx', '-b:v 1M', '-deadline realtime', '-an'])
      .outputFormat('webm');
    
    console.log('Клиент подключен');
    
    // Установка заголовков для передачи видео в формате webm
    res.setHeader('Content-Type', 'video/webm');
    res.setHeader('Transfer-Encoding', 'chunked');
    
    // Перенаправление вывода ffmpeg напрямую в ответ сервера
    command.on('error', (err) => {
      console.error('Произошла ошибка при трансляции видео:', err);
      res.status(500).send('Произошла ошибка при трансляции видео');
    });
    
    command.pipe(res, { end: true });
  } catch (err) {
    console.error('Произошла ошибка при трансляции видео:', err);
    res.status(500).send('Произошла ошибка при трансляции видео');
  }
});

server.listen(3000, () => {
  console.log('listening on port http://localhost:3000');
});
