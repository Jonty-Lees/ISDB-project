# ISDB Project

This app is hosted deployed through localHost, Heroku, MongoDB:

localhost: localhost:3000/

Heroku: https://isdb-app-project.herokuapp.com/

You can view documentation (via swagger) here:

https://isdb-app-project.herokuapp.com/documentation/


In this project for ISDB, the client wanted a simple backend app that allow users to register, login and search through their database for 
tracks, albums, artists and genres, but also allowed for a user to add a track to one of our registerd albums.

---

## Technologies

1. Node.js
2. express
3. mongoose
4. MongoDB

---

### User Stories

I created user stories to help shape my design, gave me achivable goals to complete and help keep the project on track.
These are prioritised with what I would look at first and then would work out how/if I would try to comlete it in this iteration.

![UserStories]()


---

## Development process and problem-solving strategy

In this project, there was far less room for creative adaptation as it had to precise to the clients requests. This meant I was able to 
take a more pragmatic apporoach, creating a list and completing each step without much creative improvisation.

I started off by creating the various files, making sure my project was connected to github from the beinging and I was regulary 
commiting to my repo. 

I quickly moved on to creating and enabling authentication through 

```
     {[...Array(5)].map((star, i) => {
```

to create multiples of a components.
I really enjoyed being slowly figuring out how to use html commands within React, the way to make the stars change colour when you mount goes over a star was a good example of this

```
 <FaStar
                className="star"
                size={15}
                color={
                  ratingValue <= (hover || watchLater) ? "#079ea3" : "#8a8989"
                }
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
```

understanding how to use the react icons dependenceis and have access to icons was fun!

I enjoyed using the onMouseEnter/Leave to change the hover state & prioritising the hover over watchLater.

I have been really struggling with the watched checkbox and the Delete Watched function. I had set it up with my previous design in a way that when you clicked 'watched', the check box is checked and the state props go from 'watched: false' to 'watched: true' and can toggle back and forth. Then the Delete Watched function .map through the props and returned those that were 'false', see below

```
function deleteWatchedMovies(id) {
    setFavMovie((previousMovies) => {
      return previousMovies.filter((favMovieItem, index) => {
        if (favMovieItem.watched === false) return index !== id;
      });
    });
  }
```

As I said, this worked when one row. when I introduced the second row,'Your Watch Later List', this no longer toggled **unless** I refreshed the page, then it would work as expected. I have, to the point of writing this, beem unable to figure out why.
I have poured in hours of looking at documentation, other examples and previous lectures and cannot figure out how to fix the bug.

---

## Future Iterations and Unsolved Problems

For the Future Here are somethings I would like to add and figure out

---

- Full button functionality
  As I changed the design faily late in the day, it meant the otion for a full reshuffle felt more overwhelming and not doable in the time frame. having every button work like it is meant to is a must!

- using the searchbar to call and external API like OMDB API to populate the list and give a wider array of movies to add to the watch later list

- Edit Order function
  I would like to add the option to edit the order of your watch later list. If I hadnt have had such a struggle, It was going to be a feature i wanted to implement but unfortunatly had to display: none it untill I can have time to implement it.

  - I would like to add a proper login feature
