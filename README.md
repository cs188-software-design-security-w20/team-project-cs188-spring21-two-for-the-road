# Team : Two-For-The-Road
## Description:
Our software is a web application catered for UCLA students and club recruiters that enables both parties to job match. 
In our application, students can find jobs that suit them based on their abilities, 
while club recruiters can find employees that match their job description. From our personal experiences, 
students do not get easy access to the job postings connected to different UCLA clubs because there is not a cohesive place to find them. This is unlike the real world, 
where finding job postings is comparatively simple with websites and applications like monster.com and LinkedIn.

## Technologies:
* ReactJs
* MongoDb (MongoClient)
* ExpressJs
* Bcryptjs
* JWT and cookies
* Nodejs

## How to run:
* To run the server: cd to server folder, and install dependencies using : npm install
  After the installation completed: you can run the server using: npm run dev

* To run the app: cd to app folder and install dependencies using: npm install
  After installation: you can run the app using : npm start
* The server runs in port: 5000, and app runs in port: 3000
  
* To avoid the browser Cross-Origins issues during developement we used: "proxy": "http://localhost:5000" on the Frontend app.
  


