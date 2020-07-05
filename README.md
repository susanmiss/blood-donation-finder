# Blood Donation Finder
Blood Donation Finder is a project about people who want donate blood and Hospital/Clinics in need. The Hospitals can send a post to the website and the users can interage informing the hospital if they are going, send emails, and in their own dashboard can see last and next time to donate.
MERN Technology has been used in this app.
## Quick Look

![BloodDonationFinder cover](./frontend/public/blood-cover.png)

## Technologies
- MongoDB
- Express
- React
- Node.js
- Bootstrap
- Nodemailer

## How to Use
There are 2 folders inside this repo. Clone the repo.
Create .env files to frontend and backend folders and paste as follow:
```
- - -  Information to paste in .env files - - -
- Backend, use:

PORT = 8000

DATABASE = mongodb+srv://susan:D8xAOvv9yrUyVDN0@blood-fgfbu.mongodb.net/test?retryWrites=true&w=majority

JWT_SECRET=SLKFSLIFJGH9457309530SNLSNVLSKDNVLS

CLIENT_URL=http://localhost:3000


- Frontend use:
REACT_APP_API_URL=http://localhost:8000/api
```

After run npm install to ech folder and then npm start to each folder. To run the tests, go inside frontend folder and npm run test
```
  npm install
  npm start
  npm run test
```  

You can signup as hospital, in order to create, delete and update a post requesting blood

You can signup as user to see the posts and check where you can donate.

To signIn as user, use as follow:

email: user@admin.com  
password: 12345

To signIn as hospital, use as follow:

email: hospital@admin.com  
password: 12345678

## Contributing

Pull requests and suggestions are welcome.
