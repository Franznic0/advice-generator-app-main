// get API data
async function getAdvice() {
  const url = "https://api.adviceslip.com/advice";

  // // empty advice
  // $("#advice-text").html("");
  // // empty ad number
  // $("#advice-number").html("");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // set error message
      const errorTitleText = "Error";
      const errorTitleDisplay = document.createElement("strong");
      errorTitleDisplay.innerText = errorTitleText;
      errorTitleDisplay.style.color = "red";

      const errorText = "Error fetching a good advice";
      const errorDisplay = document.createElement("strong");
      errorDisplay.innerText = errorText;

      // display error message
      $("#advice-number").append(errorTitleDisplay);
      $("#advice-text").append(errorDisplay);

      // remove dice animation classes
      $("#generator-button").removeClass("roll");
      $("#dice").removeClass("bounce");

      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();

    // empty ad number
    $("#advice-number").html("");
    // empty advice
    $("#advice-text").html("");

    // assign ad number
    const adviceNumData = result.slip.id;
    const adviceNumElement = document.createElement("strong");
    adviceNumElement.textContent = "advice #" + adviceNumData;

    // assign advice
    const adviceData = result.slip.advice;
    const adviceElement = document.createElement("strong");
    adviceElement.textContent = '"' + adviceData + '"';

    // display ad number
    $("#advice-number").append(adviceNumElement);

    // display advice
    $("#advice-text").append(adviceElement);

    // remove dice animation classes
    $("#generator-button").removeClass("roll");
    $("#dice").removeClass("bounce");
  } catch (error) {
    $("#advice-number").text("Error");
    $("#advice-number").css("color", "red");

    $("#advice-text").text("Error retrieving data.\n" + error.message);

    // remove dice animation classes
    $("#generator-button").removeClass("roll");
    $("#dice").removeClass("bounce");
  }
}

// handle button interaction
$("#generator-button").click(function () {
  // handle wait for response time
  $("#generator-button").addClass("roll");
  $("#dice").addClass("bounce");

  // empty number
  $("#advice-number").html("");
  // empty advice
  $("#advice-text").html("");

  // assign ad number
  const loadingNum = "...";
  const loadingNumElement = document.createElement("strong");
  loadingNumElement.textContent = "advice #" + loadingNum;

  // create loading message element
  const loadingMessage = "Rolling the dice...";
  const loadingElement = document.createElement("strong");
  loadingElement.textContent = loadingMessage;

  // display loading number
  $("#advice-number").append(loadingNumElement);
  // display loading message
  $("#advice-text").append(loadingElement);

  // call API
  setTimeout(getAdvice, 1000);
});
