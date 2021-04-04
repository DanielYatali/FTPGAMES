//Prints all games from API
//Increase loop condition if u want to load more
//There are 506 games in the api
function output_games(result){
    let i = 0;
    while(i < 16){
       document.querySelector("main").innerHTML += `
       <article style = "background-color: #aaaaaa;"class ="card">
          <div class = "image-container">
             <img class = "game" src="${result[i].thumbnail}" alt = "${result[i].title}" onclick = "get_details(${result[i].id})" />
         </div>
      <p class="title">${result[i].title}</p>`;
      i += 1;
    }
}
// "&nbsp;" this inputs a space
//Function for printing data onclick
//Use classes for styling
function output_game_details(result){
  document.querySelector("main").style.display = "block";
     document.querySelector("main").style.color = "black";
     let screenshots_length = result.screenshots.length;
     let i = 0;
     document.querySelector("main").innerHTML = `
     <h2 class = "name black">${result.title}</h2>
     <div class = "details">
         <h3 class = "description">Description:</h3>
         <p class = "description"> &nbsp;${result.description}</p>
         <p class = "genre"> <span>Genre:</span>  &nbsp; ${result.genre} </p>
         <p class = "platform"><span>Platform:</span> &nbsp; ${result.platform}</p>
         <p class = "publisher"><span>Publisher:</span> &nbsp; ${result.publisher} </p>
         <p class = "release_date"> <span>Release Date:</span> &nbsp; ${result.release_date}</p>
     </div>

     <div class = "system-requirements">
         <p><span>Minimum System Requirements: </span></p>
         <p><span>Processor:</span> &nbsp; ${result.minimum_system_requirements.os} </p>
         <p><span>Memory:</span> &nbsp; ${result.minimum_system_requirements.memory} </p>
         <p><span>Graphics:</span> &nbsp; ${result.minimum_system_requirements.graphics} </p>
         <p><span>Storage:</span> &nbsp; ${result.minimum_system_requirements.storage} </p>
     </div>
     <h3>ScreenShots:</h3>`;
     //Rendering screen shots
      while(i < screenshots_length){
        document.querySelector("main").innerHTML += `
          <img class = "ss-image" src = "${result.screenshots[i].image}" alt = "Screenshot of ${result.title}">`;
          i += 1;
      }
      document.querySelector("main").innerHTML += `
     <div class = "download"> 
          <a href = "${result.game_url}" target="_blank" >Download Game</a>
          <br>
          <a href = "${result.freetogame_profile_url}" target="_blank">Play For Free</a>
     </div>`;

}
//This function accepts a response from the Fetch function that is calling when the site is loaded
async function getData(response){
   try{
     let result = await response.json();//2. Get data from response
     output_games(result);//sends data to the print function
  }catch(e){
     console.log(e);//catch and log any errors
  }
}
//Prints id of games clicked to the console
//Used for error checking
function get_details(id){
  console.log("You clicked Game ID: " + id);
  fetch_by_id(id);
}

async function getData_from_id(response){
   try{
     let result = await response.json();//2. Get data from response
     output_game_details(result);
  }catch(e){
      console.log(e);//catch and log any errors
  }
}

//Sends GET request for all Games in API
fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "ffc29b94cemshb3af13575180b71p1e0417jsnb71ba0e7a1f3",
		"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
	}
})
.then(response => {
  getData(response);
	//console.log(response);
})
.catch(err => {
	console.error(err);
});

//Called when a game is clicked 
//Accepts id of game and sends a GET request for details.
function fetch_by_id(id){
  fetch("https://free-to-play-games-database.p.rapidapi.com/api/game?id=" + id, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "ffc29b94cemshb3af13575180b71p1e0417jsnb71ba0e7a1f3",
		"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
	}
})
.then(response => {
	getData_from_id(response);
})
.catch(err => {
	console.error(err);
});
}

//Functions for the slidebar GHOST from w3schools kix
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.querySelector("span").style.display = "none";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.querySelector("span").style.display = "initial";
}