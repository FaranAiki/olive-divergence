#version 110

/*
	(C) Copyright 2022 Muhammad Faran Aiki
*/

uniform
	int
		side_type_x,
		side_type_y	
	;

uniform
	float
		intv_x,
		intv_y,
		
		opacity
	;
		
uniform
	bool
		invert
	;

uniform sampler2D tex;
varying vec2 vTexCoord;

void main(void) {
	float 
		alpha = 1.0
	;
	
	vec2
		pixel = vTexCoord
	;
	
	vec4
		texture = texture2D(tex, pixel)
	;
	
	// Horizontal
	if (side_type_x == 0) { // Right
		if (mod(pixel.y * intv_y - mod(pixel.y * intv_y, 1.0), 2.0) == 0.0) {
			alpha = 1.0;
		} else {
			alpha = opacity / 100.0;
		}
	} else { // Communist?
		if (mod(pixel.y * intv_y - mod(pixel.y * intv_y, 1.0), 2.0) == 0.0) {
			alpha = 1.0;
		} else {
			alpha = opacity / 100.0;
		}
	}
	
	// Vertical
	if (side_type_y == 0) { // Top
		if (mod(pixel.x * intv_x - mod(pixel.x * intv_x, 1.0), 2.0) == 0.0) {
			alpha = opacity / 100.0;
		} else {
			alpha = 1.0;
		}
	} else { // Bottom
		if (mod(pixel.x * intv_x - mod(pixel.x * intv_x, 1.0), 2.0) == 0.0) {
			alpha = opacity / 100.0;
		} else {
			alpha = 1.0;
		}
	}
	
	// Haha, copy + ctrl+H go brr!
	if (invert)
	{gl_FragColor = vec4(
		texture.r*(1.0 - alpha),
		texture.g*(1.0 - alpha),
		texture.b*(1.0 - alpha),
		1.0 - alpha
	);}
	else{
		gl_FragColor = vec4(
		texture.r*(alpha),
		texture.g*(alpha),
		texture.b*(alpha),
		alpha
	);}
}
