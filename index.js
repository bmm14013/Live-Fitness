const express = require('express');
const { db } = require('./dbcon.js');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '/client/build')));

//MEMBERS

app.get('/get_members', (req,res) => {
  db.query("SELECT * FROM Members", (err, result)=> {
    if(err) {
      console.log(err)
    } else {
    res.send(result)
  }});
});

app.post('/get_member_from_id', (req,res) => {
  const member_id = req.body.gmember_id;
  db.query("SELECT * FROM Members WHERE member_id=?", member_id,
  (err,result) => {
    if(err) {
      console.log(err)
    } else {
      res.send(result)
  }});
});

app.post('/get_member_from_name', (req,res) => {
  const first_name = req.body.gfirst_name;
  const last_name = req.body.glast_name;
  db.query("SELECT * FROM Members WHERE first_name=? AND last_name=?", [first_name, last_name],
  (err,result) => {
    if(err) {
      console.log(err)
    } else {
      res.send(result)
    }});
});

app.post('/add_member', (req,res) => {
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
                console.log(err)
              } else {
                res.status(201).send()
            }});
})

app.put('/edit_member', (req, res) => {
  const member_id = req.body.member_id
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const birthday = req.body.birthday;
  const phone_number = req.body.phone_number;
  const street_name = req.body.street_name;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;

  db.query("UPDATE Members \
            SET first_name=?, last_name=?, birthday=?, phone_number=?, street_name=?, city=?, state=?, zip=? \
            WHERE member_id=?", [first_name,last_name,birthday,phone_number,street_name,city,state,zip,member_id],
            (err, result) => {
              if(err) {
                console.log(err)
              } else {
                res.status(200).send()
              } 
            });
});

app.delete('/delete_member/:member_id', (req,res) => {
  const member_id = req.params.member_id;

  db.query("DELETE FROM Members WHERE member_id= ?", member_id, (err,result)=>{
    if(err) {
      console.log(err)
    } else {
      res.status(204).send()
    }
  })
})


//INSTRUCTORS

app.get('/get_instructors', (req,res) => {
  db.query("SELECT * FROM Instructors", (err, result)=> {
    if(err) {
      console.log(err)
    } else {
    res.send(result)
  }});
});

app.delete('/delete_instructor/:instructor_id', (req,res) => {
  const instructor_id = req.params.instructor_id;

  db.query("DELETE FROM Instructors WHERE instructor_id= ?", instructor_id, (err,result)=>{
    if(err) {
      console.log(err)
    } else {
      res.status(204).send()
    }
  })
})

app.post('/add_instructor', (req,res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  db.query("INSERT INTO Instructors (first_name, last_name) \
            VALUES (?,?)", [first_name,last_name],
            (err,result)=> {
              if(err) {
                console.log(err)
              } else {
                res.status(201).send()
            }});
})


// CLASSES

app.get('/get_classes', (req,res) => {
  db.query("SELECT * FROM Classes", (err, result)=> {
    if(err) {
      console.log(err)
    } else {
    res.send(result)
  }});
});

app.post('/get_class_from_id', (req,res) => {
  const class_id = req.body.gclass_id;
  db.query("SELECT * FROM Classes WHERE class_id=?", class_id,
  (err,result) => {
    if(err) {
      console.log(err)
    } else {
      res.send(result)
  }});
});

app.post('/get_class_from_name', (req,res) => {
  const class_name = req.body.gclass_name;
  db.query("SELECT * FROM Classes WHERE class_name=?", class_name,
  (err,result) => {
    if(err) {
      console.log(err)
    } else {
      res.send(result)
  }});
});

app.post('/get_class_from_location_id', (req,res) => {
  const class_location_id = req.body.gclass_location_id;
  db.query("SELECT * FROM Classes WHERE location_id=?", class_location_id,
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
              } else {
                res.status(201).send()
            }});
})


app.delete('/delete_class/:class_id', (req,res) => {
  const class_id = req.params.class_id;

  db.query("DELETE FROM Classes WHERE class_id= ?", class_id, (err,result)=>{
    if(err) {
      console.log(err)
    } else {
      res.status(204).send()
    }
  })
})



app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
});

