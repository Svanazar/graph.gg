from django import forms
from django.core import validators
from graphapp.models import Node, SingleQuery


class FormName(forms.ModelForm):
    class Meta:
        model = Node
        fields = "__all__"

class SingleQueryForm(forms.ModelForm):
     class Meta:
        model = SingleQuery
        fields = "__all__"