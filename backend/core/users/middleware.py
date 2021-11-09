from django.contrib.auth import get_user, get_user_model
from django.db.models import QuerySet
from django.utils.functional import SimpleLazyObject
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken

User = get_user_model()


class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.user = SimpleLazyObject(lambda: self.__class__.get_jwt_user(request))
        return self.get_response(request)

    @staticmethod
    def get_jwt_user(request) -> QuerySet[User]:
        """Gets and returns the user from the JWT token"""
        user = get_user(request)
        jwt_token = request.GET.get("jwt_token")
        if user.is_authenticated or not jwt_token:
            return user
        jwt_authentication = JWTTokenUserAuthentication()
        try:
            validated_token = jwt_authentication.get_validated_token(jwt_token)
            token_user = jwt_authentication.get_user(validated_token)
            return User.objects.get(id=token_user.id)
        except InvalidToken:
            return user
