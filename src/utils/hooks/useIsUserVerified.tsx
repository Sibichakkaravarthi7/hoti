import React from 'react'
import { useNavigate } from 'react-router-dom';
import getCurrentUserData from '../../api/utils/getCurrentUserData';
import getUserToken from '../../api/utils/getUserToken';
import { LOG_IN_PAGE, MAKE_PROFILE_PAGE_URL } from '../../navigation/routes/common-routes';
import useAppStore from '../../store';

const useIsUserVerified = () => {
    const navigate = useNavigate();

    const [isVerified, setIsVerified] = React.useState(false);

    const [verifyIsLoading, setVerifyIsLoading] = React.useState(true)

    const setUserAndToken = useAppStore((state: any) => state.setUserAndToken);





    const isUserVerified = () => {
        getCurrentUserData()
            .then(async (data: any) => {
                setVerifyIsLoading(false);
                const token = getUserToken();
                await setUserAndToken({
                    token: token,
                    name: data?.data?.username,
                    id: data?.data?.id,
                    type: data?.data?.user_type,
                    verified_status: data?.data?.verified_status
                });
                //@ts-ignore
                if (data?.data?.verified_status !== "Verified") {
                    //@ts-ignore
                    navigate(MAKE_PROFILE_PAGE_URL(data?.data?.user_type, data?.data?.id))
                }else{
                    setIsVerified(true);
                }
            })
            .catch(() => {
                navigate(LOG_IN_PAGE);
                // removeUserToken();
            });


    };
    return { isUserVerified, isVerified, verifyIsLoading }
}

export default useIsUserVerified