from django.contrib.auth.models import Permission  # Only needed if you're using permissions manually
from rest_framework import viewsets, permissions
from .models import Todo
from .serializers import TodoSerializer

# ✅ This ViewSet provides all CRUD (Create, Read, Update, Delete) automatically
class TodoViewSet(viewsets.ModelViewSet):  # ← ✅ Must inherit from ModelViewSet
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only logged-in users can access

    # ✅ Limit todos to the currently logged-in user
    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    # ✅ Automatically assign the todo to the logged-in user
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
