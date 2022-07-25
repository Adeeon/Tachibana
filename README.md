# App Name
Tachibana

## Purpose
Build a custom social app more similar to Reddit than Twitter and track data on a page by page and user by user basis.

## Features

1. As a user/moderator I would like to be able to save data on a user by user basis.
    - To be able shift through the contents as a moderator by users 
    - Only see content from the user as the user 
    - Other content for a user from another different user.

2. Main screen will consist of: 
    - Followed/most recent stories. 
    - Search bar at the top for main/currentpage
    - Profile picture and drop downs for profile on the right
    - An expandable window on the left of followed/stared/top pages.

3. Track liked pages by users to be displayed on the main screen.
    - Show the top stories in each catagory in and trancend down the order.
    - Load in one random story from similar catagories every 5 to 10 links.

4. Give the ability for users to create new pages and moderate permissions for the page.
    - Ability to ban/limit/moderate users of the page for posting.
    - Ability to remove certain comments and edit comments for censorship.
    - Ability to change the limit of characters in the comments and limit post.

5. Ability to catagorize pages and users to display more relevant post on the home page.
    - Ability for moderators of pages to add/remove catagories
    - Ability for system admins to moderate page catagories so that they fit the actual topic of the page.

6. Ability for users edit their user profile and set suggested pages to certain catagories.

7. Ability for users to customize the look of the app with selected imputs.
    - Colors, etc.

## Data Model

1. Will consist of 'User', 'Page => Post'.

## Schecdule

### Weeks 1-2
1. Get CustomUser/Page/Post Models set up.
    - Get serializers for user/page/post set up.
    - Permissions.
    - Views.
    - Error Correct

2. Establish JavaScript for the Webpage and work on interactions.
    - Ability to click title and load web page.
    - Encase certain aspects of the web page in Boolean Fields to Keep rendering differnt pages to a minimum.
    - Back button for page to main and post to page.
    
3. Develop rough web page with working interactions.
    - Establish functionality of the abilites listed in #2 of Features
    - Establish test/functionality for users and permissions
    

### Week 3
1. Error correct and attempt to implament test for functions.

2. CSS... Likely last.