from django.db import models
from country_list import countries_for_language
# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    EMPLOYER = 'employer'
    EMPLOYEE = 'employee'

    USER_TYPE_CHOICES = [
        (EMPLOYER, 'Employer'),
        (EMPLOYEE, 'Employee'),
    ]
    
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=500)
    password = models.CharField(max_length=128)
    email = models.EmailField(max_length=254, unique=True)  # Ensure unique=True is set here
    phone_number = models.CharField(max_length=15)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default=EMPLOYEE)
    date_joined = models.DateField(auto_now_add=True,editable=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
  
class Countries(models.Model):
  countries = dict(countries_for_language('en'))
  country=models.CharField(max_length=2,choices=countries)
  state=models.CharField(max_length=150)
  city=models.CharField(max_length=150)
  postal_code=models.CharField(max_length=10)
  
  def __str__(self) -> str:
    return f"{self.country}\t{self.state}\t{self.city}\t{self.postal_code}"
    
class ProfileTable(models.Model):
 
  profile_id=models.AutoField(primary_key=True)
  user_id=models.OneToOneField(CustomUser,on_delete=models.CASCADE)
  first_name=models.CharField(max_length=150)
  last_name=models.CharField(max_length=150)
  location=models.ForeignKey(Countries,on_delete=models.SET_NULL,null=True)
  bio=models.TextField(max_length=500)
  experience_years=models.CharField(max_length=2)
  speciality=models.CharField(max_length=250)

class JobsTable(models.Model):
  EMP_TYPES=(
    ("full","full_time"),
    ("part","part_time")
  )
  user_id=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
  job_id=models.AutoField(primary_key=True)
  title=models.CharField(max_length=200)
  description=models.TextField(max_length=250)
  location=models.ForeignKey(Countries,on_delete=models.CASCADE)
  salary=models.BigIntegerField()
  employment_type=models.CharField(max_length=5,choices=EMP_TYPES)
  posted_date=models.DateField()  
  application_deadline=models.DateField()
  requirements=models.TextField(max_length=65535)
  
  def __str__(self) -> str:
    return f"{self.title}"

class ApplicationTable(models.Model):
  STATUS=(
    ("p","pending"),
    ("a","accepted"),
    ("r","rejected")
  )
  application_id=models.AutoField(primary_key=True)
  job_id=models.ForeignKey(JobsTable,on_delete=models.CASCADE)
  applicant_id=models.ForeignKey(CustomUser,models.CASCADE)
  application_date=models.DateField()
  status=models.CharField(max_length=1,choices=STATUS)
  
  class Meta:
        constraints = [
            models.UniqueConstraint(fields=['job_id', 'applicant_id'], name='unique_job_application')
        ]

class MessageTable(models.Model):
  user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="user")
  sender = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="sender")
  receiver = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="receiver")
  message_content=models.TextField(max_length=65535)
  sent_date=models.DateField(auto_now_add=True)
  read_status=models.BooleanField(default=False)
  
  class Meta:
    ordering=['sent_date']
  def __str__(self):
        return f"{self.sender} - {self.receiver}"

  @property
  def sender_profile(self):
    sender_profile=ProfileTable.objects.get(user_id=self.sender)
    return sender_profile
  @property
  def receiver_profile(self):
    receiver_profile=ProfileTable.objects.get(user_id=self.receiver)
    return receiver_profile
  
class NotificationTable(models.Model):
  NOTIFICATION_TYPE=(
    ("new_job","new job"),
    ("application_status","application status")
  )
  notification_id=models.AutoField(primary_key=True)
  user_id=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
  notification_type=models.CharField(max_length=50,choices=NOTIFICATION_TYPE)
  message=models.TextField(max_length=1500)
  sent_date=models.DateField()
  read_status=models.BooleanField(default=False)
  
  
