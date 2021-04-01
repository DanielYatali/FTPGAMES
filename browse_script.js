//Don't worry about this.
async function getData(response){
   try{
     let result = await response.json();//2. Get data from response
     console.log(result[0].thumbnail);
     document.querySelector("#pic").innerHTML = `<img src = "${result[0].thumbnail}" alt = "${result[0].title}">`;
     document.querySelector("#title").innerHTML = `<p>${result[0].title}</p><br><p>${result[0].short_description}</p>`
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
