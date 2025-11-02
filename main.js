//create a div ".conatiner" and append it on body to display and showing the manipulation of our playlist on DOM.
const container = document.createElement("div");
document.body.appendChild(container);

//access the "display-btn" and add event listener on it to display the whole playlist
let display = document.querySelector(".display-btn");
display.addEventListener("click", ()=>{
    displayPlaylist();
})

//access the "add-form" form and hide the form
let addForm = document.querySelector(".add-form");
addForm.classList.add("hide");


let actionType = "";
//access the "add-start-btn" button and add event listener on it to add the song at beginning
let addSongStart = document.querySelector(".add-start-btn");
addSongStart.addEventListener("click", ()=>{
    actionType = "start";
    addForm.classList.remove("hide");
})

//access the "add-end-btn" button and add event listener on it to add the song at ending
let addSongTail = document.querySelector(".add-end-btn");
addSongTail.addEventListener("click", ()=>{
    actionType = "end";
    addForm.classList.remove("hide");
})


//add event listener on form for adding song at start or end based on "actionType".
let addButtonForm = document.querySelector(".add-form-submit");
addButtonForm.addEventListener("click", (evt)=>{
    evt.preventDefault();
    const img = addForm.elements["img"].value;
    const title = addForm.elements["title"].value;
    const artist = addForm.elements["artist"].value;
    const duration = addForm.elements["duration"].value;
    
    if(actionType == "start"){
        addSongBeginning(img, title, artist, duration);
    } else{
        addSongEnd(img, title, artist, duration);
    }
    addForm.classList.add("hide");
})

//access the "del-form" form and hide the form
let deleteForm = document.querySelector(".del-form");
deleteForm.classList.add("hide");

//access the delete button and add event listener on it to delete the song
let deleteButton = document.querySelector(".remove-btn");
deleteButton.addEventListener("click", ()=>{
    deleteForm.classList.remove("hide"); 
})

//access the ".del-form-submit" button of form and delete the song whose title & duration is equal to input title & duration value
let delButtonForm = document.querySelector(".del-form-submit");
delButtonForm.addEventListener("click", (evt)=>{
    evt.preventDefault();
    const title = deleteForm.elements["title"].value;
    const duration = deleteForm.elements["duration"].value;
    
    deleteSong(title, duration);
    deleteForm.classList.add("hide");
})


//access the ".curr-song" button and add event listener on it to play the current song
let playCurrent = document.querySelector(".current-song");
playCurrent.addEventListener("click",()=>{
    const contentDiv = document.querySelector('.curr-card');
    
    const currTitle = contentDiv.querySelector('.song-title').textContent;
    const currArtist = contentDiv.querySelector('.song-artist').textContent;
    
    alert("🎶 Now playing: " + currTitle + " by " +  currArtist + "!");
})

let btn = "";
//access the ".previous-song" button and add event listener on it to play the previous song
const prevButton = document.querySelector('.previous-song');
prevButton.addEventListener('click', () => {
    const contentDiv = document.querySelector('.curr-card');
    btn = "previous";
    playSong(contentDiv, btn);
});

//access the ".next-song" button and add event listener on it to play the next song
const nextButton = document.querySelector('.next-song');
nextButton.addEventListener('click', () => {
    const contentDiv = document.querySelector('.curr-card');
    btn = "next";
    playSong(contentDiv,btn)
});

//access the ".restart.btn" button and add event listener on it to restart our playlist
const restart = document.querySelector(".restart-btn");
restart.addEventListener("click", ()=>{
    restartPlaylist();
})

//access the ".fav-song" button and add event listener on it to add song to favourites.
const favButton = document.querySelector(".fav-song");
favButton.addEventListener("click", ()=>{
    const contentDiv = document.querySelector(".curr-card");

    const title = contentDiv.querySelector(".song-title").textContent;
    const artist = contentDiv.querySelector(".song-artist").textContent;
    const duration = contentDiv.querySelector(".song-duration").textContent;

    //Access the clicked icon and change it according to if else condition
    const favIdx = findSongInFav(title, artist, duration);
    let favBtn = document.querySelector(".fav");

    if(favIdx === -1){
        favBtn.src = "./assets/like.png";
        addtoFavourite(contentDiv);
    } else{
        favBtn.src = "./assets/dislike.png";
        removeFromFavourite(contentDiv);
    }
})
