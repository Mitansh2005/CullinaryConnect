import graphene
from graphene_django import DjangoObjectType
from .models import JobsTable

class JobsTableType(DjangoObjectType):
    job_id = graphene.Int()  # Explicitly define job_id as a field
    class Meta:
        model = JobsTable
        fields=("user_id","job_id","title","description","location","salary","employment_type","posted_date","application_deadline","requirements")

class Query(graphene.ObjectType):
    all_jobs = graphene.List(JobsTableType)

    def resolve_all_jobs(self,info):
        return JobsTable.objects.all()

schema = graphene.Schema(query=Query)