$(document).ready(function()    {

    $( "#searchform" ).submit(function( event ) {
        // Stop form from submitting normally
        event.preventDefault();
        var $form = $( this ),
          term = $form.find( "#search" ).val()
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {s : term},
            url: '/search',
            success: function(searchresults) {
                createDivs(searchresults)
            }
        }).then($('#searchbtn').popover({title:"results",
                                        content: () => {return $('#popover-content').html()},
                                        html: true,
                                        placement: "bottom",
                                        animation: false}))
    })
    
    
    
    
    function createDivs(searchresults)   {
        $('#popover-content').html("")
        searchresults.forEach((searchresult) => {
            $('#popover-content').append(`<div id="qc" class="card bg-light border-primary w-100 ">
                                            <div class="card-body">
                                                <p id="question" class="card-text">${searchresult.question}</p>
                                                <a id="view" href="/question/${searchresult.question}" class="stretched-link float-right" role="button">view</a>
                                            </div>
                                        </div>`)

        })
    }
})

