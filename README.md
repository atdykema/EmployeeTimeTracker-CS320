# EmployeeTimeTracker-CS320



Before running this app:
1. Install Nodejs on your machine. That should include npm
2. Clone this directory (Github Desktop is useful)
3. Go to /server, run npm install. Repeat for /client.
4. In /server, make a new file called: process.env and write this in the file:
DB=mongodb+srv://<username>:<password>@cluster0.n2dksom.mongodb.net/PunchTimeData

For example (use mine if needed):
DB=mongodb+srv://ntnguye0:1234@cluster0.n2dksom.mongodb.net/PunchTimeData
  
Also, make sure in /server/index.js, you have this line on top: 
  dotenv.config({path: 'process.env'});

To run this app:
1. Open CLI and go to /server dir.
2. Run command: node index.js
3. Open a separate CLI and go to /client dir.
4. Run command: npm start
