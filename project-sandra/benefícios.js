$(document).ready(function(){function a(){var a,b=$(window).width();a=500>=b?3:800>=b?4:5;var c=Math.min(Math.max(10,768>=b?10:20),30),d=$(".carrossel-container").width(),e=Math.min(a,Math.floor(d/(100+c)));$(".carrossel div").css("margin-right",(d-100*e)/(e-1)+"px")}function b(a){var b=a.split(":");return 1<b.length&&(b[0]="<span class=\"color-blue\">"+b[0].trim()+"</span>"),b.join(":")}var c=["maior-idade: \xE9 essencial fortalecer suavemente as articula\xE7\xF5es e m\xFAsculos, evitando impactos prejudiciais.","Bem-estar: Adequado para aqueles que procuram uma forma de relaxar e desconectar corpo e mente das tens\xF5es do cotidiano no trabalho.","Reabilita\xE7\xE3o: Pilates \xE9 altamente recomendado para indiv\xEDduos em processo de recupera\xE7\xE3o ap\xF3s les\xF5es ou cirurgias.","Fitness: Este treinamento capacita cada pessoa a atingir seu potencial m\xE1ximo, promovendo um corpo ideal e elevando a autoestima.","Fisioterapia: Em situa\xE7\xF5es p\xF3s-les\xF5es ou cirurgias, a fisioterapia se destaca como uma importante aliada","Gestante: Com um amplo repert\xF3rio de exerc\xEDcios, o pilates evita sobrecarga nas articula\xE7\xF5es, proporcionando qualidade de vida tanto para a m\xE3e quanto para o beb\xEA, em paralelo \xE0 fisioterapia."];$(".carrossel").slick({centerMode:!0,centerPadding:"17.0%",slidesToShow:3,autoplay:!0,dots:840>=window.innerWidth,prevArrow:$(".custom-prev"),nextArrow:$(".custom-next"),autoplaySpeed:3e3,responsive:[{breakpoint:1154,settings:{arrows:!1,centerMode:!0,centerPadding:"8%",slidesToShow:3,dots:840>=window.innerWidth}},{breakpoint:930,settings:{arrows:!1,centerMode:!0,centerPadding:"-20%",slidesToShow:3,dots:840>=window.innerWidth}},{breakpoint:790,settings:{arrows:!1,centerMode:!0,centerPadding:"25%",slidesToShow:1,dots:840>=window.innerWidth}},{breakpoint:580,settings:{arrows:!1,centerMode:!0,centerPadding:"21%",slidesToShow:1}},{breakpoint:500,settings:{arrows:!1,centerMode:!0,centerPadding:"15%",slidesToShow:1}}]}),$(".carrossel").on("beforeChange",function(a,b,c,d){$(".carrossel").find(".imgb").removeClass("border-blue");var e=Math.floor(b.slideCount/2),f=$(".carrossel").find(".slick-slide[data-slick-index=\""+d+"\"]").find(".imgb");f.addClass("border-blue")});var d=$(".carrossel").slick("slickCurrentSlide");$(".carrossel").find(".slick-slide[data-slick-index=\""+d+"\"]").find(".imgb").addClass("border-blue"),$(".current-paragraph").html(b(c[d])),$(".carrossel").on("afterChange",function(a,d,e){$(".current-paragraph").html(b(c[e])),$(".slick-center").find(".current-paragraph").css("text-align","center")}),a(),$(window).on("resize",a)});