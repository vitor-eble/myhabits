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
  selectedHabit: Habits | null = null;
  isDarkMode: boolean = false


  constructor(){ }

  ngOnInit(){
    const storeHabits = localStorage.getItem('habits');
    const storedNextId = localStorage.getItem('nextId');
    const storeTheme = localStorage.getItem('theme')

    this.habits = storeHabits ? JSON.parse(storeHabits) : [];
    this.nextId = storedNextId ? parseInt(storedNextId, 10) : 1;
    this.isDarkMode = storeTheme === 'dark'

    this.updateTheme()
  }

  addHabit(title: string, inputElement: HTMLElement){
    if(!title.trim()) return;

    const newHabit: Habits = {
      id: this.nextId,
      title,
      days: 0,
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
    if(this.habits.length === 0){
      this.nextId = 1
    }
    this.saveOnLocalStorage()
  }

  saveOnLocalStorage(){
    localStorage.setItem('habits', JSON.stringify(this.habits));
    localStorage.setItem('nextId', this.nextId.toString());
  }

  openModal(habit: Habits) {
    this.selectedHabit = { ...habit };
  }

  saveHabit(updatedHabit: Habits) {
    const index = this.habits.findIndex(h => h.id === updatedHabit.id);
    if (index !== -1) {
      this.habits[index] = updatedHabit;
      this.saveOnLocalStorage();
    }
    this.selectedHabit = null;
  }

  closeModal() {
    this.selectedHabit = null;
  }

  toggleTheme(){
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark': 'light');
    this.updateTheme()
  }

  updateTheme(){
    if(this.isDarkMode){
      document.body.classList.add('dark')
    } else{
      document.body.classList.remove('dark')
    }
  }
}
