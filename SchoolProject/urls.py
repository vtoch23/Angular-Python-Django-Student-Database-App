from django.contrib import admin
from StudentApp import views
from django.urls import path
from django.urls import re_path


urlpatterns = [
    re_path(r'^student$', views.studentApi, name='studentApi'),
    re_path(r'^student$', views.studentApi, name='studentApi'),
    re_path(r'^student/([0-9]+)$', views.studentApi, name='studentApi'),
    path('admin/', admin.site.urls),
]