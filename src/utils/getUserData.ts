import React from 'react'
import useAppStore from '../store'

const getUserData = () => {
    let userData;
    const valFromZustand = useAppStore.getState();
    // console.log("valFromZustand", valFromZustand);
    const stringy = localStorage.getItem('user_data') || "{}";

    const valFromLocalStorage = JSON.parse(stringy);
    // console.log("valFromLocalStorage", valFromLocalStorage);
    //@ts-ignore
    if(![null, undefined].includes(valFromZustand.user_id)){
        return userData = valFromZustand;
    }
    if(valFromLocalStorage){
        return userData = valFromLocalStorage;
    }
  return userData;
}

export default getUserData