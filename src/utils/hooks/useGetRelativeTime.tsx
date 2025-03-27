import React from 'react'

const useGetRelativeTime = () => {
    function getRelativeTime(timestamp: any) {
        const currentTime = Math.floor(Date.now() / 1000);
        const timeDifference = currentTime - timestamp;

        if (timeDifference < 60) {
            return `${timeDifference} secs ago`;
        } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes} mins ago`;
        } else if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return `${hours} hours ago`;
        } else {
            const days = Math.floor(timeDifference / 86400);
            return `${days} days ago`;
        }
    }
    return { getRelativeTime }
}

export default useGetRelativeTime