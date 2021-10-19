import {tiny, defs} from './examples/common.js';
// Pull these names into this module's scope for convenience:
const { Vector, vec3, vec4, color, Mat4, Light, Shape, Material, Shader, Texture, Scene } = tiny;


export class Floor extends Scene
{
    loaded = false;// **Text_Demo** is a scene with a cube, for demonstrating the Text_Line utility Shape.
    constructor()
    { super();

        this.key_controls.add([' '], () => { this.triggerRipple = true; this.jump = true; this.set_colors();});
        this.counterTime = 0;
        const initial_corner_point = vec3( -6,-6,0 );
        const row_operation = (s,p) => p ? Mat4.translation( 0,.2,0 ).times(p.to4(1)).to3()
            : initial_corner_point;
        const column_operation = (t,p) =>  Mat4.translation( .2,0,0 ).times(p.to4(1)).to3();

        this.shapes = { sheet : new defs.Grid_Patch( 60, 60, row_operation, column_operation , [[0,60],[0,60]]),
                        cube : new defs.Cube()};
        // Don't create any DOM elements to control this scene:


        this.widget_options = { show_canvas: true, make_controls: false, show_explanation: false,
            make_editor: false, make_code_nav: false };

        const phong   = new defs.Phong_Shader();
        const texture = new defs.Textured_Phong( 1 );
        this.cubeMat = [new Material(phong, {color: color( 0.824,0.922,0.879,1 ), ambient: 0.3}),
            new Material(phong, {color:  color( 1,0.5,0.5,1 ), ambient: 0.3}),
            new Material(phong, {color:  color( 0.2,1,0,1 ), ambient: 0.3}),
            new Material(phong, {color: color( 0,0,1,1 ), ambient: 0.3}),
            new Material(phong, {color: color( 1,1,0,1 ), ambient: 0.3}),
            new Material(phong, {color: color( 1,0,1,1 ), ambient: 0.3}),
            new Material(phong, {color: color( 0,1,1,1 ), ambient: 0.3}),
            new Material(phong, {color: color( 0.3,0.5,0.3,1 ), ambient: 0.3}),
            new Material(phong, {color: color( 1,1,1,1 ), ambient: 0.8}),
            new Material(phong, {color: color( 1,0,0,1 ), ambient: 0.8}),
            new Material(phong, {color: color( 0,1,0,1 ), ambient: 0.8}),
            new Material(phong, {color: color( 0,0,1,1 ), ambient: 0.8}),
            new Material(phong, {color:  color( 1,1,0,1 ), ambient: 0.8}),
            new Material(phong, {color: color( 1,0,1,1 ), ambient: 0.8}),
            new Material(phong, {color: color( 0,1,1,1 ), ambient: 0.8}),
            new Material(phong, {color: color( 0,0,0,1 ), ambient: 0.8})

        ];
        // To show text you need a Material like this one:
        this.text_image = [new Material( texture, { color: color( 0.824,0.922,0.879,1 ), ambient: 0.5,  texture: new Texture( "./assets/grid.jpg" ) }),
                            new Material( texture, { color: color( 1,0.5,.5,1 ), ambient: 0.5,  texture: new Texture( "./assets/grid.jpg" ) }),
                            new Material( texture, { color: color( 1,.5,.5,1 ), ambient: 0.5,  texture: new Texture( "./assets/grid.jpg" ) }),
                            new Material( texture, { color: color( .5,1,.5,1 ), ambient: 0.5,  texture: new Texture( "./assets/grid.jpg" ) }),
                            new Material( texture, { color: color( .5,.5,1,1 ), ambient: 0.5,  texture: new Texture( "./assets/grid.jpg" ) }),
                            new Material( texture, { color: color( 1,1,.5,1 ), ambient: 0.5,  texture: new Texture( "./assets/grid.jpg" ) }),
                            new Material( texture, { color: color( 1,.5,1,1 ), ambient: 0.5,  texture: new Texture( "./assets/grid.jpg" ) }),
                            new Material( texture, { color: color( .5,.75,.75,1 ), ambient: 0.5,  texture: new Texture( "./assets/grid.jpg" ) }),
            new Material( texture, { color: color( 0.3,0.5,0.3,1 ), ambient: 0.1,  texture: new Texture( "./assets/grid.jpg" ) }),
            new Material( texture, { color: color( 1,1,1,1 ), ambient: 0.1,  texture: new Texture( "./assets/grid.jpg" ) }),
            new Material( texture, { color: color( 1,.5,.5,1 ), ambient: 0.1,  texture: new Texture( "./assets/grid.jpg" ) }),
            new Material( texture, { color: color( .5,1,.5,1 ), ambient: 0.1,  texture: new Texture( "./assets/grid.jpg" ) }),
            new Material( texture, { color: color( .5,.5,1,1 ), ambient: 0.1,  texture: new Texture( "./assets/grid.jpg" ) }),
            new Material( texture, { color: color( 1,1,.5,1 ), ambient: 0.1,  texture: new Texture( "./assets/grid.jpg" ) }),
            new Material( texture, { color: color( 1,.5,1,1 ), ambient: 0.1,  texture: new Texture( "./assets/grid.jpg" ) }),
            new Material( texture, { color: color( .5,.75,.75,1 ), ambient: 0.1,  texture: new Texture( "./assets/grid.jpg" ) })
        ];
        this.color = [color( 0,0,0,1 ),color( 1,1,1,1 ),color( 1,0,0,1 ),color( 0,1,0,1 ),color( 0,0,1,1 ),color( 1,1,0,1 ),color( 1,0,1,1 ),color( 0,1,1,1 ),
            color( 0,0,0,1 ),color( 1,1,1,1 ),color( 1,0,0,1 ),color( 0,1,0,1 ),color( 0,0,1,1 ),color( 1,1,0,1 ),color( 1,0,1,1 ),color( 0,1,1,1 )];
        this.jump = false;

    this.colorIndex = 0

    }



    set_colors() {
        let length = 16;
        this.colorIndex = (this.colorIndex + 1)%length;

    }

    cubePosy = 1;
    cubeVely = 0;
    cubeLanded = true;
    A = 0.3;
    lastVLA = 0;
    display( context, program_state )
    {   program_state.lights = [ new Light( vec4( 3,2,1,0 ),   color( 1,1,1,1 ),  1000000 ),
        new Light( vec4( 3,10,10,1 ), color( 1,.7,.7,1 ), 100000 ) ];
        program_state.set_camera( Mat4.look_at( ...Vector.cast( [ 0,10,35 ], [0,0,0], [0,1,0] ) ) );
        program_state.projection_transform = Mat4.perspective( Math.PI/4, context.width/context.height, 1, 500 );

        let pointOfImpact = [0,0,0];

        const t = program_state.animation_time/1000;
        const dt = program_state.animation_delta_time/1000;
        this.counterTime += dt;

        if(this.triggerRipple)
        {
            this.triggerRipple = false;
            this.counterTime = 0;
        }

        let omega = 10.0;
        let exponentialDecay = Math.exp(-this.counterTime);


        this.shapes.sheet.arrays.position.forEach( (p,i,a) => {
            //phi is the phase angle, which is determined by its distance from the origin
            const phiSqr = ((p[0] - pointOfImpact[0]) * (p[0]-pointOfImpact[0]) + (p[1]-pointOfImpact[1]) * (p[1]-pointOfImpact[1]));





            const phi = Math.sqrt(phiSqr);
            a[i] = vec3(p[0], p[1], Math.sin(-omega*t + phi*5)*this.A*exponentialDecay * Math.min(1/phiSqr, 1));
        }
        );

        // Update the normals to reflect the surface's new arrangement.
        // This won't be perfect flat shading because vertices are shared.
        //this.shapes.sheet.flat_shade();
        // Draw the current sheet shape.
        this.r = Mat4.rotation( Math.PI/2,   1,0,0 ).times(Mat4.scale(10,4,4));
        this.shapes.sheet.draw( context, program_state, this.r, this.text_image[this.colorIndex] );


        let model_transform = Mat4.identity();

        const gravity = 25;

        if(this.jump && this.cubeLanded)
        {
            this.cubeVely = 14;
            this.A = 0.3;
            this.jump = false;
            this.cubeLanded = false;
        }

        this.cubeVely -= gravity * dt;
        this.cubePosy += this.cubeVely * dt;

        const vla =Math.sin(-omega * t) * this.A * Math.exp(-this.counterTime) + 1;


        this.cubePosy = Math.max(this.cubePosy, vla);
        if(this.cubePosy === vla && this.cubeLanded === false)
        {
            this.cubeLanded = true;
            if(this.cubeVely < 0)
            {
                this.cubeVely = 0;
                this.A = 0.5;
                this.triggerRipple = true;
            }
        }
        let on_surface = Mat4.translation(0, this.cubePosy ,0 );
        model_transform = model_transform.times(on_surface);


        this.lastVLA = vla;
        this.shapes.cube.draw(context, program_state, model_transform, this.cubeMat[this.colorIndex]);
        this.jump = false;
        // Update the gpu-side shape with new vertices.
        // Warning:  You can't call this until you've already drawn the shape once.
        this.shapes.sheet.copy_onto_graphics_card( context.context, ["position","normal"], false );

        //setTimeout(function(){this.jump=false;},t);



        // this.shapes.box.draw(graphics_state, model_transform,  color.of(1, 1, 1, 1) );
    }


}