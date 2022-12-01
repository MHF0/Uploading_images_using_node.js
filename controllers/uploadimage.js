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
