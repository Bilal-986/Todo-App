from turtle import mode, title
from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length = 30)
    description = models.TextField()
    due_time = models.DateTimeField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
