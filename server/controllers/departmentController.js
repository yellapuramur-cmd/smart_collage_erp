import Department from '../models/Department.js';
import { ApiResponse } from '../utils/helpers.js';

export const getAllDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find().populate('hod');
    ApiResponse.success(res, 200, 'Departments fetched', departments);
  } catch (error) {
    next(error);
  }
};

export const getDepartment = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id).populate('hod');
    if (!department) return ApiResponse.error(res, 404, 'Department not found');
    ApiResponse.success(res, 200, 'Department fetched', department);
  } catch (error) {
    next(error);
  }
};

export const createDepartment = async (req, res, next) => {
  try {
    const department = await Department.create(req.body);
    ApiResponse.success(res, 201, 'Department created', department);
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!department) return ApiResponse.error(res, 404, 'Department not found');
    ApiResponse.success(res, 200, 'Department updated', department);
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return ApiResponse.error(res, 404, 'Department not found');
    ApiResponse.success(res, 200, 'Department deleted');
  } catch (error) {
    next(error);
  }
};
