// splashscreen animation
document.addEventListener('DOMContentLoaded', function () {
  const splashScreenV1 = document.querySelector('.splashScreenV1');
  const splashScreenV2 = document.querySelector('.splashScreenV2');

  if (splashScreenV1) {
    splashScreenV1.style.display = 'flex';
    setTimeout(function () {
      splashScreenV1.style.display = 'none';
    }, 1500);
  }

  if (splashScreenV2) {
    splashScreenV2.style.display = 'flex';
    setTimeout(function () {
      splashScreenV2.style.display = 'none';
    }, 500);
  }
});


// assistant animation
function assistantMediaModeAnimation() {
  display('')
  assistant.style.animation = 'assistantMediaAnimation 2s forwards cubic-bezier(0.5, 0.1, 0.25, 1)'
  assistantContent.style.animation = 'fadeOut 1s 0s forwards'
  setTimeout(function () {
    assistantMediaPlayer.style.display = 'block'
  }, 2000);
}