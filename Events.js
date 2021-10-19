import {  Canvas_Widget } from './main-scene.js';


function jump(graphics_state) {
    const t = this.t = graphics_state.animation_time / 1000;
    let speed = 2 * Math.sin(t);
    let translate = Mat4.translation([0,speed,0]);
    let model_transform = Mat4.identity();
    model_transform = model_transform.times(translate);
}