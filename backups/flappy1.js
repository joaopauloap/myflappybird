var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var gamestart=true
var bordaAltura = 500
var abertura = 100
var barreiraSupAltura
var barreiraInfAltura
var barreiraLeft = windowWidth-150
var birdTop = 200
var birdLeft = 0
var playerAltura = 50
var playerHeight = 50
var playerWidth = 60

function novoElemento(tagName, className) {
	const elem = document.createElement(tagName)
	elem.className = className
	return elem
}

function borda(){
	this.elemento = novoElemento('div','borda')
	this.elemento.style = `height:${bordaAltura};border:solid;border-color:white;border-width:3;background-color:SkyBlue;`
	document.body.appendChild(this.elemento); 
}

function barreira_superior(supHeight, supLeft){
	barreiraSupAltura = supHeight
	this.elemento = novoElemento('div','barreira_s')
	this.elemento.style = `width:100;height:${supHeight};position:relative;top:${0};left:${supLeft};border:solid;border-width:2px;background-color:lime;`
}

function barreira_inferior(infHeight,infLeft){
	this.elemento = novoElemento('div','barreira_i')
	this.elemento.style = `width:100;height:${infHeight};position:relative;top:${abertura};left:${infLeft};border:solid;border-width:2px;background-color:lime;`
}

function parBarreiras(supHeight,left){
	this.elemento = novoElemento('div', 'parbarreiras')
	this.elemento.style = 'display:inline-block;padding-left:200;'
	this.superior = new barreira_superior(supHeight,left)
	this.inferior = new barreira_inferior(bordaAltura-abertura-supHeight-3,left)

	this.elemento.appendChild(this.superior.elemento)
	this.elemento.appendChild(this.inferior.elemento)

}

function player(){
	this.elemento = novoElemento('img','player')
	this.elemento.style = `height:${playerHeight};width:${playerWidth};position:fixed;left:${windowWidth/2};top:200;`
	this.elemento.src = 'bird.png'
}

function gameover(){
	alert("Game Over!\n\nScore:0")
	birdTop=200
	barreiraLeft = windowWidth-150
	voando=false

}


var area = new borda(bordaAltura)
var bird = new player()

var constBarreiras = windowWidth-130

var barreiras = [
new parBarreiras(150,constBarreiras),
new parBarreiras(150,constBarreiras),
]


area.elemento.appendChild(bird.elemento)

barreiras.forEach(function(par){
	area.elemento.appendChild(par.elemento)
})

function start(){

	setInterval(function(){

		if(voando==true){
			birdTop-=7
		}else{
			birdTop+=7
		}

		//Colisão Borda Superior
		if(birdTop<=0){		
			birdTop=0
		}

		//Colisão Borda Inferior
		if(birdTop>bordaAltura){		
			gameover()
		}

		//Colisão barreira Superior
		if((birdTop>-1)&&(birdTop<barreiraSupAltura)){
			//gameover()
		}

/*		//Colisão barreira Inferior
		if((barreiraLeft < birdLeft+playerWidth)&&(barreiraLeft > birdLeft-100)&&(birdTop>barreiraSupAltura+abertura-playerAltura+10)){
			gameover()
		}
*/
		birdLeft = parseInt(bird.elemento.style.left)
		bird.elemento.style.top = birdTop

		barreiras.forEach(function(par){

		par.superior.elemento.style.left = barreiraLeft
		par.inferior.elemento.style.left = barreiraLeft

		})

		barreiraLeft-=5



	}, 30);

}

window.onmousedown = function(e){
	if(gamestart==true){	
		gamestart=false
		
		start()		
	}

	voando = true;
}

window.onkeydown = function(e){
	
	if(gamestart==true){
		gamestart=false
		
		start()		
	}
	
	voando = true;

}

window.onkeyup = e => voando = false
window.onmouseup = e => voando = false


