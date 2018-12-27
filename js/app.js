app = new Vue ({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameFlag: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameFlag = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10)
            this.monsterHealth -= damage;
            if(this.checkWin()) {
                return;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });

            this.monsterAttack();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage;
            if(this.checkWin()) {
                return;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });

            this.monsterAttack();
        },
        heal: function () {
            if(this.playerHealth <= 88) {
                this.playerHealth += this.calculateDamage(8, 12);
            }
            else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });

            this.monsterAttack();
        },
        giveUp: function () {
            this.gameFlag = false;
        },
        monsterAttack: function () {
            var damage  = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if(this.monsterHealth <= 0) {
                if(confirm('You won! New game?')) {
                    this.startGame();
                }
                else {
                    this.gameFlag = false;
                }
                return true;
            }
            else if(this.playerHealth <= 0) {
                if(confirm('You lost! New game?')) {
                    this.startGame();
                }
                else {
                    this.gameFlag = false;
                }
                return true;
            }
            return false;
        }
    }
});