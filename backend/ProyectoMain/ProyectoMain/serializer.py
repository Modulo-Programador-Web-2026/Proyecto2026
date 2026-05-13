from rest_framework import serializers

class TestSerializer(serializers.Serializer):
    status = serializers.CharField()
    message = serializers.CharField()
    version = serializers.CharField()