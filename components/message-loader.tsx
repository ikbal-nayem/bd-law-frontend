import { motion } from "framer-motion";

export const MessageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="message agent" // Apply the new agent message class
      style={{ padding: "12px 15px" }} // Adjust padding slightly for the loader
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1], // Scale up and down
          opacity: [0.7, 1, 0.7], // Fade in and out slightly
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-3 h-3 rounded-full bg-gray-500" // Slightly larger and different color dot
      />
    </motion.div>
  );
};
