
function searchTerms(){
    $('.searchRow').removeClass("d-none");
    event.preventDefault();
}
      
    // Get the input field
$(document).ready(function(){    
    var input = document.getElementById("search-text");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        var termToSearch = $('#search-text').val();
        var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +termToSearch + '&limit=10&namespace=0&redirects=return&format=json&callback=?';

        $.ajax({
            type: "GET",
            url:url,
            dataType: "jsonp",
            async: false,
            success: function(data){
                processData(data);
            },
            error: function (errorMessage) {
                $('#response').html('<div class="row justify-content-center title"><h1>An error occurred...</h1></div>');
            }
        })
    }
    });
});

function dash(){
    $('#response').html("");
    $('#article').html("");
    $('.searchRow').addClass("d-none");
    $('#search-text').val("");

}

function processData(data){
    console.log(data);
    dash();
    if(Array.isArray(data) &&  data[1].length===0){
        $('#response').html('<div class="row justify-content-center title"><h1>Not found! :-(</h1></div>');
    }
    else if(Array.isArray(data)){
        for (var i=0; i<data[1].length; i++){
            var result = '<div class="row"><div class="col-12" style="background-color:#FFC9B4; color:#8D4D44">'+
            '<h4 style="cursor: pointer"><a onclick=open_link("'+data[3][i]+'");>'+data[1][i]+'</a></h4>'+
            '<p>'+data[2][i]+'</p></br></div></div>';
        $('#response').append(result);    
        } 
    }  
    else{
        $('#response').html('<div class="row justify-content-center title"><h1>An error occurred...'+
        '<br>Please insert the term you want to search in the input field</h1></div>');
        $('.searchRow').removeClass("d-none");


    }
}

 function open_link(link){
    console.log(link);
    dash();
    $('#article').append('<div class="embed-responsive embed-responsive-16by9">'+
    '<iframe class="embed-responsive-item" name="article" src='+link+' allowfullscreen></iframe></div>'
    );
} 