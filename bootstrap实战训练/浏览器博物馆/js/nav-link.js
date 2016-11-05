    $(function () {
        $('#ad-carousel').carousel();
    
        $('.navbar-collapse .dropdown-menu a').click(function (e) {
            var href = $(this).attr('href');
            var tabId = $(this).attr('data-tab');
            if ('#' !== href) {
                e.preventDefault();//阻止冒泡
                $(document).scrollTop($(href).offset().top - 80);
                //
                if (tabId) {
                    $('#feature-tab a[href=#' + tabId + ']').tab('show');
                }
            }
        });
    });
