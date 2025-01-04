import React from "react";

const Card = ({
  bgColor = "bg-orange-500",
  title = "CHAMOMILLE",
  subtitle = "NATURAL, OIL",
  questions = "39.00 MLC",
  description = "Perfect everywhere",
  duration,
  onClick
}) => {
  return (
    <div className="card m-auto text-gray-300 w-[clamp(260px,80%,300px)] hover:brightness-90 transition-all cursor-pointer group bg-gradient-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 border-r-2 border-t-2 border-gray-900 m-4 rounded-lg overflow-hidden relative" onClick={onClick}>
      <div className="px-8 py-10">
        {/* Circle Icon */}
        <div
          className={`w-10 h-10 rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-red-900 transition-all ${bgColor}`}
        ></div>

        {/* Title */}
        <div className="uppercase font-bold text-xl">{title}</div>

        {/* Subtitle */}
        <div className="text-gray-300 uppercase tracking-widest">
        Category :  {subtitle}
        </div>

        {/* Description */}
        <div className="text-gray-400 mt-8">
          <p className="font-bold">{questions}</p>
          <p className="font-bold">Duration : {duration}</p>
          <p>{description}</p>
        </div>
      </div>

      {/* Hover Effects */}
      <div className="h-2 w-full bg-gradient-to-l via-yellow-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
      <div className="h-0.5 group-hover:w-full bg-gradient-to-l via-yellow-950 group-hover:via-yellow-500 w-[70%] m-auto rounded transition-all"></div>
    </div>
  );
};

export default Card;
