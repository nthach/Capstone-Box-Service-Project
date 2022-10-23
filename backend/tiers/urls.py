from django.urls import path, include
from tiers import views



#<<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<
# urls.py contains url endpoints for this tables data, is use for accessing the front end data.




urlpatterns = [
    path('', views.get_all_tiers),
    path('tiers/', views.user_tiers),
]
