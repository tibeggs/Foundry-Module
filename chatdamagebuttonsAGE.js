class ChatDamageButtons5e extends Application {
    constructor(app) {
        super(app);
    }

    init() {

        Hooks.on('renderChatMessage', (message, html, data) => {
            console.log(message);
            if (message.isRoll || message.roll.parts[0].faces == 6) 


            let btnStyling = 'width: 22px; height:22px; font-size:10px;line-height:1px';

            const fullDamageButton = $(`<button class="dice-total-fullDamage-btn" style="${btnStyling}"><i class="fas fa-user-minus" title="Click to apply calculate damage minus armor."></i></button>`);

            const btnContainer = $('<span class="dmgBtn-container" style="position:absolute; right:0; bottom:1px;"></span>');
            btnContainer.append(fullDamageButton);

            html.find('.dice-total').append(btnContainer);
            console.log("poop");
            // Handle button clicks
            fullDamageButton.click(ev => {
                ev.stopPropagation();
                console.log(CONFIG.Actor.entityClass);
            });


        })
    }
}

let chatButtons = new ChatDamageButtons5e();
chatButtons.init();