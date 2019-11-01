
export{}

declare global {

    export interface Date {
        SECOND: number;
        MINUTE: number;
        HOUR: number;
        DAY: number;
        WEEK: number;

        MONTH: number;
        MONTH_30: number;
        MONTH_31: number;

        YEAR: number;
        LEAP_YEAR: number;

        //https://www.grc.nasa.gov/www/k-12/Numbers/Math/Mathematical_Thinking/calendar_calculations.htm
        //365 days, 5 hours, 48 minutes, and 46 seconds,
        TROPICAL_YEAR: number
    }
}
