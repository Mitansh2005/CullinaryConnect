import graphene
from graphene_django import DjangoObjectType
from myapp.views import jobsfakeData
from .models import JobsTable

class JobsTableType(DjangoObjectType):
    class Meta:
        model = JobsTable
        fields="__all__"

class Query(graphene.ObjectType):
    all_jobs = graphene.List(JobsTableType)

    def resolve_all_jobs(self,info):
        return JobsTable.objects.all()

schema = graphene.Schema(query=Query)