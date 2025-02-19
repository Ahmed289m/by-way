"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function Counter({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 1000; // 2 seconds
      const stepTime = Math.abs(Math.floor(duration / end));

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}</span>;
}

function Stat() {
  const stats = [
    { number: 250, text: "Courses by our best mentors" },
    { number: 100, text: "Courses by mentors" },
    { number: 15, text: "Courses by our best mentors" },
    { number: 400, text: "Courses by our best mentors" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-bold text-gray-900">
              <Counter value={stat.number} />+
            </div>
            <div className="mt-2 text-sm text-gray-500">{stat.text}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Stat;
