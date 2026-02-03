$(function () {
    // get model data
    var modelInput = $("#model-data").val();
    var modelData = $("<textarea />").html(modelInput).text();
    var model = JSON.parse(modelData);

    var af = $("<input type='hidden' name='" + model.antiForgery.name + "' value='" + model.antiForgery.value + "' />");
    $(".login-form")[0].action = model.loginUrl;
    $(".login-form").append(af);

    $("#model-clientName").html(model.clientName);
    $("#model-clientDescription").html(model.custom.clientDescription);
    $("#username").val(model.username);
    if (model.errorMessage) {
        var box = $('.alert-danger', $('.login-form'));
        box.html(model.errorMessage).show();
    }
    
});