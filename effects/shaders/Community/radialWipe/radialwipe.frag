/***  
    Development by CGVIRUS under GNU GPL Version 3 Licence.
    
    Modified by Muhammad Faran Aiki
***/

#version 110

uniform sampler2D tex;
varying vec2 uTexCoord;
uniform vec2 resolution;

const vec2 renderScale = vec2(1.,1.);

//parametres
uniform int clock;

uniform float Transition;
uniform float Feather;
uniform float rotation;

uniform float center_x;
uniform float center_y;

// uniform float Evolution;

const float PI = 3.14159265358979323846264;
const float TWOPI = 6.283185307179586476925286766559;

float ring(vec2 uv, float Transition)
{
    float rot = radians(rotation + 90.0);
    mat2 m = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
    uv  = m*uv;
    
    vec2 main = uv;
    float ang = atan(main.y, main.x);
    float wipe = radians(Transition*(6.0/5.8)-185.0);
    float f0 = 0.0;
    
    if (clock == 0) { // counter clock wise
      f0 = (ang + wipe)/(PI*Transition * .01 * (-(Feather * .01) * PI));
    }
      else { // clock wise
      f0 = (-ang + wipe)/(PI*Transition * .01 * (-(Feather * .01) * PI));
    }
    
    return clamp(f0, 0.0, 1.0);
}

void main(void)
{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    
    uv -= vec2(center_x / 100.0, center_y / 100.0);
    uv.x *= resolution.x / resolution.y;
    
    vec2 xy = gl_FragCoord.xy / resolution.xy;
    vec4 linker = texture2D(tex, xy);
	
    float c = ring(uv, Transition);
    
    gl_FragColor = vec4(vec3(c), c) * linker;
}
