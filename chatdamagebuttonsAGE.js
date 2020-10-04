class ChatDamageButtons5e extends Application {
    constructor(app) {
        super(app);
    }

    init() {

        Hooks.on('renderChatMessage', (message, html, data) => {
            console.log(message);
            if (true != false) {
                console.log("poop");


                let btnStyling = 'width: 22px; height:22px; font-size:10px;line-height:1px';

                let fullDamageButton = $(`<button class="dice-total-fullDamage-btn" style="${btnStyling}"><i class="fas fa-user-minus" title="Click to apply calculate damage minus armor."></i></button>`);

                let btnContainer = $('<span class="dmgBtn-container" style="position:absolute; right:0; bottom:1px;"></span>');
                btnContainer.append(fullDamageButton);

                html.find('.dice-total').append(btnContainer);

                // Handle button clicks
                fullDamageButton.click(ev => {
                    ev.stopPropagation();
                    console.log(_token);
                    if (canvas.tokens.controlled.length == 0 || canvas.tokens.controlled.length > 1) {
                        ui.notifications.error("Please select a single token");
                    }
                    let target = canvas.tokens.controlled[0].actor;

                    const emptyPhysicalItem = {
                        type: "Armor",
                        description: "",
                        quantity: 1,
                        weight: 0,
                    };


                    const emptyArmor = Object.assign(Object.assign({}, emptyPhysicalItem), { type: "Armor", description: "", armorPenalty: 0, armorRating: 0, equipped: false });

                    const armor = (target.items || [])
                        .filter((i) => i.data.data.type == "Armor")
                        .filter((i) => i.data.data.equipped)
                        .map((i) => i.data)
                        .reduce((c, v) => (c.armorRating > v.armorRating ? c : v), emptyArmor);


                    if (armor.data.armorRating != undefined) {
                        console.log(parseInt(armor.data.armorRating) + parseInt(_token.data.actorData.data.defense));
                    }
                });

            }
        })
    }
}

let chatButtons = new ChatDamageButtons5e();
chatButtons.init();