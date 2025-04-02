import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Habits } from '../../habit.model';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-habit-modal',
  standalone: false,
  templateUrl: './habit-modal.component.html',
  styleUrl: './habit-modal.component.css'
})
export class HabitModalComponent {

  @Input() habit!: Habits;
  @Output() onSave = new EventEmitter<Habits>();
  @Output() onClose = new EventEmitter<void>();

  originalHabit!: Habits;
  chartData: { name: string; value: number }[] = [];
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1E88E5']
  };

  ngOnInit() {
    this.originalHabit = { ...this.habit }; // Salva o estado original para comparação
    this.updateChartData();
  }

  updateChartData() {
    this.chartData = [{ name: 'Dias feitos', value: this.habit.days }];
  }

  save() {
    this.onSave.emit(this.habit);
  }

  close() {
    if (JSON.stringify(this.habit) !== JSON.stringify(this.originalHabit)) {
      if (confirm("Você tem mudanças não salvas. Deseja sair mesmo assim?")) {
        this.onClose.emit();
      }
    } else {
      this.onClose.emit();
    }
  }
}

