import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { root_endpoint } from "../../../enpoint";
@Injectable({
  providedIn: 'root'
})
export class TimerService {
  ticks: any;
  user: Observable<number>;
  id_user: number;
  seconds:any;
  timer: Observable<number> = Observable.timer(0, 1000);
  _subscriptionTimer: Subscription;
  _subsIdUser: Subscription;
  active: boolean = true
  paused: boolean = false
  stopTime: any;
  timeTracked: number;
  constructor(
    private http: HttpClient,
  ) { }
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };





  count(n: number) {

    this._subscriptionTimer = this.timer.subscribe(t => {
      console.log(n);
      if (this.active && !this.paused) {
        this.ticks = this.transform(t)
        this.seconds = t;

      } else {
        this.ticks = this.transform(n + t)
        this.seconds = n+t;
      }
      //hacelo desde el complemento
      console.log(this.seconds);

    });
    return this.ticks;
  }

  transform(value: number): string {
    let totalSeconds = value;
    let hours: any = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes: any = Math.floor(totalSeconds / 60);
    let seconds: any = totalSeconds % 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    return hours + ":" + minutes + ":" + seconds

  }

  resumeTimer() {
    this.paused = false;
    this.ticks=0;
    this._subscriptionTimer.unsubscribe();
    console.log(this.timeTracked);
    this.count(this.seconds);
  }

  pauseTimer() {
    this.paused = true;
    this.timeTracked = this.seconds;
    console.log(this.seconds);
    this._subscriptionTimer.unsubscribe();
  }

  getTime() { //stop
    //const stopAtSeconds = this.ticks;
    this.active = false
    if (!this.paused) this.timeTracked = this.ticks;
    this.paused = false
    console.log(this.timeTracked);
    this._subscriptionTimer.unsubscribe();
    return this.stopTime;
  }



  playTarea(id_tarea: number, id_user: number) {
    let url = root_endpoint + "play_tarea.php";
    let j = { id_tarea: id_tarea, id_user: id_user };
    let body = JSON.stringify(j);
    const req = this.http.post<any>(url, body, this.httpOptions).subscribe(
      res => { console.log(res); });
    req.unsubscribe();
  }

  resumeTarea(id_user: number) {
    let url = root_endpoint + "resume_tarea.php?id_user=" + id_user;
    return this.http.get<any>(url);
  }

  stopTarea(id_user: number) {
    let url = root_endpoint + "stop_tarea.php?id_user=" + id_user;
    let body = JSON.stringify(id_user);
    const req = this.http.post<any>(url, body, this.httpOptions).subscribe(
      res => { console.log(res); });
    req.unsubscribe();
  }

  teest() {
    let url = root_endpoint + "zTest.php";
    return this.http.get<any>(url);
  }
}
