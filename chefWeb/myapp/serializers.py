from rest_framework import serializers
from .models import JobsTable,ApplicationTable,MessageTable,ProfileTable

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model=ProfileTable
    fields="__all__"
  
class JobsTitleSerializer(serializers.ModelSerializer):
  class Meta:
    model=JobsTable
    fields=["title"]
class JobsSerializer(serializers.ModelSerializer):
  class Meta:
    model=JobsTable
    fields="__all__"
    
class ApplicationSerializer(serializers.ModelSerializer):
  class Meta:
    model=ApplicationTable
    fields="__all__"

class MessageSerializer(serializers.ModelSerializer):
  sender_profile=ProfileSerializer(read_only=True)
  receiver_profile=ProfileSerializer(read_only=True)
  class Meta:
    model=MessageTable
    fields=["id","user","sender","sender_profile","receiver","receiver_profile","message_content","sent_date","read_status"]