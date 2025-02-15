import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Autocomplete,
  Chip,
  LinearProgress,
  IconButton,
} from "@mui/material";
import {
  PhotoCamera,
  Place,
  Report,
  CameraAlt,
  Close,
  Search,
} from "@mui/icons-material";
import LiveStatusPage from "./LiveStatusPage";
import PollPage from "./PollPage";


const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const card3DEffect = {
  whileHover: {
    rotateY: 3,
    rotateX: -2,
    scale: 1.02,
    transition: { duration: 0.3 },
  },
  whileTap: { scale: 0.98 },
};

const button3DEffect = {
  whileHover: {
    y: -2,
    scale: 1.05,
    boxShadow: "0 8px 20px -6px rgba(0,0,0,0.3)",
  },
  whileTap: { y: 1, scale: 0.98 },
};

const PollAndLiveStatus = () => {
  const [currentView, setCurrentView] = useState("poll");
  const [pollData, setPollData] = useState<
    { location: string; condition: string; image?: string }[]
  >([]);

  // const handlePollSubmit = async (location: string, condition: string, imageFile?: File) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("location", location);
  //     formData.append("condition", condition);
  //     if (imageFile) {
  //       formData.append("image", imageFile); // Append image file
  //     }
  
  //     // Send data to backend using Axios
  //     const response = await axios.post("http://localhost:5000/report", formData, {
  //       headers: { "Content-Type": "multipart/form-data" }, // Important for file upload
  //     });
  
  //     console.log("Report submitted successfully:", response.data);
  
  //     // Update state with response data
  //     setPollData([...pollData, response.data]); // Assuming the backend returns the saved report
  
  //   } catch (error) {
  //     console.error("Error submitting report:", error);
  //   }
  // };
  

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-white relative overflow-hidden">
      <motion.div
        {...floatingAnimation}
        className="absolute w-64 h-64 bg-purple-100 rounded-full -top-32 -left-32"
      />
      <motion.div
        {...floatingAnimation}
        className="absolute w-96 h-96 bg-blue-100 rounded-full -bottom-48 -right-48"
      />

      <div className="w-full max-w-3xl mx-auto p-4 relative z-10">
        <div className="flex justify-center space-x-4 mb-8">
          <motion.div {...card3DEffect}>
            <Button
              onClick={() => setCurrentView("poll")}
              variant={currentView === "poll" ? "contained" : "outlined"}
              startIcon={<Report />}
              className="rounded-xl px-8 py-4 font-bold shadow-2xl bg-white hover:bg-gray-50 text-gray-800"
              sx={{
                "&.MuiButton-contained": {
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
                  color: "white",
                },
              }}
            >
              Report Conditions
            </Button>
          </motion.div>
          <motion.div {...card3DEffect}>
            <Button
              onClick={() => setCurrentView("status")}
              variant={currentView === "status" ? "contained" : "outlined"}
              startIcon={<Place />}
              className="rounded-xl px-8 py-4 font-bold shadow-2xl bg-white hover:bg-gray-50 text-gray-800"
              sx={{
                "&.MuiButton-contained": {
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                },
              }}
            >
              Live Status
            </Button>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20, rotateX: -5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: 5 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {currentView === "poll" ? (
              <PollPage />
            ) : (
              <LiveStatusPage pollData={pollData} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};




export default PollAndLiveStatus;
