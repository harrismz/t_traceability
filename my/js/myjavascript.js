function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}
var content = getUrlVars()["content"];

// ===== Scroll to Top ====
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200); // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200); // Else fade out the arrow
    }
});
$('#return-to-top').click(function() { // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0 // Scroll to top of body
    }, 500);
});

$('.scroll-to').click(function() {
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 500);
    return false;
});

//===== scroll tog et ID ======
// ------------------------------
// https://twitter.com/mattsince87
// ------------------------------
// $('#Partmenu').click(function(){
// 	$('body, html').animate({
// 		scrollTop: $( $(#Partmenu).attr('Parttab') ).offset().top - 30
// 	}, 400);
// })

// function scrollNav() {
//   $('.nav a').click(function(){
//     //Toggle Class
//     $(".active").removeClass("active");
//     $(this).closest('li').addClass("active");
//     var theClass = $(this).attr("class");
//     $('.'+theClass).parent('li').addClass('active');
//     //Animate
//     $('html, body').stop().animate({
//       scrollTop: $( $(this).attr('href') ).offset().top - 30
//     }, 400);
//     return false;
//   });
//   $('.scrollTop a').scrollTop();
// }
// scrollNav();

//alert(content);

// $(document).ready(function(){
//   $('.media-carousel').owlCarousel({
//     loop:true,
//     margin:10,
//     responsiveClass:true,
//     responsive:{
//         0:{
//             items:1,
//             nav:true
//         },
//         600:{
//             items:3,
//             nav:false
//         },
//         1000:{
//             items:5,
//             nav:true,
//             loop:false
//         }
//     }
// })
// });