
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import LoginSerializer

from .serializers import CadastroSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def cadastrar_usuario(request):
    serializer = CadastroSerializer(data=request.data)

    if serializer.is_valid():
        usuario = serializer.save()

        return Response(
            {
                'mensagem': 'Usuário cadastrado com sucesso!',
                'usuario': {
                    'id': usuario.id,
                    'nome': usuario.first_name,
                    'email': usuario.email
                }
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )



class LoginView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data)
