

import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);
const LOCAL_STORAGE_KEY = "videoplayer-current-time";
const timeFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY) || 0;

const onPlay = function(data) {
    const currentTimeWatchingVideo = data.seconds;
    localStorage.setItem(LOCAL_STORAGE_KEY, currentTimeWatchingVideo);
};

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(timeFromLocalStorage);

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});
