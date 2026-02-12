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
            // empty ad number
            $('#advice-number').html("");
            
            if (resultCode == 200) {
                // assign ad number
                let adviceNumData = result.data.id;
                let adviceNumElement = document.createElement('strong');
                adviceNumElement.textContent = 'advice #' + adviceNumData;


                // assign advice
                let adviceData = result.data.advice;
                let adviceElement = document.createElement('strong');
                adviceElement.textContent = '"' + adviceData + '"';
                
                // display ad number
                $('#advice-number').append(adviceNumElement);

                // display advice
                $('#advice-text').append(adviceElement);
            } else {
                // set error message
                let errorTitleText = 'Error';
                let errorTitleDisplay = document.createElement('strong');
                errorTitleDisplay.innerText = errorTitleText;
                errorTitleDisplay.style.color = "red";

                let errorText = 'Error fetching a good advice';
                let errorDisplay = document.createElement('strong');
                errorDisplay.innerText = errorText;
                
                // display error message
                $('#advice-number').append(errorTitleDisplay);
                $('#advice-text').append(errorDisplay);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#advice-number').text('Error');
            $('#advice-number').css('color', 'red');
                        
            $('#advice-text').text('Error retrieving data');            
        }
    })
}

// handle button interaction
$('#generator-button').click(getAdvice);

// handle wait for response time