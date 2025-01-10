import { TestBed } from '@angular/core/testing'

import { BackendDataService } from './backend-data.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'

describe('BackendDataService', () => {
  let service: BackendDataService
  let httpMock: HttpTestingController
  const baseURL = 'http://localhost:3000/api'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackendDataService],
    })
    service = TestBed.inject(BackendDataService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  describe('Service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy()
    })
  })

  describe('Upload file', () => {
    it('should upload file and get response', () => {
      const mockFile = new File([''], 'data.csv', { type: 'text/csv' })
      const mockRes = { message: 'File uploaded successfully' }

      service.uploadFile(mockFile).subscribe((res) => {
        expect(res).toEqual(mockRes)
      })

      const req = httpMock.expectOne(`${baseURL}/upload`)
      expect(req.request.method).toBe('POST')
      expect(req.request.body instanceof FormData).toBeTruthy()

      req.flush(mockRes)
    })
  })

  describe('Get Data', () => {
    it('should fetch data successfully', () => {
      const mockData = [
        {
          Car_id: 'C_CND_000004',
          Date: '1/2/2022 0:00',
          'Customer Name': 'Giselle',
          Gender: 'Male',
          'Annual Income': '13500',
          Dealer_Name: 'Chrysler of Tri-Cities',
          Company: 'Toyota',
          Model: 'Celica',
          Engine: 'Overhead Camshaft',
          Transmission: 'Manual',
          Color: 'Pale White',
          'Price ($)': '14000',
          'Dealer_No ': '99301-3882',
          'Body Style': 'SUV',
          Dealer_Region: 'Pasco',
        },
        {
          Car_id: 'C_CND_000005',
          Date: '1/2/2022 0:00',
          'Customer Name': 'Grace',
          Gender: 'Male',
          'Annual Income': '1465000',
          Dealer_Name: 'Chrysler Plymouth',
          Company: 'Acura',
          Model: 'TL',
          Engine: 'Double Overhead Camshaft',
          Transmission: 'Auto',
          Color: 'Red',
          'Price ($)': '24500',
          'Dealer_No ': '53546-9427',
          'Body Style': 'Hatchback',
          Dealer_Region: 'Janesville',
        },
      ]

      service.getData().subscribe((data) => {
        expect(data).toEqual(mockData)
      })

      const req = httpMock.expectOne(`${baseURL}/data`)
      expect(req.request.method).toBe('GET')

      req.flush(mockData)
    })
  })
})
