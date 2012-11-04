(function($){
    $.fn.extend({
        clickOnTouchStart:function(){
            var elm = $(this);
            elm.get(0).addEventListener('touchstart', function(e){
                alert('e.touches.length = ' + e.touches.length);
                if(e.touches.length === 1){
                    elm.trigger('click');
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            });
            return elm;
        },
        card:function(value){
            var card = $(this)
                .addClass('card');
            $('<span/>').addClass('number')
                .appendTo(card)
                .text(value);
            var size = $('.card').size();
            card
                .addClass(size % 2 == 0 ? 'even':'odd')
                .addClass('card-' + size);
            card
                .clickOnTouchStart()
                .click(function(){
                if(card.is('.disabled')) return;
                card.addClass('disabled');
                var style = (function(b, co, c){
                    return {
                        left:c.left - co.left - 10,
                        top:c.top - b.top
                    }
                })($('body').offset(), $('#content').offset(), card.offset());

                var selected = card.clone()
                    .insertAfter(card)
                    .addClass('selected')
                    .css(style)
                    .animate({
                        left:0,
                        top:0,
                        width:'100%',
                        height:'100%',
                        'font-size':'200px',
                        'line-height':'380px',
                        margin:0,
                        'border-radius':20
                    }, 500, null, function(){
                        selected
                            .clickOnTouchStart()
                            .click(function(){
                                if(closeBtn.is(':visible')){
                                    closeBtn.hide();
                                } else {
                                    closeBtn.show();
                                }
                            })
                            .dblclick(function(){
                                closeBtn.trigger('click');
                            });
                        selected.get(0).addEventListener('touchstart', function(e){
                            if(e.touches.length > 1){
                                selected.trigger('dblclick');
                                e.preventDefault();
                                e.stopPropagation();
                                e.stopImmediatePropagation();
                            }
                        })
                    });
                var closeBtn = $('<a/>')
                    .addClass('close-btn')
                    .appendTo(selected)
                    .text('×')
                    .clickOnTouchStart()
                    .one('click', function(){
                        selected.fadeOut(300, function(){
                            selected.remove();
                            $('.selected').remove();
                        })
                    }).hide();
                    card.removeClass('disabled');
            });
            return card;
        },
        cardChoiceSection:function(){
            var section = $(this);
            var numbers = [0, 1];
            while(numbers[1] < 13){
                var number = numbers.shift() + numbers[0];
                $('<div/>').card(number)
                    .appendTo(section);
                numbers.push(number);
            }
            $('<br/>').addClass('clear').appendTo(section);
            return section;
        }
    });
    $(function(){
        $('#card-choice-section').cardChoiceSection() ;
        document.ontouchmove = function(event){
            event.preventDefault();
        }
    });
})(jQuery);

