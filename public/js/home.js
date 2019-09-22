const questions = document.querySelectorAll('#qc');
questions.forEach((question) =>  {
    let path = "/" + question.querySelector('#question').innerHTML;
    question.querySelector('#form').action = path;
})