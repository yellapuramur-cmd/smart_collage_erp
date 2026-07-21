import Fee from '../models/Fee.js';
import Payment from '../models/Payment.js';
import Student from '../models/Student.js';
import { ApiResponse } from '../utils/helpers.js';

export const createFee = async (req, res, next) => {
  try {
    const fee = await Fee.create(req.body);
    ApiResponse.success(res, 201, 'Fee structure created', fee);
  } catch (error) {
    next(error);
  }
};

export const getAllFees = async (req, res, next) => {
  try {
    const fees = await Fee.find(req.query).populate('student');
    ApiResponse.success(res, 200, 'Fees fetched', fees);
  } catch (error) {
    next(error);
  }
};

export const getFee = async (req, res, next) => {
  try {
    const fee = await Fee.findById(req.params.id).populate('student');
    if (!fee) return ApiResponse.error(res, 404, 'Fee not found');
    ApiResponse.success(res, 200, 'Fee fetched', fee);
  } catch (error) {
    next(error);
  }
};

export const updateFee = async (req, res, next) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    ApiResponse.success(res, 200, 'Fee updated', fee);
  } catch (error) {
    next(error);
  }
};

export const recordPayment = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const fee = await Fee.findById(req.params.feeId);
    
    if (!fee) return ApiResponse.error(res, 404, 'Fee not found');

    const payment = await Payment.create({
      ...req.body,
      fee: fee._id,
      student: fee.student
    });

    fee.paidAmount += amount;
    if (fee.paidAmount >= fee.totalAmount) {
      fee.status = 'paid';
    } else {
      fee.status = 'partial';
    }
    await fee.save();

    ApiResponse.success(res, 201, 'Payment recorded', payment);
  } catch (error) {
    next(error);
  }
};

export const getPaymentHistory = async (req, res, next) => {
  try {
    const payments = await Payment.find(req.query).populate('fee student');
    ApiResponse.success(res, 200, 'Payment history fetched', payments);
  } catch (error) {
    next(error);
  }
};

export const getMyFees = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return ApiResponse.error(res, 404, 'Student profile not found');

    const fees = await Fee.find({ student: student._id });
    ApiResponse.success(res, 200, 'Fees fetched', fees);
  } catch (error) {
    next(error);
  }
};

export const getMyPayments = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return ApiResponse.error(res, 404, 'Student profile not found');

    const payments = await Payment.find({ student: student._id }).populate('fee');
    ApiResponse.success(res, 200, 'Payments fetched', payments);
  } catch (error) {
    next(error);
  }
};
