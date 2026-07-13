const target = new URL('/frontend/pages/ai-config-preview.html', window.location.origin);
target.search = window.location.search;
window.location.replace(target);
