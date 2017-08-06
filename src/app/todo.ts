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
}
