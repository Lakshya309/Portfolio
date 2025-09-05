uniform float time;
uniform vec2 uMouse;
uniform float uEnter;
uniform vec2 aspect;


varying vec2 vUv;
varying float vCircle;

void main(){
    vUv = uv;
    vec3 pos = position;

    vec2 aspectCorrectedMouse = vec2(uMouse.x*aspect.x/aspect.y,uMouse.y);
    vec2 aspectCorrectedUv = vec2(uv.x*aspect.x/aspect.y,uv.y);
    float radius = 0.9;
    float amplitude = 6.0;
    float frequency = 25.0;
    float circle = smoothstep(radius,0.1,distance(aspectCorrectedMouse,aspectCorrectedUv.xy));
    float wave = -sin( distance(aspectCorrectedMouse,aspectCorrectedUv.xy)* frequency + time * 2.) * amplitude;
    pos.z +=  wave * circle *uEnter;
    pos.x += -uMouse.x * .1;
    
    float scale = 0.2;

    pos.xy*=1. + scale*uEnter;
    
    vCircle = circle * wave * uEnter;


    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}