function getAllDirectors(moviesArray) {
    var directors = moviesArray.map(function (movie) {
      return movie.director;
    });
    var uniqueDirectors = [...new Set(directors)];
    return uniqueDirectors;
  }
  
    
  function howManyMovies(movies) {
    const filteredMovies = movies.filter(function (eachMovie) {
      if (
        eachMovie.director === "Steven Spielberg" &&
        eachMovie.genre.includes("Drama")
      ) {
        return true;
      }
    });
    return filteredMovies.length;
  }
  
  
    
  function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) {
      return 0; 
    }
  
    var totalScore = moviesArray.reduce(function (sum, movie) {
      return sum + (movie.score || 0); // Ensure that score is a number.
    }, 0);
  
    var averageScore = totalScore / moviesArray.length;
  
    return parseFloat(averageScore.toFixed(2));
  }
  
    
  function dramaMoviesScore(movies) {
    let dramaMoviesArr = movies.filter(function (eachMovie) {
      return eachMovie.genre.includes("Drama");
    });
    return scoresAverage(dramaMoviesArr);
  }
  
  
    
  function orderByYear(movies) {
    let moviesArr = JSON.parse(JSON.stringify(movies));
  
    moviesArr.sort((a, b) => {
      if (a.year > b.year) {
        return 1;
      } else if (b.year > a.year) {
        return -1;
      } else {
        if (a.title > b.title) {
          return 1;
        } else if (b.title > a.title) {
          return -1;
        }
        return 0;
      }
    });
    return moviesArr;
  }
  
    
  function orderAlphabetically(movies) {
    const moviesArr = JSON.parse(JSON.stringify(movies));
    const sortedMoviesArr = moviesArr
      .sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        } else {
          return 0;
        }
      })
      .map((eachMovie) => eachMovie.title)
      .slice(0, 20);
  
    return sortedMoviesArr;
  }
  
  
  
  // BONUS:
  
  function turnHoursToMinutes(movies) {
    function convertHours(hourString) {
      let calculateHour = hourString.split("h"); 
      return Number(calculateHour[0]) * 60; 
    }
  
    function convertMinutes(minuteString) {
      let calculateMinutes = minuteString.split("min"); 
      return Number(calculateMinutes[0]); 
    }
  
    function convertDuration(duration) {
      let timePieces = duration.split(" "); 
  
      
      let minutes = timePieces.reduce((sum, onePiece) => {
        if (onePiece.includes("h")) {
          return sum + convertHours(onePiece);
        }
        return sum + convertMinutes(onePiece);
      }, 0);
  
      return minutes; 
    }
  
    let moviesHoursToMinArr = movies.map(function (eachMovie) {
      let fixedMovie = JSON.parse(JSON.stringify(eachMovie)); 
      fixedMovie.duration = convertDuration(fixedMovie.duration); 
      return fixedMovie;
    });
  
    return moviesHoursToMinArr; 
  }
  
  
  
  // BONUS:
  
  function bestYearAvg(movies) {
    if (!movies.length) return null; 
  
    let masterObject = {}; 
  
    movies.forEach((eachMovie) => {
      if (!masterObject[eachMovie.year]) {
        masterObject[eachMovie.year] = [eachMovie]; 
      } else {
        masterObject[eachMovie.year].push(eachMovie);
      }
    });
  
    let highest = 0; 
    let theActualYear; 
  
    for (let theYear in masterObject) {
  
      if (scoresAverage(masterObject[theYear]) > highest) {
        highest = scoresAverage(masterObject[theYear]);
        theActualYear = theYear;
      }
    }
    return `The best year was ${theActualYear} with an average rate of ${highest}`;
    
  }
  
  console.log(bestYearAvg(movies));