$(".show-graph-button").addEventListener('shown.bs.collapse', function () {
    $(this).text("Close");
});


$(".show-graph-button").addEventListener('hidden.bs.collapse', function () {
    $(this).text("Open");
});
