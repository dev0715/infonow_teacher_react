import moment from "moment";

export function titleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}

export function mergeDateTime(date, time, dateFormat = "YYYY-MM-DD", timeFormat = "HH:mm") {
    return `${moment(date).format(dateFormat)} ${moment(time).format(timeFormat)}`;
}