const questions = document.querySelectorAll('#qc');
questions.forEach((question) =>  {
    let path = "/question/" + question.querySelector('#question').innerHTML;
    question.querySelector('#view').href = path;
})