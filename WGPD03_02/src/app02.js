var Main02Layer = cc.Layer.extend({
    sprite:null,
    sx:1,
    sy:1,
    pokers: new Array(52),
    cards: new Array(new Array(13),new Array(13),new Array(13),new Array(13)),
    players: new Array(new Array(13),new Array(13),new Array(13),new Array(13)),
    ctor:function () {
        this._super();



        cc.spriteFrameCache.addSpriteFrames(res.poker_plist,res.poker_png);
        this.sprite = new cc.Sprite("#pokers_back.png");
        // console.log(this.sprite.width + ":" + this.sprite.height);
        this.sx = (cc.winSize.width / 13) / (this.sprite.width+24);
        this.sy = (cc.winSize.height / 4) / (this.sprite.height+60);


        for (var j = 0; j<this.players.length; j++){

            for (var i = 0; i<this.players[j].length; i++){
                this.players[j][i] = new cc.Sprite("#pokers_back.png");
                this.players[j][i].x = cc.winSize.width *(i+1) / 14;
                this.players[j][i].y = cc.winSize.height * (j+1) /5;
                this.players[j][i].setScale(this.sx,this.sy);
                this.addChild(this.players[j][i]);
            }
        }

        this.setUpmymouse(this);

        return true;
    },

    shufflePokers: function () {
        for(var i=0;i<this.pokers.length;i++){
            this.pokers[i] = i;
        }
        this.pokers = shuffle(this.pokers);

        for (var i=0;i<this.pokers.length;i++){
            this.cards[i%4][parseInt(i/4)] = this.pokers[i];
        }

        // this.cards[0].sort(function(a, b){return a-b});
        // this.cards[1].sort(function(a, b){return a-b});
        // this.cards[2].sort(function(a, b){return a-b});
        // this.cards[3].sort(function(a, b){return a-b});

        for (var i =0;i<this.cards.length;i++){
            this.cards[i].sort(function(a, b){return a-b});

            for (var j=0;j<this.players[i].length;j++){
                this.players[i][j].setSpriteFrame("pokers_" + this.cards[i][j] + ".png")
            }
        }
    },

    setUpmymouse: function(layer){
        if ('mouse' in cc.sys.capabilities){
            // define listener object
            var mouseListener = {
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    layer.shufflePokers();
                },
            };
            cc.eventManager.addListener(mouseListener,this);
        }
    },

});

var Main02Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Main02Layer();
        this.addChild(layer);
    }
});

function shuffle(a){
    var i,j,x;

    for (i=a.length; i; i--){
        j = parseInt(Math.random()*i);  // 0-9
        x = a[i-1];
        a[i-1] = a[j];
        a[j] = x;
    }
    return a;
}