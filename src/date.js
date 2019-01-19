
Date.SECOND = 1000;
Date.MINUTE = 60 * Date.SECOND;
Date.HOUR = 60 * Date.MINUTE;
Date.DAY = 24 * Date.HOUR;
Date.WEEK = 7 * Date.DAY;

Date.MONTH = 30 * Date.DAY;
Date.MONTH_30 = 30 * Date.DAY;
Date.MONTH_31 = 31 * Date.DAY;

Date.YEAR = 365 * Date.DAY;
Date.LEAP_YEAR = 366 * Date.DAY;

//https://www.grc.nasa.gov/www/k-12/Numbers/Math/Mathematical_Thinking/calendar_calculations.htm
//365 days, 5 hours, 48 minutes, and 46 seconds,
Date.TROPICAL_YEAR = (365 * Date.YEAR) + (5 * Date.HOUR) + (48 * Date.MINUTE) + (46 + Date.SECOND);
