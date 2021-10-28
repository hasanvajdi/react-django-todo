from rest_framework.permissions import BasePermission


class IsAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)


class IsAuthor(BasePermission):

    def has_object_permission(self, request, view, obj):
        return bool(request.user == obj.user or request.user.is_superuser)