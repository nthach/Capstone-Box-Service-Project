from django.urls import path, include
from cars import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<
# urls.py contains url endpoints for this tables data, is use for accessing the front end data.

urlpatterns = [
    path('', views.user_cars),
    path('all/', views.get_all_cars),
]
