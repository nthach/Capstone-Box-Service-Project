from django.urls import path, include
from subscription import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<
#http://127.0.0.1:8000/api/subscription/
#http://127.0.0.1:8000/api/subscription/subscription_details/
urlpatterns = [
    path('', views.get_all_subscription),
    path('subscription_details/', views.user_subscription),
]
