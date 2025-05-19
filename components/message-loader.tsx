import { motion } from 'framer-motion';

export const MessageLoader = () => {
  const dotVariants = {
    initial: { opacity: 0.6, y: 0 },
    animate: (i: number) => ({
      opacity: [0.6, 1, 0.6],
      y: [0, -5, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatDelay: 0.2 * i,
        ease: 'easeInOut'
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="message agent bg-gray-100 dark:bg-gray-800 rounded-lg p-4 max-w-[80%]"
    >
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            custom={i}
            className="w-2 h-2 rounded-full bg-blue-500"
          />
        ))}
      </div>
    </motion.div>
  );
};
