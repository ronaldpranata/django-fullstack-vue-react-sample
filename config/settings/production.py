from .base import *

# Production-specific assertions
DEBUG = False

# Ensure secure settings
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_SSL_REDIRECT = env.bool('SECURE_SSL_REDIRECT', default=True)

# Session and CSRF cookies should be secure in production
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
