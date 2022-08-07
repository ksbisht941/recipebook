import { animate, animation, keyframes, state, style, transition, trigger, useAnimation } from "@angular/animations";

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

export const fadeInAnimation = animation([
    style({ opacity: 0 }),
    animate('{{ duration }} {{ easing }}')
], {
    params: {
        duration: '2s',
        easing: 'ease-out'
    }
})

export const slide = trigger('slide', [
    transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('.5s')
    ]),

    transition(':leave', [
        useAnimation(bouceOutLeftAnimation)
    ],)
])

export const fade = trigger('fade', [

    // work with state for similar task performace (eg. opacity is common for void state)
    // state('void', style({ opacity: 0 })),

    transition(':enter', [
        useAnimation(fadeInAnimation)
    ]),


    transition(':leave', [
        //   animate(2000),
        style({ opacity: 0 })
    ]),

    transition(':enter, :leave', [
        animate(2000)
    ])
])

export const blogAnimation = trigger('blogAnimation', [
    transition(':enter', [
        useAnimation(fadeInAnimation, {
            params: {
                duration: '.5s'
            }
        })
    ]),
    transition(':leave', [
        style({ backgroundColor: 'red' }),
        animate(1000),
        useAnimation(bouceOutLeftAnimation)
    ])
])

//   ':enter' === 'void => *'
//   ':leave' === '* => void'