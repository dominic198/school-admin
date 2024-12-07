import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.apiurl;
  constructor(private http: HttpClient) { }

  getAllLessons(lang: string, level: string): Observable<any> {
    return this.http.get(this.baseUrl+"lessons/getAllLessons/" + lang + "/" + level);
  }

  addNewLsson(name: string, lang: string, level: string): Observable<any>  {
    return this.http.post(this.baseUrl + "lessons/addNewLesson", JSON.stringify({ name, lang, level }));
  }

  updateLesson(name: string, lnid: number): Observable<any> {
    return this.http.post(this.baseUrl + "lessons/updateLesson/" + lnid + "/" + name, {});
  }

  getAllExercises(lessonid: number): Observable<any> {
    return this.http.get(this.baseUrl + `lessons/getAllExercises/${lessonid}`);
  }

  addNewExercise(lnid: number, type: string, name: string): Observable<any> {
    return this.http.post(this.baseUrl + "lessons/addNewExercise", JSON.stringify({ name, lnid, type }));
  }

  updateExercise(exid: number, type: string, name: string): Observable<any> {
    return this.http.post(this.baseUrl + "lessons/updateExercise/" + exid + "/" + type + "/" + name, {});
  }

  deleteExercise(exid: number): Observable<any> {
    return this.http.post(this.baseUrl + "lessons/deleteExercise/" + exid, {});
  }

  uploadfile(exid: number, type: string, data:any): Observable<any>  {
    return this.http.post(this.baseUrl + "upload/" + type + "/" + exid, data);
  }

}
