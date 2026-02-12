// get API data
function getAdvice () {
    $.ajax({
        url: '../libs/php/getAdvice.php',
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            let resultCode = result.status.code;

            // empty advice
            $('#advice-text').html("");
            
            if (resultCode == 200) {
                console.log(result);
                // assign advice
                let adviceData = result.data.advice;
                let adviceElement = document.createElement('strong');
                adviceElement.textContent = adviceData;
                
                // display advice
                $('#advice-text').append(adviceElement);
            } else {
                // set error message
                let errorText = 'Error fetching a good advice';
                let errorDisplay = document.createElement('strong');
                errorDisplay.innerText = errorText;
                
                // display error message
                $('#advice-text').append(errorDisplay);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#advice-text').text('Error retrieving data');            
        }
    })
}

// handle button interaction
$('#generator-button').click(getAdvice);

$('#advice-text').keyup(getAdvice());

// handle wait for response time