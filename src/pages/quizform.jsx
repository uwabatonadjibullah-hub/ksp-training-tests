import { toast } from 'react-toastify';

const handleSave = async () => {
  try {
    await saveQuizData();
    toast.success("🎉 Quiz saved successfully!");
  } catch (error) {
    toast.error("😢 Something went wrong. Please try again or contact support.");
  }
};