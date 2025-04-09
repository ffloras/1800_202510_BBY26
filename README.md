
# Paws & Homes

## Overview
Our web application called Paws & Homes aims to help pet owners who can no longer care for their pets connect with those who are looking to adopt, by providing a safe platform to effectively communicate.

Developed for the COMP1800 course, applying User-Centered Design practices, Agile methodology with by-weekly meetings, and Firebase backend services.

---

## Features
- Allows pet owners to create/edit and post personallized pet profiles.
- Allows pet owners to accept/decline contact requests from users interested in adopting.
- Allows adopters to browse through a list of available pet postings.
- Allows adopters to filter pet posting by pet type.
- Allows users to create/edit a user profile.
- Allows users to favorite, share a pet profile and send a contact request to the owner.

---

## Technologies Used

- **Frontend**: HTML, CSS, Bootstrap, JavaScript
- **Backend**: Firebase for hosting
- **Database**: Firestore

---

## Usage

1. Go to https://team26-paws-and-homes.web.app/
2. Sign up - Enter your name, email & password, and select if you want to adopt or rehome a pet.
3. depending on previous selection:
    4. If adopt was selected, user will be redirected to fill out a form that will provide useful info for pet owners.
    5. If rehome was selected, user will be taken to the create pet profile page.

---

## Project Structure

Paws & Homes
```
Top level of project folder:
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, what users first see when they come to url
├── README.md                # contains information about our app

1800_202510_BBY26/
├── html/                               #folder for html files
|   ├── components/                     #folder for html snippets
|   |   └── navbars/footers.html
|   ├── main-pages.html
├── images/                             #folder for images
|   ├── icons.png
|   └── logo.png
├── scripts/                            #folder for js scripts
|   └── scripts.js
├── styles/                             #folder for css styles
|   └── styles.css
├── .git                                #folder for git repo


Firebase hosting files
├── .firebase
	/hosting..cache
├── 404.html
├── firebase.json

```

---

## Contributors
- **Flora** - Hi, I'm excited to get started. Lets make something fun and interesting together.
- **Joaquin Paredes** - BCIT CST Student aspiring to become a game developer in the future. Past experience in HTML, CSS, Java, C, and C++.
- **Minh** - Nice to meet you guys.
---

## Resources
- In-app icons from FontAwesome (https://fontawesome.com/icons)
- 

## Contact 
* John Smith - jsmith@my.bcit.ca 
* ...

## Limitations and Future Work
### Limitations

- Currently if a user forgets their password, there is no function to reset it.
- Email verification has not yet been implemented.
- Back button sometimes redirects to the wrong page.

### Future Work

- add Email varification upon signup.
- change the contacting feature to an in-app messaging system.