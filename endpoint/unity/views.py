from datetime import datetime

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from unity.models import Email
from unity.serializers import EmailSerializer

# Create your views here.
@csrf_exempt
@api_view(['GET', 'POST'])
def push(request):
    if request.method == 'POST':
        if len(request.data['email']) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        email = Email(email=request.data['email'])
        email.save()
        return JsonResponse(EmailSerializer(email).data, safe=False)
    elif request.method == 'GET':
        emails = Email.objects.all().order_by('sub_date__year', 'sub_date__month', 'sub_date__day', 'sub_date__hour', 'sub_date__minute').reverse()
        
        ret = {
            'count': Email.objects.count(),
            'data': EmailSerializer(emails, many=True).data
        }
        return JsonResponse(ret, safe=False)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET'])
def get_email_by_month(request):
    if request.method == 'GET':
        # get current month
        now = datetime.now()
        current_month = now.strftime("%m")

        emails = Email.objects.filter(sub_date__month=current_month)

        ret = {
            'data': emails.count(),
        }
        return JsonResponse(ret, safe=False)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)