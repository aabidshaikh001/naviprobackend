import mongoose from 'mongoose';

const qrSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const QRCode = mongoose.model('QRCode', qrSchema);

export default QRCode;
