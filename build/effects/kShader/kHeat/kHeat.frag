/*
Olive port of https://www.shadertoy.com/view/ll3fDB
*/

#version 330

uniform sampler2D image;
uniform float time;
varying vec2 vTexCoord;

uniform float kXdetail;
uniform float kYdetail;
uniform float kSpeed;

#define HASHSCALE1 443.8975
#define HASHSCALE3 vec3(443.897, 441.423, 437.195)
#define HASHSCALE4 vec3(443.897, 441.423, 437.195, 444.129)

//----------------------------------------------------------------------------------------
//  1 out, 1 in...
float hash11(float p)
{
    vec3 p3  = fract(vec3(p) * HASHSCALE1);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

vec3 hash31(float p)
{
   vec3 p3 = fract(vec3(p) * HASHSCALE3);
   p3 += dot(p3, p3.yzx+19.19);
   return fract((p3.xxy+p3.yzz)*p3.zyx);
}

vec2 hash21(float p)
{
    vec3 p3 = fract(vec3(p) * HASHSCALE3);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.xx+p3.yz)*p3.zy);
}

vec3 hash33(vec3 p3)
{
    p3 = fract(p3 * HASHSCALE3);
    p3 += dot(p3, p3.yxz+19.19);
    return fract((p3.xxy + p3.yxx)*p3.zyx);
}

float Cellular3D(vec3 P)
{
    // establish our grid cell and unit position
    vec3 Pi = floor(P);
    vec3 Pf = P - Pi;

    // clamp the domain
    Pi.xyz = Pi.xyz - floor(Pi.xyz * (1.0 / 69.0)) * 69.0;
    vec3 Pi_inc1 = step(Pi, vec3(69.0 - 1.5)) * (Pi + 1.0);

    // calculate the hash ( over -1.0->1.0 range )
    vec4 Pt = vec4( Pi.xy, Pi_inc1.xy ) + vec2(50.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    const vec3 SOMELARGEFLOATS = vec3(635.298681, 682.357502, 668.926525);
    const vec3 ZINC = vec3(48.500388, 65.294118, 63.934599);
    vec3 lowz_mod = vec3(1.0 / ( SOMELARGEFLOATS + Pi.zzz * ZINC));
    vec3 highz_mod = vec3(1.0 / (SOMELARGEFLOATS + Pi_inc1.zzz * ZINC));
    vec4 hash_x0 = fract(Pt * lowz_mod.xxxx) * 2.0 - 1.0;
    vec4 hash_x1 = fract(Pt * highz_mod.xxxx) * 2.0 - 1.0;
    vec4 hash_y0 = fract(Pt * lowz_mod.yyyy) * 2.0 - 1.0;
    vec4 hash_y1 = fract(Pt * highz_mod.yyyy) * 2.0 - 1.0;
    vec4 hash_z0 = fract(Pt * lowz_mod.zzzz) * 2.0 - 1.0;
    vec4 hash_z1 = fract(Pt * highz_mod.zzzz) * 2.0 - 1.0;

    //  generate the 8 point positions
    const float JITTER_WINDOW = 0.166666666;	// 0.166666666 will guarentee no artifacts.
    const vec2 val = vec2(0.0, 1.0);
    hash_x0 = ((hash_x0 * hash_x0 * hash_x0) - sign(hash_x0)) * JITTER_WINDOW + val.xyxy;
    hash_y0 = ((hash_y0 * hash_y0 * hash_y0) - sign(hash_y0)) * JITTER_WINDOW + val.xxyy;
    hash_x1 = ((hash_x1 * hash_x1 * hash_x1) - sign(hash_x1)) * JITTER_WINDOW + val.xyxy;
    hash_y1 = ((hash_y1 * hash_y1 * hash_y1) - sign(hash_y1)) * JITTER_WINDOW + val.xxyy;
    hash_z0 = ((hash_z0 * hash_z0 * hash_z0) - sign(hash_z0)) * JITTER_WINDOW + val.xxxx;
    hash_z1 = ((hash_z1 * hash_z1 * hash_z1) - sign(hash_z1)) * JITTER_WINDOW + val.yyyy;

    // return the closest squared distance
    vec4 dx1 = Pf.xxxx - hash_x0;
    vec4 dy1 = Pf.yyyy - hash_y0;
    vec4 dz1 = Pf.zzzz - hash_z0;
    vec4 dx2 = Pf.xxxx - hash_x1;
    vec4 dy2 = Pf.yyyy - hash_y1;
    vec4 dz2 = Pf.zzzz - hash_z1;
    vec4 d1 = dx1 * dx1 + dy1 * dy1 + dz1 * dz1;
    vec4 d2 = dx2 * dx2 + dy2 * dy2 + dz2 * dz2;
    d1 = min(d1, d2);
    d1.xy = min(d1.xy, d1.wz);
    return min(d1.x, d1.y) * (9.0 / 12.0); // return a value scaled to 0.0->1.0
}

float Perlin3D( vec3 P )
{
    //  https://github.com/BrianSharpe/Wombat/blob/master/Perlin3D.glsl

    // establish our grid cell and unit position
    vec3 Pi = floor(P);
    vec3 Pf = P - Pi;
    vec3 Pf_min1 = Pf - 1.0;

    // clamp the domain
    Pi.xyz = Pi.xyz - floor(Pi.xyz * (1.0 / 69.0)) * 69.0;
    vec3 Pi_inc1 = step(Pi, vec3(69.0 - 1.5)) * (Pi + 1.0);

    // calculate the hash
    vec4 Pt = vec4(Pi.xy, Pi_inc1.xy) + vec2( 50.0, 161.0 ).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    const vec3 SOMELARGEFLOATS = vec3(635.298681, 682.357502, 668.926525);
    const vec3 ZINC = vec3(48.500388, 65.294118, 63.934599);
    vec3 lowz_mod = vec3(1.0 / (SOMELARGEFLOATS + Pi.zzz * ZINC));
    vec3 highz_mod = vec3(1.0 / (SOMELARGEFLOATS + Pi_inc1.zzz * ZINC));
    vec4 hashx0 = fract(Pt * lowz_mod.xxxx);
    vec4 hashx1 = fract(Pt * highz_mod.xxxx);
    vec4 hashy0 = fract(Pt * lowz_mod.yyyy);
    vec4 hashy1 = fract(Pt * highz_mod.yyyy);
    vec4 hashz0 = fract(Pt * lowz_mod.zzzz);
    vec4 hashz1 = fract(Pt * highz_mod.zzzz);

    // calculate the gradients
    vec4 grad_x0 = hashx0 - 0.49999;
    vec4 grad_y0 = hashy0 - 0.49999;
    vec4 grad_z0 = hashz0 - 0.49999;
    vec4 grad_x1 = hashx1 - 0.49999;
    vec4 grad_y1 = hashy1 - 0.49999;
    vec4 grad_z1 = hashz1 - 0.49999;
    vec4 grad_results_0 = inversesqrt(grad_x0 * grad_x0 + grad_y0 * grad_y0 + grad_z0 * grad_z0) * (vec2( Pf.x, Pf_min1.x).xyxy * grad_x0 + vec2(Pf.y, Pf_min1.y).xxyy * grad_y0 + Pf.zzzz * grad_z0);
    vec4 grad_results_1 = inversesqrt(grad_x1 * grad_x1 + grad_y1 * grad_y1 + grad_z1 * grad_z1) * (vec2( Pf.x, Pf_min1.x).xyxy * grad_x1 + vec2(Pf.y, Pf_min1.y).xxyy * grad_y1 + Pf_min1.zzzz * grad_z1);

    // Classic Perlin Interpolation
    vec3 blend = Pf * Pf * Pf * (Pf * (Pf * 6.0 - 15.0) + 10.0);
    vec4 res0 = mix(grad_results_0, grad_results_1, blend.z);
    vec4 blend2 = vec4(blend.xy, vec2( 1.0 - blend.xy));
    float final = dot(res0, blend2.zxzx * blend2.wwyy);
    return (final * 1.1547005383792515290182975610039);  // scale things to a strict -1.0->1.0 range  *= 1.0/sqrt(0.75)
}

float Value3D( vec3 P )
{
    //  https://github.com/BrianSharpe/Wombat/blob/master/Value3D.glsl

    // establish our grid cell and unit position
    vec3 Pi = floor(P);
    vec3 Pf = P - Pi;
    vec3 Pf_min1 = Pf - 1.0;

    // clamp the domain
    Pi.xyz = Pi.xyz - floor(Pi.xyz * ( 1.0 / 69.0 )) * 69.0;
    vec3 Pi_inc1 = step(Pi, vec3(69.0 - 1.5)) * (Pi + 1.0);

    // calculate the hash
    vec4 Pt = vec4(Pi.xy, Pi_inc1.xy) + vec2(50.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec2 hash_mod = vec2(1.0 / ( 635.298681 + vec2(Pi.z, Pi_inc1.z) * 48.500388));
    vec4 hash_lowz = fract(Pt * hash_mod.xxxx);
    vec4 hash_highz = fract(Pt * hash_mod.yyyy);

    //	blend the results and return
    vec3 blend = Pf * Pf * Pf * (Pf * (Pf * 6.0 - 15.0) + 10.0);
    vec4 res0 = mix(hash_lowz, hash_highz, blend.z);
    vec4 blend2 = vec4(blend.xy, vec2(1.0 - blend.xy));
    return dot(res0, blend2.zxzx * blend2.wwyy);
}

void main()
{
    float time = time * 0.1;
    vec2 uv = vTexCoord.xy;
    vec3 skew = hash33(vec3(uv.x, 8.0 * time, uv.y)) * 0.1;

    uv += 0.01 * Perlin3D(vec3((kXdetail * 10.0) * uv.x, kSpeed * time, (kYdetail * 10.0) * uv.y) + skew);

    gl_FragColor= texture2D(image, uv);
}
