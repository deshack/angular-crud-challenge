import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoListSignalService {
  private todoListUpdatedSource = new Subject<void>();

  todoListUpdated$ = this.todoListUpdatedSource.asObservable();

  emitTodoListUpdated() {
    this.todoListUpdatedSource.next();
  }
}
