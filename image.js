var canvas = document.querySelector('canvas')
var playButton = document.querySelector('.playButton')

const ctx = canvas.getContext('2d');

var x = 0;

playButton.addEventListener('click', () => {
  
anim();
startRecording();
})



function startRecording() {
  const chunks = []; 
  const stream = canvas.captureStream(); 
  const rec = new MediaRecorder(stream); 
 
  rec.ondataavailable = e => chunks.push(e.data);
 
  rec.onstop = e => exportVid(new Blob(chunks, {type: 'video/webm'}));
 
  rec.start();
  setTimeout(()=>rec.stop(), 6000); 
}

function exportVid(blob) {
  const vid = document.createElement('video');
  vid.src = URL.createObjectURL(blob);
  vid.controls = true;
  document.body.appendChild(vid);
  const a = document.createElement('a');
  a.download = 'myvid.webm';
  a.href = vid.src;
  a.textContent = 'download the video';
  document.body.appendChild(a);
}

function anim(){
    
  requestAnimationFrame(anim);
 
  ctx.fillRect(x - 20, 0, 40, 40);
    ctx.clearRect(0,0,640,480)
  var image = new Image();
  image.src='/image.jpeg';

  ctx.drawImage(image, x, 20, 400, 400);
    

    x = (x + 1) % canvas.width;
}




