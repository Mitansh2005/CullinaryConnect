from .serializers import JobsSerializer,ApplicationSerializer,MessageSerializer,ProfileSerializer
from .models import JobsTable,MessageTable,ProfileTable,ApplicationTable
from django.db.models import Subquery,OuterRef,Q
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User 
# Create your views here.
# This views does CRUD operations on the JobsTable
class JobsList(generics.ListCreateAPIView):
    queryset=JobsTable.objects.all()
    serializer_class=JobsSerializer
    # permission_classes=[IsAuthenticated]
class JobsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=JobsTable.objects.all()
    serializer_class=JobsSerializer
    permission_classes=[IsAuthenticated]
   # This view does the CRUD operations on the ApplicationsTable
class ApplicationsList(generics.ListCreateAPIView):
    queryset=ApplicationTable.objects.all()
    serializer_class=ApplicationSerializer
    permission_classes=[IsAuthenticated]
class ApplicationsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=ApplicationTable.objects.all()
    serializer_class=ApplicationSerializer
    permission_classes=[IsAuthenticated]
    
# This view deals with retrieve messages, sending messages, getting messages
class Message(generics.ListAPIView):
    serializer_class=MessageSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        user_id=self.kwargs["user_id"]  
        messages=MessageTable.objects.filter(
            id__in=Subquery(
                User.objects.filter(
                    Q(sender__receiver=user_id)|
                    Q(receiver__sender=user_id)
                    ).distinct().annotate(
                        last_msg=Subquery(
                            MessageTable.objects.filter(
                                Q(sender=OuterRef('pk'),receiver=user_id)|
                                Q(receiver=OuterRef('pk'),sender=user_id)
                            ).order_by("-id")[:1].values_list("id",flat=True)
                        )
                    ).values_list("last_msg",flat=True).order_by("-id")
                )
            ).order_by("-id")
        return messages

class GetMessages(generics.ListAPIView):
    serializer_class=MessageSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        sender_id=self.kwargs["sender_id"]
        receiver_id=self.kwargs["receiver_id"]
        
        message=MessageTable.objects.filter(
            sender__in=[sender_id,receiver_id],
            receiver__in=[sender_id,receiver_id]
        ).order_by('-sent_date')
        return message

class SendMessage(generics.CreateAPIView):
    serializer_class=MessageSerializer
    permission_classes=[IsAuthenticated]

# This view helps in retrieving details of a particular profile
class ProfileDetail(generics.RetrieveUpdateAPIView):
    serializer_class=ProfileSerializer
    queryset=ProfileTable.objects.all()
    permission_classes=[IsAuthenticated]
    

class SearchUser(generics.ListAPIView):
    serializer_class=ProfileSerializer
    queryset=ProfileTable.objects.all()
    permission_classes=[IsAuthenticated]
    
    def list(self, request, *args, **kwargs):
        username=self.kwargs['username']
        logged_in_user=self.request.user
        
        users=ProfileTable.objects.filter(
            Q(user_id__username__icontains=username)|
            Q(last_name__icontains=username)|
            Q(first_name__icontains=username)|
            Q(user_id__email__icontains=username)&
            ~Q(user_id=logged_in_user)
        )
        if not users.exists():
            return Response(
                {"detail":"No user was found with that username"},
                status=status.HTTP_404_NOT_FOUND
            )
            
        serializer=self.get_serializer(users,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    