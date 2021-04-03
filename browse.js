//Don't worry about this.
async function getData(response){
   try{
     let result = await response.json();//2. Get data from response
     let i = 0;
     while(i < 16){
      document.querySelector("main").innerHTML += `<article style = "background-color: gold;"class ="card">
    <div class = "image-container">
       <img class = "game" src="${result[i].thumbnail}" alt = "${result[i].title}" onclick = "get_details(${result[i].id})" />
    </div>
    <p class="title">${result[i].title}</p>`;
    i += 1;
    }
     
     //document.querySelector(".title").innerHTML = `<p></p><br><p>${result[0].short_description}</p>`
     console.log(result[0].thumbnail);
  }catch(e){
      console.log(e);//catch and log any errors
  }
}

function get_details(id){
  console.log(id);
  fetch_by_id(id);
}

async function getData_from_id(response){
   try{
     let result = await response.json();//2. Get data from response
     document.querySelector("main").style.display = "block";
     document.querySelector("main").style.color = "black";
     document.querySelector("main").innerHTML = `

     <h2 class = "name black">${result.title}</h2>

     <div class = "details">
         <h3 class = "description">Description:</h3>
         <p class = "description"> &nbsp;${result.description}</p>
         <p class = "genre">Genre:  &nbsp; ${result.genre} </p>
         <p class = "platform">Platform: &nbsp; ${result.platform}</p>
         <p class = "publisher">Publisher: &nbsp; ${result.publisher} </p>
         <p class = "release_date"> Release Date: &nbsp; ${result.release_date}</p>
     </div>

     <div class = "system-requirements">
         <p>Minimum System Requirements</p>
         <p>Processor: &nbsp; ${result.minimum_system_requirements.os} </p>
         <p>Memory: &nbsp; ${result.minimum_system_requirements.memory} </p>
         <p>Graphics: &nbsp; ${result.minimum_system_requirements.graphics} </p>
         <p>Storage: &nbsp; ${result.minimum_system_requirements.storage} </p>
     </div>

     <div class = "screenshots">
        <h3>ScreenShots:</h3>
        <img class = "ss-image" src = "${result.screenshots[0].image}" alt = "Screenshot of ${result.title}">
        <img class = "ss-image" src = "${result.screenshots[1].image}" alt = "Screenshot of ${result.title}">
        <img class = "ss-image" src = "${result.screenshots[2].image}" alt = "Screenshot of ${result.title}">
        <img class = "ss-image" src = "${result.screenshots[3].image}" alt = "Screenshot of ${result.title}">

     </div>


     <div class = "download"> 
          <a href = "${result.game_url}" target="_blank" >Download Game</a>
          <br>
          <a href = "${result.freetogame_profile_url}" target="_blank">Play For Free</a>
     </div>
     `;

  }catch(e){
      console.log(e);//catch and log any errors
  }
}

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