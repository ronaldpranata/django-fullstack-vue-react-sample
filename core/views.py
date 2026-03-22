from django.shortcuts import render

def index(request):
    """Render the main SPA frontend using Web Components."""
    return render(request, 'index.html')
