import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

/**
 * Generate JWT token with safe fallbacks for Vercel Serverless
 * @param {String} id 
 * @param {String} role 
 * @returns {String} token
 */
export const generateToken = (id, role) => {
  const secret = process.env.JWT_SECRET || 'college-erp-jwt-super-secret-key-2026';
  const expire = process.env.JWT_EXPIRE || '7d';
  
  return jwt.sign({ id, role }, secret, {
    expiresIn: expire
  });
};

/**
 * Send Email
 * @param {Object} options { email, subject, message }
 */
export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const message = {
    from: `${process.env.FROM_NAME || 'Smart College ERP'} <${process.env.FROM_EMAIL || 'noreply@erp.com'}>`,
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
