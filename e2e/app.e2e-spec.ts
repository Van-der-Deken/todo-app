import { TodoListAppPage } from './app.po';

describe('todo-list-app App', () => {
  let page: TodoListAppPage;

  beforeEach(() => {
    page = new TodoListAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
