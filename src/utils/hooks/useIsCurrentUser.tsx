import React from 'react'
import getUserData from '../getUserData';

const useIsCurrentUser = () => {
    const [isCurrentUser, setIsCurrentUser] = React.useState(false);
    const userData = getUserData()

    const checkIsCurrentUser = (resData: any) => {
        // console.log("userData.user_id", userData.user_id)
        if(userData.user_id == resData.id){
            // console.log("checkIsCurrentUser", userData.user_id, resData.id);
            setIsCurrentUser(true);
          }
        //   console.log("checkIsCurrentUser", isCurrentUser);
    }
  return {checkIsCurrentUser, isCurrentUser}
}

export default useIsCurrentUser