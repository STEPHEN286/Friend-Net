import { Cloudinary } from '@cloudinary/url-gen';

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
  }
});

export default cloudinary; 