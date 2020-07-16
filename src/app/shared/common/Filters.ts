export class Filters {
  constructor() { }
  static isNumberKeyOnly(event): boolean {
    const charcode = (event.which) ? event.which : event.keyCode;
    return !(charcode > 31 && (charcode < 48 || charcode > 57));
  }

  
}
