import { ethPrice } from './web3entry'

class BulmaModal {
    constructor(selector) {
        this.elem = document.querySelector(selector)
        this.close_data()
    }

    show() {
        this.elem.classList.toggle('is-active')
        this.on_show()
    }

    close() {
        this.elem.classList.toggle('is-active')
        this.on_close()
    }

    close_data() {
        var modalClose = this.elem.querySelectorAll("[data-bulma-modal='close']")
        var that = this
        modalClose.forEach(function (e) {
            e.addEventListener("click", function () {

                that.elem.classList.toggle('is-active')

                var event = new Event('modal:close')

                that.elem.dispatchEvent(event);
            })
        })
    }

    on_show() {
        var event = new Event('modal:show')

        this.elem.dispatchEvent(event);
    }

    on_close() {
        var event = new Event('modal:close')

        this.elem.dispatchEvent(event);
    }

    addEventListener(event, callback) {
        this.elem.addEventListener(event, callback)
    }
}

export let amountToPay;

export function modalComponent() {
    var mdl = new BulmaModal("#myModal")

    document.querySelectorAll('.card-content').forEach(item => {
        item.addEventListener('click', event => {
            mdl.show()
            console.log(item);
            let name = item.getAttribute("name");
            console.log(name);
            document.getElementsByClassName("modal-card-title")[0].innerText = name;
            let image = item.getAttribute("data-img");
            console.log(image);
            document.getElementById("fimg").src = image;
            let price = item.getAttribute("data-price");
            amountToPay = Number.parseFloat(price / ethPrice).toPrecision(2);
            document.getElementById("fruit-price").innerText = 'COST $' + price + ' - PAY ' + amountToPay + ' ETH';
        })
    })

    mdl.addEventListener('modal:show', function () {
        console.log("opened")
    })

    mdl.addEventListener("modal:close", function () {
        console.log("closed")
    })
}
