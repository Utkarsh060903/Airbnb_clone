const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const path = require('path');
const app = express();
const fs = require('fs')
const Place = require('./models/Place.js')
const Booking = require('./models/Booking.js')

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sjdhfkjs4hrkjh4kjhkjwej';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'  
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb+srv://new-user-2:heyy@cluster0.mkoomc9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        console.error('Error during registration:', e);
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);
            if (passOk) {
                jwt.sign({ email: userDoc.email, id: userDoc._id, name: userDoc.name }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userDoc);
                });
            } else {
                res.status(422).json('Invalid password');
            }
        } else {
            res.status(404).json('User not found');
        }
    } catch (e) {
        console.error('Error during login:', e);
        res.status(500).json('Internal server error');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    console.log('Received link:', link);
    if (!link) {
        return res.status(400).json({ error: 'The link is required' });
    }
    const newName = Date.now() + '.jpg';
    try {
        await imageDownloader.image({
            url: link,
            dest: path.join(__dirname, 'uploads', newName)
        });
        res.json(newName);
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ error: 'Failed to download image' });
    }
});

const photosMiddleware = multer({ dest: 'uploads/' });

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path: tempPath, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = tempPath + '.' + ext;
        fs.renameSync(tempPath, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
});

app.post('/places', (req,res) => {
    
    const {token} = req.cookies;
    const {
      title,address,addPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owner:userData.id,
        title,address,photos:addPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,price,
      });
      res.json(placeDoc);
    });
  });

app.get('/user-places' , (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData
        res.json(await Place.find({owner:id}))
    })
})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Received ID:", id);
    try {
        const place = await Place.findById(id);
        if (!place) {
            console.log("Place not found for ID:", id);
            return res.status(404).json({ message: "Place not found" });
        }
        res.json(place);
    } catch (error) {
        console.error("Error fetching place data:", error);
        res.status(500).json({ message: "Server error" });
    }
});


app.put('/places', async (req,res) => {
    const {token} = req.cookies;
    const {
      id, title,address,addPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);
      if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title,address,photos:addPhotos,description,
          perks,extraInfo,checkIn,checkOut,maxGuests,price,
        });
        await placeDoc.save();
        res.json('ok');
      }
    });
  });

  app.get('/places' , async (req,res)=>{
    res.json(await Place.find())
  } )

  app.post('/bookings' , (req,res)=>{
    const {place,checkIn,checkOut,numberOfGuests,phone,price,name} = req.body
    Booking.create({
        place,checkIn,checkOut,numberOfGuests,phone,price,name
    }).then((doc)=>{
        res.json(doc)
    }).catch((err)=>{
        throw err
    })
  })
  
// app.post('/bookings', async (req, res) => {
//     try {
//         const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;
//         const booking = new Booking({
//             place, checkIn, checkOut, numberOfGuests, name, phone, price
//         });
//         const savedBooking = await booking.save();
//         res.status(201).json(savedBooking);
//     } catch (err) {
//         res.status(500).json({ error: 'Booking creation failed', details: err });
//     }
// });

app.listen(4000, () => {
    console.log('Server running on port 4000');
});
