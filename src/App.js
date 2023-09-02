import './App.css';
import {API_ID, API_KEY} from './key';
import { useState } from 'react';


/*
* App
* The Parent for all react componets 
*/
function App(){

  /*
  * useState is a React Hook that lets you add a state variable to your component.
  * State is like a component’s memory. 
  * State is reserved only for interactivity, that is, data that changes over time
  * It lets a component keep track of some information and change it in response to interactions. 
  * A parent component will often keep some information in state (so that it can change it), and pass it down to child components as their props.
  * Props are like arguments you pass
  * They let a parent component pass data to a child component and customize its appearance.
  * 
  * Search Bar uses State becasue it needs to display search text 
  */
  const [searchText, setSearchText] = useState('');
  const [recipeResults, setRecipeResults] = useState(null);
  let recipe_url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchText}&app_id=${API_ID}&app_key=${API_KEY}`;


  // Returning a div that holds together all the componets using jsx syntax
  return(
    <>
      <Header />
      <SearchBar 

        //passing searchText as a prop to SearchBar to be rendered
        searchText = {searchText}
        //The state is owned by App, so only it can call setSearchText and it must pass this function down toSearchBar
        onSearchTextChange={setSearchText} 
        recipe_url = {recipe_url}
        onRecipeSearched = {setRecipeResults}
      />
      
      <RecipeTileBoard 
        recipeResults = {recipeResults}
      />

    </>
  );
}


/*
* SearchBar({searchText, onSearchTextChange})
* 
* Param
* searchText - 
* onSearchTextChange - 
*/
function SearchBar({searchText, onSearchTextChange, recipe_url, onRecipeSearched}) {



  return(

    
    <div className="searchBar">
      <form>

        <input 
          type="text" 
          id="searchTextField" 
          name="searchTextField" 
          placeholder="Search..." 
          size = "30"
          //SearchBar reads the searchText prop to render it
          value= {searchText}
          //the onChange event handler calls a arrow function which takes e(e is the event object passed into the event handler i.e. the change in HTML for this event) as an input and sends it into the onSearchTextChange function(from the useState hook) which sets the searchText value
          onChange = {(e) => onSearchTextChange(e.target.value)}  
          />  

        <button className='search_button' 
          id="searchButton" 
          onClick={ (e) => {
            
            /*
            * without javascript (plain html), the form element submits when clicking either the <input type="submit" value="submit form"> or <button>submits form too</button>. 
            * In javascript you can prevent that by using an event handler and calling e.preventDefault() on button click, or form submit. e is the event object passed into the event handler. 
            * With react, the two relevant event handlers are available via the form as onSubmit, and the other on the button via onClick.
            */
            e.preventDefault();

            console.log('URL: '+ recipe_url);
            console.log('User Search: '+ searchText);

            /*
            * fetch method in JavaScript is used to request data from a server. The request can be of any type of API that returns the data in JSON or XML as a promise. 
            * We start by checking that the response status is 200 before parsing the response as JSON.
            * The then() method in JavaScript has been defined in the Promise API and is used to deal with asynchronous tasks such as an API call. 
            * The response of a fetch() request is a Stream object, which means that when we call the json() method, a Promise is returned since the reading of the stream will happen asynchronously.
            */
            fetch(recipe_url).then(
              function(response){
                if (response.status != 200){ //if the reponse wasn't a 200(ok) then print error code
                  console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                  return;
                }
                else{
                  response.json().then(function(data) {
                    console.log(data);
                    onRecipeSearched(Object.assign([], data.hits)); //sets recipeResults to any array copy of just the recipe (new page link it lost)
                  });
                }
              }
            ).catch(function(err){ //if the fetch method didn't work catch it and print error code
              console.log('fetch Error :-S', err);
            });
            

            //resets the search bar so it's empty
            onSearchTextChange("");

            }
          }
        >
          Search
        </button>          

      </form>
    </div>

  );
}


/*
*
*/
function RecipeTileBoard({recipeResults}){

  if (recipeResults != null){

    //to display multiple similar components from a collection of data (an array) use map() 
    //map() creates a new array from calling a function for every array element.
    return(
      <div className='recipe_tile_board'>
        {
          recipeResults.map( (item) => {
            return <RecipeTile recipe={item.recipe}/>
          })
        }
      </div>
    );    
  }
}


/*
*
*/
 function RecipeTile({recipe}){

  return (
    <div className='recipeTile'>
        <img className = "recipeTile__img" src = {recipe.image} />
        <p className = "recipeTile__name">
          <a href={recipe.url}>
          {recipe.label}
          </a>
        </p>
    </div>
    // recipe.image.match(/\.(jpeg|jpg|gif|png)$/) != null && ( //if the image is not of the formats in the regex don't show the recipe
    //   <div className='recipeTile'>
    //     <img className = "recipeTile__img" src = {recipe.image} />
    //     <p className = "recipeTile__name">{recipe.label}</p>
    //   </div>
    // )
  );
 }








/*
* Header()
* Just used as a header for the app
*/
function Header() {

  return (

    <div className="App-header">
      <h2>
        Cook-Book
      </h2>
    </div>

  );
}


//The App is exported to index.js where it's renderd into the index.html
export default App;
