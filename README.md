
# Bouncy Floor Dance

## Intro
This is a game or interactive art piece which simulates the interaction of a box and a bouncy surface. When the player presses the ‘Spacebar’, the box launches upwards from the ground. The reaction from the kickoff causes waves on the gelatinous surface. Upon landing the surface is deformed again, sending ripples outwards. Each time the box is launched the color of the box and the surface will change, the surface taking the color of the box while the box takes another color.

## Credits 

### Elior Fureraj:
#### Bouncy Floor：

The bouncy floor feature utilizes the Grid_Patch class from tiny_graphics.js to generate a high vertex count plane which encompasses the entire view of the game. This plane is then modified every frame by applying an algorithm to simulate a wave pattern on the surface. The algorithm iterates through every vertex in the plane, applying a function described by :

**Sin(Wavespeed\*Time) \* Amplitude \* Exponential Decay \* 1/(Square Distance from source)**

The resulting shape over time of the plane approximates a rubber or gelatinous surface.

 
### Jinming Xiao:
 
#### Start UI:

I design the UI of the start page. I use soft colors and a combination of linear gradient to its darker color. Therefore, it will make the scene have a feeling of depth. The title also used linear gradient from soft orange to soft pink color. At the bottom, is a reminder that tells the player that he or she needs to press the spacebar to continue.  On the bottom right is the team members and the terms of the quarter. I also add an animation to make it look better. I found the code from opencode.io and made some modifications on it. It follows a pattern like Raven Kwok Fields. 

#### Materials:

I create 16 materials for each surface and box. Each material and color have a different color and ambient level. I also made the list of box materials shifted by one from the list of surface materials.Therefore, it will look like the box’s color is shifted to the surface. 


## Team Effort Sections:

#### Cube Jumping & Physics

To sell the idea of the gelatinous surface we added an agent that interacts with it. This agent is a cube of varying color that jumps upon pressing ‘Spacebar’. The way this is implemented is by utilizing the Animation Delta Time variable from tinygraphics. The cube is given a Y Position and Y Velocity. Every second Gravity Acceleration is subtracted from the current velocity of the cube. This causes the cube to fall downwards with a constant acceleration. If the player presses ‘Spacebar’, an upward instantaneous velocity is added to the cube. These are taken into account when calculating the current position of the cube. Before the position is applied, the Position of the Cube is compared against the point on the surface that the cube is standing on and the maximum of the two is applied to the Transform of the cube. This acts as a rudimentary collision that prevents the cube from falling through the floor. In addition, it causes the box to move and sway along with the bouncy floor. 
The floor is applied a force when the cube launches (a reaction force) and when the cube lands, emulating the effect of the floor responding to the box. This section was done as a team effort where the cube movement went through multiple iterations with work on both sides before it reached the current state. Jinming Xiao was responsible for the initial jumping mechanic solution while Elior Fureraj was responsible for the cube’s interaction with gelatinous floor and shift to a physical simulation approach
 
#### Input and control:
 We made the changes linked to the Spacebar. Therefore, each time the player press the spacebar things will change in the scene. For example, the box will jump, the surface will generate waves and shift the scene from the main page to the main scene where contains the game objects. We use the keycontrol and the addEventListenner to achieve this. Elior utilized the Keyboard Manager module to cause the wave effect on the floor and the cube jumping. Jinming handled the scene switching and color changing of the box and surface by pressing 'Spacebar'.
  

 ## Citations
 
 1 Start UI animation algorithms from nicolas barradeau from website: codeopen.io url:https://codepen.io/collection/nrkWJy?cursor=ZD0xJm89MCZwPTEmdj05OTgxMzk=
