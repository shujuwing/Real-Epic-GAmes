
  function fetchItem(endpoint, callback) {
    fetch(endpoint, {
      mode: "cors",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed Fetching");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        callback(data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        document.getElementById("cardHolder").innerHTML = `<p>Error fetching data.</p>`;
      });
  }


  function showGames(games) {
    let cardHolder = document.getElementById("cardHolder");
    cardHolder.innerHTML = ""; 

    if (!games || games.length === 0) {
      cardHolder.innerHTML = "<p>No results found.</p>";
      return;
    }


    games.forEach(function (game) {
      let gameCard = document.createElement("div");
      gameCard.classList.add("game");

      gameCard.innerHTML = `
        <h3>${game.title || "Unknown Title"}</h3>
        ${game.thumbnail ? `<img src="${game.thumbnail}" alt="${game.title}">` : ""}
        <p><strong>Genre:</strong> ${game.genre || "Unknown Genre"}</p>
        <p><strong>Platform:</strong>${game.platform || "Unknown Platform"}</p>
        <p><strong>Release Date:</strong>${game.release_date || "Unknown Release Date"}</p>
        <p><strong>Publisher:</strong>${game.publisher || "Unknown Publisher"}</p>
        <p><strong>Developer:</strong>${game.developer || "Unknown Developer"}</p>
        <a href="${game.game_url}" target="_blank">Play Now</a>
      `;

      cardHolder.appendChild(gameCard); 
    });
  }


  document.getElementById("selectCategory").addEventListener("change", function (event) {
    
      let endpoint = "https://www.mmobomb.com/api1/games";

      switch (event.target.value) {
        case "mmo":
          endpoint = "https://www.mmobomb.com/api1/latestnews" ;
          break;
        case "category":
          endpoint = "https://www.mmobomb.com/api1/games?category=shooter";
          break;
      }

      fetchItem(endpoint, showGames); 
    });


  function initial(){
      fetchItem("https://www.mmobomb.com/api1/games",showGames);
      
  }

initial();

