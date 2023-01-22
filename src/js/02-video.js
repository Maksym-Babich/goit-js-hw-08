import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const PreviousVideoTime = localStorage.getItem('videoplayer-current-time');
if (PreviousVideoTime) {
  player.setCurrentTime(PreviousVideoTime);
}

const currentTimeSaver = function (data) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(data.seconds)
  );
};

player.on('timeupdate', throttle(currentTimeSaver, 1000));
