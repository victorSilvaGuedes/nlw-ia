import ytdl from 'ytdl-core';
import fs from 'fs';
import { error } from 'console';

export const download = (videoID) =>
  new Promise((resolve, reject) => {
    const videoURL = 'https://www.youtube.com/shorts/' + videoID;
    console.log('Realizando download do video:' + videoID);

    ytdl(videoURL, { quality: 'lowestaudio', filter: 'audioonly' })
      .on('info', (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000;
        if (seconds > 60) {
          throw new Error('A duração desse vídeo é maior que 60 segundos');
        }
      })
      .on('end', () => {
        console.log('Download do vídeo finalizado');
        resolve();
      })
      .on('error', (error) => {
        console.log('ERRO: ', error);
        reject(error);
      })
      .pipe(fs.createWriteStream('./tmp/audio.mp4'));
  });
