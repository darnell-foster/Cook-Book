import './App.css';
import {API_ID, API_KEY} from './key';

function App() {
  let query = ""
  let recipe_url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_KEY}`;
// https://api.edamam.com/api/recipes/v2?type=public&q=cookie&app_id=c74766d1&app_key=f29f0fad4ba55d635f7b2db632946707

  
  /*
   * Uses the text field from search as a query for the API URL above
   * Retrives a json file from the link
  */
  function getRecipe(){
    //request data from a server. The request can be of any type of API that returns the data in JSON
    let result = fetch(recipe_url);
  
    console.log(result);
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
          <input type="text" id="Search" name="Search" placeholder="Enter Ingridient"></input>
          <button type="button" name="submit" onClick={getRecipe}>Search</button>
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
