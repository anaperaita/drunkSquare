CLOCKWORKRT.components.register([
    {
        name: "bicho",
        events: [

            {
                name: "crasher", code: function (event) {

                    if (this.var.$x < 1366 && this.var.$x > 0) {
                        this.var.vx += this.var.ax;
                        this.var.$x += this.var.vx;
                    } else if (this.var.$x < 0) {
                        this.var.$state="RebotaV";
                        this.var.timer=1;
                        this.var.vx = -this.var.vx * this.var.craziness;
                        this.var.$x = 1;
                    } else {
                        this.var.$state="RebotaV";
                        this.var.timer=1;
                        this.var.vx = -this.var.vx * this.var.craziness;
                        this.var.$x = 1365;
                    }
                    if (this.var.$y < 768 && this.var.$y > 5) {
                        
                        this.var.vy += this.var.ay;
                        this.var.$y += this.var.vy;
                    } else if (this.var.$y < 5) {
                        this.var.$state="RebotaH"
                        this.var.timer=1;
                        this.var.vy = -this.var.vy * this.var.craziness;
                        this.var.$y = 6;
                    } else {
                        this.var.$state="RebotaH"
                        this.var.timer=1;
                        this.var.vy = -this.var.vy * this.var.craziness;
                        this.var.$y = 767;
                    }
                    //this.engine.debug.log("Move ay" + this.var.ay + " vy " + this.var.vy + " y " + this.var.$y);
                    this.var.vx *= (1 - this.var.friction);
                    this.var.vy *= (1 - this.var.friction);
                }
            }

        ]

    },
    {
        name: "cuadrado1",
        sprite: "cuadrado",
        inherits: "bicho",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.var.$dibujar = function (context, x, y, h, w, color) {
                        context.beginPath();
                        context.rect(x - h / 2, y - w / 2, h, w);
                        context.fillStyle = color;
                        context.fill();
                        context.lineWidth = 6;
                        context.strokeStyle = 'black';
                        context.stroke();
                    }

                    this.var.$w=50
                    this.var.$h=50
                    this.var.$animation=5
                    this.engine.debug.log("Cuadradooo");
                    this.var.friction = 0.05;
                    this.var.craziness = 2
                    this.var.vx = this.var.vy = 0;
                    this.var.ax = this.var.ay = 0;
                    this.var.timer =-1;
                    //this.setCollider("cuadraditos", { "x": 0 , "y": 0, "r": this.var.$w/2 });

                }
            }, {
                name: "#loop", code: function (event) {
                    this.do.crasher(event);

                    this.engine.debug.log("timer " +this.var.timer);
                    if(this.var.timer>-1){
                        this.var.timer++;
                        if(this.var.timer >12){
                            this.engine.debug.log("vuelve");
                            this.var.timer=-1;
                            this.var.$state="Idle";
                        }
                    }
                }
            }, {
                name: "keyboardDown", code: function (event) {
                    switch (event.key) {
                        case 37:
                            this.var.ax = -1;
                            break;
                        case 38:
                            this.var.ay = -1;
                            break;
                        case 39:
                            this.var.ax = 1;
                            break;
                        case 40:
                            this.var.ay = 1;
                            break;

                    }
                }
            },
            {
                name: "keyboardUp", code: function (event) {
                    switch (event.key) {
                        case 37:
                            this.var.ax = 0;
                            break;
                        case 38:
                            this.var.ay = 0;
                            break;
                        case 39:
                            this.var.ax = 0;
                            break;
                        case 40:
                            this.var.ay = 0;
                            break;
                    }
                }
            }, 
            {
                name: "#collide", code: function (event) {

                    //this.engine.destroy(this);
                }
            }],
            collision: {
            "cuadrado": [
                { "x": 0, "y": 0, "r": 30,  "#tag": "cuadrados" },
            ]
        }
    },

    {
        name: "circulo",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.var.$dibujar = function (context, x, y, h, w, color, alpha) {


                        //this.engine.debug.log("alpha "+ alpha);
                        context.beginPath();
                        context.globalAlpha=alpha;
                        context.ellipse(x - h / 4, y - w / 4, h/2, w/2, 0, 0, 2 * Math.PI, false)
                        
                        context.fillStyle = color;
                        
                        context.fill();
                        context.lineWidth = 6;
                        context.strokeStyle = 'black';
                        context.stroke();
                    }

                    
                    this.engine.debug.log("Puf soy un circulooooo");
                    this.var.$w=50
                    this.var.$h=50
                    this.var.$animation=5
                    this.var.friction = 0.05;
                    this.var.craziness = 2;
                    this.var.vx = this.var.vy = 0;
                    this.var.ax = this.var.ay = 0;
                    this.var.timer=0;
                    //this.setCollider("circulitos", { "x":0  , "y": 0 , "r": this.var.$w/2 });

                }
            }, {
                name: "#loop", code: function (event) {
                    this.var.timer++;
                    if(this.var.timer>300){
                        this.engine.debug.log("Patapuuum");
                        this.engine.destroy(this);
                        this.var.timer=0;
                    }


                }
            }
        ]
    },

    {
        name: "circulo1",
        sprite: "circulo1",
        inherits: "circulo",
        events: [
             {
                name: "#collide", code: function (event) {
                    if (event.shape2kind == "cuadrado" && this.var.$state!="Dead") {
                       this.engine.debug.log("Patapuuum");
                       //this.engine.destroy(this);
                       this.engine.do.aumentaLongBarra();
                       this.var.$state="Dead";
                       this.engine.do.sumaMarcador(event);
                    }
                }
            }
        ],
        collision: {
            "circulo": [
                { "x": 0, "y": 0, "r": 30, "#tag": "circulitos" },
            ]
        }
    },

    {
        name: "circulo2",
        sprite: "circulo2",
        inherits: "circulo",
        events: [
             {
                name: "#collide", code: function (event) {
                    if (event.shape2kind == "cuadrado" && this.var.$state!="Dead") {
                       this.engine.debug.log("Patapuuum");
                       //this.engine.destroy(this);
                       this.engine.do.disminuyeLongBarra();
                       this.var.$state="Dead";
                    }
                }
            }
        ],
        collision: {
            "circulo": [
                { "x": 0, "y": 0, "r": 30, "#tag": "circulitos" },
            ]
        }
    },
    {
        name: "barra",
        sprite: "barrita",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.var.$dibujar = function (context, x, y, longitud) {

                        context.beginPath();
                        context.rect(x, y, longitud, 10);
                        context.fillStyle = "white";
                        context.fill();
                        context.lineWidth = 6;
                        context.strokeStyle = 'black';
                        context.stroke();
                    }

                    
                    this.engine.debug.log("Barrita");

                    this.var.$long=400;
                    this.var.timer=0;
                    //this.setCollider("circulitos", { "x":0  , "y": 0 , "r": this.var.$w/2 });

                }
            },{
                name:"aumentaLongBarra", code: function() {
                    if (this.var.$long<1300){
                        this.var.$long+=50;
                        if( this.engine.var.dificultad <this.var.$long/1300){
                            this.engine.var.dificultad =this.var.$long/1300;
                        }
                    }



                }
                
            } ,
            {
                name:"disminuyeLongBarra", code: function() {
                    if (this.var.$long>0){
                        this.var.$long-=50;
                        if( this.engine.var.dificultad <this.var.$long/1300){
                            this.engine.var.dificultad =this.var.$long/1300;
                        }
                    }else{
                        //Perder
                        this.engine.loadLevel("loser");
                    }
                }
                
            } ,
            {
                name: "#loop", code: function (event) {
                    this.var.timer++;
                    if(this.var.timer>100){
                        this.do.disminuyeLongBarra();
                        this.var.timer=0;
                    }

                }
            }
        ]
    },

    {
        name: "circuloSpawner",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.engine.debug.log("Spawning");
                    
                    this.var.i=0;
                    this.var.timer=0;
                    this.engine.var.dificultad=400/1300;

                }
            },{
                name: "#loop", code: function (event) {
                    this.engine.debug.log("Spawning");

                    this.var.timer++;
                    if(this.var.timer>50){
                        this.engine.debug.log("Spawning circuloGenerado"+i);
                        this.engine.spawn("circuloGenerado"+this.var.i , Math.random()>this.engine.var.dificultad?"circulo1":"circulo2",
                         { $x: Math.random() * (1300+20) +20 , $y: Math.random() *(720+20)+20});
                        this.var.i++;
                        if(this.var.i<100){
                            this.var.i=0;
                        }
                        this.var.timer=0;
                    }
                    

                }
            }

        ]


    },

    {
        name: "loserMessage",
        sprite: "loserMessage",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.engine.debug.log("Spawning");
                    

                    this.var.$text = "You Lost with "+this.engine.var.puntos +" points  Press any key to restart \n";
                    if(localStorage['points'] < this.engine.var.puntos){
                        localStorage['points'] =this.engine.var.puntos;
                    }
                }
            },{
                name: "keyboardDown", code: function (event) {
                    this.engine.loadLevel("mainLevel");
                }
            }

        ]
    },

    {
        name: "marcador",
        sprite: "marcador",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.engine.debug.log("Spawning");

                    this.engine.var.puntos = 0;
                    this.var.$text = "" ;

                }
            },{
                name: "#loop", code: function (event) {
                    this.engine.debug.log("Spawning");

                    this.var.$text = "Puntos: " + this.engine.var.puntos ;

                }
            },{
                name: "sumaMarcador", code: function (event) {
                   this.engine.var.puntos++;
                }
            }

        ]
    }, 
    {
        name: "door",
        sprite: "loserMessage",
        events: [
            {
                 
                name: "#setup", code: function (event) {
                    this.var.$text = "Enter the game" ;
                }
            },
             {

                name: "#collide", code: function (event) {
                    this.engine.loadLevel("game");
                }
            }
        ],
        collision: {
            "circulo": [
                { "x": 0, "y": 0, "r": 50, "#tag": "circulitos" },
            ]
        }
    }, 
    {
        name: "score",
        sprite: "loserMessage",
        events: [
            {
                 
                name: "#setup", code: function (event) {
                    var points = localStorage['points'] ;
                    if(points=== undefined ){
                        points =0;
                        localStorage['points']=points;
                    }
                        this.var.$text = "The best score is "+ points ;
                }
            }
        ]
    },
    , 
    {
        name: "title",
        sprite: "titulo",
        events: [
            {
                 
                name: "#setup", code: function (event) {
                    
                        this.var.$text = "The drunk square" ;
                }
            }
        ]
    },

    {
        name: "fondo",
        sprite: "fondo"}]);