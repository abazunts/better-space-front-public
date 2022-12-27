import enLocale from "date-fns/locale/en-US";
import * as dateFns from "date-fns";


export const getLocaleDateStringForHours = (
    date: Date | string
): string => {
    let dateValue = date
    if (typeof dateValue === 'string') {
        dateValue = new Date(date)
    }
    return dateFns.format(dateValue, 'LLL dd yyyy hh:mm a', {
        locale: enLocale,
    })
}
