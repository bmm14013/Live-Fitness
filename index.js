const express = require('express');
const { db } = require('./dbcon.js');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '/client/build')));

//MEMBERS

app.get('/get_members', (req,res) => {
  db.query("SELECT member_id, first_name, last_name, DATE_FORMAT(birthday, '%b %d %Y'), phone_number, street_name, city, \
            state, zip FROM Members", (err, result)=> {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
  }});
});

app.post('/get_member_from_id', (req,res) => {
  const member_id = req.body.gmember_id;
  db.query("SELECT member_id, first_name, last_name, DATE_FORMAT(birthday, '%b %d %Y'), phone_number, street_name, city, \
  state, zip FROM Members WHERE member_id=?", member_id,
  (err,result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
  }});
});

app.post('/get_member_from_name', (req,res) => {
  const first_name = req.body.gfirst_name;
  const last_name = req.body.glast_name;
  db.query("SELECT member_id, first_name, last_name, DATE_FORMAT(birthday, '%b %d %Y'), phone_number, street_name, city, \
  state, zip FROM Members WHERE first_name LIKE CONCAT('%',?,'%') AND last_name LIKE CONCAT('%',?,'%')", [first_name, last_name],
  (err,result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }});
});

app.post('/add_member', (req,res) => {
  for (const prop in req.body) {
    if(req.body[prop] === '') {
      req.body[prop] = 'NULL';
    };
  };

  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const birthday = req.body.birthday;
  const phone_number = req.body.phone_number;
  const street_name = req.body.street_name;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;

  db.query("INSERT INTO Members (first_name, last_name, birthday, phone_number, street_name, city, state, zip) \
            VALUES (?,?,?,?,?,?,?,?)", [first_name,last_name,birthday,phone_number,street_name,city,state,zip],
            (err,result)=> {
              if(err) {
                console.log(err);
                res.status(400).send();
              } else {
                res.status(201).send();
            }});
});

app.delete('/delete_member/:member_id', (req,res) => {
  const member_id = req.params.member_id;

  db.query("DELETE FROM Members WHERE member_id= ?", member_id, (err,result)=>{
    if(err) {
      console.log(err);
    } else {
      res.status(204).send();
    }
  })
});


//INSTRUCTORS

app.get('/get_instructors', (req,res) => {
  db.query("SELECT * FROM Instructors", (err, result)=> {
    if(err) {
      console.log(err);
    } else {
    res.send(result);
  }});
});

app.delete('/delete_instructor/:instructor_id', (req,res) => {
  const instructor_id = req.params.instructor_id;

  db.query("DELETE FROM Instructors WHERE instructor_id= ?", instructor_id, (err,result)=>{
    if(err) {
      console.log(err);
    } else {
      res.status(204).send();
    }
  });
});

app.post('/add_instructor', (req,res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const location_id = req.body.instructor_location_id;

  db.query("INSERT INTO Instructors (first_name, last_name, location_id) \
            VALUES (?,?,?)", [first_name,last_name,location_id],
            (err,result)=> {
              if(err) {
                res.status(400).send();
                console.log(err);
              } else {
                res.status(201).send();
            }});
});

app.get('/get_instructor_ids', (req,res) => {
  db.query("SELECT instructor_id FROM Instructors", (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }});
});


// CLASSES

app.get('/get_classes', (req,res) => {
  db.query("SELECT Classes.class_id, Classes.class_name, Instructors.location_id, DATE_FORMAT(Classes.start_date, '%b %d %Y'), TIME_FORMAT(Classes.start_time, '%h:%i %p'), \
            Classes.instructor_id, Instructors.location_id, Classes.class_desc FROM Classes INNER JOIN Instructors on Classes.instructor_id = Instructors.instructor_id", 
  (err, result)=> {
    if(err) {
      console.log(err)
    } else {
    res.send(result)
  }});
});

app.post('/get_class_from_id', (req,res) => {
  const class_id = req.body.gclass_id;
  db.query("SELECT Classes.class_id, Classes.class_name, Instructors.location_id, DATE_FORMAT(Classes.start_date, '%b %d %Y'), TIME_FORMAT(Classes.start_time, '%h:%i %p'), \
            Classes.instructor_id, Instructors.location_id, Classes.class_desc FROM Classes INNER JOIN Instructors on Classes.instructor_id = Instructors.instructor_id \
            WHERE class_id=?", class_id,
  (err,result) => {
    if(err) {
      console.log(err)
    } else {
      res.send(result)
  }});
});

app.post('/get_class_from_name', (req,res) => {
  const class_name = req.body.gclass_name;
  db.query("SELECT Classes.class_id, Classes.class_name, Instructors.location_id, DATE_FORMAT(Classes.start_date, '%b %d %Y'), TIME_FORMAT(Classes.start_time, '%h:%i %p'), \
            Classes.instructor_id, Instructors.location_id, Classes.class_desc FROM Classes INNER JOIN Instructors on Classes.instructor_id = Instructors.instructor_id \
            WHERE class_name LIKE CONCAT('%',?,'%')", class_name,
  (err,result) => {
    if(err) {
      console.log(err)
    } else {
      res.send(result)
  }});
});

app.post('/get_class_from_location_id', (req,res) => {
  const class_location_id = req.body.gclass_location_id;
  db.query("SELECT Classes.class_id, Classes.class_name, Instructors.location_id, DATE_FORMAT(Classes.start_date, '%b %d %Y'), TIME_FORMAT(Classes.start_time, '%h:%i %p'), \
            Classes.instructor_id, Instructors.location_id, Classes.class_desc FROM Classes INNER JOIN Instructors on Classes.instructor_id = Instructors.instructor_id \
            WHERE location_id=?", class_location_id,
  (err,result) => {
    if(err) {
      console.log(err)
    } else {
      res.send(result)
  }});
});

app.post('/add_class', (req,res) => {
  const class_name = req.body.class_name;
  const start_date = req.body.start_date;
  const start_time = req.body.start_time;
  const instructor_id = req.body.class_instructor_id;
  const location_id = req.body.class_location_id;
  const class_desc = req.body.class_desc;

  db.query("INSERT INTO Classes (class_name, start_date, start_time, instructor_id, location_id, class_desc) \
            VALUES (?,?,?,?,?,?)", [class_name,start_date,start_time,instructor_id,location_id,class_desc],
            (err,result)=> {
              if(err) {
                console.log(err)
                res.status(400).send()
              } else {
                res.status(201).send()
            }});
});

app.put('/edit-class/:class_id', (req, res) => {
  const class_id = req.params.class_id
  const class_name = req.body.class_name;
  const start_date = req.body.start_date;
  const start_time = req.body.start_time;
  const instructor_id = req.body.class_instructor_id;
  const class_desc = req.body.class_desc;

  db.query("UPDATE Classes \
            SET class_name=?, start_date=?, start_time=?, instructor_id=?, class_desc=? \
            WHERE class_id=?", [class_name,start_date,start_time,instructor_id,class_desc,class_id],
            (err, result) => {
              if(err) {
                res.status(400).send()
              } else {
                res.status(200).send()
              } 
            });
});


app.delete('/delete_class/:class_id', (req,res) => {
  const class_id = req.params.class_id;

  db.query("DELETE FROM Classes WHERE class_id= ?", class_id, (err,result)=>{
    if(err) {
      console.log(err);
    } else {
      res.status(204).send();
    }
  });
});

//Location

app.get('/get_locations', (req,res) => {
  db.query("SELECT * FROM Locations", (err, result)=> {
    if(err) {
      console.log(err)
    } else {
    res.send(result)
  }});
});

app.post('/add_location', (req,res) => {
  const location_name = req.body.location_name;
  const phone_number = req.body.phone_number;
  const street_name = req.body.street_name;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;

  db.query("INSERT INTO Locations (location_name, phone_number, street_name, city, state, zip) \
            VALUES (?,?,?,?,?,?)", [location_name,phone_number,street_name,city,state,zip],
            (err,result)=> {
              if(err) {
                res.status(400).send()
                console.log(err)
              } else {
                res.status(201).send()
            }});
});

app.delete('/delete_location/:location_id', (req,res) => {
  const location_id = req.params.location_id;

  db.query("DELETE FROM Locations WHERE location_id= ?", location_id, (err,result)=>{
    if(err) {
      console.log(err);
    } else {
      res.status(204).send();
    }
  });
});

app.get('/get_location_ids', (req,res) => {
  db.query("SELECT location_id FROM Locations", (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }});
});


// Registration

app.post('/add_members_classes', (req,res) => {
  const member_id = req.body.member_id;
  const class_id = req.body.class_id;

  db.query("INSERT INTO Members_Classes (member_id, class_id) \
            VALUES (?,?)", [member_id,class_id],
            (err,result)=> {
              if(err) {
                res.status(400).send();
                console.log(err);
              } else {
                res.status(201).send();
            }});
});

app.get('/get_members_classes', (req,res) => {
  db.query("SELECT Members_Classes.member_class_id, Members_Classes.member_id, Members_Classes.class_id, \
  Members.first_name, Members.last_name, Classes.class_name, DATE_FORMAT(Classes.start_date, '%b %d %Y'), TIME_FORMAT(Classes.start_time, '%h:%i %p'), \
  Instructors.location_id, Classes.instructor_id \
  FROM Members_Classes \
  INNER JOIN Members ON Members_Classes.member_id = Members.member_id \
  INNER JOIN (Classes INNER JOIN Instructors ON Classes.instructor_id = Instructors.instructor_id) ON Members_Classes.class_id = Classes.class_id", 
  (err, result)=> {
    if(err) {
      console.log(err);
    } else {
    res.send(result);
  }});
});

app.get('/get_member_ids', (req,res) => {
  db.query("SELECT member_id FROM Members", (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }});
});

app.get('/get_class_ids', (req,res) => {
  db.query("SELECT class_id FROM Classes", (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }});
});


app.delete('/delete_members_classes/:member_class_id', (req,res) => {
  const member_class_id = req.params.member_class_id;

  db.query("DELETE FROM Members_Classes WHERE member_class_id= ?", member_class_id, (err,result)=>{
    if(err) {
      console.log(err);
    } else {
      res.status(204).send();
    }
  });
});


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

