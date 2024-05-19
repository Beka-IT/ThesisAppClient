import dayjs from "dayjs";

export class DateTime {
    static GetNow = () => new Date();
    static Format = (stringDate: string) => {
        return dayjs(stringDate).format("YYYY.MM.DD HH:mm")
    }
}


export const getBelowDateTime = (deadlineString: string | Date) => {
    let deadline = new Date(deadlineString);
    let now = new Date();

    let Difference_In_Time =
        deadline.getTime() - now.getTime();

    let days =
        Math.round
            (Difference_In_Time / (1000 * 3600 * 24));
    let hours =
        Math.round
            ((Difference_In_Time / (1000 * 3600)) % 24);
    let minutes =
        Math.round
            ((Difference_In_Time / (1000 * 60)) % 60);
    let seconds =
        Math.round
            ((Difference_In_Time / (1000)) % 60);

    const res = {
        days,
        hours,
        minutes,
        seconds
    }
    console.log(res, "res")
    return res
}