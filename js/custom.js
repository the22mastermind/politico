$(document).ready(function(){
	// Collapse menu button
	$(".navbtn").click(function(){
		$("#mobile-nav-links-wrapper").toggle();
		if ($(this).children("i").hasClass("fa fa-bars")) {
			$(this).children("i").removeClass("fa fa-bars").addClass("fa fa-times");
		} else {
			$(this).children("i").removeClass("fa fa-times").addClass("fa fa-bars");
		}
	});
	// Close dialog box
	$("#close").click(function(){
		$(this).closest(".dialog-box").hide();
	});
	// Get started
	$(".quarter-button").click(function(){
		window.location.href = $(this).data('url');
	});
});