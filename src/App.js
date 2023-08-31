import './App.css';
import {API_ID, API_KEY} from './key';

function App() {
  let query = ""
  let recipe_url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_KEY}`;

  
  /*
   * Uses the text field from search as a query for the API URL above
   * Retrives a json file from the link
  */
  function getRecipe(){

    //grabs the text inside the searchTextField element
    query = document.getElementById("searchTextField");

    //request data from a server. The request can be of any type of API that returns the data in JSON
    // let result = fetch(recipe_url);

    
    console.log(query);
    // console.log(result);
  }


  //The componet being returned and rendered
  return (
    <div className="App">

      <header className="App-header">
        <h2>
          Cook-Book
        </h2>
      </header>

      <body className="App-body">

        <form className='search_field'>
          <input type="text" id="searchTextField" name="searchTextField" placeholder="Enter Search Query" size = "30" value =""></input>
          {/* note In vanilla javascript you would probably have onclick="somefunctionname". But not in JSX, you need to pass a function as stated in the error. */}
          <button id="search_button" onClick={getRecipe()} >Search</button>          
        </form>


      </body>


      {/* <footer>
        <p>
          Darnell Foster
        </p>
      </footer> */}

    </div>
  );
}

export default App;
