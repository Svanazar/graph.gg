from django.conf.urls import url
from graphapp import views


urlpatterns = [
    url(r"^formpage/", views.form_name_view, name="form_name_view"),
    url(r"^reactdata/", views.collect_from_react, name="collect_from_react"),
    url(r"^bollymovies/", views.bollymovies, name="bollymovies"),
    url(r"^mutuals/", views.collect_mutuals, name="collect_mutuals"),
    url(r"^collect-all/", views.collect_all, name="collect_all"),
    url(r"^collect-bolly/", views.collect_bolly, name="collect_bolly"),
    url(r"^adduser/", views.adduser, name="adduser"),
    url(r"^nametolink/", views.collect_node_given_name, name="nametolink"),
    url(r"^friendrecs/", views.friendrecs, name="friendrecs"),
]

