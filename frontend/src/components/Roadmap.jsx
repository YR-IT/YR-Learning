import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

const Roadmap = ({ roadmap }) => {
  if (!roadmap) {
    return null;
  }

  return (
    <section id="roadmap" className="scroll-mt-20">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Target className="w-8 h-8 text-purple-600" />
          Course Roadmap
        </h2>
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{roadmap}</p>
      </div>
    </section>
  );
};

export default Roadmap;
