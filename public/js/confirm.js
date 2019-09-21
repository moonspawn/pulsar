let form = document.getElementById('form')

form.addEventListener("submit", function() {
    url = window.location.href.split('/')
    url.pop()
    form.action = url.join('/')
})
