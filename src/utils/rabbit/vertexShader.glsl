varying vec2 vUv;
void main() {
  // float linewidth = 0.03;
  // vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  // vec4 displacement = vec4( normalize( normalMatrix * normal ) * linewidth, 0.0 ) + mvPosition;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  //gl_Position = projectionMatrix * displacement;
}