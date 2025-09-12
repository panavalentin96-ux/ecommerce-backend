import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Verifică dacă modelul există deja (Vercel redeploy poate cauza erori fără asta)
export default mongoose.models.User || mongoose.model('User', userSchema);
