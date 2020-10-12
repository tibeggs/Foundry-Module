class ChatDamageButtons5e extends Application {
    constructor(app) {
        super(app);
    }

    init() {

        Hooks.on('renderChatMessage', (message, html, data) => {
            if ("flavor" in message.data) {
                if (message.data.flavor.includes("weapon damage.")) {

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


                        const wDamage = parseInt(message.data.content);


                        const armor = target.data.data.armorRating;

                        var wTough = parseInt(_token.actor.data.data.toughnes)|| 0;

                        var tough_arm = parseInt(armor) + parseInt(wTough);

                        

                        var armorR = parseInt(_token.actor.data.data.armorRating)||0;


                        const calc_damage = wDamage - tough_arm;

                        let r = new Roll("@damage + @tough + @armor", { damage: wDamage, tough: wTough, armor: armorR }).roll();


                        ChatMessage.create({ user: game.user._id, speaker: ChatMessage.getSpeaker({ actor: target }), content: "<h2>Damage Dealt</h2> <p>Damage - Toughness - Armor</p> [[" + wDamage + "-" + wTough + "-" + armor + "]]" });


                    });

                }
            }
            
        })
    }
}

let chatButtons = new ChatDamageButtons5e();
chatButtons.init();