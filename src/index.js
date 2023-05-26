import 'bootstrap';
import $ from 'jquery';
import '@fortawesome/fontawesome-free/js/all.js';
import './sass/index.sass';
import slick from 'slick-carousel';
const YTPlayer = require('yt-player');

$(document).ready(function(){


    let checkLGPD = localStorage.getItem('lgpd-lunare');

    if(!checkLGPD){
        $('.modal-lgpd').fadeIn();
    }

    $(document).on('click', '.btn-lgpd', function(){
        localStorage.setItem('lgpd-lunare', 'true');
        $('.modal-lgpd').fadeOut();
    });   

    function isFormInvalid(form, event){
        form[0].classList.add('was-validated');
        if (form[0].checkValidity() === false) {
            event.stopPropagation();
            return false;
        }
        else
        {
            return true;
        }
    }

    $('#contact-form').submit(function(e){
        e.preventDefault();
        var form = $(this);
        var event = e;
        if(!isFormInvalid(form, event)){
            return;
        }

        var data = form.serializeArray();

        $.ajax({
            url: 'send.php',
            type: 'POST',
            data: {'data' : data},
            beforeSend: function()
            {
                $('#btn-submit').fadeOut('fast', function(){
                    $('.loader').fadeIn('slow');
                });
            }
        }).done(function(data) {
            
            if(data == '1')
            {
                $('#modal-response').modal('show');
                gtag('event', 'contact_form', {
                    'event_category': 'lunareWebsite',
                    'event_label': 'email sent'
                });
            }
            else
            {
                alert('Ocorreu algum erro. Por favor, tente novamente mais tarde.');
                gtag('event', 'contact_form', {
                    'event_category': 'lunareWebsite',
                    'event_label': 'email was not sent'
                });
            }

        }).fail(function(data){
            alert('Ocorreu algum erro. Por favor, tente novamente mais tarde.');
        }).always(function(data){

            setTimeout(function(){
                $('.loader').fadeOut('fast', function(){
                    $('#btn-submit').fadeIn('slow');
                });
            }, 300);
            

            $('#contact-form')[0].classList.remove('was-validated');
            $('#contact-form')[0].reset();
        });

    });

    $('.btn-compra').click(function (e){

        let label = $(this).find('span').html();

        gtag('event', 'btn_point_of_sale', {
            'event_category': 'lunareWebsite',
            'event_label': label
        });
    });

    $('.main-menu li a').click(function (e) {

        let target = $(e.currentTarget).attr('href');

        gtag('event', 'screen_menu_view', {
            'event_category': 'lunareWebsite',
            'event_label': target
        });

    });

    var number = $('.number');
    var i = 0;

    $(window).scroll(function(){

        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {

            $('section').each(function(i,e){

                if($(e).isInViewport())
                {
                    let hash = '#' + e.id;

                    if(history.pushState) {

                        history.pushState(null, null, hash);

                        if(hash == '#home')
                        {
                            hash = '#home';
                            history.pushState({}, document.title, location.href.replace('#home', ""));
                        }

                        gtag('event', 'screen_scroll_view', {
                            'event_category': 'lunareWebsite',
                            'event_label': hash
                        });

                        console.log(hash);

                    }
                    else {
                        location.hash = hash;
                    }
                }

            });

            i++;
            number.text(i);
        }, 250));
    });

    $.fn.isInViewport = function() {

        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    const player = new YTPlayer('#player', {
        controls : false,
        modestBranding: false,
        related: false,
        info: false
    });

    $('#slide-home').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
    });

    $('.lens-slider').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
    });

    $('#btn-video').click(function(e){
        player.load('PI_YeajQHFs');
        player.setVolume(100);
        player.play();
        $('.modal-video').modal();
    });

    $('.modal-video').on('hide.bs.modal', function (e) {
        player.stop();
    });

    $('.btn-select-color').click(function(e){

        e.stopPropagation();

        var sliderToShow = $(this).attr('data-color');
        var btn = $(this);

        $('.btn-select-color').removeClass('btn-select-color-active');
        btn.addClass('btn-select-color-active');


        $('#tagline-sliders').fadeOut();
        $('.slick-dots').fadeOut('fast', function(){
            $(".lens-slider").fadeOut('fast', function(){
                $('.lens-slider').slick('slickGoTo', 0);
                $(".lens-slider[data-slider='"+sliderToShow+"']").fadeIn('slow', function(){
                    $('.slick-dots').fadeIn('slow', function(){
                        $('#tagline-sliders').fadeIn('slow');
                    });

                });
            });
        });


    });

});