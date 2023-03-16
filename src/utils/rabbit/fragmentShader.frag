precision mediump float;
varying vec2 vUv;
uniform sampler2D uTexture;

void main() {
  vec4 texture = texture2D(uTexture, vUv);
  gl_FragColor = (step(0.15,texture)+texture*3.)*vec4(1.,0.0,0.0,1.);
}