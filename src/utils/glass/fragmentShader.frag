precision mediump float;
varying vec2 vUv;
void main() {
  gl_FragColor = vec4(vUv.r, 0.0, 0.0, 1.0);
}