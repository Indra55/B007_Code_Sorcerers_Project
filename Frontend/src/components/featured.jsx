import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Personalized Customer Engagement",
      description: "By training AI on your company's specific data, we ensure that Echo understands the nuances of your products, services, and target audience. Speaking with a branded voice can lead to more personalized interactions, fostering a stronger connection between your business and customers.",
      imageUrl: "https://www.cio.com/wp-content/uploads/2023/05/SW-Blog-image-Getty-1170x600-2.jpg?quality=50&strip=all",
    },
    {
      title: "Improved Customer Support",
      description: "Our AI chat solution enables businesses to provide round-the-clock customer support. Echo can handle repetitive queries, give instant responses, and escalate complex issues to human agents when necessary, ensuring efficient and reliable customer service.",
      imageUrl: "https://www.sgstechnologies.net/sites/default/files/2022-03/ai.jpg",
    },
    {
      title: "Data-Driven Insights",
      description: "Leverage advanced analytics to understand customer behavior and preferences. Our AI system continuously learns from interactions, providing valuable insights that help optimize your business strategies and improve customer satisfaction.",
      imageUrl: "https://media.npr.org/assets/img/2023/05/24/gettyimages-1358149692-bf96c07fc26040785771044ba8470ff9d73a928c-s1100-c50.jpg",
    }
  ];

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="flex flex-col gap-8 w-full p-8">
        {features.map((feature, index) => (
          <div key={index} className="grid grid-cols-3 gap-8 w-full">
            {/* Conditionally render image on left or right */}
            {index % 2 === 0 ? (
              <>
                {/* Image on the left */}
                <div className="col-span-1">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <img
                      src={feature.imageUrl}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Text on the right */}
                <div className="col-span-2">
                  <div className="bg-slate-100 p-6 rounded-2xl shadow-lg w-full h-full">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Text on the left */}
                <div className="col-span-2">
                  <div className="bg-slate-100 p-6 rounded-2xl shadow-lg w-full h-full">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
                {/* Image on the right */}
                <div className="col-span-1">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <img
                      src={feature.imageUrl}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;