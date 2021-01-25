from django.shortcuts import render
from . import forms

# Create your views here.
def index(request):
    return render(request, "graphapp/index.html")


def form_name_view(request):
    form = forms.FormName()

    if request.method == "POST":
        form = forms.FormName(request.POST)

        if form.is_valid():
            print("validated")

    return render(request, "graphapp/form_page.html", {"form": form})

