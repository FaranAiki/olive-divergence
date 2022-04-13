#version 110

uniform sampler2D tex;
uniform sampler2D image;

varying vec2 vTexCoord;

void main(void) {
	vec4 textureColor = texture2D(image, vTexCoord);
	vec4 textureColor
	gl_FragColor = textureColor;
}
