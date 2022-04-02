#version 110

/*
	(C) Copyright 2022 Muhammad Faran Aiki
*/
	
uniform
	float
		intv_x,
		intv_y,
		
		opacity
	;
		
uniform
	bool
		invert;

uniform sampler2D tex;
varying vec2 vTexCoord;

void main(void) {
	float 
		alpha = 1,
		pixel = vTexCoord
	;
	
	vec4
		texture = texture2D(tex, pixel)
	;
	
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
