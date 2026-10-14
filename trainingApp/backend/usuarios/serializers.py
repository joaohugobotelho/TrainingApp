
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


class CadastroSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(write_only=True)

    email = serializers.EmailField(required=True)

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    class Meta:
        model = User
        fields = ['id', 'nome', 'email', 'password']
        read_only_fields = ['id']

    def validate_email(self, value):
        email = value.strip().lower()

        if User.objects.filter(
            email__iexact=email
        ).exists():
            raise serializers.ValidationError(
                'Este e-mail já está cadastrado.'
            )

        return email

    def create(self, validated_data):
        nome = validated_data.pop('nome')
        email = validated_data.pop('email')
        senha = validated_data.pop('password')

        usuario = User.objects.create_user(
            username=email,
            email=email,
            password=senha,
            first_name=nome
        )

        return usuario

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs['email'].strip().lower()
        senha = attrs['password']

        usuario = authenticate(
            username=email,
            password=senha
        )

        if usuario is None or not usuario.is_active:
            raise serializers.ValidationError(
                'E-mail ou senha inválidos.'
            )

        refresh = RefreshToken.for_user(usuario)

        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'usuario': {
                'id': usuario.id,
                'nome': usuario.first_name,
                'email': usuario.email,
            }
        }
