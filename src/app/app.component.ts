import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { randText } from '@ngneat/falso';
import { ApiService } from './Services/api.service';
import { Todo } from './Interfaces/todo';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos!: Todo[];

  constructor(private apiservice: ApiService,  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.apiservice.getData().subscribe((todos) => {
      this.todos = todos;
    });
  }

  update(todo: Todo) {
    const updatedTodo: Todo = {
      ...todo,
      title: randText(),
    };

    this.apiservice.updateData(updatedTodo).subscribe((todoUpdated: Todo) => {
      this.todos = this.todos.map(t => (t.id === todoUpdated.id ? todoUpdated : t));
      console.log('Text updated');
    });
  }
}
