/*
const stream = require('node-rtsp-stream');
const express = require('express');
const app = express();

const streamOptions = {
  name: 'name',
  streamUrl: 'D:\\projects\\programming\\VideoHub\\backend\\videos\\2024-01-17_02-14-38.mp4',
  wsPort: 9999,
  ffmpegOptions: {
    '-stats': '', // Включение статистики ffmpeg
    '-r': 30, // Частота кадров
    '-q:v': 5, // Качество видео (меньше значение = выше качество)
  },
  stream_loop: '-1' // Бесконечное повторение видео
};

const videoStream = new stream(streamOptions);
*/
const Stream = require('node-rtsp-stream-jsmpeg')
const options = {
  name: 'streamName',
  streamUrl: 'file:///D:\\projects\\programming\\VideoHub\\backend\\videos\\2024-01-17_02-14-38.mp4',
  wsPort: 9999,
  ffmpegOptions: {
    '-stats': '', // Включение статистики ffmpeg
    '-r': 30, // Частота кадров
    '-q:v': 5, // Качество видео (меньше значение = выше качество)
  },
  stream_loop: '-1' // Бесконечное повторение видео
}
stream = new Stream(options)
stream.start()
