// application set up 
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Franklin1234',
      database: 'employees'
    },
    console.log('Connected to the employees database.')
  );

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });