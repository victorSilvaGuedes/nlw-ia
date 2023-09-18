import { server } from './server.js';

const form = document.querySelector('#form');
const input = document.querySelector('#url');
const content = document.querySelector('#content');

//async = alguma coisa no código possui um tempo para terminar = requisição
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  content.classList.add('placeholder');

  const videoURL = input.value;
  if (!videoURL.includes('shorts')) {
    return (content.textContent =
      'Esse vídeo não é um short, tente novamente!');
  }

  const [_, params] = videoURL.split('/shorts/'); //divide em um array tudo antes de shorts e depois
  const [videoID] = params.split('?si'); //pega somente o id, descartando o resto depois de ?si que pode vir em algumas url

  content.textContent = 'Obtendo o texto do shorts...';

  //espera fazer a requisição ao server
  const transcription = await server.get('/summary/' + videoID);
  //o axios faz o armazenamento das respostas dentro de data
  content.textContent = 'Realizando o resumo...';

  const summary = await server.post('/summary', {
    text: transcription.data.result,
  });

  content.textContent = summary.data.result;
  content.classList.remove('placeholder');
});
