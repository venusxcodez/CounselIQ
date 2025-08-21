from django.contrib import admin
from .models import College, SavedCollege

# Register your models here.
@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = ('name', 'rating', 'fees', 'location', 'stream', 'exam')
    list_filter = ('stream', 'exam')
    search_fields = ('name', 'location')
    ordering = ('-rating', 'name')

@admin.register(SavedCollege)
class SavedCollegeAdmin(admin.ModelAdmin):
    list_display = ('user','college','saved_at')
    list_filter = ('saved_at', 'user')
    search_fields = ('user__username', 'college__name')