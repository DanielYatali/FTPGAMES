//This function display a game  in card form
function display_game(result){
    let i = 0;
    let short_description = "";
    let title_length = 0;
    let j = 0;
    let font_size = "28px";
    window.scrollTo(0, 0);

      short_description = result.short_description;
      let length = result.short_description.length; 
      title_length = result.title.length;
    
      if(title_length >= 14){
          font_size = "22px";
      }
      if(length > 102){
          short_description = result.short_description.slice(0, 101);
          short_description += "...";
      } 
      if(length < 102 && title_length < 14){
        font_size = "28px";
      }
       document.querySelector("main").innerHTML += `

   <div class="flip-card">
        <div class="flip-card-inner">
              <div class="flip-card-front">
                   <article style = "background-color: #aaaaaa;"class ="card">
                       <div class = "image-container">
                           <img class = "game" src="${result.thumbnail}" alt = "${result.title}"  />
                       </div>
                    <p class="title" style = "font-size: ${font_size}">${result.title}</p>
              </div>

              <div  class="flip-card-back">
                <h1 style = "font-size: ${font_size}" class = "title1">${result.title}</h1> 
                <p class = "short-description"><span class = "title-s-description"></span>${short_description}</p> 
                <button class="button" onclick = "get_details(${result.id})"><span>More Details</span></button>
             </div>
        </div>
    </div>
       `;
      i += 1;
}

//This function displays 50 games when the site is loaded.
function output_games(result){
    let i = 0;
    let short_description = "";
    let title_length = 0;
    let j = 0;
    let font_size = "28px";
    window.scrollTo(0, 0);
    
    document.querySelector("main").innerHTML = "";
    while(i < 50){
    	display_game(result[i]);
      i += 1;
    }
}
// "&nbsp;" this inputs a space
//Function displays game details when "More Details" is clicked
function output_game_details(result){
	window.scrollTo(0, 0);
  /*document.querySelector("main").style.backgroundImage = 'url( '+ result.screenshots[1].image + ')';*/
	let bool = result.hasOwnProperty('minimum_system_requirements');
    document.querySelector("main").style.display = "block";
     document.querySelector("main").style.color = "black";
     let screenshots_length = result.screenshots.length;
     let i = 0;
     document.querySelector("main").innerHTML = `
     <h2 class = "name-black">${result.title}</h2>
     <div class = "details">
         <h3 class = "description">Description:</h3>
         <p class = "gdescription"> &nbsp;${result.description}</p>
         <p class = "genre"> <span class = "hgenre"> Genre:</span>  &nbsp; ${result.genre} </p>
         <p class = "genre"><span class ="hgenre">Platform:</span> &nbsp; ${result.platform}</p>
         <p class = "genre"><span class="hgenre">Publisher:</span> &nbsp; ${result.publisher} </p>
         <p class = "genre, padding"> <span class="hgenre" >Release Date:</span> &nbsp; ${result.release_date}</p>
     </div>`;
     if(bool === true){
     document.querySelector("main").innerHTML += `<div class = "system-requirements">
         <p><span class = "hmsr" >Minimum System Requirements: </span></p>
         <p class = "specs"><span class ="msr">Processor:</span> &nbsp; ${result.minimum_system_requirements.os} </p>
         <p class = "specs"><span class ="msr">Memory:</span> &nbsp; ${result.minimum_system_requirements.memory} </p>
         <p class = "specs"><span class ="msr">Graphics:</span> &nbsp; ${result.minimum_system_requirements.graphics} </p>
         <p class = "specs, spacing"><span class ="msr">Storage:</span> &nbsp; ${result.minimum_system_requirements.storage} </p>
     </div>`;
    }
     document.querySelector("main").innerHTML += `<h3 class = "ss" >ScreenShots:</h3>`;
     //Rendering screen shots
      while(i < screenshots_length){
        document.querySelector("main").innerHTML += `
          <img class = "ss-image" src = "${result.screenshots[i].image}" alt = "Screenshot of ${result.title}">`;
          i += 1;
      }
      document.querySelector("main").innerHTML += `
     <div class = "download"> 
          <a class = "dbutton" href = "${result.game_url}" target="_blank" >Download Game</a>
          <br>
          <a class = "dbutton" href = "${result.freetogame_profile_url}" target="_blank">Play For Free</a>
     </div>`;
    }
//This function accepts a response from the Fetch function that is called when the site is loaded
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
function fetch_data(){
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
	console.log("Attempting to load from local data");
  output_games(data);
	console.error(err);
	
});
}
fetch_data();

//Get data for the search function
function fetch_data_search(){
fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", {
  "method": "GET",
  "headers": {
    "x-rapidapi-key": "ffc29b94cemshb3af13575180b71p1e0417jsnb71ba0e7a1f3",
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
  }
})
.then(response => {
  get_data_search(response);
  //console.log(response);
})
.catch(err => {
  console.log("Attempting to load from local data");
  output_search_games(data);
  console.error(err);
  
});
}

async function get_data_search(response){
   try{
     let result = await response.json();//2. Get data from response
     output_search_games(result);//sends data to the print function
  }catch(e){
     console.log(e);//catch and log any errors
  }
}

function output_search_games(result){
  let i = 0;
  let bool = false;
  let name = document.querySelector("#text-bar").value;
  document.querySelector("main").innerHTML = "";
  console.log(name);
  while(i < result.length){
    if(name == result[i].title){
      bool = true;
      display_game(result[i]);
    }
    i += 1;
  }
  if(bool === false){
    document.querySelector("main").innerHTML = `
      <div class = "no-results">
        <h1 id = "no-results-message">No matches found for the game "${name}"</h1>
      </div>`
  }
}


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

//Sends a request for data on specified genre
//However the api is mostly broken and sometimes returns data that is not within field specified.
function sort(field){
fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?category=" + field, {
  "method": "GET",
  "headers": {
    "x-rapidapi-key": "ffc29b94cemshb3af13575180b71p1e0417jsnb71ba0e7a1f3",
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
  }
})
.then(response => {
  sort_response(response, field);
})
.catch(err => {
  console.log("Attempting to load from local data.");
  output_sort(data, field);
  console.error(err);
  
});
}

async function sort_response(response, field){
   try{
     let result = await response.json();//2. Get data from response
     output_sort(result, field);//sends data to the print function
  }catch(e){
     console.log(e);//catch and log any errors
  }
}

//This function displays the games for specific genre.
function output_sort(result, field){
  window.scrollTo(0, 0);
  let length = result.length;
  let i = 0;
  if(field === "card"){
  	field = "Card Game";
  }
  document.querySelector("main").innerHTML = "";
  document.querySelector("main").style.display = "grid";
  while(i < length){
  	if(field == result[i].genre){
    display_game(result[i]);
    }
      i += 1;
  }
}
//Sends a Get request for a specific platform
function sort_platform(platform){
  fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?platform=" + platform, {
  "method": "GET",
  "headers": {
    "x-rapidapi-key": "ffc29b94cemshb3af13575180b71p1e0417jsnb71ba0e7a1f3",
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
  }
})
.then(response => {
  sort_platform_response(response, platform);
})
.catch(err => {
  console.log("Attempting to load from local data.");
  output_sort_platform(data, platform);
  console.error(err);
  
});
}

async function sort_platform_response(response, platform){
  try{
     let result = await response.json();//2. Get data from response
     output_sort_platform(result, platform);//sends data to the print function
  }catch(e){
     console.log(e);//catch and log any errors
  }
}
//Displays games based on specified platform
function output_sort_platform(result, platform){
  window.scrollTo(0, 0);
  let length = result.length;
  let i = 0;
  if(platform == "pc"){
  		platform = "PC (Windows)";
  	}
  else{
  		platform = "Web Browser";
  	}
  document.querySelector("main").innerHTML = "";
  document.querySelector("main").style.display = "grid";
  while(i < length){
  	if(platform == result[i].platform){
       display_game(result[i]);
      }
      i += 1;
  }
}
//Functions for the slidebar GHOST it from w3schools kix
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

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction1() {
  document.getElementById("myDropdown1").classList.toggle("show1");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn1')) {
    var dropdowns = document.getElementsByClassName("dropdown-content1");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show1')) {
        openDropdown.classList.remove('show1');
      }
    }
  }
}


