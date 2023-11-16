import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    department: String,
});
  
export default mongoose.model('Employee', employeeSchema);