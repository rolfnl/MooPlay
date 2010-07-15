/*
---
description: display the player with the dimension of the page

license: GNU GPL

authors:
- Clément Hallet

requires:
- MooPlay


provides: 
- MooPlay.Control.FullScreen

...
*/

MooPlay.Control.FullScreen = new Class({

    Implements: [MooPlay.Control.BaseButton],
    
    options: {
        active_state_class: 'active'
    },
    
    full_screened: false,
    
    specificInitialize: function() {

        this.element.addEvents({
            'click': function(event) {
                event.preventDefault();
                this.toggleState();
            }.bind(this)
        });
        
        this.initialState: {
            coordinates: this.video.getCoordinates(document.body),
            position: this.video.getStyle('position')
        };
        this.fx = new Fx.Morph(this.video, {
            link: 'cancel',
            onComplete: function() {
                if(this.full_screened) {
                    this.video.setStyle('position', this.initialState.position);
                } else {
                    this.video.setStyles({
                        width: '100%',
                        height: '100%'
                    });
                }
                this.full_screened = !this.full_screened;
            }.bind(this)
        });
        
    },
    
    toggleState: function() {
        if(this.full_screened) {
            var video_dimension = this.video.getCoordinates();
            this.video.setStyles({
                width: String(video_dimension.width) + 'px',
                height: String(video_dimension.height) + 'px'
            });
            this.fx.start({
                height: this.initialState.coordinates.height,
                width: this.initialState.coordinates.width,
                top: this.initialState.coordinates.top,
                left: this.initialState.coordinates.left
            });
        } else {
            this.video.setStyle('position', 'fixed');
            var body_dimension = document.body.getCoordinates();
            this.fx.start({
                height: body_dimension.height,
                width: body_dimension.width,
                top: 0,
                left: 0
            });
        }
    }

});
