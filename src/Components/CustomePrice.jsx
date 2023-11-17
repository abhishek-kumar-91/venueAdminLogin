import React from "react";

function CustomePrice() {
  return (
    <div className="w-[600px] h-[250px] bg-[#030303]">
      <div className="w-full h-[50px] flex justify-center">
        <h1 className="text-[#FFFFFF]  text-[32px] font-poppins">
          Social, Hebbal on Dhun Jam
        </h1>
      </div>
      <div className="w-full h-[200px] flex justify-between">
        <div className="w-[280px] h-[200px] flex flex-col justify-between p-2">
          <div>
            <h1 className="text-white font-poppins">
             Do you want to charge your customers for requesting songs?
            </h1>
          </div>

          <div>
            <h1 className="text-white font-poppins">
              Custome song request amount-
            </h1>
          </div>

          <div>
            <h1 className="text-white font-poppins">
              Regular song request amounts from high to low-
            </h1>
          </div>
          

        </div>

        <div className="w-[280px] h-[200px] flex flex-col justify-between p-5">
            <div className="flex justify-center">
                <input type="radio" /> <span className="text-white mr-5 font-poppins ml-2">Yes</span>
                <input type="radio" /> <span className="text-white font-poppins ml-2">No</span>
            </div>

            <div>
                <input type="text"
                className="w-full h-10 px-2 font-poppins bg-transparent text-white border-[#FFFFFF] border-solid border-2 rounded-lg"
                />
            </div>

            <div className="text-white flex gap-2">
                <div className="border-2 border-white border-solid px-3 py-1 rounded-lg font-poppins"><h4>199</h4></div>
                <div className="border-2 border-white border-solid px-3 py-1 rounded-lg font-poppins"><h4>199</h4></div>
                <div className="border-2 border-white border-solid px-3 py-1 rounded-lg font-poppins"><h4>199</h4></div>
                <div className="border-2 border-white border-solid px-3 py-1 rounded-lg font-poppins"><h4>199</h4></div>
                
            </div>
        </div>
      </div>
    </div>
  );
}

export default CustomePrice;

// <div>

// <h1 className='text-[#FFFFFF]  text-[32px] font-poppins'>Social, Hebbal on Dhun Jam</h1>
// </div>
// <div className='flex  justify-center'>
//     <div className='w-[250px] h-[100px] border-2 border-solid border-red-500'></div>
//     <div className='w-[250px] h-[100px] border-2 border-solid border-red-500'></div>
// </div>
