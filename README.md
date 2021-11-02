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

![UserStories](https://user-images.githubusercontent.com/86611109/139845123-f744626f-db19-41af-b833-6e84c4c46876.png)

for a more detailed look, please visit:

https://miro.com/app/board/o9J_loFrc9U=/?invite_link_id=846433399948

---

## Development process and problem-solving strategy

In this project, there was far less room for creative adaptation as it had to precise to the clients requests. This meant I was able to 
take a more pragmatic apporoach, creating a list and completing each step without much creative improvisation.

I started off by creating the various files, making sure my project was connected to github from the beinging and I was regulary 
commiting to my repo. 

I quickly moved on to creating and enabling authentication through passport and jwt. 
Creating a simple user Schema that allowed for a username and password, a jwt stratergy that took a payload and POST routes
for both the register and login routes. Making sure register added the username to our Mongo DB but not the password, as well as retrieving and sending
the user a key once logged in or through error status and message: see below

```
     if (user) {
                            // pass jwt token
                            const payload = { id: user.id };
                            const token = jwt.sign(payload, jwtOptions.secretOrKey);

                            res.status(200).json({
                                message: "Login Successful!!",
                                token: token
                            });
                        } else {
                            res.status(401).json({
                                message: "Invalid password"
                            });
```

I found this fairly challenging as there are lots of moving parts, but this process, along with more practise in the following months, will help solidify the theory and practise of setting up authentication (without the use google and notes!)

Once authentication was done, it was just a task of making the routes work, getting all the corrent information from the aggregate pipelines. 

The most challengin one was the /tracks/:id as I needed to figure out how to retireve data from multiple collections by using data store in the document I was searching for. This led me on to the $match and $lookup aggregation tool, once managing how to use it, trying to convert from mongosh to node was a challenge. I found that $match was not taking in my req.params.id. We eventurally figured out it was looking an integer but node was changing it to a string, So i was able to stop that with the parseInt, see below:

```
router.get('/tracks/:id', passport.authenticate("jwt",
    { session: false }),
    async function (req, res) {
        const track = await Tracks.aggregate([
            {
                $match: {
                    "TrackId": parseInt(req.params.id)
                }
            },
            {
                $lookup: {
                    from: "albums",
                    localField: "AlbumId",
                    foreignField: "AlbumId",
                    as: "Album"
```


Much of the challenge comes with doing it for the first time, once I understood how certain bits worked, it was very easy to replicate


Finally, when a user POST's a new track, it needs to be connected to a pre-existing album and a pre-existing genre. I thought through how I wanted to do this and decided to have some fun and try Schema validation. The brief was to make a quick working database, considering there was no need to add albums or genres, I wanted to go down this route instead of if/ if else statments within the /tracks route. I found it really fun working out what a Schema can do and how it validates, see below:


```
const trackSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    AlbumId: {
        type: Number,
        required: true,
        min: [1, "Only tracks that belong to pre-existing albums can be added"],
        max: [347, "Only tracks that belong to pre-existing albums can be added"]
    },
    TrackId: Number,
```

---

## Future Iterations

For the Future Here are somethings I would like to add and figure out

---

- If the client decided they wanted to add more albums and genres, it would only make sense to create an if statment to allow for that without having to revist the code. It was a good learning experience but for future iterations its worth changing that bit of code



