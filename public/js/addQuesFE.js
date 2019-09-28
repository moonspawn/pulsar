let question = document.getElementById('exampleFormControlTextarea1')
question.addEventListener("change", () => {
    document.getElementById('f').action = "/question/"+question.value
});
