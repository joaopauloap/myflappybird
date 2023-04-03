var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var gameStart=true
var bordaHeight = 500
var bordaWidth = 1000
var abertura = 100
var constBarreiras = windowWidth-350
var barreiraSupHeight
var barreirasWidth = 100
var distanciaBarreiras = 200
var barreirasLeft = constBarreiras + barreirasWidth
var birdTop = -200
var birdLeft = 0
var playerHeight = 50
var playerWidth = 60
var barreiraDaVezHeight=0
var BarreiraDaVez = 0
var constanteDeCorrecao = 5
var barreiraDaVezLeft

function novoElemento(tagName, className) {
	const elem = document.createElement(tagName)
	elem.className = className
	return elem
}

function borda(){
	this.elemento = novoElemento('div','borda')
	this.elemento.style = `height:${bordaHeight};border:solid;border-color:white;border-width:3;background-color:SkyBlue;`
	document.getElementById('myflappy').appendChild(this.elemento); 
}

function barreira_superior(supHeight, supLeft){
	barreiraSupHeight = supHeight
	this.elemento = novoElemento('div','barreira_s')
	this.elemento.style = `width:${barreirasWidth};height:${supHeight};position:relative;top:${0};border:solid;border-width:2px;background-color:lime;`
}

function barreira_inferior(infHeight,infLeft){
	this.elemento = novoElemento('div','barreira_i')
	this.elemento.style = `width:${barreirasWidth};height:${infHeight};position:relative;top:${abertura};border:solid;border-width:2px;background-color:lime;`
}

function parBarreiras(supHeight,left){
	this.elemento = novoElemento('div', 'parbarreiras')
	this.elemento.style = `display:inline-block;position:relative;left:${barreirasLeft};margin-right:${distanciaBarreiras};`
	this.superior = new barreira_superior(supHeight,left)
	this.inferior = new barreira_inferior(bordaHeight-abertura-supHeight-3,left)

	this.elemento.appendChild(this.superior.elemento)
	this.elemento.appendChild(this.inferior.elemento)

}

function player(){
	this.elemento = novoElemento('img','player')
	this.elemento.style = `height:${playerHeight};width:${playerWidth};position:relative;left:${windowWidth/2};top:${birdTop};z-index:2;`
	this.elemento.src = 'bird.png'
}

function gameover(){
	alert("Game Over!\n\nScore:0")
	birdTop=-200
	barreirasLeft = constBarreiras + barreirasWidth
	voando=false
	BarreiraDaVez=0


}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

var area = new borda(bordaHeight)
var bird = new player()

var barreiras = [

new parBarreiras(getRandomInt(50,350),constBarreiras),
new parBarreiras(getRandomInt(50,350),constBarreiras),
new parBarreiras(getRandomInt(50,350),constBarreiras),
new parBarreiras(getRandomInt(50,350),constBarreiras)

]


area.elemento.appendChild(bird.elemento)

barreiras.forEach(function(par){
	area.elemento.appendChild(par.elemento)
})

function start(){

	setInterval(function(){

		birdLeft = parseInt(bird.elemento.style.left)
		barreiraDaVezHeight = parseInt(barreiras[BarreiraDaVez].superior.elemento.style.height)
		barreiraDaVezLeft = parseInt(barreiras[BarreiraDaVez].elemento.style.left)

		if(voando==true){
			birdTop-=7
		}else{
			birdTop+=7
		}
		
		//Colisão Borda Superior
		if(birdTop<-350){		
			birdTop = -350;
		}

		//Colisão Borda Inferior
		if(birdTop>100){		
			gameover()
		}

		//Colisão Barreiras
		if(((birdTop < -350 + barreiraDaVezHeight)||(birdTop>-350 + barreiraDaVezHeight + abertura - playerHeight))&&((barreirasLeft < birdLeft)&&(barreirasLeft>birdLeft - playerWidth - barreirasWidth))){
			alert("colisao")
		}

		if((barreiraDaVezLeft < birdLeft - 100 - playerWidth - constanteDeCorrecao)&&(barreiraDaVezLeft >  birdLeft - 100 - playerWidth - constanteDeCorrecao - 5)){
			BarreiraDaVez++
			console.log('BarreiraDaVez=',BarreiraDaVez)
			console.log('barreiraDaVezLeft=',barreiraDaVezLeft)
		}

		barreiras.forEach(function(par){
			par.elemento.style.left = barreirasLeft

		})

		bird.elemento.style.top = birdTop
		barreirasLeft-=5





	}, 30);

}

window.onmousedown = function(e){

	if(gameStart==true){	
		gameStart=false
		
		start()		
	}

	voando = true;
}

window.onkeydown = function(e){

	if(gameStart==true){
		gameStart=false
		
		start()		
	}
	
	voando = true;

}

window.onkeyup = e => voando = false
window.onmouseup = e => voando = false

