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

