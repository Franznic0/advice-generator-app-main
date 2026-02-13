// get API data
async function getAdvice() {
  const url = "https://api.adviceslip.com/advice";

  // empty advice
  $("#advice-text").html("");
  // empty ad number
  $("#advice-number").html("");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // set error message
      const errorTitleText = "Error";
      let errorTitleDisplay = document.createElement("strong");
      errorTitleDisplay.innerText = errorTitleText;
      errorTitleDisplay.style.color = "red";

      let errorText = "Error fetching a good advice";
      let errorDisplay = document.createElement("strong");
      errorDisplay.innerText = errorText;

      // display error message
      $("#advice-number").append(errorTitleDisplay);
      $("#advice-text").append(errorDisplay);

      // stop dice animation
      $("#generator-button").removeClass("roll");
      $("#dice").removeClass("bounce");

      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();

    // assign ad number
    let adviceNumData = result.slip.id;
    let adviceNumElement = document.createElement("strong");
    adviceNumElement.textContent = "advice #" + adviceNumData;

    // assign advice
    let adviceData = result.slip.advice;
    let adviceElement = document.createElement("strong");
    adviceElement.textContent = '"' + adviceData + '"';

    // display ad number
    $("#advice-number").append(adviceNumElement);

    // display advice
    $("#advice-text").append(adviceElement);

    // stop dice animation
    $("#generator-button").removeClass("roll");
    $("#dice").removeClass("bounce");

  } catch (error) {
    $("#advice-number").text("Error");
    $("#advice-number").css("color", "red");

    $("#advice-text").text("Error retrieving data.\n" + error.message);

    // stop dice animation
    $("#generator-button").removeClass("roll");
    $("#dice").removeClass("bounce");
  }
}

// handle button interaction
$("#generator-button").click(function () {
  // handle wait for response time
  $("#generator-button").addClass("roll");
  $("#dice").addClass("bounce");

  // call API
  setTimeout(getAdvice, 1000);
});
