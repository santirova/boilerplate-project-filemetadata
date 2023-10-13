var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
var app = express();


const upload = multer({
  dist:"/upload"
  // storage: multer.diskStorage({
  //   destination: './uploads',
  //   filename: (req, file, cb) => {
  //     const fileName = file.originalname + Date.now() + '.png';
  //     cb(null, fileName);
  //   },
  // }),
})
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  res.send({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
      
  })
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
