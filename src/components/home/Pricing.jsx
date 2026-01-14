import React from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for beginners',
      features: ['Access to free courses', 'Basic community access', 'Mobile app access'],
    },
    {
      name: 'Professional',
      price: '$29/month',
      description: 'Best for learners',
      features: ['All courses access', 'Certificate of completion', 'Priority support', 'Ad-free experience'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For organizations',
      features: ['Custom content', 'Team management', 'Advanced analytics', 'Dedicated support'],
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
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl opacity-90">Choose the plan that fits your needs</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg shadow-lg p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={`mb-4 ${plan.highlighted ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-400'}`}>
                {plan.description}
              </p>
              <div className="text-4xl font-bold mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-3">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-white text-indigo-600 hover:bg-gray-100'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Pricing;
