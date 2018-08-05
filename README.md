#Pending

# server side
1. Restructure pages, so when it loads, it checks if your set in local storage. If yes> welcome back message. if no> login form/join now load. Check in Server.js???
1. NEED TO MODIFY GET REQUEST WITH SEARCH TO INCLUDE ZIPCODE/CITY
1. FIX CREATED DATE IN SERIALIZE
1. make sure new user inputs transform to lower case on all items
1. fix tests GET/POST routes >>> swapPosts
1. Create put test case >>> swapposts
1. create post test case >>>users

# CSS
1. Create non mobile css
1. Picture boarders off on all pgs
1. format create-profile form
1. fix form box sizing on login fields, too small
1. style messages on index.html related to login

# index.HTML
1. Error handling for new users > not displaying helpful message

# createPost.html
1. renderUserPostList() > how do I set char limit of "have", so it only shows snippit
1. Need to integrate user ID into request > local storage?
1. Need to determine when rendering, how to assign a value from the response object...aka post id

---------------------------------
# If time permits

# results.HTML
1. set form to clear

# index.HTML
1. refactor (DRY) renderCreateAccountForm()

-----------------------------

# Stretch Goal
1. Create way for user to use gravatar for photo of self or users to upload a
    photo of themselves
1. Create way for users to upload photos of their swaps (S3)
1. Create way for user to modify their username
1. Create way for private messaging within the app





-------------------------------
# Crop-Swap
https://crop-swap.herokuapp.com/

# Summary
Crop Swap is designed to help people connect with their neighbors so they can swap excess fruits/veggies/herbs whenever or wherever they like.

# Motivation
I'm a fan of gardening and eating what you grow, but when your what you grow goes gangbusters, it gets old
eating the same thing day in and out, and who wants to waste the food? Once a week people from my neighborhood would get together, bring what excess they have and swap stuff out. I realized if there was a
way for people to connect on a broader level or on different days, even more swaping could be done.

# Technology used
* JavaScript/ jQuery
* Node/Express
* Mongo/Mongoose
* Travis CI
* Heroku/mLab
* HTML
* CSS
