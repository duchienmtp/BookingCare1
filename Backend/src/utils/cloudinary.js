import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Convert buffer to stream
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);
    
    // Pipe the buffer stream to Cloudinary
    bufferStream.pipe(uploadStream);
  });
};

const destroy = (folder, public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(`${folder}/${public_id}`, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

export { uploadToCloudinary, destroy };
