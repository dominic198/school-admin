import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError } from 'rxjs';
import { ApiService } from '../api.service';

interface language {
  value: string,
  viewValue: string
}

interface level {
  value: string,
  viewValue: string
}

interface lesson {
  id: number,
  name: string,
  lang: string,
  level: string,
}

interface exercise {
  id: number,
  name: string,
  type: string,
}

interface exTypes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  ngOnInit(): void {
  }

  selectedLanguage = "";
  selectedLevel = "";
  selectedLesson = "";
  selectedExercise = "";
  lessonName = "";
  exerciseName = "";
  exerciseType = "";

  showEditAdd = false;
  lessonAction = 'add';
  lessonformtitle = "Add New Lesson";
  lessonformbtn = "Add Lesson";

  showEditAddExercise = false;
  exerciseAction = 'add';
  exerciseformtitle = "Add New Exercise";
  exerciseformbtn = "Add Exercise";

   fileName = '';

  languages: language[] = [
    { value: 'Ninth', viewValue: 'Ninth Standard' },
    { value: 'Tenth', viewValue: 'Tenth Standard' },
    { value: 'Eleventh', viewValue: 'Eleventh Standard' },
    { value: 'Twelfth', viewValue: 'Twelfth Standard' },
  ];

  levels: level[] = [
    { value: 'ENGLISH', viewValue: 'English' },
    { value: 'TAMIL', viewValue: 'Tamil' },
    { value: 'MATHEMATICS', viewValue: 'Mathematics' },
    { value: 'PHYSICS', viewValue: 'Physics'},
    { value: 'CHEMISTRY', viewValue: 'Chemistry'},
    { value: 'BOTANY', viewValue: 'Botany'},
    { value: 'ZOOLOGY', viewValue: 'Zoology'}
    
  ];

  lessons: lesson[] = [];
  exercises: exercise[] = [];

  exerciseTypes: exTypes[] = [
    { value: 'Type 1', viewValue: 'Type 1' },
    { value: 'Type 2', viewValue: 'Type 2' },
    { value: 'Type 3', viewValue: 'Type 3' },
    { value: 'Type 4', viewValue: 'Type 4' },
    { value: 'Type 5', viewValue: 'Type 5' },
    { value: 'Type 6', viewValue: 'Type 6' },
    { value: 'Type 7', viewValue: 'Type 7' },
    { value: 'Type 8', viewValue: 'Type 8' },
    {value: 'Type 9', viewValue: 'Type 9'},
    { value: 'Type 10', viewValue: 'Type 10' },
    { value: 'Type 11', viewValue: 'Type 11' },
    { value: 'Type 12', viewValue: 'Type 12' },
    { value: 'Type 13', viewValue: 'Type 13' },
    { value: 'Type 14', viewValue: 'Type 14' },
    { value: 'Type 15', viewValue: 'Type 15' },
    { value: 'Type 16', viewValue: 'Type 16' },
    { value: 'Type 17', viewValue: 'Type 17' },
    {value: 'Type 18', viewValue: 'Type 18'}
  ];

  showLnForm(val: string) {
    if (val == 'edit') {
      let ln = this.lessons.find(v => v.id == Number(this.selectedLesson));
      this.lessonName = ln?.name ? ln.name : "";
      this.lessonformbtn = "Edit Lesson";
      this.lessonformtitle = "Edit Lesson";
      this.lessonAction = 'edit';
    } else if (val == 'add') {
      this.lessonAction = 'add';
      this.lessonName = "";
      this.lessonformbtn = "Add New Lesson";
      this.lessonformtitle = "Add Lesson"
    }
    this.showEditAdd = true;
  }

  showexForm(val: string) {
    if (val == 'edit') {
      let ex = this.exercises.find(v => v.id == Number(this.selectedExercise));
      this.exerciseName = ex?.name ? ex.name : "";     
      this.exerciseformtitle = "Edit Exercise";
      this.exerciseformbtn = "Edit Exercise";
      this.exerciseAction = 'edit';
    } else if (val == 'add') {
      this.exerciseAction = 'add';
      this.exerciseName = "";
      this.exerciseType = "";
      this.exerciseformbtn = "Add New Exercise";
      this.exerciseformtitle = "Add Exercise";
    }
    this.showEditAddExercise = true;
  }

  getLessons() {
    if (this.selectedLanguage.trim().length <= 0 || this.selectedLevel.trim().length <= 0)
      return;
    this.exercises = [];
    this.selectedLesson = "";
    this.exerciseName = "";
    this.exerciseType = "";
    this.showEditAdd = false;
    this.selectedExercise = "";
    this.apiService.getAllLessons(this.selectedLanguage, this.selectedLevel)
      .subscribe((data) => {
        this.lessons = data;
    })
  }

  addLesson() {
    if (this.lessonAction == 'add') {
      this.apiService.addNewLsson(this.lessonName, this.selectedLanguage, this.selectedLevel)
      .subscribe((data) => {
        this.getLessons();
        this.lessonName = "";
        alert("Lesson Added Successfully!");
      })
    } else if (this.lessonAction == 'edit') {
      this.apiService.updateLesson(this.lessonName, Number(this.selectedLesson))
        .subscribe((data) => {
          this.getLessons();
          this.lessonName = "";
          alert("Lesson Updated Successfully!");
      })
    }    
    
  }

  getExercises() {
    if (this.selectedLesson == null)
      return;
    this.showEditAdd = false;
    this.apiService.getAllExercises(Number(this.selectedLesson))
      .subscribe((data) => {
        this.exercises = data;
        this.exercises.sort((a: exercise, b: exercise) => {
          return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
        })
    })
  }

  addExercise() {
    if (this.exerciseAction == 'add') {
      this.apiService.addNewExercise(Number(this.selectedLesson), this.exerciseType, this.exerciseName)
      .subscribe((data) => {
        this.exerciseName = "";
        this.exerciseType = "";
        this.getExercises();
        this.showEditAddExercise = false;
         alert("Exercise Added Successfully!");
      })
    } else if (this.exerciseAction == 'edit') {
      this.apiService.updateExercise(Number(this.selectedExercise), this.exerciseName, this.exerciseType)
        .subscribe((data) => {
          this.exerciseName = "";
          this.exerciseType = "";
          this.getExercises();
          this.showEditAddExercise = false;
           alert("Exercise Updated Successfully!");
      })
    }    
  }

  deleteEx() {
    if (confirm("Are you sure want to delete?")) {
      this.apiService.deleteExercise(Number(this.selectedExercise))
        .subscribe((data) => {
         alert("Exercise deleted Successfully!")
          this.getExercises();
          this.selectedExercise = ""
      })
    }
  }

  getExerciseData() {
    console.log(this.selectedExercise)
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    let type = "";
    this.fileName = file.name;
    const formData = new FormData();
    formData.append('file', file);
    event.target.value = null;
    this.fileName = "No File Uploaded Yet!";
    let ex = this.exercises.find(v => v.id = Number(this.selectedExercise));
    console.log(ex?.type)
    if (ex?.type == 'Type 1'
      || ex?.type == 'Type 2'
      || ex?.type == 'Type 3'
      || ex?.type == 'Type 4'
      || ex?.type == 'Type 6'
      || ex?.type == 'Type 7'
      || ex?.type == 'Type 8'
      || ex?.type == 'Type 9'
      || ex?.type == 'Type 10'
      || ex?.type == 'Type 11'
      || ex?.type == 'Type 12'
      || ex?.type == 'Type 13'
      || ex?.type == 'Type 14'
      || ex?.type == 'Type 15'
      || ex?.type == 'Type 16'
      || ex?.type == 'Type 17'
      || ex?.type == 'Type 18'
    ) {
       type = "mulchoice"
    }
    this.apiService.uploadfile(Number(this.selectedExercise), type, formData)
      .subscribe((data) => {       
        if (data == 'COMPLETED') {
          this.selectedExercise = ''
          alert('Data Upload Success!');         
        }         
    })
  }
}
