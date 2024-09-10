from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt
from django.conf.urls.static import static
from django.conf import settings
from graphene_django.views import GraphQLView
urlpatterns = [
  path("jobs",views.JobsList.as_view(),name="all_jobs"),
  # path("jobs_titles",views.JobsTitle,name="job-titles"),
  path("jobs_detail",views.JobsDetail.as_view(),name="job_details_update"),
  path("application",views.ApplicationsList.as_view(),name="all_applications"),
  path("application_detail",views.ApplicationsDetail.as_view(),name="application_details_update"),
  path("messages/<user_id>/",views.Message.as_view(),name="messages_operations"),
  path("get_messages/<sender_id>/<receiver_id>/",views.GetMessages.as_view(),name="get_messages_user"),
  path("send_messages",views.SendMessage.as_view(),name="send_message"),
  path("profile_detail/<int:pk>/",views.ProfileDetail.as_view(),name="get_profile"),
  path("search/<username>/",views.SearchUser.as_view(),name="search_user"),
  path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
