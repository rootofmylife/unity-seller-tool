from dataclasses import field
from rest_framework import serializers

from unity.models import Email

class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ['id', 'email', 'sub_date']