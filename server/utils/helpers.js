import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

/**
 * Generate JWT token
 * @param {String} id 
 * @param {String} role 
 * @returns {String} token
 */
export const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

/**
 * Send Email
 * @param {Object} options { email, subject, message }
 */
export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message
  };

  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
};

/**
 * Upload to Cloudinary
 * @param {Buffer} fileBuffer 
 * @param {String} folder 
 * @returns {Promise<Object>} { url, public_id }
 */
export const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) {
          resolve({ url: result.secure_url, public_id: result.public_id });
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

/**
 * Delete from Cloudinary
 * @param {String} publicId 
 * @returns {Promise<Object>}
 */
export const deleteFromCloudinary = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

export class ApiResponse {
  static success(res, statusCode = 200, message = 'Success', data = null) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static error(res, statusCode = 500, message = 'Server Error') {
    return res.status(statusCode).json({
      success: false,
      message
    });
  }
}
