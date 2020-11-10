import { cardData } from './js/card'
import { burgerComponent } from './js/burger'
import { web3entryComponent } from './js/web3entry'
import { modalComponent } from './js/modal'
import { serialComponent } from './js/serial'
import { deviceComponent } from './js/device'

new Vue({
    el: '#app',
    data: {
        cardData
    }
})

/* Handles the navbar's hamburger for a small screen host. */
burgerComponent();

/* Establishes the communication with an Ethereum node. */
web3entryComponent();

/* Handles the fruit's modal. */
modalComponent();

/* Manages the USB Serial communication between the host and the device. */
serialComponent();

/* Handles the device interaction. */
deviceComponent();
