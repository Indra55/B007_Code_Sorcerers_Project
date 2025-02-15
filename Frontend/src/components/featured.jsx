import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Personalized Customer Engagement",
      description: "By training AI on your company's specific data, we ensure that Echo understands the nuances of your products, services, and target audience. Speaking with a branded voice can lead to more personalized interactions, fostering a stronger connection between your business and customers.",
      imageUrl: "https://www.cio.com/wp-content/uploads/2023/05/SW-Blog-image-Getty-1170x600-2.jpg?quality=50&strip=all",
      imageLeft: true
    },
    {
      title: "Improved Customer Support",
      description: "Our AI chat solution enables businesses to provide round-the-clock customer support. Echo can handle repetitive queries, give instant responses, and escalate complex issues to human agents when necessary, ensuring efficient and reliable customer service.",
      imageUrl: "https://www.sgstechnologies.net/sites/default/files/2022-03/ai.jpg",
      imageLeft: false
    },
    {
      title: "Data-Driven Insights",
      description: "Leverage advanced analytics to understand customer behavior and preferences. Our AI system continuously learns from interactions, providing valuable insights that help optimize your business strategies and improve customer satisfaction.",
      imageUrl: "https://media.npr.org/assets/img/2023/05/24/gettyimages-1358149692-bf96c07fc26040785771044ba8470ff9d73a928c-s1100-c50.jpg",
      imageLeft: true
    }
  ];

  return (
    <div className="bg-white">
      <div className="space-y-12">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Content Section */}
              <div 
                className={`${
                  feature.imageLeft ? 'lg:order-2' : 'lg:order-1'
                } w-full p-12`}
              >
                <div className="bg-slate-100 p-10 rounded-2xl shadow-lg w-full">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    {feature.title}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Image Section */}
              <div 
                className={`${
                  feature.imageLeft ? 'lg:order-1' : 'lg:order-2'
                } w-full p-12`}
              >
                <div className="w-full h-[500px] rounded-2xl overflow-hidden">
                  <img
                    src={feature.imageUrl}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;