let playList= [];
let favSong= [];

//Store the data of favSong on local storage
let storedFavSong  = localStorage.getItem("favSong");
if(storedFavSong && storedFavSong !== ""){
    try{
        favSong = JSON.parse(storedFavSong);
    } catch(err){
        console.error("Error parsing favSong from localStorage:", err);
        favSong = [];
    }
} else{
    localStorage.setItem('favSong', JSON.stringify(favSong));
}


//Store the data of playlist on localStorage
let storedPlaylist = localStorage.getItem("playList");
if(storedPlaylist){
    playList = JSON.parse(storedPlaylist);
} else{
    localStorage.setItem('playList', JSON.stringify(playList));
}

//Class Song for storing the data of each song. 
class Song {
    img;
    title;
    artist;
    duration;

    constructor(img, title, artist, duration){
        this.img = img;
        this.title = title;
        this.artist = artist;
        this.duration = duration;
    }
};

//Function for finding a song in the playlist and return the index of song if exist else return -1.
function findSong(img, title, artist, duration){
    for(let i = 0 ; i < playList.length; i++){
        if(playList[i].title == title && playList[i].artist == artist && playList[i].duration == duration ){
            return i;
        }
    }
    return -1;
}

//function to display the playlist.
function displayPlaylist(){
    container.innerHTML = "";

    let heading = document.createElement("h2");
    heading.textContent = "Your Playlist!";
    heading.classList.add("display");

    container.appendChild(heading)

    if(playList.length == 0){
        alert("Playlist is empty!");
        return;
    }
  
    for(let i = 0 ; i < playList.length ; i++){
        const card = document.createElement("div");
        const img = document.createElement("img");
        const songName = document.createElement("h4");
        const songArtist = document.createElement("p");
        const songDuration = document.createElement("p");
        
        container.className = "container";
        card.className = "card";
        img.alt = "Album image";
        
        img.src = playList[i].img;
        songName.textContent = playList[i].title;
        songArtist.textContent = playList[i].artist;
        songDuration.textContent = playList[i].duration;

        card.appendChild(img);
        card.appendChild(songName);
        card.appendChild(songArtist);
        card.appendChild(songDuration);
        
        container.appendChild(card);   
    }
}

//Function to add song at beginning.
function addSongBeginning(img, title, artist, duration ){
    let findIdx = findSong(title, artist, duration);
    
    //If already exist then move it to beginning 
    if(findIdx != -1){
        const existingSong = playList.splice(findIdx, 1)[0];
        playList.unshift(existingSong);
    } 
    else{ //else insert it into beginning
        const obj = new Song(img, title, artist, duration);
        playList.unshift(obj);
    }
    localStorage.setItem('playList', JSON.stringify(playList));
    alert("🎶 Song added to the beginning of playlist.\n");
    displayPlaylist();
}

//Function to add song at end.
function addSongEnd(img, title, artist, duration ){
    let findIdx = findSong(title, artist, duration);    
    
    if(findIdx != -1){
        const existingSong = playList.splice(findIdx, 1)[0];
        playList.push(existingSong);
    } else{
        const obj = new Song(img, title, artist, duration);
        playList.push(obj);
    }
    localStorage.setItem('playList', JSON.stringify(playList));
    alert("🎶 Song added to the end of playlist.\n");
    displayPlaylist();
} 

//Function to delete a song.
function deleteSong(title, duration){
    //Base case - If playlist is empty
    if(playList.length == 0){
        alert("⚠️ Playlist is empty!\n");
        return;
    }

    //Find the index of song which we have to delete
    let idx = -1;
    for(let i = 0; i < playList.length; i++){
        if(playList[i].title == title && playList[i].duration == duration){
            idx = i;
            break;
        }
    }
    
    //delete the song from playlist
    if(idx == -1){
        alert("Song not found!\n");
    }else{
        playList.splice(idx, 1);
        localStorage.setItem('playList', JSON.stringify(playList));
        alert( "🗑️ Song deleted: ", title, "\n");
    }

    //display the updated playlist
    displayPlaylist();
}

//Function for playing next or previous song based on which button we have clicked
function playSong(contentDiv, str){
    const songTitle = contentDiv.querySelector('.song-title');
    const songArtist = contentDiv.querySelector('.song-artist');
    const songDuration = contentDiv.querySelector('.song-duration');
    const songImg = contentDiv.querySelector('.song-img');
    
    //find that song exist or not or if exist get the index
    let ans = findSong(songImg, songTitle.textContent, songArtist.textContent, songDuration.textContent);
    
    //update the index according to str value (previous, next)
    if(str == "previous"){
        if(ans == 0){
            ans = playList.length-1;
        }else{
            ans = ans-1;
        } 
    } 
    else if(str == "next"){
        if(ans == playList.length-1){
            ans = 0;
        } else{
            ans = ans+1;
        }
    }
    const newObj = playList[ans];

    //Update the value in DOM
    songTitle.textContent = newObj.title;
    songArtist.textContent = newObj.artist;
    songDuration.textContent = newObj.duration;
    songImg.src = newObj.img;
}

//Function for restart our playlist(Play the first song of the playlist)
function restartPlaylist(){
    const newObj = playList[0];

    let songTitle = document.querySelector('.song-title');
    let songArtist = document.querySelector('.song-artist');
    let songDuration = document.querySelector('.song-duration');
    let songImg = document.querySelector('.song-img');

    songTitle.textContent = newObj.title;
    songArtist.textContent = newObj.artist;
    songDuration.textContent = newObj.duration;
    songImg.src = newObj.img;
}

//Function to find a song in favSong array.
function findSongInFav(title, artist, duration){
    for(let i = 0 ; i < favSong.length; i++){
        if(favSong[i].title == title && favSong[i].artist == artist && favSong[i].duration == duration ){
            return i;
        }
    }
    return -1;
}

//Function to add song to favourites
function addtoFavourite(currSong){
    const img = currSong.querySelector(".song-img").src;
    const title = currSong.querySelector(".song-title").textContent;
    const artist = currSong.querySelector(".song-artist").textContent;
    const duration = currSong.querySelector(".song-duration").textContent;

    const obj = new Song(img, title, artist, duration);
    favSong.push(obj);
    localStorage.setItem('favSong', JSON.stringify(favSong));
    alert("🎶 Song added to favourites.\n");

} 

//Function to remove song from favourites.
function removeFromFavourite(currSong){
    const img = currSong.querySelector(".song-img").src;
    const title = currSong.querySelector(".song-title").textContent;
    const artist = currSong.querySelector(".song-artist").textContent;
    const duration = currSong.querySelector(".song-duration").textContent;

    let findIdx = findSongInFav(title, artist, duration);    
    if(findIdx != -1){
        favSong.splice(findIdx, 1);
        localStorage.setItem('favSong', JSON.stringify(favSong));
        alert("🎶Song removed from favourites!");
    }
} 