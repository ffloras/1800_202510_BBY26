
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

    ├── components/                     #folder for html snippets

        ├── adoptFooter.html            #footer for pages related to adoption
        ├── rehomeFooter.html           #footer for pages related to rehoming
        ├── adoptNavBar.html            #navbar for pages related to adoption
        ├── rehomeNavBar.html           #navbar for pages related to rehoming
        ├── loginNavBar.html            #navbar for when user is not logged in
        ├── adoptInfo.html              #adoption info for faq.html
        ├── rehomeInfo.html             #rehome info for faq.html

    ├── aboutUs.html                    #html page about our team and project
    ├── adoptBrowse.html                #html page for browsing pet postings
    ├── adoptContacts.html              #html page for adopter's contact list
    ├── adoptPetDetails.html            #html page for pet posting details 
    ├── adoptProfileDetails.html        #html page for profile of contacts
    ├── adoptUserProfile.html           #html page for user's profile
    ├── rehomeMain.html                 #html page for pet owners to view/add pet profiles
    ├── rehomeContacts.html             #html page for pet owner's contact list
    ├── rehomeDetails.html              #html page for pet owners to view their pet profile details 
    ├── faqs.html                       #html page for profile of contacts
    ├── favorites.html                  #html page for user's profile
    ├── petForm.html                    #html form to add pet profile
    ├── userForm.html                   #html form to add user profile info
    ├── login.html                      #html page to login
    ├── signup.html                     #html page to signup

├── images/                             #folder for images

|   ├── emailicon.png                   #icon for pet posting buttons
    ├── fContact.png                    #icon for pet posting buttons
    ├── fContactAlert.png               #icon for pet posting buttons
    ├── heartFilledIcon.png             #icon for pet posting buttons
    ├── heartUnfilledIcon.png           #icon for pet posting buttons
    ├── shareIcon.png                   #icon for pet posting buttons
    ├── member1.png                     #image for About Us page
    ├── member2.png                     #image for About Us page
    ├── member3.png                     #image for About Us page
    ├── PAHlogo.png                     #image for navbar
|   └── logo.png                        #our logo

├── scripts/                            #folder for js scripts

    ├── adoptBrowse.js                  #js for adoptBrowse.html
    ├── adoptContacts.js                #js for adoptContacts.html
    ├── adoptPetDetails.js              #js for adoptPetDetails.html
    ├── adoptProfileDetails.js          #js for adoptProfileDetails.html
    ├── adoptUserProfile.js             #js for adoptUserProfile.html
    ├── rehomeMain.js                   #js for rehomeMain.html
    ├── rehomeContacts.js               #js for rehomeContacts.html
    ├── rehomeDetails.js                #js for rehomeDetails.html
    ├── faqs.js                         #js for faqs.html
    ├── favorites.js                    #js for favorites.html
    ├── petForm.js                      #js for petForm.html
    ├── userForm.js                     #js for userForm.html
    ├── login.js                        #js for login.html and signup.html
    ├── footer.js                       #js for adoptFooter.html and rehomeFooter.html
    ├── script.js                       #js for index.html
    ├── skeleton.js                     #js for all pages, to load navbar/footers
    ├── firebaseAPI_team26.js           #js for all pages, containing firebase API info

├── styles/                             #folder for css styles

    ├── adoptStyle .css                 #css for adoptBrowse.html and favorites.html
    ├── adoptContacts.css               #css for adoptContacts.html
    ├── adoptPetDetails.css             #css for adoptPetDetails.html
    ├── adoptProfileDetails.css         #css for adoptProfileDetails.html
    ├── adoptUserProfile.css            #css for adoptUserProfile.html
    ├── rehomeMain.css                  #css for rehomeMain.html
    ├── rehomeContacts.css              #css for rehomeContacts.html
    ├── rehomeDetails.css               #css for rehomeDetails.html
    ├── faqs.css                        #css for faqs.html
    ├── favorites.css                   #css for favorites.html
    ├── login.css                       #css for login.html and signup.html
    ├── navBarStyle.css                 #css for adoptFooter.html and rehomeFooter.html
    ├── aboutUs.css                     #css for aboutUs.html


├── .git                                #folder for git repo


Firebase hosting files: 
├── .firebase
	/hosting..cache
├── .firebaserc
├── 404.html
├── firebase.json
├── firestore.indexes.json
├── firestore.rules

```

---

## Contributors
- **Flora** - I'm very proud of the project we made. Everyone did an amazing job!
- **Joaquin Paredes** - BCIT CST Student aspiring to become a game developer in the future. Past experience in HTML, CSS, Java, C, and C++.
- **Minh** - Nice to meet you guys. Thanks for making the great application together hehe. I appreciate it >~< 
---

## Resources
- In-app icons from:
    - FontAwesome (https://fontawesome.com/icons)
    - Icons8 (https://icons8.com/icons)
- Paws & Homes Logo from:
    - AI generated (ChatGPT)
- FAQs information from:
    - Rescue Dogs 101 (https://www.rescuedogs101.com/things-to-know-before-adopting-dog/)
    - City of Vancouver - Dog Licences and Tags (https://vancouver.ca/home-property-development/licensing-your-dog.aspx)
    - BC SPCA (https://spca.bc.ca/faqs/can-rehome-animal/)


## Contact 
* Flora Su - fsu8@my.bcit.ca
* Minh Phan - hphan17@my.bcit.ca
* Joaquin Paredes - jparedes8@my.bcit.ca

## Limitations and Future Work
### Limitations

- Currently if a user forgets their password, there is no function to reset it.
- Email verification has not yet been implemented.
- Back button sometimes redirects to the wrong page.

### Future Work

- add Email varification upon signup.
- change the contacting feature to an in-app messaging system.
