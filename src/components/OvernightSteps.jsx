const OvernightSteps = ({step}) => {

    const activeStyle = "w-[2.5rem] h-[2.5rem] lg:w-[3rem] lg:h-[3rem] flex items-center justify-center bg-[#75A9BF] rounded-full text-white text-lg lg:text-xl";
    const nonActiveStyle = "w-[2.5rem] h-[2.5rem] lg:w-[3rem] lg:h-[3rem] flex items-center justify-center bg-[#C8D5E0] rounded-full text-lg lg:text-xl text-black";
    const textStyle = "text-center text-sm lg:text-base mt-1 lg:mt-2";

    return (
        <div className='flex items-center justify-center font-robotoFont w-[100%]'>
           <div className='flex flex-col items-center'>
                <div className="flex  items-center">

                <div className={step === 1 ? activeStyle : nonActiveStyle}>1</div>
               
               <div className='hidden lg:block w-[17rem] h-[4px] bg-[#C8D5E0]'></div>

                </div>
                
                <span className={textStyle}>Guest(s) Details</span>
                
            </div>
          <div className='flex flex-col items-center'>
          <div className="flex items-center">
                
            <div className={step === 2 ? activeStyle : nonActiveStyle}>2</div>
              
              <div className='hidden lg:block w-[17rem] h-[4px] bg-[#C8D5E0]'></div>
            </div>

                <span className={textStyle}>Stay & Room Details</span>
            </div>
          <div className='flex flex-col items-center'>
          <div className="flex items-center"><div className={step === 3 ? activeStyle : nonActiveStyle}>3</div></div>
                
                <span className={textStyle}>Guest(s) Info</span>

            </div>
        </div>
    ); 
 
}

export default OvernightSteps
