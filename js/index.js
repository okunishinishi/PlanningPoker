(function($){
    $.fn.extend({
        card:function(value){
            var card = $(this)
                .addClass('card')
                .text(value);

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
            return section;
        }
    });
    $(function(){
        $('#card-choice-section').cardChoiceSection() ;
    });
})(jQuery);

