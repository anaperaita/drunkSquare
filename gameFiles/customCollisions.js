CLOCKWORKRT.collisions.register([
    {
        shape1: "cuadrado",
        shape2:  "circulo",
        detector: function (cuadrado, circulo) {
            
            if (Math.pow(circulo.x- cuadrado.x,2) + Math.pow(circulo.y- cuadrado.y,2) < Math.pow(circulo.r+cuadrado.r,2)) {
                return true;
            } else {
                return false;
            }
        }
    }
]);