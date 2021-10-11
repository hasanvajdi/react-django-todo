from django.db import models
import uuid
import jdatetime
from datetime import datetime
from django.contrib.auth.models import User



class Todo(models.Model):
    uuid            = models.UUIDField(primary_key=True, 
                                    editable=False,
                                    default=uuid.uuid4
                                    )
    title           = models.CharField(max_length=200, blank=False)
    description     = models.TextField(blank=False, null = True)
    category        = models.CharField(max_length=200, blank = True, null = True)
    date            = models.CharField(max_length=200, blank=True, default=jdatetime.datetime.now().date())
    time            = models.CharField(max_length=200, blank=True, default=datetime.now().time())
    user            = models.ForeignKey(User, on_delete=models.CASCADE)

    
    def time(self):
        number = ":".join(str(self.time).split(":")[:2])

        en_num = {
            "0" : "۰",
            "1" : "۱",
            "2" : "۲",
            "3" : "۳",
            "4" : "۴",
            "5" : "۵",
            "6" : "۶",
            "7" : "۷",
            "8" : "۸",
            "9" : "۹"
        }

        new_number = ""

        for i in str(number):
            try:
                new_number += en_num[i]
            except KeyError:
                new_number += i

        return new_number
        
    def date(self):
        number =  (str(self.date)).replace("-", "/")

        en_num = {
            "0" : "۰",
            "1" : "۱",
            "2" : "۲",
            "3" : "۳",
            "4" : "۴",
            "5" : "۵",
            "6" : "۶",
            "7" : "۷",
            "8" : "۸",
            "9" : "۹"
        }

        new_number = ""

        for i in str(number):
            try:
                new_number += en_num[i]
            except KeyError:
                new_number += i

        return new_number




class Category(models.Model):
    uuid    = models.UUIDField(editable = False, primary_key=True, default=uuid.uuid4)
    name    = models.CharField(max_length=200)
    count   = models.IntegerField(null = True, blank = True, default= 0)
    user    = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "which_user", null = True, blank = True)
    pinned  = models.BooleanField(default = False)
    todo    = models.ForeignKey(Todo, on_delete=models.CASCADE, related_name = "whic_todo", null = True, blank = True)
    date    = models.DateTimeField(auto_now_add = True, blank = True, null = True)


    class Meta:
        ordering = ["-pinned", "date"]