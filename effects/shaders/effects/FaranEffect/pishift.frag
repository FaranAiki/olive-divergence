#version 110

/*
	(C) Copyright 2021 Muhammad Faran Aiki

	Made by Muhammad Faran Aiki licensed Faran License
	
	No bugs, but rotation is useless...
*/

// Define things
#define pi 3.14159265358

uniform 
	int
		side_type_x,
		side_type_y;

uniform
	float
		intv_x,
		intv_y,
		
		gap_x,
		gap_y,
		
		rotation;
		
uniform
	bool
		black_ov;

uniform sampler2D tex;
varying vec2 vTexCoord;

void main(void) {
	vec2
		pixel = vTexCoord;
	
	float
		rad   = rotation * 180.0/pi,
		
		x     = pixel.x,
		y     = pixel.y,
		
		gpx   = gap_x,
		gpy   = gap_y,
		
		gx    = gap_x,
		gy    = gap_y;
	
	// Horizontal
	if (side_type_x == 0) { // Right
		if (mod(pixel.y * intv_y - mod(pixel.y * intv_y, 1.0), 2.0) == 0.0) {
			pixel.x = !black_ov ? mod(pixel.x - gpx * 0.01, 1.0) : pixel.x - gpx * 0.01;
		} else {
			pixel.x = !black_ov ? mod(pixel.x + gpx * 0.01, 1.0) : pixel.x + gpx * 0.01;
		}
	} else { // Communist?
		if (mod(pixel.y * intv_y - mod(pixel.y * intv_y, 1.0), 2.0) == 0.0) {
			pixel.x = !black_ov ? mod(pixel.x + gpx * 0.01, 1.0) : pixel.x + gpx * 0.01;
		} else {
			pixel.x = !black_ov ? mod(pixel.x - gpx * 0.01, 1.0) : pixel.x - gpx * 0.01;
		}
	}
	
	// Vertical
	if (side_type_y == 0) { // Top
		if (mod(pixel.x * intv_x - mod(pixel.x * intv_x, 1.0), 2.0) == 0.0) {
			pixel.y = !black_ov ? mod(pixel.y + gpy * 0.01, 1.0) : pixel.y + gpy * 0.01, 1.0;
		} else {
			pixel.y = !black_ov ? mod(pixel.y - gpy * 0.01, 1.0) : pixel.y - gpy * 0.01;
		}
	} else { // Bottom
		if (mod(pixel.x * intv_x - mod(pixel.x * intv_x, 1.0), 2.0) == 0.0) {
			pixel.y = !black_ov ? mod(pixel.y - gpy * 0.01, 1.0) : pixel.y - gpy * 0.01;
		} else {
			pixel.y = !black_ov ? mod(pixel.y + gpy * 0.01, 1.0) : pixel.y + gpy * 0.01;
		}
	}
	
	gl_FragColor = texture2D(tex, pixel);
}
