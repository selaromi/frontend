define(['common', 'bonzo', 'bean'], function (common, bonzo, bean) {

    return function(collection) {

        var _$collection = bonzo(collection),
            _toggleText = {
                hidden: 'Show',
                displayed: 'Hide'
            },
            _initialState = 'displayed',
            _dataAttr = 'data-toggle-state',
            _elmsNotToHide = ['collection__title', 'collection__display-toggle'];

        this.addToggle =  function () {
            var $button = bonzo(bonzo.create('<button class="collection__display-toggle" data-link-name="Show">Hide<span class="u-h"> section</span></button>'));
            // append toggle button
            _$collection
                .attr(_dataAttr, _initialState)
                .prepend($button);
            // listen to event
            bean.on($button[0], 'click', function(e) {
                var newState = (_$collection.attr(_dataAttr) === 'displayed') ? 'hidden' : 'displayed';
                // hide almost everything
                common.toArray(_$collection[0].children).forEach(function(child) {
                    var $child = bonzo(child),
                        show = _elmsNotToHide.some(function(className) {
                            return $child.hasClass(className);
                        });
                    if (!show) {
                        $child[newState === 'displayed' ? 'show' : 'hide']();
                    }
                });
                _$collection.attr(_dataAttr, newState);
                $button
                    .text(_toggleText[newState])
                    // data-link-name is inverted, as happens before clickstream
                    .attr('data-link-name', _toggleText[newState === 'displayed' ? 'hidden' : 'displayed']);
            });
        };

    };

});