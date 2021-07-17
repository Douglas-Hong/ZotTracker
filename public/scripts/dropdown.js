$("#dept").change(function () {
    if ($(this).val() == "") {
        $(this).addClass("select-placeholder");
    } else {
        $(this).removeClass("select-placeholder");
    }
});
$("#dept").change();


$("#quarter").change(function () {
    if ($(this).val() == "") {
        $(this).addClass("select-placeholder");
    } else {
        $(this).removeClass("select-placeholder");
    }
});
$("#quarter").change();


$(".reset-button").click(function() {
    $("#dept").addClass("select-placeholder");
    $("#quarter").addClass("select-placeholder");
});