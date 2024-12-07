import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
   loading = new BehaviorSubject(false);
   loadingIndicator = this.loading.asObservable();
  constructor() { }
}
