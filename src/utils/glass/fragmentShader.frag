precision mediump float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uGrain;
void main() {
  vec4 grain = texture2D(uGrain, vUv);
  vec4 texture = texture2D(uTexture, vUv);
  float dist = length(vUv - vec2(0.5));
  gl_FragColor = vec4(dist, 0.,0.,1.);
}