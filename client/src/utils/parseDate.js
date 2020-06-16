import dayjs from 'dayjs';
export function parseDate(d) {
    if (dayjs(d).year < dayjs().year) {
        return dayjs(d).format("DD.MMM.YYYY");
    } else {
        return dayjs(d).format("DD MMM [at] HH:mm");
    }
}
