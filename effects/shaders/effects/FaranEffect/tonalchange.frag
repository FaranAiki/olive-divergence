#version 110

/*
	(C) Copyright 2021 Muhammad Faran Aiki
*/

uniform float add_red;
uniform float add_green;
uniform float add_blue;

uniform float min_red; // !!important
uniform float min_green;
uniform float min_blue;

uniform float max_red; // !!important
uniform float max_green;
uniform float max_blue;

uniform sampler2D myTexture;
varying vec2 vTexCoord;

void main(void) {
	vec4 col = texture2D(myTexture, vTexCoord);

	col.r += add_red / 255.0;
	col.g += add_green / 255.0;
	col.b += add_blue / 255.0;

	col.r = col.r < max_red / 255.0 ? col.r : max_red / 255.0;
	col.g = col.g < max_green / 255.0 ? col.g : max_green / 255.0;
	col.b = col.b < max_blue / 255.0 ? col.b : max_blue / 255.0;

	col.r = col.r > min_red / 255.0 ? col.r : min_red / 255.0;
	col.g = col.g > min_green / 255.0 ? col.g : min_green / 255.0;
	col.b = col.b > min_blue / 255.0 ? col.b : min_blue / 255.0;

	gl_FragColor = col;
}
