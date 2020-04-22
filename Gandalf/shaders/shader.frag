#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(binding = 1) uniform sampler2D texSampler;
layout(binding = 2) uniform sampler2D normalSampler;

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) in vec2 Normal;

layout(location = 0) out vec4 outColor;

void main() {
    vec3 lightColor =  vec3(1.0f,1.0f,1.0f);
    float ambientStrength = 0.1;
    vec3 ambient = ambientStrength * lightColor;
    vec4 result = vec4(ambient, 1.0f) * texture(normalSampler, fragTexCoord);
    //outColor = texture(texSampler, fragTexCoord);
    outColor = result;
}