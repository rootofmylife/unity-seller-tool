from datetime import datetime

from celery import shared_task
from celery.utils.log import get_task_logger

from unity.models import Email

logger = get_task_logger(__name__)

@shared_task
def mon_wed_task():
    now = datetime.now()
    current_month = now.strftime("%m")

    emails = Email.objects.filter(sub_date__month=current_month)

    logger.info('Number of emails: {}'.format(emails.count()))