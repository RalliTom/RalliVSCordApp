import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  taskList = [];
  taskName: string;

  constructor(public alertController: AlertController) { }

  addTask() {
    if (this.taskName.length > 0) {
      const task = this.taskName;
      this.taskList.push(task);
      this.taskName = '';
    }
  }

  async deleteTask(index) {
    const alert = await this.alertController.create({
      header: 'Delete Task?',
      message: 'Are you really absolutely sure to delete your task?',
      buttons: [{ text: 'Cancel', role: 'cancel' },
      {
        text: 'Delete', handler: data => {
          this.taskList.splice(index, 1);
        }
      }
      ]
    });
    await alert.present();
  }

  async updateTask(index) {
    const alert = await this.alertController.create({
      header: 'Update Task?',
      message: 'Type in your new task to update.',
      inputs: [{ name: 'editTask', placeholder: 'Task' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
      {
        text: 'Update', handler: data => {
          this.taskList[index] = data.editTask;
        }
      }
      ]
    });
    await alert.present();
  }
}
