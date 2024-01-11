# Cine Search

#### Video Demo: https://studio.youtube.com/video/mZoTN721bOU/edit

#### Description:

The project was created in react + vite.

It is divided into 4 components and 1 context.

For css I chose to use css modules, as I don't feel comfortable with any preprocessors and frameworks.

Components:
1. Background: This component is rendered only within the MoviePage component, its function is to receive the movie image and render it in the background.
2. Cards: This component has two distinct functions:
     *  receive information about films and render film cards individually, the data comes in array format this information can come in 2 different moments
          * When a search is carried out, in these cases the size of the array can vary and that is why I chose react instead of pure CSS, because using the map function I actually only create one card, the rest is a copy of that original created
          * When the page is loaded this component receives an array of 12 elements
            
     *  The component passes information about the ID of the film that the user wants to see more details when the see more button is clicked, this is relevant because the API where we search and the initial rendering of the film does not have all the details we need

3. MoviePage: This component receives the ID of the selected film and searches for the necessary information in two different APIs (Streaming Availability, TMDB). It renders this information on the screen and calls the Background component to render the background according to the chosen film and the image that came in the API call.
4. SearchBar:This component persists on all pages of the application, the landing page, the page for a specific film and the search page, which is nothing more than the landing page but with the cards being rendered according to the film being searched for. This component is responsible for managing the surveys carried out and forwarding the survey response. When the page is loaded for the first time, this component makes a request for the 12 most popular films.
