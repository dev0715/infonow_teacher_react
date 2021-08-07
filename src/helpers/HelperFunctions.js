import moment from "moment";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function titleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}

export function mergeDateTime(date, time, dateFormat = "YYYY-MM-DD", timeFormat = "HH:mm") {
    return `${moment(date).format(dateFormat)} ${moment(time).format(timeFormat)}`;
}


const showAlertDialog = (msg, icon) => {
    const MySwal = withReactContent(Swal)
    return MySwal.fire({
        title: msg,
        icon: icon,
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    })
}

export const errorAlertDialog = (msg) => {
    showAlertDialog(msg, 'error')
}

export const successAlertDialog = (msg) => {
    showAlertDialog(msg, 'success')
}

export const infoAlertDialog = (msg) => {
    showAlertDialog(msg, 'info')
}