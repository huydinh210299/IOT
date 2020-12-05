import { notification } from 'antd';
import { useSelector } from 'react-redux';


export const notifSuccess = (message = "Success", description = "") => {
    notification.success({
        message: message,
        description: description,
        duration: 3,
    });
}

export const notifFailure = (error) => {
    if (!error.response) {
        notification.error({
            message: error.name,
            description:
                error.message,
            duration: 3
        });
    }
    else {
        notification.error({
            message: error.response.data.status || error.name,
            description:
                error.response.data.message || error.message,
            duration: 2
        });
    }
}