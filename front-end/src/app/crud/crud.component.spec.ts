import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudComponent } from './crud.component';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('CrudComponent', () => {
  let component: CrudComponent;
  let fixture: ComponentFixture<CrudComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClient,
        provideHttpClientTesting
      ]
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudComponent);
    component = new CrudComponent(TestBed.inject(HttpClient));
  })

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should save a new student and update the list of students', () => {
    component.name = 'John';
    component.address = 'USA';
    component.fee = 500;

    component.saveRecords();

    const postReq = httpMock.expectOne('http://127.0.0.1:8000/student');
    expect(postReq.request.method).toBe('POST');
    postReq.flush({});

    const getReq = httpMock.expectOne('http://127.0.0.1:8000/student');
    expect(getReq.request.method).toBe('GET');
    getReq.flush([{ id: 1, name: 'John', address: 'USA', fee: 500 }]);

    expect(component.StudentArray.length).toBe(1);
    expect(component.StudentArray[0].name).toBe('John');
  });

  it('should fetch all students', () => {
    component.getAllStudents();

    const req = httpMock.expectOne('http://127.0.0.1:8000/student');
    expect(req.request.method).toBe('GET');
    
    const mockStudents = [
      { id: 1, name: 'John', address: 'USA', fee: 500 },
      { id: 2, name: 'Jane', address: 'Canada', fee: 600 }
    ];
    req.flush(mockStudents);

    expect(component.StudentArray.length).toBe(2);
    expect(component.StudentArray).toEqual(mockStudents);
  });

  it('should update an existing student', () => {
    component.name = 'John';
    component.address = 'USA';
    component.fee = 500;
    component.currentStudentID = '1';

    component.UpdateRecords();

    const putReq = httpMock.expectOne('http://127.0.0.1:8000/student/1');
    expect(putReq.request.method).toBe('PUT');
    putReq.flush({});

    const getReq = httpMock.expectOne('http://127.0.0.1:8000/student');
    expect(getReq.request.method).toBe('GET');
    getReq.flush([{ id: 1, name: 'John', address: 'USA', fee: 500 }]);

    expect(component.StudentArray.length).toBe(1);
  });

  it('should delete a student and update the list', () => {
    const studentData = { id: 1, name: 'John', address: 'USA', fee: 500 };

    component.setDelete(studentData);

    const deleteReq = httpMock.expectOne('http://localhost:8000/student/1');
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({});

    const getReq = httpMock.expectOne('http://127.0.0.1:8000/student');
    expect(getReq.request.method).toBe('GET');
    getReq.flush([]);

    expect(component.StudentArray.length).toBe(0);
  });
});
