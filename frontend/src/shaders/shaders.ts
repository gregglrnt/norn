export const vertexShader = `
    varying vec2 vertexUV;
    void main() {
        vertexUV = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const fragmentShader = `

    uniform sampler2D baseTexture;
    uniform sampler2D bloomTexture;

    varying vec2 vertexUV;

    void main() {
        gl_FragColor = (texture2D (baseTexture, vertexUV) + vec4(1.0) * texture2D(bloomTexture, vertexUV));
    }

`