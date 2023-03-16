precision mediump float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uGrain;
void main() {
  vec4 grain = texture2D(uGrain, vUv);
  vec4 texture = texture2D(uTexture, vUv);
  float dist = length(vUv - vec2(0.5));
  if(dist>0.5) discard;

  float r = 0.48;
  float g_out = pow(dist/r, 110.);
  float mag_out = 0.5 - cos(g_out-1.);
  vec2 uvOut = dist>r?vUv+mag_out*(vUv-vec2(0.5)):vUv;

  float g_in = pow(dist/r, -10.);
  float mag_in = 0.5 - cos(g_in-1.);

  gl_FragColor = vec4(0.,1.,0.,1.);
  gl_FragColor = texture;
  gl_FragColor = grain;
  gl_FragColor = vec4(mag_in, mag_in,0.,1.);
}