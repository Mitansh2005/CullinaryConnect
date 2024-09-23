from rest_framework import serializers
from .models import JobsTable,ApplicationTable,MessageTable,ProfileTable,Countries
import pycountry
class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model=ProfileTable
    fields="__all__"  
    
class CountriesSerializer(serializers.ModelSerializer):
  country_name = serializers.SerializerMethodField()  # Add custom field for country name
  class Meta:
      model = Countries
      fields = ['country','country_name', 'state', 'city', 'postal_code']
  def get_country_name(self, obj):
    try:
       # Convert country code to country name
      country_name_id= pycountry.countries.get(alpha_2=obj.country).name
      return country_name_id
    except AttributeError:
      return obj.country  # Return code if conversion fails
class JobsTitleSerializer(serializers.ModelSerializer):
  class Meta:
    model=JobsTable
    fields=["title"]
class JobsSerializer(serializers.ModelSerializer):
  location=CountriesSerializer()
  class Meta:
    model=JobsTable
    fields=['user_id','job_id', 'title', 'description', 'location', 'salary', 'employment_type', 'posted_date', 'application_deadline', 'requirements']
    
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