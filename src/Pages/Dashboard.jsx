import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChar from '../Components/BarChar';

function Dashboard() {
  const [adminDetails, setAdminDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [customAmount, setCustomAmount] = useState(100);
  const [regularAmounts, setRegularAmounts] = useState([]);
  const [adminData, setAdminData] = useState({
    labels: [],
    datasets: [
      {
        label: "chart",
        data: [],
        backgroundColor: [],
      },
    ],
  });
  
  const [keysArray, setKeysArray] = useState([]);
  const [valueArray, setValuesArray] = useState([]);
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getAdminData = async () => {
    try {
      const res = await axios.get("https://stg.dhunjam.in/account/admin/4");
      setAdminDetails(res.data);
      setSaveButtonEnabled(res.data?.data?.charge_customers);

      if (customAmount >= 99) {
        setSaveButtonEnabled(true);
      } else {
        setSaveButtonEnabled(false);
      }

      storeValue();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAdminData()
  }, [customAmount, getAdminData, setAdminData]);

  const handleSave = async () => {
    try {
      const apiUrl = 'https://stg.dhunjam.in/account/admin/4';

      const response = await axios.put(apiUrl, {
        amount: {
          category_6: customAmount,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const storeValue = () => {
    setRegularAmounts(adminDetails?.data?.amount || {}); // Ensure it's an object

    const amountObject = adminDetails?.data?.amount || {};
    const keysArray = Object.keys(amountObject);
    const valuesArray = Object.values(amountObject);

    // Now you can use keysArray and valuesArray as needed
    console.log('Keys:', keysArray);
    console.log('Values:', valuesArray);

    // Set the values in the state or use them as required in your component
    setKeysArray(keysArray);
    setValuesArray(valuesArray);

    setAdminData({
      labels: keysArray,
      datasets: [
        {
          label: "chart",
          data: valuesArray,
          backgroundColor: ["#F0C3F1"]
        },
      ],
    });
  };

 

  const handleCustomAmountChange = (e) => {
    setCustomAmount(Number(e.target.value));
  };

  const pricesArray = Object.values(regularAmounts).slice(1);

  console.log(keysArray);
  console.log(valueArray);

  // Add a conditional check to render only when data is available
  if (!adminDetails?.data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-[100vw] h-auto bg-[#030303] flex flex-col items-center pt-14 pb-14">

<div className="w-[600px] h-[250px] bg-[#030303] mb-12">
      <div className="w-full h-[50px] flex justify-center">
        <h1 className="text-[#FFFFFF]  text-[32px] font-poppins font-bold">
         {adminDetails?.data?.name}, {adminDetails?.data?.location} on Dhun Jam
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
            <div className="flex justify-center ">
            <label>
        <input
          type="radio"
          value="yes"
          checked={selectedOption === 'yes'}
          onChange={handleOptionChange}
          disabled={!saveButtonEnabled} // Use the disabled attribute
  className={`appearance-none w-5 h-5 border-2 ${saveButtonEnabled ? 'border-purple-600' : 'border-gray-400'} rounded-full focus:outline-none ${selectedOption === 'yes' ? 'bg-purple-600' : ''}`}
        />
        <span className="text-white mr-5 font-poppins ml-2">Yes</span>
      </label>

      <label>
        <input
          type="radio"
          value="no"
          checked={selectedOption === 'no'}
          onChange={handleOptionChange}
          disabled={!saveButtonEnabled} // Use the disabled attribute
  className={`appearance-none w-5 h-5 border-2 ${saveButtonEnabled ? 'border-purple-600' : 'border-gray-400'} rounded-full focus:outline-none ${selectedOption === 'no' ? 'bg-purple-600' : ''}`}
        />
        <span className="text-white font-poppins ml-2">No</span>
      </label>
            </div>

            <div>
                <input type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                
                className="w-full h-10 px-2 font-poppins bg-transparent text-white border-[#FFFFFF] border-solid border-2 rounded-lg"
                />
            </div>

            <div className="text-white flex gap-2">
      {pricesArray.map((value, index) => (
        <div key={index} className="border-2 border-white border-solid px-3 py-1 rounded-lg font-poppins">
          <h4>{value}</h4>
        </div>
      ))}
    </div>
        </div>
        

      </div>
      
    </div>

    
    <div className='w-[600px] h-[50vh]'>
    <BarChar chartData={adminData}/>
    </div>
    {
      saveButtonEnabled === true ? <button
      type='submit'
      onClick={handleSave}
      className='w-[600px] bg-[#6741D9] h-10 rounded-lg
       font-poppins text-[#FFFFFF] text-[16px] hover:border-2 hover:border-solid hover:border-[#F0C3F1] 
       active:border-2 active:border-solid active: border-[#F0C3F1] font-bold'
      >Save</button> : <button
      type='submit'
      className='w-[600px] bg-[#C2C2C2] h-10 rounded-lg
       font-poppins text-[#FFFFFF] text-[16px] hover:border-2 hover:border-solid hover:border-[#F0C3F1] 
       active:border-2 active:border-solid active: border-[#F0C3F1] font-bold'
       disabled
      >Save</button>
    }

    
    </div>
  )
}

export default Dashboard