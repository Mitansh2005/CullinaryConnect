from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser,ProfileTable,Countries,JobsTable,ApplicationTable,MessageTable,NotificationTable
from django.utils.html import format_html
# Register your models here.

class UserAdmin(BaseUserAdmin):
    model = CustomUser
    list_display=["user_id","email","first_name","last_name","phone_number","profile_picture","user_type","is_staff"]
    fieldsets = (
    (None, {'fields': ('email', 'password')}),
    ('Personal info', {'fields': ('first_name', 'last_name', 'phone_number', 'profile_picture', 'user_type')}),
    ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    ('Important dates', {'fields': ('last_login',)}),
    )
    
    add_fieldsets = (
    (None, {
        'classes': ('wide',),
        'fields': ('email', 'password1', 'password2', 'user_type','profile_picture','is_staff', 'is_active')}
    ),
    )
    readonly_fields=('date_joined',)
    search_fields = ('email', 'first_name', 'last_name', 'user_type')
    ordering = ('email', 'date_joined')
    def profile_picture_tag(self, obj):
        if obj.profile_picture:
            return format_html('<img src="{}" style="height:50px;width:50px;object-fit:cover;" />', obj.profile_picture.url)
        return "No Image"
    profile_picture_tag.short_description = 'Profile Picture'
 
class ProfileAdmin(admin.ModelAdmin):
  list_display=["profile_id","user_id","first_name","last_name","location","bio","experience_years","speciality"]


class LocationAdmin(admin.ModelAdmin):
  list_display=["country","state","city","postal_code"]

class JobAdmin(admin.ModelAdmin):
  list_display=["user_id","job_id","title","description","location","salary","employment_type","posted_date","application_deadline","short_description"]
  def short_description(self, obj):
        length = 100  # Adjust this value to your desired length
        return (obj.description[:length] + '...') if len(obj.description) > length else obj.description
  short_description.short_description = 'requirements'

class ApplicationAdmin(admin.ModelAdmin):
  list_display=["application_id","job_id","applicant_id","application_date","status"]

class MessageAdmin(admin.ModelAdmin):
  list_display=["user","sender","receiver","message_content","sent_date","read_status"]
  
class NotificationAdmin(admin.ModelAdmin):
  list_display=["notification_id","user_id","notification_type","message","sent_date","read_status"]
  
  
  
  
  
  
admin.site.register(ProfileTable,ProfileAdmin)
admin.site.register(CustomUser,UserAdmin)
admin.site.register(Countries,LocationAdmin)
admin.site.register(JobsTable,JobAdmin)
admin.site.register(ApplicationTable,ApplicationAdmin)
admin.site.register(MessageTable,MessageAdmin)
admin.site.register(NotificationTable,NotificationAdmin)

