export class Todo {
  id: number;
  title: string = '';
  failedAfter: Date = new Date();
  complete: boolean = false;
  important: boolean = false;
  failed: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  getHumanReadableDate() : string {
    var output : string = this.failedAfter.getDate().toString();
    switch(this.failedAfter.getMonth()) {
      case 0: {
        output += ' january ';
        break;
      }
      case 1: {
        output += ' february ';
        break;
      }
      case 2: {
        output += ' march ';
        break;
      }
      case 3: {
        output += ' april ';
        break;
      }
      case 4: {
        output += ' may ';
        break;
      }
      case 5: {
        output += ' june ';
        break;
      }
      case 6: {
        output += ' july ';
        break;
      }
      case 7: {
        output += ' august ';
        break;
      }
      case 8: {
        output += ' september ';
        break;
      }
      case 9: {
        output += ' october ';
        break;
      }
      case 10: {
        output += ' november ';
        break;
      }
      case 11: {
        output += ' december ';
        break;
      }
    }
    return output += this.failedAfter.getFullYear();
  }
}
