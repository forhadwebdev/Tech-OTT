import mongoose from 'mongoose';

const DramaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, // Cloudinary Image URL
  publicId: { type: String, required: true } // ডিলিট করার জন্য
});

export default mongoose.models.Drama || mongoose.model('Drama', DramaSchema);