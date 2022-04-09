#version 120
/***

    Port of https://www.shadertoy.com/view/4dfGDH
    Adapted by CGVIRUS for the Olive-Editor Community

    Modified by Muhammad Faran Aiki to make it compatible.

***/

#define MSIZE 15
#define MSIZEf 15.0

uniform sampler2D tex;
varying vec2 vTexCoord;
uniform vec2 resolution;
const vec2 renderScale = vec2(1.0, 1.0);

//Effects Parameter
uniform float sigma_s;
uniform float sigma_r;

float normpdf(in float x, in float sigma)
{
	return 0.39894 * exp(-0.5 * x * x / (sigma * sigma))/sigma;
}

float normpdf3(in vec3 v, in float sigma)
{
	return 0.39894 * exp(-0.5 * dot(v,v) / (sigma * sigma))/sigma;
}

void main()
{
	vec2 uv = gl_FragCoord.xy / resolution.xy;
	vec3 c = texture2D(tex, uv).rgb;
	{
		//declare stuff
		int kSize = int(min((MSIZEf - 1.0)/2.0, 1.5 * (sigma_s * 0.5) * renderScale.x));
		vec3 final_colour = vec3(0.0);
		
		//create the 1-D kernel
		float Z = 0.0;
		
		// Thanks to @athelete at shadertoy.com/view/4dfGDH
		float kernel[MSIZE] = float[MSIZE]
		(
			0.031225216, 0.033322271, 0.035206333, 0.036826804, 0.038138565,
			0.039104044, 0.039695028, 0.039894000, 0.039695028, 0.039104044,
			0.038138565, 0.036826804, 0.035206333, 0.033322271, 0.031225216
		);
		
		vec3 cc;
		float factor;
		float bZ = 1.0/normpdf(0.0, (sigma_r * 0.001));
		//read out the texels
		for (int i=-kSize; i <= kSize; ++i)
		{
			for (int j=-kSize; j <= kSize; ++j)
			{
				cc = texture2D(tex, uv + (vec2(float(i), float(j))) / resolution.xy).rgb;
				factor = normpdf3(cc-c, (sigma_r * 0.001)) * bZ * kernel[kSize + j] * kernel[kSize + i];
				Z += factor;
				final_colour += factor * cc;

			}
		}
		
		gl_FragColor = vec4(final_colour/Z, texture2D( tex, uv ).a);
	}
}
