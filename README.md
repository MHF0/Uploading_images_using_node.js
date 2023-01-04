
# Uploading_images_using_node.js

1.  First, create a new Node.js project by running the command "npm init -y" in the terminal. This will create a package.json file in your project, which will store information about your project and its dependencies.
    
2.  Next, install the packages that your project will need by running the command "npm install express morgan multer cors". This will install the "express" package, which is a web framework for building web applications in Node.js, as well as the "morgan" package, which is a logging middleware for Node.js, the "multer" package, which is a middleware for handling file uploads, and the "cors" package, which is a middleware for enabling CORS (Cross-Origin Resource Sharing).
    
3.  After installing the necessary packages, you will need to set up the server and middleware. Create a file called "server.js" and add the following code:

```js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); 

// App  
const app = express(); 

// Middleware 
app.use(express.json());
app.use(morgan("dev"));
app.use(cors()); 
// Routes  

// Listen  
const  PORT = 5000;
app.listen(PORT, () =>  console.log(`Server started on port ${PORT}`));
```

This code imports the necessary packages, creates an instance of an express app, and sets up some middleware for handling JSON requests, logging, and CORS. It also sets up a listener on port 5000, so that the server can start listening for incoming requests.

4.  Next, you will need to create a controller for handling the image upload. To do this, create a folder called "controllers" and inside it create a file called "uploadImages.js". Inside this file, add the following code:

```js
const uploadImage = (req, res) => {
  console.log(req.file);
};

module.exports = {
  uploadImage,
};
```

This code defines a function called "uploadImage" that logs the file that was uploaded. The function takes two arguments: "req" (the request object) and "res" (the response object). The "req" object contains information about the incoming request, including any files that were uploaded. The "res" object is used to send a response back to the client.

5.  Next, you will need to create a route for handling image uploads. To do this, create a folder called "routes" and inside it create a file called "uploadImage.js". In this file, add the following code:

```js
const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/Uploadimage");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const uploadRouter = express.Router();
q
uploadRouter.post("/", upload.single("image"), uploadImage);

module.exports = uploadRouter;
```

This code creates an instance of an express router and sets up a POST route at the "/" path. The route uses the "multer" middleware to handle the file upload, and the "uploadImage" function from the controller to handle the uploaded file.

6.  To enable your server to serve images from the "uploads" folder, you will need to update the "index.js" file by adding the following line:

```js
app.use("/images", express.static("uploads"));
```

This will allow users to access images by going to the URL "[http://localhost:5000/images/{your_image}](http://localhost:5000/images/%7Byour_image%7D)".

7.  Finally, update the "controllers/uploadimage.js" file to send a response back to the client with the URL of the uploaded image:


```js
const uploadImage = (req, res) => {
  const file = req.file;
  const imageURL = `http://localhost:5000/images/${file.filename}`;

  res.status(200).json({
    message: "Image uploaded successfully",
    imageURL: imageURL,
  });
};

module.exports = {
  uploadImage,
};
```

This code gets the uploaded file from the request object, constructs the URL of the image using the file's filename, and sends a JSON response back to the client with a message and the image URL.

8.  To start the server, run the command "npm start" in the terminal. You can then test the image upload route using a tool like Postman. Once you have successfully uploaded an image, you should be able to access it at the URL "[http://localhost:5000/images/{your_image}](http://localhost:5000/images/%7Byour_image%7D)".
