//Don't worry about this.
async function getData(response){
   try{
     let result = await response.json();//2. Get data from response
     let i = 0;
     while(i != 506){
      document.querySelector("main").innerHTML += `<article class ="card">
    <div class = "image-container">
       <img class = "game" src="${result[i].thumbnail}" alt = "${result[i].title}">
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

async function getData_from_id(response){
   try{
     let result = await response.json();//2. Get data from response
     document.querySelector("#descrip").innerHTML = `<br><p>${result.description}</p>`;
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
function fetch_by_id(){
  fetch("https://free-to-play-games-database.p.rapidapi.com/api/game?id=1", {
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
fetch_by_id();
