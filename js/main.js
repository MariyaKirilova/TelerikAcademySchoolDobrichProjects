'use strict'
const game = new Phaser.Game(600, 600, Phaser.AUTO, 'game-canvas', { preload, create, update })

const sniperSpeed = 200
let sniper, cursors, bonus,dude,hide

function preload() {
    game.load.image('background', 'images/background.jpg')
    game.load.image('sniper', 'images/sniper.png')
    game.load.spritesheet('dude', 'images/dude-red.288x40.9x1.png',288/9,40)
    game.load.spritesheet('hide', 'images/hideDude840.3x940.4.png',840/3,940/4)
    
}

function create() {
    //game.scale.pageAlignHorizontally=true
    const back=game.add.sprite(0,0, 'background')
    game.world.setBounds(0, 0, 1920, 800)//задаваме размерите на света - размерите на background
    
    dude = game.add.sprite(900, 700, 'dude')
    dude.anchor.setTo(0.5)
    dude.animations.add('',[4],10,true).play()
    game.physics.enable(dude)

    hide = game.add.sprite(-100, -100, 'hide')
    hide.anchor.setTo(0.5)
    hide.scale.setTo(0.5)

    sniper = game.add.sprite(300, 300, 'sniper')
    sniper.anchor.setTo(0.5)
    game.physics.enable(sniper)//добавяне на физика
    sniper.body.collideWorldBounds=true
    game.camera.follow(sniper, Phaser.Camera.FOLLOW_PLATFORMER, 0.1, 0.1)//камерата ще следи player

    cursors = game.input.keyboard.createCursorKeys()
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(shake)
}

function update() {
    moveSniper()
}
let bonusText
const createText=function()
{
    const style={font:'30px Courier New',align:'left',fill:'#fff'}
    bonusText=game.add.text(game.width/2, game.height,'Браво! Точно в 10-ката!',style)
    bonusText.anchor.setTo(0.5,1)
}
const moveSniper = function () {
    if (cursors.left.isDown) {
        sniper.body.velocity.x =-sniperSpeed
    } else if (cursors.right.isDown) {
        sniper.body.velocity.x = sniperSpeed
        //game.camera.x+=10
    } else {
        sniper.body.velocity.x = 0
        //game.camera.x=0
    }
    if (cursors.up.isDown) {
        sniper.body.velocity.y = -sniperSpeed
        //game.camera.y-=10
    } else if (cursors.down.isDown) {
        sniper.body.velocity.y = sniperSpeed
        //game.camera.y+=10
    } else {
        sniper.body.velocity.y = 0
        //game.camera.y=0
    }

    //докосване на dude и снайпера
    game.physics.arcade.overlap(dude, sniper, function () {
        console.log('Overlap detected!')
       })
}

const shake = function () {
    //разтърсване
    game.camera.shake(0.005, 500)
    //гръм
    hide.x=sniper.x
    hide.y=sniper.y
    hide.animations.add('',[],10,false).play()
    //скриване на дуде, ако е улучен
    if(Math.abs(dude.x-sniper.x)<50&&Math.abs(dude.y-sniper.y)<50)
    {
        dude.alpha=0
        createText()
    }
    if(game.time.now%350<25)
    {
        bonusText.alpha=0
    }
}