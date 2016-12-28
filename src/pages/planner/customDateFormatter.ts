import { CalendarNativeDateFormatter, DateFormatterParams } from 'angular-calendar';



export class CustomDateFormatter extends CalendarNativeDateFormatter {

  public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {weekday: 'short'}).format(date);
  }

}




