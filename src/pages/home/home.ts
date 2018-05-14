import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
//import { DeletefilePage } from "../deletefile/deletefile.module";
import { ArchivedTodosPage } from "../archived-todos/archived-todos";
import { TodoService } from '../../providers/todo-service/todo-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public todos = [];
public reorderIsEnabled=false;
public archivedPush= ArchivedTodosPage;

  constructor(private toastController:ToastController,private todoService: TodoService,public navCtrl: NavController,private alertController:AlertController) {
this.todos= this.todoService.getTodos();
  }
  toggleReorder(){
    this.reorderIsEnabled= !this.reorderIsEnabled;
  }

archiveTodo(todoIndex){
this.todoService.archivedTodo(todoIndex);
}

  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  itemReordered($event){
    reorderArray(this.todos, $event);
  }

  editTodo(todoIndex){
   let addTodoAlert = this.alertController.create({
     title:"edit a Todo",
     message:"edit a Todo ",
     inputs:[
       {
         type:"text",
         name:"editTodoInput",
         value:this.todos[todoIndex]
       }],
       buttons:[
         {
           text:"Cancel"
         },
         {
           text:"edit Todo",
           handler:(inputData)=>{
             let todoText;
             todoText= inputData.editTodoInput;
             //this.todos.push(todoText);  without change its work but we add some alternet method so i delete thisline
             this.todoService.editTodo(todoText, todoIndex);
             addTodoAlert.onDidDismiss(()=>{
               let editTodoToast= this.toastController.create({
                 message:"Todo is edited",
                 duration:2000
               });
               addTodoToast.present();
             });


         }
       }]
   });
   addTodoAlert.present()
 }


 openTodoAlert(){
  let addTodoAlert = this.alertController.create({
    title:"Add a Todo",
    message:"Enter a Todo ",
    inputs:[
      {
        type:"text",
        name:"addTodoInput"
      }],
      buttons:[
        {
          text:"Cancel"
        },
        {
          text:"Add Todo",
          handler:(inputData)=>{
            let todoText;
            todoText= inputData.addTodoInput;
            //this.todos.push(todoText);  without change its work but we add some alternet method so i delete thisline
            this.todoService.addTodo(todoText);
            addTodoAlert.onDidDismiss(()=>{
              let addTodoToast= this.toastController.create({
                message:"Todo is added",
                duration:2000
              });
              addTodoToast.present();
            });


        }
      }]
  });
  addTodoAlert.present()
}
}
