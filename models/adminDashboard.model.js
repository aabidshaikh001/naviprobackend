import mongoose from 'mongoose';

const adminDashboardSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    applyFor: { type: String },
    income: { type: Number },
    fatherName:{type: String},
    dateOfBirth: { type: Date },
    employmentType: { type: String },
    gender: { type: String },
    pinCode: { type: String },
    address: { type: String },
    aadharNumber: { type: String },
    panNumber: { type: String },
    selfiePhoto: { type: String, default: null },
    aadharFrontPhoto: { type: String, default: null },
    aadharBackPhoto: { type: String, default: null },
    panCardPhoto: { type: String, default: null },
    creditCard: { type: mongoose.Schema.ObjectId, ref: 'CreditCard' },
    adminUsername: { type: String, required: true, unique: true },
    adminPassword: { type: String, required: true },
  },
  { timestamps: true }
);

const AdminDashboard = mongoose.model('AdminDashboard', adminDashboardSchema);

export default AdminDashboard;
