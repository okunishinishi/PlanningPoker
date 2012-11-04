(function($){
    $.fn.extend({
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
            card.click(function(){
                var style = (function(b, c){
                    return {
                        left:c.left - b.left - 5,
                        top:c.top - b.top
                    }

                })($('body').offset(), card.offset());
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
                    });
                var closeBtn = $('<a/>')
                    .addClass('close-btn')
                    .appendTo(selected)
                    .text('×').one('click', function(){
                        selected.fadeOut(300, function(){
                            selected.remove();
                        })
                    }).hide();
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
    });
})(jQuery);

