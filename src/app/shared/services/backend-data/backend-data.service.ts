import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class BackendDataService {
  private baseUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file)
    return this.http.post(`${this.baseUrl}/upload`, formData)
  }

  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/data`)
  }
}
