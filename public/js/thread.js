var path = '/' + document.getElementById('question').innerHTML

for (const btn of document.querySelectorAll('.upvote')) {
  btn.addEventListener('click', event => {
    if(event.target.classList.toggle('on'))  {
      let upvotes = document.getElementById('upvotes').innerHTML = parseInt(document.getElementById('upvotes').innerHTML) + 1
      $.post(path, { upvotes:  upvotes});
    }
    else  {
      let upvotes = document.getElementById('upvotes').innerHTML = parseInt(document.getElementById('upvotes').innerHTML) - 1
      $.post(path, { upvotes:  upvotes});
    }
  });
}

for (const btn of document.querySelectorAll('.downvote')) {
  btn.addEventListener('click', event => {
    if(event.target.classList.toggle('on')) {
      let downvotes = document.getElementById('downvotes').innerHTML = parseInt(document.getElementById('downvotes').innerHTML) + 1
      $.post(path, { downvotes:  downvotes});
    }
    else  {
      let downvotes = document.getElementById('downvotes').innerHTML = parseInt(document.getElementById('downvotes').innerHTML) - 1
      $.post(path, { downvotes:  downvotes});
    }
  });
}

document.getElementById("reply").href = window.location.href+ "/post"