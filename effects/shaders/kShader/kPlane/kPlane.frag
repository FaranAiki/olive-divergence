uniform vec2 resolution;
uniform sampler2D image;
varying vec2 vTexCoord;
uniform bool tile;
// The offsets are not akin to the pixel or percentage. Use with caution.
uniform float kOffsetX;
uniform float kOffsetY;
uniform float kScale;

// The values are not akin to 0-360 degrees. Use with caution.
uniform float kRotateX;
uniform float kRotateY;
uniform float kRotateZ;

float plane( in vec3 norm, in vec3 po, in vec3 ro, in vec3 rd ) {
    float de = dot(norm, rd);
    de = sign(de)*max( abs(de), 0.001);
    return dot(norm, po-ro)/de;
}

vec2 raytraceTexturedQuad(in vec3 rayOrigin, in vec3 rayDirection, in vec3 quadCenter, in vec3 quadRotation, in vec2 quadDimensions) {
    //Rotations ------------------
    float a = sin(quadRotation.x); float b = cos(quadRotation.x);
    float c = sin(quadRotation.y); float d = cos(quadRotation.y);
    float e = sin(quadRotation.z); float f = cos(quadRotation.z);
    float ac = a*c;   float bc = b*c;

    mat3 RotationMatrix  =
            mat3(	  d*f,      d*e,  -c,
                 ac*f-b*e, ac*e+b*f, a*d,
                 bc*f+a*e, bc*e-a*f, b*d );
    //--------------------------------------

    vec3 right = RotationMatrix * vec3(quadDimensions.x, 0.0, 0.0);
    vec3 up = RotationMatrix * vec3(0, quadDimensions.y, 0);
    vec3 normal = cross(right, up);
    normal /= length(normal);

    //Find the plane hit point in space
    vec3 pos = (rayDirection * plane(normal, quadCenter, rayOrigin, rayDirection)) - quadCenter;

    //Find the texture UV by projecting the hit point along the plane dirs
    return vec2(dot(pos, right) / dot(right, right),
                dot(pos, up)    / dot(up,    up)) + 0.5;
}

void main() {
    // Screen UV goes from 0 - 1 along each axis
    vec2 screenUV = vTexCoord;
    vec2 p = (2.0 * screenUV) - 1.0;
    float screenAspect = resolution.x/resolution.y;
    p.x *= screenAspect;

    // Normalized Ray Dir
    vec3 dir = vec3(p.x, p.y, 1.0);
    dir /= length(dir);

    // Define the plane
    vec3 planePosition = vec3(kOffsetX * 0.01, kOffsetY * 0.01, kScale * 0.01);
    vec3 planeRotation = radians(vec3(kRotateX, kRotateY, kRotateZ));
    vec2 planeDimension = vec2(screenAspect, 1.0);

    vec2 uv = raytraceTexturedQuad(vec3(0.0), dir, planePosition, planeRotation, planeDimension);

    float adj_scale = 1.0;
    float centerx = 0.0;
    float centery = 0.0;
    vec2 scaled_coords = (uv/adj_scale);
    vec2 coord = scaled_coords-vec2(0.5/adj_scale)+vec2(0.5)+vec2(-centerx, -centery);
    vec2 modcoord = mod(coord, 1.0);

    if (mod(coord.x, 2.0) > 1.0) {
        modcoord.x = 1.0 - modcoord.x;
    }

    if (mod(coord.y, 2.0) > 1.0) {
        modcoord.y = 1.0 - modcoord.y;
    }

    if (tile) {
        uv = modcoord;
        gl_FragColor = texture2D(image, uv);
    } else {
        // If we hit the rectangle, sample the texture
        if(abs(uv.x - 0.5) < 0.5 && abs(uv.y - 0.5) < 0.5) {
            gl_FragColor = texture2D(image, uv);
        }
    }
}