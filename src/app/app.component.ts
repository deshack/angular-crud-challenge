import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { randText } from '@ngneat/falso';
import { ApiService } from './Services/api.service';
import { Todo } from './Interfaces/todo';
import { TodoListSignalService } from './Services/todo-list-signal.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos!: Todo[];
  loading = true;

  constructor(private apiservice: ApiService, private todoListSignalService: TodoListSignalService) {}

  ngOnInit(): void {
    this.apiservice.getData().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
        console.log('Todo list updated signal received!');
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
        this.loading = false;
      }
    });
  }
  update(todo: Todo) {
    const updatedTodo: Todo = {
      ...todo,
      title: randText(),
    };

    this.apiservice.updateData(updatedTodo).subscribe({
      next: (todoUpdated: Todo) => {
        this.todos = this.todos.map(t => (t.id === todoUpdated.id ? todoUpdated : t));
        console.log('Text updated');
        this.todoListSignalService.emitTodoListUpdated();
      },
      error: (error) => {
        console.error('Error updating todo:', error);
      },
    });
  }

  delete(todoId: number) {
    this.apiservice.deleteTodo(todoId).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t.id !== todoId);
        this.todoListSignalService.emitTodoListUpdated();
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
      }
    });
  }


}
