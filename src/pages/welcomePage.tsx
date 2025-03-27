import React from 'react'
import AppBox from '../components/chakraOverrides/AppBox'
import AppImage from '../components/chakraOverrides/AppImage'
import WelcomPageBgImage from '../assets/hoti-welcome-page-bg.png'
import GroupImage from '../assets/welcome-page-group-pic.png'
import logo from '../assets/hoti-logo.png'

import AppFlex from '../components/chakraOverrides/AppFlex'
import AppButton from '../components/chakraOverrides/AppButton'
import AppArrowIcon from '../components/AppArrowIcon'
import { Link } from 'react-router-dom'
import { appColors } from '../theme/foundations/appColor'
import { SIGN_UP_PAGE } from '../navigation/routes/common-routes'

function WelcomePage() {
    return (
        <AppFlex
            alignItems={'center'}
            justifyContent={'center'}
            customStyles={{
                height: "100vh",
                backgroundImage: WelcomPageBgImage,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>
            <AppFlex
                alignItems={'center'}
                justifyContent={'center'}
                customStyles={{
                    flexBasis: "50%",
                    height: "100%",
                }}>
                <AppBox customStyles={{ h: '35%', w: "70%" }}>
                    <AppImage src={logo} alt="" />
                    <Link
                        to={`/${SIGN_UP_PAGE}`}
                    >
                        <AppButton
                            variant='onlyBorderBlack'
                            customStyles={{
                                border: `3px solid ${appColors.appBlack[800]}`,
                                mt: "1.5em",
                                w: "45%",
                                maxW: "270px"
                            }}
                            rightIcon={<AppArrowIcon />}
                        >
                            Get Started
                        </AppButton>
                    </Link>
                </AppBox>
            </AppFlex>
            <AppBox customStyles={{
                flexBasis: "50%",
                height: "100%",
                backgroundImage: GroupImage,
                backgroundRepeat: "no-repeat",
                backgroundSize: "85%",
                backgroundPosition: "center",
            }}>
            </AppBox>
        </AppFlex>
    )
}

export default WelcomePage