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
  const [ShowChangePageButtons, setShowChangePageButtons]  = useState(false);

  // const [prevPageLink, setPrevPageLink]  = useState('');
  // const [pageTracker, setPageTracker]  = useState(1);


  // const [recipe_url, setRecipe_url] = useState(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchText}&app_id=${API_ID}&app_key=${API_KEY}`);



  // Returning a div that holds together all the componets using jsx syntax
  return(
    <>
      <Header />
      <div className='App-body'>
        <SearchBar 

          //passing searchText as a prop to SearchBar to be rendered
          searchText = {searchText}
          //The state is owned by App, so only it can call setSearchText and it must pass this function down toSearchBar
          onSearchTextChange={setSearchText} 
          onRecipeSearched = {setRecipeResults}
          ShowChangePageButtons = {ShowChangePageButtons}
          setShowChangePageButtons = {setShowChangePageButtons}
        />

        <RecipeTileBoard 
          recipeResults = {recipeResults}
          setShowChangePageButtons = {setShowChangePageButtons}
        />
      </div>
      
      <div className='App-footer'>

      </div>

    </>
  );
}


/*
* SearchBar({searchText, onSearchTextChange})
* 
* This componet renders the user search field along with the button and drop down menu
* When the button is pressed it sends a fetch request to the API database based on the user input for seach field and drop down
* if the search field is left blank it will not send a request
*
* Param
* searchText - Used to store the data on what the user searches in the text field
* onSearchTextChange - used to change the searchText prop
* onRecipeSearched - used to change the recipeResults prop
* ShowChangePageButtons - prop holds the state true or false for showing the page buttons
* setShowChangePageButtons - sets the ShowChangePageButtons props state
*/
function SearchBar({searchText, onSearchTextChange, onRecipeSearched, ShowChangePageButtons, setShowChangePageButtons}) {

  //url for API
  let recipe_url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchText}&app_id=${API_ID}&app_key=${API_KEY}`;

  // state prop used for meal type drop down (search attribute)
  const [mealTypes, setMealTypes]  = useState('');

  // used for page buttons
  const [nextPageLink, setNextPageLink]  = useState('');
  const [prevPageLink, setPrevPageLink]  = useState('');


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

        <Select_bar
          mealTypes = {mealTypes}
          onMealTypesChoosen = {setMealTypes}
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

            if(searchText != null && searchText != ''  && searchText != ""){//if the search field is blank don't bother sending a querry to the API database

              console.log('URL: '+ recipe_url);
              console.log('User Search: '+ searchText);
              console.log('mealTypes: ' + mealTypes);

              if (mealTypes != ''){
                recipe_url = (recipe_url + `&mealType=${mealTypes}`);
                console.log("URL CHANGED: "+ recipe_url);
              }
              
              send_fetch_request(recipe_url, onRecipeSearched, setNextPageLink, setShowChangePageButtons);

              //resets the search bar so it's empty
              onSearchTextChange("");
            }
          }}
        >
          Search
        </button>          
      </form>
      
      <div>
        {/* <ChangePage_button
          ShowChangePageButtons  = {ShowChangePageButtons}
          setShowChangePageButtons = {setShowChangePageButtons}
          setNextPageLink = {setNextPageLink}
          onRecipeSearched = {onRecipeSearched}
          label = {'prev'}
          pageLink = {prevPageLink}
        /> */}

        <ChangePage_button
          label = {'next'}
          ShowChangePageButtons  = {ShowChangePageButtons}
          setShowChangePageButtons = {setShowChangePageButtons}
          setNextPageLink = {setNextPageLink}
          onRecipeSearched= {onRecipeSearched}
          pageLink = {nextPageLink}
        />
      </div>

    </div>

  );
}




/*
* The function used to send a fetch request to the api database
*
* param
* url - the url used for the the fetch request
* onRecipeSearched - used to change the recipeResults prop
* setNextPageLink - used to set the onRecipeSearched prop
*/
function send_fetch_request(recipe_url, onRecipeSearched, setNextPageLink, setShowChangePageButtons){

  /*
  * fetch method in JavaScript is used to request data from a server. The request can be of any type of API that returns the data in JSON or XML as a promise. 
  * We start by checking that the response status is 200 before parsing the response as JSON.
  * The then() method in JavaScript has been defined in the Promise API and is used to deal with asynchronous tasks such as an API call. 
  * The response of a fetch() request is a Stream object, which means that when we call the json() method, a Promise is returned since the reading of the stream will happen asynchronously.
  */
  fetch(recipe_url).then(
    function(response){
      if (response.status != 200){ //if the reponse wasn't a 200(ok) then print error code
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        onRecipeSearched("None");
        setShowChangePageButtons(false);
        return;
      }
      else{
        response.json().then(function(data) {
          console.log(data);
          if (data._links.next != null) setNextPageLink(data._links.next.href);
          onRecipeSearched(Object.assign([], data.hits)); //sets recipeResults to any array copy of just the recipe (new page link it lost)
          setShowChangePageButtons(true);
        });
      }
    }
  ).catch(function(err){ //if the fetch method didn't work catch it and print error code
    console.log('fetch Error :-S', err);
  });
  
}



/*
* The Componet for the select meal type
*
* renders the drop down for the meal type you want and sets is if the users picks one
*
* param
* onMealTypesChoosen - uses to set the mealTypes prop
* mealTypes - used to store the user entry for meal Type
*/
function Select_bar({onMealTypesChoosen, mealTypes}){
  
  return(
    <select 
      className='meal_types_select'
      value={mealTypes} // force the select's value to match the state variable
      onChange={e => onMealTypesChoosen(e.target.value)} // update the state variable on any change!
    >
      <option  value = ''> type... </option>
      <option  value ="breakfast"> breakfast </option>
      <option  value ="brunch"> brunch </option>
      <option  value ="lunch/dinner"> lunch/dinner </option>
      <option  value ="snack"> snack </option>
      <option  value ="teatime"> teatime </option>
    </select>
  );
  
}



//TODO: finish code for change page
function ChangePage_button({label, ShowChangePageButtons, setShowChangePageButtons, pageLink, setNextPageLink, onRecipeSearched}){

  if(ShowChangePageButtons) return(

    <button 
      className='changePage_button'
      onClick={(e) =>{
        e.preventDefault();        
        
        send_fetch_request(pageLink, onRecipeSearched , setNextPageLink , setShowChangePageButtons);
      }}>
      {label}
    </button>
  );

  return null;
}



/*
* The Componet for the tile grid
* Renders the grid of items based on the search 
* if none is found will return a heading saying this
*
* Param
* recipeResults - The prop containg the array of recipes
* setShowChangePageButtons - sets the ShowChangePageButtons props state
*/
function RecipeTileBoard({recipeResults, setShowChangePageButtons}){

  if (recipeResults != null && recipeResults != "None"){

    //to display multiple similar components from a collection of data (an array) use map() 
    //map() creates a new array from calling a function for every array element.
    return(

      <>
        <div className='recipe_tile_board'>
          {
            recipeResults.map( (item) => {
              return <RecipeTile recipe={item.recipe}/>
            })
          }
        </div>
      </>
      
    );    
  }else if (recipeResults == "None"){
    setShowChangePageButtons(false);
    return(
      <h1> NONE FOUND </h1>
    );
  }
}



/*
* The Componet for the tile grid
* Renders a single item for the recipe grid
*
* Param
* recipe - the prop containing a recipes data such as link, img, name, etc.
*/
function RecipeTile({recipe}){

  // recipe.image.match(/\.(jpeg|jpg|gif|png)$/) != null && ( //if the image is not of the formats in the regex don't show the recipe
  return (

    <div className='recipeTile'>
        <img className = "recipeTile__img" src = {recipe.image} />
        <div className = "recipeTile__nameBorder">
          <p className = "recipeTile__name">
            <a className = "recipeTile__name" href={recipe.url}>
            {recipe.label}
            </a>
          </p>
        </div>
    </div>
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
      <h2 className= "header-label">
        Cook-Book
      </h2>
    </div>

  );
}


//The App is exported to index.js where it's renderd into the index.html
export default App;
