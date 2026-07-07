//initialize the variables

let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let volumeSlider = document.getElementById('volumeSlider');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Salam-e-Ishq", filePath: "song/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Ae Dil Hai Mushkil", filePath: "song/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Tum Hi Ho", filePath: "song/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Channa Mereya", filePath: "song/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Given to You", filePath: "song/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Mere Sapno Ki Rani", filePath: "song/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Zinda Bapu", filePath: "song/7.mp3", coverPath: "covers/7.jpg"}
];

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    volumeSlider.value = progress;
});

volumeSlider.addEventListener('change', ()=>{
    audioElement.currentTime = (volumeSlider.value / 100) * audioElement.duration;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();

        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');

        songIndex = parseInt(e.target.id) - 1;

        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();

        masterSongName.innerText = songs[songIndex].songName;

        gif.style.opacity = 1;

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= songs.length - 1){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }

    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    masterSongName.innerText = songs[songIndex].songName;

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    gif.style.opacity = 1;
});

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }

    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    masterSongName.innerText = songs[songIndex].songName;

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    gif.style.opacity = 1;
});