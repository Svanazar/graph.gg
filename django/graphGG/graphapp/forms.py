from django import forms
from django.core import validators


class FormName(forms.Form):
    name1 = forms.CharField()
    name2 = forms.CharField()
    botcatcher = forms.CharField(
        required=False,
        widget=forms.HiddenInput,
        validators=[validators.MaxLengthValidator(0)],
    )
