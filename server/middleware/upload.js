import multer from 'multer';

const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload only images.'), false);
  }
};

const documentFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('application/') || file.mimetype.startsWith('text/')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload only documents.'), false);
  }
};

export const uploadImage = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export const uploadDocument = multer({
  storage,
  fileFilter: documentFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});
