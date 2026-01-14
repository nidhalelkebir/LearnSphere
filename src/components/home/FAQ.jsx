import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
  const [expanded, setExpanded] = useState(0);

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'Yes, we offer a 30-day money-back guarantee if you are not satisfied with a course.',
    },
    {
      question: 'How long do I have access to a course?',
      answer: 'Once enrolled, you have lifetime access to all course materials and updates.',
    },
    {
      question: 'Are certificates worth anything?',
      answer: 'Yes, our certificates are recognized by industry leaders and can be added to your resume.',
    },
    {
      question: 'Can I download the course materials?',
      answer: 'Yes, you can download all course materials for offline learning on premium plans.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl opacity-90">Find answers to common questions</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === index ? -1 : index)}
                className="w-full p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-left">{faq.question}</h3>
                <span
                  className={`text-2xl transition-transform ${
                    expanded === index ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <motion.div
                animate={{ height: expanded === index ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FAQ;
