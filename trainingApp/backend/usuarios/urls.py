from django.urls import path
from .views import cadastrar_usuario, LoginView
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path(
        'cadastro/', cadastrar_usuario, name='cadastro'
    ),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]