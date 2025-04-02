import { Component } from '@angular/core';
import { Habits } from '../habit.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Meus Hábitos';

  habits: Habits[] = [];
  nextId: number = 1;

  constructor(){ }
  ngOnInit(){
    const storeHabits = localStorage.getItem('habits');
    const storedNextId = localStorage.getItem('nextId');

    this.habits = storeHabits ? JSON.parse(storeHabits) : [];
    this.nextId = storedNextId ? parseInt(storedNextId, 10) : 1;
  }

  addHabit(title: string, inputElement: HTMLElement){
    if(!title.trim()) return;

    const newHabit: Habits = {
      id: this.nextId,
      title,
      days: 0
    }

    this.habits.push(newHabit);
    (inputElement as HTMLInputElement).value = '',
    this.nextId++
    this.saveOnLocalStorage()
  }

  incrementDays(habit: Habits){
    habit.days++
    this.saveOnLocalStorage()
  }

  decrementDays(habit: Habits){
    if(habit.days > 0){
      habit.days--
    }
    this.saveOnLocalStorage()
  }

  deleteHabit(id: number){
    this.habits = this.habits.filter(h => h.id !== id)
    this.saveOnLocalStorage()
  }

  saveOnLocalStorage(){
    localStorage.setItem('habits', JSON.stringify(this.habits));
    localStorage.setItem('nextId', this.nextId.toString());
  }
}
