import { Injectable } from '@angular/core';
import { IMovie, IMovieDetail } from '../models/imovie';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http:HttpClient) { }


  getUpComingMovies(): Observable<IMovie>{
    return this.http.get<IMovie>("https://imdb-api.com/en/API/ComingSoon/k_ftjdt05t")
  }

  getMovies(): Observable<IMovie>{
    return this.http.get<IMovie>("https://imdb-api.com/en/API/InTheaters/k_ftjdt05t")
  }

}
