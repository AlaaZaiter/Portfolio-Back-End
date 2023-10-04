require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser=require('body-parser');
const mongoose= require('mongoose');
const PORT = 5000;
const routes= require('./routes/index');
const path = require("path");
const multer = require('multer');
const fs = require('fs');
const Project = require("./models/Projects");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'CVs')); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
const upload = multer({storage: storage});

app.use(cors());
app.set("view engine","ejs");
app.get("/upload",(req,res)=>{
  res.render("upload");
});

app.post('/upload', upload.single('file'), (req, res) => {
   
    console.log('File upload request:', req.file);
    latestUploadedFile = req.file.filename;
    res.send('CV Uploaded');
  });
  


const uploadPath = path.join(__dirname, 'views', 'upload.ejs');
const uploadDir = path.join(__dirname, 'CVs');


app.get("/upload", (req, res) => {
  res.render(uploadPath);
});
app.get('/download/', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);

  res.download(filePath, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});

app.get('/download', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading files');
    }
    console.log('Files in CVs directory:', files);
    res.json({ files });
  });
});

app.get('/download/latest', (req, res) => {
    const latestFilePath = path.join(uploadDir, latestUploadedFile);
  
    if (fs.existsSync(latestFilePath)) {
      res.download(latestFilePath, 'latest_cv.pdf');
    } else {
      res.status(404).send('Latest CV not found');
    }
  });
  

app.use(bodyParser.json())
// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser:true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error',(error)=> console.error.bind(error , "Error when connceting to database"))
db.once('open' , ()=> console.log(" Connected to Database"))

app.use('/', require('./routes/index'))

app.use('/emails',routes);
app.use('/projects',routes);
  
app.get('/', (req, res)=>{
    res.send("Hello World!");
})
