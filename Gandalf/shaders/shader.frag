#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(binding = 1) uniform sampler2D texSampler;
layout(binding = 2) uniform sampler2D normalSampler;

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) in vec3 Normal;
layout(location = 3) in vec3 viewPos;
layout(location = 4) in vec3 FragPos;

layout(location = 0) out vec4 outFragcolor;

void main() {
    vec3 lightColor =  vec3(1.0);
    vec3 lightPos = vec3(5.0f,1.0f,10.0f);

    //vec4 result = vec4(ambient, 1.0f) * texture(texSampler, fragTexCoord);
    // original outColor = texture(texSampler, fragTexCoord);
    //outColor = result;

	vec3 color = texture(texSampler, fragTexCoord).rgb;
    //ambient
    float ambientStrength = 0.7f;
    vec3 ambient = ambientStrength * lightColor;
    //diffuse
    vec3 normal = normalize(Normal);
    //vec3 normal = texture(normalSampler, fragTexCoord).rgb;
    //normal = normalize(normal * 2.0 - 1.0);

    vec3 lightDir = normalize(lightPos - FragPos);
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    //specular
    float specularStrength = 1.0;
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir,normal);
    float spec = pow(max(dot(viewDir, reflectDir),0.0),32);
    vec3 specular = specularStrength * spec * lightColor;
    
    //diffuse
    vec3 result = (ambient + diffuse + specular) * color;
    outFragcolor = texture(texSampler, fragTexCoord) * vec4(result,1.0);
}