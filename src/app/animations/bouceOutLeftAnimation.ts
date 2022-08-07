import { animate, animation, keyframes, style } from "@angular/animations";

export const bouceOutLeftAnimation = animation(
    animate('.5s ease', keyframes([
        style({
            offset: .2,
            opacity: 1,
            transform: 'translateX(20px)'
        }),
        style({
            offset: 1,
            opacity: 0,
            transform: 'translateX(-100%)'
        })
    ]))
)