import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { randText } from '@ngneat/falso';
import { ApiService } from './Services/api.service';
import { Todo } from './Interfaces/todo';
import { TodoListSignalService } from './Services/todo-list-signal.service';
import { ErrorHandlingService } from './Services/error.handling.service';
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
  // Variable to hold the list of todos
  todos!: Todo[];

  // Loading flag to indicate whether todos are being loaded
  loading = true;

  constructor(private apiService: ApiService,
    private todoListSignalService: TodoListSignalService,
    private errorHandlingService: ErrorHandlingService
    ) {}


  ngOnInit(): void {
    // Call the service to get the data
    this.apiService.getTodo().subscribe({
      next: (todos) => {
        // Update state variables
        this.todos = todos;
        this.loading = false;
        console.log('Todo list updated signal received!');
      },
      error: (error) => {
        // Handle errors in fetching todos
        console.error('Error fetching todos:', error);
        this.loading = false;
        this.errorHandlingService.handleError('An error occurred while fetching todos.');
      }
    });
  }

  update(todo: Todo) {
    // Create a new updated todo with a random text
    const updatedTodo: Todo = {
      ...todo,
      title: randText(),
    };

    // Call the service to update the data
    this.apiService.updateTodo(updatedTodo).subscribe({
      next: (todoUpdated: Todo) => {
        // Update the list of todos
        this.todos = this.todos.map(t => (t.id === todoUpdated.id ? todoUpdated : t));
        console.log('Todo updated successfully');
        // Emit a signal to notify the update
        this.todoListSignalService.emitTodoListUpdated();
        console.log('Todo list updated signal received!');
      },
      error: (error) => {
        // Handle errors in updating todo
        console.error('Error updating todo:', error);
        this.errorHandlingService.handleError('An error occurred while updating the todo.');
      },
    });
  }

  delete(todoId: number) {
    // Call the service to delete the todo
    this.apiService.deleteTodo(todoId).subscribe({
      next: () => {
        // Filter todos to remove the deleted one
        this.todos = this.todos.filter(t => t.id !== todoId);
        // Emit a signal to notify the update
        this.todoListSignalService.emitTodoListUpdated();
        console.log('Todo deleted successfully');
        console.log('Todo list updated signal received!');
      },
      error: (error) => {
        // Handle errors in deleting todo
        console.error('Error deleting todo:', error);
        this.errorHandlingService.handleError('An error occurred while deleting the todo.');
      }
    });
  }
}
