import React from "react";

function Button(){
    return(
        <button 
        {...props} 
        className="bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 px-6 h-12 rounded-2xl
        font-medium text-white transition-all"
        />
    );
}

export default Button;