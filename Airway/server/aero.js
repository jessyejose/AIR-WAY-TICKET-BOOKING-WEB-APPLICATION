var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var connection = require('./connection')
var mongo = require('mongodb')
var fileupload=require('express-fileupload')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(fileupload())
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));

app.post('/forminsert', (req, res) => {
	let details = {
		Flightname :req.body.flightname,
		Seat: req.body.numseats,
	}
	connection.then((db) => {
		db.collection('Flight').insertOne(details).then((result) => {
			res.json(result)
			// console.log(result)
		})
	})
})

app.get('/flight', (req, res) => {
	connection.then((db) => {
		db.collection("Flight").find({}).toArray().then((result) => {
			res.json(result)
		})
	})
})

app.post('/delete', (req, res) => {
	let delete_id = req.body.id;
	connection.then((db) => {
		db.collection('Flight').deleteOne({ _id: new mongo.ObjectId(delete_id) }).then((result) => {
			res.json(result)
		})
	})
})

app.post('/editbyid', (req, res) => {
	let find_id = req.body.id;
	connection.then((db) => {
		db.collection('Flight').findOne({ _id: new mongo.ObjectId(find_id) }).then((results) => {
			res.json(results)
		})
	})
})

app.post('/flightedit', (req, res) => {
	let infoId = req.body.id;
	let updatedDetails = {
		Flightname :req.body.flightname,
		Seat: req.body.numseats,
	};
	connection.then((db) => {
		db.collection('Flight').updateOne({ _id: new mongo.ObjectId(infoId) }, { $set: updatedDetails }).then((result) => {
			res.json(result)
		});
	});
});






app.post('/classinsert', (req, res) => {
	let details = {
		Classname :req.body.classname,
	}
	connection.then((db) => {
		db.collection('Class').insertOne(details).then((result) => {
			res.json(result)
			// console.log(result)
		})
	})
})

app.get('/class', (req, res) => {
	connection.then((db) => {
		db.collection("Class").find({}).toArray().then((result) => {
			res.json(result)
		})
	})
})

app.post('/deleteclass', (req, res) => {
	let delete_id = req.body.id;
	connection.then((db) => {
		db.collection('Class').deleteOne({ _id: new mongo.ObjectId(delete_id) }).then((result) => {
			res.json(result)
		})
	})
})

app.post('/editclassbyid', (req, res) => {
	let find_id = req.body.id;
	connection.then((db) => {
		db.collection('Class').findOne({ _id: new mongo.ObjectId(find_id) }).then((results) => {
			res.json(results)
		})
	})
})

app.post('/classedit', (req, res) => {
	let infoId = req.body.id;
	let updatedDetails = {
		Classname :req.body.classname,
	};
	connection.then((db) => {
		db.collection('Class').updateOne({ _id: new mongo.ObjectId(infoId) }, { $set: updatedDetails }).then((result) => {
			res.json(result)
		});
	});
});





app.post('/fareinsert', (req, res) => {
	let details = {
		FightName: req.body.flight,
		ClassName:req.body.class,
		Fare: req.body.fare,
	}
	connection.then((db) => {
		db.collection('Fare').insertOne(details).then((result) => {
			res.json(result)
		})
	})
})

app.get('/view', (req, res) => {
    connection.then(async (db) => {
        const result = await db.collection("Fare").aggregate([
            { '$addFields': { "flightid": { "$toObjectId": "$FightName" } } },
            {
                $lookup: {
                    from: 'Flight',
                    localField: 'flightid',
                    foreignField: '_id',
                    as: 'flightInfo'
                }
            },
            { $unwind: "$flightInfo" },
            { '$addFields': { "classid": { "$toObjectId": "$ClassName" } } },
            {
                $lookup: {
                    from: 'Class',
                    localField: 'classid',
                    foreignField: '_id',
                    as: 'classInfo'
                }
            },
            { $unwind: "$classInfo" }
        ]).toArray();

        // console.log(result);  

        res.json(result);
    })
});



app.post('/deletefare', (req, res) => {
	let delete_id = req.body.id;
	connection.then((db) => {
		db.collection('Fare').deleteOne({ _id: new mongo.ObjectId(delete_id) }).then((result) => {
			res.json(result)
		})
	})
})



app.post('/editfarebyid',(req,res)=>{
	let dind_id = req.body.id
	connection.then((db)=>{
		db.collection('Fare').findOne({_id:new mongo.ObjectId(dind_id)}).then((details)=>{
			res.json(details)
			// console.log(details);  			
		})
	})
})

app.post('/fareedit', (req, res) => {
	let infoId = req.body.id;
	let updatedDetails = {
		FightName: req.body.flight,
		ClassName:req.body.class,
		Fare: req.body.fare,
	};
	connection.then((db) => {
	  db.collection('Fare').updateOne({ _id: new mongo.ObjectId(infoId) }, { $set: updatedDetails }).then((result) => {
		res.json("updates")    // 		res.json(result)
	  });
	});
});




app.post('/packageinsert', (req, res) => {
	let details = {
		PackageName: req.body.package,
	}
	connection.then((db) => {
		db.collection('Package').insertOne(details).then((result) => {
			res.json(result)
		})
	})
})

app.get('/package', (req, res) => {
	connection.then((db) => {
		db.collection("Package").find({}).toArray().then((result) => {
			res.json(result)
		})
	})
})

app.post('/selectpackageinsert', (req, res) => {
    const details = {
        SelectedPackage: req.body.selectpackage,
        Specialization: req.body.specialization,
        Price: req.body.price,
        Image: req.files.image.name,
    };

    const fileupload = req.files.image;
    fileupload.mv("./public/" + details.Image, () => {
        connection.then((db) => {
            db.collection('PackNew').insertOne(details).then((result) => {
                res.json(result);
            });
        });
    })
});

app.get('/viewpackage', (req, res) => {
    connection.then(async (db) => {
        const results = await db.collection("PackNew").aggregate([
            { '$addFields': { "packageId": { "$toObjectId": "$SelectedPackage" } } },
            {
                $lookup: {
                    from: 'Package',
                    localField: 'packageId',
                    foreignField: '_id',
                    as: 'packageInfo'
                }
            },
            { $unwind: "$packageInfo" },
        ]).toArray();
        // console.log(results);
        res.json(results);
    })
});

app.post('/packagedelete', (req, res) => {
	let delete_id = req.body.id;
	connection.then((db) => {
		db.collection('PackNew').deleteOne({ _id: new mongo.ObjectId(delete_id) }).then((result) => {
			res.json(result)
		})
	})
})

app.post('/editpackagebyid', (req, res) => {
	let find_id = req.body.id;
	connection.then((db) => {
		db.collection('PackNew').findOne({ _id: new mongo.ObjectId(find_id) }).then((results) => {
			res.json(results)
		})
	})
})

app.post('/packageedit', (req, res) => {
	let infoId = req.body.id;
	const details = {
        SelectedPackage: req.body.selectpackage,
        Specialization: req.body.specialization,
        Price: req.body.price,
        Image: req.files.image.name,
    };
	let info='';
    if(req.files?.image){
        info={
			SelectedPackage:details.SelectedPackage,
			Specialization:details.Specialization,
			Price:details.Price,
			Image:details.Image
        }
        let fileupload=req.files.image
        fileupload.mv("./public/" +details.Image)
    }
    else{
        info={
            SelectedPackage:details.SelectedPackage,
			Specialization:details.Specialization,
			Price:details.Price,
		}
	}
	connection.then((db) => {
	  db.collection('PackNew').updateOne({ _id: new mongo.ObjectId(infoId) }, { $set: info }).then((result) => {
		res.json("updates")    // 		res.json(result)
	  });
	});
});

app.post('/scheduleinsert', (req, res) => {
	let details = {
		Flightname :req.body.flight,
		Arrivaldate:req.body.adate,
		Arrivaltime:req.body.atime,
		Departuredate:req.body.ddate,
		Departuretime:req.body.dtime,
		Returndate:req.body.rdate,
		Source:req.body.source,
		Destination:req.body.destination,
		Kilometer:req.body.kilometer,
		LoyalityPoint:req.body.point
	}
	connection.then((db) => {
		db.collection('Schedule').insertOne(details).then((result) => {
			res.json(result)
			// console.log(result)
		})
	})
})


app.get('/viewschedule', (req, res) => {
    connection.then(async (db) => {
        const result = await db.collection("Schedule").aggregate([
            { '$addFields': { "flightid": { "$toObjectId": "$Flightname" } } },
            {
                $lookup: {
                    from: 'Flight',
                    localField: 'flightid',
                    foreignField: '_id',
                    as: 'flightInfo'
                }
            },
            { $unwind: "$flightInfo" },
        ]).toArray();
        // console.log(result);  
        res.json(result);
    })
});

app.post('/deleteschedule', (req, res) => {
	let delete_id = req.body.id;
	connection.then((db) => {
		db.collection('Schedule').deleteOne({ _id: new mongo.ObjectId(delete_id) }).then((result) => {
			res.json(result)
		})
	})
})

app.post('/editschedulebyid',(req,res)=>{
	let dind_id = req.body.id
	connection.then((db)=>{
		db.collection('Schedule').findOne({_id:new mongo.ObjectId(dind_id)}).then((details)=>{
			res.json(details)
			// console.log(details);  			
		})
	})
})

app.post('/scheduleedit', (req, res) => {
	let infoId = req.body.id;
	let updatedDetails = {
		Flightname :req.body.flight,
		Arrivaldate:req.body.adate,
		Arrivaltime:req.body.atime,
		Departuredate:req.body.ddate,
		Departuretime:req.body.dtime,
		Returndate:req.body.rdate,
		Source:req.body.source,
		Destination:req.body.destination,
		Kilometer:req.body.kilometer,
		LoyalityPoint:req.body.point
	};
	connection.then((db) => {
	  db.collection('Schedule').updateOne({ _id: new mongo.ObjectId(infoId) }, { $set: updatedDetails }).then((result) => {
		res.json("updates")    // 		res.json(result)
	  });
	});
});


app.get('/scheduleview', (req, res) => {
	connection.then((db) => {
		db.collection("Schedule").find({}).toArray().then((result) => {
			res.json(result);
			// console.log(result)
		})
	})
})

app.post('/feedbackinsert', (req, res) => {
	let details = {
		Feedback: req.body.feedback,
		Date:req.body.date
	}
	connection.then((db) => {
		db.collection('Feedback').insertOne(details).then((result) => {
			res.json(result)
		})
	})
})

app.get('/booking', (req, res) => {
	connection.then((db) => {
		db.collection("Feedback").find({}).toArray().then((result) => {
			res.json(result);
			// console.log(result)
		})
	})
})

app.post('/deletefeedback', (req, res) => {
	let delete_id = req.body.id;
	connection.then((db) => {
		db.collection('Feedback').deleteOne({ _id: new mongo.ObjectId(delete_id) }).then((result) => {
			res.json(result)
		})
	})
})

app.post('/editfeedbackbyid',(req,res)=>{
	let dind_id = req.body.id
	connection.then((db)=>{
		db.collection('Feedback').findOne({_id:new mongo.ObjectId(dind_id)}).then((details)=>{
			res.json(details)
			// console.log(details);  			
		})
	})
})

app.post('/feedbackedit', (req, res) => {
	let infoId = req.body.id;
	let updatedDetails = {
		Feedback: req.body.feedback,
		Date:req.body.date
	};
	connection.then((db) => {
		db.collection('Feedback').updateOne({ _id: new mongo.ObjectId(infoId) }, { $set: updatedDetails }).then((result) => {
			res.json(result)
		});
	});
});

app.get('/food', (req, res) => {
	connection.then((db) => {
		db.collection("PackNew").find({}).toArray().then((result) => {
			res.json(result)
		})
	})
})

app.post('/passenger', (req, res) => {
	const details = {
	  Number: req.body.number,
	  Passengers: req.body.passengers,
	};
  
	connection.then((db) => {
	  db.collection('Passenger').insertOne(details).then((result) => {
		res.json(result);
	  });
	});
});

app.post('/updateSeats', (req, res) => {
	const { flightName, updatedSeats } = req.body;
  
	connection.then((db) => {
	  db.collection('Flight').updateOne(
		{ Flightname: flightName },
		{ $set: { Seat: updatedSeats.toString() } }
	  ).then(() => {
		res.json({ message: 'Seats updated successfully' });
	  }).catch((error) => {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	  });
	});
  });


  
// app.post('/passenger', (req, res) => {
// 	const { number, passengers } = req.body;
  
// 	// Calculate the total seats needed based on the number of passengers
// 	const updatedAvailableSeats = isNaN(availableSeats) ? 0 : availableSeats - totalSeatsNeeded;
// db.collection('Flight').updateOne(
//   { Flightname: passengers[0].flightName },
//   { $set: { Seat: updatedAvailableSeats.toString() } }
// ).then(() => {
//   // Update the availableSeat state in the frontend
//   setAvailableSeat(updatedAvailableSeats.toString());

//   // Proceed with inserting passenger details into the database
//   // ... (your existing code to insert passenger details)

//   res.status(200).json({ message: 'Passenger details submitted successfully' });
// }).catch((error) => {
//   console.error(error);
//   res.status(500).json({ error: 'Internal server error' });
// });
//   });

// app.post('/passenger', (req, res) => {
// 	const { number, passengers, availableSeats } = req.body;
  
// 	// Calculate the total seats needed based on the number of passengers
// 	const totalSeatsNeeded = passengers.length;
  
// 	// Assuming availableSeats is a state or variable that holds the current available seats
// 	const updatedAvailableSeats = isNaN(availableSeats) ? 0 : availableSeats - totalSeatsNeeded;
  
// 	// Update the available seats in the Flight collection
// 	connection.then((db) => {
// 	//   const db = client.db('your-database-name'); // Replace 'your-database-name' with your actual database name
  
// 	  db.collection('Flight').updateOne(
// 		{ Flightname: passengers[0].flightName },
// 		{ $set: { Seat: updatedAvailableSeats.toString() } }
// 	  ).then(() => {
// 		// Proceed with inserting passenger details into the database
// 		const details = {
// 		  Number: number,
// 		  Passengers: passengers,
// 		};
  
// 		// Insert passenger details into the Passenger collection
// 		return db.collection('Passenger').insertOne(details);
// 	  }).then((result) => {
// 		// Update the availableSeat state in the frontend
// 		setAvailableSeat(updatedAvailableSeats.toString());
  
// 		res.status(200).json({ message: 'Passenger details submitted successfully' });
// 	  }).catch((error) => {
// 		console.error(error);
// 		res.status(500).json({ error: 'Internal server error' });
// 	  });
// 	});
//   });
  
  
  



app.listen(4000)