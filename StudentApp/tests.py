from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from unittest.mock import patch
from StudentApp.models import Student
from StudentApp.serializers import StudentSerializer

class StudentApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.student_data = {
            'name': 'John Doe',
            'address': '123 Street',
            'fee': 5000
        }
        self.student = Student.objects.create(**self.student_data)

    def test_get_students(self):
        response = self.client.get(reverse('studentApi'))

        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), serializer.data)

    def test_post_student(self):
        new_student_data = {
            'name': 'Jane Doe',
            'address': '456 Street',
            'fee': 3000
        }

        response = self.client.post(reverse('studentApi'), new_student_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), "Added Successfully")
        
        student_exists = Student.objects.filter(name='Jane Doe').exists()
        self.assertTrue(student_exists)

    def test_put_student(self):
        updated_data = {
            'name': 'John Updated',
            'address': '789 Updated Street',
            'fee': 7000
        }

        response = self.client.put(reverse('studentApi', args=[self.student.id]), updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), "Updated Successfully")

        self.student.refresh_from_db()
        self.assertEqual(self.student.name, updated_data['name'])
        self.assertEqual(self.student.address, updated_data['address'])
        self.assertEqual(self.student.fee, updated_data['fee'])

    def test_delete_student(self):
        response = self.client.delete(reverse('studentApi', args=[self.student.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), "Deleted Successfully")

        student_exists = Student.objects.filter(id=self.student.id).exists()
        self.assertFalse(student_exists)
