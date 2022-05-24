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


  getMovies(): Observable<IMovie>{
    
    return this.http.get<IMovie>("https://imdb-api.com/en/API/ComingSoon/k_j23hl6gg")
  }

}
