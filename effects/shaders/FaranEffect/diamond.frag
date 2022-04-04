#version 110

/*
	(C) Copyright 2021 Muhammad Faran Aiki

	Made by Muhammad Faran Aiki licensed Faran License
	
	Unoptimized! Meaning that some algorithm sucks, yes, I know that algorythm, but I am
		lazy to change it. So let just it be whatever it be.
		
	This file is derived from crop.frag
	
	Version 0.1
*/

// Define things
#define pi 3.14159265358

#define xrotated (cos(-rad) * (vTexCoord.x - anch_x * 0.01) - sin(-rad) * (vTexCoord.y - anch_y * 0.01) + anch_x * 0.01)
#define yrotated (sin(-rad) * (vTexCoord.x - anch_x * 0.01) + cos(-rad) * (vTexCoord.y - anch_y * 0.01) + anch_y * 0.01)

// Still not work
uniform
	float
		rotation,
		pos_x,
		pos_y,
		anch_x,
		anch_y,

		size,
		opacity,
		xfactor, // Still buggy
		yfactor, // Still buggy
		feather; // Still not support

uniform
	bool
		top_left,
		top_right,
		bottom_left,
		bottom_right,

		invert;

uniform mediump float amount_val;
uniform sampler2D tex;
varying vec2 vTexCoord;

void main(void) {
	vec4
		textureColor = texture2D(tex, vec2(vTexCoord.x, vTexCoord.y));
	
	float
		alpha = textureColor.a,
		rad   = rotation * pi/180.0;
	
	// Some complex algorithm the reader should not know (I am myself a little confused, just kidding.)
	if (
		(((xrotated * xfactor + yrotated * yfactor - pos_x * 0.01 - pos_y * 0.01) < (size * 0.01)) && (top_left)) ||
		(((1.0 - xrotated * xfactor + yrotated * yfactor + pos_x * 0.01 - pos_y * 0.01) > (2.0 - size * 0.01)) && (bottom_left)) ||
		(((1.0 + xrotated * xfactor - yrotated * yfactor - pos_x * 0.01 + pos_y * 0.01) > (2.0 - size * 0.01)) && (top_right)) ||
		(((xrotated * xfactor + yrotated * yfactor - pos_x * 0.01 - pos_y * 0.01) > (2.0 - size * 0.01)) && (bottom_right))
	) {
		alpha = opacity * 0.01;
	}

	// Copy from crop.frag
	if (invert) {
		gl_FragColor = vec4(
			textureColor.r*(1.0 - alpha),
			textureColor.g*(1.0 - alpha),
			textureColor.b*(1.0 - alpha),
			1.0 - alpha
		);
	} else {
		gl_FragColor = vec4(
			textureColor.r*(alpha),
			textureColor.g*(alpha),
			textureColor.b*(alpha),
			alpha
		);
	}
}
