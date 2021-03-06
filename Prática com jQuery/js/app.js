//Debounce do Lodash
/*
O debounce, assim como o throttle, limita a quantidade de vezes
que um determinado trecho de código é executado em relação ao tempo.
Mas diferentemente do throttle — que assegura que aconteçam no máximo
1 execução a cada X milisegundos —, o debounce irá postergar a execução 
do código caso ele seja invocado novamente em menos de X segundos.
*/
debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

//data() - Pega o valor dentro de um atributo que comece com 'data-'
//each - Seleciona cada elemento isoladamente
//find - Procura o elemento dentro dos filhos
//first - Seleciona apenas o primeiro elemento
//addClass - Adiciona uma ou mais classes ao elemento
//removeClass - Remove uma ou mais classes do elemento

$('[data-group]').each(function(){
    var $allTarget = $(this).find('[data-target]'),
        $allClick = $(this).find('[data-click]'),
        activeClass = 'active';
    
    $allTarget.first().addClass(activeClass);
    $allClick.first().addClass(activeClass);

    $allClick.click(function(e){
        e.preventDefault();

        var id = $(this).data('click'),
            $target = $('[data-target="' + id +'"]');

        $allClick.removeClass(activeClass);
        $allTarget.removeClass(activeClass);
        
        $target.addClass(activeClass);
        $(this).addClass(activeClass);
    });
}); 


//Scroll Suave

//attr() - Pega ou define o valor de um atributo específico
//offset() - Retorna um objeto com as distãncias de top e left do elemento em relação ao documento
//animate() - Anima propriedades CSS para o valor que você definir
//innerHeight() - Pega ou define o calor de height(mesma coisa para o width)

$('.menu-nav a[href^="#"]').click(function(e){ //Quando se tem o '^⁼' - quer dizer para selecionar todos com itens que comecem com o que for selecionado
    e.preventDefault();
    var id = $(this).attr('href'),
        menuHeight = $('.menu').innerHeight(),
        targetOffset = $(id).offset().top;
    
    $('html, body').animate({
        scrollTop: targetOffset - menuHeight
    },1000);
});

//Ir para o topo da página
$('.logo').click(function(e){
    e.preventDefault();
    
    $('html, body').animate({
        scrollTop: 0
    },800);
});



//Scroll Suave link Ativo

//ScrollTop() - Pega o topo do elemento em relação ao seu scroll (existe também o scrollLeft)
$('section').each(function(){
    var height = $(this).height(),
        offsetTop = $(this).offset().top,
        menuHeight = $('.menu').innerHeight(),
        id = $(this).attr('id'),
        $itemMenu = $('a[href="#' + id + '"]');

    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        if(((offsetTop - menuHeight) < scrollTop)&&((offsetTop - menuHeight) + height > scrollTop)){
            $itemMenu.addClass('active');
        }else{
            $itemMenu.removeClass('active');
        }
    });

});



//Menu Mobile 

$('.mobile-btn').click(function(){
    $(this).toggleClass('active'); //Adiciona a classe caso não exista e retira caso exista
    $('.mobile-menu').toggleClass('active');
});



//Slide
(function(){ //Funções Imediatas JavaScript(IIFE)
    function slider(sliderName, velocidade){
        var sliderClass = '.' + sliderName,
            activeClass = 'active',
            rotate = setInterval(rotateSlide, velocidade); //setInterval() - Irá rodar a função 'rotateSlide' a cada 2s
            

        $(sliderClass + ' > :first').addClass(activeClass); //Adiciona a classe 'active' ao primeiro elemento do slide

        //Quando estiver com o mouse por cima do slide
        $(sliderClass).hover(function(){
            clearInterval(rotate);
        }, function(){
            rotate = setInterval(rotateSlide, velocidade); //setInterval() - Irá rodar a função 'rotateSlide' a cada 2sec        
        });

        function rotateSlide() {
            var activeSlide = $(sliderClass + ' > .' + activeClass),
                nextSlide = activeSlide.next();

            //verificar se o próximo elemento existe
            if(nextSlide.length == 0){
                nextSlide = $(sliderClass + ' > :first');
            }
            activeSlide.removeClass(activeClass);
            nextSlide.addClass(activeClass);
        }

    }

    slider('introducao', 2000); //Chamando a função

})();





//Animação ao Scroll

(function(){ //Funções Imediatas JavaScript(IIFE)
    var $target = $('[data-anime="scroll"]'),
        animationClass = 'animate',
        offset = $(window).height() * 3/4;

    function animeScroll() {
        var documentTop = $(document).scrollTop(); //scrollTop() - Pega o topo do elemento em relação ao seu scroll

        $target.each(function(){ //each() - Seleciona cada elemento isoladamente
            var itemTop = $(this).offset().top; //offset() - Retorna um objeto com as distâncias de top e left do elemento em relação ao documento
            if(documentTop > itemTop - offset){
                $(this).addClass(animationClass);
            }else {
                $(this).removeClass(animationClass);
            }
        });
    }

    animeScroll(); //Chamando a função

    //Usando o debounce
    $(document).scroll(debounce(function(){ //Quando acionar a rolagem da tela será chamada a função 'animeScroll()'
        animeScroll();
    }, 200));

})();


