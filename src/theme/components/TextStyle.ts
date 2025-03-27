import { appColors } from '../foundations/appColor';

export const TextStyle = {
  baseStyle: {},
  sizes: {
    h1: {
      fontSize: 'xl', // 2.8rem
      fontWeight: 'bold', // 700
      lineHeight: 'xxl' // 3.2rem
    },
    h2: {
      fontSize: 'lg', // 2.4rem
      fontWeight: 'bold', // 700
      lineHeight: 'xxl' // 3.2rem
    },
    h3: {
      fontSize: 'md', // 2rem
      fontWeight: 'semibold', //600
      lineHeight: 'xl' //2.6rem
    },
    textlight1: {
      fontSize: 'base', //1.8rem
      fontWeight: 'regular', // 400
      lineHeight: 'md' //2.5rem
    },
    textmedium1: {
      fontSize: 'base', //1.8rem
      fontWeight: 'medium', // 500
      lineHeight: 'md' //2.5rem
    },
    textdark1: {
      fontSize: 'base', //1.8rem
      fontWeight: 'semibold', // 600
      lineHeight: 'md' //2.5rem
    },
    textlight2: {
      fontSize: 'xs', //1.5rem
      fontWeight: 'regular', // 400
      lineHeight: 'xs' //1.6rem
    },
    textmedium2: {
      fontSize: 'xs', //1.5rem
      fontWeight: 'medium', // 500
      lineHeight: 'xs' //1.6rem
    },
    textdark2: {
      fontSize: 'xs', //1.5rem
      fontWeight: 'semibold', // 600
      lineHeight: 'xs' //1.6rem
    },
    textlight3: {
      fontSize: 'xxs', //1.2rem
      fontWeight: 'regular', // 400
      lineHeight: 'xxs' //1.4rem
    },
    textdark3: {
      fontSize: 'xxs', //1.2rem
      fontWeight: 'semibold', // 600
      lineHeight: 'xxs' //1.4rem
    },
    body1: {
      fontSize: 'base', //1.8rem
      fontWeight: 'regular', // 400
      lineHeight: 'md' //2.5rem
    },
    body2: {
      fontSize: 'sm', //1.6rem
      fontWeight: 'regular', // 400
      lineHeight: 'sm' //2.2rem
    },
    body3: {
      fontSize: 'xxs', //1.2rem
      fontWeight: 'regular', // 400
      lineHeight: 'xs' //1.6rem
    },
    btn1: {
      fontSize: 'base', //1.8rem
      fontWeight: 'semibold', // 600
      lineHeight: 'sm' //2.2rem
    }
  },
  variants: {
    inputError: {
      fontSize: '11px',
      color: '#FC8181',
      position: 'absolute',
      bottom: '-21px'
    },
    notificationBold: {
      fontSize: '15px',
      display: 'inline-block',
      fontWeight: 600
    },
    notificationNormal: {
      fontSize: '15px',
      display: 'inline-block',
      ontWeight: 400
    },
    settingsList: {
      padding: '15px 30px',
      color: '#151515',
      fontSize: '18px',
      fontWeight: 500,
      borderLeft: `3px solid ${'transparent'}`,
      // borderBottom: `1px solid ${"transparent"}`,
      _hover: {
        color: appColors.appPrimary[600]
        // borderTop: `1px solid ${appColors.appPrimary[600]}`,
        // textDecoration: "underline",
      }
    },
    settingsListSelected: {
      padding: '15px 30px',
      fontSize: '18px',
      fontWeight: 500,
      color: appColors.appPrimary[600],
      borderLeft: `3px solid ${appColors.appPrimary[600]}`
    },
    tcHeader: {
      fontSize: '22px',
      fontWeight: 600,
      margin: '10px 0px'
    },
    tcPoints: {
      fontSize: '17px',
      margin: '15px 0px',
      fontWeight: 500
    }
  },
  defaultProps: {
    size: 'textlight1'
  }
};
